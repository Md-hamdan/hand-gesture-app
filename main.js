//https://teachablemachine.withgoogle.com/models/ZRUAEjDZb/

prediction_1="";
Webcam.set({
    width:350,
    height:300,
    Image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json',model_loaded);

function model_loaded() {
    console.log("model is loaaded");
}

function speak() {
    synth=window.speechSynthesis;
    speak_data1="The prediction is "+prediction_1;
    utterThis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img,got_result)
}

function got_result(error,results) {
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        speak();
        document.getElementById("result_emotion_name1").innerHTML=prediction_1;
        if(prediction_1 == "amazing")
    {
      document.getElementById("gesture_emoji1").innerHTML = "&#128076;";
    }
    else if(prediction_1 == "best")
    {
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
    }
    else if(prediction_1 == "victory")
    {
      document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
    }

    }
}