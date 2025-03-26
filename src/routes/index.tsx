import { RouteProps } from "react-router-dom";
import LoginPage from "../pages/Auth/Login";
import DashBoard from "@/pages/DashBoard";
import UserManagement from "@/pages/UserManagement";
import CustomerManagement from "@/pages/CustomerManagement";
import AddNewUser from "@/pages/UserManagement/AddNewUser";
import AddNewCustomer from "@/pages/CustomerManagement/AddNewCustomer";
import ViewInvoices from "@/pages/CustomerManagement/ViewInvoices";
import PaymentHistory from "@/pages/CustomerManagement/PaymentHistory";
import InvoiceManagement from "@/pages/InvoiceManagement";
import PaymentManagement from "@/pages/PaymentManagement";
import Report from "@/pages/Report";
import AddInvoice from "@/pages/InvoiceManagement/AddInvoice";
import Settings from "@/pages/Settings";
import Payment from "@/pages/Payment";

export interface IRoute {
  path: string;
  element?: RouteProps["element"];
  name: string;
}

const authRoutes: IRoute[] = [
  {
    path: "/login",
    element: <LoginPage />,
    name: "Login",
  },
];


const privateRoutes: IRoute[] = [
  // DashBoard Routes
  {
    path: "/",
    element: <DashBoard />,
    name: "Dashboard",
  },
  // User Management Routes
  {
    path: "/user",
    element: <UserManagement  />,
    name: "User Management",
  },
  {
    path: "/user/add",
    element: <AddNewUser />,
    name: "Add New User",
  },
  {
    path: "/user/:id/:encodedItem",
    element: <AddNewUser />,
    name: "Edit User",
  },
  // Customer Management Routes
  {
    path: "/customer",
    element: <CustomerManagement />,
    name: "Customer Management",
  },
  {
    path: "/customer/add",
    element: <AddNewCustomer />,
    name: "Add New Customer",
  },
  {
    path: "/customer/:id/:encodedItem",
    element: <AddNewCustomer />,
    name: "Edit Customer",
  },
  {
    path: "/customer/invoices",
    element: <ViewInvoices />,
    name: "View Invoices",
  },
  {
    path: "/customer/payment",
    element: <PaymentHistory />,
    name: "Payment",
  },
  // Invoice Management Routes
  {
    path: "/invoice",
    element: <InvoiceManagement />,
    name: "Invoice Management",
  },
  {
    path: "/invoice/add",
    element: <AddInvoice />,
    name: "Add Invoice",
  },
  {
    path: "/invoice/edit/:id",
    element: <AddInvoice />,
    name: "Edit Invoice",
  },
  // Payment Management Routes
  {
    path: "/payment",
    element: <PaymentManagement />,
    name: "Payment Management",
  },
  // Report Routes
  {
    path: "/report",
    element: <Report />,
    name: "Report",
  },
  // Settings Routes
  {
    path: "/settings",
    element: <Settings />,
    name: "Settings",
  },
];

const publicRoutes: IRoute[] = [
  {
    path: "/payment",
    element: <Payment />,
    name: "Payment",
  },
];

export { authRoutes, privateRoutes, publicRoutes };
