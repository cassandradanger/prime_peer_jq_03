var apikey = 'ba7280b6a052562af59a3776f9607c43984e6b6a';

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
	for(var i = 0; i < results.length; i++){
	$(".container").append("<div class = 'row'>Name: " + results[i].name + "<br/><img src = " + results[i].image.thumb_url + "><div class='extraInfo'>Description: " + results[i].deck + "<br>Platform: " + results[i].platforms[0].name + "<br>Release Date: " + results[i].original_release_date + "</div></div>");
}
    console.log(results);
}

$(document).ready(function() {
	
	// Start the search here!
	search('batman');
	var count = 0;
	$(".container").on("click", ".row", function(){
		count++;
		if(count == 1){
		$(this).children().slideDown();
			
	} else {
		$(".extraInfo").slideUp("slow");
		count = 0;
	}
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
