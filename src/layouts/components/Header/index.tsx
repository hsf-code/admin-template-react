import React from "react";
import { Layout } from "antd";
import UserInfo from "./components/UserInfo";
import AdminTitle from "./components/AdminTitle/index";
import "./index.less";
import { APP_CSS_NAME_PREFIX } from "@/config/config";

const userName: string = "himalaya";
const { Header } = Layout;

/**
 * website -- header
 * */
const LayoutHeader: React.FC = () => {
	return (
		<Header className={`${APP_CSS_NAME_PREFIX}-root-header`}>
			<div className={`${APP_CSS_NAME_PREFIX}-root-header-left`}>
				<AdminTitle />
			</div>
			<div className={`${APP_CSS_NAME_PREFIX}-root-header-right`}>
				<UserInfo userName={userName} />
			</div>
		</Header>
	);
};

export default LayoutHeader;
