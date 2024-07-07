// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;
let video;
let detector;
let detections = [];
let song=""
function preload() {
  song=loadSound("bullshitter_alert.mp3");
  detector = ml5.objectDetector('cocossd');
  
}

function gotDetections(error, results) {
    console.error(error);
  
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  c1=createCanvas(640, 480);
  c1.center()
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);
}


function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    document.getElementById("status").innerHTML="Detection Started";
    
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
    if(object.label=='person'){
      song.stop()
      document.getElementById("number").innerHTML="Baby Detected";
    }
    else{song.play()
      document.getElementById("number").innerHTML="Baby Not Detected";
    }
  }
  if(detections.length==0){
    song.play()
      document.getElementById("number").innerHTML="Baby Not Detected";
    
  }
}