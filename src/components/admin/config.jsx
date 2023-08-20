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
  {
    title: "About Section",
    path: "/admin/about",
    icon: <Icon fontSize={20} icon="mdi:about" />,
  },
  {
    title: "Videos",
    path: "/admin/video",
    icon: <Icon fontSize={20} icon="fluent:video-32-filled" />,
  },
  {
    title: "Images",
    path: "/admin/image",
    icon: <Icon fontSize={20} icon="clarity:image-solid" />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <Icon fontSize={20} icon="icon-park-solid:setting-two" />,
  },
];

export default navConfig;
