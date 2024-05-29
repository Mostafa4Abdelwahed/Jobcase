const asyncHandler = require("express-async-handler")
const {job, validationCreateJob} = require("./../../../Database/models/job.model");

module.exports.addNewJobCtrl = asyncHandler(async (req, res) => {
    const data = {
        position: req.body.position,
        company: req.body.company,
        location: req.body.location,
        status: req.body.status,
        jobType: req.body.jobType,
        userId: req.params.id,
    }
    const { error } = validationCreateJob(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    const Job = await job.create(data);
    res.json({message:"Job Created Successfully", Job})
})

module.exports.getAllJobsByUserIdCtrl = asyncHandler(async (req, res) => {
    const Jobs_Per_Page = 9;
    const { pageNumber, status } = req.query;
    const data = await job.find({userId: req.params.id}).sort({ createdAt: -1 });
    const Total_Jobs = data.length;
    const Total_Pages = Math.ceil(data.length / Jobs_Per_Page);

    if (pageNumber) {
        const data = await job.find({userId: req.params.id})
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * Jobs_Per_Page)
            .limit(Jobs_Per_Page);
        return res.json({ message: "success", data, Total_Jobs, Total_Pages })
    }
    if (status) {
        const data = await job.find({status: status, userId: req.params.id});
        const Total_Jobs = data.length;
        return res.status(200).json({message: "Success", data, Total_Jobs})
    }

    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data, Total_Jobs, Total_Pages})
    }
    res.json({ message: "success", data, Total_Jobs, Total_Pages })
})

module.exports.getJobByIdCtrl = asyncHandler(async (req, res) => {
    const Job = await job.findById(req.params.id);
    if (!Job) {
        return res.status(404).json({message:"Job Not Found"})
    }
    res.json({message:"success", Job})
})

module.exports.updateJobByIdCtrl = asyncHandler(async (req, res) => {
    const { jobId } = req.params
    let found_Job = await job.findById(jobId);
    if (!found_Job) {
        return res.status(404).json({message:"Job Not Found"})
    }
    let Job = await job.findByIdAndUpdate(jobId, req.body);
    res.json({message:"Job Updated Successully", Job})
})

module.exports.deleteJobByIdCtrl = asyncHandler(async (req, res) => {
    const { jobId } = req.params
    let found_Job = await job.findById(jobId);
    if (!found_Job) {
        return res.json({message:"Job Not Found"})
    }
    let Job = await job.findByIdAndDelete(jobId);
    res.json({message:"Job Deleted Successfully"})
})