/*const baseM_MOANER_factor4Moans=["n... Nyah♥","Oooh","mmmmmh!","NYyaaA♥"];
const baseM_MOANER_factor3Moans=["mm","aaaah","nyAh♥"];
const baseM_MOANER_factor2Moans=["nyah♥","Aah!","mh","oh!♥","mh♥"];
const basefactor1Moans=["mh","♥oh♥","ah","...♥"];

const baseM_MOANER_orgasmMoans=["Nya...Ny...NyaaAAaah!","Mmmmh... MMmh... Hhhmmmm...","Oooooh... Mmmmh... OooOOOOh!","Mmmhnn... Nyhmm... Nyah!"];

const basePainMoans=["Aie!","Aoouch!","Eek","ouch","Aow"];*/

var M_MOANER_profileName="default";

M_MOANER_defaultMoans={
	"hot":["n... Nyah♥","Oooh","mmmmmh!","NYyaaA♥"],
	"medium":["mm","aaaah","nyAh♥"],
	"light":["nyah♥","Aah!","mh","oh!♥","mh♥"],
	"low":["mh","♥oh♥","ah","...♥"],
	"orgasm":["Nya...Ny...NyaaAAaah!","Mmmmh... MMmh... Hhhmmmm...","Oooooh... Mmmmh... OooOOOOh!","Mmmhnn... Nyhmm... Nyah!"],
	"pain":["Aie!","Aoouch!","Aaaaie!","Ouch","Aow"]
}

M_MOANER_customMoans={
	"hot":[],
	"medium":[],
	"light":[],
	"low":[],
	"orgasm":[],
	"pain":[]
}

/*nekoMoans={
	"hot":["n... Nyah♥","NYyaaA♥"],
	"medium":["nyAh♥","nyyy","..yah"],
	"light":["nyah♥","Yah!","myuh","mh♥"],
	"low":["myu","ny♥","mh","♥yh♥","ny♥"],
	"orgasm":["Nya...Ny...NyaaAAaah!","Mmmhnn... Nyhmm... Nyah!","mmmh... mmmeeeee.... meeeoooow!"],
	"pain":[]
}*/



var M_MOANER_moansProfiles=[];

function M_MOANER_activerProfile(name){
	if(M_MOANER_moansProfiles[name]==undefined){
		profileName="default";
		resetMoans(Math.random()*300);
	}
	else{
		profileName=name;
		resetMoans(Math.random()*300);
	}
}

function M_MOANER_getMoans(name){
	var pleasureMoans=M_MOANER_moansProfiles[name];
	if(pleasureMoans==undefined){
		pleasureMoans=M_MOANER_defaultMoans;
	}
	return pleasureMoans;
}

function M_MOANER_addMoansProfile(name,pleasure){
	if(pleasure.hot==undefined || pleasure.hot.length==0){
		pleasure.hot=M_MOANER_defaultMoans.hot;
	}
	if(pleasure.medium==undefined || pleasure.medium.length==0){
		pleasure.medium=M_MOANER_defaultMoans.medium;
	}
	if(pleasure.light==undefined || pleasure.light.length==0){
		pleasure.light=M_MOANER_defaultMoans.light;
	}
	if(pleasure.low==undefined || pleasure.low.length==0){
		pleasure.low=M_MOANER_defaultMoans.low;
	}
	if(pleasure.orgasm==undefined || pleasure.orgasm.length==0){
		pleasure.orgasm=M_MOANER_defaultMoans.orgasm;
	}
	if(pleasure.pain==undefined || pleasure.pain.length==0){
		pleasure.pain=M_MOANER_defaultMoans.pain;
	}

	M_MOANER_moansProfiles[name]=pleasure;

}

function addLowMoans(name,pleasureList){

	var profile=M_MOANER_moansProfiles[name];
	if(profile==undefined){
		profiledefaultPleasureMoans;
	}
	profile.low=pleasureList;
	addMoansProfile(name,profile);

}
M_MOANER_addMoansProfile("default",M_MOANER_defaultMoans);