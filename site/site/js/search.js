$(function() {
    $("#gif-search").click(function() {
        $("#search-results").html(renderSearchResults());
    });

    function renderSearchResults() {
        var searchTerm = $("#search").val();

        $.get("/search", {search_term: searchTerm})
        .done(function(data) {
            console.log(data);
        })
        .fail(function(useless, error) {
            console.log(error);
        });
    }
});
