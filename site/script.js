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
    gifshot.createGIF({'images': makeImgArray()}
            ,function(obj) {
            if(!obj.error) {
                var image = obj.image,
                animatedImage = document.createElement('img');
                animatedImage.src = image;
                animatedImage.style.width = "500px";
                animatedImage.style.height = "500px";
                document.body.appendChild(animatedImage);
            }
        });
}

function webcamGif() {
    gifshot.createGIF(function(obj) {
    if(!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        document.body.appendChild(animatedImage);
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
