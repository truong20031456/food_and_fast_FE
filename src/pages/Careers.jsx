import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: 'Senior Chef',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$60,000 - $80,000',
    experience: '5+ years',
    education: 'Culinary Degree',
    description: 'We are looking for an experienced Senior Chef to join our team...',
    requirements: [
      '5+ years of experience in a high-volume restaurant',
      'Strong leadership and team management skills',
      'Expert knowledge of various cuisines',
      'Excellent communication skills',
    ],
  },
  {
    id: 2,
    title: 'Restaurant Manager',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$50,000 - $70,000',
    experience: '3+ years',
    education: 'Bachelor\'s Degree',
    description: 'Seeking a dynamic Restaurant Manager to oversee daily operations...',
    requirements: [
      '3+ years of restaurant management experience',
      'Strong business acumen',
      'Excellent customer service skills',
      'Proficiency in restaurant management software',
    ],
  },
  {
    id: 3,
    title: 'Line Cook',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$35,000 - $45,000',
    experience: '2+ years',
    education: 'High School Diploma',
    description: 'Looking for a skilled Line Cook to join our kitchen team...',
    requirements: [
      '2+ years of experience in a professional kitchen',
      'Knowledge of food safety and sanitation',
      'Ability to work in a fast-paced environment',
      'Team player with good communication skills',
    ],
  },
];

const benefits = [
  'Competitive salary and benefits package',
  'Health insurance coverage',
  'Paid time off and holidays',
  'Professional development opportunities',
  'Employee discounts',
  'Flexible scheduling',
  'Career growth potential',
  'Positive work environment',
];

const Careers = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Join Our Team
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
          >
            Be part of our mission to deliver exceptional dining experiences
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs..."
            sx={{
              maxWidth: 600,
              mx: 'auto',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Job Listings */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {jobListings.map((job) => (
              <Card key={job.id} sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {job.title}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mb: 2 }}
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Chip
                      icon={<LocationIcon />}
                      label={job.location}
                      variant="outlined"
                    />
                    <Chip
                      icon={<WorkIcon />}
                      label={job.type}
                      variant="outlined"
                    />
                    <Chip
                      icon={<MoneyIcon />}
                      label={job.salary}
                      variant="outlined"
                    />
                    <Chip
                      icon={<TimeIcon />}
                      label={job.experience}
                      variant="outlined"
                    />
                    <Chip
                      icon={<SchoolIcon />}
                      label={job.education}
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="body1" paragraph>
                    {job.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Requirements:
                  </Typography>
                  <List>
                    {job.requirements.map((req, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={req} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Benefits Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Why Join Us?
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {benefits.map((benefit, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Don't see a perfect match?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Send us your resume and we'll keep you in mind for future opportunities.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Submit Resume
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Careers; 