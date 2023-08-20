import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const Image = styled("img")({
  width: "100%",
});
export default function Loading() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export function SkeletonHero() {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ margin: 1 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
    </div>
  );
}

export const SkeletonOne = () => {
  return (
    <Box
      sx={{
        bgcolor: "#121212",
        p: 8,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
};

