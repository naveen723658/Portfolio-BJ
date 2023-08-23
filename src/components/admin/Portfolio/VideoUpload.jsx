import { useState } from "react";
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
// components
import Iconify from "@/hooks/iconify";
import storage from "@/firebase/storage";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import db from "@/firebase/firestore";
import auth from "@/firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import { useFetchAllImagesMeta } from "@/hooks/Firebase/fetchdata";
import {
  generateVideoThumbnails,
  getVideoDurationFromVideoFile,
  importFileandPreview,
} from "@/hooks/videometa/VideoMeta";
async function NewImage(file, setData, id) {
  const docRef = await addDoc(
    collection(doc(db, "/Data/Portfolio/"), "Images"),
    { downloadURL: "" }
  );

  const imageRef = ref(storage, `Images/${docRef.id}`);
  const uploadTask = uploadBytesResumable(imageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDoc(doc(db, "/Data/Portfolio/", "Images", docRef.id), {
          id: docRef.id,
          downloadURL: downloadURL,
        });
        setData((prev) => {
          return [...prev, { id: docRef.id, downloadURL: downloadURL }];
        });
      });
    }
  );
}

async function UpdateImage(file, setData, id) {
  const imageRef = ref(storage, `VIPS/Recruiters/${id}.jpg`);
  const uploadTask = uploadBytesResumable(imageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDoc(doc(db, "/VIPS/VIPS/", "Recruiters", id), {
          id: id,
          downloadURL: downloadURL,
        });
        setData((prev) => {
          return prev
            .filter((item) => item.id !== id)
            .concat({ id: id, downloadURL: downloadURL });
        });
      });
    }
  );
}

async function deleteImage(id, setData) {
  const imageRef = ref(storage, `VIPS/Recruiters/${id}.jpg`);
  await deleteObject(imageRef);
  await deleteDoc(doc(db, "/VIPS/VIPS/", "Recruiters", id));
  setData((prev) => {
    return prev.filter((item) => item.id !== id);
  });
}

// ----------------------------------------------------------------------

export default function VideoUpload() {
  const [selected, setSelected] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [video, setVideo] = useState([]);
  const [imageMeta, loading] = useFetchAllImagesMeta("Oceedee Campaign Shoot/");
  const [temp, setTemp] = useState();
  useEffect(() => {
    async function getvideo() {
      const videoRef = collection(db, "/Data/Portfolio/", "video");
      const videoSnapshot = await getDocs(videoRef);
      const videoList = videoSnapshot.docs.map((doc) => doc.data());
      //   setVideo(videoList);
    }
    getvideo();
  }, []);

function base64ToBlob(base64Data) {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: "image/jpeg" }); // Adjust the 'type' accordingly
}

function generateBlobURL(blob) {
  return URL.createObjectURL(blob);
}
async function ThumbnailUploader(file) {
  // const duration = await getVideoDurationFromVideoFile(file);

  const thumbnailArray = await generateVideoThumbnails(file, 1, "url");
  const blobURLs = thumbnailArray.map(base64ToBlob).map(generateBlobURL);

  console.log(blobURLs); 
}
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
            Video Upload
          </Typography>

          <Button
            component="label"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Bulk upload
            <input
              type="file"
              multiple
              accept="video/*"
              hidden
              onChange={(ev) => {
                if (ev.target.files.length > 0) {
                  let file = ev.target.files[0];

                  // setTemp(URL.createObjectURL(file));
                  ThumbnailUploader(file);
                }
              }}
            />
          </Button>
        </Stack>
        <Card>
          {/* make a grid of all images in image array each having its own hoverable overlay */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridGap: 2,
              m: 2,
            }}
          >
            {video.map((item) => (
              <Box
                key={item.downloadURL}
                sx={{
                  position: "relative",
                  "&:hover": {
                    "& .overlay": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <img
                  height="140"
                  src={item.downloadURL}
                  alt="Image"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    border: "1px solid #eaeaea",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    opacity: 0,
                    transition: "opacity 0.5s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Change and delete buttons */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<Iconify icon="eva:edit-2-fill" />}
                      onChange={(ev) => {
                        if (ev.target.files.length > 0) {
                          UpdateImage(ev.target.files[0], setImages, image.id);
                        }
                      }}
                    >
                      Edit
                      <input type="file" hidden />
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon="eva:trash-2-fill" />}
                      onClick={(ev) => {
                        setSelected(item.id);
                        setDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          {/* <AlertDialog
            onClick={() => {
              deleteImage(selected, setImages);
              setSnackbarStatus({
                open: true,
                message: "Recruiters Image Deleted",
                severity: "success",
              });
              setDialogOpen(false);
            }}
            open={dialogOpen}
            setOpen={setDialogOpen}
            Action="Delete"
            description="Are you sure you want to delete this Recruiters Image?"
            title="Delete"
          /> */}
        </Card>
      </Container>
    </>
  );
}
