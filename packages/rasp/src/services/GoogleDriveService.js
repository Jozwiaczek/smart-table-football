const fs = require('fs');

const { google } = require('googleapis');

const { GOOGLE_DRIVE_MAIL, GOOGLE_DRIVE_KEY } = require('../../config/default.json');

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.JWT(GOOGLE_DRIVE_MAIL, null, GOOGLE_DRIVE_KEY, SCOPES);
const drive = google.drive({ version: 'v3', auth });

const createPermissions = (fileId, role, type) =>
  new Promise((resolve, reject) => {
    drive.permissions.create(
      {
        fileId,
        resource: {
          role,
          type,
        },
      },
      (err, res) => {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          reject(err);
        }
        resolve(res);
      },
    );
  });

const uploadFile = (fileName) =>
  new Promise((resolve, reject) => {
    const fileMetadata = {
      name: `${fileName}.mp4`,
    };
    const media = {
      mimeType: 'video/mp4',
      body: fs.createReadStream(`${fileName}.mp4`),
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media,
        fields: 'id',
      },
      async function (err, res) {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          reject(err);
        }
        await createPermissions(res.data.id, 'reader', 'anyone');
        resolve(res.data.id);
      },
    );
  });

const removeFile = (id) =>
  new Promise((resolve, reject) => {
    drive.files.delete({ fileId: id }, (err, res) => {
      if (err) {
        console.log(`The API returned an error: ${err}`);
        reject(err);
      }
      resolve(res.data);
    });
  });

const listFiles = () => {
  drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const { files } = res.data;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    },
  );
};

const getFile = (fileId) => {
  drive.files.get({ fileId, fields: '*' }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    console.log(res.data);
  });
};

module.exports = {
  listFiles,
  removeFile,
  uploadFile,
  createPermissions,
  getFile,
};
