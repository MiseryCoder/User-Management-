import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
	const [roleType, setRoleType] = useState("");

	useEffect(() => {
		// Load data from localStorage on component mount
		const storedRoleType = localStorage.getItem("role_type");
		setRoleType(storedRoleType);
	}, []);

	return (
		<div className="container" style={{ paddingTop: 50 }}>
			<h3>User: {roleType}</h3>
			<h3>Dashboard Page</h3>
		</div>
	);
}
