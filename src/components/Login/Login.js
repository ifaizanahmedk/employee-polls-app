import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import setAuthedUser from "../../actions/authedUser";
import votingBanner from "../../images/lets-vote.png";
import { Button, Col, FloatingLabel, Form, Image, Row } from "react-bootstrap";

const Login = ({ dispatch, users }) => {
	const navigate = useNavigate();
	const [selectedUser, setSelectedUser] = useState({});
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleChange = (e) => {
		switch (e.target.id) {
			case "user-select":
				setSelectedUser(e.target.value);
				return;

			case "user-password":
				setPassword(e.target.value);
				return;

			default:
				return;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let userPassword = users[selectedUser].password;

		if (userPassword === password) {
			dispatch(setAuthedUser(selectedUser));
		} else {
			setError(true);
		}
	};

	return (
		<>
			<Row className="m-5">
				<Col md="12">
					<h1 className="text-center">Employee Polls App</h1>
				</Col>
			</Row>
			<Row>
				<Col md="6">
					<Image src={votingBanner} width={350} fluid={true} />
				</Col>
				<Col md="6">
					<Form name="user-login-form" className="login-form ml-3">
						<Form.Group className="mb-3">
							<h3>Login</h3>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel
								controlId="user-select"
								label="Select your User">
								<Form.Select
									data-testid="user-select"
									aria-label="Select your User"
									size="lg"
									defaultValue="default"
									onChange={handleChange}>
									<option value="default" disabled>
										What's your user?
									</option>
									{users &&
										Object.values(users).map((user) => (
											<option
												data-testid={user.id}
												key={user.id}
												value={user.id}>
												{user.id}
											</option>
										))}
								</Form.Select>
							</FloatingLabel>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel
								controlId="user-password"
								label="Password">
								<Form.Control
									data-testid="user-password"
									size="lg"
									type="password"
									placeholder="Password"
									onChange={handleChange}
									value={password}
									isInvalid={error}
								/>
							</FloatingLabel>
							{error && (
								<small
									data-testid="error-message"
									className="text-danger">
									Incorrect Password. Try again!
								</small>
							)}
						</Form.Group>

						<Form.Group className="mb-3">
							<Button
								variant="primary"
								type="submit"
								className="login-form-button"
								id="login-form-button"
								data-testid="login-form-button"
								disabled={!selectedUser || !password}
								onClick={handleSubmit}>
								Log in
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(Login);
