
import Post from '../models/Post.js';
import User from '../models/User.js';

// Create
export const createPost=async(req,res)=>{
    try{
        const {userId,description,picturePath}=req.body;
         const user=await User.findById(userId);
         const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]

         })
            await newPost.save();
            const post=await Post.find();
            res.status(201).json(post);

    }catch(e){
        res.status(409).json({message:e.message});

    }
}
;

// Reading
export const getFeedPosts=async(req,res)=>{
    try{
        const post=await Post.find();
            res.status(200).json(post);

    }catch(e){
        
        res.status(404).json({message:e.message});
    }
}

export const getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.params;

        const post=await Post.find({userId});
            res.status(200).json(post);

    }catch(e){
        
        res.status(404).json({message:e.message});
    }
}



// Update likes and comment
export const likePosts=async(req,res)=>{
    try{
        const {id}=req.params;

        const {userId}=req.body;

        const post=await Post.findById(id);
        const isLiked=post.likes.get(userId)
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true);

        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
          );
          res.status(200).json(updatedPost);


        

    }catch(e){
        
        res.status(404).json({message:e.message});
    }

}