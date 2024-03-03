
import { useState,useEffect,useContext } from "react";
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize} from "@mui/material";
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {DataContext} from '../../context/DataProvider';
import {API} from '../../service/api';



const Container = styled(Box)(({theme})=>({
    margin: '50px 50px',
    [theme.breakpoints.down('md')]:{
        margin:'10px 10px'
    }
})) ;
const Image = styled('img')({
    // marginTop: '64px',
    width: '100%',
    height: '57vh',
    objectFit: 'cover'
})

const StyledFormControl=styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
`

const InputTextField=styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:25px
`

const StyledButton = styled(Button)`
    background:#8EC3B0;
    color:#FFF;
`


const Textarea = styled(TextareaAutosize)`
    width:100%;
    margin-top:30px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`

const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate: new Date()
}

const Update = () => {
    
    const [post, setPost]=useState(initialPost);
    
    const [file, setFile]=useState('');

    const {account} = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const handleChange=(e)=>{
        setPost({...post, [e.target.name]:e.target.value})
    }


    useEffect(()=>{
        const fetchData=async()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const getImage = async () => {
          try {
            if (file) {
              const data = new FormData();
              data.append("name", file.name);
              data.append("file", file);
      
              const response = await API.uploadFile(data);
              setPost({ ...post, picture: response.data }); // Update the post state with the picture URL
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            // Handle the error as needed (e.g., show a message to the user)
          }
        };
      
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
      }, [file]);

   
      const updateBlogPost= async()=>{
        let response=await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
      }


    return (
        <Container >
            <Image src={url} alt="banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize= "large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{display:'none'}}
                    onChange={(e)=>setFile(e.target.files[0])}
                />
                <InputTextField placeholder="Title" value={post.title} onChange={(e)=>handleChange(e)} name="title"/>
                <StyledButton variant="contained" onClick={()=>updateBlogPost()}>Update</StyledButton>

            </StyledFormControl>

            <Textarea
            minRows={5}
            placeholder="What's going on in your mind..."
            onChange={(e)=>handleChange(e)}
            name="description"
            value={post.description}
            />
            
        </Container>
    )
}


export default Update ;