import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Container, Image, Row, Table } from "react-bootstrap";

const Leaderboard = ({ users }) => {
	return (
		<>
			<Container>
				<Row className="mt-5">
					<Col>
						<Table striped responsive>
							<thead>
								<tr>
									<th className="text-start">User</th>
									<th>Answered</th>
									<th>Created</th>
								</tr>
							</thead>
							<tbody>
								{users ? (
									users.map((user, key) => (
										<tr key={key}>
											<td className="text-start">
												<Image
													roundedCircle={true}
													width={"40px"}
													src={user.avatarURL}
													style={{
														marginRight: "10px",
													}}
												/>
												{user.name}
											</td>
											<td>
												{Object.keys(user.answers)
													.length || 0}
											</td>
											<td>
												{Object.keys(user.questions)
													.length || 0}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={3}>No Data Found!</td>
									</tr>
								)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const mapStateToProps = ({ users }) => {
	const usersPollPoints = Object.values(users).map((user) => ({
		...user,
		totalPoints:
			Object.values(user.questions).length +
			Object.values(user.answers).length,
	}));

	const sortedUsers = usersPollPoints.sort(
		(a, b) => b.totalPoints - a.totalPoints
	);

	return {
		users: sortedUsers,
	};
};

Leaderboard.propTypes = {
	props: PropTypes.object,
};

export default connect(mapStateToProps)(Leaderboard);
