const express = require('express');
const expressFileUpload = require('express-fileupload');
const fs = require('fs'); 
const app = express();

app.use(expressFileUpload());

//Upload Endpoint
app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;
    const fileNewPath = `${__dirname}/client/public/uploads/${file.name}`;

    

    file.mv(fileNewPath, err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }

        fs.readFile(fileNewPath, 'utf8', function (err, data) {
            var dataArray = data.split(/\r?\n/);
            res.json({ name: file.name, path: `/uploads/${file.name}`, fileContent: dataArray });

            // delete the file
            fs.unlink(fileNewPath, () => {
                console.log('File deleted successfully');
            }); 
        });
       
    })
});

app.listen(4000, () => console.log('Server Started...'));