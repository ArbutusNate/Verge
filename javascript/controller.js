// Global Variables

var World, fullContent, _localStorage, current, $textToAdd;
var playerLocation = '0,0,0';
const $NewText = (fullContent) => {
  // Builds <p> DOM element
    return $textToAdd = $(`<p class="story"> ${fullContent} </p>`)
}

// Functions

const getZone = (playerLocation) => { //Called from movePlayer and on startup
  // set up current, the object that contains world description
  current = World[playerLocation];
  // Pass current AND playerLocation in because there's so much to check
  checkEverything(current, playerLocation);
  // Once text is assembled in checkEverything, we're ready to DOM
  $NewText(fullContent);
  //Append <p> to text box.
  $('#text-box').append($textToAdd);
  // Save changes to localStorage
  saveChangesLocal(playerLocation, "location");
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
    let groundItems = current.items || [];
    let inventory = _localStorage.items;
    // Add all item text
    groundItems.forEach((i) => {
      if(inventory.includes(i.name)) {
        console.log('already have item disregarding');
      } else {
        fullContent = fullContent + i.idesc
      }
    })
  } else {
    // fullContent = fullContent;
  }
  // checkEffect
  if(checkEffect(current)) {
    // Effects found.
    console.log('effects');
    let array = current.effects;
    let playerEffects = _localStorage.effects;
    // Loop thru current effects...
    array.forEach((i) => {
      // Determine players event status
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
  let alreadyVisited = _localStorage.visited;
  if (alreadyVisited.includes(playerLocation)) {
    return true //visted
  } else {
    return false //unvisted
  }
}

const checkItem = (current) => {
  let inventory = _localStorage.items
  let ground = current.items || []
  if(current.hasOwnProperty("items") && !(inventory.includes(ground))) {
    console.log('item detected');
    return true //there is an item
  } else {
    return false
  }
}

//This needs work...need to specify effect somehow
const checkEffect = (current) => {
  let playerEffects = _localStorage.effects;
  let currentLocationEffects = current.effects;
  if(current.hasOwnProperty("effects")) {
    return true // there are effects
  } else {
    return false
  }
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
      // console.log('triggering on ' + direction)
      $(this).removeAttr('disabled');
    }
  })
}

//Saves changes in localStorage
const saveChangesLocal = (data, type) => {
  switch(type) {
    case "location":
      console.log('saving location');
      // if already visited, do nothing
      if (checkVisit(data)){
        return
      } else {
      // if unvisited save location as visited
        let alreadyVisited = _localStorage.visited;
        let nowVisited = alreadyVisited + ';' + data;
        localStorage.setItem('visited', nowVisited);
        console.log(localStorage.getItem('visited'));
      }
      break;
    case "items":
      console.log('saving items');
      let alreadyHave = _localStorage.items;
      if(!alreadyHave.includes(data)){
        let nowHave = alreadyHave + ';' + data;
        localStorage.setItem('items', nowHave);
      } else {
        return
      }
      break;
    case "effects":
      console.log('saving effects');
      break;
    case "takenItems":
      console.log('saving a new taken item');
      let alreadyTaken = _localStorage.takenItems;
      if(!alreadyTaken.includes(data)){
        let nowTaken = alreadyTaken + ';' + data;
        localStorage.setItem('takenItems', nowHave);
      }
      break;
    default:
      break;
  }
}

const takeItem = (current) => {
  if(current.items != undefined){
    let itemToTake = current.items[0].name;
    saveChangesLocal(itemToTake, 'items');
    saveChangesLocal(itemToTake, 'takenItems');
  } else {
    console.log('no items!');
    $NewText('There is nothing to take here');
    
  }
}

// Startup/Controller
$().ready( () => {
  // AJAX call for World.JSON
  let worldImport = $.getJSON('javascript/world.json', () => {
    // Get rid of AJAX metadata
    // debugger;
    World = worldImport.responseJSON.world
    // Initializes local storage
    // if(localStorage.visited) {
      localStorage.setItem('visited', '');
      localStorage.setItem('effects', '');
      localStorage.setItem('items', 'cheese');
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
  $('.take').on('click', function(){
    takeItem(current);
  })
});
