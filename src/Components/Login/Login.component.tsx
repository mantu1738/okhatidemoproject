import React, { useState } from "react";
import { Alert, Collapse, IconButton, InputAdornment, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { authActions } from "../../store/AuthSlice";
import { IRegisterData } from "../RegisterForm/RegisterForm.types";
import { emailValidationRegex } from "../../constants/CommonConstants";
import { ILoginData } from "./Login.types";
import { RoutesPath } from "../../constants/Routes";

const Login: React.FC = () => {
    /** States */
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /**Hooks */
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginData>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
    * Handles the form submission for user login.
    * @param {ILoginData} data - The login data submitted by the user.
    * @property {string} email - The email address entered by the user.
    * @property {string} password - The password entered by the user.
    * @returns {void}
    */
    const onSubmit: SubmitHandler<ILoginData> = (data: ILoginData): void => {
        setLoading(true);
        if (localStorage.getItem("user") === null) {
            setTimeout(() => {
                setLoading(false);
                setError("User not found");
            }, 1000);
            return;
        }
        if (
            data.email ===
            (JSON.parse(localStorage.getItem("user") as string) as IRegisterData)
                .email &&
            data.password ===
            (JSON.parse(localStorage.getItem("user") as string) as IRegisterData)
                .password
        ) {
            setTimeout(() => {
                dispatch(authActions.login());
                enqueueSnackbar("Successfully logged in! Welcome to Okhati Profile", {
                    variant: "success",
                });
                setLoading(false);
                navigate(RoutesPath.Profile);
            }, 1500);
        } else {
            setTimeout(() => {
                setLoading(false);
                setError("Invalid email or password");
            }, 1000);
        }
    };

    /**
    * Reusable props for a React component.
    * @type {Object<string, unknown>}
    * @description This object provides reusable props for a React component.
    * These props can be used to set common attributes for the component, such as size, variant, required, and fullWidth.
    * @property {string} size - The size of the component. Possible values: "small", "medium", "large".
    * @property {string} variant - The variant of the component. Possible values: "standard", "outlined", "filled".
    * @property {boolean} required - Whether the component is required or not.
    * @property {boolean} fullWidth - Whether the component should take up the full width of its container.
    * @example
    * // Example usage:
    * const MyComponent = () => {
    *    return (
    *        <TextField label="Username" {...reusableProps} />
    *    );
    * };
    */
    const reusableProps = React.useMemo<Record<string, unknown>>(
        () => ({
            size: "medium",
            variant: "outlined",
            required: true,
            fullWidth: true,
        }),
        []
    );

    return (
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
                <Typography component="h1" variant="h5">
                    Welcome to Okhati
                </Typography>
                <Typography variant="body2" sx={{ color: "#bcbaba" }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Collapse in={!!error}>
                            <Alert severity="error">{error}</Alert>
                        </Collapse>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Email Address"
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                            {...register("email", {
                                required: "Email Address is required!",
                                pattern: {
                                    value: emailValidationRegex,
                                    message: "Email is not valid!",
                                },
                            })}
                            {...reusableProps}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            helperText={errors.password && errors.password.message}
                            {...register("password", {
                                required: "Password is required!",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long!",
                                },
                            })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...reusableProps}
                        />
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
                    disableElevation
                    disableRipple
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </Button>
                <Grid container>
                    <Grid item>
                        <RouterLink
                            to="/"
                            style={{
                                textDecoration: "underline",
                                color: "#2f59adb7",
                            }}
                        >
                            {"Don't have an account? Register"}
                        </RouterLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Login;