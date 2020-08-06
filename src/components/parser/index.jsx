import React, { useEffect, useRef } from "react";
import { Empty, Input } from "antd";
import { FireOutlined } from "@ant-design/icons";
import Codemirror from "codemirror";
import Highlight from "highlight.js";
import MarkdownIt from "markdown-it";
import MarkdownItTaskCheckbox from "markdown-it-task-checkbox";
import PropTypes from "prop-types";

import "codemirror/addon/dialog/dialog.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../assets/css/atom-one-dark.scss";
import "../../assets/css/markdown.scss";
import "./index.scss";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/search/search";
import "codemirror/addon/selection/active-line";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/vue/vue";
import "codemirror/mode/xml/xml";
import { EDITOR_OPTS } from "../../utils/getting";

const MD_RENDER = MarkdownIt({
	highlight: (str, lang) => lang && Highlight.getLanguage(lang)
		? Highlight.highlight(lang, str).value
		: "",
	html: true
}).use(MarkdownItTaskCheckbox, { disabled: true });

console.log(MD_RENDER);

function Parser({ onChangeContent, onChangeTitle, target }) {
	if (!target) {
		return (
			<div className="parser-component flex-ct-x">
				<Empty description="请选择文档或创建文档" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</div>
		);
	}
	const textarea = useRef(null);
	useEffect(() => {
		const cm = Codemirror.fromTextArea(textarea.current, EDITOR_OPTS);
		const height = textarea.current.parentNode.offsetHeight;
		document.getElementsByClassName("CodeMirror")[0].style.height = height + "px";
		cm.on("change", doc => onChangeContent(doc.getValue()));
		return () => cm.toTextArea();
	}, []);
	return (
		<div className="parser-component">
			<Input allowClear
				className="parser-title"
				size="large"
				placeholder="请输入标题"
				value={target.title}
				prefix={<FireOutlined />}
				onChange={e => onChangeTitle(e.target.value)} />
			<div className="parser-editor">
				<textarea ref={textarea} defaultValue={target.content} autoComplete="off"></textarea>
			</div>
		</div>
	);
}

Parser.propTypes = {
	onChangeContent: PropTypes.func,
	onChangeTitle: PropTypes.func,
	target: PropTypes.object
};
Parser.defaultProps = {
	onChangeContent: null,
	onChangeTitle: null,
	target: null
};

export default Parser;