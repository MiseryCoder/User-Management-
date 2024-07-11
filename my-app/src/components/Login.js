import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Login() {
	const naviget = useNavigate();
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	useEffect(() => {
		let login = localStorage.getItem("login");
		//if the session is already started the default page will be the dashboard
		if (login) {
			naviget("/");
		}
		let loginStatus = localStorage.getItem("loginStatus");
		if (loginStatus) {
			setError(loginStatus);
			setTimeout(function () {
				localStorage.clear();
				window.location.reload();
			}, 1000);
		}
		setTimeout(function () {
			setMsg("");
		}, 1000);
	}, [msg]);

	const handleInputChange = (e, type) => {
		switch (type) {
			case "user":
				setError("");
				setUser(e.target.value);
				if (e.target.value === "") {
					setError("Username has left blank");
				}
				break;
			case "pass":
				setError("");
				setPass(e.target.value);
				if (e.target.value === "") {
					setError("Password has left blank");
				}
				break;
			default:
		}
	};

	function loginSubmit() {
		if (user !== "" && pass !== "") {
			var url = "http://localhost/HAHAHA/Backend/login123.php";
			var headers = {
				Accept: "application/json",
				"Content-type": "application/json",
			};
			var Data = {
				user: user,
				pass: pass,
			};
			fetch(url, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(Data),
			})
				.then((response) => response.json())
				.then((response) => {
					console.log(response);
					if (response[0].result === "Loggedin successfully! Redirecting...") {
						naviget("/Authentication");
						localStorage.setItem("login", true);
						localStorage.setItem("user", user);
						localStorage.setItem("UserId", response[0].id);
						localStorage.setItem("role_type", response[0].role_type); // Store role_type in localStorage
						localStorage.setItem("contact", response[0].contact); // Store role_type in localStorage
					} else {
						setError(response[0].result);
					}
				})
				.catch((err) => {
					setError(err);
					console.log(err);
				});
		} else {
			setError("All field are required!");
		}
	}

	return (
		<>
			<div className="container py-5 h-100 w-50">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col col-xl-10">
						<div className="card shadow">
							<div className="col-md-6 col-lg-12 d-flex align-items-center">
								<div className="card-body p-4 p-lg-5 text-black">
									{error !== "" ? (
										<div style={{ color: "#842029" }}>
											<b>{error}</b>
										</div>
									) : (
										<div style={{ color: "#badbcc" }}>
											<b>{msg}</b>
										</div>
									)}
									<div className="d-flex align-items-center mb-3 pb-1">
										<i
											className="fas fa-cubes fa-2x me-3"
											style={{ color: "#ff6219" }}
										/>
										<span className="h1 fw-bold mb-0">Logo</span>
									</div>
									<h5
										className="fw-normal mb-3 pb-3"
										style={{ letterSpacing: 1 }}
									>
										Sign into your account
									</h5>
									<div className="form-outline mb-4">
										<input
											type="text"
											id="username"
											className="form-control form-control-lg"
											value={user}
											onChange={(e) => handleInputChange(e, "user")}
										/>
										<label className="form-label" htmlFor="username">
											User Name
										</label>
									</div>
									<div className="form-outline mb-4">
										<input
											type="password"
											id="pass"
											className="form-control form-control-lg"
											value={pass}
											onChange={(e) => handleInputChange(e, "pass")}
										/>
										<label className="form-label" htmlFor="pass">
											Password
										</label>
									</div>
									<div className="pt-1 mb-4">
										<input
											type="submit"
											defaultValue="Login"
											className="btn btn-success btn-lg btn-block"
											onClick={loginSubmit}
										/>
									</div>
									<p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
										Don't have an account?{" "}
										<a href="/Register" style={{ color: "#393f81" }}>
											Register here
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
