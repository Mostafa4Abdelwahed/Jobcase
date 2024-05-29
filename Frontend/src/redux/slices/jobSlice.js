import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name:"job",
    initialState: {
        jobs: [],
        jobsCount: 0,
        PendingCount: 0,
        InterviewCount: 0,
        DeclineCount: 0,
    },
    reducers: {
        setJobs(state,action) {
            state.jobs = action.payload
        },
        setJobsCount(state,action) {
            state.jobsCount = action.payload
        },
        setPendingCount(state,action) {
            state.PendingCount = action.payload
        },
        setInterviewCount(state,action) {
            state.InterviewCount = action.payload
        },
        setDeclineCount(state,action) {
            state.DeclineCount = action.payload
        },
    }
})

const jobReducer = jobSlice.reducer
const jobActions = jobSlice.actions

export {jobReducer, jobActions}