const express = require('express');
const router = express.Router();
const { checkAvailability } = require('../controllers/book/common/');
const {
    bookRoom,
    cancelRoom,
    editRoom } = require('../controllers/book/');

router.get('/availability', async (req, res) => {
    const availableDays = await checkAvailability();
    res.json(availableDays);
 });

router.post('/add', async (req, res) => {
    const { message, status, args } = await bookRoom(req.body);
    res.status(status).json({message, args});
 });

 router.delete('/cancel/:id', async (req, res) => {
    const { status, message } = await cancelRoom(req.params.id);
    res.status(status).json({message});
 })

 router.put('/edit/:id', async (req, res) => {
    const { message, status, args } = await editRoom(req.body, req.params.id);
    res.status(status).json({message, args});
 })

 module.exports = router;
