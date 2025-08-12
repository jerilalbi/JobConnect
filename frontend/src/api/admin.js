import axios from "axios";

const API_URL = "http://localhost:5000/job";
const token = localStorage.getItem("token");

export const approveJobStatus = async (jobId) => {
    try {
        const res = await axios.post(`${API_URL}/${jobId}/disapprove`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const disapproveJobStatus = async (jobId) => {
    try {
        const res = await axios.post(`${API_URL}/${jobId}/disapprove`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res.data
    } catch (error) {
        throw error
    }
}