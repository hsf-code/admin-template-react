import React from "react";
import { Layout } from "antd";
import UserInfo from "./components/UserInfo";
import AdminTitle from "./components/AdminTitle/index";
// import CollapseIcon from "./components/CollapseIcon";
// import AssemblySize from "./components/AssemblySize";
// import Language from "./components/Language";
// import Theme from "./components/Theme";
// import Fullscreen from "./components/Fullscreen";
import "./index.less";

const userName: string = "himalaya";
const { Header } = Layout;

/**
 * website -- header
 * */
const LayoutHeader: React.FC = () => {
	return (
		<Header className="root-header">
			<div className="header-left">
				<AdminTitle />
			</div>
			<div className="header-right">
				{/* <AssemblySize /> */}
				{/* <Language /> */}
				{/* <Theme /> */}
				{/* <Fullscreen /> */}
				<UserInfo userName={userName} />
			</div>
		</Header>
	);
};

export default LayoutHeader;
