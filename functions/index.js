// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const ffprobeStatic = require("ffprobe-static");

// admin.initializeApp();

// exports.getVideoMetadata = functions.https.onRequest(async (req, res) => {
//   const fileRef = admin
//     .storage()
//     .bucket()
//     .file(
//       "DCC Animal Hospital/A true companion_2.mp4"
//     );

//   try {
//     const [metadata] = await fileRef.getMetadata();
//     console.log("Video Metadata:", metadata);

//     // Access individual metadata properties
//     const contentType = metadata.contentType; // Video type (MIME type)
//     const size = metadata.size; // File size in bytes
//     const width = metadata.metadata?.width; // Video width (if available)
//     const height = metadata.metadata?.height; // Video height (if available)

//     // Do something with the metadata...

//     res.status(200).send("Video metadata retrieved successfully.");
//   } catch (error) {
//     console.error("Error retrieving video metadata:", error);
//     res.status(500).send("Error retrieving video metadata.");
//   }
// });

// exports.getVideoMetadata = functions.https.onRequest(async (req, res) => {
//   const fileRef = admin.storage().bucket().file("DCC Animal Hospital/Ex_2.mp4");

//   try {
//     const [metadata] = await fileRef.getMetadata();
//     console.log("Video Metadata:", metadata);

//     // Use ffprobe-static to get video width and height
//     const { spawn } = require("child_process");
//     const cmd = `${ffprobeStatic.path} -v error -select_streams v:0 -show_entries stream=width,height -of json "https://firebasestorage.googleapis.com/v0/b/brijesh-kumar-96397.appspot.com/o/DCC%20Animal%20Hospital%2FEx_2.mp4?alt=media&token=99522f6a-e797-4ce4-8f32-127bac743ba4"`;
//     const ffprobeProcess = spawn(cmd, { shell: true });

//     let videoInfo = "";
//     ffprobeProcess.stdout.on("data", (data) => {
//       videoInfo += data.toString();
//     });

//     ffprobeProcess.stderr.on("data", (data) => {
//       console.error("Error retrieving video metadata:", data.toString());
//     });

//     ffprobeProcess.on("close", (code) => {
//       if (code === 0) {
//         const parsedVideoInfo = JSON.parse(videoInfo);
//         const width = parsedVideoInfo.streams[0].width; // Video width
//         const height = parsedVideoInfo.streams[0].height; // Video height

//         console.log("Video Width:", width);
//         console.log("Video Height:", height);

//         // Do something with the metadata...

//         res.status(200).send("Video metadata retrieved successfully.");
//       } else {
//         console.error("ffprobe process exited with code:", code);
//         res.status(500).send("Error retrieving video metadata.");
//       }
//     });
//   } catch (error) {
//     console.error("Error retrieving video metadata:", error);
//     res.status(500).send("Error retrieving video metadata.");
//   }
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { spawn } = require("child_process");
const ffprobeStatic = require("ffprobe-static");
const ffmpegStatic = require("ffmpeg-static");

admin.initializeApp();
const firestore = admin.firestore();

exports.getVideoMetadata = functions.https.onRequest(async (req, res) => {
  try {
    // Get a list of all video files in Firebase Storage
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: "DCC Animal Hospital/" });


    // Log the video files inside an async function to wait for the Promise to resolve
    await logVideoFiles(files);
    // Process each video file
    // const promises = files.map(async (file) => {
    //   const [metadata] = await file.getMetadata();
    //   console.log("Video Metadata:", metadata);

    //   // Use ffprobe-static to get video duration, width, and height
    //   const durationCmd = `${ffprobeStatic.path} -v error -show_entries format=duration -show_entries stream=width,height -of json "${file.name}"`;
    //   const ffprobeProcess = spawn(durationCmd, { shell: true });

    //   let videoInfo = "";
    //   ffprobeProcess.stdout.on("data", (data) => {
    //     videoInfo += data.toString();
    //   });

    //   ffprobeProcess.stderr.on("data", (data) => {
    //     console.error("Error retrieving video metadata:", data.toString());
    //   });

    //   return new Promise((resolve, reject) => {
    //     ffprobeProcess.on("close", async (code) => {
    //       if (code === 0) {
    //         const parsedVideoInfo = JSON.parse(videoInfo);
    //         const duration = parseFloat(parsedVideoInfo.format.duration);
    //         const width = parsedVideoInfo.streams[0].width;
    //         const height = parsedVideoInfo.streams[0].height;

    //         console.log("Video Duration:", duration);
    //         console.log("Video Width:", width);
    //         console.log("Video Height:", height);

    //         // Extract the thumbnail from the video at 5s
    //         const thumbnailPath = `/tmp/thumbnail_${file.name}.jpg`;
    //         const ffmpegCmd = `${ffmpegStatic.path} -i "${file.name}" -ss 5 -vframes 1 "${thumbnailPath}"`;
    //         const ffmpegProcess = spawn(ffmpegCmd, { shell: true });

    //         ffmpegProcess.on("close", async (code) => {
    //           if (code === 0) {
    //             // Save the thumbnail to Firebase Storage
    //             const thumbnailFile = bucket.file(
    //               `thumbnails/${file.name}.jpg`
    //             );
    //             await thumbnailFile.save(await readFile(thumbnailPath));
    //             await thumbnailFile.makePublic();

    //             // Save the metadata to Firestore
    //             const videoMetadata = {
    //               width,
    //               height,
    //               duration,
    //               contentType: metadata.contentType,
    //               downloadUrl: await file.getSignedUrl({
    //                 action: "read",
    //                 expires: "03-01-2500", // Set an expiration date
    //               }),
    //               fileName: file.name,
    //               thumbnail: thumbnailFile.publicUrl(),
    //             };

    //             await firestore
    //               .collection("videosMetadata")
    //               .doc(file.name)
    //               .set(videoMetadata);

    //             resolve();
    //           } else {
    //             console.error("ffmpeg process exited with code:", code);
    //             reject(new Error("Error extracting thumbnail."));
    //           }
    //         });
    //       } else {
    //         console.error("ffprobe process exited with code:", code);
    //         reject(new Error("Error retrieving video metadata."));
    //       }
    //     });
    //   });
    // });

    // Wait for all promises to complete
    // await Promise.all(promises);

    res.status(200).send("Video metadata retrieved and saved successfully.");
  } catch (error) {
    console.error("Error retrieving video metadata:", error);
    res.status(500).send("Error retrieving video metadata.");
  }
});

async function logVideoFiles(files) {
  console.log("Video Files:", files);
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
