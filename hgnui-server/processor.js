import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.1.0-alpha-11";

const video = document.getElementById("video");
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
        modelAssetPath: "./task-files/gesture_recognizer_v1.task"
    },
    numHands: 1
});

await gestureRecognizer.setOptions({ runningMode: "video" });

let lastVideoTime = -1;
function renderLoop() {
    if (video.currentTime !== lastVideoTime) {
        const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video);
        console.log(gestureRecognitionResult);
        lastVideoTime = video.currentTime;
    }

    requestAnimationFrame(() => {
        renderLoop();
    });
}