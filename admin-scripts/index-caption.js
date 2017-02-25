var captions = [];

var fileSystem = require("fs");
var fileLocation = process.argv[2];

fileSystem.readFile(fileLocation, "utf-8", function(err, contents) {
    var captionLines = contents.split(/\r?\n/);

    var currentCaptionLines = [];
    for(var i = 0; i < captionLines.length; i++) {
        var line = captionLines[i];

        if(line.trim() == "") {
            var caption = makeCaptionFromLines(currentCaptionLines);
            indexCaption(caption);

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

    var delimitedTimestamp = timeStampLine.split(" ");
    caption.start = srtStampToMil(delimitedTimestamp[0]);
    caption.end = srtStampToMil(delimitedTimestamp[2]);

    caption.text = textLines.join("\n");

    return caption;
}

function indexCaption(caption) {
    console.log(caption);
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
