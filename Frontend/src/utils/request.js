import axios from "axios"

const request = axios.create({
    baseURL: "https://jobcase-backend.onrender.com/api"
})

export default request
