import React, { useState } from "react";
import { Grid, ThemeProvider } from "@material-ui/core";
import Header from "./Components/Header";
import theme from "./theme/theme";
import Searchbar from "./Components/Searchbar";
import JobCard from "./Components/JobCard";
import Jobmodel from "./Components/Jobmodel";
import jobData from "./dummyData";
import Postjob from "./Components/Postjob"

export default () => {
    const [openJobModel, setOpenJobModel] = useState(false); // State to control Jobmodel visibility

    const handleApplyClick = () => {
        setOpenJobModel(true); // Open the Jobmodel dialog
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />
                
                <Grid container justify="center">
                    <Grid item xs={10}>
                        <Searchbar />
                        {jobData.map((job) => (
                            <JobCard key={job.id} {...job} onApplyClick={handleApplyClick} />
                        ))}
                    </Grid>
                </Grid>
                <Jobmodel open={openJobModel} setOpen={setOpenJobModel} />
            </ThemeProvider>
        </>
    );
};