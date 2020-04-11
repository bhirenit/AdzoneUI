import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import { adminRoutes } from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import AddProduct from "views/UserProfile/AddProduct";
import EditProfile from 'components/EditProfile';
import UserForm from "views/UserProfile/UserForm";
import Email from "components/Email";
// import { isPropertySignature } from "typescript";

let ps;

const switchRoutes = (
  <Switch>
    {/* <Route exact path="/publicity/profile/setting" component={Setting}/> */}

    {/* http://localhost:3000/publicity/report?productId=1&publicityId=1&email=chavdagunjan01@gmail.com */}
    {/* <Route path="/publicity/report/:productId&:publicityId&:email" component={Email} /> */}
    <Route path="/publicity/report" component={Email} />

    <Route path="/publicity/profile/edit" component={UserForm} />
    {adminRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={"/admin" + prop.path}
            component={prop.component}
            key={key}
            ip={prop.ip}
            port={prop.port}
          />
        );
      }

    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);


const useStyles = makeStyles(styles);

export default function Maintainer({ ...rest }) {
  //uncomment this for login

//   let userData = localStorage.getItem("userData");
//   if(userData){
//     let user = JSON.parse(userData);
//     if(user.role===1)
//       rest.history.push("/admin/dashboard");
//     else if(user.role===0)
//       console.log("right");
//     else if(user.role===2)
//       rest.history.push("/customer/dashboard")
//     else    
//       rest.history.push("/login");
// }
// else{
//   alert("login First")
//   rest.history.push("/login");
// }
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [ip, setIp] = React.useState('0');
  const [port, setPort] = React.useState("6");
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={adminRoutes}
        logoText={"ADMIN"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={adminRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )
        }
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}