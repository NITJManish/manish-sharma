const express=require('express');

const router=express.Router();
const Item=require('../model/models');

//create item
router.post('/item', async(req,res)=>{
    const newItem=new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
});

//fetch All items
router.get('/items',async (req,res)=>{
    const items=await Item.find();
    res.send(items);
});

//get single item
router.get('/item/:id',async (req,res)=>{
    const item=await Item.findById(req.params.id);
    res.send(item);
});

//update item
router.put('/item/:id', async (req,res)=>{
    const updateItem=await Item.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(updateItem);
});

//Delete item

router.delete('/item/:id', async (req,res)=>{
    await Item.findByIdAndDelete(req.params.id);
    res.send({messag:'Item deleted'});
});

module.exports=router;