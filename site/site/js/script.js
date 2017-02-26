function makeImgArray() {
    var imageArray = [
    'images/thumb3936.jpg',
    'images/thumb3937.jpg',
    'images/thumb3938.jpg',
    'images/thumb3939.jpg',
    'images/thumb3940.jpg',
    'images/thumb3941.jpg',
    'images/thumb3942.jpg',
    'images/thumb3943.jpg',
    'images/thumb3944.jpg',
    'images/thumb3945.jpg',
    'images/thumb3946.jpg',
    'images/thumb3947.jpg',
    'images/thumb3948.jpg',
    'images/thumb3949.jpg',
    'images/thumb3950.jpg',
    'images/thumb3951.jpg',
    'images/thumb3952.jpg'
];
    return imageArray;
}

function makeGif(type){
    if (typeof height === 'undefined') { var height = 200; }
    if (typeof width === 'undefined') { var width = 200; }

    var text = document.getElementById('text').value;
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    var searchTerm = document.getElementById("search").value;
    var comboVal = document.getElementById("combo").value;
    var time;
    var frames;
    if (text == null) {
        text = "";
    }
    if (isNaN(height)) {
        height = 300;
    }
    if (isNaN(width)) {
        width = 300;
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
        gifshot.createGIF({'images': makeImgArray(), 'text': text, 'interval': 0.1, 'gifHeight': height, 'gifWidth': width, 'fontSize': sizeFont(height, width)},
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
