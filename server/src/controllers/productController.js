const Product = require('../models/ProductModel');
const Favorite = require('../models/FavoriteMode');
const Cart = require('../models/cartModel');

//get all products
exports.getProducts = async(req, res)=>{
    try{
        const products = await Product.findAll();
        res.json(products);
    }catch(error){
        console.error('Error in fetch all product:',error);
        res.status(500).json({ error: 'Failed to fetch all products' });
    }
};

//get an product
exports.getProduct = async(req, res) => {
    const productId = req.params.id;
    try{
        const products = await Product.findByPk(productId);
        res.json(products);
    }catch(error){
        console.error('Error in fetch an product:',error);
        res.status(500).json({ error: 'Failed to fetch an products' });
    }
};

//get all favirotes
exports.getFavorites = async(req, res) => {
    const userId = req.params.id;
    try{
        const favorites = await Favorite.findAll({
            where: { userId:userId },
            include: Product
          });

          if (!favorites) {
            return res.status(404).json({ message: 'No favorites found for this user' });
          }

          res.json(favorites);
    }catch(error){
        console.error('Error in fetch favorites product:',error);
        res.status(500).json({ error: 'Failed to fetch favorites products' });
    }
};

//add to favirote
exports.addFavorite = async(req, res) => {
    const productId = req.params.id;
    const userId = req.session.user.id;
    try{
        const products = await Favorite.create({
            userId,
            productId
        });
        res.status(200).json({message:"Product has been add to favorites"});
    }catch(error){
        console.error('Error in adding to favorites:',error);
        res.status(500).json({ error: 'Failed to add into favorites' });
    }
};

//remove from favorite
exports.delFavorite = async(req, res) => {
    const Id = req.params.id;
    try{
        await Favorite.destroy({
            where: { id: Id }
        });
    
        res.json({ message: 'Product removed from favorites successfully' });
    }catch(error){
        console.error('Error in remove form favorite:',error);
        res.status(500).json({error: 'Failed to remove from favorites'});
    }
};

//get cart products
exports.getCart = async(req, res) => {
    const userId = req.params.id;
    try{
        const carts = await Cart.findAll({
            where: { userId:userId },
            include: Product
          });

          if (!carts) {
            return res.status(404).json({ message: 'No cart found for this user' });
          }

          res.json(carts);
    }catch(error){
        console.error('Error in fetch cart product:',error);
        res.status(500).json({ error: 'Failed to fetch cart products' });
    }
};

//move to Cart
exports.addToCart = async(req, res) => {
    const productId = req.params.id;
    const userId = req.session.user.id;
    try{
        const products = await Cart.create({
            userId,
            productId
        });
        res.status(200).json({message:"Product has been moved to cart"});
    }catch(error){
        console.error('Error in moving to cart:',error);
        res.status(500).json({ error: 'Failed to add into cart' });
    }
};

//remove from Cart
exports.delFromCart = async(req, res) => {
    const Id = req.params.id;
    try{
        await Cart.destroy({
            where: { id: Id }
        });
    
        res.json({ message: 'Product removed from cart successfully' });
    }catch(error){
        console.error('Error in remove form cart:',error);
        res.status(500).json({error: 'Failed to remove from cart'});
    }
};

//move to favorite to cart
exports.moveToCart = (req, res) => {

};

//move to favorite from cart
exports.moveToFavorite = (req, res) => {

};


