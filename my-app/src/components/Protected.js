import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ Component }) => {
	const auth = localStorage.getItem("auth");
	const sessionStartTime = localStorage.getItem("sessionStartTime");
	const SESSION_DURATION = 8 * 3600000; // 1 hour

	if (auth && sessionStartTime) {
		const currentTime = Date.now();
		if (currentTime - sessionStartTime < SESSION_DURATION) {
			return <Component />;
		} else {
			// Session expired
			localStorage.clear();
			return <Navigate to="/" />;
		}
	} else {
		return <Navigate to="/" />;
	}
};

export default Protected;
