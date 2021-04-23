/*var backupChatRoomSendChat;
var backupActivityOrgasmPrepare;
var backupActivityOrgasmStart;
var backupChatRoomMessage;
var backupChatRoomFirstTimeHelp;*/
var scriptOn=true;


function MoanerInitAlteredFns(){
	//interpreter les commandes
	initChatRoomSendChatCommands();
	//gemissements quand on parle
	initChatRoomSendChatOverride();
	//initActivityOrgasmPrepareOverride();
	initActivityOrgasmStart();
	//gemissements quand on recoit une stimulation
	initChatRoomMessageOverride ();
	//message d'aide
	initChatRoomFirstTimeHelpOverride();
	
}

function initChatRoomFirstTimeHelpOverride() {
	let backupChatRoomFirstTimeHelp = ChatRoomFirstTimeHelp;
	ChatRoomFirstTimeHelp = () => {
		firstHelp();
		backupChatRoomFirstTimeHelp();
	}
}


var tempChatRoomData;
function initChatRoomMessageOverride (){
	logDebug("Entree initChatRoomOverride pour ChatRoomMessage");
	let backupChatRoomMessage = ChatRoomMessage;
	ChatRoomMessage = (data) => {
		if(scriptOn && window.CurrentScreen=="ChatRoom"){
			tempChatRoomData=data;	
			if(data!=null && data.Content!= undefined && data.Content!=null){	
				logDebug("lancerReactionTrigger");
				reactionTrigger(data);
			}
		}
		backupChatRoomMessage(data);
	};
}


function initChatRoomSendChatOverride(){
	logDebug("Entree MoanerInitAlteredFns pour ChatRoomSendChat");
	let backupChatRoomSendChat = ChatRoomSendChat;
	ChatRoomSendChat = (...rest) => {
	  
	  let msg = ElementValue("InputChat").trim();
	  if(scriptOn && isSimpleChat(msg)){
		msg=reactionExcitation(Player,msg);
		ElementValue("InputChat",msg);
	  }
	  logDebug("msg="+msg);
	  backupChatRoomSendChat(...rest);
	  logDebug("Sortie ChatRoomSendChat");
	};
}


function initChatRoomSendChatCommands(){
	let backupChatRoomSendChat = ChatRoomSendChat;
	ChatRoomSendChat = (...rest) => {
	  
	  let msg = ElementValue("InputChat").trim();
	  if(isCommande(msg)){
		msg=traiterCommande(msg);//fonction qui lance l'interpretation des commandes
		ElementValue("InputChat",msg);
	  }
	  backupChatRoomSendChat(...rest);
	};
}

function initActivityOrgasmStart(){
	
	let backupActivityOrgasmStart = ActivityOrgasmStart;
		ActivityOrgasmStart = (C) => {	
		
		if(scriptOn){
			reactionOrgasm(C);
		}
		backupActivityOrgasmStart(C);
	};
}

/*function startMoanScript(){
	scriptOn=true;
}*/
function stopMoanScript(){
	scriptOn=false;
}
function isCommande(msg){
	return msg.startsWith("/")&&ChatRoomTargetMemberNumber==null;
}
function isSimpleChat(msg){
	return msg.trim().length>0 && !msg.startsWith("/")&&!msg.startsWith("(")&&!msg.startsWith("*")&&ChatRoomTargetMemberNumber==null;
}

function isInChatRoom(){
	return window.CurrentScreen=="ChatRoom";
}