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

                {(userRole === 'jobSeeker' && !isSearch) && (
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
                            Jane Doe
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {userRole === "jobSeeker"
                                ? "Job Seeker"
                                : userRole === "employer"
                                    ? "Employer"
                                    : "Administrator"}
                        </Typography>
                    </Box>
                    <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                        alt="User avatar"
                    >
                        JD
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header