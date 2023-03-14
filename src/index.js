import ReactDOM from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App/App";

import "./index.css";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
