// Global Variables

var World;
var playerLocation = '0,0,0';


// Functions

const movePlayer = (clicked) => {
  // Turn string coordinates to array.
  // debugger;
  let locationArray = playerLocation.split(",").map(Number);
  console.log(locationArray);
  //Get data from DOM buttons.
  let index = parseInt(clicked.attr("data-index")); //maybe map through attributes if I get more?
  let change = parseInt(clicked.attr("data-value"));
  //Effect change on array according to buttons
  locationArray[index] += change;
  //Turn array back into string.
  let newLocation = locationArray.join();
  // console.log(newLocation);
  playerLocation = newLocation;
  getZone(playerLocation);
  //Save Visits in local storage? cookies?
}

const getZone = (playerLocation) => {
  // Find the location in World.JSON.
  let current = World[playerLocation];
  let $textToAdd
  // Set up DOM element
  !checkVisit(playerLocation) ? 
    $textToAdd = $NewText('story', current.description)
    :
    $textToAdd = $NewText('story', current.revisit)
  //Append <p> to text box.
  $('#text-box').append($textToAdd);
  saveChangesLocal(playerLocation);
}

const $NewText = (htmlClass, content) => {
  // Builds <p> DOM element.
  return $(`<p class="${htmlClass}"> ${content} </p>`)
}

const checkVisit = (playerLocation) => {
  let alreadyVisited = localStorage.getItem('visited');
  console.log(`Already Visited: ${alreadyVisited}`);
  if (alreadyVisited.includes(playerLocation)) {
    return true
  } else {
    return false
  }
}

const saveChangesLocal = (visited, effects) => {
  // if already visited, do nothing
  if (checkVisit(visited)){
    return
  } else {
  // if unvisited save location as visited
    let alreadyVisited = localStorage.getItem('visited');
    let nowVisited = alreadyVisited + ';' + visited;
    localStorage.setItem('visited', nowVisited);
    console.log(localStorage.getItem('visited'))
  }
}

// Startup/Controller
$().ready( () => {
  // AJAX call for World.JSON
  worldImport = $.getJSON('javascript/world.json', () => {
  // Get rid of AJAX metadata.
  World = worldImport.responseJSON.world
  localStorage.setItem('visited', '');
  localStorage.setItem('effects', '');
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
