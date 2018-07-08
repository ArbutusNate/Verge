// Global Variables

var World;
var playerLocation = '0,0,0';


// Functions

const getZone = (playerLocation) => {
  // Find the location in World.JSON.
  let current = World[playerLocation];
  // Set up DOM element.
  let $textToAdd = $newText('story', current.description);
  //Append <p> to text box.
  $('#text-box').append($textToAdd);
}

const $newText = (htmlClass, content) => {
  // Builds <p> DOM element.
  return $(`<p class="${htmlClass}"> ${content} </p>`)
}

const movePlayer = (clicked) => {
  debugger;
  // Turn string coordinates to array.
  let locationArray = playerLocation.split(",").map(Number);
  console.log(locationArray);
  //Get data from DOM buttons.
  let index = clicked.attr("data-index");
  index = index.parseInt();
  console.log(index);
  let change = clicked.attr("data-value");
  console.log(change);

  // debugger;
  //Effect change on array according to buttons
  locationArray[index] += change;
  //Turn array back into string.
  let newLocation = locationArray.join();
  console.log(newLocation);
  playerLocation = newLocation;
}

// Startup/Controller
$().ready( () => {
  // AJAX call for World.JSON
  worldImport = $.getJSON('javascript/world.json', () => {
  // Get rid of AJAX metadata.
  World = worldImport.responseJSON.world
  // Fire it up
  getZone(playerLocation);
  });
});

//Listeners
$(window).on('load', () => {
  console.log(`ready`);
  $('.mvmt').on('click', function(){
    movePlayer($(this));
  });
});
