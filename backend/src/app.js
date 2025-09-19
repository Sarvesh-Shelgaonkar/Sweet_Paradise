const express=require('express');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const sweetsRoutes=require('./routes/sweetsRoutes');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/sweets',sweetsRoutes);

app.use((err,req,res,next)=>
{
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });

});

module.exports=app;