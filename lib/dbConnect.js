import mongoose from 'mongoose';

const DATABASE = process.env.DATABASE_URL;

const dbConnect = async () => {
    // console.log('Database URL:', DATABASE);

    try {
        // Check connection state before establishing a new one
        const connectState = mongoose.connection.readyState;
        
        if (connectState === 1) {
            console.log('Already connected to DB');
            return;
        }

        if (connectState === 2) {
            console.log('Connecting to DB...');
            return;
        }

        // If no connection, establish one
        await mongoose.connect(DATABASE, {
            dbName: 'callToExpertLocal',

        });

        console.log('DB connected successfully');
    } catch (error) {
        console.error('DB connection failed:', error);
        
    }
};

export default dbConnect;
