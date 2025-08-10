import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Alert,
    Box,
    Container,
    FormControl,
    FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Error, CheckCircle } from "@mui/icons-material";

function AuthPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "jobSeeker",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!loginForm.email || !loginForm.password) {
            setError("Please fill in all fields");
            return;
        }

        if (
            loginForm.email === "admin@example.com" &&
            loginForm.password === "password"
        ) {

        } else if (
            loginForm.email === "employer@example.com" &&
            loginForm.password === "password"
        ) {

        } else if (
            loginForm.email === "jobseeker@example.com" &&
            loginForm.password === "password"
        ) {
            navigate("/home");
        } else {
            setError("Invalid email or password");
        }

    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (
            !signupForm.name ||
            !signupForm.email ||
            !signupForm.password ||
            !signupForm.confirmPassword
        ) {
            setError("Please fill in all fields");
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setSuccess("Account created successfully! Please log in.");

        setSignupForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "jobSeeker",
        });
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.50",
                py: 4,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: '600', mb: '20px' }}>
                JobConnect
            </Typography>
            <Card sx={{ width: "100%", maxWidth: 400 }}>
                <Tabs
                    value={activeTab === "login" ? 0 : 1}
                    onChange={(e, newValue) =>
                        setActiveTab(newValue === 0 ? "login" : "signup")
                    }
                    variant="fullWidth"
                >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>

                {activeTab === "login" && (
                    <Box component="form" onSubmit={handleLoginSubmit}>
                        <CardContent sx={{ pt: 3, "& > *": { mb: 2.5 } }}>
                            {error && (
                                <Alert severity="error" icon={<Error />}>
                                    {error}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="name@example.com"
                                value={loginForm.email}
                                onChange={(e) =>
                                    setLoginForm({ ...loginForm, email: e.target.value })
                                }
                                required
                            />

                            <Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mb={1}
                                >
                                    <Typography variant="body2">Password</Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={loginForm.password}
                                    onChange={(e) =>
                                        setLoginForm({ ...loginForm, password: e.target.value })
                                    }
                                    required
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </CardContent>
                    </Box>
                )}

                {activeTab === "signup" && (
                    <Box component="form" onSubmit={handleSignupSubmit}>
                        <CardContent sx={{ pt: 3, "& > *": { mb: 2.5 } }}>
                            {error && (
                                <Alert severity="error" icon={<Error />}>
                                    {error}
                                </Alert>
                            )}

                            {success && (
                                <Alert severity="success" icon={<CheckCircle />}>
                                    {success}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                id="name"
                                label="Full Name"
                                placeholder="John Doe"
                                value={signupForm.name}
                                onChange={(e) =>
                                    setSignupForm({ ...signupForm, name: e.target.value })
                                }
                                required
                            />

                            <TextField
                                fullWidth
                                id="signup-email"
                                label="Email"
                                type="email"
                                placeholder="name@example.com"
                                value={signupForm.email}
                                onChange={(e) =>
                                    setSignupForm({ ...signupForm, email: e.target.value })
                                }
                                required
                            />

                            <TextField
                                fullWidth
                                id="signup-password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={signupForm.password}
                                onChange={(e) =>
                                    setSignupForm({ ...signupForm, password: e.target.value })
                                }
                                required
                            />

                            <TextField
                                fullWidth
                                id="confirm-password"
                                label="Confirm Password"
                                type="password"
                                placeholder="••••••••"
                                value={signupForm.confirmPassword}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                required
                            />

                            <FormControl component="fieldset">
                                <FormLabel component="legend">I am a:</FormLabel>
                                <RadioGroup
                                    value={signupForm.role}
                                    onChange={(e) =>
                                        setSignupForm({ ...signupForm, role: e.target.value })
                                    }
                                    sx={{ mt: 1 }}
                                >
                                    <FormControlLabel
                                        value="jobSeeker"
                                        control={<Radio />}
                                        label="Job Seeker"
                                    />
                                    <FormControlLabel
                                        value="employer"
                                        control={<Radio />}
                                        label="Employer"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mt: 1 }}
                            >
                                Create Account
                            </Button>
                        </CardContent>
                    </Box>
                )}
            </Card>
        </Container>
    );
};

export default AuthPage;