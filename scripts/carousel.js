$(document).ready(function(){

	// Store the links to the images
	var imageList = [  
		"http://www.dunbartutoring.com/wp-content/themes/thesis/rotator/sample-1.jpg",
		"http://upload.wikimedia.org/wikipedia/commons/b/b3/Stock_fire.JPG",
		"http://fc01.deviantart.net/fs17/f/2007/129/7/4/Stock_032__by_enchanted_stock.jpg"
	]
	
	// initial set up of image sources for previews and index 
	var currentImageIndex = 0;	
	$('#prevPreview img').attr("src", imageList[2]);
	$('#nextPreview img').attr("src", imageList[1]);
	
	var carousel = $('#carousel'),
		carouselUL = $('#carousel ul'),
		carouselLI = $('#carousel li');

	// Calculate the width of the li items
	var item_width = carouselLI.outerWidth(); 	
	// Calculate the left position of all the li items' width
    var left_value = item_width * (-1);     

    // Place the last li item before the first one because
    // the user may press the previous button before the next one
    $('#carousel li:first').before($('#carousel li:last'));
    
    // Set the left property of the entire list to be the left position
    // that we calculated before.
    carouselUL.css({'left' : left_value});
	
	// When one of the arrows is clicked
	$('.navArrow').click(function() { 
							
		// variable declarations
		var nextIndex, prevIndex, left_indent, 
			dir = event.target.id;	// stores which direction was pressed		
		
		// determine the value we need to animate the left property by
		if (dir == "prev") { 
			left_indent = parseInt(carouselUL.css('left')) + item_width;
		}
		else {
			left_indent = parseInt(carouselUL.css('left')) - item_width;
		}		
        
        // Animate the selected image of the list
        carouselUL.animate({'left' : left_indent}, 200,function(){    
            
	        // depending on which arrow was pressed change the order of li's
	        if(dir == "prev") {
	    		// move the last item before the first item
	    		$('#carousel li:first').before($('#carousel li:last'));

	    		// handle the currentImageIndex reaching the min number and reset
	    		if (currentImageIndex == 0) { 
	        		currentImageIndex = 2;
	        	}
	        	// otherwise just decrement the index
	        	else {  
	        		currentImageIndex--;
	        	} 
	        } else{
	        	//move the first item and put it as last item     
	        	$('#carousel li:last').after($('#carousel li:first'));        		
	        	// handle the currentImageIndex reaching the max number and reset
	        	if (currentImageIndex == (imageList.length - 1)){ 
	        		currentImageIndex = 0;
	        	}
	        	// otherwise just increment the index
	        	else {  
	        		currentImageIndex++;
	        	}	        	
	        }

	        // depending on what index we are on, manipulate the other variables to suit
	       	switch(currentImageIndex){ 
				case 0:
					nextIndex = 1;
					prevIndex = 2;
					break;
				case 1:
					nextIndex = 2;
					prevIndex = 0;
					break;
				case 2:
					nextIndex = 0;
					prevIndex = 1;
					break;
				default: 
					break;
			}
			
			// update the prev and next previews to have the correct images		
			$('#prevPreview img').attr("src", imageList[prevIndex]);
			$('#nextPreview img').attr("src", imageList[nextIndex]);
	                     
	        //set the list to correct position based on the width of the li's
	        carouselUL.css({'left' : left_value});        
        });	
	});	
});