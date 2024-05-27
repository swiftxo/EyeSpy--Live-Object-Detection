import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities"; 

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
  const net = await cocossd.load();
    
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      console.log(obj);

      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx);

     
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="social-links">
            <a href="https://github.com/swiftxo" target="_blank" rel="noopener noreferrer">
              <img src="/github.svg" alt="GitHub" className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/2004sohanhossain" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.svg" alt="LinkedIn" className="social-icon" />
            </a>
            <a href="https://sohan.tech" target="_blank" rel="noopener noreferrer">
              <img src="./portfolio.svg" alt="Portfolio" className="social-icon" />
            </a>
            <img src = "EyeSpy.png" alt = "EyeSpy" className="logo" /> 
          </div>
        </div>
        <h1>Loading....</h1>
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
