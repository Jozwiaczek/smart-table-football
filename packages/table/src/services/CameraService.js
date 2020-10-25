const { exec, execSync, spawnSync } = require('child_process');
const Path = require('path');

const googleDriveService = require('./GoogleDriveService');

const stopAndRemoveVideoStream = (replayDir) => {
  const fileNameToRemove = Path.join(replayDir, 'dontRemove');

  const pgrep = spawnSync('pgrep', ['raspivid']);
  const pid = Number(pgrep.stdout.toString());

  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(pid) && pid !== 0) {
    try {
      execSync(`kill -USR1 ${pid}`);
      execSync(`rm ${fileNameToRemove}.h264`);
    } catch (error) {
      console.log('Error in CameraService -> stopAndRemoveVideoStream: ', error);
    }
  }
};

const saveReplay = async (replayDir) => {
  const videoFileName = Path.join(replayDir, 'test');
  const fileNameToRemove = Path.join(replayDir, 'dontRemove');

  const pgrep = spawnSync('pgrep', ['raspivid']);
  const pid = Number(pgrep.stdout.toString());

  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(pid) && pid !== 0) {
    try {
      execSync(`kill -USR1 ${pid}`);
      execSync(`MP4Box -add ${fileNameToRemove}.h264 ${videoFileName}.mp4 -fps 50`);
      execSync(`rm ${fileNameToRemove}.h264`);
    } catch (error) {
      console.log('Error in CameraService -> saveReplay: ', error);
    }

    return googleDriveService.uploadFile(videoFileName);
  }
};

const startVideoStream = (replayTime, replayDir) => {
  const fileNameToRemove = Path.join(replayDir, 'dontRemove');
  const time = replayTime * 1000;
  try {
    exec(
      `raspivid -w 640 -h 480 -fps 50 -c -t ${time} -b 1000000 -ih -s -o ${fileNameToRemove}.h264`,
    );
  } catch (error) {
    console.log('Error in CameraService -> startVideoStream: ', error);
  }
};

module.exports = {
  stopAndRemoveVideoStream,
  saveReplay,
  startVideoStream,
};
