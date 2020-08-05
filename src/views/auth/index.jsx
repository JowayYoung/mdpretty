import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

function Auth({ done }) {
	return <div className="auth-component">Auth Component {done}</div>;
}

Auth.propTypes = {
	done: PropTypes.string
};
Auth.defaultProps = {
	done: "Done"
};

export default Auth;