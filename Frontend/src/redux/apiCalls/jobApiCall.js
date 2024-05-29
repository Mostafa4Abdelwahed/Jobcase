import { jobActions } from "../slices/jobSlice";
import request from "../../utils/request"
import { toast } from "react-hot-toast";

// Fetch Jobs On Page Number
export function fetchJobs(pageNumber, user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/job/${user.id}?pageNumber=${pageNumber}`,{
                headers:{
                    Authorization: user.token
                }
            })
            dispatch(jobActions.setJobs(data.data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Fetch Jobs Count
export function fetchJobsCount(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/job/${user.id}`,{
                headers:{
                    Authorization: user.token
                }
            })
            dispatch(jobActions.setJobsCount(data.Total_Jobs))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Fetch Jobs Pending Count
export function fetchJobsPendingCount(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/job/${user.id}?status=Pending`,{
                headers:{
                    Authorization: user.token
                }
            })
            dispatch(jobActions.setPendingCount(data.Total_Jobs));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Fetch Jobs Interview Count
export function fetchJobsInterviewCount(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/job/${user.id}?status=Interview`,{
                headers:{
                    Authorization: user.token
                }
            })
            dispatch(jobActions.setInterviewCount(data.Total_Jobs));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Fetch Jobs Decline Count
export function fetchJobsDeclineCount(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/job/${user.id}?status=Decline`,{
                headers:{
                    Authorization: user.token
                }
            })
            dispatch(jobActions.setDeclineCount(data.Total_Jobs));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Add New Job
export function addNewJob(user, job) {
    return async (dispatch) => {
        try {
            const { data } = await request.post(`/job/${user.id}`, job, {
                headers: {
                    Authorization: user.token
                }
            })
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Delete Job By Id
export function deleteJob(user, jobId) {
    return async (dispatch) => {
        try {
            const { data } = await request.delete(`/job/${user.id}/${jobId}`, {
                headers: {
                    Authorization: user.token
                }
            })
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Update Job By Id
export function updateJob(user, jobId, newJob) {
    return async (dispatch) => {
        try {
            const { data } = await request.put(`/job/${user.id}/${jobId}`,newJob , {
                headers: {
                    Authorization: user.token
                }
            })
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}