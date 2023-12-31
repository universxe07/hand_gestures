

var prediction_1 = "";

Webcam.set({

     width:350,
     height:300,
     image_format:'png',
     png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/50mg78n8n/model.json', modelLoaded);
console.log('ml5 version:', ml5.version);

function modelLoaded(){

    console.log('Model Loaded !');
}

function speak(){

    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is equal to " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){

    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
 if (error){
    console.error(error);
 } else {

    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    prediction_1 = results[0].label;
    

    if(results[0].label == "okay"){
        document.getElementById("result_object_gesture_icon").innerHTML = "&#128076";
    }

    if(results[0].label == "thumbs up"){
        document.getElementById("result_object_gesture_icon").innerHTML = "&#128077";
    }

    if(results[0].label == "peace"){
        document.getElementById("result_object_gesture_icon").innerHTML = "&#9996";
    }

   
speak();
    
 }
}