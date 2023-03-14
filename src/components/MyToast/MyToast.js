import PropTypes from "prop-types";
import { ToastContainer, Toast, Image } from "react-bootstrap";

const MyToast = ({ user, message, position, pollBy }) => {
	return (
		<ToastContainer className="p-3" position={position}>
			<Toast show={!!user}>
				<Toast.Header closeButton={false}>
					<Image
						roundedCircle={true}
						width="30"
						src={user.avatarURL}
						className="me-2"
					/>
					<strong className="me-auto">{user.name}</strong>
					<small>
						<strong>Poll By: </strong>
						{pollBy.name}
					</small>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

MyToast.propTypes = {
	position: PropTypes.string,
	message: PropTypes.string.isRequired,
};

export default MyToast;
