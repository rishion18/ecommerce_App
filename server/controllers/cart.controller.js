import User from "../models/users.model.js";

export const addToCart = async (req, res) => {
    try {
        const user = req.user;

        const {selectedProductId  , selectedProductName , selectedProductPrice} = req.body;

        const existingItem = user.cart.find(item => item.productId.equals(selectedProductId));

        if (existingItem) {
            existingItem.productCount += 1;
        } else {
            user.cart.push({
                productId: selectedProductId,
                productName: selectedProductName,
                productCount: 1,
                productPrice: selectedProductPrice
            });
        }

        await user.save();

     res.status(200).json({ message: 'Product added successfully' });

    } catch (error) {
        console.error('Error updating product count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const fetchCartDetails = async(req , res) => {
    const {userId} = req.body;

    try{
       const user = await User.findById(userId);
       if(user){
        res.status(200).send(user.cart);
       }

    }catch(e){
        res.status(500).send({error: 'error fetching cart items'})
    }
}
