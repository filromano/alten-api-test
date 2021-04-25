const validateDate = (req, res, next) => {
    const pattern = '00:00:00.000Z';
    if(isNaN(Date.parse(req.body.checkIn)) || isNaN(Date.parse(req.body.checkOut))) {
        res.status(400).json({message: 'Invalid format'})
    } else {
        // check time format
        let checkIn = req.body.checkIn.split('T');
        let checkOut = req.body.checkOut.split('T');
        if (checkIn[1] !== pattern || checkOut[1] !== pattern) {
            res.status(400).json({message: 'Invalid format'})
        } else {
            next();
        }
    }
};

module.exports = validateDate;
