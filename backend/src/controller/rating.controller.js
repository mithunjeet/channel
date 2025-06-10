
import { User } from "../models/user.model";
import { Rating } from "../models/rating.model";


const registerRating = async(req, res)=>{
const { feedback, value, _id, user} = req.body;
  
  const str = value.toString();
  if (!feedback.trim() || !str.trim() || !_id || !user)
    return res.status(404).json("please enter all fields properly");

  const useralreadyrated = await Rating.aggregate([
    {
      $match :{
        owner:new mongoose.Types.ObjectId(_id),
        user:new mongoose.Types.ObjectId(user)
      }
    }
  ]);

  if (useralreadyrated.length)
    return res.status(400).json("You have already rated this person");

  const rated = await Rating.create({
    feedback,
    value,
    owner: _id,
    user: user
  });

  return res.status(200).json("Rating has been submitted successfully");
};


const getAllRatingOfUser = async (req, res) => {
    const { _id } = req.body;

    if (!_id) 
        return res.status(500).json("sorry we are unable to get all rating of user, internal error");

    const rating = await Rating.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(_id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails"
            }
        }
    ]);

    return res.status(200).json({ data: rating });
};

export default {registerRating , getAllRatingOfUser}