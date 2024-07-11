import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import Grid from "./components/Grid";
import Header from "./components/Header";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Authentication from "./Authentication";
import Schedule from "./components/Schedule";
import Auth from "./components/Auth";
import Assignments from "./components/Assignments";
function App() {
	const logoutSubmit = () => {
		localStorage.setItem("login", "");
		localStorage.setItem("loginStatus", "Logged out successfully!");
		window.location.href = "/"; // Redirect to home after logout
	};

	return (
		<BrowserRouter>
			<div>
				{/* Conditionally render Header component */}
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/Authentication" element={<Authentication />} />
					<Route path="/Register" element={<Register />} />

					<Route
						path="/Grid"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={Grid} />
							</React.Fragment>
						}
					/>
					<Route
						path="/Adduser"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={AddUser} />
							</React.Fragment>
						}
					/>
					<Route
						path="/EditUser/:id"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={EditUser} />
							</React.Fragment>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={Dashboard} />
							</React.Fragment>
						}
					/>
					<Route
						path="/Assignments"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={Assignments} />
							</React.Fragment>
						}
					/>
					<Route
						path="/Schedule"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={Schedule} />
							</React.Fragment>
						}
					/>
					<Route
						path="/Settings"
						element={
							<React.Fragment>
								<Header logoutSubmit={logoutSubmit} />
								<Protected Component={Settings} />
							</React.Fragment>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
