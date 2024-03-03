import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material"
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";


const StyledTable = styled(Table)`
    border: 1.3px solid #F4EEFF;
`;

const StyledButton = styled(Button)(({theme})=>({
    margin:'20px',
    width:'86%',
    background:'#93B5C6',
    color:'#FFF',
    [theme.breakpoints.down('md')]:{
        margin:'20px 15px 20px 15px ',
        width:'86%',
        background:'#93B5C6',
        color:'#FFF',
    }
}))

const StyledLink=styled(Link)`
    text-decoration:none;
    color:inherit;
`

const Categories = () => {

    const [SearchParams] = useSearchParams();
    const category=SearchParams.get('category');
    return (
        <>
            <StyledLink to={`/create?category=${category||''}`} style={{textDecoration:'none'}}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <StyledLink to='/'>
                            All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}


export default Categories;