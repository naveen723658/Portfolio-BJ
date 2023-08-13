// component
import Icon from "@/hooks/iconify";

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <Icon fontSize={20} icon="material-symbols:dashboard-outline" />,
  },
  {
    title: "Hero Section",
    path: "/admin/hero",
    icon: <Icon fontSize={20} icon="ph:chalkboard-teacher-fill" />,
  },
];

export default navConfig;
