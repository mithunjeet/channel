
import { User } from "../models/user.model.js";
import { Rating } from "../models/rating.model.js";
import mongoose from "mongoose";

export const registerRating = async(req, res)=>{
const { feedback, value, user } = req.body;
console.log(req.body)
console.log(typeof (value))  
const str = value.toString();
if (!feedback.trim() || !str.trim()) return res.status(404).json("please enter all fields properly");
if (!user) return res.status(500).json("some internal error");
  const useralreadyrated = await Rating.aggregate([
    {
      $match :{
        owner:new mongoose.Types.ObjectId(req.user._id),
        user:new mongoose.Types.ObjectId(user)
      }
    }
  ]);

  if (useralreadyrated.length)
    return res.status(404).json("sorry You have already rated this person already !!");

  const rated = await Rating.create({
    feedback,
    value : Number(value),
    owner:req.user._id,
    user: user
  });

  return res.status(200).json("Rating has been submitted successfully");
};


export const calculateRating = async (req, res) => {
    const {_id} = req.body;

 if (!_id) return res.status(500).json("sorry we are unable to get all rating of user, internal error");
 const rating = await Rating.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(_id)
    }
  },
  {
    $group: {
      _id: "$user",
      averageRating: { $avg: "$value"},
      totalRating: { $sum : 1 }
    }
  }]);

       
    return res.status(200).json(rating);
};
