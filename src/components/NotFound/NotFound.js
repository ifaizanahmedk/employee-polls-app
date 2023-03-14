import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Image, Stack } from "react-bootstrap";
import NotFoundImg from "../../images/not-found-error.png";
import { connect } from "react-redux";

const NotFound = (props) => {
	return (
		<>
			<Stack direction="vertical" gap={2}>
				<Image
					src={NotFoundImg}
					style={{ width: "30vw", margin: "auto" }}
				/>
				<h3>Sorry, the page you visited does not exist."</h3>
				<Link to="/">
					<Button variant="outline-primary" className="mt-2">
						Back To Home
					</Button>
				</Link>
			</Stack>
		</>
	);
};

NotFound.propTypes = {
	props: PropTypes.object,
};

export default connect()(NotFound);
