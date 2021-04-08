const express = require('express')
const router = express.Router()

const isAuth=require('../middlewares/isAuth')

const fs = require('fs');
const path = require('path');
const Game = require('../models/Game');

const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const  upload = multer({ storage: storage });
router.get('/', (req, res) => {
    Game.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});
router.post('/gamepost', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Game.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
module.exports = router