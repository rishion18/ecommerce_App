import products from "../models/products.model.js";
import crypto from 'crypto'

export const createProduct = async(req , res) => {
    try{
       const newProduct = req.body;
       await products.create(newProduct);
       res.status(200).send({status:true , message:'new product created!'});
    }catch(e){
        res.status(500).send({error: e.message})
    }
}

export const productsByCategory = async(req , res) => {
    const { category } = req.params;

    try {
        const filtered = await products.find({ category });
        res.status(200).send(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const productsByCategoryAndSubcategory = async (req, res) => {
    console.log('arrived here')
    console.log(req.params)
    const { subCategory } = req.params;

    try {
        const filtered = await products.find({ subCategory });
        res.status(200).send(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

export const fetchCategoriesAndSubCategories = async (req, res) => {
    try {
         const allProducts = await products.find();

         const categoriesAndSubCategories = {};

         allProducts.forEach(product => {
           const { category, subCategory } = product;
             if (!categoriesAndSubCategories[category]) {
                 categoriesAndSubCategories[category] = [];
             }
             if (!categoriesAndSubCategories[category].includes(subCategory)) {
                categoriesAndSubCategories[category].push(subCategory);
             }
         });

        const formattedData = Object.keys(categoriesAndSubCategories).map(category => ({
             categoryName: category,
             subCategories: categoriesAndSubCategories[category],
         }));

        res.status(200).send(formattedData);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

export const getProduct = async(req , res) => {

  try{
    const {productId} = req.params
    const product = await products.findOne({_id:productId})
    if(!product){
        res.status(201).send('product not found');
    }
    res.status(200).send(product);
  }catch(e){
    res.status(500).send({error: e.message})
  }

}

export const getTopDeals = async (req, res) => {
    console.log('arrived')
    try {
        const topDeals = await products.find({ discount: { $gt: 40 } });
        res.status(200).send(topDeals); 
    } catch (e) {
        res.status(500).send({ error: e.message }); 
    }
}
