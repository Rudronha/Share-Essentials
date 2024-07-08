const Product = require('../models/ProductModel');

//add Item controller
exports.addItem = async (req, res) => {
    try {
        const { name, description, profilePicture, isForSale, salePrice, isForRent, rentPrice, isForShare, sharePrice, userId } = req.body;
    
        // Create new product in database
        const newProduct = await Product.create({
          name,
          description,
          profilePicture,
          isForSale,
          salePrice,
          isForRent,
          rentPrice,
          isForShare,
          sharePrice,
          userId
        });
    
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
}

//get item controller
exports.getItem = async (req, res) => {
    try {
        // Fetch all products from database
        const products = await Product.findAll();
    
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}


//delete item controller
exports.removeItem = async(req, res) => {
    const productId = req.params.id;

    try {
        // Find product by id and delete
        await Product.destroy({
        where: { id: productId }
        });

        res.json({ message: 'Product deleted successfully' });
    }catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

//update product details controller
exports.updateItem = async(req, res) => {
    const productId = req.params.id;

    try {
        const { name, description, profilePicture, isForSale, salePrice, isForRent, rentPrice, isForShare, sharePrice,userId } = req.body;

        // Find product by id and update
        const updatedProduct = await Product.update({
            name,
            description,
            profilePicture,
            isForSale,
            salePrice,
            isForRent,
            rentPrice,
            isForShare,
            sharePrice,
            userId
        }, {
        where: { id: productId }
        });

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}