const mongoose = require('mongoose');
const Bid = require('../Models/bidModel');
const Product = require('../Models/productModel');

// get all bids based on userID
exports.getAllBid = (req, res, next) => {
    Bid.find({ userId: req.params.userid })
        .populate('productId')
        .exec()
        .then(bids => {
            if (bids.length == 0) {
                const error = new Error();
                error.message = 'Bid Not Found!';
                throw error;
            }
            else {
                return res.status(201).json(bids);
            }
        })
        .catch(error => {
            next(error);
        });
};

// get one bid based on bidId
exports.getOneBid = (req, res, next) => {
    Bid.find({ _id: req.params.bidid })
        .populate('productId')
        .exec()
        .then(bid => {
            if (bid.length == 0) {
                const error = new Error();
                error.message = 'Bid Not Found!';
                throw error;
            }
            else {
                return res.status(201).json(bid[0]);
            }
        })
        .catch(error => {
            next(error);
        });
};

// add bid based on productId and userId
exports.addBid = (req, res, next) => {
    // Update maxBid of product
    Product.find({ _id: req.params.productid })
        .exec()
        .then(product => {
            if (product[0].maxBid < req.body.price) {
                product[0].maxBid = req.body.price;
                product[0].save();
            }
        })
        .catch(error => {
            next(error);
        });

    // Add new Bid
    const newbid = new Bid({
        _id: new mongoose.Types.ObjectId(),
        price: req.body.price,
        userId: req.params.userid,
        productId: req.params.productid
    })
    newbid.save()
        .then(bid => {
            res.status(200).json({
                message: 'Bid is Added Successfully!'
            })
        })
        .catch(error => {
            next(error);
        });
};

// edit bid based on bidId
exports.editBid = (req, res, next) => {
    Bid.find({ _id: req.params.bidid })
        .exec()
        .then(bid => {
            if (bid.length == 0) {
                const error = new Error();
                error.message = 'Bid Not Found!';
                throw error;
            }
            else {
                bid[0].price = req.body.price;
                bid[0].save();
                Product.find({ _id: bid[0].productId }).exec()
                    .then(product => {
                        if (product[0].maxBid < req.body.price) {
                            product[0].maxBid = req.body.price;
                            product[0].save();
                        }
                    })
                res.status(200).json({
                    message: 'Bid is Updated Successfully!'
                })
            }
        })
        .catch(error => {
            next(error);
        });
};

// delete bid based on bidId
exports.deleteBid = (req, res, next) => {
    const bidId = req.params.bidid;
    let product_id;

    Bid.find({ _id: bidId })
        .exec()
        .then(result => {
            product_id = result[0].productId;
            console.log(product_id);
        })

    
    Bid.deleteOne({ _id: bidId })
        .exec()
        .then(result => {
            Bid.find({ productId: product_id })
                .exec().then(bids => {
                    var maxbid = 0;
                    bids.forEach(bid => {
                        if(maxbid <= bid.price ){
                            maxbid = bid.price
                        }
                    })
                    Product.find({_id: product_id})
                    .exec()
                    .then(products => {
                        products[0].maxBid = maxbid;
                        products[0].save();
                    })
                });
            res.status(200).json({
                message: 'Bid is Deleted Successfully!',
                result: result
            });
        })
        .catch(error => {
            next(error);
        });



};