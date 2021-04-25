const validateDate = (req, res, next) => {
    if(isNaN(Date.parse(req.body.checkIn)) || isNaN(Date.parse(req.body.checkOut))) {
        res.status(500).json({message: 'Not valid format'})
    } else {
        next();
    }
};

module.exports = validateDate;
