const EDITOR_OPTS = {
	autoCloseBrackets: true,
	autoCloseTags: true,
	indentUnit: 4,
	indentWithTabs: true,
	lineNumbers: true,
	lineWrapping: true,
	matchBrackets: true,
	matchTags: true,
	mode: "markdown",
	styleActiveLine: true,
	theme: "material"
};

const FILES = [{
	id: "life",
	list: new Array(10).fill(0).map((v, i) => ({
		content: "# I Love Mdpretty",
		id: i + 1,
		time: "2020-08-05",
		title: "文件名" + (i + 1)
	})),
	title: "生活"
}, {
	id: "study",
	list: new Array(10).fill(0).map((v, i) => ({
		content: "# I Love Mdpretty",
		id: i + 11,
		time: "2020-08-05",
		title: "文件名" + (i + 11)
	})),
	title: "学习"
}, {
	id: "work",
	list: [],
	title: "工作"
}, {
	id: "trash",
	list: [],
	title: "回收站"
}];

export {
	EDITOR_OPTS,
	FILES
};