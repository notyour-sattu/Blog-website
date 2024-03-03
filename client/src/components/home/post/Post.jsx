
import { Box, Typography, styled } from '@mui/material';
import { addElipsis } from '../../../utils/common-utils';

const Container = styled(Box)(({ theme }) => ({
    border: '1px solid #d3cede',
    borderRadius: '10px',
    margin: '20px',
    height: '340px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '&>p': {
        padding: '0 5px 5px 5px',
    },
    [theme.breakpoints.down('md')]: {
        border: '1px solid #d3cede',
        borderRadius: '10px',
        margin: '15px 7px 10px',
        height: '365px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '&>p': {
            padding: '0 5px 5px 5px',
        },
    }

}));

const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: '150px'
});

const Text = styled(Typography)`
    color:#878787;
    font-size: 12px;
`

const Heading = styled(Typography)`
    font-size:18px;
    font-weight:600;
    color:#2C3639;
`
const Details = styled(Typography)`
    font-size:14px;
    word-break: break-word;
    color:#3F4E4F;

`
const Post = ({ post }) => {

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    return (
        <Container>
            <Image src={url} alt='blog' />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 18)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipsis(post.description, 80)}</Details>
        </Container>
    )
}

export default Post;