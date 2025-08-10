import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Button,
    Avatar,
    Box,
    Grid,
} from "@mui/material";
import {
    CalendarToday,
    LocationOn,
    AttachMoney,
} from "@mui/icons-material";

const JobCard = ({
    id = "1",
    title = "Software Engineer",
    company = "Tech Solutions Inc.",
    location = "San Francisco, CA",
    salary = "$80,000 - $120,000",
    jobType = "Full-Time",
    postedDate = "2023-06-15",
    logo = "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
    onClick = () => { },
}) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getChipColor = (type) => {
        switch (type.toLowerCase()) {
            case "full-time":
                return "primary";
            case "part-time":
                return "secondary";
            case "remote":
                return "success";
            case "contract":
                return "warning";
            default:
                return "default";
        }
    };

    return (
        <Card
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                "&:hover": {
                    boxShadow: 3,
                },
                transition: "box-shadow 0.3s",
                borderLeft: 4,
                borderLeftColor: "primary.main",
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="flex-start" gap={2}>
                    <Avatar
                        src={logo}
                        alt={`${company} logo`}
                        sx={{ width: 48, height: 48 }}
                    />

                    <Box flex={1}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            mb={2}
                        >
                            <Box>
                                <Typography variant="h6" component="h3" fontWeight="600">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {company}
                                </Typography>
                            </Box>
                            <Chip
                                label={jobType}
                                color={getChipColor(jobType)}
                                size="small"
                            />
                        </Box>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="center">
                                    <LocationOn
                                        sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {location}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="center">
                                    <AttachMoney
                                        sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {salary}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="center">
                                    <CalendarToday
                                        sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Posted {formatDate(postedDate)}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </CardContent>

            <CardActions
                sx={{ px: 3, py: 2, bgcolor: "grey.50", justifyContent: "flex-end" }}
            >
                <Button variant="contained" onClick={() => onClick(id)}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default JobCard;
