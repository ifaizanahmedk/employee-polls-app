import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Leaderboard from "./LeaderBoard/Leaderboard";
import NotFound from "./NotFound/NotFound";
import Poll from "./Poll/Poll";
import AddPoll from "./AddPoll/AddPoll";
import { Container } from "react-bootstrap";

const AppRoute = (props) => {
	return (
		<>
			<Container
				fluid
				style={{
					minWith: "350px",
					margin: "0 auto",
					textAlign: "center",
				}}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/questions/:question_id" element={<Poll />} />
					<Route path="/add" element={<AddPoll />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</>
	);
};

AppRoute.propTypes = {
	props: PropTypes.object,
};

export default AppRoute;
