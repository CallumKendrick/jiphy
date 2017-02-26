var captions = [];

var fileSystem = require("fs");
var elastic = require("elasticsearch");

var fileLocation = process.argv[2];
var mediaName = process.argv[3];

fileSystem.readFile(fileLocation, "utf-8", function(err, contents) {
    var captionLines = contents.split(/\r?\n/);

    var currentCaptionLines = [];
    for(var i = 0; i < captionLines.length; i++) {
        var line = captionLines[i];

        if(line.trim() == "") {
            var caption = makeCaptionFromLines(currentCaptionLines);
            indexCaption(caption, mediaName);

            currentCaptionLines = [];
        }
        else {
            currentCaptionLines.push(line);
        }
    }
});

function makeCaptionFromLines(captionLines) {
    var caption = {};

    var numberLine = captionLines[0];
    var timeStampLine = captionLines[1];
    var textLines = captionLines.slice(2);

    caption.number = numberLine;
    
    try{
    	var delimitedTimestamp = timeStampLine.split(" ");
    	caption.start = srtStampToMil(delimitedTimestamp[0]);
    	caption.end = srtStampToMil(delimitedTimestamp[2]);

    	caption.text = textLines.join("\n");
    }catch(error){

    	console.log(error)
    }

    return caption;
}

function indexCaption(caption, mediaName) {
    caption.media = mediaName;

    var client = new elastic.Client({
        host: "localhost:9200"
    });

    client.index({
        index: "gif-fodder",
        type: "caption",
        body: caption
    }, function(error, response) {
        if(error) {
            console.log(error);
        }
        else {
            console.log(response);
        }
    });
}

function srtStampToMil(stamp) {
    var stampDelimited = stamp.split(/[:,]/);

    var mils = parseInt(stampDelimited[3]);
    var secsAsMils = parseInt(stampDelimited[2]) * 1000;
    var minsAsMils = parseInt(stampDelimited[1]) * 1000 * 60;
    var hoursAsMils = parseInt(stampDelimited[0]) * 1000 * 60 * 60;

    milliseconds = mils + secsAsMils + minsAsMils + hoursAsMils;

    return milliseconds;
}
