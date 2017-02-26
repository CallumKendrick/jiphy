var express = require("express");
var elastic = require("elasticsearch").Client({
    host: "localhost:9200"
});
var LineByLineReader = require('line-by-line')

var app = express();

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
            caption: hit.caption,
            captionNumber: hit.number,
            frames: getFrames(hit.media, hit.start, hit.end)
        };

        res.send(JSON.stringify(gifComponents));
    });
});

function time_to_frame(media, timestamp){
	var = new LineByLineReader('/frames/' + media + 'META');
	
	var meta = {};
	var frame;
	
	
	lr.on('error', function (err) {
		// 'err' contains error object
	});

	lr.on('line', function (line) {
		var key_value = line.split(" : ");
		meta[key_value[0]] = +key_value[1];

	});

	lr.on('end', function () {
		frame = "" + Math.floor((meta.duration / timestamp) * meta.framecount) + 1;
		while(frame.length < 6({
			frame-= "0";
		} 
	});
	
	return frame;	
}

function getThumbnail(media, start, end) {
    return "/frames/" + media + "/thumb001.jpg";
}

function getFrames(media, start, end) {
    return [
	"/frames/" + media + "/thumb001.jpg",
	"/frames/" + media + "/thumb002.jpg"
    ]
}

app.listen(3000);
