
/**
 * common util function 
 */
var isCookieSet = false;
var userAgent = "";
var versionStr = "";

function getParams() {
	var idx = document.URL.indexOf('?');
	var params = new Array();

	if (idx != -1) {
		var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
		for (var i=0; i<pairs.length; i++) {
			var nameVal = pairs[i].split('=');
			params[nameVal[0]] = nameVal[1];
		}
	}
	return params;
}

function setTdElementText(elementId, text) {
	var e = document.getElementById(elementId);
	if( e != null) {
		e.firstChild.nodeValue = text;
	}
}

function setElementBgColor(elementId, color) {
	var e = document.getElementById(elementId);
	if(elementId != null) {
		e.style.backgroundColor = color;
	}
}

function setElementBackground(elementId, backGround) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.style.background = backGround;
	}
}

function setInnerHtml(elementId, html) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.innerHTML = html;
	}
}

function setImgSrc(elementId, src) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.src = src;
	}
}

function getBitrateImageTag(level) {
	if(level >= 0 && level < 6) {
		return "<img src=\"../image/pg_bar/SIGNAL_"+level+".png\" alt=\"\" width=\"57px\" height=\"41px\"/>";; 
	} else {
		return "";
	}
}

function replaceAll(source, searchValue, replaceValue) {
	var toIdx = source.indexOf(searchValue, idx);
	if(toIdx < 0) {
		return source;
	}
	var rtnVal = "";
	var idx = 0;
	while(toIdx > -1) {
		rtnVal += source.substring(idx, toIdx);
		rtnVal += replaceValue;
		idx = toIdx + searchValue.length;
		toIdx = source.indexOf(searchValue, idx);
	}
	rtnVal += source.substring(idx, source.length);
	return rtnVal;
}

function setElementVisibility(elementId, isVisible) {
	var e = document.getElementById(elementId);
	if(e != null) {
		if (isVisible) {
			e.style.visibility="";		
		} else {
			e.style.visibility="hidden";
		}
	}
}

function addEvent(object, eventStr, func) {
	try {
		object.addEventListener(eventStr, func, false);
	} catch (e) {
		alert("addEvent["+eventStr+"]["+func+"] ["+e.message+"]");
	}
}

function removeEvent(object, eventStr, func) {
	try {
		object.removeEventListener(eventStr, func);
	} catch (e) {
		alert("removeEvent["+eventStr+"]["+func+"] ["+e.message+"] ");
	}
}

function setKeyHelpAction(keyHelpId, activeFlag, action, innerHtml) {
	var kh = document.getElementById("kh_"+keyHelpId);
	if(kh != null) {
		if(activeFlag) {
			kh.onmouseover = new Function("processKeyHelpOver("+keyHelpId+");"); 
			kh.onmouseout = new Function("processKeyHelpOut("+keyHelpId+")");
			kh.onmousedown = new Function(action);
			setInnerHtml("kh_"+keyHelpId, innerHtml);
		} else {
			kh.onmouseover = "";
			kh.onmouseout = "";
			kh.onmousedown = "";
			setInnerHtml("kh_"+keyHelpId, "&nbsp;");
		}
	}
}

function processKeyHelpOver(elementId, prefix) {
	
	if(prefix != null && prefix != 'undefined') {	
		document.getElementById(prefix+'kh_'+elementId).style.width = "197px";
		document.getElementById(prefix+'kh_'+elementId).style.height = "59px";
		setElementBackground(prefix+"kh_"+elementId,"url(../image/KEYHELP/KEYHELP_FOCUS.png)");
		
	} else {
		if (document.getElementById('khImg'+elementId) == null || 
				document.getElementById('khImg'+elementId).style.visibility != 'hidden') {	
			
			document.getElementById('kh_'+elementId).style.width = "197px";
			document.getElementById('kh_'+elementId).style.height = "59px";
			setElementBackground("kh_"+elementId,"url(../image/KEYHELP/KEYHELP_FOCUS.png)");
		}
	}
}

function processKeyHelpOut(elementId, prefix) {
	
	fullModeCtrlView = 1;
	if(prefix != null && prefix != 'undefined') {
		document.getElementById(prefix+'kh_'+elementId).style.width = "191px";
		document.getElementById(prefix+'kh_'+elementId).style.height = "56px";
		setElementBackground(prefix+"kh_"+elementId,"url(../image/KEYHELP/KEYHELP_NORMAL.png)");
	} else {
		if (document.getElementById('kh_'+elementId) != null){
			document.getElementById('kh_'+elementId).style.width = "191px";
			document.getElementById('kh_'+elementId).style.height = "56px";
		}
		setElementBackground("kh_"+elementId,"url(../image/KEYHELP/KEYHELP_NORMAL.png)");
	}
}

function processKeyHelp(actionId) {

	switch(actionId) {
	
		case 'option' :
			//full screen mode auto??
			break;
		case 'sign-in' :
			location.href = '../Search/sign-in/pages/keyboard_basic.html';
			break;
		//Add to List
		case 'addList' :
			addList();			
			break;
		//Play All
		case 'playAll' :
			//playAll();
			//add
			pAll = 1;
			audioPlay(1);
			break;
		case 'repeatAll' :
			pAll = 2;
			audioPlay(1);
			break;
		//Now Playing
		case 'nowPlay' :
		{
			nowPlay();
			break;
		} 		
		case 'back' :
			setCookies();
			window.history.back();
			break;
		case 'home' :
			window.NetCastReturn(VK_BACK);
			break;
		case 'exit' :
			setCookies();
			//window.NetCastExit();
			alert("window.NetCastExit() is not recommended to use");
			break;
		
		//deleteList
		case 'deleteList':
			deleteList();
			break;
		
		default :
			break;
	}
}

function setCookie(key,value,expire) {
	var cookieDate = new Date();
	cookieDate.setDate(cookieDate.getDate() + parseInt(expire));
	document.cookie = key + "=" + escape(value) + "; expires=" + cookieDate.toGMTString() + "; path=/";
}

function getCookie(key) {
	   var cookie = document.cookie;
	   var first = cookie.indexOf(key+"=");
	   if (first>=0) {
	       var str = cookie.substring(first,cookie.length);
	       var last = str.indexOf(";");
	       if (last<0) {
	           last = str.length;
	       }
	       str = str.substring(0,last).split("=");
	       return unescape(str[1]);
	   } else {
	       return null;
	   }
}

function delCookie(key) {
	   today = new Date();
	   today.setDate(today.getDate() - 1);
	   document.cookie = key + "=; path=/; expires=" + today.toGMTString() + ";";
}

function getKeyValue(keyId) {
	
	var keyItem = document.getElementById(keyId);	
	if(keyItem != null) {
		return keyItem.firstChild.nodeValue;
	} else {
		return null;
	}
}

function getUserAgent() {
	userAgent = new String(navigator.userAgent);
	var LG_TV = "";
	var LG_TV_BG = "";
	var LG_MEDIA = "";
	var LG_MEDIA_BG = "";		
	if (userAgent.search("LG NetCast.TV") > -1 ) {	
		LG_TV = document.getElementById("key_tv");
		LG_TV_BG = document.getElementById("key_tv_bg");
		if(LG_TV_BG!=null){
			LG_TV_BG.style.display = "";
		}
		LG_TV.style.display = "";		
		versionStr = "v 1.000 (20101228) -TV";			
	} else if (userAgent.search("LG NetCast.Media") > -1 ){
		LG_MEDIA = document.getElementById("key_bdp");
		LG_MEDIA_BG = document.getElementByd("key_bdp_bg");
		if(LG_MEDIA_BG!=null){
			LG_MEDIA_BG.style.display = "";
		}
		LG_MEDIA.style.display = "";
		versionStr = "v 1.000 (20101228) -BDP";
	} else {	
	  // alert("other browser");	    	   
	}

}