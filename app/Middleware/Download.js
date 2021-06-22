
const { Storage } = require('@google-cloud/storage');
var stream = require('stream');




const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);


const downloadArticle = async () => {
  let destFilename = 'articles_of_association.pdf';

  let file = bucket.file(destFilename)

  return await file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(signedUrls => {
    const url = signedUrls[0];

    return url;
  });

}

module.exports = {
    downloadArticle
};