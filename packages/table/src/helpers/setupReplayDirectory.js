const fs = require('fs');

const setupReplayDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log('✔ Replays directory created');
    return;
  }

  console.log('Replays directory already exists');
};

module.exports = setupReplayDirectory;
