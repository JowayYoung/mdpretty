import React, { useState } from "react";
import { Breadcrumb, Button, Empty, Input, Layout, Menu } from "antd";
import { DeleteFilled, DeleteOutlined, FolderOpenOutlined, FolderOutlined, FileMarkdownTwoTone, PlusOutlined } from "@ant-design/icons";
import Classnames from "classnames";

import "./index.scss";
import { FILES } from "../../utils/getting";
import Parser from "../../components/parser";

const { Item: BreadcrumbItem } = Breadcrumb;
const { Search } = Input;
const { Content, Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

function Editor() {
	const [collapsed, setCollapsed] = useState(true);
	const [openMenu, setOpenMenu] = useState([]);
	const [target, setTarget] = useState(null);
	const selectTarget = e => {
		const [itemId, submenuId] = e.keyPath;
		const submenu = FILES.find(v => v.id === submenuId);
		const item = submenu.list.find(v => v.id === +itemId);
		setTarget({ ...item, path: [submenu.title, item.title] });
	};
	const changeTitle = val => setTarget({ ...target, title: val });
	const changeContent = val => setTarget({ ...target, content: val });
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
					<Parser target={target} onChangeTitle={changeTitle} onChangeContent={changeContent} />
				</Content>
			</Layout>
		</Layout>
	);
}

export default Editor;