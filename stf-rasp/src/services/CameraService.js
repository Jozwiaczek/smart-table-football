const googleDriveService = require('./GoogleDriveService')

const { exec, execSync, spawnSync } = require('child_process')
const Path = require('path')

const stopAndRemoveVideo = (replayDir) => {
  const fileNameToRemove = Path.join(replayDir, 'dontRemove')

  const pgrep = spawnSync('pgrep', ['raspivid'])
  const pid = parseInt(pgrep.stdout.toString())

  if (!isNaN(pid)) {
    execSync(`kill -USR1 ${pid}`)
    execSync(`rm ${fileNameToRemove}.h264`)
  }
}

const saveVideo = async (replayDir) => {
  const videoFileName = Path.join(replayDir, 'test')
  const fileNameToRemove = Path.join(replayDir, 'dontRemove')

  const pgrep = spawnSync('pgrep', ['raspivid'])
  const pid = parseInt(pgrep.stdout.toString())

  execSync(`kill -USR1 ${pid}`)
  execSync(`MP4Box -add ${fileNameToRemove}.h264 ${videoFileName}.mp4 -fps 50`)
  execSync(`rm ${fileNameToRemove}.h264`)

  return googleDriveService.uploadFile(videoFileName)
}

const startRecordVideo = (replayTime, replayDir) => {
  const fileNameToRemove = Path.join(replayDir, 'dontRemove')
  const time = replayTime * 1000
  exec(`raspivid -w 640 -h 480 -fps 50 -c -t ${time} -b 1000000 -ih -s -o ${fileNameToRemove}.h264`)
}

module.exports = {
  stopAndRemoveVideo,
  saveVideo,
  startRecordVideo
}
