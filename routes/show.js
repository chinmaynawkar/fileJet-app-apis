// this route is for showing the download page and the download link

const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        // Link expired
        if(!file) {
            return res.render('download', { error: 'Link has been expired.'});
        } 
        return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, 
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}` });
            //http://localhost:3000/files/download/1234 will look like this when we click on download button
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});


module.exports = router;