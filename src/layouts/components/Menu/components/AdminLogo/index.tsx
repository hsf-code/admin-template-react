import logo from "@/assets/images/logo.png";
import { connect } from "react-redux";

const AdminLogo = (props: any) => {
	const { isCollapse } = props;
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h4 className="logo-text">后台管理</h4> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(AdminLogo);
