import React, {useState} from 'react';
import API from '../apis/api';

function Register()
{
    const[form,setForm]=useState({name:'',email:'',password:'',confirmPassword:''});
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange}required/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="confirm Password" onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
