const Product = require('../models/ProductModel');
const User = require('../models/userModel');

//get user details
exports.getUser = async(req, res) => {
    const userId = req.params.id;
    //console.log(userId);
    try{
        const user = await User.findByPk(userId,{
            attributes: ['username','email','country','state','city','mobile']
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       // console.log(user);
        res.status(201).json(user);
    }catch(error){
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' }); 
    }
}

//update user data
exports.updateUser = async(req, res) => {
    const userId = req.params.id;

    try {
        const { username, email,mobile, country, state, city } = req.body;

        // Find product by id and update
        const updatedProduct = await User.update({
            username,
            email,
            country
        }, {
        where: { id: userId }
        });

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user'});
    }
}

//add item controller
exports.addProduct = async (req, res) => {
    const { name, description, isForSale, salePrice, isForRent, rentPrice, isForShare, sharePrice, UserId } = req.body;
    const profilePicture = req.file ? req.file.path.replace(/\\/g, '/').replace('src/controllers', '') : null; // Replace Windows backslashes with forward slashes and remove initial path
    try {
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
        UserId
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

//get item controller
exports.getItem = async (req, res) => {
    try {
        // Fetch all products from database
        const id = req.params.id;
        const products = await Product.findAll({ where:{ UserId:id } });
    
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