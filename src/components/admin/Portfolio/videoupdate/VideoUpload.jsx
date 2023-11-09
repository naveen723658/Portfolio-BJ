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
  Dropdown,
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
  Backdrop,
  CircularProgress,
  Autocomplete,
  MenuItem,
  Modal,
  Menu,
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
import dayjs from "dayjs";
import Scrollbar from "../../scrollbar/Scrollbar";
import VideoCard from "./VideoCard";
import { processAndUpload, processAndDelete } from "@/hooks/Firebase/Index";
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
  //

  // for data category list
  const [category, setCategory] = useState([]);
  //

  // for data list
  const [data, setData] = useState([]);

  // for loading
  const [Loading, setLoading] = React.useState(false);

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
      const q = query(videoRef, orderBy("Date", "desc"));
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

  // for new data or video
  const [videos, setVideos] = useState([]);

  // for storing selected category
  const [selected, setselected] = useState();

  // for storing message
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // for filter
  const [anchorEl, setAnchorEl] = useState(null);
  const filteropen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlefilterClose = () => {
    setAnchorEl(null);
  };

  // for deleting data
  const [selectedData, setSelectedData] = useState(null);
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
              aria-controls={filteropen ? "long-menu" : undefined}
              aria-expanded={filteropen ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              Filter
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={filteropen}
              onClose={handlefilterClose}
              PaperProps={{
                style: {
                  maxHeight: 60 * 4.5,
                  width: "auto",
                },
              }}
            >
              {category.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option.value}
                </MenuItem>
              ))}
            </Menu>
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
                      option={{
                        item: item,
                        key: index,
                        setSelectedData: setSelectedData,
                      }}
                      key={item.id}
                    />
                  ))}
              </Masonry>
            </Box>
          </Scrollbar>
        </Card>
      </Container>

      <Snackbar
        open={snackbarStatus.open}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarStatus((prev) => ({ ...prev, open: false }));
        }}
      >
        <Alert
          onClose={() => {
            setSnackbarStatus((prev) => ({ ...prev, open: false }));
          }}
          severity={snackbarStatus.severity}
          sx={{ width: "100%" }}
        >
          {snackbarStatus.message}
        </Alert>
      </Snackbar>
      <Backdrop sx={{ color: "#fff", zIndex: "9999" }} open={Loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* edit modal */}
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
              id="free-solo-2-demo"
              sx={{
                width: "100%",
              }}
              disableClearable
              onInputChange={(e, value) => {
                setselected(value);
              }}
              options={
                category.length > 0
                  ? category.map((option) => option.value)
                  : []
              }
              renderOption={(prop, option) => {
                return (
                  <li {...prop} key={`${option}`}>
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Seasons"
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
                <Badge badgeContent={videos.length} color="success">
                  <Iconify icon="ant-design:select-outlined" />
                </Badge>
              }
            >
              Select files
              <VisuallyHiddenInput
                type="file"
                accept="video/*"
                multiple
                onChange={async (ev) => {
                  let temp = [];
                  try {
                    if (ev.target.files.length > 0) {
                      setLoading(true);
                      await Promise.all(
                        Array.from(ev.target.files).map(async (file) => {
                          const fileUrl = URL.createObjectURL(file);
                          const posterDetail =
                            await generateVideoThumbnailViaUrl(fileUrl);
                          temp.push({
                            Date: dayjs().toDate(),
                            category: selected,
                            videoTitle: file.name,
                            thumbnailUrl: posterDetail?.thumbnailUrl,
                            videoUrl: fileUrl,
                            videoDescription: "",
                            hero: false,
                            LoopVideo: false,
                            contributor: [
                              {
                                title: "",
                                name: "",
                                link: "",
                              },
                            ],
                            width: posterDetail?.width,
                            height: posterDetail?.height,
                            aspectRatio: posterDetail?.aspectRatio,
                          });
                        })
                      );
                      setVideos(temp);
                      setLoading(false);
                    }
                  } catch (error) {
                    setLoading(false);
                    console.log(error);
                  }
                }}
              />
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", p: 2 }}
              startIcon={<Iconify icon="iconamoon:cloud-upload" />}
              onClick={async (e) => {
                e.preventDefault();
                if (videos.length <= 0) {
                  return;
                }
                setLoading(true);
                let temp = [];
                try {
                  await Promise.all(
                    Array.from(videos).map(async (file) => {
                      const { processedObj, newID } = await processAndUpload(
                        file,
                        `${file.category}`,
                        `/Data/Portfolio/video`,
                        "new",
                        setSnackbarStatus
                      );

                      temp.push({
                        ...processedObj,
                        id: newID,
                      });
                    })
                  );

                  // Updating state with previous data and new data
                  setData((prevData) => [...temp, ...prevData]);

                  setSnackbarStatus({
                    open: true,
                    message: "Videos uploaded successfully",
                    severity: "success",
                  });

                  setLoading(false);
                  handleClose();
                } catch (error) {
                  setLoading(false);
                  handleClose();
                  setSnackbarStatus({
                    open: true,
                    message: "Something went wrong!",
                    severity: "error",
                  });
                  console.log(error);
                }
              }}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* delete modal */}
      <Modal
        keepMounted
        open={selectedData ? true : false}
        onClose={() => {
          setSelectedData(null);
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this video?
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%" }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedData(null);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{ width: "100%" }}
              onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await processAndDelete(
                    `/Data/Portfolio/video`,
                    selectedData,
                    setSnackbarStatus
                  );
                  setData(data.filter((item) => item.id !== selectedData));
                  setSelectedData(null);
                  setLoading(false);
                } catch (error) {
                  console.log(error.message);
                  setSelectedData(null);
                  setLoading(false);
                  setSnackbarStatus({
                    open: true,
                    message: "Something went wrong!",
                    severity: "error",
                  });
                }
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
