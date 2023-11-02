import React, { useState } from "react";
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  ClickAwayListener,
  Snackbar,
  MenuList,
  Alert,
  Select,
  Option,
  Paper,
  Chip,
  Badge,
  FormControl,
  Autocomplete,
  MenuItem,
  Modal,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import styled from "@emotion/styled";
// components
import Iconify from "@/hooks/iconify";
import { UserListToolbar } from "../../user/index";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import db from "@/firebase/firestore";

import Scrollbar from "../../scrollbar/Scrollbar";
import VideoCard from "./VideoCard";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function VideoUpload() {
  // for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const folderRef = await getDocs(
        collection(db, "/Data/Portfolio", "folders")
      );
      const temp = folderRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategory(temp);
    };
    const fetchdata = async () => {
      const videoRef = collection(db, "/Data/Portfolio/video");
      const q = query(videoRef);
      const querySnapshot = await getDocs(q);
      const temp = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(temp);
    };
    fetchdata();
    fetchCategory();
  }, []);

  // for video input
  const [videos, setVideos] = useState([]);
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Video Section
          </Typography>

          <Box>
            <Button
              component="label"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              sx={{ mr: 2 }}
            >
              Single upload
              <input type="file" multiple accept="video/*" hidden />
            </Button>
            <Button
              component="label"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpen}
            >
              Bulk upload
            </Button>
          </Box>
        </Stack>
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
            px={2}
          >
            <UserListToolbar
              px={0}
              numSelected={0}
              filtertitle={""}
              onFiltertitle={() => {}}
              placeholder="Search Video..."
            />

            <Button
              component="label"
              variant="contained"
              startIcon={<Iconify icon="ion:filter" />}
            >
              Filter
            </Button>
          </Stack>
          <Scrollbar
            sx={{
              m: 2,
              px: 2,
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", minHeight: 829 }}>
              <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
                {data.length > 0 &&
                  data.map((item, index) => (
                    <VideoCard
                      option={{ item: item, key: index }}
                      key={item.id}
                    />
                  ))}
              </Masonry>
            </Box>
          </Scrollbar>
        </Card>
      </Container>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setVideos([]);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ width: "100%" }}
          >
            <Autocomplete
              freeSolo
              sx={{
                width: "100%",
              }}
              disableClearable
              options={category.map((option) => option.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Category"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />

            <Button
              component="label"
              variant="contained"
              sx={{ width: "100%", p: 2 }}
              endIcon={
                <Badge badgeContent={videos?.length} color="success">
                  <Iconify icon="ant-design:select-outlined" />
                </Badge>
              }
            >
              Select files
              <VisuallyHiddenInput
                type="file"
                accept="video/*"
                multiple
                onChange={(ev) => {
                  let temp = [];
                  if (ev.target.files.length > 0) {
                    Array.from(ev.target.files).forEach((file) => {
                      temp.push(file);
                    });
                    setVideos(temp);
                  }
                }}
              />
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", p: 2 }}
              startIcon={<Iconify icon="iconamoon:cloud-upload" />}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
