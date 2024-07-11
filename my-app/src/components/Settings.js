import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
	const [roleType, setRoleType] = useState("");
	const [userId, setUserId] = useState("");
	const [userData, setUserData] = useState([]);
	const [currentDepartment, setCurrentDepartment] = useState({});
	const [showEditModal, setShowEditModal] = useState(false);
	const [message, setMessage] = useState("");
	const [alertType, setAlertType] = useState("");

	useEffect(() => {
		const storedRoleType = localStorage.getItem("role_type");
		setRoleType(storedRoleType);

		const storedUserId = localStorage.getItem("UserId");
		setUserId(storedUserId);
		getUserData();
	}, []);

	const getUserData = async () => {
		const reqData = await fetch("http://localhost/HAHAHA/Backend/Settings.php");
		const resData = await reqData.json();
		setUserData(resData);
	};

	const handleEdit = (department) => {
		setCurrentDepartment(department);
		setShowEditModal(true); // Show the edit modal
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentDepartment((prevDepartment) => ({
			...prevDepartment,
			[name]: value,
		}));
	};

	const handleSaveChanges = async () => {
		if (window.confirm("Are you sure you want to save the changes?")) {
			try {
				const res = await axios.put(
					`http://localhost/HAHAHA/Backend/Settings.php`,
					currentDepartment
				);
				setShowEditModal(false); // Close the edit modal
				setMessage(res.data.success);
				setAlertType("success");
				getUserData();
			} catch (error) {
				setMessage("Error updating department");
				setAlertType("danger");
			}
		}
	};

	const handleAddDepartment = async (e) => {
		e.preventDefault();
		const formData = {
			department: e.target.department.value,
		};
		try {
			const res = await axios.post(
				"http://localhost/HAHAHA/Backend/Settings.php",
				formData
			);
			setMessage(res.data.success);
			setAlertType("success");
			getUserData();
		} catch (error) {
			setMessage("Error adding department");
			setAlertType("danger");
		}
	};

	return (
		<div className="container" style={{ paddingTop: 50 }}>
			<h3 className="mb-3">Settings Page</h3>

			<div className="container">
				<div className="row">
					<div className="col-md-12 mt-4">
						<div className="d-flex justify-content-between mb-4">
							<h5 className="">Department Settings</h5>
							<button
								className="btn btn-success"
								data-bs-toggle="modal"
								data-bs-target="#addDepartmentModal"
							>
								Add<i className="ms-2 mt-0 bi bi-plus-square"></i>
							</button>
						</div>

						<div className="table-responsive">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th scope="col">No.</th>
										<th scope="col">Department</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{userData.map((getData, index) => (
										<tr key={getData.id}>
											<td>{index + 1}</td> {/* Sequential number */}
											<td>{getData.department}</td>
											<td>
												<button
													className="btn btn-success mx-2"
													onClick={() => handleEdit(getData)}
												>
													<i class="fa-solid fa-pen-to-square"></i>
												</button>
												<button
													// onClick={() => handleDelete(getData.id)}
													className="btn btn-danger"
												>
													<i class="fa-solid fa-trash-can"></i>
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

			{showEditModal && (
				<div className="modal show" style={{ display: "block" }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Edit Department</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowEditModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<form>
									<div className="mb-3">
										<label htmlFor="department" className="form-label">
											Department
										</label>
										<input
											type="text"
											className="form-control"
											id="department"
											name="department"
											value={currentDepartment.department}
											onChange={handleInputChange}
										/>
									</div>
								</form>
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

			{/* Add Department Modal */}
			<div
				className="modal fade"
				id="addDepartmentModal"
				tabIndex="-1"
				aria-labelledby="addDepartmentModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addDepartmentModalLabel">
								Add Department
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleAddDepartment}>
								<div className="mb-3">
									<label htmlFor="department" className="form-label">
										Department
									</label>
									<input
										type="text"
										className="form-control"
										id="department"
										name="department"
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Add Department
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>

			{message && (
				<div className={`alert alert-${alertType} mt-4`} role="alert">
					{message}
				</div>
			)}
		</div>
	);
}
