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


export const updateCartCount = async (req, res) => {
    const { p_id, actionType } = req.body;
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const productIndex = user.cart.findIndex(product => product.productId.equals(p_id));

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        if (actionType === 'increment') {
            user.cart[productIndex].productCount++;
        } else if (actionType === 'decrement') {
            if (user.cart[productIndex].productCount > 0) {
                user.cart[productIndex].productCount--;
            }
        } else if (actionType === 'delete') {
            user.cart.splice(productIndex, 1);
        } else {
            return res.status(400).json({ error: 'Invalid action type' });
        }
        

        await user.save();

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
