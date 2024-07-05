import Product from "../Model/product.js";



//get all products  =>/rest/api/products
export const getAllProduct= async (req,res)=>{
    const products=await Product.find();
    let productCount=products.length;
    res.status(200).json({
        productCount,
        products,
    })
}

//create new product => /rest/api/product
export const newProduct=async (req,res)=>{
    const product=await Product.create(req.body);

    res.status(200).json({
        product,
    })
}

//get single product details  => /rest/api/product/:id
export const getProductdetails=async (req,res)=>{
    const product=await Product.findById(req?.params?.id);

    if(!product){
        return res.status(404).json({
            error:"product not found",
        });
    }
    res.status(200).json({
        product,
    })
}

//update product details => /rest/api/product/:id
export const updateProduct=async (req,res)=>{
    let product=await Product.findById(req?.params?.id);
    if(!product){
        return res.status(404).json({
            error:"product not found",
        }); 
    }
    
    product=await Product.findByIdAndUpdate(req?.params?.id,req.body,{new :true,});

    res.status(200).json({
        product,
    })
}

//delete product  => /rest/api/product/:id
export const deleteProduct=async (req,res)=>{
    const product =await Product.findById(req?.params?.id);

    if(!product){
        return res.status(404).json({
            error:"product not found",
        }); 
    }
    await product.deleteOne();
    res.status(200).json({
        message:"product deleted successful"
    })
}