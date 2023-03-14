import { connect } from "react-redux";
import React from "react";
import "./index.less";
import { APP_CSS_NAME_PREFIX } from "@/config/config";

const LayoutFooter: React.FC = (props: any) => {
	const { themeConfig } = props;
	return (
		<>{themeConfig.footer && <div className={`${APP_CSS_NAME_PREFIX}-root-footer`}>2023 © admin By Hooks Technology.</div>}</>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
