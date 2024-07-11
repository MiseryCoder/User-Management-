import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddUser () {
    const navigate = useNavigate();
    const [formvalue, setFormvalue] = useState({username:'', email:'', status:''});
    const [message, setMessage] = useState('');
    const handleInput = (e) =>{
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            username: formvalue.username,
            email: formvalue.email,
            password: formvalue.password,
            status: formvalue.status,
            role_type: formvalue.role_type
        };
    
        const res = await axios.post('http://localhost/HAHAHA/Backend/user.php', formData);
    
        if (res.data.success) {
            setMessage(res.data.success);
            setTimeout(() => {
                navigate('/Grid');
            }, 2000);
        }
    }
    
    
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <h5>Add User</h5>
                        <p className="text-success">{message}</p>
                        <form onSubmit = {handleSubmit} method="POST">
                        <div className="mb-3 row">
                                <label htmlFor="username" className="col-sm-2">Username:</label>
                                <div className="col-sm-10">
                                 <input type="text" className="form-control" id="username" name="username" value={formvalue.username} onChange={handleInput} placeholder="Username" required/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="col-sm-2">Email:</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" name="email" value={formvalue.email} onChange={handleInput} placeholder="name@example.com" required/>
                                </div>

                            </div>


                            <div className="mb-3 row">
                                <label htmlFor="password" className="col-sm-2">Password:</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="password" name="password" value={formvalue.password} onChange={handleInput} placeholder="Password" required/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label htmlFor="" className="col-sm-2">Role Type:</label>
                                <div className="col-sm-10">
                                    <select name="role_type" id="role_type" className="form-select" value={formvalue.role_type} onChange={handleInput}>
                                        <option value="">--Select Role--</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                              
                            </div>

                            <div className="mb-3 row" hidden>
                                <label htmlFor="" className="col-sm-2">Status:</label>
                                <div className="col-sm-10">
                                    <select name="status" id="status" className="form-select" value={formvalue.select} onChange={handleInput} required>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                              
                            </div>
                           
                            <div className="mb-3 row">
                                <label htmlFor="submit" className="col-sm-2"></label>
                                <div className="col-sm-10">
                                    <button id="submit" name="submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        </React.Fragment>
    )
}

export default AddUser;