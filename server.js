const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}`)
});

const upload = multer({
  storage: storage,
}).single('userPhoto');

app.use(bodyParser.urlencoded({
  extended: true
}));

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/photo', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end(`Error uploading file. Error: ${err}`);
    }
    res.end("File is uploaded");
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));