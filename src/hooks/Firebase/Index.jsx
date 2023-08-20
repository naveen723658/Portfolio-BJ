import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "../../../utils/firebase/storage";
import db from "../../../utils/firebase/firestore";

// call this function when you have to perform the delete
export const processAndDelete = async (dataref, docid, setSnackbarStatus) => {
  let data = await getData(docid, dataref);

  const trackobj = await trackobject(data, docid);

  const del = await deletefunc(dataref, docid, setSnackbarStatus);

  return del;
};

// call this fucntion when you have to perform the update and create function not it can compare and delete the files and reupload it
export const processAndUpload = async (
  obj,
  storageref,
  dataref,
  id,
  setSnackbarStatus
) => {
  let data;

  if (id !== "new") {
    data = await getData(id, dataref);
  } else {
    data = false;
  }
  const processedObj = await processObject(obj, storageref, data);
  const newID = await uploadData(processedObj, dataref, id, setSnackbarStatus);

  return { processedObj, newID };
};

const processObject = async (obj, storageref, data) => {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = await processObject(obj[i], storageref, data && data[i]);
      }
      if (
        obj.some((item) => typeof item === "string" && item.startsWith("blob:"))
      ) {
        obj = await Promise.all(
          obj.map(async (item, index) => {
            if (typeof item === "string" && item.startsWith("blob:")) {
              if (data && data[index].includes("firebasestorage")) {
                let { success } = await deleteImage(data[index]);
              }
              let { success, downloadURL } = await UploadFile(item, storageref);
              if (success) {
                return downloadURL;
              } else {
                return item;
              }
            } else {
              return await processObject(item, storageref, data && data[index]);
            }
          })
        );
      }
    } else {
      for (let key in obj) {
        if (typeof obj[key] === "object") {
          obj[key] = await processObject(
            obj[key],
            storageref,
            data && data[key]
          );

          if (
            Array.isArray(obj[key]) &&
            obj[key].some(
              (item) => typeof item === "string" && item.startsWith("blob:")
            )
          ) {
            obj[key] = await Promise.all(
              obj[key].map(async (item, index) => {
                if (typeof item === "string" && item.startsWith("blob:")) {
                  if (data && data[key][index].includes("firebasestorage")) {
                    let { success } = await deleteImage(data[key][index]);
                  }
                  let { success, downloadURL } = await UploadFile(
                    item,
                    storageref
                  );
                  if (success) {
                    return downloadURL;
                  } else {
                    return item;
                  }
                } else {
                  return await processObject(
                    item,
                    storageref,
                    data && data[key][index]
                  );
                }
              })
            );
          }
        } else if (Array.isArray(obj[key])) {
          obj[key] = await processObject(
            obj[key],
            storageref,
            data && data[key]
          );
          if (
            obj[key].some(
              (item) => typeof item === "string" && item.startsWith("blob:")
            )
          ) {
            obj[key] = await Promise.all(
              obj[key].map(async (item, index) => {
                if (typeof item === "string" && item.startsWith("blob:")) {
                  if (data && data[key][index].includes("firebasestorage")) {
                    let { success } = await deleteImage(data[key][index]);
                  }
                  let { success, downloadURL } = await UploadFile(
                    item,
                    storageref
                  );
                  if (success) {
                    return downloadURL;
                  } else {
                    return item;
                  }
                } else {
                  return item;
                }
              })
            );
          }
        } else if (
          typeof obj[key] === "string" &&
          obj[key].startsWith("blob:")
        ) {
          if (data && data[key].includes("firebasestorage")) {
            let { success } = await deleteImage(data[key]);
          }
          let { success, downloadURL } = await UploadFile(obj[key], storageref);
          if (success) {
            obj[key] = downloadURL;
          }
        }
      }
    }
  }

  return obj;
};

const UploadFile = (bloburl, storageref) => {
  return new Promise((resolve, reject) => {
    if (bloburl.startsWith("blob:")) {
      fetch(bloburl)
        .then((response) => response.blob())
        .then((fileBlob) => {
          const file = new File([fileBlob], "tempFileName");
          const fileName = `${Date.now()}`;

          if (Boolean(fileBlob)) {
            const storageRef = ref(storage, `${storageref}/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, fileBlob);

            // Event listener for progress updates
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                reject(error);
              },
              () => {
                // Upload successful
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    resolve({
                      success: true,
                      downloadURL: downloadURL,
                    });
                  })
                  .catch((error) => {
                    reject(error);
                  });
              }
            );
          } else {
            reject({
              success: false,
              reason: "File not provided or might be incorrect",
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject({
        success: false,
        reason: "File not provided or might be incorrect",
      });
    }
  });
};

const uploadData = async (data, dataref, id, setSnackbarStatus) => {
  try {
    let newID = "";
    if (id === "new") {
      const docRef = collection(db, dataref);
      newID = (await addDoc(docRef, data)).id;
    } else {
      newID = id;
    }
    const docRef = doc(db, `${dataref}/${newID}`);
    await updateDoc(docRef, { ...data });
    return newID;
  } catch (error) {
    if (setSnackbarStatus !== null && setSnackbarStatus !== undefined) {
      setSnackbarStatus({
        open: true,
        message: error.message,
        severity: "error",
      });
    } else {
      return error;
    }
  } finally {
    if (setSnackbarStatus !== null && setSnackbarStatus !== undefined) {
      setSnackbarStatus({
        open: true,
        message:
          id === "new"
            ? "Data uploaded successfully"
            : "Data updated successfully",
        severity: "success",
      });
    } else {
      return;
    }
  }
};

const deleteImage = (downloadUrl) => {
  return new Promise((resolve, reject) => {
    let path;
    const regex = /\/([^/]+?)(?=\?|$)/;
    const match = regex.exec(downloadUrl);

    if (match && match[1]) {
      const fileName = decodeURIComponent(match[1]).split("/");
      path = fileName.join("/");
    } else {
      reject({
        success: false,
        reason: "can't able to find file name",
      });
    }

    const fileRef = ref(storage, path);
    deleteObject(fileRef)
      .then(() => {
        resolve({
          success: true,
        });
      })
      .catch((error) => {
        reject({
          success: false,
          reason: error,
        });
      });
  });
};

const getData = async (id, dataref) => {
  try {
    const dataRef = doc(db, `${dataref}/${id}`);
    const docSnap = await getDoc(dataRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      throw new Error("No such data exists!");
    }
  } catch (error) {
    throw error;
  }
};

export const trackobject = async (obj, docid) => {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = await trackobject(obj[i], docid);
      }
      if (
        obj.some(
          (item) => typeof item === "string" && item.includes("firebasestorage")
        )
      ) {
        obj = await Promise.all(
          obj.map(async (item) => {
            if (typeof item === "string" && item.includes("firebasestorage")) {
              let { success } = await deleteImage(item);
              if (success) {
                return "";
              } else {
                return item;
              }
            } else {
              return await trackobject(item, docid);
            }
          })
        );
      }
    } else {
      for (let key in obj) {
        if (typeof obj[key] === "object") {
          obj[key] = await trackobject(obj[key], docid);

          if (
            Array.isArray(obj[key]) &&
            obj[key].some(
              (item) =>
                typeof item === "string" && item.includes("firebasestorage")
            )
          ) {
            obj[key] = await Promise.all(
              obj[key].map(async (item) => {
                if (
                  typeof item === "string" &&
                  item.includes("firebasestorage")
                ) {
                  let { success } = await deleteImage(item);
                  if (success) {
                    return "";
                  } else {
                    return item;
                  }
                } else {
                  return await trackobject(item, docid);
                }
              })
            );
          }
        } else if (Array.isArray(obj[key])) {
          obj[key] = await trackobject(obj[key], docid);
          if (
            obj[key].some(
              (item) =>
                typeof item === "string" && item.includes("firebasestorage")
            )
          ) {
            obj[key] = await Promise.all(
              obj[key].map(async (item) => {
                if (
                  typeof item === "string" &&
                  item.includes("firebasestorage")
                ) {
                  let { success } = await deleteImage(item);
                  if (success) {
                    return "";
                  } else {
                    return item;
                  }
                } else {
                  return item;
                }
              })
            );
          }
        } else if (
          typeof obj[key] === "string" &&
          obj[key].includes("firebasestorage")
        ) {
          let { success } = await deleteImage(obj[key]);
          if (success) {
            obj[key] = "";
          }
        }
      }
    }
  }

  return obj;
};

const deletefunc = async (dataref, docid, setSnackbarStatus) => {
  try {
    const docRef = doc(db, `${dataref}/${docid}`);
    deleteDoc(docRef);

    setSnackbarStatus((prev) => ({
      ...prev,
      open: true,
      message: "Data Deleted successfully",
      severity: "success",
    }));
    return success;
  } catch (error) {
    return error.message;
  }
};

