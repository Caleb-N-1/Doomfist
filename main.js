function setup(){
    canvas = createCanvas(680,400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

video = ""
status = ""
objects = []



function preload() {
    video = createVideo("video.mp4")
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded")
    status = true
    video.loop()
    video.speed(1)
    video.volume(0)
}

function stop() {
    video.stop()
}


function slider_value() {
    slider = document.getElementById("slider").value;
    video.speed(slider)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}

function draw() {
    image(video, 0, 0, 680, 400);

    r = random(255)
    g = random(255)
    b = random(255)

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            
            fill(r,g,b);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
          
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            var synth = window.speechSynthesis;
            speak_data = objects[i].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
    }
}