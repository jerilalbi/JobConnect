import axios from "axios";

const API_URL = "http://localhost:5000/job";

export const changeJobStatus = async (jobId, status) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API_URL}/${jobId}/update-status`,
            {
                status: status
            },
            { headers: { 'Authorization': `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const getAllJobs = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/all-jobs`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res.data;
    } catch (error) {
        throw error
    }
}