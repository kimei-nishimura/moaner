//commande:
//@moaner feature commande
//feature: talk (quand on parle), orgasm, startVibrator, spank
//commande On, OFF


var moanerKey="bc_moaner_";

//commandes
const commandeOn="on";
const commandeOff="off";

//features
const featureTalk="talk";
const featureOrgasm="orgasm";
const featureVibrator="vibe";
const featureSpank="spank";
const featureHelp="help";
const featureVerbose="verbose";
const featureProfile="profile";

var talkActive=true;
var orgasmActive=true;
var vibratorActive=true;
var spankActive=true;
var verboseActive=true;
var firstHelpSeen=false;


var scriptStatus=["The moaner is active.","The moaner is not active."];
var orgasmStatus=["The orgasm moan is active. You will moan while cumming.","The orgasm moan is not active. You will not moan while cumming anymore."];
var vibratorStatus=["The vibes moan is active. If your vibrator's setting changes, you will moan.","The vibes moan is not active. If your vibrator's setting changes, you will not moan."];
var spankStatus=["The spank moan is active. You will moan while being spanked.","The spank moan is not active. You will not moan while being spanked."];
var talkStatus=["The talk moan is active. If you're vibed, you will moan while speaking.","The talk moan is not active. If you're vibed, you will not moan while speaking anymore."];
var verboseStatus=["Moaner is verbose.","Moaner is not verbose."];
var profileStatus=["No custom profile loaded.","Current moans profile: "];
var profileListIntro="Available moaning profiles: ";

var scriptHelp="Moaner commands available: /moaner help: show this help text. /moaner on: start the moaner. /moaner off: stop the moaner. /moaner talk on: start the talk moan. /moaner talk off: stop the talk moan. /moaner orgasm on: start the orgasm moan. /moaner orgasm off: stop the orgasm moan. /moaner vibe on: start the vibes moan. /moaner vibe off: stop the vibes moan. /moaner spank on: start the spank moan. /moaner spank off: stop the spank moan. /moaner verbose on: make the script verbose. /moaner verbose off: make the script not verbose. /moaner profile: show profiles help. /moaner profile [profile name]: use [profile name] moans";

var intro="Myrhanda Moaner installed. Type /moaner help for more informations.";
var unknownCommand="Unknown command";

function traiterCommande(msg){
	if(!msg.toLowerCase().startsWith("/moaner".toLowerCase())){
		return msg;
	}
	var list=msg.split(" ");
	var feature=list[1];
	var commande=list[2];
	if(feature==commandeOn||feature==commandeOff){
		scriptControl(feature);		
	}
	else if(feature==featureTalk){
		talkControl(commande);
	}
	else if(feature==featureOrgasm){
		orgasmControl(commande);
	}
	else if(feature==featureVibrator){
		vibeControl(commande);
	}
	else if(feature==featureSpank){
		spankControl(commande);
	}
	else if(feature==featureHelp){
		helpControl(commande);
	}
	else if(feature==featureVerbose){
		verboseControl(commande);
	}
	else if(feature==featureProfile){
		profileControl(commande);
	}
	else{
		sendUnknownCommand();
		return "";
	}
	saveControls();
	return "";
}

function sendUnknownCommand(){
	sendMessageToWearer(unknownCommand);
}

function initControls(){
	var datas=JSON.parse(localStorage.getItem(moanerKey+"_"+Player.MemberNumber));
	
	if(datas==null||datas==undefined){
		talkActive=true;
		orgasmActive=true;
		vibratorActive=true;
		spankActive=true;
		scriptOn=true;
		profileName="default";
		//saveControls();
	}else{
		talkActive=datas.talkMoan;
		orgasmActive=datas.orgasmMoan;
		vibratorActive=datas.vibeMoan;
		spankActive=datas.spankMoan;
		scriptOn=datas.script;
		profileName=datas.moanProfile;
	}	
	
}

function saveControls(){
	var controls={
		"talkMoan":talkActive,
		"orgasmMoan":orgasmActive,
		"vibeMoan":vibratorActive,
		"spankMoan":spankActive,
		"script":scriptOn,
		"moanProfile":profileName
	};
	localStorage.setItem(moanerKey+"_"+Player.MemberNumber,JSON.stringify(controls));
	
}

function deleteControls(){
	for (var i = 0; i < localStorage.length; i++) {
		var key=localStorage.key(i);
		if(key.startsWith(moanerKey) && key.endsWith(Player.MemberNumber)){
			localStorage.removeItem(key);			
		}
	  }
}

function startMoanScript(){
	scriptOn=true;
}

//controle sur les profils
function profileControl(commande){
	
	if(commande==undefined || commande==featureHelp){
		profilesList();
	}
	else {
		activerProfile(commande);
	}
	showprofileStatus();
}

//controle sur le script entier
function scriptControl(commande){
	if(commande==commandeOn){
		scriptOn=true;
	}
	else if(commande==commandeOff){
		scriptOn=false;
	}
	else{
		sendUnknownCommand();
		return;
	}
	showScriptStatus();
}

//controle sur le mode verbose
function verboseControl(commande){
	if(commande==commandeOn){
		verboseActive=true;
	}
	else if(commande==commandeOff){
		verboseActive=false;
	}
	else{
		sendUnknownCommand();
		return;
	}
	showVerboseStatus();
}



//controle sur les gémissements quand on parle
function talkControl(commande){
	if(commande==commandeOn){
		talkActive=true;
	}
	else if(commande==commandeOff){
		talkActive=false;
	}
	else{
		sendUnknownCommand();
		return;
	}
	showTalkStatus();
}

//controle sur les gémissements à l'orgasme
function orgasmControl(commande){
	if(commande==commandeOn){
		orgasmActive=true;
	}
	else if(commande==commandeOff){
		orgasmActive=false;
	} 
	else{
		sendUnknownCommand();
		return;
	}
	showOrgasmStatus();
}
//controle sur les gémissements au lancement d'un vibrateur
function vibeControl(commande){
	if(commande==commandeOn){
		vibratorActive=true;
	}
	else if(commande==commandeOff){
		vibratorActive=false;
	} 
	else{
		sendUnknownCommand();
		return;
	}
	showVibratorStatus();
}
//controle sur les gémissements à la fessée
function spankControl(commande){
	if(commande==commandeOn){
		spankActive=true;
	}
	else if(commande==commandeOff){
		spankActive=false;
	} 
	else{
		sendUnknownCommand();
		return;
	}
	showSpankStatus();
}
function firstHelp(){
	//console.log("ChatRoomHelpSeen="+ChatRoomHelpSeen);
	if (!firstHelpSeen){
		firstHelpSeen=true;
		console.log("firstHelp! "+ChatRoomHelpSeen);
		sendMessageToWearer(intro);
	}
}
//controle de l'aide
function helpControl(){
	sendMessageToWearer(scriptHelp);
	showStatus();
}

function profilesList(){
	let liste=getKeys(moansProfiles);
	let msg=profileListIntro+liste;
	sendMessageToWearer(msg);
}

function showStatus(){
	showScriptStatus();
	showprofileStatus();
	showTalkStatus();
	showOrgasmStatus();
	showVibratorStatus();
	showSpankStatus();	
	showVerboseStatus();	
}

function showprofileStatus(){
	if(!verboseActive){return;}
	let msg;
	if(profileName=="default"){
		msg=profileStatus[0];
	}else{
		msg=profileStatus[1]+profileName;
	}
	sendMessageToWearer(msg);
}

function showVerboseStatus(){
	if(!verboseActive){return;}
	let msg;
	if(scriptOn){
		msg=verboseStatus[0];
	}else{
		msg=verboseStatus[1];
	}
	sendMessageToWearer(msg);
}

function showScriptStatus(){
	if(!verboseActive){return;}
	let msg;
	if(scriptOn){
		msg=scriptStatus[0];
	}else{
		msg=scriptStatus[1];
	}
	sendMessageToWearer(msg);
}

function showTalkStatus(){
	if(!verboseActive){return;}
	let msg;
	if(talkActive){
		msg=talkStatus[0];
	}else{
		msg=talkStatus[1];
	}
	sendMessageToWearer(msg);
}

function showOrgasmStatus(){
	if(!verboseActive){return;}
	let msg;
	if(orgasmActive){
		msg=orgasmStatus[0];
	}else{
		msg=orgasmStatus[1];
	}
	sendMessageToWearer(msg);
}

function showVibratorStatus(){
	if(!verboseActive){return;}
	let msg;
	if(vibratorActive){
		msg=vibratorStatus[0];
	}else{
		msg=vibratorStatus[1];
	}
	sendMessageToWearer(msg);
}

function showSpankStatus(){
	if(!verboseActive){return;}
	let msg;
	if(spankActive){
		msg=spankStatus[0];
	}else{
		msg=spankStatus[1];
	}
	sendMessageToWearer(msg);
}