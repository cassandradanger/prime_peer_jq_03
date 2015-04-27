var apikey = 'ba7280b6a052562af59a3776f9607c43984e6b6a';

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
	for(var i = 0; i < results.length; i++){
		
			$(".container").children().next().append(
			"<div class = 'col-md-4 resultClick'><div class='button'><img src = " 
			+ results[i].image.icon_url + 
			"></div><div class = 'title'> <strong>Name:</strong> " 
			+ results[i].name + 
			"</div><div class='extraInfo'><strong>Description:</strong> " 
			+ results[i].deck + 
			"<br><strong>Platform:</strong> " 
			+ results[i].platforms[0].name + 
			"<br><strong>Release Date:</strong> " 
			+ results[i].original_release_date + 
			"</div></div>");
			if(i % 3 ==0){
				$(".container").append("<div class='row'></div>")
			}
}
    console.log(results);
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
