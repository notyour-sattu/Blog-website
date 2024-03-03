

import {Box, Typography, styled} from '@mui/material';

const Image = styled(Box)`
    background: url(https://i.pinimg.com/474x/e1/4a/fb/e14afb4c75e3c95b62a66aebe44593c6.jpg) center/28%  #F4EEFF ; ${''/*repeat-x*/}
    width:100%;
    height:50vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-top:64px;
`;

const Heading = styled(Typography)`
    font-size:70px;
    color:#FFFFFF;
    Line-height: 1;
`

const SubHeading=styled(Typography)`
    font-size:16px;
    background:#FFF;
    padding-left:3px;
    padding-right:3px;
    border-radius:3px
`

const Banner = () =>{
    return(
        // <div style={{marginTop:64}}>Helloo from banner</div>
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Shatakshi Shukla</SubHeading>
        </Image>
    )
}


export default Banner;