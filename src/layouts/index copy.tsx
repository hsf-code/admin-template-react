import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { updateCollapse } from "@/redux/modules/menu/action";
import { connect } from "react-redux";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import LayoutFooter from "./components/Footer";
import BreadcrumbNav from "./components/Header/components/BreadcrumbNav";

import "./index.less";

/**
 * 页面的基础布局组件
 * 	包含各个二级页面
 *
 * */
const LayoutIndex = (props: any) => {
	const defaultTheme = "dark";
	const { Sider, Content } = Layout;
	// 高阶组件传入进来的
	const { isCollapse, updateCollapse } = props;

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) updateCollapse(true);
				if (!isCollapse && screenWidth > 1200) updateCollapse(false);
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
	}, []);

	return (
		<section className="container">
			{/* 左边 */}
			<Sider trigger={null} collapsed={props.isCollapse} width={220} theme={defaultTheme}>
				<LayoutMenu></LayoutMenu>
			</Sider>
			{/* 右边 */}
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Content>
					<BreadcrumbNav />

					{/* 子组件 */}
					<Outlet></Outlet>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
};

// 将 state 状态作为 props 传入组件
const mapStateToProps = (state: any) => state.menu;
// 将 dispatch 方法作为 props 传入组件
const mapDispatchToProps = { updateCollapse };
// 高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
