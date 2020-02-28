const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const GPIO = require('onoff').Gpio
const { exec, execSync, spawnSync } = require('child_process')
const fs = require('fs')
const Path = require('path')
const exitHook = require('exit-hook')

const googleDrive = require('./google-drive')
const { API_URL } = require('../config/default.json')

const app = express(feathers())
const socket = io(API_URL)

const RED_LIGHT = new GPIO(21, 'out')
const GREEN_LIGHT = new GPIO(13, 'out')
const GATE_A_SENSOR = new GPIO(2, 'in', 'both')
const replayDir = Path.join(__dirname, '/replays')
const fileNameToRemove = Path.join(replayDir, 'dontRemove')
const videoFileName = Path.join(replayDir, 'test')

if (!fs.existsSync(replayDir)) {
  fs.mkdirSync(replayDir)
}

app.configure(socketio(socket))
app.configure(configuration())

const stopAndRemoveVideo = () => {
  const pgrep = spawnSync('pgrep', ['raspivid'])
  const pid = parseInt(pgrep.stdout.toString())

  if (!isNaN(pid)) {
    execSync(`kill -USR1 ${pid}`)
    execSync(`rm ${fileNameToRemove}.h264`)
  }
}

const saveVideo = async () => {
  const pgrep = spawnSync('pgrep', ['raspivid'])
  const pid = parseInt(pgrep.stdout.toString())

  execSync(`kill -USR1 ${pid}`)
  execSync(`MP4Box -add ${fileNameToRemove}.h264 ${videoFileName}.mp4 -fps 50`)
  execSync(`rm ${fileNameToRemove}.h264`)

  return googleDrive.uploadFile(videoFileName)
}

const startRecordVideo = (replayTime) => {
  const time = replayTime * 1000
  exec(`raspivid -w 640 -h 480 -fps 50 -c -t ${time} -b 1000000 -ih -s -o ${fileNameToRemove}.h264`)
}

let checker = 0
socket.on('startListening', async match => {
  GREEN_LIGHT.writeSync(1)
  const { replayTime, _id: matchId } = match

  socket.on('checkTableStatus', matchIdToCheck => {
    if (matchId !== matchIdToCheck) {
      socket.emit('notAvailable')
    }
  })
  startRecordVideo(replayTime)
  GATE_A_SENSOR.watch(async (err, value) => {
    if (err) {
      console.error('There was an error', err)
      return
    }
    if (checker === 0 && value === 0) {
      checker = 1
      RED_LIGHT.writeSync(1)
      const replayId = await saveVideo()
      socket.emit('goal', { team: match['teamA'], replayId: replayId, matchId })

      await setTimeout(() => {
        startRecordVideo(replayTime)
        RED_LIGHT.writeSync(0)
        checker = 0
      }, 1500)
    }
  })
})

socket.on('stopListening', () => {
  stopAndRemoveVideo()
  GREEN_LIGHT.writeSync(0)
  GATE_A_SENSOR.unwatch()
})

exitHook(() => {
  RED_LIGHT.writeSync(0)
  exec(`rm -rf ${replayDir}`)
})

module.exports = app
