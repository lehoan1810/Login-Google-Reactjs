import { useState } from "react";
import GoogleLogin from "react-google-login";
import "./App.css";

function App() {
	const [loginData, setLoginData] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
			: null
	);
	const handleLogin = async (googleData) => {
		const res = await fetch("/api/google-login", {
			method: "POST",
			body: JSON.stringify({
				token: googleData.tokenId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setLoginData(data);
		localStorage.setItem("loginData", JSON.stringify(data));
	};

	const handleFailure = (resuilt) => {
		console.log(resuilt);
	};
	const handleLogout = () => {
		localStorage.removeItem("loginData");
		setLoginData(null);
	};
	return (
		<div className="App">
			<h1>Login Google</h1>
			<div>
				{loginData ? (
					<div>
						<h1>My Name: {loginData.name}</h1>
						<h3>Logged in as {loginData.email}</h3>
						<button onClick={handleLogout}>LogOut</button>
					</div>
				) : (
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Log in with Google"
						onSuccess={handleLogin}
						onFailure={handleFailure}
						cookiePolicy={"single_host_origin"}
					></GoogleLogin>
				)}
			</div>
		</div>
	);
}

export default App;
