import Iconify from "@/hooks/iconify/Iconify";
import { Box, Drawer, Link, Typography, Avatar } from "@mui/material";
import useResponsive from "@/hooks/mediaquery/useResponsive";
import React, { useEffect, useState } from "react";
import account from "./_mock/account";
import Scrollbar from "./scrollbar";
import navConfig from "./config";
import { styled, alpha } from "@mui/material/styles";
import NavSection from "./nav-section";
const NAV_WIDTH = 280;
const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
const Sidebar = ({ openNav, onCloseNav }) => {
  const isDesktop = useResponsive("up", "lg");

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Link underline="none" href="/">
          {/* <img src="/images/vips_full_logo.png" /> */}
          Brijesh <span>Gupta</span>
        </Link>
        {/* <Logo /> */}
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      {navConfig && <NavSection data={navConfig} />}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};
export default Sidebar;
