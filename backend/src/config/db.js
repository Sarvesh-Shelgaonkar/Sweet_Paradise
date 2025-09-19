const mongoose = require('mongoose');
module.exports = async function connectDB(MONGO_URI)
{
    if(!MONGO_URI) throw new Error('MONGO_URI is not defined in environment variables');
    try
    {
        await mongoose.connect(MONGO_URI, {
        });
        console.log('MongoDB connected...');
    }
    catch (err)
    {
        console.error(err);
        process.exit(1);
    }


};