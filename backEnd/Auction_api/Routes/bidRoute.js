const express = require('express');
const router = express.Router();
const BidController = require('../Controllers/BidController')

// Add bid
router.post('/addbid/:userid/:productid', BidController.addBid);
// edit bid
router.put('/editbid/:bidid', BidController.editBid);
// Delete bid
router.delete('/deletebid/:bidid', BidController.deleteBid);
// get one bid
router.get('/onebid/:bidid', BidController.getOneBid);
// get all bids
router.get('/allbid/:userid', BidController.getAllBid);

module.exports = router;