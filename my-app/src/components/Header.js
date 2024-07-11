import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header({ logoutSubmit }) {
	const [roleType, setRoleType] = useState("");

	useEffect(() => {
		// Load role_type from localStorage on component mount
		const storedRoleType = localStorage.getItem("role_type");
		setRoleType(storedRoleType);
	}, []);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="#">
					User Management
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								to="/dashboard"
								className="nav-link active"
								aria-current="page"
							>
								Home
							</Link>
						</li>
						{roleType === "admin" && (
							<li className="nav-item">
								<Link to="/Grid" className="nav-link">
									User List
								</Link>
							</li>
						)}
						{roleType === "admin" && (
							<li className="nav-item">
								<Link to="/Schedule" className="nav-link">
									Schedule
								</Link>
							</li>
						)}
						{roleType === "admin" && (
							<li className="nav-item">
								<Link to="/Assignments" className="nav-link">
									Assignments
								</Link>
							</li>
						)}
						{roleType === "admin" && (
							<li className="nav-item">
								<Link to="/Settings" className="nav-link">
									Settings
								</Link>
							</li>
						)}

						{roleType === "user" && (
							<li className="nav-item">
								<Link to="#" className="nav-link">
									Task
								</Link>
							</li>
						)}
					</ul>
					<div className="d-flex">
						<button
							className="btn btn-danger"
							type="submit"
							onClick={logoutSubmit}
						>
							<i className="bi bi-box-arrow-left"></i>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
