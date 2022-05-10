const mongoose = require('mongoose');
const Product = require('../Models/productModel');
const Bid = require('../Models/bidModel');


// add product based on userId
exports.addProduct = (req, res, next) => {
    const newproduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        basePrice: req.body.basePrice,
        maxBid: req.body.basePrice,
        productImage: req.file.path,
        startingDate: new Date(req.body.startingDate),
        endingDate: new Date(req.body.endingDate),
        userId: mongoose.Types.ObjectId(req.params.userid)
    })
    newproduct.save()
    .then(product => {
        res.status(200).json({
            message: 'Product Created Successfully!'
        })
    })
    .catch(error => {
        next(error);
    });
};

// get all Live products
exports.getLiveProduct = (req, res, next) => {
    Product.find({$and: [ {startingDate: {$lte: Date.now()}}, {endingDate: {$gte: Date.now()}} ]})
    .then(products => {
        if(products.length == 0){
            const error = new Error();
            error.message = 'Product Not Found!';
            throw error;
        }
        else{
            return res.status(201).json(products);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// get all UpComing products
exports.getUpComingProduct = (req, res, next) => {
    Product.find({$and: [ {startingDate: {$gte: Date.now()}}, {endingDate: {$gte: Date.now()}} ]})
    .then(products => {
        if(products.length == 0){
            const error = new Error();
            error.message = 'Product Not Found!';
            throw error;
        }
        else{
            return res.status(201).json(products);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// get one product based on productId
exports.getOneProduct = (req, res, next) => {
    Product.find({_id: req.params.productid})
    .exec()
    .then(product => {
        if(product.length == 0){
            const error = new Error();
            error.message = 'Product Not Found!';
            throw error;
        }
        else{
            return res.status(201).json(product[0]);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// get all products based on userId
exports.getAllProduct = (req, res, next) => {
    Product.find({userId: req.params.userid})
    .exec()
    .then(products => {
        if(products.length == 0){
            const error = new Error();
            error.message = 'Product Not Found!';
            throw error;
        }
        else{
            return res.status(201).json(products);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// edit product based on productId
exports.editProduct = (req, res, next) => {
    Product.find({_id: req.params.productid})
    .exec()
    .then(product => {
        if(product.length == 0){
            const error = new Error();
            error.message = 'Product Not Found!';
            throw error;
        }
        else{
            product[0].name = req.body.name;
            product[0].basePrice =  req.body.basePrice;
            if(req.file != null)
                product[0].productImage =  req.file.path;
            product[0].startingDate =  new Date(req.body.startingDate);
            product[0].endingDate = new Date(req.body.endingDate);

            product[0].save();
            return res.status(201).json(product[0]);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// delete product based on productId
exports.deleteProduct = (req, res, next) => {
    const product_id = req.params.productid;
	Product
		.deleteOne({ _id: product_id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Product is Deleted Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
    
    Bid
		.deleteMany({ productId: product_id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Bid is Deleted Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};