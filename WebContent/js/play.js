// add eunmi

var page;
var listCnt = 0;

//add
var totalTime = 0;
var songs = new Array();
var songTitle = new Array();
var current_song; // start at song 1 in playlist
var currentPosition = 0;
var duration = 0;
var pAll=0;	
var progressBarPx;

function audioPlay(id){
	current_song = id;
	play_list = current_list;
	play_song = current_song;		
	list_update();
	playInit();
	playButtonDown = new Array();
	playButtonDown[id] = 1;
	var audio_player_obj = '<object id="media" data="'+ list[current_list][current_song].media + '" type="audio/x-pn-realaudio-plugin" width="0" height="0" autostart="true" downloadable="false"></object>';
	document.getElementById('mediaDiv').innerHTML=audio_player_obj;
	document.getElementById('musicName').innerHTML=list[current_list][id].title;
	//////// play Button Image
/*
  if(id > ((pageNo + 1) * blockSize)){
  	keyDownByKeyCode(VK_DOWN);
  }else if(id <=((pageNo) * blockSize)){
  	keyDownByKeyCode(VK_UP);
  }else{
  	//do-nothing
  }
*/  
  setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PAUSE.png");	 
}

function playInit() {
	setElementVisibility("progressFocus", false);
	setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PAUSE.png");	
	var m = getMedia(); 
	if(m != null) {
		m.onPlayStateChange = onPlayStateChange;
		m.onError = onError;		
	}
	tmOut = setInterval("refreshMediaControl();", 1000);
//	setTdElementText("versionInfo", versionStr);
	setTdElementText("playTimeCur", getTimeText(0));

}

function playUnload() {
	var m = getMedia();
	if(m != null) {
		m.stop();
	}
	if ( tmOut != null ) {
		clearInterval(tmOut);
	}
	removeEvent(document, "mousemove", motionMoveOnProgressBar);
	removeEvent(document, "mousemove", processDescScrollDrag);
	removeEvent(document, "mouseup", processDescScrollUp);
}

function getMedia() {
	return document.getElementById("media");
}

//RCU key down handle
function processKeyDown(event) {
	var keyCode;
	if(window.event) { // IE
		keyCode = event.keyCode;
	} else if(event.which) { // Netscape/Firefox/Opera
		keyCode = event.which;
	} else {
		alert("Unknown event type.");
		return ;
	}
	fullModeCtrlView = 1;
	refreshMediaControl();
	switch(keyCode) {
		case VK_0 :
		case VK_1 :
		case VK_2 :
		case VK_3 :
		case VK_4 :
		case VK_5 :
		case VK_6 :
		case VK_7 :
		case VK_8 :
		case VK_9 :
			break;
		case VK_UP :
			if(playMode=='scan') {
				moveDescScrollByKey("UP");
			} else if(playMode=='rel') {
				if(currRelPosition == null) {
					doHighlightRel(null, "play");
					currRelPosition = "play";
				} else if(currRelPosition != "play") {
					if( currRelIdx > 0) {
						if(currRelPosition == "0") {
							currRelTopIdx --;
							currRelIdx--;
							updateRelListCnt(currRelIdx);
							fillRelatedList();
						} else {
							currRelIdx--;
							doHighlightRel(null, new Number(currRelPosition)-1);
							relEtcVisibleCheck();
						}
					}
				}
			}
			break;
		case VK_PAGE_UP :
			if(playMode=='scan') {
				moveDescScrollByKey("UP");
			} else if(playMode=='rel') {
				if(currRelPosition != "play") {
					relListPageUp(null);
				}
			}
			break;
		case VK_DOWN :
			if(playMode=='scan') {
				moveDescScrollByKey("DOWN");
			} else if(playMode=='rel') {
				if(currRelPosition == null) {
					doHighlightRel(null, "play");
					currRelPosition = "play";
				} else if(currRelPosition != "play") {
					if( currRelIdx+1 < relCnt ) {
						if(currRelPosition == "3") {
							currRelTopIdx ++;
							currRelIdx++;
							updateRelListCnt(currRelIdx);
							fillRelatedList();
						} else {
							currRelIdx++;
							doHighlightRel(null, new Number(currRelPosition)+1);
							relEtcVisibleCheck();
						}
					}
				}
			}
			break;
		case VK_PAGE_DOWN :
			if(playMode=='scan') {
				moveDescScrollByKey("DOWN");
			} else if(playMode=='rel') {
				if(currRelPosition != "play") {
					relListPageDown(null);
				}
			}
			break;
		case VK_LEFT :
			// backward 1 %
			if(playMode=='rel') {
				if(currRelPosition == null) {
					doHighlightRel(null, "play");
					currRelPosition = "play";
				} else if(currRelPosition != "play") {
					previousRelPosition = currRelPosition;
					doHighlightRel(null, "play");
					switchKeyHelpArea("relOnPlay");
				}
			} else {
				seekMedia("LEFT");
			}
			break;
		case VK_RIGHT :
			// forward 1 %
			if(playMode=='rel') {
				if(currRelPosition == null) {
					doHighlightRel(null, "play");
					currRelPosition = "play";
				} else if(currRelPosition == "play") {
					if(relCnt > 0) {
						doHighlightRel(null, previousRelPosition);
						switchKeyHelpArea("relOnList");
					}
				}
			} else {
				seekMedia("RIGHT");
			}
			break;
		case VK_ENTER :
			if( playMode == 'rel') {
				if(currRelPosition=="play") {
					executeAction("play");
				} else {
					playRelVideo();
				}
			}
			break;
		case VK_BACK :
			executeAction('back');
			break;
		case VK_RED :
			break;
		case VK_GREEN :
			if( playMode == 'scan' ) {
				executeAction('full');
			} else if(playMode == 'full') {
				executeAction('scan');
			}
			break;
		case VK_YELLOW :
			break;
		case VK_BLUE :
			break;
		case VK_PLAY :
			alert("PLAY");
			//if(playMode != "rel") {
				executeAction('play');
		//	}
			break;
		case VK_PAUSE :
			alert("PAUSE");
			executeAction('pause');
			break;
		case VK_STOP :
			alert("STOP");
			executeAction('stop');
			break;
		case VK_REWIND :
			// backward 5 %
			if(playMode=='rel') {
				
			} else {
				seekMedia("RE");
			}
			break;
		case VK_FAST_FWD :
			// forward 5 %
			if(playMode=='rel') {
				
			} else {
				seekMedia("FF");
			}
			break;
		case VK_INFO :
			document.location.reload();
			break;
		default :
			break;
	}
}

var playMediaId = 1;

// 'full' or 'scan' or 'rel'  
var playMode = "scan";
fullModeCtrlView = 0;

function onError() {
	var media = getMedia();
	var errorMsg = "error occured. (ERRCODE:"+media.error+")";
	alert(errorMsg);
}

function onPlayStateChange() {
	var media = getMedia();
	var playState = media.playState;
	if(playState == 5) {
		//when media terminated.?
		executeAction('stop');
	} else if(playState==1) {
		//when media start ?
		setElementVisibility("loadingIcon",false);
	} else if(playState == 4) {
		//buffring
		setElementVisibility("loadingIcon",true);
	} else if(playState == 0) {
		
	}
}

var tmOut = null;
var descScrollActivated = true;

function processIconFocusHandle(divId, action) {
	switch(action) {
		case 'over' :
			if(playMode == "full") {
				var stopElement = document.getElementById("StopIconFull");
				var playElement = document.getElementById("PlayIconFull");
				if( divId == "StopIconFull") {
					playElement.style.zIndex = "10100";
					stopElement.style.zIndex = "10200";
				} else if (divId == "PlayIconFull") {
					playElement.style.zIndex = "10200";
					stopElement.style.zIndex = "10100";
				}
			} 				
			setElementBgColor(divId, "rgb(112,37,215)");
			break;
		case 'out' :
			//setElementBgColor(divId, "rgb(20,22,19)");				
			setElementBgColor(divId, "transparent");				
			break;
		default :
			break;
	}
}

function executeAction(action, position) {
	var m = getMedia(); 
	var v = document.getElementById("mediaDiv");
	var li = document.getElementById("loadingIcon");
	actionP = action;
	if(playMode=='scan') {
		//test
		//lert("m.playState : " + m.playState + "\nm.data : " + m.data);
		var curTogButIcon = document.getElementById("playCtrl").src;
		var curTogButStat = "PAUSE";
		if(curTogButIcon.indexOf("MUSIC_PLAYER_ICON_PLAY") > -1){
			curTogButStat = "PLAY";
		}
		switch(action) {
			case 'playToggle' :
			  //added as ux change
			  if(m.data == null || m.data == "" || m.data == "undefined"){return;}
				//if(m.playState == 1) {
				if(curTogButStat == "PAUSE") {
					m.play(0); //pause
					setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PLAY.png");
				} else {
					m.play(1); // play
					setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PAUSE.png");
				}
				break;
			case 'play' :
				m.play(1); // play
				setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PAUSE.png");
				break;
			case 'pause' :
				m.play(0); //pause
				setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PLAY.png");
				break;
			case 'stop' :
				m.stop();
				seekByRCUDelaySec = -1;
				seekByRCUPosition = -1;
				updateBarElement(0, 0, 1);
				setTdElementText("playTimeCur", getTimeText(0));
				//modified as ux change
				//setTdElementText("playTimeTotal", "/" + getTimeText(0));
				setTdElementText("playTimeTotal", getTimeText(0));
				//goRelatedModeFromScanMode();
				setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PLAY.png");
				break;
			case 'full' :
				//goFullScreenMode(v, li, m);
				break;
			case 'back' :
				window.history.back();
				break;
			case 'rw' :
				next_song(1);
				break;
			case 'fw' :
				next_song(2);
				break;
			default :
				break;
		}
	} 
}

function goScanMode(mDiv, lIcon, media) {
	//go just scan
	playMode = "scan";
	setElementVisibility("titleArea",true);
	setElementVisibility("keyHelpArea",true);
	switchKeyHelpArea('scan');
	setElementVisibility("fullKeyHelpArea",false);
	setElementVisibility("fullMediaControl",false);
	mDiv.style.top = '203px';
	mDiv.style.left = '69px';
	mDiv.style.width = '542px';
	mDiv.style.height = '271px';
	lIcon.style.top = '262px';
	lIcon.style.left = '261px';
	media.width = 542;
	media.height = 271;	
	refreshMediaControl();
}

function goFullScreenMode(mDiv, lIcon, media) {
	//go full screen
	playMode = "full";
	setElementVisibility("titleArea",false);
	setElementVisibility("keyHelpArea",false);
	setElementVisibility("fullKeyHelpArea",true);
	setElementVisibility("fullMediaControl",true);
	mDiv.style.top = '0px';
	mDiv.style.left = '0px';
	mDiv.style.width = '1280px';
	mDiv.style.height = '720px';
	lIcon.style.left = '559px';
	lIcon.style.top = '279px';
	media.width = 1280;
	media.height = 720;	
	fullModeCtrlView = 1;
	refreshMediaControl();
}

var relCnt = 0;
var currRelIdx = 0;
var currRelTopIdx = 0;
var currRelPosition = "play";
var previousRelPosition = 0;

function goRelatedModeFromScanMode() {
	//base on ScanMode
	playMode = "rel";
	switchKeyHelpArea("relOnPlay");
	setElementVisibility("loadingIcon",false); 
	setElementVisibility("largePlayIcon",true);
	setInnerHtml("rightTitle", "<img src=\"../image/common/ICON_RELATED.png\" width=\"28px\" height=\"28px\"  style=\"vertical-align: middle;\" /> Related Videos");
	setElementVisibility("descDiv",false);
	setElementVisibility("relListDiv",true);
	setElementBgColor("rightMainTd","rgb(20,20,20)");

	// relListCnt
	relCnt = relTitle.length;
	if(relCnt == 0 ) {
		setTdElementText("relListCnt", "0/0");
	} else {
		setTdElementText("relListCnt", "1/"+relCnt);
	}
	if(relCnt>4) {
		setElementVisibility("descScroll", true);
	} else {
		setElementVisibility("descScroll", false);
	}
	setElementVisibility("relEtc",true);
	setElementVisibility("relEtcImg",true);
	relEtcVisibleCheck();
	currRelIdx = 0;
	currRelTopIdx = 0;
	fillRelatedList(); 
	currRelPosition = "play";
	doHighlightRel(null, "play");
	descScrollImgTop = 0;
	moveDescScroll();
}

function fillRelatedList() {
	var minRel = (relCnt-currRelTopIdx )> 4 ? 4 : (relCnt-currRelTopIdx ) ;
	var idx = currRelTopIdx;
	minRel++;
	for(var i=0; i< minRel ; i++ ) {
		setInnerHtml("relThumenail_"+i , relImg[idx] );
		
		setTdElementText("relTitle_"+i, relTitle[idx]);
		if(i==4) {
			var te = document.getElementById("relTitle_4");
			if(te != null ) {
				te.style.fontSize="30px";
				te.style.color="rgb(157,157,157)";
			}
		}
		setTdElementText("relViewCount_"+i, relViewCount[idx]);
		setTdElementText("relUploadId_"+i, relUploadId[idx]);
		idx++;
	}
	relEtcVisibleCheck();
}

function relEtcVisibleCheck() {
	if(currRelTopIdx + 4 < relCnt) {
		setElementVisibility("relEtc", true);
		setElementVisibility("relEtcImg", true);
	} else {
		setElementVisibility("relEtc", false);
		setElementVisibility("relEtcImg", false);
	}
	
}

function doHighlightRel(event, idx) {
	if( idx == null || idx == 'undefined') {
		return;
	} 
	if ( relCnt < 1 && idx != 'play') {
		return;
	}
	// idx : play or 0~3
	if(currRelPosition !=null && idx != currRelPosition) {
		cancelHighlightRel(null, currRelPosition);
		currRelPosition = idx;
	}
	if(idx == 'play') {
		setElementBackground("largePlayIcon", "url(../image/common/BACKGROUND_LARGE_PLAY.png)");
		if(curHeyHelpState != 'relOnPlay') {
			switchKeyHelpArea('relOnPlay');
		}
		for(var i=0; i<4 ;i++) {
			setRelFocus(false, i);
		}
	} else {
		if(curHeyHelpState != 'relOnList') {
			switchKeyHelpArea('relOnList');
		}
		for(var i=0; i<4 ;i++) {
			if(idx == i) {
				setElementBackground("largePlayIcon", "url(../image/common/BACKGROUND_LARGE_PLAY_NORMAL.png)");
				continue;
			}
			setRelFocus(false, i);
		}
		setRelFocus(true, idx);

		if(event != null) {
			currRelIdx = new Number(currRelTopIdx) + new Number(idx);
			currRelPosition = idx;
		}
		updateRelListCnt(currRelIdx);
		
	}
}

// update related-video count and scroll position  
function updateRelListCnt(currIdx) {
	var cri = currIdx;
	cri++;
	setTdElementText("relListCnt", cri+"/"+relCnt);
	//alert("currIdx ["+currIdx+"]  relCnt ["+relCnt+"] ");
	var scrollTop = Math.floor(  ( new Number(currIdx) / new Number( new Number(relCnt)-1 )) * 350  );
	document.getElementById("scrollImg").style.top = scrollTop + "px";
	
}

function cancelHighlightRel(event, idx) {
	if( idx == null || idx == 'undefined') {
		return;
	}
	if ( relCnt < 1 && idx != 'play') {
		return;
	}
	// idx : play or 0~3
	currRelPosition = null;
	if(idx == 'play') {
		setElementBackground("largePlayIcon", "url(../image/common/BACKGROUND_LARGE_PLAY_NORMAL.png)");
	} else {
		setRelFocus(false, idx);
		if(event != null) {
			currRelIdx = new Number(currRelTopIdx) + new Number(idx);
			previousRelPosition = idx;
		}
	}
}

function setRelFocus(isFocus, idx) {
	if(isFocus) {
		setElementBackground("rel_"+idx, "url('../image/rel_video/RELATED_FOCUS_LONG.png')" );
		document.getElementById("relTitle_"+idx).style.fontSize="34px";
		document.getElementById("relTitle_"+idx).style.top="1px";
		document.getElementById("relTitle_"+idx).style.color="rgb(250,250,250)";
		document.getElementById("relViewCount_"+idx).style.color="rgb(180,185,252)";
		document.getElementById("relUploadId_"+idx).style.color="rgb(180,185,252)";
	} else {
		setElementBackground("rel_"+idx, "" );
		document.getElementById("relTitle_"+idx).style.fontSize="30px";
		document.getElementById("relTitle_"+idx).style.top="3px";
		document.getElementById("relTitle_"+idx).style.color="rgb(157,157,157)";
		document.getElementById("relViewCount_"+idx).style.color="rgb(110,110,110)";
		document.getElementById("relUploadId_"+idx).style.color="rgb(110,110,110)";
	}
}

function playRelVideo() {
	document.location.href = "play.html?id="+relRefId[currRelIdx];
}

function relListPageUp(event) {
	if(event != null) {
		var temp = currRelPosition;
		cancelHighlightRel(null, currRelPosition);
		currRelPosition = temp;
	}
	var nextTop = new Number(currRelTopIdx) - 4;
	if(nextTop < 0) {
		currRelTopIdx = 0;
		cancelHighlightRel(null, currRelPosition);
		currRelPosition = 0;
		currRelIdx = 0;
	} else {
		currRelTopIdx = nextTop;
		currRelIdx = new Number(currRelIdx) - 4;
	}
	refillRelatedList();
}

function relListPageDown(event) {
	if(event != null) {
		var temp = currRelPosition;
		cancelHighlightRel(null, temp);
		currRelPosition = temp;
	}
	var nextTop = new Number(currRelTopIdx) + 4;
	if(nextTop > new Number(relCnt) -4 ) {
		currRelTopIdx = new Number(relCnt) -4;
		cancelHighlightRel(null, currRelPosition);
		currRelPosition = 0;
		currRelIdx = currRelTopIdx;
	} else {
		currRelTopIdx = nextTop;
		currRelIdx = new Number(currRelIdx) + 4;
	}
	refillRelatedList();
}

function refillRelatedList() {
	fillRelatedList();
	currRelIdx = new Number(currRelTopIdx) + new Number(currRelPosition);
	if(currRelPosition!=null) {
		doHighlightRel(null, currRelPosition);
	}
	relEtcVisibleCheck();
}

function doHighlightRelNextPage() {
	setImgSrc("relNextImg", "../image/rel_video/NEXT_FOCUS.jpg");
}

function cancelHighlightRelNextPage() {
	setImgSrc("relNextImg", "../image/rel_video/NEXT.jpg");
}

function doHighlightRelPrevPage() {
	setImgSrc("relPrevImg", "../image/rel_video/PREV_FOCUS.jpg");
}

function cancelHighlightRelPrevPage() {
	setImgSrc("relPrevImg", "../image/rel_video/PREV.jpg");
}

function goScanModeFromRelatedMode() {
	playMode = "scan";
	switchKeyHelpArea("scan");
	setElementVisibility("largePlayIcon",false);
	setInnerHtml("rightTitle", "<img src=\"../image/common/ICON_INFO.png\" width=\"28px\" height=\"28px\" style=\"vertical-align: middle;\" /> Descriptions");
	setElementVisibility("descDiv",true);
	setElementVisibility("relListDiv",false);
	setElementVisibility("relEtc",false);
	setElementVisibility("relEtcImg",false);

	setTdElementText("relListCnt", " ");
	setElementBgColor("rightMainTd","");

	currRelIdx = 0;
	currRelTopIdx = 0;
	previousRelPosition = 0;
	
	if(descScrollActivated) {
		setElementVisibility("descScroll", true);
		descScrollImgTop = 0;
		moveDescScroll();
	} else {
		setElementVisibility("descScroll", false);
	}
	
}

var curHeyHelpState = 'relOnPlay';

//switch between rel(play, rel) and scan mode.
function switchKeyHelpArea(pm) {
	curHeyHelpState = pm;
	switch(pm) {
		case 'relOnPlay' :
			setKeyHelpAction("0", false, null, null);
			setKeyHelpAction("1", false, null, null);
			setKeyHelpAction("2", false, null, null);
			break;
		case 'relOnList' :
			setKeyHelpAction("0", true, "executeAction('pp')", "<img src=\"../image/keyhelp/KEYHELP_ICON_CH_UP.png\" style=\" vertical-align: middle;\"> Prev. page");
			setKeyHelpAction("1", true, "executeAction('np')", "<img src=\"../image/keyhelp/KEYHELP_ICON_CH_DOWN.png\" style=\" vertical-align: middle;\"> Next page");
			setKeyHelpAction("2", false, null, null);
			break;
		case 'scan' :
			setKeyHelpAction("0", false, null, null);
			setKeyHelpAction("1", false, null, null);
			setKeyHelpAction("2", true, "executeAction('full')", "<img src=\"../image/keyhelp/KEYHELP_ICON_GREEN.png\" style=\" vertical-align: middle;\"> Full Screen");
			break;
		default :
			break;
	}
}

function updateBarElement(bufferEnd, playPosition, playTime) {
	//bufferBar width = 300px : 100%
	//alert("updateBarElement");
	//alert("bufferEnd : " + bufferEnd);
	var bufferBarPx = 0;
	if(bufferEnd == -1) {
		bufferBarPx = 312;		
	} else {
		bufferBarPx = Math.round((bufferEnd/playTime)*312);
	}
	document.getElementById("bufferBar").style.width = bufferBarPx + "px" ;
	//progressBar width = 312px : 100%
	progressBarPx =  Math.round((playPosition/playTime)*312);
	
	// if at end of song then play next song in playlist
	if(progressBarPx == 290){
		if(pAll == 1 || pAll == 2){
			next_song(2); 
			return;
		}
	}
	
	document.getElementById("progressBar").style.width = progressBarPx + "px" ;
	//progressPointer start left 75
	if(seekByRCUDelaySec == -1) {
		progressBarPx = new Number(progressBarPx)+75;
		document.getElementById("progressPointer").style.left = progressBarPx + "px" ;
	}
}

function updateFullModeBarElement(bufferEnd, playPosition, playTime) {
	//bufferBar width = 750px : 100%
	var bufferBarPx = 0;
	if(bufferEnd == -1) {
		bufferBarPx = 750;
	} else {
		bufferBarPx = Math.round((bufferEnd/playTime)*750);
	}
	document.getElementById("bufferBarFull").style.width = bufferBarPx + "px" ;
	//progressBar width = 750px : 100%
	var progressBarPx =  Math.round((playPosition/playTime)*750);
	document.getElementById("progressBarFull").style.width = progressBarPx + "px" ;
	//progressPointer start left 125
	if(seekByRCUDelaySec == -1) {
		progressBarPx = new Number(progressBarPx)+125;
		document.getElementById("progressPointerFull").style.left = progressBarPx + "px" ;
	}
}

var seekByRCUDelaySec = -1;
var seekByRCUPosition = -1;
var seekOnePercent = 0;
var seekFivePercent = 0;

function seekMedia(action) {
	
	var m = getMedia();
	var pi = m.mediaPlayInfo();
	var duration = pi.duration;
	if(pi.currentPosition > pi.duration) {
		duration = pi.currentPosition;
	}
	if(seekByRCUPosition == -1 ) {
		seekOnePercent = Math.floor(duration/100);
		seekFivePercent = Math.floor(duration/20);
		seekByRCUPosition = pi.currentPosition;
		alert("seekByRCUPosition -1" +  " seekOnePercent : " + seekOnePercent + " seekFivePercent : " + seekFivePercent);		
	} else if (seekByRCUPosition == 0) {
		seekOnePercent = Math.floor(duration/100);
		seekFivePercent = Math.floor(duration/20);
		alert("seekByRCUPosition 0" + " seekOnePercent : " + seekOnePercent + " seekFivePercent : " + seekFivePercent);	
	}
	seekByRCUDelaySec = 2;
	
	switch(action) {
		case 'LEFT' :
			// -1%
			seekByRCUPosition = new Number(seekByRCUPosition) - seekOnePercent;
			if(seekByRCUPosition < 0 ) {
				seekByRCUPosition = 0;
			} 
			break; 
		case 'RIGHT' :
			// +1 &
			seekByRCUPosition = new Number(seekByRCUPosition) + seekOnePercent;
			if(seekByRCUPosition > duration ) {
				seekByRCUPosition = duration;
			}
			break; 
		case 'FF' :
			// +5 %
			seekByRCUPosition = new Number(seekByRCUPosition) + seekFivePercent;
			if(seekByRCUPosition > duration ) {
				seekByRCUPosition = duration;
			}
			break; 
		case 'RE' :
			// -5 %
			seekByRCUPosition = new Number(seekByRCUPosition) - seekFivePercent;
			if(seekByRCUPosition < 0 ) {
				seekByRCUPosition = 0;
			} 
			break;
		default :
			return; 
	}
	
	if(playMode=="scan") {
		var pp =  Math.round((seekByRCUPosition/duration)*300);
		pp = new Number(pp)+75;
		document.getElementById("progressPointer").style.left = pp + "px" ;
	}
	refreshMediaControl();
}


function getTimeText(t) {
	var pt = new Number(t) / 1000;
	var hh = Math.floor(pt / 3600);
	var mm = Math.floor((pt % 3600) / 60);
	var ss = Math.floor(pt % 60);

	return "" + (mm < 10 ? "0"+mm : mm) +":"+ (ss < 10 ? "0"+ss : ss);
}

// refresh per 1000ms
function refreshMediaControl() {

	//alert("refreshMediaControl");
	
	var m = getMedia();
	var pi = m.mediaPlayInfo();
	var br = new Number(pi.bitrateInstant) / 1000000;
	var level = 0;	
	
	for( var i=0; i< 5 ; i++ ) {
		if(br >= ( 2 * i ) + 2 ) {
			level++;
		} 
	}
	
	
	if(pi.currentPosition > pi.duration ) {
		currentPosition = pi.currentPosition;
		duration = pi.currentPosition;
	} else {
		currentPosition = pi.currentPosition;
		duration = pi.duration;
	}

		
	if(playMode=='scan') {
		totalTime = getTimeText(duration);
		curTime = getTimeText(currentPosition);	
		setTdElementText("playTimeTotal", getTimeText(duration));	
		setTdElementText("playTimeCur", getTimeText(currentPosition));
		updateBarElement(pi.bufEnd, currentPosition, duration);
		
		var pp =  Math.round((currentPosition/duration)*300);
		pp = new Number(pp)+75;
		document.getElementById("progressPointer").style.left = pp + "px" ;
	} 
	
	if(seekByRCUDelaySec > 0) {
		seekByRCUDelaySec --;
	} else if (seekByRCUDelaySec == 0) {
		//seek
		m.seek(seekByRCUPosition);
		seekByRCUDelaySec = -1;
		seekByRCUPosition = -1;
	} 
}

function progressIconHandle(event, action) {
	var m = getMedia();
	// it is only activated in play or pause state  
	var pState = m.playState;
	if( pState != 1 && pState != 2) {
		return;
	}
	var postFix = "";
	var isFullMode = false;
	if(playMode == 'full') {
		postFix = 'Full';
		isFullMode = true;
		fullModeCtrlView = 1;
	}
	switch(action) {
		case 'over' :
			setElementVisibility("progressFocus"+postFix, true);
			motionMoveOnProgressBar(event);
			addEvent(document, "mousemove", motionMoveOnProgressBar);
			break;
		case 'out' :
			break;
		case 'down' :
			var l = document.getElementById("progressFocus"+postFix).style.pixelLeft;
			if(isFullMode) {
				l = new Number(l) + 20 - 130;
				l = Math.round(new Number(l) / 2.5);
			} else {
					//l = new Number(l) - 190;
					l = new Number(l) - 203;
			}
			l = Math.round(300 * l / 311);
			if(l < 0){l = 0;}
			else if(l > 300){l = 300;}
			playMediaAtPosition(l);
			break;
		default :
			break;
	} 
}

function motionMoveOnProgressBar(event) {
	var x = event.clientX;
	var y = event.clientY;
	
		//if( x > 1058 || y < 602  || y > 639 || x < 772 ) {
		if( x > 1078 || y < 638  || y > 678 || x < 767 ) {
			setElementVisibility("progressFocus", false);
			removeEvent(document, "mousemove", motionMoveOnProgressBar);
		} else {  
			var p = new Number(x) - 564;
			document.getElementById("progressFocus").style.left = p + "px";
		}
}

function playMediaAtPosition(position) {
	// position : 0 ~ 300;
	var m = getMedia();
	var pi = m.mediaPlayInfo();
	var playTime = pi.duration;
	if(pi.currentPosition > pi.duration ) {
		playTime = pi.currentPosition;
	}
	var p = Math.round( new Number((playTime) * (position/300)));
	//added as ux change
	var curPlayState = m.playState;
	m.play(1);
	m.seek(p);
	if(playMode=='scan') {
		setImgSrc('playCtrl', "../image/PLAYER/MUSIC_PLAYER_ICON_PAUSE.png");
	}
	m.play(1);
	refreshMediaControl();
}

// add Eunmi

/**
 * media description scroll
 */

function processDescScrollOut() {
	setImgSrc("scrollImg","../image/PORT_SCROLL_BAR.png" );
}
	
function processDescScrollOver() {
	setImgSrc("scrollImg", "../image/PORT_SCROLL_BAR_FOCUS.png" );
}

var descScrollImgTop = 0;

function moveDescScrollByClick(event) {
	//descScrollImgTop = parseInt(event.clientY) - 193;
	descScrollImgTop = parseInt(event.clientY) - 223;

	if(descScrollImgTop < 0 ) {
		descScrollImgTop = 0;
	} else if ( descScrollImgTop > 310 ) {
		descScrollImgTop = 310;
	} 
		
	if(playMode=='rel') {
		var tempScrollTop = 0;
		var inter = Math.round( 310 / (new Number(relCnt)-1));
		var relIdx = Math.round( descScrollImgTop/inter );
		var scrollTop = inter*relIdx;
		
		document.getElementById("scrollImg").style.top = scrollTop + "px";

		currRelIdx = relIdx;
		if(currRelIdx > new Number(relCnt) -4) {
			currRelTopIdx = new Number(relCnt) -4;
			currRelPosition = currRelIdx - currRelIdx;
		} else {
			currRelTopIdx = currRelIdx;
			currRelPosition = 0;
		}
		fillRelatedList();
		relIdx++;
		setTdElementText("relListCnt", relIdx+"/"+relCnt);
		relEtcVisibleCheck();
	} else {
		moveDescScroll();
	}
}

function moveDescScrollByKey(action) {
	if(descScrollActivated == false) {
		return;
	}
	switch(action) {
		case 'DOWN' :
			descScrollImgTop = new Number(descScrollImgTop) + 30;
			if(descScrollImgTop > 310) {
				descScrollImgTop = 310;
			}
			break;
		case 'UP' :
			descScrollImgTop = new Number(descScrollImgTop) - 30;
			if(descScrollImgTop < 0) {
				descScrollImgTop = 0;
			}
			break;
		default :
			break;
	}
	moveDescScroll();
}

var descScrollY = 0;

function processDescScrollDown(event) {
	//alert("listCnt : " + listCnt);
	//alert("AudioId.length :  " + AudioId.length-1);
	var e = document.getElementById("scrollImg");
	descScrollY = event.clientY - e.offsetTop;
	//alert("e.offsetTop : " + e.offsetTop + " descScrollY : " + descScrollY);
	if(listCnt > 6){
		addEvent(document, "mousemove", processDescScrollDrag);
		addEvent(document, "mouseup", processDescScrollUp);
	}
}

function page1(){
		page = 1;
		/*list1.innerHTML = AudioTitle[1];
		list2.innerHTML = AudioTitle[2];
		list3.innerHTML = AudioTitle[3];
		list4.innerHTML = AudioTitle[4];
		list5.innerHTML = AudioTitle[5];
		list6.innerHTML = AudioTitle[6];*/
		for(var i = 1 ; i <= 6 ; i ++){
			list[i].innerHTML = AudioTitle[i];
		}
}

function page2(){
		page = 2; 
		/*list1.innerHTML = AudioTitle[7];
		list2.innerHTML = AudioTitle[8];
		list3.innerHTML = AudioTitle[9];
		list4.innerHTML = AudioTitle[10];
		list5.innerHTML = AudioTitle[11];
		list6.innerHTML = AudioTitle[12]; */
		var j = 1;
		for(var i = 1 ; i <= listCnt ; i ++){
			list[i].innerHTML = AudioTitle[i+6];
		}
}

function processDescScrollUp(event) {
	moveDescScrollByClick(event);
	removeEvent(document, "mousemove", processDescScrollDrag);
	removeEvent(document, "mouseup", processDescScrollUp);
  processDescScrollOut();
}

function processDescScrollDrag(event) {
	var e = document.getElementById("scrollImg");
	var top = event.clientY - descScrollY;
	if( top < 0 ) { 
		top = 0;
	} else if( top >310 ){
		top = 310;
	}
   
   if(top ==0 ){ 	
  	page1(); 	
  }else if(top == 310){
  	page2();
  }
    e.style.top = top + "px"; 
}

function moveDescScroll() {
	var descHeight = parseInt(document.getElementById("desc").offsetHeight);
	var scrollPercent = (descScrollImgTop/310)*100;
	var descTop = -(scrollPercent/100)*(descHeight - 310);
	if (descScrollImgTop <= 310) {
		document.getElementById("desc").style.top = descTop + "px";
		document.getElementById("scrollImg").style.top = descScrollImgTop + "px";
	}
}





//add 
function next_song(dir)
{
	
	playlist_length = songs.length - 1;
	
	//stop the current song if playing
	var m = getMedia(); 	
	m.stop();
			
	// previous
	if (dir == 1){
		current_song--;
		if (current_song < 1) {
			//current_song = playlist_length; // loop to last song
			current_song = 1;
			return;
		}
	}	else { // next
		current_song++;
		if (current_song > playlist_length){
			//current_song = 1; // loop to first song
		  current_song = playlist_length;
			return;
		}
		if (current_song == playlist_length){
		  if(pAll == 1){
			  pAll = 0;
			}
		}
	}
	
	audioPlay(current_song);
	
} // end function next_song(dir)

function removeMusicButtonFocus(){
	processIconFocusHandle('RwIcon','out');
	processIconFocusHandle('StopIcon','out');
	processIconFocusHandle('PlayIcon','out');
	processIconFocusHandle('FwIcon','out');
}
