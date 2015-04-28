var apikey = 'ba7280b6a052562af59a3776f9607c43984e6b6a';

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
var count;
function searchCallback(results) {
	for(var i = 0; i < results.length; i++){
		var image = results[i].image.icon_url;
			var name = results[i].name;
			var description = results[i].deck;
			var releaseDate = "";
			releaseDate = new Date (results[i].original_release_date).toLocaleDateString();
			
		for(var j = 0; j < results[i].platforms.length; j++){
			var platforms = '';
			platforms += results[i].platforms[j].name +"<br>";

		}
		//var rowNum = 0;
		if(i % 3 == 0){	
			count = i;
			$(".container").append("<div class='row row" + count +"'></div>");
		} 

		$(".row" + count).append(
		"<div class = 'col-md-4 resultClick'><div class='button'><img src = " 
		+ image + 
		"></div><div class = 'title'> <strong>Name:</strong> " 
		+ name + 
		"</div><div class='extraInfo'><strong>Description:</strong> " 
		+ description + 
		"<br><strong>Platforms:<br></strong> " 
		+ platforms + 
		"<br><strong>Release Date:</strong> " 
		+ releaseDate + 
		"</div></div>");

	}
   
}

$(document).ready(function() {
	// Start the search here!
	$(".submit").on("click", function(){
		$(".container").empty();
		var gameSearch = $("#game_search").val();
		$("#game_search").val('');
		search(gameSearch);
	});
	
	$(".container").on("click", ".resultClick", function(){

		$(this).children().last().slideToggle("slow");
	
	});
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
