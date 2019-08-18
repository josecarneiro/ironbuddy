'use strict';

const FILE_NAME = 'ironbuddy-extension';
const ARCHIVE_DIRECTORY = 'build';

const fs = require('fs');
const archiver = require('archiver');
const mkdirp = require('mkdirp')
const makeDirectory = (dir, opts) => new Promise((resolve, reject) => {
  mkdirp(dir, opts, (err, made) => err === null ? resolve(made) : reject(err))
});

(async () => {
  await makeDirectory(ARCHIVE_DIRECTORY);
  const output = fs.createWriteStream(`${ ARCHIVE_DIRECTORY }/${ FILE_NAME }.zip`);
  const archive = archiver('zip');

  output.on('close', () => {
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', error => {
    throw error;
  });
  archive.pipe(output);
  archive.directory('src/', false);
  archive.finalize();
})();

