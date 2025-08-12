import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Button,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    IconButton,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from "@mui/material";
import {
    CheckCircle,
    Edit,
    Visibility,
    Group as Users,
    RemoveRedEye as Eye,
    Delete as Trash2,
    Cancel as XCircle,
    Add,
    GetApp,
} from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
    const userRole = "employer";

    const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
    const [jobFormDialogOpen, setJobFormDialogOpen] = useState(false);
    const [applicantsDialogOpen, setApplicantsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const [jobForm, setJobForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
        expirationDate: "",
    });

    const jobSeekerApplications = [
        {
            id: 1,
            jobTitle: "Frontend Developer",
            company: "Tech Solutions Inc.",
            appliedDate: "2023-06-15",
            status: "Pending",
            resume: "John_Doe_Resume_Frontend.pdf",
            coverLetter: "Passionate about creating user-friendly interfaces...",
        },
        {
            id: 2,
            jobTitle: "UX Designer",
            company: "Creative Minds",
            appliedDate: "2023-06-10",
            status: "Interviewed",
            resume: "John_Doe_Resume_UX.pdf",
            coverLetter: "Experienced in user research and design thinking...",
        },
        {
            id: 3,
            jobTitle: "Product Manager",
            company: "Innovate Corp",
            appliedDate: "2023-06-05",
            status: "Rejected",
            resume: "John_Doe_Resume_PM.pdf",
            coverLetter: "Strong background in product strategy...",
        },
        {
            id: 4,
            jobTitle: "Backend Developer",
            company: "Data Systems",
            appliedDate: "2023-06-01",
            status: "Offered",
            resume: "John_Doe_Resume_Backend.pdf",
            coverLetter: "Expertise in scalable backend systems...",
        },
    ];

    const [employerJobs, setEmployerJobs] = useState([
        {
            id: 1,
            title: "Senior React Developer",
            description: "We are looking for an experienced React developer...",
            location: "San Francisco, CA",
            salary: "$120,000 - $150,000",
            jobType: "Full-Time",
            applicants: 12,
            active: true,
            expiresAt: "2023-07-30",
            applicantsList: [
                {
                    id: 1,
                    name: "Alice Johnson",
                    email: "alice@example.com",
                    resume: "Alice_Resume.pdf",
                    appliedDate: "2023-06-20",
                },
                {
                    id: 2,
                    name: "Bob Smith",
                    email: "bob@example.com",
                    resume: "Bob_Resume.pdf",
                    appliedDate: "2023-06-18",
                },
                {
                    id: 3,
                    name: "Carol Davis",
                    email: "carol@example.com",
                    resume: "Carol_Resume.pdf",
                    appliedDate: "2023-06-15",
                },
            ],
        },
        {
            id: 2,
            title: "UI/UX Designer",
            description: "Creative designer needed for user experience projects...",
            location: "New York, NY",
            salary: "$90,000 - $120,000",
            jobType: "Full-Time",
            applicants: 8,
            active: true,
            expiresAt: "2023-07-25",
            applicantsList: [
                {
                    id: 4,
                    name: "David Wilson",
                    email: "david@example.com",
                    resume: "David_Resume.pdf",
                    appliedDate: "2023-06-22",
                },
                {
                    id: 5,
                    name: "Eva Brown",
                    email: "eva@example.com",
                    resume: "Eva_Resume.pdf",
                    appliedDate: "2023-06-19",
                },
            ],
        },
        {
            id: 3,
            title: "Project Manager",
            description: "Experienced PM to lead cross-functional teams...",
            location: "Remote",
            salary: "$100,000 - $130,000",
            jobType: "Full-Time",
            applicants: 5,
            active: false,
            expiresAt: "2023-06-30",
            applicantsList: [
                {
                    id: 6,
                    name: "Frank Miller",
                    email: "frank@example.com",
                    resume: "Frank_Resume.pdf",
                    appliedDate: "2023-06-10",
                },
            ],
        },
    ]);

    const [adminJobListings, setAdminJobListings] = useState([
        {
            id: 1,
            title: "Senior React Developer",
            company: "Tech Solutions Inc.",
            status: "Active",
            postedDate: "2023-06-01",
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Minds",
            status: "Active",
            postedDate: "2023-06-05",
        },
        {
            id: 3,
            title: "Project Manager",
            company: "Innovate Corp",
            status: "Pending",
            postedDate: "2023-06-10",
        },
        {
            id: 4,
            title: "Backend Developer",
            company: "Data Systems",
            status: "Inactive",
            postedDate: "2023-05-15",
        },
    ]);

    const adminUsers = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Job Seeker",
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Employer",
            status: "Active",
        },
        {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "Job Seeker",
            status: "Inactive",
        },
    ];

    const handleViewResume = (application) => {
        setSelectedApplication(application);
        setResumeDialogOpen(true);
    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setJobForm({
            title: job.title,
            description: job.description,
            location: job.location,
            salary: job.salary,
            jobType: job.jobType,
            expirationDate: job.expiresAt,
        });
        setJobFormDialogOpen(true);
    };

    const handleCreateJob = () => {
        setEditingJob(null);
        setJobForm({
            title: "",
            description: "",
            location: "",
            salary: "",
            jobType: "Full-Time",
            expirationDate: "",
        });
        setJobFormDialogOpen(true);
    };

    const handleViewApplicants = (job) => {
        setSelectedJob(job);
        setApplicantsDialogOpen(true);
    };

    const handleDeleteJob = (job) => {
        setSelectedJob(job);
        setDeleteDialogOpen(true);
    };

    const handleApproveJob = (jobId) => {
        setAdminJobListings((prev) =>
            prev.map((job) =>
                job.id === jobId ? { ...job, status: "Active" } : job,
            ),
        );
    };

    const handleRejectJob = (jobId) => {
        setAdminJobListings((prev) =>
            prev.map((job) =>
                job.id === jobId ? { ...job, status: "Inactive" } : job,
            ),
        );
    };

    const handleSaveJob = () => {
        if (editingJob) {
            setEmployerJobs((prev) =>
                prev.map((job) =>
                    job.id === editingJob.id ? { ...job, ...jobForm } : job,
                ),
            );
        } else {
            const newJob = {
                id: Date.now(),
                ...jobForm,
                applicants: 0,
                active: true,
                expiresAt: jobForm.expirationDate,
                applicantsList: [],
            };
            setEmployerJobs((prev) => [...prev, newJob]);
        }
        setJobFormDialogOpen(false);
    };

    const confirmDeleteJob = () => {
        if (userRole === "employer") {
            setEmployerJobs((prev) =>
                prev.filter((job) => job.id !== selectedJob.id),
            );
        } else if (userRole === "admin") {
            setAdminJobListings((prev) =>
                prev.filter((job) => job.id !== selectedJob.id),
            );
        }
        setDeleteDialogOpen(false);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "active":
            case "offered":
                return "success";
            case "pending":
                return "warning";
            case "interviewed":
                return "info";
            case "rejected":
            case "inactive":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
            <Header userRole={'jobSeeker'} />
            <Container maxWidth="xl" sx={{ mt: 2 }}>
                {userRole === "jobSeeker" && (
                    <Box>
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title="Applications"
                                        subheader="Your job application status"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {jobSeekerApplications.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title="Interviews"
                                        subheader="Upcoming interviews"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {
                                                jobSeekerApplications.filter(
                                                    (app) => app.status === "Interviewed",
                                                ).length
                                            }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader title="Offers" subheader="Job offers received" />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {
                                                jobSeekerApplications.filter(
                                                    (app) => app.status === "Offered",
                                                ).length
                                            }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Card>
                            <CardHeader
                                title="Recent Applications"
                                subheader="Track your job applications"
                            />
                            <CardContent>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Job Title</TableCell>
                                                <TableCell>Company</TableCell>
                                                <TableCell>Applied Date</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {jobSeekerApplications.map((application) => (
                                                <TableRow key={application.id}>
                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                        {application.jobTitle}
                                                    </TableCell>
                                                    <TableCell>{application.company}</TableCell>
                                                    <TableCell>{application.appliedDate}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={application.status}
                                                            color={getStatusColor(application.status)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="text"
                                                            size="small"
                                                            startIcon={<Visibility />}
                                                            onClick={() => handleViewResume(application)}
                                                        >
                                                            View Resume
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" fullWidth>
                                    View All Applications
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                )}

                {userRole === "employer" && (
                    <Box>
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title="Active Jobs"
                                        subheader="Currently active job postings"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {employerJobs.filter((job) => job.active).length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title="Total Applicants"
                                        subheader="Across all job postings"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {employerJobs.reduce(
                                                (sum, job) => sum + job.applicants,
                                                0,
                                            )}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title="Expiring Soon"
                                        subheader="Jobs expiring within 7 days"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            1
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Card>
                            <CardHeader
                                title="Your Job Postings"
                                subheader="Manage your job listings"
                                action={
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={handleCreateJob}
                                    >
                                        Post New Job
                                    </Button>
                                }
                            />
                            <CardContent>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Job Title</TableCell>
                                                <TableCell>Applicants</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Expires</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {employerJobs.map((job) => (
                                                <TableRow key={job.id}>
                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                        {job.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box display="flex" alignItems="center">
                                                            <Users sx={{ mr: 1, color: "text.secondary" }} />
                                                            {job.applicants}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={job.active ? "Active" : "Inactive"}
                                                            color={job.active ? "success" : "default"}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{job.expiresAt}</TableCell>
                                                    <TableCell>
                                                        <Box display="flex" gap={1}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleViewApplicants(job)}
                                                                title="View Applicants"
                                                            >
                                                                <Eye />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleEditJob(job)}
                                                                title="Edit Job"
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => handleDeleteJob(job)}
                                                                title="Delete Job"
                                                            >
                                                                <Trash2 />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {userRole === "admin" && (
                    <Box>
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardHeader title="Total Jobs" subheader="All job listings" />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {adminJobListings.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardHeader
                                        title="Active Jobs"
                                        subheader="Currently active"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {
                                                adminJobListings.filter(
                                                    (job) => job.status === "Active",
                                                ).length
                                            }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardHeader
                                        title="Pending Approval"
                                        subheader="Jobs awaiting review"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {
                                                adminJobListings.filter(
                                                    (job) => job.status === "Pending",
                                                ).length
                                            }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardHeader
                                        title="Total Users"
                                        subheader="Registered users"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {adminUsers.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Box sx={{ mb: 3 }}>
                            <Tabs
                                value={tabValue}
                                onChange={(e, newValue) => setTabValue(newValue)}
                            >
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <Tab label="Job Listings" />
                                    <Tab label="Users" />
                                </Box>

                                {tabValue === 0 && (
                                    <Box sx={{ mt: 3 }}>
                                        <Card>
                                            <CardHeader
                                                title="Job Listings"
                                                subheader="Manage all job postings"
                                            />
                                            <CardContent>
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Job Title</TableCell>
                                                                <TableCell>Company</TableCell>
                                                                <TableCell>Posted Date</TableCell>
                                                                <TableCell>Status</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {adminJobListings.map((job) => (
                                                                <TableRow key={job.id}>
                                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                                        {job.title}
                                                                    </TableCell>
                                                                    <TableCell>{job.company}</TableCell>
                                                                    <TableCell>{job.postedDate}</TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            label={job.status}
                                                                            color={getStatusColor(job.status)}
                                                                            size="small"
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Box display="flex" gap={1}>
                                                                            <IconButton
                                                                                size="small"
                                                                                title="View Details"
                                                                            >
                                                                                <Eye />
                                                                            </IconButton>
                                                                            {job.status === "Pending" && (
                                                                                <IconButton
                                                                                    size="small"
                                                                                    color="success"
                                                                                    onClick={() =>
                                                                                        handleApproveJob(job.id)
                                                                                    }
                                                                                    title="Approve Job"
                                                                                >
                                                                                    <CheckCircle />
                                                                                </IconButton>
                                                                            )}
                                                                            {job.status === "Active" && (
                                                                                <IconButton
                                                                                    size="small"
                                                                                    color="error"
                                                                                    onClick={() =>
                                                                                        handleRejectJob(job.id)
                                                                                    }
                                                                                    title="Deactivate Job"
                                                                                >
                                                                                    <XCircle />
                                                                                </IconButton>
                                                                            )}
                                                                            <IconButton
                                                                                size="small"
                                                                                color="error"
                                                                                onClick={() => handleDeleteJob(job)}
                                                                                title="Delete Job"
                                                                            >
                                                                                <Trash2 />
                                                                            </IconButton>
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )}

                                {tabValue === 1 && (
                                    <Box sx={{ mt: 3 }}>
                                        <Card>
                                            <CardHeader
                                                title="Users"
                                                subheader="Manage registered users"
                                            />
                                            <CardContent>
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell>Email</TableCell>
                                                                <TableCell>Role</TableCell>
                                                                <TableCell>Status</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {adminUsers.map((user) => (
                                                                <TableRow key={user.id}>
                                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                                        {user.name}
                                                                    </TableCell>
                                                                    <TableCell>{user.email}</TableCell>
                                                                    <TableCell>{user.role}</TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            label={user.status}
                                                                            color={getStatusColor(user.status)}
                                                                            size="small"
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Box display="flex" gap={1}>
                                                                            <IconButton size="small">
                                                                                <Eye />
                                                                            </IconButton>
                                                                            <IconButton size="small">
                                                                                {user.status === "Active" ? (
                                                                                    <XCircle color="error" />
                                                                                ) : (
                                                                                    <CheckCircle color="success" />
                                                                                )}
                                                                            </IconButton>
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )}
                            </Tabs>
                        </Box>
                    </Box>
                )}
            </Container>

            <Dialog
                open={resumeDialogOpen}
                onClose={() => setResumeDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Resume for {selectedApplication?.jobTitle}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Application Details
                        </Typography>
                        <Typography>
                            <strong>Job:</strong> {selectedApplication?.jobTitle}
                        </Typography>
                        <Typography>
                            <strong>Company:</strong> {selectedApplication?.company}
                        </Typography>
                        <Typography>
                            <strong>Applied Date:</strong> {selectedApplication?.appliedDate}
                        </Typography>
                        <Typography>
                            <strong>Status:</strong> {selectedApplication?.status}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Resume
                        </Typography>
                        <Button variant="outlined" startIcon={<GetApp />} sx={{ mb: 2 }}>
                            Download {selectedApplication?.resume}
                        </Button>
                        <Typography variant="body2" color="text.secondary">
                            Resume file: {selectedApplication?.resume}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Cover Letter
                        </Typography>
                        <Typography variant="body2">
                            {selectedApplication?.coverLetter}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResumeDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Job Form Dialog */}
            <Dialog
                open={jobFormDialogOpen}
                onClose={() => setJobFormDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>{editingJob ? "Edit Job" : "Post New Job"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField
                            label="Job Title"
                            value={jobForm.title}
                            onChange={(e) =>
                                setJobForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                            fullWidth
                            required
                        />
                        <TextField
                            label="Job Description"
                            value={jobForm.description}
                            onChange={(e) =>
                                setJobForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            multiline
                            rows={4}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Location"
                            value={jobForm.location}
                            onChange={(e) =>
                                setJobForm((prev) => ({ ...prev, location: e.target.value }))
                            }
                            fullWidth
                            required
                        />
                        <TextField
                            label="Salary Range"
                            value={jobForm.salary}
                            onChange={(e) =>
                                setJobForm((prev) => ({ ...prev, salary: e.target.value }))
                            }
                            placeholder="e.g., $80,000 - $120,000"
                            fullWidth
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel>Job Type</InputLabel>
                            <Select
                                value={jobForm.jobType}
                                onChange={(e) =>
                                    setJobForm((prev) => ({ ...prev, jobType: e.target.value }))
                                }
                                label="Job Type"
                            >
                                <MenuItem value="Full-Time">Full-Time</MenuItem>
                                <MenuItem value="Part-Time">Part-Time</MenuItem>
                                <MenuItem value="Contract">Contract</MenuItem>
                                <MenuItem value="Remote">Remote</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Expiration Date"
                            type="date"
                            value={jobForm.expirationDate}
                            onChange={(e) =>
                                setJobForm((prev) => ({
                                    ...prev,
                                    expirationDate: e.target.value,
                                }))
                            }
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJobFormDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveJob} variant="contained">
                        {editingJob ? "Update Job" : "Post Job"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={applicantsDialogOpen}
                onClose={() => setApplicantsDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Applicants for {selectedJob?.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Total Applicants: {selectedJob?.applicants}
                    </Typography>
                    <List>
                        {selectedJob?.applicantsList?.map((applicant) => (
                            <ListItem key={applicant.id} divider>
                                <ListItemAvatar>
                                    <Avatar
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant.name}`}
                                    >
                                        {applicant.name.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={applicant.name}
                                    secondary={
                                        <Box>
                                            <Typography variant="body2">{applicant.email}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Applied: {applicant.appliedDate}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        size="small"
                                        startIcon={<GetApp />}
                                        variant="outlined"
                                    >
                                        Resume
                                    </Button>
                                    <Button size="small" variant="contained">
                                        Contact
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setApplicantsDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the job posting "
                        {selectedJob?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDeleteJob} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </Box>
    );
};

export default Home;