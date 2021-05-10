//Boot up sequence


window.addEventListener("load", () => {

  function M_MOANER_AddExternalScript(scriptLink) {
	let script = document.createElement("script");
	script.src = scriptLink;
	script.src.async = false;
	return document.head.appendChild(script);
  }
  
  function M_MOANER_AddScript(scriptFileName) {
	let script = document.createElement("script");
	script.src = chrome.runtime.getURL(scriptFileName);
	return document.head.appendChild(script);
  }
  
  const M_MOANER_externalScripts = [];
  
  
  const M_MOANER_scripts = [
	"js/system/util.js",
	"js/system/controls.js",
	"js/Reactions/moansManagement.js",
	"js/system/ChatRoom.js",
	"js/Reactions/Reactions.js",
	"js/moans.js"
  ];
  
  M_MOANER_externalScripts.forEach(M_MOANER_AddExternalScript);
  M_MOANER_scripts.forEach(M_MOANER_AddScript);
  

});



