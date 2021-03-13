//Boot up sequence


window.addEventListener("load", () => {

  function AddExternalScript(scriptLink) {
	let script = document.createElement("script");
	script.src = scriptLink;
	script.src.async = false;
	return document.head.appendChild(script);
  }
  
  function AddScript(scriptFileName) {
	let script = document.createElement("script");
	script.src = chrome.runtime.getURL(scriptFileName);
	return document.head.appendChild(script);
  }
  
  const externalScripts = [];
  
  
  const scripts = [
	"js/system/util.js",
	"js/Reactions/moans.js",
	"js/system/ChatRoom.js",
	"js/Reactions/Reactions.js",
  ];
  
  externalScripts.forEach(AddExternalScript);
  scripts.forEach(AddScript);
  

});



