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
} from "@mui/material";

import { useEffect } from "react";
import { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useParams } from "next/navigation";
import Iconify from "@/hooks/iconify";
import { collection, doc, getDoc } from "firebase/firestore";
import db from "@/firebase/firestore";
import { useRouter } from "next/router";
// import { processAndUpload } from "../../utils/FireBase";
import Link from "next/link";
function processAndUpload() {
  return;
}

export default function EditPage() {
  const params = useParams();
  // const id = params.id ;
  const id = "new";
  const [loading, setLoading] = useState({
    status: false,
  });

  const [data, setData] = useState({
    Herotitle: "",
    HeroDescription: "",
    thumbnail: "",
    video: "",
    videoTitle: "",
    videoDescription: "",
    contributor: [
      {
        title: "",
        name: "",
        link: "",
      },
    ],
  });
  const router = useRouter();
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });


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
              Edit Hero Section
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
                      <Typography variant="h6">Hero Title</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="Herotitle"
                        value={data.Herotitle}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            Herotitle: e.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Hero Description</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="HeroDescription"
                        value={data.HeroDescription}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            HeroDescription: e.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Video Title</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="videoTitle"
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
                      <Typography variant="h6">Video Description</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="videoDescription"
                        value={data.videoDescription}
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
                </TableBody>
              </Table>

              <Box sx={{ marginRight: "10%" }}>
                {data.thumbnail.length > 0 ? (
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={data.thumbnail}
                      alt="error"
                      style={{
                        width: 400,
                        objectFit: "contain",
                        objectPosition: "top",
                      }}
                    />
                    {data.video.length > 0 && (
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
                    )}
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
                    component="label"
                    variant="contained"
                    sx={{ color: "white", mt: 2 }}
                    startIcon={<Iconify icon="eva:upload-outline" />}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setData((prev) => ({
                        ...prev,
                        thumbnail: URL.createObjectURL(file),
                      }));
                    }}
                  >
                    Thumbnail
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      name="upload"
                      id="upload"
                    />
                  </Button>
                  <Button
                    component="label"
                    variant="contained"
                    sx={{ color: "white", mt: 2 }}
                    startIcon={<Iconify icon="eva:upload-outline" />}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setData((prev) => ({
                        ...prev,
                        video: URL.createObjectURL(file),
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 2,
                mt: 2,
              }}
            >
              <Link href="/admin" style={{ textDecoration: "none" }}>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Cancel
                </Button>
              </Link>
              <Button
                className="btn-icon"
                variant="contained"
                sx={{ backgroundColor: "#a64646", color: "white", mt: 2 }}
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
