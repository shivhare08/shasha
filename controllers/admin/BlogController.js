const BlogModel = require('../../models/Blog')
// const cloudinary = require("cloudinary").v2

// cloudinary.config({ 
//     cloud_name: 'daa5rkqdc', 
//     api_key: '843127716237467', 
//     api_secret: 'vmk7PCGmjeisM9miWLQWIqazHhs',
//     // secure: true
//   });

class BlogController{
    static createDisplay = async(req,res)=>{
        try{
            const data = await BlogModel.find()
            //console.log(data)
            res.render('admin/blog/createdisplay',{result:data})
        }catch(err){
            console.log(err)
        }
    }
    static createblog = async(req,res)=>{
        try{
            //const data = await BlogModel.find()
            // console.log(data)
            res.render('admin/blog/createblog')
        }catch(err){
            console.log(err)
        }
    }
    static blogInsert = async(req,res)=>{
        
        try{
            // console.log(req.body)
            //THI PREDEFINED CODE IS FOR UPLOADING THE IMG IN CLOUDINARY SERVER
            // console.log(req.files.image)
            // const file = req.files.image
            // const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
            //     folder : 'imageBlog'
            // })
            // console.log(myCloud)
             const result = new BlogModel({
                title:req.body.t,
                description:req.body.d,
                name:req.body.n,
                // image : {
                //     public_id: myCloud.public_id,
                //     url: myCloud.secure_url,
                // },
            })
            await result.save()
            res.redirect('/admin/createblog')        //url of route here
            
        }catch(err){
            console.log(err)
        }
    }

    static viewBlog = async(req,res)=>{
        try{
            // console.log(req.params.id)

            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/view',{d:data})
        }catch(err){
            console.log(err)
        }
    }

    static editBlog = async(req,res)=>{
        try{
            // console.log(req.params.id)

            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/edit',{d:data})
        }catch(err){
            console.log(err)
        }
    }

     static blogUpdate = async(req,res)=>{
        try{
            // console.log(req.body)   //for showing data
            // console.log(req.params.id)   //for showing data
            const updateData = await BlogModel.findByIdAndUpdate(req.params.id,{
                title : req.body.title,
                description : req.body.description,
                name : req.body.name
            })
            await updateData.save()
            res.redirect('/admin/blogDisplay')
        }catch(err){
            console.log(err)
        }
     }

    static deleteBlog = async(req,res)=>{
        try{
            //console.log(req.params.id)      //params display id

            const deleteBlog = await BlogModel.findByIdAndDelete(req.params.id)
            
            res.redirect('/admin/blogDisplay')
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = BlogController