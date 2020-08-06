import Highlight from "highlight.js";
import MarkdownIt from "markdown-it";
import MarkdownItTaskCheckbox from "markdown-it-task-checkbox";

const EDITOR_OPTS = {
	autoCloseBrackets: true,
	autoCloseTags: true,
	extraKeys: { Ctrl: "autocomplete" },
	indentUnit: 4,
	indentWithTabs: true,
	keyMap: "sublime",
	lineNumbers: true,
	lineWrapping: true,
	matchBrackets: true,
	matchTags: true,
	mode: "markdown",
	styleActiveLine: true,
	theme: "material"
};

const MD_RENDER = MarkdownIt({
	highlight: (str, lang) => lang && Highlight.getLanguage(lang) ? Highlight.highlight(lang, str).value : "",
	html: true
}).use(MarkdownItTaskCheckbox, { disabled: true });

export {
	EDITOR_OPTS,
	MD_RENDER
};