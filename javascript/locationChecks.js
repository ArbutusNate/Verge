//Check Everything
export function checkEverything(current, playerLocation){ //Called from getZone
  // checkVisit
  checkVisit(playerLocation) ?
    fullContent = current.revisit :
    fullContent = current.description;
  // checkItem
  if(checkItem(current)) {
    let groundItems = current.items;
    let inventory = _localStorage.items;
    // Double check to see if player has the item already
    groundItems.forEach((i) => {
      if(inventory.includes(i.name)) {
        console.log('already have item disregarding');
      } else {
        fullContent = fullContent + i.idesc
      }
    })
  } else {
    // leave fullContent the same
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
  // console.log('checkVisit Running');
  let alreadyVisited = _localStorage.visited;
  if (alreadyVisited.includes(playerLocation)) {
    return true //visted
  } else {
    return false //unvisted
  }
}


const checkItem = (current) => {
  let inventory = _localStorage.items
  let ground = current.items
  // debugger;
  // ground.forEach((i) => {
  //   if(!inventory.includes(i.name)){
  //     console.log('already have item, disregarding');
  //   } else {

  //   }
  // })
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