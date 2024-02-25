const express = require('express');
const { home } = require('../controllers/home_controller');
const { uploadFile, view } = require('../controllers/csv_controller');
const upload = require('../config/multer');
const router = express.Router();


router.get('/', home);
router.post('/upload', upload.single('csvFile'), uploadFile);
router.get('/:id', view)
module.exports = router;