import mongoose from 'mongoose';

const connectDB = async () => {
   
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
            // , { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('*Connected to database*');
    } catch (error) {
        console.error('Couldn\'t Connect To Database: ', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;