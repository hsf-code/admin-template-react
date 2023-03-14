import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import { findAllBreadcrumb, handleRouter, searchRoute } from "@/utils/util";
import { setMenuList } from "@/redux/modules/menu/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { setAuthRouter } from "@/redux/modules/auth/action";
import { connect } from "react-redux";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import "./index.less";
import CollapseIcon from "../Header/components/CollapseIcon";
import { APP_CSS_NAME_PREFIX } from "@/config/config";

const menuData: Array<any> = [{ icon: "HomeOutlined", title: "首页", path: "/home/index" }];

// 定义 menu 类型
type MenuItem = Required<MenuProps>["items"][number];
const getItem = (
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem => {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
};

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;
const addIcon = (name: string) => {
	return React.createElement(customIcons[name]);
};

// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
	menuList.forEach((item: Menu.MenuOptions) => {
		// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
		if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
		newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
	});
	return newArr;
};

/**
 * left menu
 * */
const LayoutMenu: React.FC = (props: any) => {
	const { pathname } = useLocation();
	const { isCollapse, setBreadcrumbList, setAuthRouter, setMenuList: setMenuListAction } = props;
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
	}, [pathname]);

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);
	const initMenu = () => {
		setLoading(true);
		try {
			setMenuList(deepLoopFloat(menuData));
			// 存储处理过后的所有面包屑导航栏到 redux 中
			setBreadcrumbList(findAllBreadcrumb(menuData));
			// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
			const dynamicRouter = handleRouter(menuData);
			setAuthRouter(dynamicRouter);
			setMenuListAction(menuData);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		initMenu();
	}, []);

	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	return (
		<div className={`${APP_CSS_NAME_PREFIX}-root-menu`}>
			<div className={`${APP_CSS_NAME_PREFIX}-root-menu-list`}>
				<Spin spinning={loading} tip="Loading...">
					<Menu
						forceSubMenuRender={true}
						theme="light"
						mode="inline"
						triggerSubMenuAction="click"
						selectedKeys={selectedKeys}
						inlineCollapsed={isCollapse}
						items={menuList}
						onClick={clickMenu}
					></Menu>
				</Spin>
			</div>
			<div className="collapse-icon">
				<CollapseIcon />
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
