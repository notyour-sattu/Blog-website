

import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';


dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-o104eme-shard-00-00.pbffxf2.mongodb.net:27017,ac-o104eme-shard-00-01.pbffxf2.mongodb.net:27017,ac-o104eme-shard-00-02.pbffxf2.mongodb.net:27017/?ssl=true&replicaSet=atlas-iy0ey1-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file:(request,file)=>{
        const match=["image/png","image/jpg"];
        if(match.indexOf(file.memetype)===-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return{
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`,
            id: file._id
        }
    }
})


export default multer({storage});
