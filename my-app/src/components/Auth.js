import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ Component }) => {
	const auth = localStorage.getItem("auth");
	const sessionStartTime = localStorage.getItem("sessionStartTime");
	const SESSION_DURATION = 4 * 3600000; // 8 hour

	if (auth && sessionStartTime) {
		const currentTime = Date.now();
		if (currentTime - sessionStartTime < SESSION_DURATION) {
			return <Component />;
		} else {
			// Session expired
			// localStorage.clear();
			return <Navigate to="/" />;
		}
	} else {
		return <Navigate to="/" />;
	}
};

export default Auth;
