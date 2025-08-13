import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/register`, {
            "name": formData.name,
            "email": formData.email,
            "password": formData.password,
            "role": formData.role
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/login`, {
            "email": formData.email,
            "password": formData.password
        });
        console.log(`success ${res.data}`)
        return res.data;
    } catch (error) {
        throw error;
    }
}