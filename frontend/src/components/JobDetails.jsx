import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Divider,
    Card,
    CardContent,
    Box,
    Grid,
    Alert,
    FormControl,
} from "@mui/material";
import {
    CalendarToday,
    LocationOn,
    Work,
    AttachMoney,
    EventAvailable,
    Business,
    CloudUpload,
} from "@mui/icons-material";
import { applyJob } from "../api/application";

function JobDetails({
    isOpen = true,
    onClose = () => { },
    job
}) {
    const [file, setFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const isApplied = await applyJob(job._id, file, coverLetter)
        if (isApplied.success) {
            setTimeout(() => {
                setIsSubmitting(false);
                setApplicationSubmitted(true);
            }, 1500);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { maxHeight: "90vh" },
            }}
        >
            <DialogTitle>
                <Typography variant="h4" component="h2" fontWeight="bold">
                    {job.title}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Business sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                        {job.company}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                <LocationOn
                                    sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                                />
                                <Typography variant="body2">{job.location}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                <AttachMoney
                                    sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                                />
                                <Typography variant="body2">{job.salary}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                <Work sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2">{job.jobType}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
                    <Box display="flex" alignItems="center">
                        <CalendarToday
                            sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Posted: {formatDate(job.updatedAt)}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <EventAvailable
                            sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Expires: {formatDate(job.expirationDate)}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ "& > *": { mb: 3 } }}>
                    <Box>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                            Job Description
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {job.description}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {applicationSubmitted ? (
                    <Alert severity="success" sx={{ textAlign: "center", p: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                            Application Submitted!
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Your application has been successfully submitted. You can track
                            its status in your dashboard.
                        </Typography>
                    </Alert>
                ) : (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ "& > *": { mb: 2 } }}
                    >
                        <Typography variant="h6" fontWeight="600">
                            Apply for this Position
                        </Typography>

                        <FormControl fullWidth>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                Upload Resume/CV
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<CloudUpload />}
                                sx={{ justifyContent: "flex-start", textAlign: "left", p: 2 }}
                            >
                                {file ? file.name : "Select file"}
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    hidden
                                    onChange={handleFileChange}
                                    required
                                />
                            </Button>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                Accepted formats: PDF, DOC, DOCX (Max 5MB)
                            </Typography>
                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Cover Letter (Optional)"
                            placeholder="Tell us why you're a good fit for this position..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                        />
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                {applicationSubmitted ? (
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                ) : (
                    <>
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={isSubmitting || !file}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default JobDetails;
