import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Assignments() {
	const [roleType, setRoleType] = useState("");
	const [userId, setUserId] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const [formData, setFormData] = useState({
		for: "",
		due: "",
		title: "",
		instruction: "",
		attachment: null,
	});
	const [assignments, setAssignments] = useState([]);

	useEffect(() => {
		const storedRoleType = localStorage.getItem("role_type");
		const storedUserId = localStorage.getItem("UserId");
		setRoleType(storedRoleType || "");
		setUserId(storedUserId || "");
		fetchAssignments();
	}, []);

	const fetchAssignments = async () => {
		try {
			const res = await axios.get(
				"http://localhost/HAHAHA/Backend/task_assignment.php"
			);
			setAssignments(res.data);
		} catch (error) {
			console.error(
				"There was an error fetching the assignments/tasks!",
				error
			);
		}
	};

	const handleCreateClick = (type) => {
		setModalType(type);
		setShowModal(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFileChange = (e) => {
		setFormData({
			...formData,
			attachment: e.target.files[0],
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData();
		form.append("user_id", userId);
		form.append("type", modalType);
		form.append("for", formData.for);
		form.append("due", formData.due);
		form.append("title", formData.title);
		form.append("instruction", formData.instruction);
		if (formData.attachment) {
			form.append("attachment", formData.attachment);
		}

		try {
			const res = await axios.post(
				"http://localhost/HAHAHA/Backend/task_assignment.php",
				form,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(res.data);
			if (res.data.success) {
				alert(res.data.success);
				fetchAssignments(); // Refresh assignments list
			} else {
				alert(res.data.error);
			}
		} catch (error) {
			console.error("There was an error creating the task/assignment!", error);
		}

		setShowModal(false);
	};

	return (
		<div className="container" style={{ paddingTop: 50 }}>
			<h3>Assignment Page</h3>
			<div className="dropdown mb-4">
				<button
					className="btn btn-primary dropdown-toggle"
					type="button"
					id="createDropdown"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Create
				</button>
				<ul className="dropdown-menu" aria-labelledby="createDropdown">
					<li>
						<button
							className="dropdown-item"
							onClick={() => handleCreateClick("task")}
						>
							Task
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							onClick={() => handleCreateClick("assignment")}
						>
							Assignment
						</button>
					</li>
				</ul>
			</div>

			{showModal && (
				<div className="modal show d-block" tabIndex="-1" role="dialog">
					<div className="modal-dialog modal-lg shadow-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									{modalType === "task" ? "Create Task" : "Create Assignment"}
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label htmlFor="for" className="form-label">
											For:
										</label>
										<input
											type="text"
											className="form-control"
											id="for"
											name="for"
											value={formData.for}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="due" className="form-label">
											Due:
										</label>
										<input
											type="date"
											className="form-control"
											id="due"
											name="due"
											value={formData.due}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="title" className="form-label">
											Title:
										</label>
										<input
											type="text"
											className="form-control"
											id="title"
											name="title"
											value={formData.title}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="instruction" className="form-label">
											Instruction:
										</label>
										<textarea
											className="form-control"
											id="instruction"
											name="instruction"
											value={formData.instruction}
											onChange={handleInputChange}
											required
										></textarea>
									</div>
									<div className="mb-3">
										<label htmlFor="attachment" className="form-label">
											Attachment:
										</label>
										<input
											type="file"
											className="form-control"
											id="attachment"
											name="attachment"
											onChange={handleFileChange}
										/>
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

			<h3>Assignments/Tasks</h3>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Title</th>
						<th>For</th>
						<th>Due</th>
						<th>Created By</th>
						<th>Date Created</th>
					</tr>
				</thead>
				<tbody>
					{assignments.map((assignment) => (
						<tr key={assignment.id}>
							<td>{assignment.title}</td>
							<td>{assignment.for_whom}</td>
							<td>{assignment.due}</td>
							<td>{assignment.user_id}</td>
							<td>{assignment.created_at}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
