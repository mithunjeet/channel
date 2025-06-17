import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
const addComment = async (req, res) => {
    const { content, _id } = req.body;
    if (!_id) return res.status(401).josn("_id not found on which you want comment");
    if (!content.trim()) return res.status(404).json("please fill comment box");
    try {
     const doc = await Comment.create({
            content, 
            owner: new mongoose.Types.ObjectId(req?.user?._id),
            user : new mongoose.Types.ObjectId(_id)
     })
     
    return res.status(200).json("comment sucessfully")
    } catch (error) {
        
        return res.status(500).json("error during comment creation");
    }
}

const deleteComment = async ( req , res)=>{
    const { _id } = req.params;
    console.log(_id);
    console.log(req.user._id);
    console.log("hii from delete comment function")
    if(!_id) return res.status(401).json("_id not found to delete comment");
    try {
        const doc = await Comment.findById(_id);
        console.log(doc)

        // if(new mongoose.Types.ObjectId(doc?.owner) !==  new mongoose.Types.ObjectId(req?.user?._id){
        //     return res.status(404).json("you have no authority to delete the comment");
        // }

      if (doc.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json("Not authorized");
      }

        
        await Comment.findByIdAndDelete({_id : new mongoose.Types.ObjectId(_id)});
        return res.status(200).json("comment deleted sucessufully");
    } catch (error) {
        return res.status(500).json({messsgae :"error  during comment delete" , error})
    }

}

const allCommentOfUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json(
      `We can not provide all comments of user.\nWe are unable to find _id of user.`
    );
  }

  try {
    const doc = await Comment.aggregate([
      { $match: { user:new mongoose.Types.ObjectId(id )} }, 
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "alldetails"
        }
        },
          {
            $sort: {
             createdAt : -1
           }   
          }
    ]);
    return res.status(200).json({ message: "comment docs fetched successfully", doc });
  } catch (error) {
    return res.status(500).json({ message: "error during fetching all comments of user", error });
  }
};



export  { deleteComment , allCommentOfUser , addComment}