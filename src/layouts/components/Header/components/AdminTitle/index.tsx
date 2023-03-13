import React from "react";
import logo from "@/assets/images/logo.png";
import { connect } from "react-redux";
import "./index.less";

/**
 * admin title 展示区
 * */
const AdminTitle: React.FC = (props: any) => {
	const { isCollapse } = props;
	return (
		<div className="title-content" style={{ marginLeft: !isCollapse ? 0 : 4 }}>
			<div className="logo">
				<img src={logo} />
			</div>
			{!isCollapse ? <div className="title">后台管理</div> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(AdminTitle);
