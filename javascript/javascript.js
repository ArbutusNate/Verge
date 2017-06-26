// Variables
	var current = {};
	var locobj = [
			[0,0,0], 		// 0 - verge
			[-1,0,0],		// 1 - trackwest1
			[-2,0,0],		// 2 - trackwest2
			[-3,0,0],		// 3 - waterfallcliff
			[-3,1,-1],		// 4 - cliff1
			[-2,1,0],		// 5 - hiddenpath
			[-2,2,0],		// 6 - hiddenpath2
			[-3,2,0],		// 7 - fallstop
			[-3,3,0]		// 8 - mechanism
			];
	var tempindex = 0;
	var player = {
		currentloc : [0,0,0],
		inventory : []
	};
	var move = "";
// Effect variables
	var waterfall = false
// World
	var world = [
		{name: "verge",
		location: [0,0,0],
			visited: false,
			description: "You find yourself at the edge, at a crossroads. Dappled sunlight filters through the trees on the verge of a great forest as their terminal boughs stretch over patchy grass. The sound of pollinating insects and birds fill the air and the smell of warm grass wafts towards you from the south on the occasional breeze. Just beside you are the remains of a faded signpost. Beneath your feet is the crossing of two roads. One is a footpath that travels approximately south and north, the other a track that winds in and out of shadow as it follows the edge of the forest. The northern path plunges into the forest and is quickly lost amongst the trees. To the east the track heads off towards a massive windmill just visible above the trees. The southern path appears to lead across rolling golden plains forever. In the middle distance a thin line of smoke rises as if from a cookfire. ",
			revisit: "You are back at the crossroads at the verge of the forest. ",
			directions: ["W"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}],
			effects: [{status: waterfall,
				efalse:"From the west you can faintly hear the sound of running water. ",
				etrue:"The path heads west towards a ravine."}]
		},
		{name: "trackwest1",
		location : [-1,0,0],
			visited: false,
			description: "A breeze barely stirs the branches above your head. The track lies mainly in the tall, sunny grass, but occasionally leads you into the park-like interface of shade and sun. The ground here is covered in thick duff. ",
			revisit: "You are on a path in woods. To the east through the trees you can just make out a worn signpost. ",
			directions: ["E","W"],
			item: [
				{name: "Stick", idesc: "There is a sturdy-looking stick on the ground. "}
				],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}],
			effects: [{status:"waterfall",
				efalse:"From the west you hear the rumble of water. ",
				etrue:"The drone of insects and the sound of birds is all you can hear."}]
		},
		{name: "trackwest2",
		location : [-2,0,0],
			visited: false,
			description: "Verdant life closes around you. The path leads you further into the forest, which is thicker and more green. An uneven wind blows gently around the trunks of the trees and the air feels different on your skin. To your north there is a sign of disturbance - a few broken branches here and there. To the east you can just make out the edge of the forest as a spot of summer light in an otherwise emerald glade. ",
			revisit: "You are on a path in the forest. To the east the path leads towards the edge of the forest. ",
			directions: ["N", "E", "W"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}],
			effects: [{status:"waterfall",
				efalse:"The rumble of a waterfall can be heard to your west. ",
				etrue:"The call of a strange foreign bird is carried on the still air. "}]
		},
		{name: "waterfallcliff",
		location : [-3,0,0],
			visited: false,
			description: "The plant life here is thick and lush, but the trees themselves give way as you near the edge of a cliff. The rocks are slick and the ground carpeted with deep green moss. The trees around you wave eternally on the wind. To the east the path retreats into the forest. A narrow path descends down the cliff face and north towards the cataract. ",
			revisit: "You are on a clifftop path which leads east back into the forest, and north, down to a grotto at the base of the falls. ",
			directions: ["N", "E"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"N": "down"}],
			effects: [{status:"waterfall",
				efalse:"The thundering of a waterfall is all you can hear, and the cold mist settles on you as it's blasted past on a gale wrought from falling water. ",
				etrue:"The ravine is clear of mists and the far side is wooded and surprisingly close."}]
		},
		{name: "cliff1",
		location : [-3,1,-1],
			visited: false,
			description: "You are halfway down a tall and slick cliff. The ravine is narrow and abrupt and climbs just as quickly on the opposite side of the river. ",
			revisit: "You are on a cliffside path. ",
			directions: ["S"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"N":"down"},{"S":"up"}],
			effects: [{status:"waterfall",
				efalse:"Through the mist to your north you can just make out the torrent of water. A buffeting wind whips the mist into a horizontal storm, blasting south. The narrow path you are on slopes down towards the north and the base of the falls, but is made impassable by the falling water. It travels up and south towards the edge of the ravine. ",
				etrue:"Mist settles on the moss around you but the falls are dry. Across a deep pool to your north you can see the entrance to a tunnel. The path climbs south to the lip of the ravine."}]
		},
		{name: "hiddenpath",
			location : [-2,1,0],
			visited: false,
			description: "The forest presses in around you but you can follow the signs of passage ahead of you. ",
			revisit: "You are on a barely-visible trail, enclosed in trees. ",
			directions: ["N", "S"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}],
			effects: [{status:"waterfall",
				efalse:"The roar of a waterfall sounds close to your west. ",
				etrue:"Besides occasional birdsong, it is quiet here. "}]
		},
		{name: "hiddenpath2",
			location : [-2,2,0],
			visited: false,
			description: "At the base of a large tree the path veers abruptly west. ",
			revisit: "At the base of a large tree the path veers abruptly west. ",
			directions: ["W", "S"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}],
			effects: [{status:"waterfall",
				efalse:"",
				etrue:""}]
		},
		{name: "fallstop",
			location : [-3,2,0],
			visited: false,
			description: "You are on the bank of a river, just upstream of a large cliff. ",
			revisit: "",
			directions: ["N","E"],
			item: [{name: "Rusty Knife", idesc: "In a mass of debris piled high by some flood, you see the handle of a blade. "}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}],
			effects: [{status:"waterfall",
				efalse:"Water, smooth as glass, pours over the edge and plummets down. The sound is muted in the mists filling the valley below. To your north along the river, there is a large gate suspended over the river. ",
				etrue:"The riverbed here is dry, as are the falls. "}]
		},
		{name: "mechanism",
			location : [-3,3,0],
			visited: false,
			description: "",
			revisit: "",
			directions: ["S"],
			item: [{name: "", idesc: ""}],
			action: [{effectvar: "waterfall", item:"Rusty Knife", adesc: "You saw on the rope with the rusty knife. After a few seconds the threads begin to give and with a loud crack the rope whips away from you. The gate crashes into the water, then sinks a few more inches into the mud. The rope dangles from its pulley well out of reach. Even louder than the crash of the barrier is the silence that follows as the falls trickle into silence. "}],
			elev: [{"":""}],
			effects: [{status:"waterfall",
				efalse:"You stand at the edge of a mostly-empty basin. Where the river leaves the basin, a huge, ramshackle gate is suspended over the river by a rope. The rope is firmly attached to a nearby tree, its knots drawn tight be the weight of the mechanism.",
				etrue:"The gate is embedded in the muddy riverbed, and the cistern behind has began to fill, inch by inch. "}]
		},
		//New Location Template//
			{name: "",
				location : [0,0,0], 				// X, Y, Z coordinates
				visited: false,						// Visited boolean
				description: "",					// Description when you first arrive or look around
				revisit: "",						// Brief description of location
				directions: [],						// Available directions from this location
				item: [{name: "", idesc: ""}],		// Name and description (displayed when the item is on the ground) of an item
				action: [{							// Interaction with items at this location
					effectvar:"",					// Name of the global boolean for this effect
					item:"",						// Item required for interact
					adesc: ""}],					// Discription displayed when action is taken
				elev: [{"":""}],					// One or more objects (like {"N":"down"},{"S":"up"}).
				effects: [{status:"waterfall",		// Variable text depending on global changes. Status is a string
					efalse:"",						// Text to display BEFORE interation
					etrue:""}]						// Text to display AFTER interaction
			},
		//New Location Template//
	];
// Navigation Functions
	function updown(){
		var tempelev = {};
		for(i = 0; i < current.elev.length; i++){
			tempelev = current.elev[i];
			if(tempelev[move] === "down"){
				player.currentloc[2]--;
				console.log("down");
			}
			if(tempelev[move] === "up"){
				player.currentloc[2]++;
				console.log("up");
			}
		}
	}
// Text-Printing Functions
	// fullprint() subfunctions
		function itemprint(t){
			debugger;
			var newtext = $("<p style=display:none>")
			var statusvar = current.effects[0].status
			var effectcheck = window[(current.effects[0].status)]
			// var currenteffect = caction.effectvar
			// if(effectcheck === undefined){};
			if(effectcheck === false || effectcheck === undefined){
				newtext
					.text(current[t] + current.item[0].idesc + current.effects[0].efalse)
					.appendTo(".textarea")
					.fadeIn(3000)
			};
			if(effectcheck === true){
				newtext
					.text(current[t] + current.item[0].idesc + current.effects[0].etrue)
					.appendTo(".textarea")
					.fadeIn(3000)
			};
			$(".textarea").animate({scrollTop: 9000}, 3000);
		};
		function atlocation(){
			console.log("Player location is " + player.currentloc + ".")
			console.log(current);
			$(".db")
				.prop('disabled', true)
				.addClass("disabled");
			for (var i = 0; i < current.directions.length; i++) {
				var dirvar = current.directions[i];
				$("#" + dirvar)
					.prop('disabled', false)
					.removeClass("disabled");
			}
			if(current.visited === false){
				world[tempindex].visited = true;
				itemprint("description");
			} else {
				itemprint("revisit")
			};
		};
		function checklocation(){
			var hash = {};
			var val = player.currentloc;
			for(var i = 0 ; i < locobj.length; i += 1) {
			    hash[locobj[i]] = i;
			}
			if(hash.hasOwnProperty(val)) {
				current = world[hash[val]];
				tempindex = hash[val];
			    console.log(hash[val]);
			}
		};
	function fullprint(){
		updown();
		checklocation();
		atlocation();
	};
// Button Functions
	function north(){
		move = "N"
		player.currentloc[1]++;
		fullprint();
	};
	function east(){
		move = "E"
		player.currentloc[0]++;
		fullprint();
	};
	function south(){
		move = "S"
		player.currentloc[1]--;
		fullprint();
	};
	function west(){
		move = "W"
		player.currentloc[0]--;
		fullprint();
	};
	function grab(){
		if(current.item[0].name !== ""){
			var itemswitch = current.item[0].name;
			world[tempindex].item = [{name: "", idesc: ""}];
			player.inventory.push(itemswitch);
		var itemdiv = $("<div class=inventoryitem>")
		itemdiv
			.attr("data-name", itemswitch.toLowerCase())
			.text(itemswitch)
			.appendTo(".inventory")
			.fadeIn(3000);
		var newtext = $("<p style=display:none>")
		newtext
			.text("You grab the " + itemswitch + " and put it in your bag.")
			.appendTo(".textarea").fadeIn(3000)
		}
		$(".textarea").animate({scrollTop: 9000}, 3000);
	};
	function use(){
		debugger;
		console.log(this);
		var caction = current.action[0]
		var itemcheck = this.innerHTML; // Store the name of the item clicked
		var currenteffect = caction.effectvar // Check current for name of effect being modified
		if(itemcheck === caction.item){
			console.log("useable")
			var newtext = $('<p style=display:none>');
			newtext
				.text(caction.adesc + current.effects[0].etrue) // Append action and effect text
				.appendTo(".textarea").fadeIn(3000)
			$(".textarea").animate({scrollTop: 9000}, 3000);
			window[(currenteffect)] = true
			$(this).hide();

		}
	};
	function look(){
		itemprint("description");
	};
// Event Handlers
	$(document).ready(function(){
		current = world[0];
		atlocation();
	});
	// $(document).on("click", ".disabled", disabled)
	$(document).on("click", "#N", north);
	$(document).on("click", "#E", east);
	$(document).on("click", "#S", south);
	$(document).on("click", "#W", west);
	$(document).on("click", "#look", look);
	$(document).on("click", "#grab", grab);
	$(document).on("click", ".inventoryitem", use);