var backupChatRoomSendChat;
var backupActivityOrgasmPrepare;
var backupActivityOrgasmStart;
var scriptOn=true;


function MoanerInitAlteredFns(){
	//gemissements quand on parle
	initChatRoomSendChatOverride();
	//initActivityOrgasmPrepareOverride();
	initActivityOrgasmStart();
	//gemissements quand on recoit une stimulation
	
}

function initChatRoomSendChatOverride(){
	logDebug("Entree MoanerInitAlteredFns pour ChatRoomSendChat");
	let backupChatRoomSendChat = ChatRoomSendChat;
	ChatRoomSendChat = (...rest) => {
	  
	  logDebug("Entree ChatRoomSendChat");
	  let msg = ElementValue("InputChat").trim();
	  if(scriptOn && isSimpleChat(msg)){
		logDebug("msg est un chat simple");	
		msg=reactionExcitation(Player,msg);//fonction qui lance l'interpretation des emotes
		ElementValue("InputChat",msg);
	  }
	  logDebug("msg="+msg);
	  backupChatRoomSendChat(...rest);
	  logDebug("Sortie ChatRoomSendChat");
	};
}

function initActivityOrgasmStart(){
	
	backupActivityOrgasmStart = ActivityOrgasmStart;
		ActivityOrgasmStart = (C) => {
		
		if(scriptOn && C.MemberNumber==Player.MemberNumber && window.CurrentScreen=="ChatRoom"){
			if(C.ID==0 && C.MemberNumber==Player.MemberNumber){
				var moan;
				var backupChatRoomTargetMemberNumber=null;
				//doit pas se lancer en prive
				//doit pas se lancer en /me
				//doit se lancer uniquement en chat simple
				if(scriptOn){
					msg=ElementValue("InputChat");
					if(isSimpleChat(msg)){
						
						moan=msg+"... "+getOrgasmMoan();
						
						ElementValue("InputChat",moan);
						msg="";
						ChatRoomSendChat();
					}
					else{
						backupChatRoomTargetMemberNumber=ChatRoomTargetMemberNumber;
						ChatRoomTargetMemberNumber=null;
						moan="... "+getOrgasmMoan();
						ElementValue("InputChat",moan);
						ChatRoomSendChat();
						ChatRoomTargetMemberNumber=backupChatRoomTargetMemberNumber;
						ElementValue("InputChat",msg);
					} 
				}
			}
		}
		backupActivityOrgasmStart(C);
	};
}

function startMoanScript(){
	logDebug("Start moan script");
	scriptOn=true;
}
function stopMoanScript(){
	logDebug("Stop moan script");
	scriptOn=false;
}
function isSimpleChat(msg){
	return !msg.startsWith("/")&&!msg.startsWith("*")&&ChatRoomTargetMemberNumber==null;
}