requestAnimationFrame('dotenv').config();
const app= require('./app');
const connectDB=require('./config/db');

const PORT=process.env.PORT || 5000;

async function start()
{
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT,()=>console.log(`Server is running on port ${PORT}...`));

}
start();