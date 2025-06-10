
import { JobApply } from "../models/jobapply.model"
const jobApply = async (req, res) => {
    
    const { workRangeKm ,currentWage , expectedWage ,  state , district , village, jobcommitment , _id , role } = req.body   
    if(!_id) return  res.status(500).json("please login again  Something went wrong")
    if (!state.trim() || !district.trim() || !village.trim() || !role.trim()) {
          return res.status(404).json("location has not filled  properly")
    }
    if(!jobcommitment.trim()) return res.status(404).json("please fill jobcommitment")
    
    if (currentWage <= 0 || expectedWage <= 0 || workRangeKm <= 0) res.status(404).json("please select a valid no in the field")

    const apply = await jobApply.create({
        user: _id,
        workRangeKm,
        currentWage,
        expectedWage,
        state,
        district,
        village,
        jobcommitment,
        role
    })    
    
    if (!apply) res.status(500).json("some server error occured during job apply");
    
    res.status(200).json("job apply successfully have a nice day ")


}

const getAllJobNearToYourLocation = async (req , res) => {
    const { state , district , village , role } = req.body
    
    if (!state.trim() || !district.trim() || !village.trim() || !role.trim()) {
          return res.status(404).json("location has not filled  properly")
    }
   

    
}