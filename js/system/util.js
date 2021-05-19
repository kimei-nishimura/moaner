

function M_MOANER_logDebug(msg){}

function startDebug(){
	M_MOANER_logDebug =(msg) =>{
		console.log("DEBUG: "+msg);
	};
}

function stopDebug(){	
	M_MOANER_logDebug =(msg) =>{
		console.log("DEBUG: "+msg);
	};
}

let MoanerIsLoaded;

MoanerLoginListener();

async function MoanerLoginListener() {
  while (!MoanerIsLoaded) {
    try {
      while ((!window.CurrentScreen || window.CurrentScreen == "Login" || (typeof window.CursedStarter === "function" && window.cursedConfig === undefined)) && !MoanerIsLoaded) {
		  //console.log("cherche isLoaded");
		  //console.log("window.CurrentScreen="+window.CurrentScreen);
        await new Promise(r => setTimeout(r, 2000));
      }
	  //console.log("window.CurrentScreen="+window.CurrentScreen);
	  //console.log("MoanerIsLoaded trouvé");
      MoanerIsLoaded = true; 
	  M_MOANER_MoanerInitAlteredFns();
	  M_MOANER_initControls();
      
    } catch (err) { console.log(err); }
    await new Promise(r => setTimeout(r, 2000));
  }
}

function M_MOANER_getKeys(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

function M_MOANER_shuffle(array,seed) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to M_MOANER_shuffle...
  while (0 !== currentIndex) {
	seed=M_MOANER_getRandomNumber(seed);

    // Pick a remaining element...
    randomIndex = seed%(array.length-1);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function M_MOANER_sendMessageToWearer(msg){
	ServerSend("ChatRoomChat", {
		Type: "Action",
		Content: "gag",
		Target: Player.MemberNumber,
		Dictionary: [{Tag: "gag", Text: msg}],
	});
}

function M_MOANER_getRandomNumber(seed){
	let number=Math.floor(Math.abs(Math.sin(seed)*1000));
	return number;
}