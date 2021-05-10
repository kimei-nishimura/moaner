/*var backupChatRoomSendChat;
var backupActivityOrgasmPrepare;
var backupActivityOrgasmStart;
var backupChatRoomMessage;
var backupChatRoomFirstTimeHelp;*/
var M_MOANER_scriptOn=true;


function M_MOANER_MoanerInitAlteredFns(){
	//interpreter les commandes
	M_MOANER_initChatRoomSendChatCommands();
	//gemissements quand on parle
	M_MOANER_initChatRoomSendChatOverride();
	//initActivityOrgasmPrepareOverride();
	M_MOANER_initActivityOrgasmStart();
	//gemissements quand on recoit une stimulation
	M_MOANER_initChatRoomMessageOverride ();
	//message d'aide
	M_MOANER_initChatRoomFirstTimeHelpOverride();
	
}

function M_MOANER_initChatRoomFirstTimeHelpOverride() {
	let backupChatRoomFirstTimeHelp = ChatRoomFirstTimeHelp;
	ChatRoomFirstTimeHelp = () => {
		firstHelp();
		backupChatRoomFirstTimeHelp();
	}
}


var M_MOANER_tempChatRoomData;
function M_MOANER_initChatRoomMessageOverride (){
	M_MOANER_logDebug("Entree initChatRoomOverride pour ChatRoomMessage");
	let backupChatRoomMessage = ChatRoomMessage;
	ChatRoomMessage = (data) => {
		if(M_MOANER_scriptOn && window.CurrentScreen=="ChatRoom"){
			M_MOANER_tempChatRoomData=data;	
			if(data!=null && data.Content!= undefined && data.Content!=null){	
				M_MOANER_logDebug("lancerM_MOANER_reactionTrigger");
				M_MOANER_reactionTrigger(data);
			}
		}
		backupChatRoomMessage(data);
	};
}


function M_MOANER_initChatRoomSendChatOverride(){
	M_MOANER_logDebug("Entree M_MOANER_MoanerInitAlteredFns pour ChatRoomSendChat");
	let backupChatRoomSendChat = ChatRoomSendChat;
	ChatRoomSendChat = (...rest) => {
	  
	  let msg = ElementValue("InputChat").trim();
	  if(M_MOANER_scriptOn && M_MOANER_isSimpleChat(msg)){
		msg=M_MOANER_reactionExcitation(Player,msg);
		ElementValue("InputChat",msg);
	  }
	  M_MOANER_logDebug("msg="+msg);
	  backupChatRoomSendChat(...rest);
	  M_MOANER_logDebug("Sortie ChatRoomSendChat");
	};
}


function M_MOANER_initChatRoomSendChatCommands(){
	let backupChatRoomSendChat = ChatRoomSendChat;
	ChatRoomSendChat = (...rest) => {
	  
	  let msg = ElementValue("InputChat").trim();
	  if(M_MOANER_isCommande(msg)){
		msg=M_MOANER_traiterCommande(msg);//fonction qui lance l'interpretation des commandes
		ElementValue("InputChat",msg);
	  }
	  backupChatRoomSendChat(...rest);
	};
}

function M_MOANER_initActivityOrgasmStart(){
	
	let backupActivityOrgasmStart = ActivityOrgasmStart;
		ActivityOrgasmStart = (C) => {	
		
		if(M_MOANER_scriptOn){
			M_MOANER_reactionOrgasm(C);
		}
		backupActivityOrgasmStart(C);
	};
}

/*function M_MOANER_startMoanScript(){
	M_MOANER_scriptOn=true;
}*/
function M_MOANER_stopMoanScript(){
	M_MOANER_scriptOn=false;
}
function M_MOANER_isCommande(msg){
	return msg.startsWith("/")&&ChatRoomTargetMemberNumber==null;
}
function M_MOANER_isSimpleChat(msg){
	return msg.trim().length>0 && !msg.startsWith("/")&&!msg.startsWith("(")&&!msg.startsWith("*")&&ChatRoomTargetMemberNumber==null;
}

function M_MOANER_isInChatRoom(){
	return window.CurrentScreen=="ChatRoom";
}