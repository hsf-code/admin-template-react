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
import { APP_CSS_NAME_PREFIX } from "@/config/config";

import "./index.less";

const { Sider, Content } = Layout;
const defaultTheme = "light";

const LayoutIndex: React.FC = (props: any) => {
	// 高阶组件传入进来的
	const { updateCollapse } = props;

	useEffect(() => {
		updateCollapse(props.isCollapse);
	}, [props.isCollapse]);

	return (
		<Layout className={`${APP_CSS_NAME_PREFIX}-root`}>
			<LayoutHeader></LayoutHeader>
			<Layout>
				<Sider trigger={null} theme={defaultTheme} width={200} collapsible collapsed={props.isCollapse}>
					<LayoutMenu></LayoutMenu>
				</Sider>
				<Content className={`${APP_CSS_NAME_PREFIX}-root-container`}>
					<LayoutTabs></LayoutTabs>
					<BreadcrumbNav />
					<Content className={`${APP_CSS_NAME_PREFIX}-root-content`}>
						<Outlet></Outlet>
					</Content>
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
