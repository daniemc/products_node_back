const router = require('express').Router();
let Product = require('./../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error fetching products.'));
});

router.route('/').post((req, res) => {
    const { name } = req.body    

    const newProduct = new Product({
        name
    })

    newProduct.save()
        .then(() => res.json('Product added.'))
        .catch(err => res.status(500).json(`Error adding new product. ${err}`));
});

router.route('/:id').get((req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json(`Error getting product. ${err}`))
});

router.route('/:id').put((req, res) => {
    const { _id, name } = req.body
    Product.findById(_id)
        .then(product => {
            product.name = name;            

            product.save()
                .then(() => res.json('Product updated.'))
                .catch(err => res.status(500).json(`Error updating product. ${err}`))
        })
        .catch(err => res.status(500).json(`Error finding product to update. ${err}`))
});

router.route('/:id').delete((req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(500).json(`Error deleting product. ${err}`))
});



module.exports = router;