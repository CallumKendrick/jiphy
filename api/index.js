var express = require("express");
var elastic = require("elasticsearch").Client({
    host: "localhost:9200"
});

var app = express();

app.get("/search", function(req, res) {
    var list = [];
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

function getThumbnail(media, start, end) {
    return "/frames/" + media + "/thumb001.jpg";
}

app.listen(3000);
