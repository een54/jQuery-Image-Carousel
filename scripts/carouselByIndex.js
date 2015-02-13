/**
 * Infinite carousel that doesn't use jQuery.
 * - Created: 13/02/2015
 * - By: Ian Hitchcox
 * - Contact: ian@competa.com
 */

$(document).ready(function(){

	// Store the links to the images
	var imageList = [  
		"http://www.dunbartutoring.com/wp-content/themes/thesis/rotator/sample-1.jpg",
		"http://upload.wikimedia.org/wikipedia/commons/b/b3/Stock_fire.JPG",
		"http://fc01.deviantart.net/fs17/f/2007/129/7/4/Stock_032__by_enchanted_stock.jpg"
	]	
	
	// initial set up of image sources for previews and index 
	var currentImageIndex = 0;	
	var prevPreviewImage = setImageSrc("prevPreview", (imageList.length - 1),imageList);
	var nextPreviewImage = setImageSrc("nextPreview", (currentImageIndex + 1),imageList);;
	
	var carousel = document.getElementById('carousel'),		
		carouselUL = document.querySelectorAll("#carousel ul"),
		carouselLI = document.querySelectorAll("#carousel li"),
		// The below returns a list of items but we only want the first one!
		navArrow = document.getElementsByClassName('navArrow');

	// Add an event listener for each of the arrows for when clicked
	for (var i = 0; i < navArrow.length; i++) {
    	navArrow[i].addEventListener('click',navArrowClicked,false);
	}

	/** 
	* Function called when one of the navigation arrows are clicked
	*	It handles changing the src attributes of each of the images.
	*	@param {string} directionClicked - This is the id of the arrow that was clicked 
	*	and represents which direction the user selected.
	*/
	function navArrowClicked (directionClicked) { 		
		// variable declarations
		var nextIndex, prevIndex,		
			// stores which direction was pressed		
			dir = event.target.id;	
		
		// Determine which direction the user selected.
		if (dir == "prev") { 					
			// handle the currentImageIndex reaching the min number and reset
    		if (currentImageIndex == 0) { 
        		currentImageIndex = 2;
        	}
        	// otherwise just decrement the index
        	else {  
        		currentImageIndex--;
        	} 
		}
		else { // User selected next			

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

		// update the src of the main image		
		setImageSrc("mainImage", currentImageIndex, imageList);
		// update the src of the prev and next previews images				
		setImageSrc("prevPreview", prevIndex, imageList);
		setImageSrc("nextPreview", nextIndex, imageList);
    };		
	
	/** 
	* Changes the src attribute of a given element 
	* using an image from a specified list
	* @param {string} elementId - This is the id of the element to change 
	* @param {int} indexOfImage - This is the index of the image array to use
	* @param {list} listOfImages - This is the list of images to use with the index
	*/
	function setImageSrc(elementId, indexOfImage, listOfImages) { 
		var element = document.getElementById(elementId);
		element.setAttribute("src", listOfImages[indexOfImage]);
		return element;
	}
});