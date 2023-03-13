import React from "react";
import AvatarIcon from "../AvatarIcon";
import "./index.less";
/**
 * user info
 * */
const UserInfo: React.FC = (props: any) => {
	return (
		<div className="user-info">
			<div className="user-name">{props?.userName}</div>
			<AvatarIcon />
		</div>
	);
};

export default UserInfo;
