import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
import { DropDown } from 'views/UserProfile/InputBox';
import axios from 'axios';
import server from 'utilities';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        www.adzone.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [user, setUser] = useState(2);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signUp,setSignUp] = useState("/publicity-sign-up")

  const userList = [
			{ value: 1, label: "Publicity" },
			{ value: 2, label: "Customer" },
      ];

  const pubLink = "/publicity-sign-up";
  const cusLink = "/customer-sign-up"
   
  const signUpPage = () =>
  {
    props.history.push(signUp);
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    const data = {};
    data.email= email;
    data.role = user;
    data.password = password;
    axios.post(`http://${server.ip}:${server.port}/login`, data)
      .then(res =>{
        if(res.status===200){
          console.log("Response of login ",res);
          localStorage.setItem("userData",JSON.stringify(res.data));
          alert("Welcome "+res.data.userName);
          if(res.data.role===0)
             props.history.push("/admin/dashboard")
          else if(res.data.role===1)
             props.history.push("/publicity/dashboard")
          else if(res.data.role===2)
             props.history.push("/customer/dashboard")
          else    
            console.log("error");
        }
        else if(res.status===203){
          alert("Invalid Credentials");
        }
        else if(res.status===404){
           alert("User not Found"); 
        }
        else{
          alert("Some Error occurred. If this is issue comes again and again please contact us at adzonefeedback@gmail.com")
        }
    })
      .catch((err) => console.log(err));
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       {user==1?(<Avatar className={classes.avatar} onClick={() => {
         user==1?setUser(2):setUser(1);
         user==1?setSignUp(cusLink):setSignUp(pubLink);        
         }}>
          <SwitchCameraIcon  />
        </Avatar>):
        (<Avatar className={classes.avatar} onClick={() => {
          user==1?setUser(2):setUser(1);
          user==1?setSignUp(cusLink):setSignUp(pubLink);}}>
          <LockOutlinedIcon  />
        </Avatar>)}
        <Typography component="h1" variant="h5" onClick={() => {
          user==1?setUser(2):setUser(1);
          user==1?setSignUp(cusLink):setSignUp(pubLink);
          }}  >
       {/* <DropDown
										name='user'
                    list={userList}
                    
										value={user}
                    onChange={(e) => {setUser(parseInt(e.target.value))} }
									/> */}
                {(user===2)?"Customer":"Publicity"} Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange= {(e) => {setEmail(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange= {(e) => {setPassword(e.target.value)}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick= {submitHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={signUpPage} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}