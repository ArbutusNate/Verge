// Global Variables

var World;
var playerLocation = '0,0,0';
const $NewText = (fullContent) => {
  // Builds <p> DOM element
    return $textToAdd = $(`<p class="story"> ${fullContent} </p>`)
}

// Functions

const getZone = (playerLocation) => { //Called from movePlayer
  // Find the location in World.JSON
  let current = World[playerLocation];
  let $textToAdd;
  // Set up DOM element
  // !checkVisit(playerLocation) ?
  //   $textToAdd = $NewText(current.description)
  //   :
  //   $textToAdd = $NewText(current.revisit)
  checkEverything(playerLocation);
  //Append <p> to text box.
  $('#text-box').append($textToAdd);
  // Save changes to localStorage
  saveChangesLocal(playerLocation);
  // Check movement options and disable unusable buttons
  checkMovementOptions(current);
}

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
}

//Check Everything
const checkEverything = (playerLocation) => {
  let fullContent;
  let effect;
  checkVisit(playerLocation) ?
    fullContent = current.revisit :
    fullContent = current.description;
  checkItem(playerLocation) ?
    fullContent + current.item.idesc :
    fullContent = fullContent;
  checkEffect(playerLocation) ?
    fullContent + current.

  // checkVisit
  // checkItem
  // checkEffect

}


//Checks which message to display (visit or revisit)
const checkVisit = (playerLocation) => {
  let alreadyVisited = localStorage.getItem('visited');
  if (alreadyVisited.includes(playerLocation)) {
    return true
  } else {
    return false
  }
}

const checkItem = (playerLocation) => {
  if(playerLocation.item === "") {
    return false
  } else {
    return true
  }
}


//This needs work...need to speicify effect somehow
const checkEffect = (playerLocation) => {
  let playerEffects = localStorage.getItem('effects');
  playerEffects = playerEffects.keys();
  let currentLocationEffects = playerLocation.effects;
  currentLocationEffects = currentLocationEffects.keys();
  currentLocationEffects.forEach(function(i) {
    if(playerEffects.includes(i)) {
      // Specify in here somewhere...somehow?
      return true
    } else {
      return false
    }
  })
}

//Checks which way the player can move from their current location
const checkMovementOptions = (playerLocation) => {
  //Gets possible directions from World
  let movementOptions = playerLocation.directions;
  console.log(movementOptions);
  // Runs thru all buttons...
  $('.mvmt').each(function() {
    // Disables them all...
    $(this).attr('disabled', 'disabled');
    let direction = $(this).attr('data-direction');
    // And reenables those that can used...
    if((movementOptions).includes(direction)) {
      console.log('triggering on ' + direction)
      $(this).removeAttr('disabled');
    }
  })
}



//Saves changes in localStorage
const saveChangesLocal = (visited, effects, items) => {
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
    // Get rid of AJAX metadata
    World = worldImport.responseJSON.world
    // Initializes local storage
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
