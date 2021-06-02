
var M_MOANER_orgasmMoans=[];

var M_MOANER_factor4Moans=[];
var M_MOANER_factor3Moans=[];
var M_MOANER_factor2Moans=[];
var factor1Moans=[];
var PROPORTION_MAX = 40;

/******************************************************************/
//réagir au chat
/******************************************************************/
function M_MOANER_reactionExcitation(C, CD) {
	
	if(M_MOANER_talkActive && IsStimulated(C)){

		// Validate nulls
		if (CD == null) CD = "";

		// Validates that the preferences allow stuttering
		/*if ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter != "None")) {
			return M_MOANER_applyMoanToMsg(C,CD);
			
		}*/
		return M_MOANER_applyMoanToMsg(C,CD);
	}

	// No stutter effect, we return the regular text
	return CD;
}

function M_MOANER_reactionOrgasm(C){
	if(M_MOANER_orgasmActive && M_MOANER_scriptOn && C.MemberNumber==Player.MemberNumber && window.CurrentScreen=="ChatRoom"){
		if(C.ID==0 && C.MemberNumber==Player.MemberNumber){
			var moan;
			var backupChatRoomTargetMemberNumber=null;
			//doit pas se lancer en prive
			//doit pas se lancer en /me
			//doit se lancer uniquement en chat simple
			msg=ElementValue("InputChat");
			if(M_MOANER_isSimpleChat(msg)){
				
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

function M_MOANER_reactionTrigger(data){	
	if(M_MOANER_isPlayerTarget(data)){	
		var msg=ElementValue("InputChat");
		if(M_MOANER_isSimpleChat(msg)){
			M_MOANER_reactionVibeWithChat(data);
			M_MOANER_reactionSpankWithChat(data);
		}
		else{
			M_MOANER_reactionSpankWithoutChat(data);
			M_MOANER_reactionVibeWithoutChat(data);
		}
	}
}

function M_MOANER_reactionSpankWithChat(data){
	if(M_MOANER_spankActive && M_MOANER_isSpank(data)){
		//récupérer le gémissement à appliquer
		//datas pour génération des gémissements
		var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
		var moan = getSpankMoan(Factor, Math.random() * 300);
		var msg=ElementValue("InputChat");
		if(msg!=""){
			moan=msg+"... "+moan;						
		}
		ElementValue("InputChat",moan);
		ChatRoomSendChat();		
	}
}

function M_MOANER_reactionSpankWithoutChat(data){
	if(M_MOANER_spankActive && M_MOANER_isSpank(data)){
		//récupérer le gémissement à appliquer
		//datas pour génération des gémissements
		var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
		var moan = getSpankMoan(Factor, Math.random() * 300);
		var msg=ElementValue("InputChat");
		let backtarget=ChatRoomTargetMemberNumber;
		ChatRoomTargetMemberNumber=null;
		ElementValue("InputChat",moan);
		ChatRoomSendChat();		
		ElementValue("InputChat",msg);
		ChatRoomTargetMemberNumber=backtarget;
	}
}

function M_MOANER_reactionVibeWithoutChat(data){
	if(M_MOANER_vibratorActive && M_MOANER_isVibes(data)){
		//récupérer le gémissement à appliquer
		//datas pour génération des gémissements
		var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
		var moan = getMoan(Factor, true,Math.random() * 300);
		var msg=ElementValue("InputChat");
		let backtarget=ChatRoomTargetMemberNumber;
		ChatRoomTargetMemberNumber=null;
		ElementValue("InputChat",moan);
		ChatRoomSendChat();	
		ElementValue("InputChat",msg);	
		ChatRoomTargetMemberNumber=backtarget;
	}
}

function M_MOANER_reactionVibeWithChat(data){
	if(M_MOANER_vibratorActive && M_MOANER_isVibes(data)){
		//récupérer le gémissement à appliquer
		//datas pour génération des gémissements
		var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
		var moan = getMoan(Factor, true,Math.random() * 300);
		var msg=ElementValue("InputChat");
		console.log("msg="+msg);
		if(msg!=""){
			moan=msg+"... "+moan;						
		}
		ElementValue("InputChat",moan);
		ChatRoomSendChat();		
	}
}

function M_MOANER_isSpank(data){
	var array=data.Dictionary;
	if(data.Content=="ActionActivitySpankItem"){
		return true;
	}
	for(index in array){
		let elem = array[index];  
        if(elem.Tag=="ActivityName"){
			if(elem.Text=="Spank" || elem.Text=="Slap" ){
				return true;
			}
        }  
	}
    return false;	
}

function M_MOANER_isVibes(data){
	if(data.Type=="Action" && data.Content.includes("Vibe")){
		return true;
	}
	return false;	
}

function M_MOANER_isPlayerTarget(data){
	var array=data.Dictionary;
	for(index in array){
		let elem = array[index];  
        if((elem.Tag=="DestinationCharacter" || elem.Tag=="TargetCharacter" || elem.Tag=="DestinationCharacterName")&& elem.MemberNumber==Player.MemberNumber){
            return true;
        }
	}
    return false;
}

function M_MOANER_applyMoanToMsg(C,CD){
	//déterminer le nombre de gémissements
		//calculer ça en fonction du nombre de mots
		//proportion: PROPORTION_MAX*niveauExcitation
		//PROPORTION_MAX=40%
		var proportion = C.ArousalSettings.Progress * PROPORTION_MAX/10000;
		M_MOANER_logDebug("proportion: "+proportion);
		var CDList = CD.split(" ");
		
		var currentIndex=0;
		var stop=false;
		var finalTextList=[];
		
		//récupérer les gémissements à appliquer
		//datas pour génération des gémissements
		var Factor = Math.floor(C.ArousalSettings.Progress / 20);
		while(currentIndex<CDList.length){
			//si le prochain mot contient une parenthèse, on arrète la répartission des gémissements)
			var currentWord=CDList[currentIndex++];
			var presenceParenthese=M_MOANER_detectParentheses(currentWord);
			if(presenceParenthese==1){
				stop=true;
			}
			if(stop){
				finalTextList.push(currentWord);
			}
			else{
				let random=Math.ceil(Math.random()*100)
				let result;
				if(random<=proportion*100){
					if(random%2==0){
						result=currentWord+"..."+getMoan(Factor, true,CD.length);
					}
					else{
						result=getMoan(Factor, true,CD.length)+" "+currentWord;
					}
					finalTextList.push(result);					
				}
				else{
					finalTextList.push(currentWord);
				}
			}
			if(presenceParenthese==2){
				stop=false;
			}
		}
		
		return finalTextList.join(" ");
}

//return 1 if opening bracket, 2 of closing bracket, 0 otherwise
function M_MOANER_detectParentheses(CD){
	if(!CD.includes("(") && !CD.includes(")")){
		return 0;
	}
	for(i=CD.length;i>=0;i--){
		if(CD.charAt(i)==")"){
			return 2;
		}
		if(CD.charAt(i)=="("){
			return 1;
		}
	}
	return 0;
}





function transformText(isStimulated,L,ArouseFactor,CD){
	if(isStimulated){
		return CD.substring(0, L) + CD.charAt(L) + getMoan(ArouseFactor, isStimulated) + CD.substring(L, CD.length);
	}
	else{
		return CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
	}
}





function getMoan(Factor, isStimulated,seed){
	//M_MOANER_logDebug("getMoan: factor="+Factor);
	//M_MOANER_logDebug("getMoan: isStimulated="+isStimulated);
	if(!isStimulated) return "";
	//sélectionner un gémissement
	return " "+selectMoan(Factor,seed);
}

function getSpankMoan(Factor, seed){
	let gemissement;
	//selon le niveau de fetichisme fessée
	let activity=getActivityTaste("Spank");
	if(activity== undefined) return "";
	let activityTaste = activity.Self;
	
	let seuilDouleur=Math.min(10,(4-activityTaste)*25);
	let seuilPlaisir=seuilDouleur+40
	let douleur=Player.ArousalSettings.Progress <=seuilDouleur;
	let plaisir=Player.ArousalSettings.Progress>seuilPlaisir;
	if(douleur){
		gemissement=getPainMoan();
	}
	else if(plaisir){
		gemissement="♥"+getMoan(Factor,true,300)+"♥";
	}
	else{
		gemissement=getPainMoan()+"♥"+getMoan(Factor,true,300)+"♥";
	}
	
	
	return gemissement;
}



function getZoneTaste(data){
	let zone;
	let taste;
	for(index in data.Dictionary){
        var elem=data.Dictionary[index];
		if(elem.Tag=="ActivityGroup") zone= getZone(elem.Text);
	}
	if(zone==undefined||zone==null||zone.Factor==undefined){
		return undefined;
	}
	taste=zone.Factor;
	if(zone.Orgasm==true){
		taste*=2;
	}
	
	return taste;
}

function getZone(name){
	for(index in Player.ArousalSettings.Activity){
        var zone=Player.ArousalSettings.Zone[index];
		if(zone.Name==name) return zone;
	}
}

function getActivityTaste(name){
	for(index in Player.ArousalSettings.Activity){
        var activity=Player.ArousalSettings.Activity[index];
		if(activity.Name==name) return activity;
	}
}



function resetMoans(seed){
	//M_MOANER_logDebug("resetMoans IN");
	
	factor1Moans=M_MOANER_shuffle(basefactor1Moans.concat([]),seed);
	M_MOANER_factor2Moans=M_MOANER_shuffle(factor1Moans.concat(baseM_MOANER_factor2Moans),seed);
	M_MOANER_factor3Moans=M_MOANER_shuffle(M_MOANER_factor2Moans.concat(baseM_MOANER_factor3Moans),seed);
	M_MOANER_factor4Moans=M_MOANER_shuffle(M_MOANER_factor3Moans.concat(baseM_MOANER_factor4Moans),seed);
	//M_MOANER_logDebug("resetMoans OUT");
}

function getPainMoanBACK(){
	let index=Math.floor(Math.random()*basePainMoans.length);
	return basePainMoans[index];
}



function resetMoans(seed){
	//M_MOANER_logDebug("resetMoans IN");
	moanProfile=M_MOANER_getMoans(profileName);
	factor1Moans=M_MOANER_shuffle(moanProfile.low.concat([]),seed);
	M_MOANER_factor2Moans=M_MOANER_shuffle(factor1Moans.concat(moanProfile.light),seed);
	M_MOANER_factor3Moans=M_MOANER_shuffle(M_MOANER_factor2Moans.concat(moanProfile.medium),seed);
	M_MOANER_factor4Moans=M_MOANER_shuffle(M_MOANER_factor3Moans.concat(moanProfile.hot),seed);
	//M_MOANER_logDebug("resetMoans OUT");
}

function getPainMoan(){
	moanProfile=M_MOANER_getMoans(profileName);
	let index=Math.floor(Math.random()*moanProfile.pain.length);
	return moanProfile.pain[index];
}

function getOrgasmMoan(){
	var gemissement;
	
	if(M_MOANER_orgasmMoans.length==0){
		M_MOANER_logDebug("getOrgasmMoan: reset list");
		let seed=3000;
		M_MOANER_logDebug("getOrgasmMoan: seed="+seed);
		moanProfile=M_MOANER_getMoans(profileName);
		M_MOANER_orgasmMoans=M_MOANER_shuffle(moanProfile.orgasm.concat([]),seed);
	}
	gemissement=M_MOANER_orgasmMoans.shift();
	return gemissement;
}

function selectMoan(Factor,seed){
	if(Factor<2){
			//M_MOANER_logDebug("factor1Moans.length="+factor1Moans.length);
		if(factor1Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor, seed);
		}else{
			return factor1Moans.shift();
		}
	}
	else if(Factor<3){
			//M_MOANER_logDebug("M_MOANER_factor2Moans.length="+M_MOANER_factor2Moans.length);
		if(M_MOANER_factor2Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor, seed);
		}else{
			return M_MOANER_factor2Moans.shift();
		}
	}
	else if(Factor<4){
			//M_MOANER_logDebug("M_MOANER_factor3Moans.length="+M_MOANER_factor3Moans.length);
		if(M_MOANER_factor3Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor, seed);
		}else{
			return M_MOANER_factor3Moans.shift();
		}
	}
	else if(Factor>=4){
			//M_MOANER_logDebug("M_MOANER_factor4Moans.length="+M_MOANER_factor4Moans.length);
		if(M_MOANER_factor4Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor, seed);
		}else{
			return M_MOANER_factor4Moans.shift();
		}
	}
}


function IsStimulated(C){
	if (C.IsEgged() && ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter == "Vibration") || (C.ArousalSettings.AffectStutter == "All")))
			for (let A = 0; A < C.Appearance.length; A++) {
				var Item = C.Appearance[A];
				if (InventoryItemHasEffect(Item, "Vibrating", true))
					return true;
			}
	return false;
}
