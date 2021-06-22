var fs = require('fs');
var path = require('path');




exports.uploadFile = async (req, res,next) => {

    if (!req.files) {
        console.log('no files')
        return res.status(500).send({ msg: "File is not found" })
    }

    const myFile = req.files.file;
    let dir = `${__dirname}/../../static/files`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let fileName = `${Date.now()}-${myFile.name}`
    myFile.mv(`${dir}/${fileName}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({ name: myFile.name, path: `static/files/${fileName}` });
    });
};
 
exports.downloadFile = async (req, res) => {
    const { filePath } = req.query;
    var fullPath = `${__dirname}/../../${filePath}`

    var stat = fs.statSync(path.join(fullPath));

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(path.join(fullPath));
    readStream.on('close', () => {
        readStream.pipe(res);
    })

};





