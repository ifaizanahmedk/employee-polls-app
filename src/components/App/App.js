import Login from "../Login/Login";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { useEffect } from "react";
import { handleInitialData } from "../../actions/shared";
import AppRoute from "../AppRoute";
import { Container } from "react-bootstrap";
import AppHeader from "../AppHeader/AppHeader";

const App = ({ dispatch, loading }) => {
	useEffect(() => {
		dispatch(handleInitialData());
	}, [dispatch]);

	return (
		<>
			<LoadingBar style={{ height: "5px" }} />
			<AppHeader />
			<Container
				fluid
				style={{
					minHeight: "100vh",
				}}>
				<div className="App">
					{loading !== true ? (
						<div className="content">
							<AppRoute />
						</div>
					) : (
						<div
							className="content"
							style={{
								width: "70%",
								minWidth: "375px",
								margin: "0 auto",
							}}>
							<Login />
						</div>
					)}
				</div>
			</Container>
		</>
	);
};

const mapStateToProps = ({ authedUser }) => {
	return {
		loading: authedUser === null,
	};
};

App.propTypes = {
	props: PropTypes.object,
};

export default connect(mapStateToProps)(App);
