# [Chemaya-Handistry](https://github.com/Dexva/chemaya-handistry)

Chemaya is a browser-based hand gesture controlled virtual chemistry laboratory (VCL) integrating the [Google MediaPipe Gesture Recognizer solution](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer/web_js).

This project is developed by Team Handistry (R3Y1-03 / R2K2-02) from Philippine Science High School - Main Campus (Batch 2024).

## Overview

Chemaya is a proof-of-concept that integrates a Hand-Gesture Natural User Interface (HGNUI) into a web-based virtual lab. Instead of a mouse, users interact with the experiment using their own hands, captured through their webcam, to create a more immersive and practical learning experience.



## Using the App (Locally)

Requirements: Node.js (>= 18 LTS), npm (9 or 10)

Nice to have: >=16 GB RAM

1. Clone the repository.

2. Install dependencies (via ``npm install``) for both ``/vcl-app`` and ``/hgnui-server``


3. To use the app, you will need to run both ``vcl-app`` (for the actual chemistry lab UI) and ``hgnui-server`` 

    - /vcl-app run command: ``npm run`` (opens in localhost:3000)
    - /hgnui-server run command: ``node index.js`` (opens in localhost:5500)

4. Exit full screen view for both windows. It's alright for the HGNUI camera screen to not be seen on screen.

5. Try moving your hand to see if cursor responds. 

6. Have fun!

## Technologies Used
- [**React Framework**](https://react.dev/): for the VCL architecture
- [**TypeScript**](https://www.typescriptlang.org/): for access to custom typings + type security
- [**HTML5 / CSS / Vanilla JS**](https://developer.mozilla.org/en-US/docs/Glossary/HTML5): for HGNUI architecture
- [**Google MediaPipe**](https://developers.google.com/mediapipe)
    - [**Gesture Recognizer (MPGR)**](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer): hand for landmark and gesture recognition
    - [**Model Maker (MPMM)**](https://developers.google.com/mediapipe/solutions/model_maker): for creating custom gesture recognizer models
- [**Python OpenCV**](https://opencv.org/): for training images sampling from in-house videos
- [**Socket.io**](https://socket.io/): for parallel integration of VCL ahd HGNUI subsystems

## Developers
|Developer|E-mail Address|GitHub Handle|
|-----------|----------------|---------------|
|Davis Magpantay|b24.davis.magpantay@pshs.edu.ph|[Dexva](https://github.com/Dexva)|
|Lance Libatique|b24.lance.libatique@pshs.edu.ph|[electriclance-edu](https://github.com/electriclance-edu)|
|Leandro Sulvita|b24.ruth.sulvita@pshs.edu.ph|[sullvits](https://github.com/sullvits)| 