import { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, styled, Typography} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";
import image from "../../image.png"
import axios from "axios";

const Component = styled(Box)`
    width : 400px;
    margin:auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled('img')({
    width: 130,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'

});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div, & > button, & > p{
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    color:#fff;
    background: #375A82;
    height: 48px;
    border-radius: 2px;
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #C6E4EC;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%)
`



const Text = styled(Typography)`
    color:#878787;
    font-size:16px
`

const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top: 10px;
    font-weight:600;
`

const signupInitialValues = {
    email: '',
    username: '',
    password: '',
};
const loginInitialValues={
    username:'',
    password:''
}

const Login = ({isUserAuthenticated}) => {

    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues);
    const[error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);

    const { setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        setError(false);
    }, [login])

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
    }
    const signupUser = async () => {
        if (!signup.email || !signup.username || !signup.password) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            let response = await API.userSignup(signup);
            console.log('Response:', response);
            if (response && response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                setError('Something went wrong! Please try again later.');
            }
        } catch (error) {
            console.error('Error in signupUser:', error);
            setError('An error occurred during signup. Please try again later.');
        }
    };

    const onValueChange=(e)=>{
        setLogin({...login, [e.target.name]:e.target.value})
    }


    const loginUser = async () => {
        if (!login.username || !login.password) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            let response = await API.userLogin(login);
            if (response && response.isSuccess) {
                setError('');

                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ username: response.data.username, name: response.data.name });
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                setError('Something went wrong! Please try again later.');
            }
        } catch (error) {
            console.error('Error in loginUser:', error);
            setError('An error occurred during login. Please try again later.');
        }
    };

    const loginWithGoogle = async () => {
        try {
            const handleGoogleAuthComplete = async () => {
                // Remove the event listener to avoid multiple executions
                window.removeEventListener('googleAuthComplete', handleGoogleAuthComplete);
                try {
                    const response = await axios.get("http://localhost:8000/auth/google/callback", { withCredentials: true });
                    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                    setAccount({ username: response.data.username, name: response.data.name });
                    isUserAuthenticated(true);
                    navigate('/');    
                    console.log("response", response);
                } catch (error) {
                    // Handle error from axios request after authentication
                }
            };
            // Add the event listener
            window.addEventListener('googleAuthComplete', handleGoogleAuthComplete);
            // Redirect to the Google authentication URL
            window.location.href = 'http://localhost:8000/auth/google?prompt=select_account';
        } catch (error) {
            // Handle error
        }
    };
    
    
    return (

        <Component>
            <Box>
                <Image src={image} alt="login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)}  name="username" label="Enter username" required/>
                            <TextField variant="standard" value={login.password} onChange={(e)=>onValueChange(e)} name="password" label="Enter password" required />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
                            <SignupButton onClick={()=>loginWithGoogle()} > <GoogleIcon sx={{fontSize:"22px", marginRight:"8px"}}/>Sign in with google</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="email" label="Enter Email" required value={signup.email} />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="username" label="Enter Username" required value={signup.username}/>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="password" label="Enter Password" required value={signup.password} />

                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={() => signupUser()} variant="contained">Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account?</LoginButton>
                        </Wrapper>
                }

            </Box>
        </Component>
    )
}


export default Login;