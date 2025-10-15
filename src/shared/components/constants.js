import {
  FiHome,
  FiBox,
  FiFileText,
  FiSettings,
  FiActivity,
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
    label: "System Logs",
    link: "/go/system_logs",
    name: "system_logs",
    icon: <FiActivity />,
  },
  {
    label: "Settings",
    link: "/go/settings",
    name: "settings",
    icon: <FiSettings />,
  },
];

export const links = {
  landingPage: "/",
  settings: "/go/settings",
};

export const units = [
  {
    engLabel: "pcs",
    hiLabel: "पीस",
  },
  {
    engLabel: "dozen",
    hiLabel: "दर्जन",
  },
  {
    engLabel: "kg",
    hiLabel: "किलो",
  },
  {
    engLabel: "patta",
    hiLabel: "पत्ता",
  },
  {
    engLabel: "box",
    hiLabel: "बॉक्स",
  },
  {
    engLabel: "bundle",
    hiLabel: "बंडल",
  },
  {
    engLabel: "jar",
    hiLabel: "जार",
  },
  {
    engLabel: "peti",
    hiLabel: "पेटी",
  },
];
