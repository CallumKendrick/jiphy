// server.js (Express 4.0)
var express = require('express'),
  app = express();

// SERVER CONFIGURATION
app.use(express.static(__dirname + '/../')); // set the static files location /public/img will be /img for users

app.listen(8001);

console.log('Go to localhost:8001');
var elastic = require("elasticsearch").Client({
    host: "localhost:9200"
});
var fs = require('fs')

app.get("/search", function(req, res) {
    var searchTerm = req.query.search_term;

    elastic.search({
        body: {
            query: {
                match: {
                    text: searchTerm
                }
            }
        }
    },
    function(error, response) {
        if(error) {
            res.send(JSON.stringify({error : "sorry"}));
        }
        else {
            var hits = response.hits.hits;
            var results = [];
            for (var i = 0; i < hits.length; i++) {
                var hit = hits[i]._source;
                var hitMeta = hits[i];

                var result = {
                    id: hitMeta._id,
                    caption: hit.text,
                    thumbnail: getThumbnail(hit.media, hit.start, hit.end)
                };

                results.push(result);
            }
            res.send(JSON.stringify(results));
        }
    });
});

app.get("/components", function(req, res) {
    var id = req.query.id;

    elastic.get({
            index: "gif-fodder",
            type: "caption",
            id: id
    },
    function(error, response) {
        var hit = response._source;

        var gifComponents = {
            media: hit.media,
            caption: hit.text,
            captionNumber: hit.number,
            frames: time_to_frames(hit.media, hit.start, hit.end)
        };

        res.send(JSON.stringify(gifComponents));
    });
});

function time_to_frame(media, timestamp){
        var contents = fs.readFileSync('/frames/' + media + '/META', 'utf8');

        console.log(contents)

        var meta = {};
        var frame = "nothing";

        contents.split("\n").forEach(function(line){

                var key_value = line.split(" : ");
                meta[key_value[0]] = +key_value[1];

        });

        frame = "" + (Math.floor((timestamp / meta.duration) * meta.framecount) + 1);
        while(frame.length < 4){

		frame = "0" + frame;
        }

        return frame;
}

function time_to_frames(media, start, end){
        var contents = fs.readFileSync('/frames/' + media + '/META', 'utf8');

        console.log(contents)

        var meta = {};
        var frames = [];

         contents.split("\n").forEach(function(line){

                var key_value = line.split(" : ");
                meta[key_value[0]] = +key_value[1];

        });

        start = Math.floor((start / meta.duration) * meta.framecount) + 1;
        end = Math.floor((end / meta.duration) * meta.framecount) + 1;
        while (start < end) {

                var frame = "" + start;
                while(frame.length < 4){
                        frame = "0" + frame;
                }
                frames = frames.concat("frames/" + media + "/thumb" + frame + ".jpg");
                start++;
        }
        return frames;

}

function getThumbnail(media, start, end) {
    return "/frames/" + media + "/thumb" + time_to_frame(media, start) + ".jpg";
}

function getFrames(media, start, end) {
    return [
        "/frames/" + media + "/thumb001.jpg",
        "/frames/" + media + "/thumb002.jpg"
    ]
}

