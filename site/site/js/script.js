var fetchedCap;
var fetchArr;
var video = document.getElementById("videoElement");

function makeImgArray(imageArray, caption) {
    fetchedCap = caption;
    fetchedArr = imageArray;

    // Fetched caption log
    console.log("[FETCHED] Caption: " + fetchedCap + "ImageArr: " + fetchedArr);
    }

function makeGif(type){
    var text;
    var time;
    var frames;

    // Fetch vars from front-end UI
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    var searchTerm = document.getElementById("search").value;
    var comboVal = document.getElementById("combo").value;


    // Overwrites fetchedCap with text input if there is any, or caption is null
    if (fetchedCap == "" | document.getElementById('text').value != "") {
        text = document.getElementById('text').value;
    }
    else {
        text = fetchedCap;
    }

    // Catch for if height and width = nothing - Set to 300px
    if (height == '' || height == null || isNaN(height)) { var height = 300; }
    if (width == '' || width == null || isNaN(width)) { var width = 300; }

    // Declare the time as the value of the combo box that dictates seconds
    time = comboVal;
    // Frames are recorded every 0.1 of a second
    frames = comboVal * 10;


    if (type == "webcam") {
        // Input log
        console.log("[GIF LOG] " + height + "x" + width + "px - Time:" + time + " Frames:" + frames + " Caption: " + text);

        gifshot.createGIF({'interval': 0.05, 'gifHeight': height, 'gifWidth': width, 'text': text, 'fontSize': sizeFont(height, width),
        'time': time, 'numFrames': frames, 'keepCameraOn': false},
        function(obj) {
            if(!obj.error) {
                var image = obj.image,
                animatedImage = document.createElement('img');
                animatedImage.src = image;
                var getGif = document.getElementById("gif");
                // If there is another GIF already displayed remove it
                if (getGif.childNodes[0] != null) {
                    getGif.removeChild(getGif.childNodes[0]);
                }
                document.getElementById("gif").appendChild(animatedImage);
                // Clear text box on completion
                document.getElementById('text').value = "";
            }
        });
    }

    else if (type == "image") {
        // Input log
        console.log("[GIF LOG] " + height + "x" + width + "px - Time:" + time + " Frames:" + frames + " Caption: " + text);

        gifshot.createGIF({'images': fetchedArr, 'text': text, 'interval': 0.2, 'gifHeight': height, 'gifWidth': width, 'fontSize': sizeFont(height, width)},
            function(obj) {
                if(!obj.error) {
                    var image = obj.image,
                    animatedImage = document.createElement('img');
                    animatedImage.src = image;
                    var getGif = document.getElementById("gif");
                    // If there is another GIF already displayed remove it
                    if (getGif.childNodes[0] != null) {
                        getGif.removeChild(getGif.childNodes[0]);
                    }
                    document.getElementById("gif").appendChild(animatedImage);
                    // Clear text box on completion
                    document.getElementById('text').value = "";
                }
            });
    }
}


function sizeFont(h, w) {
    if (h < w) {
        var size = h;
    }
    else {
        var size = w;
    }
    var font = parseInt(size/10) + "px";
    return font;
}

// -------------------------------------------------
// WEBCAM FUNCTIONS
// -------------------------------------------------

window.onLoad = initVideo();

function initVideo() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        console.log("Video stream denied or unsupported");
    }
}

// Closes the webcam preview, but doesn't disable camera
function closePreview() {
    video.pause();
    video.src = "";
    console.log("[WEBCAM] - Preview terminated");
}
