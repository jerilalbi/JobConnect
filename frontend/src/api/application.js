import axios from "axios";

const API_URL = "http://localhost:5000/application";

export const applyJob = async (jobId, file, coverLetter) => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("coverLetter", coverLetter);

        const res = await axios.post(`${API_URL}/${jobId}/apply`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getMyApplications = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/my-application`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getAppliedJobs = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/applied-jobs`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const viewResume = async (jobId, applicationId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/${jobId}/applicants/${applicationId}/resume`,
            {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob"
            }
        )
        return res.data
    } catch (error) {
        throw error;
    }
}

export const showApplicants = async (jobId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/${jobId}/applicants`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        return res.data;
    } catch (error) {
        throw error
    }
}

export const changeApplicantStatus = async (status, jobId, applicationId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API_URL}/${jobId}/applicants/${applicationId}/status`,
            {
                status: status
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        return res.data;
    } catch (error) {
        throw error;
    }
}