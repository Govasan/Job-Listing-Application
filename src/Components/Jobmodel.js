import React, { useState } from "react";
import { Box, Grid, FilledInput, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton } from "@material-ui/core";
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

        "&:hover": {
            backgroundColor: "black",
            color: "#fff",
        },
    },
}));

export default ({ open, setOpen }) => {
    const classes = useStyle();
    const [file, setFile] = useState(null); // State to store the selected file
    const [error, setError] = useState(""); // State to store validation errors

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
            const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // PDF and DOCX MIME types

            if (!validTypes.includes(fileType)) {
                setError("Please upload a valid PDF or DOCX file.");
                setFile(null);
            } else {
                setError(""); // Clear any previous errors
                setFile(selectedFile);
            }
        }
    };

    const handleUpload = () => {
        // Collect form data
        const name = document.querySelector('input[placeholder="Name *"]').value;
        const mobile = document.querySelector('input[placeholder="Mobile *"]').value;
        const alternativeMobile = document.querySelector('input[placeholder="Alternative Mobile"]').value;
        const email = document.querySelector('input[placeholder="Email *"]').value;
        const location = document.querySelector('input[placeholder="Current Location *"]').value;
        const about = document.querySelector('textarea[placeholder="Tell me about Yourself *"]').value;

        // Validate required fields
        if (!name || !mobile || !email || !location || !about) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!file) {
            alert("Please select a valid file first!");
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mobile", mobile);
        formData.append("alternativeMobile", alternativeMobile);
        formData.append("email", email);
        formData.append("location", location);
        formData.append("about", about);
        formData.append("resume", file);

        // Send data to the backend
        fetch("http://your-backend-url/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to upload data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                alert("Details submitted successfully!");
                setOpen(false); // Close the dialog
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to submit details!");
            });
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    return (
        <Dialog open={open} fullWidth onClose={handleClose}>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Your Details
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Name *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Mobile *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Alternative Mobile" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Email *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Current Location *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        {/* File Upload Input */}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "block", marginTop: "8px" }}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput
                            placeholder="Tell me about Yourself *"
                            disableUnderline
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {["Javascript", "React.js", "Node.js", "Java", "Python"].map((skill) => (
                            <Box className={classes.skillChip} key={skill}>
                                {skill}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>* Required Fields</Typography>
                    <Button variant="contained" disableElevation color="primary" onClick={handleUpload}>
                        Apply
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};