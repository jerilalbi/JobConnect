import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
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
import { useEffect } from "react";
import { createJob, deleteJob, editJob, showEmployerJobs } from "../api/jobs";
import { changeJobStatus, getAllJobs } from "../api/admin";
import { changeApplicantStatus, getMyApplications, showApplicants, viewResume } from "../api/application";

function Home() {
    const userRole = localStorage.getItem("role");

    const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
    const [jobFormDialogOpen, setJobFormDialogOpen] = useState(false);
    const [applicantsDialogOpen, setApplicantsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [coverLetterDialogOpen, setCoverLetterDialogOpen] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationDetails, setApplicationDetails] = useState({});
    const [applicantsDetails, setApplicantsDetails] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const [jobForm, setJobForm] = useState({
        title: "",
        description: "",
        location: "",
        company: "",
        salary: "",
        jobType: "Full-Time",
        expirationDate: "",
    });

    const [jobSeekerApplications, setJobSeekerApplications] = useState([]);
    const [employerJobs, setEmployerJobs] = useState([]);
    const [adminJobListings, setAdminJobListings] = useState([]);

    const handleViewResume = async (jobId, applicationId) => {
        const file = await viewResume(jobId, applicationId);
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");


    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setJobForm({
            title: job.title,
            description: job.description,
            location: job.location,
            company: job.company,
            salary: job.salary,
            jobType: job.jobType,
            expirationDate: new Date(job.expirationDate).toISOString().split('T')[0],
        });
        setJobFormDialogOpen(true);
    };

    const handleCreateJob = () => {
        setEditingJob(null);
        setJobForm({
            title: "",
            description: "",
            location: "",
            company: "",
            salary: "",
            jobType: "Full-Time",
            expirationDate: "",
        });
        setJobFormDialogOpen(true);
    };

    const handleViewApplicants = async (job) => {
        const jobApplicants = await showApplicants(job._id);
        setApplicationDetails(jobApplicants);
        setApplicantsDetails(jobApplicants.applicants);
        console.log(applicantsDetails)
        setApplicantsDialogOpen(true);
    };

    const handleDeleteJob = (job) => {
        setSelectedJob(job);
        setDeleteDialogOpen(true);
    };

    const handleApproveJob = async (jobId) => {
        const isStatusChanged = await changeJobStatus(jobId, 'approved');
        if (isStatusChanged.success) {
            setAdminJobListings((prev) =>
                prev.map((job) =>
                    job._id === jobId ? { ...job, status: "approved" } : job,
                ),
            );
        }
    };

    const updateApplicantStatus = async (status, jobId, applicationId) => {
        await changeApplicantStatus(status, jobId, applicationId)
        setApplicantsDetails((prev) => prev.map((applicant) => applicant._id === applicationId ? { ...applicant, status: status } : applicant))

    }

    const handleRejectJob = async (jobId) => {
        const isStatusChanged = await changeJobStatus(jobId, 'deactivated');
        if (isStatusChanged.success) {
            setAdminJobListings((prev) =>
                prev.map((job) =>
                    job._id === jobId ? { ...job, status: "deactivated" } : job,
                ),
            );
        }
    };

    const handleSaveJob = async () => {
        if (editingJob) {
            const updatedJob = await editJob(jobForm, editingJob._id);

            setEmployerJobs((prev) =>
                prev.map((job) =>
                    job._id === editingJob._id ? updatedJob.job : job,
                ),

            );
        } else {
            const newJob = await createJob(jobForm);
            setEmployerJobs((prev) => [...prev, newJob.job]);
        }
        setJobFormDialogOpen(false);
    };

    const confirmDeleteJob = async () => {
        const isDelete = await deleteJob(selectedJob._id);
        if (isDelete) {
            setEmployerJobs((prev) =>
                prev.filter((job) => job._id !== selectedJob._id),
            );
            setDeleteDialogOpen(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "shortlisted":
                return "success";
            case "rejected":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusColorAdmin = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "success";
            case "deactivated":
                return "error";
            default:
                return "default";
        }
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const getEmployerData = async () => {
            const employerJobData = await showEmployerJobs();
            setEmployerJobs(employerJobData.jobs)
        }

        const getAllJobsAdmin = async () => {
            const allJobsAdminData = await getAllJobs();
            setAdminJobListings(allJobsAdminData.jobs)
        }

        const getUserApplications = async () => {
            const userApplications = await getMyApplications();
            setJobSeekerApplications(userApplications.applications)
        }

        if (userRole === 'employer') {
            getEmployerData();
        }
        if (userRole === 'admin') {
            getAllJobsAdmin();
        }
        if (userRole === 'jobseeker') {
            getUserApplications();
        }

    }, [])

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
            <Header userRole={userRole} />
            <Container maxWidth="xl" sx={{ mt: 2 }}>
                {userRole === "jobseeker" && (
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
                                        title="Shortlisted"
                                        subheader="Upcoming interviews"
                                    />
                                    <CardContent>
                                        <Typography variant="h3" fontWeight="bold">
                                            {
                                                jobSeekerApplications.filter(
                                                    (app) => app.status === "shortlisted",
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
                                                        {application.job.title}
                                                    </TableCell>
                                                    <TableCell>{application.job.company}</TableCell>
                                                    <TableCell>{formatDate(application.createdAt)}</TableCell>
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
                                                            onClick={() => handleViewResume(application.job._id, application._id)}
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
                                            {employerJobs.filter((job) => job.status === 'approved').length}
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
                                                <TableCell>Company</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Expires</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {employerJobs.map((job) => (
                                                <TableRow key={job._id}>
                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                        {job.title}
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                        {job.company || ''}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={job.status}
                                                            color={job.status === "pending" ? "default" : job.status === "approved" ? 'success' : 'error'}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{new Date(job.expirationDate).toISOString().split('T')[0]}</TableCell>
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
                                                    (job) => job.status === "approved",
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
                                                    (job) => job.status === "pending",
                                                ).length
                                            }
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
                                                            <TableRow key={job._id}>
                                                                <TableCell sx={{ fontWeight: 500 }}>
                                                                    {job.title}
                                                                </TableCell>
                                                                <TableCell>{job.company || 'company'}</TableCell>
                                                                <TableCell>{job.postedDate || 'date'}</TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        label={job.status}
                                                                        color={getStatusColorAdmin(job.status)}
                                                                        size="small"
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box display="flex" gap={1}>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="success"
                                                                            onClick={() =>
                                                                                handleApproveJob(job._id)
                                                                            }
                                                                            title="Approve Job"
                                                                        >
                                                                            <CheckCircle />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() =>
                                                                                handleRejectJob(job._id)
                                                                            }
                                                                            title="Deactivate Job"
                                                                        >
                                                                            <XCircle />
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
                            label="Company Name"
                            value={jobForm.company}
                            onChange={(e) =>
                                setJobForm((prev) => ({ ...prev, company: e.target.value }))
                            }
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
                <DialogTitle>Applicants for {applicationDetails?.jobTitle}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Total Applicants: {applicationDetails?.totalApplicants}
                    </Typography>
                    <List>
                        {applicantsDetails?.map((applicant) => (
                            <ListItem key={applicant.id} divider>
                                <ListItemAvatar>
                                    <Avatar
                                        src={`https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80`}
                                    >
                                        {applicant.applicant.name}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={applicant.applicant.name}
                                    secondary={
                                        <Box>
                                            <Typography variant="body2">{applicant.applicant.email}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Applied {formatDate(applicant.createdAt)}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        onClick={() => {
                                            handleViewResume(applicant.job, applicant._id)
                                        }}
                                        size="small"
                                        startIcon={<GetApp />}
                                        variant="outlined"
                                    >
                                        Resume
                                    </Button>
                                    <Button onClick={() => { setCoverLetter(applicant.coverLetter); setCoverLetterDialogOpen(true) }} size="small" variant="contained">
                                        Cover Letter
                                    </Button>
                                    <FormControl>
                                        <InputLabel
                                            id="job-type-label"
                                            sx={{ color: 'black' }}
                                        >
                                            Status
                                        </InputLabel>
                                        <Select
                                            value={applicant.status}
                                            onChange={(e) =>
                                                updateApplicantStatus(e.target.value, applicant.job, applicant._id)
                                            }
                                            label="Status"
                                        >
                                            <MenuItem value="applied">Applied</MenuItem>
                                            <MenuItem value="shortlisted">Short Listed</MenuItem>
                                            <MenuItem value="rejected">Rejected</MenuItem>
                                        </Select>
                                    </FormControl>

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
                open={coverLetterDialogOpen}
                onClose={() => setCoverLetterDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Cover Letter</DialogTitle>
                <DialogContent>
                    <Typography>{coverLetter}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCoverLetterDialogOpen(false)}>Close</Button>
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