"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoDurationFromVideoFile =
  exports.generateVideoThumbnailViaUrl =
  exports.getVideoCover =
  exports.generateVideoThumbnails =
  exports.importFileandPreview =
    void 0;
const importFileandPreview = (file, revoke) => {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    let preview = window.URL.createObjectURL(file);
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 100);
  });
};
exports.importFileandPreview = importFileandPreview;
const generateVideoThumbnails = async (videoFile, numberOfThumbnails, type) => {
  let thumbnail = [];
  let fractions = [];
  return type !== "url"
    ? new Promise(async (resolve, reject) => {
        var _a;
        if (
          !((_a = videoFile.type) === null || _a === void 0
            ? void 0
            : _a.includes("video"))
        )
          reject("not a valid video file");
        await (0, exports.getVideoDurationFromVideoFile)(videoFile)
          .then(async (duration) => {
            for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
              fractions.push(Math.floor(i));
            }
            let promiseArray = fractions.map((time, index) =>
              getVideoThumbnail(
                videoFile,
                index >= fractions.length - 1 ? time - 2 : time
              )
            );
            await Promise.all(promiseArray)
              .then((res) => {
                res.forEach((res) => {
                  thumbnail.push(res);
                });
                resolve(thumbnail);
              })
              .catch((err) => {
                reject(err);
              })
              .finally(() => resolve(thumbnail));
          })
          .catch((err) => {
            reject(err);
          });
        reject("something went wrong");
      })
    : new Promise(async (resolve, reject) => {
        await (0, exports.getVideoDurationFromVideoFile)(videoFile).then(
          async (duration) => {
            console.log("duration", duration);
            for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
              fractions.push(Math.floor(i));
            }
            let promiseArray = fractions.map((time, index) =>
              getVideoThumbnail(
                videoFile,
                index >= fractions.length - 1 ? time - 2 : time
              )
            );
            await Promise.all(promiseArray)
              .then((res) => {
                res.forEach((res) => {
                  thumbnail.push(res);
                });
                resolve(thumbnail);
              })
              .catch((err) => {
                reject(err);
              })
              .finally(() => resolve(thumbnail));
          }
        );
        reject("something went wrong");
      });
};
exports.generateVideoThumbnails = generateVideoThumbnails;
const getVideoThumbnail = (file, videoTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    var _a;
    if (
      (_a = file === null || file === void 0 ? void 0 : file.type) === null ||
      _a === void 0
        ? void 0
        : _a.match("video")
    ) {
      (0, exports.importFileandPreview)(file).then((urlOfFIle) => {
        (0, exports.getVideoCover)(urlOfFIle, videoTimeInSeconds).then(
          (res) => {
            resolve(res);
          }
        );
      });
    } else if (file) {
      (0, exports.getVideoCover)(file, videoTimeInSeconds)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject("file not valid");
    }
  });
};
const getVideoCover = (urlOfFIle, seekTo = 0) => {
  return new Promise((resolve, reject) => {
    try {
      const videoPlayer = document.createElement("video");
      videoPlayer.setAttribute("src", urlOfFIle);
      videoPlayer.crossOrigin = "cors";
      videoPlayer.load();
      videoPlayer.addEventListener("error", (ex) => {
        reject(`error when loading video file ${ex}`);
      });
      videoPlayer.addEventListener("loadedmetadata", () => {
        if (videoPlayer.duration < seekTo) {
          reject("video is too short.");
          return;
        }
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        videoPlayer.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          ctx.canvas.toBlob(
            (blob) => {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = async function () {
                var videourl = await base64ToBlob(reader.result);
                var aspectRatio = fraction(canvas.width / canvas.height);
                var videometa = {
                  thumbnailUrl: videourl,
                  width: canvas.width,
                  height: canvas.height,
                  aspectRatio: aspectRatio,
                };
                resolve(videometa);
              };
            },
            "image/jpeg",
            1
          );
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const fraction = (number) => {
  let letVal = Math.floor(number);
  let fVal = number - letVal;
  let pVal = 1000000000;
  let gcdVal = gcd(Math.round(fVal * pVal), pVal);
  let num = Math.round(fVal * pVal) / gcdVal;
  let deno = pVal / gcdVal;
  return letVal * deno + num + ":" + deno;
};

function gcd(a, b) {
  if (a == 0) return b;
  else if (b == 0) return a;
  if (a < b) return gcd(a, b % a);
  else return gcd(b, a % b);
}
exports.getVideoCover = getVideoCover;
const base64ToBlob = async (base64Data) => {
  try {
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

    const blob = new Blob(byteArrays, { type: "image/jpeg" }); // Adjust the 'type' accordingly
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error converting base64 to blob:", error);
    return null;
  }
};
const generateVideoThumbnailViaUrl = (urlOfFIle, videoTimeInSeconds = 3) => {
  return new Promise((resolve, reject) => {
    try {
      var video = document.createElement("video");
      var timeupdate = function () {
        if (snapImage()) {
          video.removeEventListener("timeupdate", timeupdate);
          video.pause();
        }
      };
      video.addEventListener("loadeddata", function () {
        try {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
          }
        } catch (error) {
          reject(error);
        }
      });
      var snapImage = function () {
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        var image = canvas.toBlob(
          (blob) => {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async function () {
              var videourl = await base64ToBlob(reader.result);
              var aspectRatio = fraction(canvas.width / canvas.height);
              var videometa = {
                thumbnailUrl: videourl,
                width: canvas.width,
                height: canvas.height,
                aspectRatio: aspectRatio
              };
              resolve(videometa);
            };
          },
          "image/jpeg",
          1
        );
        var success =
          (image === null || image === void 0 ? void 0 : image.length) > 1e5;
        if (success) {
          URL.revokeObjectURL(urlOfFIle);
          resolve(image);
        }
        return success;
      };
      video.addEventListener("timeupdate", timeupdate);
      video.preload = "metadata";
      video.src = urlOfFIle;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "cors";
      video.currentTime = videoTimeInSeconds;
      video
        .play()
        .then()
        .catch((err) => {
          reject({
            status: 500,
            reason: `Access to video at ${urlOfFIle} from origin ${window.location.hostname} has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`,
            message: err,
          });
        });
    } catch (error) {
      reject(error);
    }
  });
};
exports.generateVideoThumbnailViaUrl = generateVideoThumbnailViaUrl;
const getVideoDurationFromVideoFile = (videoFile) => {
  return new Promise((resolve, reject) => {
    var _a;
    try {
      if (videoFile) {
        if (
          (_a =
            videoFile === null || videoFile === void 0
              ? void 0
              : videoFile.type) === null || _a === void 0
            ? void 0
            : _a.match("video")
        ) {
          (0, exports.importFileandPreview)(videoFile).then((url) => {
            generateVideoDurationFromUrl(url).then((res) => {
              resolve(res);
            });
          });
        } else {
          generateVideoDurationFromUrl(videoFile).then((res) => {
            resolve(res);
          });
        }
      } else {
        reject("Cannot generate video duration for this video file.");
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.getVideoDurationFromVideoFile = getVideoDurationFromVideoFile;
const generateVideoDurationFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    try {
      let video = document.createElement("video");
      video.addEventListener("loadeddata", function () {
        resolve(video.duration);
        window.URL.revokeObjectURL(url);
      });
      video.preload = "metadata";
      video.src = url;
      video.muted = true;
      video.crossOrigin = "cors";
      video.playsInline = true;
      video.play();
    } catch (error) {
      reject(error);
    }
  });
};
