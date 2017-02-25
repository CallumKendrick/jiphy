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
    var interval = document.getElementById("interval").value;
    // var frames = document.getElementById("frames").value; - Doesn't work currently
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;

    if (text == null) {
        var text = "";
    }
    if (interval == null) {
        var interval = 0.1;
    }
    if (height == null) {
        var height = 300;
    }
    if (width == null) {
        var width = 300;
    }

    if (type == "webcam") {
        gifshot.createGIF({'interval': interval, 'gifHeight': height, 'gifWidth': width, 'text': text, 'fontSize': sizeFont(height, width)},
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
        gifshot.createGIF({'images': makeImgArray(), 'text': text, 'interval': interval, 'gifHeight': height, 'gifWidth': width, 'fontSize': sizeFont(height, width)},
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
