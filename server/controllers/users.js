import User from "../models/User.js";

// Read
export const getUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).josn(user);


    }catch(e){

        res.status(400).json({err:e.message});

    }
}
export const getUserFriends=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))

        );

        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>{
                return {_id,firstName,lastName,occupation,location,picturePath};

            }
        )
        res.status(200).josn(formattedFriends);


    }catch(e){
        res.status(400).json({err:e.message});
    }
}




// Update(Patch)
export const addRemoveFriend=async(req,res)=>{
    try{
        const {id,friendId}=req.params;
        const user=await User.findById(id);
        const friend=await User.findById(friendId);
        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id)=>id!==friendId);
            friend.friends=friend.friends.filter((id)=>id!==id);

        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);

        }
        await user.save();
        await friend.save();
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))

        );

        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>{
                return {_id,firstName,lastName,occupation,location,picturePath};

            }
        )
        res.status(200).json(formattedFriends);



    }catch(e){
        res.status(400).json({err:e.message});
    }
}