import { useEffect, useState, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({theme})=>({
    margin: '50px 50px',
    [theme.breakpoints.down('md')]:{
        margin:'10px 10px'
    }
})) ;

const Image = styled('img')({
    width: '100%',
    height: '57vh',
    objectFit: 'cover'
})

const Heading = styled(Typography)`
    font-size:38px;
    color:#2C3639;
    font-weight:600;
    text-align:center;
    margin: 20px 0 10px 0;
    word-break:break-word;
`

const EditIcon = styled(Edit)`
    margin: 5px;
    padding:5px;
    border: 1px solid #BBBFCA;
    border-radius:10px;
    color:#495464;
`
const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding:5px;
    border: 1px solid #BBBFCA;
    border-radius:10px;
    color:#3F4E4F;
`

const Author = styled(Box)`
    color:#878787;
    margin:15px 20px 0 20px;
    display:flex;

`

const Desc=styled(Typography)`
    color: #3F4E4F;
    margin:30px 20px 0;
    word-break:break-word;
`

const Views=styled(Typography)`
    color:#878787;
   
`
const ViewBox=styled(Box)`
    margin: 2px 20px 20px 20px;
    padding-bottom:20px
`

const DetailView = () => {

    const [post, setPost] = useState([]);

    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://plus.unsplash.com/premium_photo-1678566111483-f45ad346d50a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    useEffect(() => {
        console.log("useEffect in DetailView is executed")
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [])

    const deleteBlog= async()=>{
        let response = await API.deletePost(post._id);
        if(response.isSuccess){
            navigate('/');
        }
    }


    return (
        <Container>
            <Image src={url} alt='blog' />

            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`} style={{textDecoration:'none'}}><EditIcon /> </Link>
                        <DeleteIcon  onClick={()=>deleteBlog()}/>
                    </>
                }
            </Box>

            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author: <Box component="span" style={{fontWeight: 600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft:'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
                
            </Author>
            <ViewBox>
            <Views style={{ float: 'right' }}>Total Views: {post.views}</Views>
            </ViewBox>

            <Desc>{post.description}</Desc>
            <Comments post={post}/>
        </Container>
    )
}

export default DetailView;