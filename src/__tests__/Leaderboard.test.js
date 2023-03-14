import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { receiveUsers } from "../actions/users";
import { users } from "../utils/_DATA";

describe("Leaderboard", () => {
	it("will match the snapshots", () => {
		store.dispatch(receiveUsers(users));

		const component = render(
			<Provider store={store}>
				<Router>
					<Leaderboard />
				</Router>
			</Provider>
		);
		expect(component).toMatchSnapshot();
	});
});
