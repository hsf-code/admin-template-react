import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { updateCollapse } from "@/redux/modules/menu/action";
import { connect } from "react-redux";
import BreadcrumbNav from "./components/Header/components/BreadcrumbNav";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import LayoutFooter from "./components/Footer";
import AdminLogo from "./components/Menu/components/AdminLogo/index";

import "./index.less";

const { Header, Sider, Content } = Layout;
const defaultTheme = "light";

const LayoutIndex: React.FC = (props: any) => {
	// 高阶组件传入进来的
	const { updateCollapse } = props;

	useEffect(() => {
		updateCollapse(props.isCollapse);
	}, [props.isCollapse]);

	return (
		<Layout className="container">
			<Header className="header">
				<AdminLogo></AdminLogo>
				<LayoutHeader></LayoutHeader>
			</Header>
			<Layout>
				{/* 左边 */}
				<Sider trigger={null} theme={defaultTheme} width={230} collapsible collapsed={props.isCollapse}>
					<LayoutMenu></LayoutMenu>
				</Sider>
				<Content>
					{/* 右边 */}
					<LayoutTabs></LayoutTabs>
					<BreadcrumbNav />
					<div style={{ background: "#fff" }}>
						<Outlet></Outlet>
					</div>
					<LayoutFooter></LayoutFooter>
				</Content>
			</Layout>
		</Layout>
	);
};

// 将 state 状态作为 props 传入组件
const mapStateToProps = (state: any) => state.menu;
// 将 dispatch 方法作为 props 传入组件
const mapDispatchToProps = { updateCollapse };
// 高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
