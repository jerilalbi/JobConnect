import React from 'react'
import {
    Paper,
    Container,
    Box,
    Typography,
    Button
} from "@mui/material";
import {
    ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <Paper component="footer" elevation={1} sx={{ mt: 4, py: 2 }}>
            <Container maxWidth="xl">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="body2" color="text.secondary">
                        © 2025 JobConnect INC
                    </Typography>
                    <Button onClick={() => {
                        localStorage.clear();
                        navigate('/')
                    }} variant="outlined" size="small" startIcon={<ExitToApp />}>
                        Logout
                    </Button>
                </Box>
            </Container>
        </Paper>
    )
}

export default Footer