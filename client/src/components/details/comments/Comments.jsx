import { useState, useContext, useEffect } from "react";

import { Box, TextareaAutosize, Button , styled, Typography} from "@mui/material";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

import Comment from "./Comment";


const Contain=styled(Box)`
    margin-top: 110px;
    display:flex;
`;

const Title=styled(Typography)`
    color:#878787;
    font-weight:600;
    font-size:18px;
`
const Total= styled(Typography)`
    color:#878787;
    font-weight:600;
    padding-left:5px;
    font-size:18px;
`
const Container=styled(Box)`
    margin-top: 20px;
    display:flex;
`;

const Image=styled('img')({
    width: 45,
    height: 45,
    borderRadius:'50%'
});


const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width:100%;
    margin: 13px 20px;
    font-size:16px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`;

const StyledButton =  styled(Button)`
    background-color:#6096B4;
`;

const initialValues={
    name:'',
    postId:'',
    date: new Date(),
    comments:''
}



export const Comments = ({post}) =>{

    const url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSISQ6Bkc1jKMkxby1mokF3kf1LBQ2za0d8Ng&usqp=CAU';


    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] =  useState(false);
    
  const [totalComments, setTotalComments] = useState(0);

    const {account} = useContext(DataContext);

    useEffect(()=>{
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                    setTotalComments(response.data.length);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
                // Handle the error (e.g., show a message to the user)
            }
        };
        if(post._id){
            getData();
         }
         
    },[post, toggle]);

    const handleChange=(e)=>{
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments:e.target.value
        });
    }
    const addComment= async(e)=>{
        try {
            let response = await API.newComment(comment);
            if (response.isSuccess) {
                setComment(initialValues);
            }
            setToggle(prevState => !prevState);
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle the error (e.g., show a message to the user)
        }
     }

    return(
        <Box>
        <Contain>
            <Title>Comments:</Title>
            <Total>{totalComments}</Total>
        </Contain>
            <Container>
                <Image src={url} alt="dp"/> 
                <StyledTextArea 
                    minRows={1}
                    placeholder="Express your views here!"
                    value={comment.comments}
                    onChange={(e)=>handleChange(e)}
                />
                <StyledButton 
                variant="contained" 
                size="medium" 
                style={{height:35}}
                onClick={(e)=>addComment(e)}
                >Post</StyledButton>
            </Container>

            <Box>
                {
                    comments && comments.length>0 && comments.map(comment =>(
                        <Comment key={comment._id} comment={comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
        </Box>
    )
}



export default Comments;