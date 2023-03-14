import { store } from "../store";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import AppHeader from "../components/AppHeader/AppHeader";
import setAuthedUser from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

describe("AppHeader", () => {
	it("will verify that the expected links are displayed", async () => {
		await store.dispatch(setAuthedUser("mktsamis"));
		await store.dispatch(handleInitialData());

		const component = render(
			<Provider store={store}>
				<Router>
					<AppHeader />
				</Router>
			</Provider>
		);

		const username = component.getAllByText("mktsamis");
		const dashboard = component.getAllByText("Dashboard");
		const addPoll = component.getAllByText("Create Poll");
		const leaderboard = component.getAllByText("Leaderboard");

		expect(username.length).toEqual(1);
		expect(dashboard.length).toEqual(1);
		expect(addPoll.length).toEqual(1);
		expect(leaderboard.length).toEqual(1);
	});
});
