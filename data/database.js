const mongoose = require('mongoose');
const DBURL = process.env.MONGODB_URI || 'mongodb://localhost/mmybo';


// Use GridFS for suer profile pictures
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

assert = require('assert');

// Allows every mongoose function to be treated as if they return a promise
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(DBURL, { useNewUrlParser: true }, (err, db) => {
    assert.equal(err, null);
    console.log('Successfully Connected to the Local Database.');
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
mongoose.set('debug', false);





//Create storage w/ multer gridfs
const storage = new GridFsStorage({
    url: DBURL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            //crypto.randomBytes is used to generate names that is 16 characters long
            crypto.randomBytes(16, (err, buf) => {
                if (err){
                    return reject(err);
                }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'user-pictures'
            };
            resolve(fileInfo);

            });
        });
    }
});

module.exports = {connection: mongoose.connection, storage}
// module.exports.storage = {storage}
// console.log(module.exports);
