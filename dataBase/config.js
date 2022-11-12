import mongoose from "mongoose";

export const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_CNN,{
      
    });
    console.log("Db online");

  } catch (error) {
    
    console.log(error);
    throw new Error("data base could not start");
  }
};
