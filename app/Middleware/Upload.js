
const { Storage } = require('@google-cloud/storage');
var stream = require('stream');
const uuid = require('uuid')




const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

var upload = (file) => {
  const blob = bucket.file(file.name);

  // Create writable stream and specifying file mimetype
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobWriter.on('error', (err) => console.log(err));

  blobWriter.on('finish', () => {
    // Assembling public URL for accessing the file via HTTP
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
      }/o/${encodeURI(blob.name)}?alt=file`;

    // Return the file name and its public URL
    // return publicUrl
    // res
    //   .status(200)
    //   .send({ fileName: file.name, fileLocation: publicUrl });
  });

  // When there is no more data to be consumed from the stream
  blobWriter.end(file.buffer);

}

const uploadToStorage = (file, filename) => {
  let prom = new Promise(async (resolve, reject) => {

    if (!file) {
      reject('No file');
    }

    let newFileName = `${Date.now()}_${file.name}`;
    let fileUpload = bucket.file(newFileName);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log(error);
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      //   const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
      // }/o/${encodeURI(fileUpload.name)}?alt=file`;          
      // console.log(publicUrl);
 

      fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then(signedUrls => {
        resolve(signedUrls[0])
      });
    });

    blobStream.end(file.data);

  });
  return prom;
}

const uploadImage = async (imageData) => {
  let prom = new Promise(async (resolve, reject) => {
    let newFileName = `${uuid.v1()}.png`;
    let fileUpload = bucket.file(newFileName);

    var bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(imageData.data, 'base64'));

    bufferStream.pipe(fileUpload.createWriteStream({
      contentType: 'application/octet-stream',
      metadata: {
        custom: 'metadata',
      },
      public: true,
      validation: "md5"
    }))
      .on('error', function (err) { console.log(err); })
      .on('finish', function () {
        // The file upload is complete.
        const publicUrl =
          // `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(fileUpload.name)}`;
          `https://storage.googleapis.com/${bucket.name}/${encodeURI(fileUpload.name)}`
        resolve(publicUrl)

        // fileUpload.getSignedUrl({
        //   action: 'read',
        //   expires: '03-09-2491'
        // }).then(signedUrls => {
        //   resolve(signedUrls[0])
        // });

      });
  })
  return prom;
}

module.exports = {
  upload,
  uploadToStorage,
  uploadImage,
};