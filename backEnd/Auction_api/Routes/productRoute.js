const express = require('express');
const router = express.Router();
const multer = require('multer');

const ProductController = require('../Controllers/ProductController.js')

// Adding product
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'_'+file.originalname);
    }
});
const upload = multer({storage: storage})
router.post('/addproduct/:userid', upload.single('productImage'), ProductController.addProduct);

// live products
router.get('/live', ProductController.getLiveProduct);
// upcoming products
router.get('/upcoming', ProductController.getUpComingProduct);

// All products of user
router.get('/getall/:userid', ProductController.getAllProduct);

// get one product based on product id
router.get('/getone/:productid', ProductController.getOneProduct);
// edit product
router.put('/editproduct/:productid', upload.single('productImage'), ProductController.editProduct);
// delete product
router.delete('/deleteproduct/:productid', ProductController.deleteProduct);


module.exports = router;