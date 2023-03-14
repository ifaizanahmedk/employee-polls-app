// import "@testing-library/jest-dom";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Login from "../components/Login/Login";
import { handleInitialData } from "../actions/shared";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
	it("should render the component", async () => {
		const component = render(
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>
		);
		expect(component).toBeDefined();
		expect(component).toMatchSnapshot();
	});

	it("will verify that the login component has a login field, a password field and a submit button", () => {
		const component = render(
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>
		);

		const userSelect = component.getByTestId("user-select");
		const passwordInput = component.getByTestId("user-password");
		const loginButton = component.getByTestId("login-form-button");

		expect(userSelect).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});

	it("will return Error if the username and password doesn't match", async () => {
		await store.dispatch(handleInitialData());

		const component = render(
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>
		);

		const userSelect = component.getByTestId("user-select");
		const password = component.getByTestId("user-password");
		const loginButton = component.getByTestId("login-form-button");

		const userId = await waitFor(() => component.getByTestId("sarahedo"), {
			timeout: 2000,
		}); //we wait extra in order to have the users after the dispatch (1000ms)

		userEvent.selectOptions(
			component.getByTestId("user-select"),
			"sarahedo"
		);
		expect(component.getByTestId("sarahedo").selected).toBe(true);

		fireEvent.change(userSelect);
		fireEvent.click(userId);
		fireEvent.change(password, { target: { value: "wrong_password" } });
		fireEvent.click(loginButton);

		expect(loginButton).toBeInTheDocument();
		// makes sure error message is in the DOM after error happens.
		expect(component.getByTestId("error-message")).toBeInTheDocument();
	});
});
