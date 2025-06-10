import { Report } from "../models/report.model.js";

export const reportUser = async (req, res) => {
    const { content, reason, user } = req.body;
     // req.user is giving during jwt verification 
    if (!content.trim() || !reason.trim()) 
        return res.status(404).json("please fill all fields properly");

    if (!user) 
        return res.status(500).json("some internal server error");

    try {
        const report = await Report.create({
            content,
            reason,
            user: user,
            owner: req.user._id
        });

        return res.status(200).json("You have reported successfully. Please be patient while we take action.");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Something went wrong while submitting your report.");
    }
};

