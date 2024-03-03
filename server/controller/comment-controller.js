
import Comment from "../model/comment.js"

export const newComment = async(request,response)=>{
    try{
        const comment=await new Comment(request.body);
        comment.save();
        response.status(200).json({msg:'Comment saved successfully'})
    }catch(error){
        response.status(500).json({msg:error.message})
    }
}



export const getAllComments=async(request,response)=>{
    try{
       const comments= await Comment.find({postId: request.params.id});

       response.status(200).json(comments);
    }catch(error){
        response.status(500).json({msg:error.message});
    }
}

export const deleteComment= async(request, response)=>{
    try{
        await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json({msg:'comment deleted successfully'})

    }catch(error){
        response.status(500).json({error: error.message});
    }
}