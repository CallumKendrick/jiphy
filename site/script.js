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

function imgGif() {
    if (typeof height === 'undefined') { var height = 200; }
    if (typeof width === 'undefined') { var width = 200; }

    var text = document.getElementById('text').value;
    var interval = document.getElementById("interval").value;
    var time = document.getElementById("time").value;
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;

    if (text == null) {
        var text = "";
    }
    if (interval == null) {
        var interval = 0.1;
    }
    if (time == null) {
        var time = 3;
    }
    if (height == null) {
        var height = 300;
    }
    if (width == null) {
        var width = 300;
    }

    gifshot.createGIF({'images': makeImgArray(), 'text': text, 'interval': interval, 'time': time, 'gifHeight': height, 'gifWidth': width, 'fontSize': sizeFont(height)},
        function(obj) {
            if(!obj.error) {
                var image = obj.image,
                animatedImage = document.createElement('img');
                animatedImage.src = image;
                document.getElementById("gif").appendChild(animatedImage);
            }
        });
}

function videoGif() {}

function sizeFont(h) {
    var font = parseInt(h/10) + "px";
    return font;
}

function webcamGif() {
    gifshot.createGIF(function(obj) {
    if(!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        document.getElementById("gif").appendChild(animatedImage);
    }
});
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
