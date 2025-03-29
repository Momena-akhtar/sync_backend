import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(
      process.env.CONNECTION_STRING as string
    );

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
