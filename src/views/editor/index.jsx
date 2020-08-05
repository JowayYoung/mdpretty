import React, { useState } from "react";
import { Breadcrumb, Button, Empty, Input, Layout, Menu } from "antd";
import { DeleteFilled, DeleteOutlined, FolderOpenOutlined, FolderOutlined, FileMarkdownTwoTone, PlusOutlined } from "@ant-design/icons";
import Classnames from "classnames";

import "./index.scss";

const { Item: BreadcrumbItem } = Breadcrumb;
const { Search } = Input;
const { Content, Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const FILES = [{
	id: "life",
	list: new Array(10).fill(0).map((v, i) => ({
		id: i + 1,
		time: "2020-08-05",
		title: "文件名" + (i + 1)
	})),
	title: "生活"
}, {
	id: "study",
	list: new Array(10).fill(0).map((v, i) => ({
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

function Editor() {
	const [collapsed, setCollapsed] = useState(false);
	const [openMenu, setOpenMenu] = useState([]);
	const [target, setTarget] = useState(null);
	const selectTarget = e => {
		const [itemId, submenuId] = e.keyPath;
		const submenu = FILES.find(v => v.id === submenuId);
		const item = submenu.list.find(v => v.id === +itemId);
		setTarget({ ...item, path: [submenu.title, item.title] });
	};
	const menuDom = FILES.map(v => {
		const folderIcon = openMenu.includes(v.id) ? <FolderOpenOutlined /> : <FolderOutlined />;
		const trashIcon = openMenu.includes(v.id) ? <DeleteFilled /> : <DeleteOutlined />;
		const iconDom = v.id === "trash" ? trashIcon : folderIcon;
		const subMenuDom = v?.list?.length
			? v.list.map(w => <MenuItem key={w.id} ttile={w.title} icon={<FileMarkdownTwoTone />}>{w.title}</MenuItem>)
			: <li><Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /></li>;
		return (
			<SubMenu key={v.id} title={v.title} icon={iconDom}>{subMenuDom}</SubMenu>
		);
	});
	const breadcrumbDom = target?.path
		? <Breadcrumb>{target.path.map(v => <BreadcrumbItem key={v}>{v}</BreadcrumbItem>)}</Breadcrumb>
		: null;
	const documentDom = target ? target.title : <Empty description="请选择文档或创建文档" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
	return (
		<Layout className="editor-view">
			<Sider collapsible theme="light" width={300} collapsed={collapsed} onCollapse={flag => setCollapsed(flag)}>
				<div className={Classnames("editor-handler", { collapsed })}>
					<Search enterButton placeholder="请输入关键词" onSearch={val => console.log(val)} />
					<Button type="primary" shape="circle" icon={<PlusOutlined />} />
				</div>
				<Menu mode="inline" onOpenChange={list => setOpenMenu(list)} onClick={selectTarget}>{menuDom}</Menu>
			</Sider>
			<Layout>
				<Content>
					{breadcrumbDom}
					<div className={Classnames("editor-area", { "flex-ct-y": !target })}>{documentDom}</div>
				</Content>
			</Layout>
		</Layout>
	);
}

export default Editor;