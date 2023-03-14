import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import setAuthedUser from "../../actions/authedUser";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";

const AppHeader = ({ dispatch, authedUser }) => {
	const handleLogout = () => {
		dispatch(setAuthedUser(null));
	};

	return (
		<Navbar bg="dark" variant="dark" className="app-header" expand="lg">
			<Container fluid>
				<Link className="navbar-brand" to="/">
					Employee Polls App
				</Link>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav navbarScroll className="me-auto">
						<Link className="nav-link" to="/">
							Dashboard
						</Link>
						<Link className="nav-link" to="/add">
							Create Poll
						</Link>
						<Link className="nav-link" to="/leaderboard">
							Leaderboard
						</Link>
					</Nav>
					{authedUser && (
						<Nav navbarScroll>
							<Stack direction="horizontal" gap={3}>
								<p className="text-white m-0">
									<strong>{authedUser}</strong>
								</p>
								<Button variant="danger" onClick={handleLogout}>
									Logout
								</Button>
							</Stack>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

const mapStateToProps = ({ authedUser }) => ({
	authedUser,
});

AppHeader.propTypes = {
	props: PropTypes.object,
};

export default connect(mapStateToProps)(AppHeader);
