import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background: url(https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)  center/28%  #F4EEFF ;
    width: 100%;
    height: 47vh;
    margin-top:64px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    
`;

const Text = styled(Typography)`
    color: #878787;
    margin-top:5px;
`;
const Name=styled(Typography)`
    margin-top:15px;
    font-weight:600;
    font-size:26px;
    color:#40514E;

`

const About = () => {

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Name>Shatakshi Shukla</Name>
                <Text>
                Hi! I'm a pre-final year Computer Science student at Vellore Institute of Technology. Proficient in C++, Data Structures, and Algorithms, I specialize in the MERN stack, encompassing HTML, CSS, Bootstrap, JavaScript, jQuery, React.js, Node.js, MongoDB, SQL, Express.js, REST APIs, and OAuth. With hands-on experience in dynamic web applications, I aim to make a meaningful impact by contributing cutting-edge solutions. Adaptable and collaborative, I'm excited about opportunities to shape the future of technology through innovation. Let's connect and bring ideas to life!<br/>
                If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/notyour-sattu" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text>
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/shatakshi-shukla-00b087231/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>
                    or send me an Email
                    <Link href="mailto:shatakshi1712@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
