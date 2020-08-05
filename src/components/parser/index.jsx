import React, { useState } from "react";
import { UnControlled as ReactCodemirror } from "react-codemirror2";
import { Input } from "antd";
import { FireOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./index.scss";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/selection/active-line";
import "codemirror/keymap/sublime";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/vue/vue";
import "codemirror/mode/xml/xml";
import { CODE_EDITOR_OPTS } from "../../utils/getting";

function Parser({ item }) {
	if (!item) return null;
	const [title, setTitle] = useState("Hello World");
	const [content, setContent] = useState("# I Love Mdpretty");
	console.log(title, content);
	return (
		<div className="parser-component">
			<Input allowClear size="large" placeholder="请输入标题" value={title} prefix={<FireOutlined />} onChange={e => setTitle(e.target.value)} />
			<div className="parser-box">
				<ReactCodemirror className="parser-editor" value={content} options={CODE_EDITOR_OPTS} onChange={(e, d, val) => setContent(val)} />
				<div className="parser-monitor"></div>
			</div>
		</div>
	);
}

Parser.propTypes = {
	item: PropTypes.object
};
Parser.defaultProps = {
	item: null
};

export default Parser;