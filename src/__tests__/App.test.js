import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "../components/App/App";

describe("App", () => {
	it("will render Employee Polls App text", () => {
		const component = render(
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		);
		const textElement = component.getByText("Employee Polls App");
		expect(textElement).toBeInTheDocument();
	});
});
