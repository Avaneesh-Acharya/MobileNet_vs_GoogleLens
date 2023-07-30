function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("MobileNet", model_loaded)
}
function draw() {
 image(video, 0, 0, 300, 300)  
 classifier.classify(video, got_results)
}
function model_loaded() {
  console.log("model is loaded")
}
previous_result=""
function got_results(error, results) {
  if (error) {
    console.error(error)
  }
  else{
    if((results[0].confidence>0.5)&&(previous_result!=results[0].label)) {
      console.log(results)
      previous_result=results[0].label
      s=window.speechSynthesis
      data="Object Detected is: "+results[0].label
      u=new SpeechSynthesisUtterance(data)
      //s.speak(u)//
      document.getElementById("object").innerHTML=results[0].label
      document.getElementById("accuracy").innerHTML=Math.round(results[0].confidence*100)+"%"
    }
  }
  
}



