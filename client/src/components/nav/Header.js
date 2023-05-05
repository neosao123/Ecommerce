import React, { useEffect } from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MailOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Menu, Row } from "antd";
import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { json, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { setLogLevel } from "firebase/app";
import Home from "../../Pages/Home";
import Search from "../forms/Search";

const HomePage = [
  {
    label: "Home",
    key: "app",
    icon: <AppstoreOutlined />,
    navigate: "/",
  },
  {
    label: "Shop",
    key: "shop",
    icon: <ShopOutlined/>,
    navigate: "/shop",
  },
];

const UserLog = [
  {
    label: "Register",
    key: "register",
    icon: <UserAddOutlined />,
    navigate: "/register",
  },
  {
    label: "Login",
    key: "login",
    icon: <UserOutlined />,
    navigate: "/login",
  },
];

const Header = () => {
  const [current, setCurrent] = useState("homes");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState(false);

  // Change Name of Login User
  const [label1, setLabel] = useState("Logout");
  const { user } = useSelector((state) => ({ ...state }));

  const ShowLogout = [
    {
      label: label1,
      key: "logout",
      icon: <LogoutOutlined />,
      navigate: "/logout",
    },
  ];
  const Dashboard = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <UserAddOutlined />,
      navigate: "/",
    },
  ];
  // const newLabel = ShowLogout.map((item) => ({ label: item.label }));
  // console.log("showlogout new label: ", newLabel[0].label);

  useEffect(() => {
    setLabel(user?.name);
  }, [user?.name]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClick = (e) => {
    const key = e.key;
    console.log(key);
    const menuItem = HomePage.filter((item) => item.key === key);
    console.log("menuItem",menuItem)
    if (menuItem.length > 0) {
      const selMenu = menuItem[0];
      console.log("selMenu.navigate",selMenu.navigate);
      navigate(selMenu.navigate);
      setCurrent(key);
    }
    const menuItem2 = UserLog.filter((item) => item.key === key);
    console.log("menuItem2", menuItem2)
    if (menuItem2.length > 0) {
      const selMenu2 = menuItem2[0];
      console.log("selMenu2.navigate",selMenu2.navigate);
      navigate(selMenu2.navigate);
      setCurrent(key);
    }
    const menuItem3 = ShowLogout.filter((item) => item.key === key);
    if (menuItem3.length > 0) {
      const selMenu3 = menuItem3[0];
      // console.log(selMenu2.navigate);
      navigate(selMenu3.navigate);
      setCurrent(key);
    }
    const menuItem4 = Dashboard.filter((item) => item.key === key);
    if (menuItem4.length > 0) {
      const selMenu4 = menuItem4[0];
      // console.log(selMenu2.navigate);
      if (user && user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("user/history");
      }
      setCurrent(key);
    }
  };

  return (
    <>
      <div className="desktopheard">
        <Row className="main-title-header border-bottom">
          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
          >
            <div>
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={HomePage}
              />
              <Search />
            </div>
          </Col>

          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
          >
            <div className="header-login_register-menu">
              {user ? (
                <>
                  <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={ShowLogout}
                    label={ShowLogout.label}
                  />

                  <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={Dashboard}
                    className="border-bottom-none"
                  />
                </>
              ) : (
                <>
                  <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={UserLog}
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="mobileVisible">
        <div className="mobilehead-main">
          <div className="logo-mobile"></div>
          <Button type="" className="mobilehead-right" onClick={showDrawer}>
            <FontAwesomeIcon
              icon={faBars}
              className={bgColor ? "bar-icon-scroll" : "bar-icon"}
            />
          </Button>
        </div>
        <Drawer placement="right" onClose={onClose} open={open}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="vertical"
            items={HomePage}
          />
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="vertical"
            items={ShowLogout}
          />
        </Drawer>

        <hr />
      </div>
    </>
  );
};

export default Header;
