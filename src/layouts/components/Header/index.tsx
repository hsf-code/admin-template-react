import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
// import CollapseIcon from "./components/CollapseIcon";
// import AssemblySize from "./components/AssemblySize";
// import Language from "./components/Language";
// import Theme from "./components/Theme";
// import Fullscreen from "./components/Fullscreen";
import "./index.less";

const LayoutHeader = () => {
	const { Header } = Layout;
	const userName: string = "test-1";

	return (
		<Header>
			<div className="header-lf">{/* <CollapseIcon /> */}</div>
			<div className="header-ri">
				{/* <AssemblySize /> */}
				{/* <Language /> */}
				{/* <Theme /> */}
				{/* <Fullscreen /> */}
				<span className="username">{userName}</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
