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
} from "@mui/material";
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
import { useRouter } from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  generateVideoThumbnails,
  generateVideoThumbnailViaUrl,
} from "@/hooks/videometa/VideoMeta";
import Link from "next/link";
import { UploadFile, uploadData } from "@/hooks/Firebase/Index";

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

  const [loading, setLoading] = useState({
    status: false,
  });

  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    console.log(data);
  }, [data]);
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
                        sx={{
                          width: "100%",
                        }}
                        disableClearable
                        value={data.category && data.category}
                        options={category.map((option) => option.value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select Category"
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                category: e.target.value,
                              }))
                            }
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
                                  placeholder="Link"
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
                    {/* {data.videoUrl.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <Box
                          component={"span"}
                          sx={{
                            cursor: "pointer",
                            color: "#ffff",
                            padding: "1rem",
                            border: "1px solid #ffff",
                            borderRadius: "50%",
                          }}
                        >
                          <Iconify icon="mingcute:play-fill" />
                        </Box>
                      </Box>
                    )} */}
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
                    component="submit"
                    variant="contained"
                    sx={{ color: "white", mt: 2 }}
                    startIcon={<Iconify icon="eva:upload-outline" />}
                    onClick={async () => {
                      const videometa = await generateVideoThumbnailViaUrl(
                        data.videoUrl,
                        5
                      );

                      //   const file = event.target.files[0];
                      setData((prev) => ({
                        ...prev,
                        aspectRatio: videometa.aspectRatio,
                        height: videometa.height,
                        width: videometa.width,
                        thumbnailUrl: videometa.thumbnailUrl,
                      }));
                    }}
                  >
                    Thumbnail
                    {/* <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      name="upload"
                      id="upload"
                    /> */}
                  </Button>

                  <a href={data.videoUrl}>video</a>
                  {/* <Button
                    component="label"
                    variant="contained"
                    sx={{ color: "white", mt: 2 }}
                    startIcon={<Iconify icon="eva:upload-outline" />}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setData((prev) => ({
                        ...prev,
                        videoUrl: URL.createObjectURL(file),
                      }));
                    }}
                  >
                    Video
                    <input
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      name="upload"
                      id="upload"
                    />
                  </Button> */}
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
                sx={{ backgroundColor: "#a64646", color: "white", mt: 2 }}
                onClick={async () => {
                  const { success, downloadURL } = await UploadFile(
                    data.thumbnailUrl,
                    "thumbnails"
                  );

                  if (success && downloadURL) {
                    // Update the thumbnailUrl in the state
                    setData((prev) => ({
                      ...prev,
                      thumbnailUrl: downloadURL,
                    }));
                  }
                }}
              >
                Save
              </Button>
              <Button
                className="btn-icon"
                variant="contained"
                sx={{ backgroundColor: "#a64646", color: "white", mt: 2 }}
                onClick={async () => {
                  if (data.thumbnailUrl.includes("firebasestorage")) {
                    try {
                      // Update Firestore document with the new data object
                      const docRef = doc(
                        collection(db, "Data", "Portfolio", "video"),
                        id
                      );
                      await updateDoc(docRef, {
                        ...data, // Use the updated data object with new thumbnailUrl
                      });

                      // Show success message
                      setSnackbarStatus({
                        open: true,
                        message: "Data Updated Successfully",
                        severity: "success",
                      });
                    } catch (error) {
                      // Handle Firestore update error
                      console.error("Firestore update error:", error);
                    }
                  }
                }}
              >
                update
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}
