import * as React from "react";
import { Typography, Box, Button, CssBaseline, Grid, Paper } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { authActions } from "../../store/AuthSlice";
import { IRegisterData } from "../RegisterForm/RegisterForm.types";

const Profile: React.FC = () => {
    /** States */
    const [loading, setLoading] = React.useState(false);

    /**Hooks */
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = JSON.parse(
        localStorage.getItem("user") as string
    ) as IRegisterData;

    /**
    * Handles the logout process for the user.
    * @description This function is responsible for logging out the user.
    * @function
    * @returns {void}
    */
    const handleLogout = (): void => {
        setLoading(true);

        setTimeout(() => {
            dispatch(authActions.logout());
            enqueueSnackbar("Successfully logged out!", {
                variant: "success",
            });
            setLoading(false);
            navigate("/login");
        }, 1000);
    };


    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    flexDirection: 'column',
                    background: '#f0f0f0',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h2">
                    Profile
                </Typography>
                <Typography variant="body2" sx={{ color: "#bcbaba" }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Typography>
                <Box
                    sx={{
                        maxWidth: 400,
                        mt: 3,
                        background: '#fff',
                        padding: 3,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        boxShadow: '0 10px 10px rgba(0, 0, 0, 1.1)',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6">Full Name: </Typography>
                            <Typography variant="h6">
                                {user?.firstName} {user?.lastName}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6">Email: </Typography>
                            <Typography variant="h6">{user?.email}</Typography>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            textTransform: "none",
                            bgcolor: "#1F28EB",
                            "&:hover": {
                                backgroundColor: "#232bc8",
                            },
                        }}
                        startIcon={<ExitToApp />}
                        onClick={handleLogout}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Logout"}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Profile;
