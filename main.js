Webcam.set({
    width: 310, 
    height: 300, 
    image_format: 'png', 
    png_quality: 90, 
    constraints: {
        facingMode: 'environment'
    }
});

var cameraDiv=document.querySelector('#camera');
var snapshotDiv=document.querySelector('#snapshot');
var resultItemNameSpan=document.querySelector('#result_item_name');

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(dataURIStr){
        snapshotDiv.innerHTML='<img id="captured_img" src="'+dataURIStr+'">';
    });
}

console.log('ml5 version: ', ml5.version);

function onModelLoaded(){
    console.log('Model Loaded!');
}

var newImgClassifier=ml5.imageClassifier('MobileNet', onModelLoaded);

function gotResult(error, result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        resultItemNameSpan.innerText=result[0].label;
    }
}

function checkImg(){
    var capturedImg=document.querySelector('#captured_img');

    newImgClassifier.classify(capturedImg, gotResult);
}