import React, { useState } from "react";
import { Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: "0.3s",
        cursor: "pointer",
        fontWeight: 600,
        border: "1px solid black",
        color: "black",
        cursor: "pointer",

        "&:hover": {
            backgroundColor: "black",
            color: "#fff",
        },
    },
}));
export default (props) => {
    const classes = useStyle();
    const [open, setOpen] = useState(true);
    const skills = ["Javascript", "React.js", "Node.js", "Java", "Python", ];
    const handleClose = () => {
        setOpen(true);
    }
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post a Job
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <FilledInput placeholder="Job Title *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6} >
                         <Select fullWidth disableUnderline variant="filled" defaultValue="Full Time">
                                    <MenuItem value="Full Time">Full Time</MenuItem>
                                    <MenuItem value="Part Time">Part Time</MenuItem>
                                    <MenuItem value="Contract">Contract</MenuItem>
                         </Select>
                    </Grid>
                    <Grid item xs={6} >
                        <FilledInput placeholder="Company Name *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6} >
                        <FilledInput placeholder="Company URL *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6} >
                        <Select fullWidth disableUnderline variant="filled" defaultValue="Remote">
                                    <MenuItem value="Remote">Remote</MenuItem>
                                    <MenuItem value="In-Office">In-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} >
                        <FilledInput placeholder="Job Link *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <FilledInput placeholder="Job Description*" disableUnderline fullWidth multiline rows={4} />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex" >
                        {skills.map(skill => <Box className={classes.skillChip} key={skill}>{skill}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>* Required Fields</Typography>
                    <Button variant="contained" disableElevation color="primary">Post Job</Button>
                </Box>
            </DialogActions>
                
        </Dialog>
    )
}