import React, { useState, useEffect } from "react";
import axios from "axios";

function Schedule() {
	const [userData, setUserData] = useState([]);
	const [message, setMessage] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const [alertType, setAlertType] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		const reqData = await fetch("http://localhost/HAHAHA/Backend/user.php");
		const resData = await reqData.json();
		setUserData(resData);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			const res = await axios.delete(
				"http://localhost/HAHAHA/Backend/user.php/" + id
			);
			setMessage(res.data.success);
			setAlertType("danger");
			getUserData();
		}
	};

	const handleEdit = (user) => {
		setCurrentUser(user);
		setShowEditModal(true); // Show the edit modal
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	const handleSaveChanges = async () => {
		if (window.confirm("Are you sure you want to save the changes?")) {
			const res = await axios.put(
				`http://localhost/HAHAHA/Backend/user.php/${currentUser.id}`,
				currentUser
			);
			setShowEditModal(false); // Close the edit modal
			setMessage(res.data.success);
			setAlertType("success");
			getUserData();
		}
	};

	const handleAddUser = async (e) => {
		e.preventDefault();
		const formData = {
			username: e.target.username.value,
			email: e.target.email.value,
			password: e.target.password.value,
			status: e.target.status.value,
			role_type: e.target.role_type.value,
		};
		const res = await axios.post(
			"http://localhost/HAHAHA/Backend/user.php",
			formData
		);

		if (res.data.success) {
			setMessage(res.data.success);
			setAlertType("success");
			setShowAddModal(false); // Close the add modal
			getUserData();
		} else {
			setMessage(res.data.error);
			setAlertType("danger");
		}
	};

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-12 mt-4 ">
						<div className="d-flex justify-content-between mb-4">
							<h5 className="">Schedule List</h5>
							<button
								className="btn btn-success"
								onClick={() => setShowAddModal(true)}
							>
								Add User<i className="ms-2 mt-0 bi bi-plus-square"></i>
							</button>
						</div>

						{message && (
							<div className={`alert alert-${alertType}`} role="alert">
								{message}
							</div>
						)}
						<div className="table-responsive">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th scope="col">No.</th>
										<th scope="col">Username</th>
										<th scope="col">Email</th>
										<th scope="col">Status</th>
										<th scope="col">Role Type</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{userData.map((getData, index) => (
										<tr key={getData.id}>
											<td>{index + 1}</td> {/* Sequential number */}
											<td>{getData.username}</td>
											<td>{getData.email}</td>
											<td>{getData.status === "1" ? "Active" : "Inactive"}</td>
											<td>{getData.role_type}</td>
											<td>
												<button
													className="btn btn-success mx-2"
													onClick={() => handleEdit(getData)}
												>
													Edit
												</button>
												<button
													onClick={() => handleDelete(getData.id)}
													className="btn btn-danger"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{/* Edit User Modal */}
			{showEditModal && (
				<div className="modal show d-block" tabIndex="-1">
					<div className="modal-dialog shadow-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Edit User</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowEditModal(false)}
								></button>
							</div>
							<div className="modal-body">
								{currentUser && (
									<form>
										<div className="mb-3">
											<label htmlFor="username" className="form-label">
												Username
											</label>
											<input
												type="text"
												className="form-control"
												id="username"
												name="username"
												value={currentUser.username}
												onChange={handleInputChange}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="email" className="form-label">
												Email
											</label>
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												value={currentUser.email}
												onChange={handleInputChange}
											/>
										</div>

										<div className="mb-3">
											<label htmlFor="password" className="form-label">
												Password
											</label>
											<input
												type="password"
												className="form-control"
												id="password"
												name="password"
												onChange={handleInputChange}
											/>
										</div>

										<div className="mb-3">
											<label htmlFor="status" className="form-label">
												Status
											</label>
											<select
												className="form-control"
												id="status"
												name="status"
												value={currentUser.status}
												onChange={handleInputChange}
											>
												<option value="1">Active</option>
												<option value="0">Inactive</option>
											</select>
										</div>

										<div className="mb-3">
											<label htmlFor="roleType" className="form-label">
												Role Type
											</label>
											<select
												className="form-control"
												value={currentUser.role_type}
												id="roleType"
												name="role_type"
												required
											>
												<option value="">--Select Role--</option>
												<option value="admin">Admin</option>
												<option value="user">User</option>
											</select>
										</div>
									</form>
								)}
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setShowEditModal(false)}
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleSaveChanges}
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Add User Modal */}
			{showAddModal && (
				<div className="modal show d-block " tabIndex="-1">
					<div className="modal-dialog shadow-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Add User</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowAddModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<form onSubmit={handleAddUser}>
									<div className="mb-3">
										<label htmlFor="username" className="form-label">
											Username
										</label>
										<input
											type="text"
											className="form-control"
											id="username"
											name="username"
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="email" className="form-label">
											Email
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											name="email"
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											Password
										</label>
										<input
											type="password"
											className="form-control"
											id="password"
											name="password"
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="role_type" className="form-label">
											Role Type
										</label>
										<select
											className="form-control"
											id="role_type"
											name="role_type"
											required
										>
											<option value="">--Select Role--</option>
											<option value="admin">Admin</option>
											<option value="user">User</option>
										</select>
									</div>
									<div className="mb-3">
										<label htmlFor="status" className="form-label">
											Status
										</label>
										<select
											className="form-control"
											id="status"
											name="status"
											required
										>
											<option value="1">Active</option>
											<option value="0">Inactive</option>
										</select>
									</div>
									<button type="submit" className="btn btn-primary">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

export default Schedule;
