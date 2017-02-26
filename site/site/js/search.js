$(function() {
    $("#gif-search").click(function() {
        renderSearchResults();
    });

    function attachLinks() {
        var id = $(this).attr("id");

        $.get("/components", {id: id})
        .done(function(resultJson) {
            result = JSON.parse(resultJson);
            var frames = result.frames;
            var caption = result.caption;

            makeImgArray(frames, caption);
        });
    }

    function renderSearchResults() {
        $("#search-results").html("");

        var searchTerm = encodeURI($("#search").val());

        $.get("/search", {search_term: searchTerm})
        .done(function(results) {
            console.log(results);
            results = JSON.parse(results);
            var html = "";

            for(var i = 0; i < results.length; i++) {
                var result = results[i];

                html = html + "<li class='result' id='"+result.id+"'><img src='"+result.thumbnail+"'/><br/><small>"+result.caption+"</small></li>";
            }

            $("#search-results").html(html);
            $(".result").click(attachLinks);
        })
        .fail(function(useless, error) {
            console.log(error);
        });
    }
});
