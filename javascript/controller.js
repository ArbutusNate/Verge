// Global Variables

var World, fullContent, _localStorage;
var playerLocation = '0,0,0';
const $NewText = (fullContent) => {
  // Builds <p> DOM element
    return $textToAdd = $(`<p class="story"> ${fullContent} </p>`)
}

// Functions

const getZone = (playerLocation) => { //Called from movePlayer and on startup
  // Find the location in World.JSON
  console.log('getZone running');
  // set up current, the object that contains world description
  let current = World[playerLocation];
  // Pass current AND playerLocation in because there's so much to check
  checkEverything(current, playerLocation);
  // Once text is assembled in checkEverything, we're ready to DOM
  $NewText(fullContent);
  //Append <p> to text box.
  $('#text-box').append($textToAdd);
  // Save changes to localStorage
  saveChangesLocal(playerLocation);
  // Check movement options and disable unusable buttons
  checkMovementOptions(current);
}

const movePlayer = (clicked) => {
  // Turn string coordinates to array.
  let locationArray = playerLocation.split(",").map(Number);
  console.log(locationArray);
  //Get data from DOM buttons.
  let index = parseInt(clicked.attr("data-index")); //maybe map through attributes if I get more?
  let change = parseInt(clicked.attr("data-value"));
  //Effect change on array according to buttons
  locationArray[index] += change;
  //Turn array back into string.
  playerLocation = locationArray.join();
  getZone(playerLocation);
}

//Check Everything
const checkEverything = (current, playerLocation) => { //Called from getZone
  // checkVisit
  checkVisit(playerLocation) ?
    fullContent = current.revisit :
    fullContent = current.description;
  // checkItem
  if(checkItem(current)) {
    let array = current.items;
    array.forEach((i) => {
      fullContent = fullContent + i.idesc
    })
  } else {
    fullContent = fullContent;
  }
  // checkEffect
  if(checkEffect(current)) {
    console.log('effects');
    let array = current.effects;
    let playerEffects = _localStorage.effects;
    array.forEach((i) => {
      if(playerEffects.hasOwnProperty(i.name)) {
        fullContent = fullContent + i.echanged;
      } else {
        fullContent = fullContent + i.einitial;
      }
    })
  } else {
    console.log('no effects');
  }
}


//Checks which message to display (visit or revisit) called from saveLocal too
const checkVisit = (playerLocation) => {
  // debugger;
  // console.log('checkVisit Running');
  let alreadyVisited = _localStorage.visited;
  if (alreadyVisited.includes(playerLocation)) {
    return true //visted
  } else {
    return false //unvisted
  }
}


const checkItem = (current) => {
  // debugger;
  // let inventory = _localStorage.items;
  if(current.hasOwnProperty("items")) {
    console.log('item detected');
    return true //there is an item
  } else {
    return false
  }
}


//This needs work...need to speicify effect somehow
const checkEffect = (current) => {
  let playerEffects = _localStorage.effects;
  // playerEffects = playerEffects.keys();
  let currentLocationEffects = current.effects;
  if(current.hasOwnProperty("effects")) {
    // console.log('effects');
    return true
  } else {
    // console.log('no effects');
    return false
  }
  // currentLocationEffects = currentLocationEffects.keys();
  // currentLocationEffects.forEach(function(i) {
  //   if(playerEffects.includes(i)) {
  //     // Specify in here somewhere...somehow?
  //     return true
  //   } else {
  //     return false
  //   }
  // })
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
    // if(localStorage.visited) {
      localStorage.setItem('visited', '');
      localStorage.setItem('effects', '');
      localStorage.setItem('items', '');
      localStorage.setItem('taken_items', '');
    // } else {
    //   return
    // };
    _localStorage = localStorage;
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
