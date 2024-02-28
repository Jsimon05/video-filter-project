let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  img = loadImage('/static/hat.png')
  img1 = loadImage('/static/scarf.png')

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // drawKeypoints();
  printAnnotations();

}

function printAnnotations(){
  if (predictions.length > 0) {
//     console.log(Object.keys(predictions[0].annotations))

    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    // let x =  predictions[0].annotations.midwayBetweenEyes[0][0];
    // let y =  predictions[0].annotations.midwayBetweenEyes[0][1];
    console.log(midEyes)

    const x = midEyes[0]
    const y = midEyes[1]
    const z = midEyes[2]

    image(img,x-110,y-165,220,150);
     image(img1,x-200,y,350,250);
  }
}



function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}
