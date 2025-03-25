const express = require("express");
const menuSchema = require("./schema");
const router = express.Router();

router.post("/postmenu",async(req,res)=>{
    try {
        const {name,description,price} = req.body;
        if(!name  || !price){
            return res.status(401).send({message:"Please provide all details"});
        }

        const newMenu = new menuSchema({name,description,price});
        await newMenu.save();
        res.status(201).send({message:"Menu item created sucessfully...",newMenu});
    } catch (error) {
        res.status(500).send({message:"Something went wrong while posting items in menu..!",error});
    }
})

router.put("/updatitem/:id",async(req,res)=>{
    try {
        const{id} = req.params;
        if(!id){
            return res.status(401).send({msg:"Please enter id..!"});
        }
        const{name,description,price} = req.body;
        const update = await menuSchema.findByIdAndUpdate(id,{name,description,price});
        res.status(200).send({msg:"Menu item updated successfully..!",update});
    } catch (error) {
        res.status(500).send({msg:"Error occured while updating menuItem..!",error});
    }
})

router.delete("/deleteitem/:id",async(req,res)=>{
    try {
        const{id} = req.params;
        if(!id){
            return res.status(401).send({msg:"Please provide id...."});
        }
        const deleted = await menuSchema.findByIdAndDelete(id);
        res.status(200).send({msg:"Item deleted successfully..."});
    } catch (error) {
        res.status(500).send({msg:"Something went wrong while deleting item"});
    }
})

module.exports = router;