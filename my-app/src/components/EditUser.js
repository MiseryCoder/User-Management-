import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [formvalue, setFormvalue] = useState({
		username: "",
		email: "",
		status: "",
		password: "",
		role_type: "", // Added role_type to the initial state
	});
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false); // State for password visibility

	const handleInput = (e) => {
		setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		const userRowdata = async () => {
			const getUserdata = await fetch(
				"http://localhost/HAHAHA/Backend/user.php/" + id
			);
			const resUserdata = await getUserdata.json();
			console.log(resUserdata);
			setFormvalue(resUserdata);
		};
		userRowdata();
	}, [id]); // Added id to the dependency array

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			id: id,
			username: formvalue.username,
			email: formvalue.email,
			status: formvalue.status,
			password: formvalue.password,
			role_type: formvalue.role_type,
		};
		const res = await axios.put(
			"http://localhost/HAHAHA/Backend/user.php/",
			formData
		);

		if (res.data.success) {
			setMessage(res.data.success);
			setTimeout(() => {
				navigate("/Grid");
			}, 2000);
		}
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-4">
						<h5>Update User</h5>
						<p className="text-success">{message}</p>
						<form onSubmit={handleSubmit} method="POST">
							<div className="mb-3 row">
								<label htmlFor="username" className="col-sm-2">
									Username:
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										className="form-control"
										id="username"
										name="username"
										value={formvalue.username}
										onChange={handleInput}
										placeholder="Username"
									/>
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="email" className="col-sm-2">
									Email:
								</label>
								<div className="col-sm-10">
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										value={formvalue.email}
										onChange={handleInput}
										placeholder="name@example.com"
									/>
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="password" className="col-sm-2">
									Password:
								</label>
								<div className="col-sm-10">
									<input
										type={showPassword ? "text" : "password"}
										className="form-control"
										id="password"
										name="password"
										value={formvalue.password}
										placeholder="Password"
										onChange={handleInput}
									/>
									<input
										type="checkbox"
										id="showPassword"
										checked={showPassword}
										onChange={toggleShowPassword}
									/>
									<label htmlFor="showPassword">Show Password</label>
								</div>
							</div>
							<div className="mb-3 row">
								<label htmlFor="role_type" className="col-sm-2">
									Role Type:
								</label>
								<div className="col-sm-10">
									<select
										name="role_type"
										id="role_type"
										className="form-select form-control"
										value={formvalue.role_type}
										onChange={handleInput}
									>
										<option value="">--Select Role--</option>
										<option value="admin">Admin</option>
										<option value="user">User</option>
									</select>
								</div>
							</div>

							<div className="mb-3 row">
								<label htmlFor="status" className="col-sm-2">
									Status:
								</label>
								<div className="col-sm-10">
									<select
										name="status"
										id="status"
										className="form-select"
										value={formvalue.status}
										onChange={handleInput}
									>
										<option>--Select Status--</option>
										<option value="1">Active</option>
										<option value="0">Inactive</option>
									</select>
								</div>
							</div>

							<div className="mb-3 row">
								<label htmlFor="submit" className="col-sm-2"></label>
								<div className="col-sm-10">
									<button id="submit" name="submit" className="btn btn-success">
										Update
									</button>
								</div>
							</div>
						</form>
					</div>

					<div className="col-md-6 mt-4">
						<h5>User Privilege</h5>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default EditUser;
