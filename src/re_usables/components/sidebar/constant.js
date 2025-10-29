import {
  FiHome,
  FiBox,
  FiFileText,
  FiSettings,
  FiActivity,
  FiUsers,
} from "react-icons/fi";

export const sidebarMenus = [
  { label: "Dashboard", link: "/go", name: "dashboard", icon: <FiHome /> },
  {
    label: "Products",
    link: "/go/products",
    name: "products",
    icon: <FiBox />,
  },
  { label: "Bills", link: "/go/bills", name: "bills", icon: <FiFileText /> },
  {
    label: "Customers",
    link: "/go/customers",
    name: "customers",
    icon: <FiUsers />, // 👈 better icon for customers
  },
  // {
  //   label: "System Logs",
  //   link: "/go/system_logs",
  //   name: "system_logs",
  //   icon: <FiActivity />,
  // },
  // {
  //   label: "Settings",
  //   link: "/go/settings",
  //   name: "settings",
  //   icon: <FiSettings />,
  // },
];
