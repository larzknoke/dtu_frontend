/* eslint-disable no-nested-ternary */
/* --------------------------------------------------------
 * Author Trần Đức Tiến
 * Email tientran0019@gmail.com
 * Phone 0972970075
 *
 * Created: 2020-03-01 17:38:42
 *------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

import { Layout, BackTop, Input } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	SearchOutlined,
	PlusOutlined,
} from "@ant-design/icons";

import Sidebar from "src/components/Layout/Sidebar";
import Header from "src/components/Layout/Header";
import Footer from "src/components/Layout/Footer";
import AvatarDropDown from "src/components/AvatarDropDown";
import Notifications from "src/components/Notifications";

import CookieAlert from "src/components/CookieAlert";

import classes from "./style.module.less";
import NewDonation from "src/components/NewDonation";

const { Content, Sider } = Layout;
const { Search } = Input;

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};

const MainLayout = (props) => {
	const { children } = props;

	const [collapsed, setCollapsed] = useState(true);
	const [mobiShow, setMobiShow] = useState(false);
	const [broken, setBroken] = useState(false);

	useEffect(() => {
		const handleRouteChange = (url) => {
			setMobiShow(false);
		};

		Router.events.on("routeChangeStart", handleRouteChange);
		return () => {
			Router.events.off("routeChangeStart", handleRouteChange);
		};
	}, []);

	const handleToggle = () => {
		if (broken) {
			setMobiShow(!mobiShow);
		} else {
			setCollapsed(!collapsed);
		}
	};

	return (
		<>
			<Layout
				style={{
					minHeight: "100vh",
				}}
				className={classes.root}
			>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed && !broken}
					className={classes.sidebar}
					breakpoint="lg"
					onBreakpoint={(val) => {
						setBroken(val);
						if (val) {
							setCollapsed(false);
							setMobiShow(false);
						}
					}}
					style={{
						left: broken && !mobiShow ? -200 : 0,
					}}
				>
					<Link href="/">
						<a>
							<div className={classes.logo}>
								<Image
									src="/images/ukraine_logo.svg"
									alt="Logo"
									width={35}
									height={35}
								/>
								{!collapsed && <span>DTU</span>}
							</div>
						</a>
					</Link>
					<Sidebar />
				</Sider>
				<Layout
					className={classes.siteLayout}
					style={{
						paddingLeft: broken ? 0 : collapsed ? 50 : 200,
					}}
				>
					<Header
						style={{
							left: broken ? 0 : collapsed ? 50 : 200,
						}}
					>
						{React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: classes.trigger,
								onClick: handleToggle,
							}
						)}
						<div className="search-wrapper-head">
							<Search
								placeholder="Search..."
								allowClear
								size="large"
								id="search-box"
								// onSearch={onSearch}
								// prefix={<SearchOutlined />}
							/>
						</div>
						{broken && (
							<Link href="/">
								<a>
									<div className={classes.logoCenter}>
										<Image
											src="/images/ukraine_logo.svg"
											alt="Logo"
											width={35}
											height={35}
										/>
										<span>DTU</span>
									</div>
								</a>
							</Link>
						)}
						<div className={classes.headerRight}>
							<NewDonation />
							<Notifications />
							<AvatarDropDown />
						</div>
					</Header>
					{mobiShow && broken && (
						<div
							className={classes.overlay}
							onClick={() => setMobiShow(false)}
						/>
					)}
					<Content
						style={{
							margin: 20,
						}}
					>
						<div className="search-wrapper-content">
							<Search
								placeholder="Search..."
								allowClear
								size="large"
								id="search-box"
								// onSearch={onSearch}
								// prefix={<SearchOutlined />}
							/>
						</div>
						{children}
					</Content>
					<Footer />
				</Layout>
			</Layout>
			<BackTop />
			<CookieAlert />
		</>
	);
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
