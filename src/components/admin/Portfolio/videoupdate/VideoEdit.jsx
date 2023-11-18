"use client";
import {
  Box,
  Button,
  Table,
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Divider,
  Snackbar,
  Alert,
  ListItem,
  List,
  IconButton,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Autocomplete,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import Label from "../../label/Label";
import { useEffect } from "react";
import { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Iconify from "@/hooks/iconify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import db from "@/firebase/firestore";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { generateVideoThumbnailViaUrl } from "@/hooks/videometa/VideoMeta";
import { processAndUpload, processAndDelete } from "@/hooks/Firebase/Index";
import Link from "next/link";
import { UploadFile, uploadData } from "@/hooks/Firebase/Index";

import { styled } from "@mui/material/styles";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CustomDatePicker({ date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        className="notranslate"
        inputFormat="MM/DD/YYYY"
        value={dayjs(date)}
        onChange={(ev) => setDate(ev)}
        renderInput={(params) => (
          <TextField
            sx={{ width: "max-content" }}
            {...params}
            fullWidth={true}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const [Loading, setLoading] = React.useState(false);

  const [category, setCategory] = useState([]);
  const [selected, setselected] = useState();
  const [data, setData] = useState({
    Date: dayjs().toDate(),
    category: "",
    videoTitle: "",
    videoDescription: "",
    thumbnailUrl: "",
    videoUrl: "",
    hero: false,
    LoopVideo: false,
    contributor: [
      {
        title: "",
        name: "",
        link: "",
      },
    ],
    width: 0,
    height: 0,
    aspectRatio: "",
  });

  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // category
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

    // data
    const fetchdata = async () => {
      const videoRef = doc(
        collection(doc(db, "/Data/Portfolio/"), "video"),
        id
      );
      getDoc(videoRef)
        .then((doc) => {
          const firebaseData = doc.data();
          if (firebaseData) {
            setData({
              ...firebaseData,
              contributor: firebaseData.contributor
                ? firebaseData.contributor
                : [{ title: "", name: "", link: "" }],
              Date: firebaseData.Date
                ? firebaseData.Date.toDate()
                : dayjs().toDate(),
              videoDescription: firebaseData.videoDescription
                ? firebaseData.videoDescription
                : "",
              LoopVideo: firebaseData.LoopVideo
                ? firebaseData.LoopVideo
                : false,
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    if (id && id !== "new") {
      fetchdata();
    }

    fetchCategory();
  }, [id]);

  return (
    <div>
      {data && (
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Edit Video
            </Typography>
            <Divider
              sx={{ width: "100%", mt: 1, mb: 2, listStyle: "none" }}
              component="li"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 2,
                width: "100%",
              }}
            >
              <Table sx={{ flexGrow: 1 }}>
                <TableBody
                  sx={{
                    "& > tr > td:first-of-type": {
                      fontWeight: "bold",
                    },

                    "& > tr > td:nth-of-type(2)>.form-border": {
                      whiteSpace: "pre-wrap",
                      border: "1px solid #c6c9cc",
                      padding: 2,
                      borderRadius: 1,
                      minWidth: 400,
                      maxWidth: "60%",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          gap: 2,
                          width: "max-content",
                        }}
                      >
                        <CustomDatePicker
                          date={data.Date}
                          setDate={(ev) =>
                            setData({ ...data, Date: dayjs(ev).toDate() })
                          }
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Video Title</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="Herotitle"
                        value={data.videoTitle}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            videoTitle: e.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Select Category</Typography>
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        sx={{
                          width: "100%",
                        }}
                        disabled={data.category ? true : false}
                        disableClearable
                        value={data.category}
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
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Video Description</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="videoDescription"
                        value={data.videoDescription && data.videoDescription}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            videoDescription: e.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Contributors:</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <List
                        id="contributor"
                        sx={{ listStyle: "none", padding: 0, margin: 0 }}
                      >
                        {data.contributor &&
                          data.contributor.map((item, index) => {
                            return (
                              <ListItem
                                key={index}
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <IconButton
                                  onClick={() => {
                                    setData((prev) => ({
                                      ...prev,
                                      contributor: prev.contributor.filter(
                                        (_, ind) => ind !== index
                                      ),
                                    }));
                                  }}
                                >
                                  <Iconify
                                    icon={
                                      "material-symbols:delete-outline-sharp"
                                    }
                                  />
                                </IconButton>
                                <TextField
                                  value={item.title}
                                  placeholder="Role/Title"
                                  onChange={(e) => {
                                    const updatedContributor = [
                                      ...data.contributor,
                                    ];
                                    updatedContributor[index].title =
                                      e.target.value;
                                    setData((prev) => ({
                                      ...prev,
                                      contributor: updatedContributor,
                                    }));
                                  }}
                                  fullWidth
                                />
                                <TextField
                                  value={item.name}
                                  placeholder="Name"
                                  onChange={(e) => {
                                    const updatedContributor = [
                                      ...data.contributor,
                                    ];
                                    updatedContributor[index].name =
                                      e.target.value;
                                    setData((prev) => ({
                                      ...prev,
                                      contributor: updatedContributor,
                                    }));
                                  }}
                                  fullWidth
                                />
                                <TextField
                                  value={item.link}
                                  placeholder="Social media Link"
                                  onChange={(e) => {
                                    const updatedContributor = [
                                      ...data.contributor,
                                    ];
                                    updatedContributor[index].link =
                                      e.target.value;
                                    setData((prev) => ({
                                      ...prev,
                                      contributor: updatedContributor,
                                    }));
                                  }}
                                  fullWidth
                                />
                              </ListItem>
                            );
                          })}
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <IconButton
                            sx={{}}
                            onClick={() => {
                              setData((prev) => ({
                                ...prev,
                                contributor: [
                                  ...prev.contributor,
                                  { title: "", name: "", link: "" },
                                ],
                              }));
                            }}
                          >
                            <Iconify
                              icon={"material-symbols:add-circle-outline-sharp"}
                            />
                          </IconButton>
                        </ListItem>
                      </List>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Hero</Typography>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            checked={data.hero == true}
                            onChange={() =>
                              setData((prev) => ({ ...prev, hero: true }))
                            }
                            value={true}
                            control={<Radio />}
                            label={<Label color="success">Yes</Label>}
                          />
                          <FormControlLabel
                            checked={data.hero == false}
                            onChange={() =>
                              setData((prev) => ({ ...prev, hero: false }))
                            }
                            value={false}
                            control={<Radio />}
                            label={<Label color="error">No</Label>}
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Loop Video</Typography>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            checked={data.LoopVideo == true}
                            onChange={() =>
                              setData((prev) => ({ ...prev, LoopVideo: true }))
                            }
                            value={true}
                            control={<Radio />}
                            label={<Label color="success">Yes</Label>}
                          />
                          <FormControlLabel
                            checked={data.LoopVideo == false}
                            onChange={() =>
                              setData((prev) => ({ ...prev, LoopVideo: false }))
                            }
                            value={false}
                            control={<Radio />}
                            label={<Label color="error">No</Label>}
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Box sx={{ marginRight: "10%" }}>
                {data.thumbnailUrl?.length > 0 ? (
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={data.thumbnailUrl}
                      alt="error"
                      style={{
                        width: 400,
                        objectFit: "contain",
                        objectPosition: "top",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={400}
                      height={400}
                    ></Skeleton>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      <Typography variant="h6" color="white">
                        No Thumbnail
                      </Typography>
                      <Iconify
                        icon="material-symbols:hide-image-sharp"
                        color="white"
                        sx={{ height: 100, width: 100 }}
                      />
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    sx={{
                      width: "min-content",
                      height: "min-content",
                      p: 2,
                      fontSize: "1rem",
                      textTransform: "lowercase",
                      whiteSpace: "nowrap",
                    }}
                    component="label"
                    disabled={data.videoUrl?.length > 0 ? false : true}
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="eva:upload-outline" />}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        if (
                          data.thumbnailUrl &&
                          data.thumbnailUrl.startsWith("blob")
                        ) {
                          URL.revokeObjectURL(data.thumbnailUrl);
                        }
                        setData((prev) => ({
                          ...prev,
                          thumbnailUrl: URL.createObjectURL(file),
                        }));
                      }
                    }}
                  >
                    Thumbnail
                    <VisuallyHiddenInput type="file" accept="image/*" />
                  </Button>
                  <Button
                    sx={{
                      width: "min-content",
                      height: "min-content",
                      p: 2,
                      fontSize: "1rem",
                      textTransform: "lowercase",
                      whiteSpace: "nowrap",
                    }}
                    component="label"
                    variant="contained"
                    startIcon={<Iconify icon="octicon:upload-16" />}
                    onChange={async (event) => {
                      const file = event.target.files[0];
                      if (file) {
                        if (data.videoUrl && data.videoUrl.startsWith("blob")) {
                          URL.revokeObjectURL(data.thumbnailUrl);
                          URL.revokeObjectURL(data.videoUrl);
                        }
                        const fileurl = URL.createObjectURL(file);
                        const posterDetail = await generateVideoThumbnailViaUrl(
                          fileurl
                        );
                        setData((prev) => ({
                          ...prev,
                          videoTitle: file.name,
                          thumbnailUrl: posterDetail?.thumbnailUrl,
                          videoUrl: fileurl,
                          width: posterDetail?.width,
                          height: posterDetail?.height,
                          aspectRatio: posterDetail?.aspectRatio,
                        }));
                      }
                    }}
                  >
                    Video file
                    <VisuallyHiddenInput type="file" accept="video/*" />
                  </Button>
                </Box>
              </Box>
            </Box>
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 2,
                mt: 2,
              }}
            >
              <Link href="/admin/video" style={{ textDecoration: "none" }}>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Cancel
                </Button>
              </Link>
              <Button
                className="btn-icon"
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={async (e) => {
                  e.preventDefault();
                  console.log(id);
                  if (
                    data.videoUrl.length <= 0 &&
                    data.category.length <= 0 &&
                    data.videoTitle.length <= 0
                  ) {
                    return;
                  }
                  setLoading(true);
                  try {
                    const { processedObj, newID } = await processAndUpload(
                      data,
                      `${data.category}`,
                      `/Data/Portfolio/video`,
                      id,
                      setSnackbarStatus
                    );
                    setLoading(false);
                    router.push(`/admin/video/edit/${newID}`);
                  } catch (error) {
                    setLoading(false);
                    setSnackbarStatus({
                      open: true,
                      message: "Something went wrong!",
                      severity: "error",
                    });
                    console.log(error);
                  }
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}
