import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { handleVote } from "../../actions/questions";
import { Button, Card, Image, Stack } from "react-bootstrap";
import MyToast from "../MyToast/MyToast";
import { useState } from "react";
import NotFound from "../NotFound/NotFound";

const withRouter = (Component) => {
	const ComponentWithRouterProp = (props) => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	};

	return ComponentWithRouterProp;
};

const Poll = ({ dispatch, questions, authedUser, author, poll, users }) => {
	const [question, setQuestion] = useState(); // complete vote object

	const date = new Date(poll?.timestamp);
	const pollTimestamp =
		date.toLocaleDateString() + " | " + date.toLocaleTimeString();

	const hasVotedForOptionOne = poll?.optionOne.votes.includes(authedUser);
	const hasVotedForOptionTwo = poll?.optionTwo.votes.includes(authedUser);

	const totalPollVotesCount =
		poll?.optionOne.votes.length + poll?.optionTwo.votes.length;

	const calculateVotesPercentage = (option) => {
		return Math.floor((option.votes.length * 100) / totalPollVotesCount);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const voteId = e.target.id;

		setQuestion(poll[e.target.id]);

		dispatch(handleVote(poll.id, voteId));
	};

	return !poll ? (
		<NotFound />
	) : (
		<>
			{question && (
				<MyToast
					user={users[authedUser]}
					pollBy={author}
					position="top-end"
					message={`Your voted has beed submitted as: ${question.text}`}
				/>
			)}
			<Card
				className="text-center m-4 ms-auto me-auto"
				style={{
					width: "800px",
					minWidth: "320px",
				}}>
				<Card.Header>
					<strong>Would you rather</strong>
				</Card.Header>
				<Card.Body>
					<Stack direction="vertical" gap={5}>
						<div>
							<Image
								roundedCircle={true}
								width="80"
								src={author.avatarURL}
							/>
						</div>
						<Stack direction="horizontal" className="w-100 m-auto">
							<Stack
								direction="vertical"
								style={{ width: "45%" }}>
								<Button
									id="optionOne"
									onClick={handleSubmit}
									variant={
										hasVotedForOptionOne
											? "success"
											: "outline-primary"
									}
									className="vote-button"
									disabled={!!hasVotedForOptionOne}>
									{poll.optionOne.text}
								</Button>
								{hasVotedForOptionOne && (
									<small>
										Total Votes:&nbsp;
										{poll.optionOne.votes.length}
										&nbsp; (
										{calculateVotesPercentage(
											poll.optionOne,
											users
										)}
										%)
									</small>
								)}
							</Stack>
							<span
								className="m-3"
								style={{
									fontSize: "20px",
								}}>
								<strong>OR</strong>
							</span>
							<Stack
								direction="vertical"
								style={{ width: "45%" }}>
								<Button
									id="optionTwo"
									onClick={handleSubmit}
									variant={
										hasVotedForOptionTwo
											? "success"
											: "outline-primary"
									}
									className="vote-button"
									disabled={!!hasVotedForOptionTwo}>
									{poll.optionTwo.text}
								</Button>
								{hasVotedForOptionTwo && (
									<small>
										Total Votes:{" "}
										{poll.optionTwo.votes.length}
										&nbsp; (
										{calculateVotesPercentage(
											poll.optionTwo,
											users
										)}
										%)
									</small>
								)}
							</Stack>
						</Stack>
					</Stack>
				</Card.Body>
				<Card.Footer>
					<small>
						<strong>{author.name}</strong> created this poll
						on&nbsp;
						{pollTimestamp}
					</small>
				</Card.Footer>
			</Card>
		</>
	);
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
	const { question_id } = props.router.params;
	const poll = questions[question_id];
	const author = users && poll && users[poll.author];

	return { authedUser, questions, author, poll, users };
};

Poll.propTypes = {
	props: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(Poll));
