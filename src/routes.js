/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket"
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import UserForm from "views/UserProfile/UserForm.js";
import MyTableAdzone from "views/UserProfile/MyTableAdzone.js";
import NewMap from "views/UserProfile/NewMap.js";
import Graph from "views/UserProfile/Graph.js";
import AddProduct from "views/UserProfile/AddProduct.js";
import ViewProductCard from "views/UserProfile/ViewProductCard";
import ViewProductCardDetails from "product/ViewProductCardDetails"
import MapView from "publicity/map/MapView"
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Email from "components/Email";
import ViewProductDetails from "product/ViewProductDetails";
import AdzoneCart from "customer/AdzoneCart";
import AdminViewProductCard from "Admin/AdminViewProductCard.js";
import AdminAdzoneCard from "Admin/AdminAdzoneCard.js";
import Admin from "layouts/Admin";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AdminViewProductCard,
    layout: "/admin"
  },
  {
    path: "/verify-publicity",
    name: "My Product",
    rtlName: "لوحة القيادة",
    icon: "add_to_photos",
    component: MyTableAdzone,
    layout: "/admin"
  }, 
  {
    path: "/verify-product",
    name: "My Product",
    rtlName: "لوحة القيادة",
    icon: "add_to_photos",
    component: MyTableAdzone,
    layout: "/admin"
  }, 
]

export const customerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: MyTableAdzone,
    layout: "/customer"
  }, {
    path: "/product",
    name: "My Product",
    rtlName: "لوحة القيادة",
    icon: "add_to_photos",
    component: MyTableAdzone,
    layout: "/customer"
  }, {
    path: "/view-product",
    name: "View Product",
    rtlName: "لوحة القيادة",
    icon: "content_paste",
    component: MyTableAdzone,
    layout: "/customer"
  }, {
    path: "/map",
    name: "Map",
    rtlName: "لوحة القيادة",
    icon: LocationOn,
    component: MyTableAdzone,
    layout: "/customer"
  }, {
    path: "/notification",
    name: "Notification",
    rtlName: "لوحة القيادة",
    icon: Notifications,
    component: MyTableAdzone,
    layout: "/customer"
  },
  {
    path: "/cart",
    name: "Cart",
    rtlName: "rtl",
    icon: ShoppingBasket,
    component: AdzoneCart,
    layout: "/customer"
  }]

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: MyTableAdzone,
    layout: "/publicity"
  },
  {
    path: "/addproduct",
    name: "Add Product",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "add_to_photos",
    // component: UserProfile,
    component: AddProduct,
    // component: UserForm,
    layout: "/publicity"
  },
  {
    path: "/viewproduct",
    name: "View Product",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: MyTableAdzone,
    // component: ViewProduct,
    layout: "/publicity"
  },
  {
    path: "/card-view-product",
    name: "Your Products",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ViewProductCard,
    // component: ViewProduct,
    layout: "/publicity"
  },
  // {
  //   path: "/view-product-details",
  //   name: "View Product Details",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: ViewProductDetails,
  //   layout: "/publicity"
  // },
  // {
  //   path: "/report",
  //   name: "Report",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   // component: Typography,
  //   component: NotificationsPage,
  //   layout: "/publicity"
  // },
  {
    path: "/email",
    name: "Email",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Email,
    layout: "/publicity"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/publicity"
  },
  {
    path: "/report1",
    name: "Report",
    rtlName: "إخطارات",
    icon: Notifications,
    component: Graph,
    layout: "/publicity"
  },
  
  // {
  //   path: "/map-view",
  //   name: "Map View",
  //   rtlName: "قائمة الجدول",
  //   icon: LocationOn,
  //   component: MapView,
  //   // component: ViewProduct,
  //   layout: "/publicity"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
