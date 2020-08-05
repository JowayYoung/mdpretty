import React from "react";

import "./index.scss";
import ImgAvatar from "../../assets/img/avatar.jpg";

function Topbar() {
	return (
		<div className="topbar-component">
			<img src={ImgAvatar} />
			<a>登录</a>
		</div>
	);
}

export default Topbar;