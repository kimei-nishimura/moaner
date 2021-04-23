/*const basefactor4Moans=["n... Nyah♥","Oooh","mmmmmh!","NYyaaA♥"];
const basefactor3Moans=["mm","aaaah","nyAh♥"];
const basefactor2Moans=["nyah♥","Aah!","mh","oh!♥","mh♥"];
const basefactor1Moans=["mh","♥oh♥","ah","...♥"];

const baseOrgasmMoans=["Nya...Ny...NyaaAAaah!","Mmmmh... MMmh... Hhhmmmm...","Oooooh... Mmmmh... OooOOOOh!","Mmmhnn... Nyhmm... Nyah!"];

const basePainMoans=["Aie!","Aoouch!","Eek","ouch","Aow"];*/

var profileName="default";

defaultMoans={
	"hot":["n... Nyah♥","Oooh","mmmmmh!","NYyaaA♥"],
	"medium":["mm","aaaah","nyAh♥"],
	"light":["nyah♥","Aah!","mh","oh!♥","mh♥"],
	"low":["mh","♥oh♥","ah","...♥"],
	"orgasm":["Nya...Ny...NyaaAAaah!","Mmmmh... MMmh... Hhhmmmm...","Oooooh... Mmmmh... OooOOOOh!","Mmmhnn... Nyhmm... Nyah!"],
	"pain":["Aie!","Aoouch!","Aaaaie!","Ouch","Aow"]
}

customMoans={
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



var moansProfiles=[];

function activerProfile(name){
	if(moansProfiles[name]==undefined){
		profileName="default";
	}
	else{
		profileName=name;
		resetMoans(Math.random()*300);
	}
}

function getMoans(name){
	var pleasureMoans=moansProfiles[name];
	if(pleasureMoans==undefined){
		pleasureMoans=defaultMoans;
	}
	return pleasureMoans;
}

function addMoansProfile(name,pleasure){
	if(pleasure.hot==undefined || pleasure.hot.length==0){
		pleasure.hot=defaultMoans.hot;
	}
	if(pleasure.medium==undefined || pleasure.medium.length==0){
		pleasure.medium=defaultMoans.medium;
	}
	if(pleasure.light==undefined || pleasure.light.length==0){
		pleasure.light=defaultMoans.light;
	}
	if(pleasure.low==undefined || pleasure.low.length==0){
		pleasure.low=defaultMoans.low;
	}
	if(pleasure.orgasm==undefined || pleasure.orgasm.length==0){
		pleasure.orgasm=defaultMoans.orgasm;
	}
	if(pleasure.pain==undefined || pleasure.pain.length==0){
		pleasure.pain=defaultMoans.pain;
	}

	moansProfiles[name]=pleasure;

}

function addLowMoans(name,pleasureList){

	var profile=moansProfiles[name];
	if(profile==undefined){
		profiledefaultPleasureMoans;
	}
	profile.low=pleasureList;
	addMoansProfile(name,profile);

}
addMoansProfile("default",defaultMoans);