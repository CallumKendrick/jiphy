var fetchedCap;
var fetchArr;

function makeImgArray(imageArray, caption) {
    fetchedCap = caption;
    fetchedArr = imageArray;
    console.log("FETCHED Caption: " + fetchedCap + "ImageArr: " + fetchedArr);
    }

function makeGif(type){
    var text;
    var time;
    var frames;
    if (fetchedCap == "") {
        var text = document.getElementById('text').value;
    }
    else {
        text = fetchedCap;
    }
    
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    var searchTerm = document.getElementById("search").value;
    var comboVal = document.getElementById("combo").value;

    console.log(height, width);

    if (height == '' || height == null || isNaN(height)) { var height = 300; }
    if (width == '' || width == null || isNaN(width)) { var width = 300; }

    if (text == null || text == "") {
        text = "";
    }

    time = comboVal;
    frames = comboVal * 10;


    if (type == "webcam") {
        console.log("GIF LOG | " + height + "x" + width + "px - Time:" + time + " Frames:" + frames);
        gifshot.createGIF({'interval': 0.05, 'gifHeight': height, 'gifWidth': width, 'text': text, 'fontSize': sizeFont(height, width),
        'time': time, 'numFrames': frames, 'keepCameraOn': false},
        function(obj) {
            if(!obj.error) {
                var image = obj.image,
                animatedImage = document.createElement('img');
                animatedImage.src = image;
                var getGif = document.getElementById("gif");
                if (getGif.childNodes[0] != null) {
                    getGif.removeChild(getGif.childNodes[0]);
                }
                document.getElementById("gif").appendChild(animatedImage);
            }
        });
    }

    else if (type == "image") {
        gifshot.createGIF({'images': fetchedArr, 'text': fetchedCap, 'interval': 0.2, 'gifHeight': height, 'gifWidth': width, 'fontSize': sizeFont(height, width)},
            function(obj) {
                if(!obj.error) {
                    var image = obj.image,
                    animatedImage = document.createElement('img');
                    animatedImage.src = image;
                    var getGif = document.getElementById("gif");
                    if (getGif.childNodes[0] != null) {
                        getGif.removeChild(getGif.childNodes[0]);
                    }
                    document.getElementById("gif").appendChild(animatedImage);
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


// TO DO
// Make the ability to have an images array
// Make webcam and images GIF buttons work
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
