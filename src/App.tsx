import React from "react";
import { ConfigProvider, theme } from "antd";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers/index";
import "moment/dist/locale/zh-cn";

const { useToken } = theme;
const App: React.FC = (props: any) => {
	const { assemblySize } = props;
	const { token } = useToken();
	// theme token
	const theme: object = { ...token };
	return (
		<HashRouter>
			<ConfigProvider
				componentSize={assemblySize}
				theme={{
					...theme
				}}
			>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
