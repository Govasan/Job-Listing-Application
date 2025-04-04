import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    wrapper: {
        border: "1px solid #e8e8e8",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid #4D64e4",
        },
    },
    companyName: {
        fontSize: "13.5px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: "0.3s",
        cursor: "pointer",
        fontWeight: 600,
        backgroundColor: "black",
        color: "#fff",
    },
}));

export default (props) => {
    const classes = useStyle();

    return (
        <Box p={3} className={classes.wrapper}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1">{props.title}</Typography>
                    <Typography className={classes.companyName} variant="subtitle2">
                        {props.companyName}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Grid item container xs>
                        {props.skills.map((skill) => (
                            <Grid key={skill} className={classes.skillChip} item>
                                {skill}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                        <Typography variant="caption">
                            {new Date().toLocaleTimeString()} | {props.type} | {props.location}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button variant="outlined" onClick={props.onApplyClick}>
                                Apply
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};