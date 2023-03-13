import { connect } from "react-redux";
import React from "react";
import "./index.less";

const LayoutFooter: React.FC = (props: any) => {
	const { themeConfig } = props;
	return <>{themeConfig.footer && <div className="footer">2023 © admin By Hooks Technology.</div>}</>;
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
