import React, { useState } from "react";
import { IconButton, InputAdornment, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { passwordValidationRegex, emailValidationRegex } from "../../constants/CommonConstants";
import { IRegisterData } from "./RegisterForm.types";


const RegisterForm: React.FC = () => {
    /**States */
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    /**Hooks */
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<IRegisterData>();

    /**
     * Handles the form submission for user registration.
     * @param {IRegisterData} data - The registration data submitted by the user.
     * @returns {void}
     */
    const onSubmit: SubmitHandler<IRegisterData> = (data: IRegisterData): void => {
        setLoading(true);
        localStorage.setItem("user", JSON.stringify(data));

        if (localStorage.getItem("user")) {
            setTimeout(() => {
                enqueueSnackbar("Successfully registered!", {
                    variant: "success",
                });
                setLoading(false);
                navigate("/login");
            }, 1500);
        } else {
            setLoading(false);
            enqueueSnackbar("Error registering!", {
                variant: "error",
            });
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
            <Typography component="h1" variant="h5">
                Welcome to Okhati
            </Typography>
            <Typography variant="caption" sx={{ color: "#bcbaba" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Typography>
            <Box
                sx={{
                    maxWidth: 400,
                    mt: 3,
                    padding: '2rem',
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: 5,
                    boxShadow: '0 10px 10px rgba(0, 0, 0, 1.1)',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            placeholder="First Name"
                            autoFocus
                            error={!!errors.firstName}
                            helperText={errors.firstName && errors.firstName.message}
                            {...register("firstName", {
                                required: "First Name is required!",
                            })}
                            {...reusableProps}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            placeholder="Last Name"
                            error={!!errors.lastName}
                            helperText={errors.lastName && errors.lastName.message}
                            {...register("lastName", {
                                required: "Last Name is required!",
                            })}
                            {...reusableProps}
                        />
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
                                pattern: {
                                    value: passwordValidationRegex,
                                    message:
                                        "Password must contain at least one number and one letter!",
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
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            error={!!errors.confirmPassword}
                            helperText={
                                errors.confirmPassword && errors.confirmPassword.message
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required!",
                                validate: (value) => {
                                    if (value !== control._formValues["password"]) {
                                        return "Passwords must match";
                                    }
                                    return undefined;
                                },
                            })}
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
                    {loading ? "Loading..." : "Register"}
                </Button>
                <Grid container>
                    <Grid item>
                        <RouterLink
                            to="/login"
                            style={{
                                textDecoration: "underline",
                                color: "#2f59adb7",
                            }}
                        >
                            {"Already have an account? Login"}
                        </RouterLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default RegisterForm;