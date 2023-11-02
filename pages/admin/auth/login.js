"use client";
import {
  Alert,
  Box,
  Button,
  Stack,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="https://2amartist.in/" style={{ color: "blue" }}>
        2amartist.in
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Page = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      const { email, password } = values;
      try {
        const { result, error } = await signIn(email, password);
        if (result && result.user) {
          helpers.setStatus({
            open: true,
            message: "Authentication successful! Redirecting...",
            success: "success",
          });
          router.push("/admin");
        } else if (error) {
          helpers.setStatus({
            open: true,
            message:
              error.code === "auth/wrong-password"
                ? "Invalid password"
                : "Something went wrong! Please try again later.",
            success: "error",
          });
          return;
        }
      } catch (err) {
        helpers.setStatus({
          open: true,
          message: err.message,
          success: "error",
        });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Brijesh Gupta Portfolio</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          width: "100vw",
          minHeight: "100vh",
          color: "#ffff",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{
                mb: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Sign in</Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Box>
      <Snackbar
        open={formik.status?.open}
        autoHideDuration={6000}
        onClose={() => {
          formik.setStatus((prev) => ({ ...prev, open: false }));
        }}
      >
        <Alert
          onClose={() => {
            formik.setStatus((prev) => ({ ...prev, open: false }));
          }}
          severity={formik.status?.success}
          sx={{ width: "100%" }}
        >
          {formik.status?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Page;
