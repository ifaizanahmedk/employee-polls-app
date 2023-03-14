import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Image, Stack } from "react-bootstrap";

const PollList = ({ authedUser, polls, users, voted }) => {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
				}}>
				{polls.map((poll) => {
					const author = users[poll.author];
					const voters = poll.optionOne.votes.concat(
						poll.optionTwo.votes
					);
					const date = new Date(poll.timestamp);
					const pollTimestamp =
						date.toLocaleDateString() +
						" | " +
						date.toLocaleTimeString();
					return (
						<Card
							key={poll.id}
							style={{
								width: "300px",
								minWidth: "320px",
								margin: "20px",
							}}>
							<Card.Header>
								<strong>Poll By: {author.name}</strong>
							</Card.Header>
							<Card.Body>
								<Stack
									direction="vertical"
									className="text-center">
									<Image
										roundedCircle={true}
										width={100}
										src={author.avatarURL}
										className="m-auto mb-3"
									/>

									{voted ? (
										<Card.Text>
											<strong className="text-dark">
												You voted for:
											</strong>
											<br />
											<Badge
												style={{
													whiteSpace: "break-spaces",
												}}
												bg={
													poll.optionOne.votes.includes(
														authedUser
													)
														? "success"
														: "secondary"
												}>
												{poll.optionOne.text}
											</Badge>
											<br />
											<Badge
												style={{
													whiteSpace: "break-spaces",
												}}
												bg={
													poll.optionTwo.votes.includes(
														authedUser
													)
														? "success"
														: "secondary"
												}>
												{poll.optionTwo.text}
											</Badge>
										</Card.Text>
									) : (
										<Card.Text>
											{poll.optionOne.text}
											<br />
											<strong>OR</strong>
											<br />
											{poll.optionTwo.text}
										</Card.Text>
									)}

									{voted ? (
										<>
											<Card.Title>
												<h6>Voted By:</h6>
											</Card.Title>
											{voters && (
												<Stack
													className="text-center w-auto"
													direction="horizontal"
													gap={0}>
													{voters.map((voter) => (
														<Image
															roundedCircle={true}
															className="voters-list"
															width="40"
															key={voter}
															src={
																users[voter]
																	.avatarURL
															}
														/>
													))}
												</Stack>
											)}
											<Link to={`/questions/${poll.id}`}>
												<small>View details</small>
											</Link>
										</>
									) : (
										<Link to={`/questions/${poll.id}`}>
											<Button
												size="sm"
												variant="primary"
												type="submit"
												className="vote-now-button">
												Vote Now!
											</Button>
										</Link>
									)}
								</Stack>
							</Card.Body>
							<Card.Footer>
								<small>
									<strong>Created at:</strong> {pollTimestamp}
								</small>
							</Card.Footer>
						</Card>
					);
				})}
			</div>
		</>
	);
};

const mapStateToProps = ({ authedUser, users }) => ({ authedUser, users });

PollList.propTypes = {
	props: PropTypes.object,
};

export default connect(mapStateToProps)(PollList);
