import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import votingOptions from "../../images/options.png";
import { handleAddQuestion } from "../../actions/questions";
import { useState } from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Image,
	Row,
	Stack,
} from "react-bootstrap";

const AddPoll = ({ dispatch, loggedUser }) => {
	const navigate = useNavigate();
	const [optionOne, setOptionOne] = useState("");
	const [optionTwo, setOptionTwo] = useState("");

	const handleChange = (e) => {
		const quesId = e.target.id;
		const optionValue = e.target.value;

		switch (quesId) {
			case "optionOne":
				setOptionOne(optionValue);
				return;

			case "optionTwo":
				setOptionTwo(optionValue);
				return;

			default:
				return;
		}
	};

	const handleSubmit = () => {
		dispatch(handleAddQuestion(optionOne, optionTwo));
		navigate("/");
	};

	return (
		<>
			<Container>
				<Row>
					<Col md="10" className="m-auto">
						<Card
							style={{
								width: "100%",
								margin: "30px 0",
							}}>
							<Card.Header>
								<strong>Would you rather</strong>
							</Card.Header>
							<Stack direction="horizontal" gap={3}>
								<Card.Img
									src={votingOptions}
									style={{
										maxWidth: "400px",
										width: "100%",
										margin: "auto",
									}}
								/>
								<Card.Body>
									<Stack direction="horizontal" gap={3}>
										<Image
											roundedCircle={true}
											width="80"
											src={loggedUser.avatarURL}
										/>
										<div
											style={{
												textAlign: "left",
											}}>
											<Card.Title>
												{loggedUser.name}
											</Card.Title>
											<Card.Text>
												Create your own poll
											</Card.Text>
										</div>
									</Stack>
									<Form
										style={{
											marginTop: "30px",
										}}>
										<Form.Group>
											<Form.Control
												data-testid="poll-optionOne"
												size="lg"
												id="optionOne"
												placeholder="Option 1"
												onChange={handleChange}
											/>
											<hr />
											<span
												style={{
													fontSize: "20px",
												}}>
												<strong>OR</strong>
											</span>
											<hr />
											<Form.Control
												data-testid="poll-optionTwo"
												size="lg"
												id="optionTwo"
												placeholder="Option 2"
												onChange={handleChange}
											/>
										</Form.Group>
										<Form.Group
											className="mt-3"
											style={{
												textAlign: "center",
											}}>
											<Button
												variant="primary"
												onClick={handleSubmit}>
												Create Poll
											</Button>
										</Form.Group>
									</Form>
								</Card.Body>
							</Stack>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const mapStateToProps = ({ dispatch, authedUser, users }) => {
	const loggedUser = users[authedUser];

	return {
		dispatch,
		loggedUser,
		loading: authedUser === null,
	};
};

AddPoll.propTypes = {
	props: PropTypes.object,
};

export default connect(mapStateToProps)(AddPoll);
