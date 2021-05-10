//commande:
//@moaner feature commande
//feature: talk (quand on parle), orgasm, startVibrator, spank
//commande On, OFF


var M_MOANER_moanerKey="bc_moaner_";

//commandes
const M_MOANER_commandeOn="on";
const M_MOANER_commandeOff="off";

//features
const M_MOANER_featureTalk="talk";
const M_MOANER_featureOrgasm="orgasm";
const M_MOANER_featureVibrator="vibe";
const M_MOANER_featureSpank="spank";
const M_MOANER_featureHelp="help";
const M_MOANER_featureVerbose="verbose";
const M_MOANER_featureProfile="profile";

var M_MOANER_talkActive=true;
var M_MOANER_orgasmActive=true;
var M_MOANER_vibratorActive=true;
var M_MOANER_spankActive=true;
var M_MOANER_verboseActive=true;
var M_MOANER_firstHelpSeen=false;


var M_MOANER_scriptStatus=["The moaner is active.","The moaner is not active."];
var M_MOANER_orgasmStatus=["The orgasm moan is active. You will moan while cumming.","The orgasm moan is not active. You will not moan while cumming anymore."];
var M_MOANER_vibratorStatus=["The vibes moan is active. If your vibrator's setting changes, you will moan.","The vibes moan is not active. If your vibrator's setting changes, you will not moan."];
var M_MOANER_spankStatus=["The spank moan is active. You will moan while being spanked.","The spank moan is not active. You will not moan while being spanked."];
var M_MOANER_talkStatus=["The talk moan is active. If you're vibed, you will moan while speaking.","The talk moan is not active. If you're vibed, you will not moan while speaking anymore."];
var M_MOANER_verboseStatus=["Moaner is verbose.","Moaner is not verbose."];
var M_MOANER_profileStatus=["No custom profile loaded.","Current moans profile: "];
var M_MOANER_profileListM_MOANER_intro="Available moaning profiles: ";

var M_MOANER_scriptHelp="Moaner commands available: /moaner help: show this help text. /moaner on: start the moaner. /moaner off: stop the moaner. /moaner talk on: start the talk moan. /moaner talk off: stop the talk moan. /moaner orgasm on: start the orgasm moan. /moaner orgasm off: stop the orgasm moan. /moaner vibe on: start the vibes moan. /moaner vibe off: stop the vibes moan. /moaner spank on: start the spank moan. /moaner spank off: stop the spank moan. /moaner verbose on: make the script verbose. /moaner verbose off: make the script not verbose. /moaner profile: show profiles help. /moaner profile [profile name]: use [profile name] moans";

var M_MOANER_intro="Myrhanda Moaner installed. Type /moaner help for more informations.";
var M_MOANER_unknownCommand="Unknown command";

function M_MOANER_traiterCommande(msg){
	if(!msg.toLowerCase().startsWith("/moaner".toLowerCase())){
		return msg;
	}
	var list=msg.split(" ");
	var feature=list[1];
	var commande=list[2];
	if(feature==M_MOANER_commandeOn||feature==M_MOANER_commandeOff){
		scriptControl(feature);		
	}
	else if(feature==M_MOANER_featureTalk){
		talkControl(commande);
	}
	else if(feature==M_MOANER_featureOrgasm){
		orgasmControl(commande);
	}
	else if(feature==M_MOANER_featureVibrator){
		vibeControl(commande);
	}
	else if(feature==M_MOANER_featureSpank){
		spankControl(commande);
	}
	else if(feature==M_MOANER_featureHelp){
		helpControl(commande);
	}
	else if(feature==M_MOANER_featureVerbose){
		verboseControl(commande);
	}
	else if(feature==M_MOANER_featureProfile){
		profileControl(commande);
	}
	else{
		sendM_MOANER_unknownCommand();
		return "";
	}
	M_MOANER_saveControls();
	return "";
}

function sendM_MOANER_unknownCommand(){
	M_MOANER_sendMessageToWearer(M_MOANER_unknownCommand);
}

function M_MOANER_initControls(){
	var datas=JSON.parse(localStorage.getItem(M_MOANER_moanerKey+"_"+Player.MemberNumber));
	
	if(datas==null||datas==undefined){
		M_MOANER_talkActive=true;
		M_MOANER_orgasmActive=true;
		M_MOANER_vibratorActive=true;
		M_MOANER_spankActive=true;
		M_MOANER_scriptOn=true;
		profileName="default";
		//M_MOANER_saveControls();
	}else{
		M_MOANER_talkActive=datas.talkMoan;
		M_MOANER_orgasmActive=datas.orgasmMoan;
		M_MOANER_vibratorActive=datas.vibeMoan;
		M_MOANER_spankActive=datas.spankMoan;
		M_MOANER_scriptOn=datas.script;
		profileName=datas.moanProfile;
	}	
	
}

function M_MOANER_saveControls(){
	var controls={
		"talkMoan":M_MOANER_talkActive,
		"orgasmMoan":M_MOANER_orgasmActive,
		"vibeMoan":M_MOANER_vibratorActive,
		"spankMoan":M_MOANER_spankActive,
		"script":M_MOANER_scriptOn,
		"moanProfile":profileName
	};
	localStorage.setItem(M_MOANER_moanerKey+"_"+Player.MemberNumber,JSON.stringify(controls));
	
}

function M_MOANER_deleteControls(){
	for (var i = 0; i < localStorage.length; i++) {
		var key=localStorage.key(i);
		if(key.startsWith(M_MOANER_moanerKey) && key.endsWith(Player.MemberNumber)){
			localStorage.removeItem(key);			
		}
	  }
}

function M_MOANER_startMoanScript(){
	M_MOANER_scriptOn=true;
}

//controle sur les profils
function profileControl(commande){
	
	if(commande==undefined || commande==M_MOANER_featureHelp){
		profilesList();
	}
	else {
		M_MOANER_activerProfile(commande);
	}
	showM_MOANER_profileStatus();
}

//controle sur le script entier
function scriptControl(commande){
	if(commande==M_MOANER_commandeOn){
		M_MOANER_scriptOn=true;
	}
	else if(commande==M_MOANER_commandeOff){
		M_MOANER_scriptOn=false;
	}
	else{
		sendM_MOANER_unknownCommand();
		return;
	}
	showM_MOANER_scriptStatus();
}

//controle sur le mode verbose
function verboseControl(commande){
	if(commande==M_MOANER_commandeOn){
		M_MOANER_verboseActive=true;
	}
	else if(commande==M_MOANER_commandeOff){
		M_MOANER_verboseActive=false;
	}
	else{
		sendM_MOANER_unknownCommand();
		return;
	}
	showM_MOANER_verboseStatus();
}



//controle sur les gémissements quand on parle
function talkControl(commande){
	if(commande==M_MOANER_commandeOn){
		M_MOANER_talkActive=true;
	}
	else if(commande==M_MOANER_commandeOff){
		M_MOANER_talkActive=false;
	}
	else{
		sendM_MOANER_unknownCommand();
		return;
	}
	showM_MOANER_talkStatus();
}

//controle sur les gémissements à l'orgasme
function orgasmControl(commande){
	if(commande==M_MOANER_commandeOn){
		M_MOANER_orgasmActive=true;
	}
	else if(commande==M_MOANER_commandeOff){
		M_MOANER_orgasmActive=false;
	} 
	else{
		sendM_MOANER_unknownCommand();
		return;
	}
	showM_MOANER_orgasmStatus();
}
//controle sur les gémissements au lancement d'un vibrateur
function vibeControl(commande){
	if(commande==M_MOANER_commandeOn){
		M_MOANER_vibratorActive=true;
	}
	else if(commande==M_MOANER_commandeOff){
		M_MOANER_vibratorActive=false;
	} 
	else{
		sendM_MOANER_unknownCommand();
		return;
	}
	showM_MOANER_vibratorStatus();
}
//controle sur les gémissements à la fessée
function spankControl(commande){
	if(commande==M_MOANER_commandeOn){
		M_MOANER_spankActive=true;
	}
	else if(commande==M_MOANER_commandeOff){
		M_MOANER_spankActive=false;
	} 
	else{
		sendM_MOANER_unknownCommand();
		return;
	}
	showM_MOANER_spankStatus();
}
function firstHelp(){
	//console.log("ChatRoomHelpSeen="+ChatRoomHelpSeen);
	if (!M_MOANER_firstHelpSeen){
		M_MOANER_firstHelpSeen=true;
		console.log("firstHelp! "+ChatRoomHelpSeen);
		M_MOANER_sendMessageToWearer(M_MOANER_intro);
	}
}
//controle de l'aide
function helpControl(){
	M_MOANER_sendMessageToWearer(M_MOANER_scriptHelp);
	showStatus();
}

function profilesList(){
	let liste=M_MOANER_getKeys(M_MOANER_moansProfiles);
	let msg=M_MOANER_profileListM_MOANER_intro+liste;
	M_MOANER_sendMessageToWearer(msg);
}

function showStatus(){
	showM_MOANER_scriptStatus();
	showM_MOANER_profileStatus();
	showM_MOANER_talkStatus();
	showM_MOANER_orgasmStatus();
	showM_MOANER_vibratorStatus();
	showM_MOANER_spankStatus();	
	showM_MOANER_verboseStatus();	
}

function showM_MOANER_profileStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(profileName=="default"){
		msg=M_MOANER_profileStatus[0];
	}else{
		msg=M_MOANER_profileStatus[1]+profileName;
	}
	M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_verboseStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(M_MOANER_scriptOn){
		msg=M_MOANER_verboseStatus[0];
	}else{
		msg=M_MOANER_verboseStatus[1];
	}
	M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_scriptStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(M_MOANER_scriptOn){
		msg=M_MOANER_scriptStatus[0];
	}else{
		msg=M_MOANER_scriptStatus[1];
	}
	M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_talkStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(M_MOANER_talkActive){
		msg=M_MOANER_talkStatus[0];
	}else{
		msg=M_MOANER_talkStatus[1];
	}
	M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_orgasmStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(M_MOANER_orgasmActive){
		msg=M_MOANER_orgasmStatus[0];
	}else{
		msg=M_MOANER_orgasmStatus[1];
	}
	M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_vibratorStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(M_MOANER_vibratorActive){
		msg=M_MOANER_vibratorStatus[0];
	}else{
		msg=M_MOANER_vibratorStatus[1];
	}
	M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_spankStatus(){
	if(!M_MOANER_verboseActive){return;}
	let msg;
	if(M_MOANER_spankActive){
		msg=M_MOANER_spankStatus[0];
	}else{
		msg=M_MOANER_spankStatus[1];
	}
	M_MOANER_sendMessageToWearer(msg);
}