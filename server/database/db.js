import mongoose from "mongoose"




 const Connection = async(username, password) =>{
    const URL= `mongodb://${username}:${password}@ac-o104eme-shard-00-00.pbffxf2.mongodb.net:27017,ac-o104eme-shard-00-01.pbffxf2.mongodb.net:27017,ac-o104eme-shard-00-02.pbffxf2.mongodb.net:27017/?ssl=true&replicaSet=atlas-iy0ey1-shard-0&authSource=admin&retryWrites=true&w=majority` ;
    try{

       await mongoose.connect(URL);
       console.log("database connected successfully");
    } catch(error){
        console.log("Error while connecting with the db", error);
    }
}

export default Connection;