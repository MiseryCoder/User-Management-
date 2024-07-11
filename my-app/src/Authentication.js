import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
	const [otp, setOtp] = useState("");
	const [ph, setPh] = useState("");
	const [loading, setLoading] = useState(false);
	const [showOTP, setShowOTP] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const [contact, setContact] = useState("");

	// Session duration in milliseconds (e.g., 1 hour)
	const SESSION_DURATION = 3600000; // 1 hour

	useEffect(() => {
		// Check for session on initial load
		const auth = localStorage.getItem("auth");
		const sessionStartTime = localStorage.getItem("sessionStartTime");

		const storedContact = localStorage.getItem("contact");
		setContact(storedContact);

		if (auth && sessionStartTime) {
			const currentTime = Date.now();
			if (currentTime - sessionStartTime < SESSION_DURATION) {
				navigate("/dashboard");
			} else {
				// Session expired
				navigate("/dashboard");
			}
		}
	}, [navigate]);

	function onCaptchVerify() {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				"recaptcha-container",
				{
					size: "invisible",
					callback: (response) => {
						onSignup();
					},
					"expired-callback": () => {},
				},
				auth
			);
		}
	}

	function onSignup() {
		setLoading(true);
		onCaptchVerify();

		const appVerifier = window.recaptchaVerifier;
		const formatPh = "+" + ph;

		signInWithPhoneNumber(auth, formatPh, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setLoading(false);
				setShowOTP(true);
				toast.success("OTP sent successfully!");
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}

	function onOTPVerify() {
		setLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (res) => {
				setUser(res.user);
				setLoading(false);
				localStorage.setItem("auth", true);
				localStorage.setItem("sessionStartTime", Date.now()); // Store session start time
				navigate("/dashboard");
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}

	return (
		<section className="d-flex align-items-center justify-content-center vh-100 bg-success">
			<div>
				<Toaster toastOptions={{ duration: 4000 }} />
				<div id="recaptcha-container"></div>
				{user ? (
					<h2 className="text-center text-white font-weight-bold">
						👍 Login Success
					</h2>
				) : (
					<div
						className="p-4 rounded-lg bg-white shadow-lg"
						style={{ width: "300px" }}
					>
						<h1 className="text-center font-weight-bold text-primary mb-4">
							Welcome to <br /> Sophia
						</h1>
						{showOTP ? (
							<>
								<div className="text-center mb-4">
									<BsFillShieldLockFill size={30} className="text-success" />
								</div>
								<label
									htmlFor="otp"
									className="font-weight-bold text-center d-block mb-3"
								>
									Enter your OTP
								</label>
								<OtpInput
									value={otp}
									onChange={setOtp}
									OTPLength={6}
									otpType="number"
									disabled={false}
									autoFocus
									className="d-flex justify-content-center"
									inputStyle="form-control w-100"
								/>
								<button
									onClick={onOTPVerify}
									className="btn btn-success btn-block mt-3"
								>
									{loading && (
										<CgSpinner
											size={20}
											className="spinner-border spinner-border-sm mr-2"
										/>
									)}
									<span>Verify OTP</span>
								</button>
							</>
						) : (
							<>
								<div className="text-center mb-4">
									<BsTelephoneFill size={30} className="text-success" />
								</div>
								<label
									htmlFor=""
									className="font-weight-bold text-center d-block mb-3"
								>
									Verify your phone number
								</label>
								<PhoneInput
									country={"ph"}
									value={contact}
									onChange={setPh}
									inputClass="form-control"
								/>
								<button
									onClick={onSignup}
									className="btn btn-success btn-block mt-3"
								>
									{loading && (
										<CgSpinner
											size={20}
											className="spinner-border spinner-border-sm mr-2"
										/>
									)}
									<span>Send code via SMS</span>
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default Authentication;
