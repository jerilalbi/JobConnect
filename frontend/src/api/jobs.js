import axios from "axios";

const API_URL = "http://localhost:5000/job";

export const createJob = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_URL}/post`,
            {
                "title": data.title,
                "description": data.description,
                "location": data.location,
                "company": data.company,
                "salary": data.salary,
                "jobType": data.jobType,
                "expirationDate": data.expirationDate
            },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        return res.data
    } catch (error) {
        throw error
    }
}

export const showEmployerJobs = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/my-jobs`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return res.data;
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const editJob = async (data, id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API_URL}/${id}`,
            {
                "title": data.title,
                "description": data.description,
                "location": data.location,
                "salary": data.salary,
                "company": data.company,
                "jobType": data.jobType,
                "expirationDate": data.expirationDate
            },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        return res.data
    } catch (error) {
        throw error
    }
}

export const deleteJob = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${API_URL}/${id}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        return res.data
    } catch (error) {
        throw error
    }
}

export const showApprovedJobs = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        return res.data;
    } catch (error) {
        throw error;
    }
}