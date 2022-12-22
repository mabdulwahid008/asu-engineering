/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Products from "views/Products";
import AddProducts from "views/AddProducts";
import EditProduct from "views/EditProduct";
import Companies from "views/Companies";
import AddCompany from "views/AddCompany";
import EditCompany from "views/EditCompany";
import Contractors from "views/Contractors";
import AddContractor from "views/AddContractor";
import EditContractor from "views/EditContractor";
import Customers from "views/Customers";
import EditCustomers from "views/EditCustomers";
import AddCustomer from "views/AddCustomer";
import CreateInvoice from "views/CreateInvoice";
import Invoices from "views/Invoices";


var routes = [
  {
    parent: true,
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa-solid fa-warehouse",
    component: Dashboard,
    layout: "/admin"
  },
  {
    parent: true,
    path: "/create-invoice",
    name: "Create Invoice",
    icon: "nc-icon nc-paper",
    component: CreateInvoice,
    layout: "/admin"
  },
  {
    parent: true,
    path: "/invoices",
    name: "Invoice",
    icon: "nc-icon nc-paper",
    component: Invoices,
    layout: "/admin"
  },
  {
    parent: true,
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    parent: true,
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },

  {
    parent: true,
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-box-2",
    component: Products,
    layout: "/admin",
  },
  {
    parent: false,
    path: "/add-product",
    name: "Add Product",
    component: AddProducts,
    layout: "/admin",
  },
  {
    parent: false,
    path: "/edit-product",
    name: "Edit Product",
    component: EditProduct,
    layout: "/admin",
  },


  {
    parent: true,
    path: "/companies",
    name: "Companies",
    icon: "nc-icon nc-bank",
    component: Companies,
    layout: "/admin"
  },
  {
    parent: false,
    path: "/add-company",
    name: "Add Company",
    component: AddCompany,
    layout: "/admin",
  },
  {
    parent: false,
    path: "/edit-company/:id",
    name: "Edit Company",
    component: EditCompany,
    layout: "/admin",
  },

  {
    parent: true,
    path: "/contractors",
    name: "Contractors",
    icon: "nc-icon nc-single-02",
    component: Contractors,
    layout: "/admin"
  },
  {
    parent: false,
    path: "/add-contractor",
    name: "Add Contractor",
    component: AddContractor,
    layout: "/admin",
  },
  {
    parent: false,
    path: "/edit-contractor/:id",
    name: "Edit Contractor",
    component: EditContractor,
    layout: "/admin",
  },


  {
    parent: true,
    path: "/customers",
    name: "Customers",
    icon: "nc-icon nc-circle-10",
    component: Customers,
    layout: "/admin"
  },
  {
    parent: false,
    path: "/edit-customer/:id",
    name: "Edit Contractor",
    component: EditCustomers,
    layout: "/admin",
  },
  {
    parent: false,
    path: "/add-customer",
    name: "Add Customer",
    component: AddCustomer,
    layout: "/admin",
  },

  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];
export default routes;
