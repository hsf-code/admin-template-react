import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";
import "./style/collapseIcon.less";

/**
 * 收起 -- 菜单栏
 * */
const CollapseIcon: React.FC = (props: any) => {
	const { isCollapse, updateCollapse } = props;
	return (
		<div className="collapsed" style={{ justifyContent: isCollapse && "center" }}>
			{isCollapse ? (
				<MenuUnfoldOutlined
					id="isCollapse"
					style={{ fontSize: 16 }}
					onClick={() => {
						updateCollapse(!isCollapse);
					}}
				/>
			) : (
				<MenuFoldOutlined
					id="isCollapse"
					style={{ fontSize: 16 }}
					onClick={() => {
						updateCollapse(!isCollapse);
					}}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
