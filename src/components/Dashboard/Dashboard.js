import { connect } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";
import PollList from "../PollList/PollList";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const Dashboard = ({ votedPolls, unVotedPolls }) => {
	const [toggleView, setToggleView] = useState(["voted", "unvoted"]);

	let viewVotedPolls = toggleView.includes("voted");
	let viewUnvotedPolls = toggleView.includes("unvoted");

	const handleChange = (val) => setToggleView(val);

	return (
		<>
			<ToggleButtonGroup
				type="checkbox"
				value={toggleView}
				onChange={handleChange}
				style={{ marginTop: "0.75em" }}>
				<ToggleButton id="tbg-btn-1" value={"unvoted"}>
					Latest Polls
				</ToggleButton>
				<ToggleButton id="tbg-btn-2" value={"voted"}>
					Voted Polls
				</ToggleButton>
			</ToggleButtonGroup>

			{unVotedPolls && viewUnvotedPolls && (
				<>
					<h1 style={{ marginTop: "0.75em" }}>Latest Polls</h1>
					<PollList polls={unVotedPolls} voted={false} />
				</>
			)}

			{votedPolls && viewVotedPolls && (
				<>
					<hr
						style={{
							width: "90%",
							margin: "30px auto",
						}}
					/>
					<h1 style={{ marginTop: "0.75em" }}>Voted Polls</h1>
					<PollList polls={votedPolls} voted={true} />
				</>
			)}
		</>
	);
};

const mapStateToProps = ({ authedUser, questions }) => {
	const votedPolls =
		questions &&
		Object.values(questions)
			.filter(
				(question) =>
					question.optionOne.votes.includes(authedUser) ||
					question.optionTwo.votes.includes(authedUser)
			)
			.sort((a, b) => b.timestamp - a.timestamp);

	const unVotedPolls =
		questions &&
		Object.values(questions)
			.filter(
				(question) =>
					!question.optionOne.votes.includes(authedUser) &&
					!question.optionTwo.votes.includes(authedUser)
			)
			.sort((a, b) => b.timestamp - a.timestamp);

	return { votedPolls, unVotedPolls };
};

Dashboard.propTypes = {
	props: PropTypes.object,
};

export default connect(mapStateToProps)(Dashboard);
