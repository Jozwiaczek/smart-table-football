const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const GPIO = require('onoff').Gpio
const { exec } = require('child_process')
const fs = require('fs')
const Path = require('path')
const exitHook = require('exit-hook')

const CameraService = require('./services/CameraService')
const { API_URL } = require('../config/default.json')

const { constants } = require('stf-core')

const app = express(feathers())
const socket = io(API_URL)

const RED_LIGHT = new GPIO(21, 'out')
const GREEN_LIGHT = new GPIO(13, 'out')
const GATE_A_SENSOR = new GPIO(2, 'in', 'both')
const replayDir = Path.join(__dirname, '/replays')

if (!fs.existsSync(replayDir)) {
  fs.mkdirSync(replayDir)
}

app.configure(socketio(socket))
app.configure(configuration())

socket.on(constants.socketEvents.isTableActiveRasp, () => {
  socket.emit(constants.socketEvents.tableActiveRasp)
})

let checker = 0
socket.on(constants.socketEvents.startListening, async match => {
  GREEN_LIGHT.writeSync(1)
  const { replayTime, _id: matchId } = match

  CameraService.startRecordVideo(replayTime, replayDir)
  GATE_A_SENSOR.watch(async (err, value) => {
    if (err) {
      console.error('There was an error', err)
      return
    }
    if (checker === 0 && value === 0) {
      checker = 1
      RED_LIGHT.writeSync(1)
      const replayId = await CameraService.saveVideo(replayDir)
      socket.emit(constants.socketEvents.goal, { team: match.teamA, replayId: replayId, matchId })

      await setTimeout(() => {
        CameraService.startRecordVideo(replayTime, replayDir)
        RED_LIGHT.writeSync(0)
        checker = 0
      }, 1500)
    }
  })
})

socket.on(constants.socketEvents.stopListening, () => {
  CameraService.stopAndRemoveVideo(replayDir)
  GREEN_LIGHT.writeSync(0)
  GATE_A_SENSOR.unwatch()
})

exitHook(() => {
  RED_LIGHT.writeSync(0)
  exec(`rm -rf ${replayDir}`)
})

module.exports = app
