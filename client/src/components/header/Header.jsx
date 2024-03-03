
import { AppBar, Toolbar, Typography, styled} from "@mui/material";
import { Link } from "react-router-dom";


const Component = styled(AppBar)`
    background:#F4EEFF;
    color:#AA96DA;
`;

const Container = styled(Toolbar)  `
    justify-content:center;
    &>a{
        padding:20px;
        color:#AA96DA;
        text-decoration:none;
    }
`

const Header = () =>{
    return(
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}


export default Header;