
var orgasmMoans=[];

var factor4Moans=[];
var factor3Moans=[];
var factor2Moans=[];
var factor1Moans=[];
var PROPORTION_MAX = 40;

/******************************************************************/
//réagir au chat
/******************************************************************/
function reactionExcitation(C, CD) {
	
	if(!IsStimulated(C)) return CD;

	// Validate nulls
	if (CD == null) CD = "";

	// Validates that the preferences allow stuttering
	if ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter != "None")) {
		return applyMoanToMsg(C,CD);
		
	}

	// No stutter effect, we return the regular text
	return CD;

}

function applyMoanToMsg(C,CD){
	//déterminer le nombre de gémissements
		//calculer ça en fonction du nombre de mots
		//proportion: PROPORTION_MAX*niveauExcitation
		//PROPORTION_MAX=40%
		var proportion = C.ArousalSettings.Progress * PROPORTION_MAX/10000;
		logDebug("proportion: "+proportion);
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
			var presenceParenthese=detectParentheses(currentWord);
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
function detectParentheses(CD){
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



function getOrgasmMoan(){
	var gemissement;
	
	if(orgasmMoans.length==0){
		logDebug("getOrgasmMoan: reset list");
		let seed=3000;
		logDebug("getOrgasmMoan: seed="+seed);
		orgasmMoans=shuffle(baseOrgasmMoans.concat([]),seed);
	}
	gemissement=orgasmMoans.shift();
	return gemissement;
}

function getMoan(Factor, isStimulated,seed){
	//logDebug("getMoan: factor="+Factor);
	//logDebug("getMoan: isStimulated="+isStimulated);
	if(!isStimulated) return "-";
	//sélectionner un gémissement
	var gemissement=" "+selectMoan(Factor,seed);
	
	return gemissement;
}



function resetMoans(seed){
	//logDebug("resetMoans IN");
	
	factor1Moans=shuffle(basefactor1Moans.concat([]),seed);
	factor2Moans=shuffle(factor1Moans.concat(basefactor2Moans),seed);
	factor3Moans=shuffle(factor2Moans.concat(basefactor3Moans),seed);
	factor4Moans=shuffle(factor3Moans.concat(basefactor4Moans),seed);
	//logDebug("resetMoans OUT");
}


function selectMoan(Factor,seed){
	if(Factor<2){
			//logDebug("factor1Moans.length="+factor1Moans.length);
		if(factor1Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor);
		}else{
			return factor1Moans.shift();
		}
	}
	else if(Factor<3){
			//logDebug("factor2Moans.length="+factor2Moans.length);
		if(factor2Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor);
		}else{
			return factor2Moans.shift();
		}
	}
	else if(Factor<4){
			//logDebug("factor3Moans.length="+factor3Moans.length);
		if(factor3Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor);
		}else{
			return factor3Moans.shift();
		}
	}
	else if(Factor>=4){
			//logDebug("factor4Moans.length="+factor4Moans.length);
		if(factor4Moans.length <= 0){
			resetMoans(seed);
			return selectMoan(Factor);
		}else{
			return factor4Moans.shift();
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
