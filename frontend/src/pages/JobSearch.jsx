import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Grid,
    InputAdornment,
} from "@mui/material";
import {
    Search,
    LocationOn,
    Work,
    AttachMoney,
} from "@mui/icons-material";
import JobCard from "../components/JobCard";
import JobDetails from "../components/JobDetails";
import Header from "../components/Header";
import Footer from "../components/Footer";

function JobSearch() {
    const userRole = localStorage.getItem("role");
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Frontend Developer",
            company: "Tech Solutions Inc.",
            location: "San Francisco, CA",
            salary: "$80,000 - $120,000",
            jobType: "Full-Time",
            postedDate: "2023-06-15",
            description:
                "We are looking for an experienced Frontend Developer proficient in React.js to join our team.",
        },
        {
            id: 2,
            title: "Backend Engineer",
            company: "Data Systems LLC",
            location: "New York, NY",
            salary: "$90,000 - $130,000",
            jobType: "Full-Time",
            postedDate: "2023-06-10",
            description:
                "Seeking a skilled Backend Engineer with experience in Node.js and database management.",
        },
        {
            id: 3,
            title: "UX Designer",
            company: "Creative Minds Agency",
            location: "Remote",
            salary: "$70,000 - $100,000",
            jobType: "Remote",
            postedDate: "2023-06-12",
            description:
                "Join our creative team as a UX Designer to create intuitive and engaging user experiences.",
        },
        {
            id: 4,
            title: "DevOps Engineer",
            company: "Cloud Solutions Co.",
            location: "Austin, TX",
            salary: "$95,000 - $140,000",
            jobType: "Full-Time",
            postedDate: "2023-06-08",
            description:
                "Looking for a DevOps Engineer to help streamline our deployment processes and infrastructure.",
        },
        {
            id: 5,
            title: "Content Writer",
            company: "Media Publishing Group",
            location: "Chicago, IL",
            salary: "$50,000 - $70,000",
            jobType: "Part-Time",
            postedDate: "2023-06-14",
            description:
                "Seeking a talented Content Writer to create engaging articles and marketing materials.",
        },
    ]);

    const [filters, setFilters] = useState({
        keyword: "",
        location: "",
        jobType: "",
        salaryRange: "",
    });

    const [sortBy, setSortBy] = useState("dateDesc");

    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleJobClick = (jobId) => {
        const job = jobs.find((j) => j.id === parseInt(jobId));
        if (job) {
            const jobWithDetails = {
                ...job,
                expirationDate: "2023-07-15",
                requirements: [
                    "Bachelor's degree in Computer Science or related field",
                    "Strong problem-solving skills",
                    "Excellent communication abilities",
                    "Team collaboration experience",
                    "Attention to detail",
                ],
                companyDescription: `${job.company} is a leading company in the industry, committed to innovation and excellence. We provide a collaborative work environment where talented individuals can grow and make a meaningful impact.`,
            };
            setSelectedJob(jobWithDetails);
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const filteredJobs = jobs.filter((job) => {
        const keywordMatch =
            !filters.keyword ||
            job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            job.description.toLowerCase().includes(filters.keyword.toLowerCase());

        const locationMatch =
            !filters.location ||
            job.location.toLowerCase().includes(filters.location.toLowerCase());

        const jobTypeMatch =
            !filters.jobType ||
            filters.jobType === "all" ||
            job.jobType === filters.jobType;

        return keywordMatch && locationMatch && jobTypeMatch;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortBy === "dateDesc") {
            return new Date(b.postedDate) - new Date(a.postedDate);
        } else if (sortBy === "dateAsc") {
            return new Date(a.postedDate) - new Date(b.postedDate);
        } else if (sortBy === "salaryDesc") {
            const salaryA = parseInt(a.salary.split(" - ")[1].replace(/[^0-9]/g, ""));
            const salaryB = parseInt(b.salary.split(" - ")[1].replace(/[^0-9]/g, ""));
            return salaryB - salaryA;
        } else if (sortBy === "salaryAsc") {
            const salaryA = parseInt(a.salary.split(" - ")[0].replace(/[^0-9]/g, ""));
            const salaryB = parseInt(b.salary.split(" - ")[0].replace(/[^0-9]/g, ""));
            return salaryA - salaryB;
        }
        return 0;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Header userRole={userRole} isSearch={true} />
            <Container maxWidth="xl" sx={{ pt: 3 }}>
                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                    Find Your Dream Job
                </Typography>

                <Card sx={{ mb: 4 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField
                                    fullWidth
                                    placeholder="Job title or keyword"
                                    value={filters.keyword}
                                    onChange={(e) =>
                                        handleFilterChange("keyword", e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <TextField
                                    fullWidth
                                    placeholder="Location"
                                    value={filters.location}
                                    onChange={(e) =>
                                        handleFilterChange("location", e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Job Type</InputLabel>
                                    <Select
                                        value={filters.jobType}
                                        label="Job Type"
                                        onChange={(e) =>
                                            handleFilterChange("jobType", e.target.value)
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Work />
                                            </InputAdornment>
                                        }
                                    >
                                        <MenuItem value="all">All Types</MenuItem>
                                        <MenuItem value="Full-Time">Full-Time</MenuItem>
                                        <MenuItem value="Part-Time">Part-Time</MenuItem>
                                        <MenuItem value="Remote">Remote</MenuItem>
                                        <MenuItem value="Contract">Contract</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Salary Range</InputLabel>
                                    <Select
                                        value={filters.salaryRange}
                                        label="Salary Range"
                                        onChange={(e) =>
                                            handleFilterChange("salaryRange", e.target.value)
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AttachMoney />
                                            </InputAdornment>
                                        }
                                    >
                                        <MenuItem value="any">Any Salary</MenuItem>
                                        <MenuItem value="0-50000">$0 - $50,000</MenuItem>
                                        <MenuItem value="50000-80000">$50,000 - $80,000</MenuItem>
                                        <MenuItem value="80000-100000">$80,000 - $100,000</MenuItem>
                                        <MenuItem value="100000+">$100,000+</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="body2" color="text.secondary">
                        Showing {indexOfFirstJob + 1}-
                        {Math.min(indexOfLastJob, sortedJobs.length)} of {sortedJobs.length}{" "}
                        jobs
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            Sort by:
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <Select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="dateDesc">Newest First</MenuItem>
                                <MenuItem value="dateAsc">Oldest First</MenuItem>
                                <MenuItem value="salaryDesc">Highest Salary</MenuItem>
                                <MenuItem value="salaryAsc">Lowest Salary</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{ "& > *": { mb: 2 } }}>
                    {currentJobs.length > 0 ? (
                        currentJobs.map((job) => (
                            <JobCard key={job.id} {...job} onClick={handleJobClick} />
                        ))
                    ) : (
                        <Card sx={{ p: 4, textAlign: "center" }}>
                            <Typography color="text.secondary">
                                No jobs found matching your criteria.
                            </Typography>
                        </Card>
                    )}
                </Box>


                {sortedJobs.length > 0 && (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(e, page) => setCurrentPage(page)}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}

                <Footer />

                {selectedJob && (
                    <JobDetails
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        job={selectedJob}
                    />
                )}
            </Container>
        </Box>
    );
};

export default JobSearch;
