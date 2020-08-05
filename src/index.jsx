import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/css/reset.css";
import "antd/dist/antd.css";
import "./index.scss";
import Topbar from "./components/topbar";
// import Auth from "./views/auth";
import Editor from "./views/editor";

function App() {
	return (
		<div className="index-page">
			<Topbar />
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Editor} />
					{/**
					<Route exact path="/" component={Auth} />
					<Route path="/editor" component={Editor} />
					<Route component={Auth} />
					**/}
				</Switch>
			</BrowserRouter>
		</div>
	);
}

console.log("项目构建环境：", process.env.NODE_ENV);
console.log("项目运行环境：", RUN_ENV); // eslint-disable-line
hot(App);
render(<App />, document.getElementById("root"));