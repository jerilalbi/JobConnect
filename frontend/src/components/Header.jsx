import React from 'react'
import {
    Box,
    Typography,
    Avatar,
    AppBar,
    Toolbar,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Header({ userRole, isSearch = false }) {
    const navigate = useNavigate();
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography
                    variant="h5"
                    component="h1"
                    onClick={() => { navigate('/') }}
                    sx={{ flexGrow: 1, fontWeight: "bold", cursor: 'pointer' }}
                >
                    JobConnect
                </Typography>

                {(userRole === 'jobseeker' && !isSearch) && (
                    <Box
                        onClick={() => { navigate('/search') }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#1976d2',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '15px',
                            marginRight: '15px',
                            cursor: 'pointer'
                        }}>
                        <Typography>Search Jobs</Typography>
                    </Box>
                )}

                <Box display="flex" alignItems="center" gap={2}>
                    <Box textAlign="right">
                        <Typography variant="body2" fontWeight="500">
                            {localStorage.getItem("name") ?? ''}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {userRole === "jobseeker"
                                ? "Job Seeker"
                                : userRole === "employer"
                                    ? "Employer"
                                    : "Administrator"}
                        </Typography>
                    </Box>
                    <Avatar
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="User avatar"
                    >
                        Name
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header