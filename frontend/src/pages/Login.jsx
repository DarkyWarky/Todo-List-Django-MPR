import * as React from 'react';
import api from "../api";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const defaultTheme = createTheme();

export default function Login({route,method}) {
  const navigate= useNavigate()
  const [errors, setErrors] = React.useState({});

  const name = method === "login" ? "Login" : "Register";
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const pass_word = data.get('password');
    const user_name = data.get('firstName');
    console.log(user_name,pass_word)
    
    
    const errors = {};
    if (!email || !pass_word || !firstName) {
      errors.emptyFields = true;
    }
    if (!email.includes('@')) {
      errors.invalidEmail = true;
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        console.log(user_name,pass_word)
        const res = await api.post(route, { "username":user_name, "password":pass_word })
        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/")
        } else {
            navigate("/login")
        }
    } catch (error) {
        alert(error)
    }
      
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {name}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="UserName"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {errors.emptyFields && <Typography variant="body2" color="error">Please fill in all fields.</Typography>}
              {errors.invalidEmail && <Typography variant="body2" color="error">Invalid email address.</Typography>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,p:1,backgroundColor:'#5CDBC8','&:hover': {backgroundColor: '#3FAF9F'},fontWeight:'bold',fontSize: '1rem'}}
            >
              {method!=='login'?"Sign up":'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
