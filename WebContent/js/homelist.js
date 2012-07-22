
var currentKeyId = "";
var dataCount = 10;
var checkBoxTop = "";
var checkBoxLeft = "";

//checkBox check/uncheck Info Array
var TemporadaVArray = new Array();
var TemporadaIVArray = new Array();
var TemporadaIIIArray = new Array();
var TemporadaIIArray = new Array();
var TemporadaIArray = new Array();
var playListArray1 = new Array();
var playListArray2 = new Array();
var playListArray3 = new Array();
var playListArray4 = new Array();
//playList title & url
var pTitleList1 = new Array();
var pTitleList2 = new Array();
var pTitleList3 = new Array();
var pTitleList4 = new Array();
var pUrlList1 = new Array();
var pUrlList2 = new Array();
var pUrlList3 = new Array();
var pUrlList4 = new Array();
//url
var pArray = new Array();
var rArray = new Array();
var dArray = new Array();
var jArray = new Array();
var cArray = new Array();
//title
var ptArray = new Array();
var rtArray = new Array();
var dtArray = new Array();
var jtArray = new Array();
var ctArray = new Array();

var playButtonDown = new Array();

var strTotalTitleList = "";
var strTotalUrlList = "";

var selectMainKeyId = "";	//selectedKey
var selectGenreKeyId = "";
var selectPlayListKeyId = "";
var genre  = "";
var popVisibleState;	// 0 : main / 1 : addList / 2 : addListMessage / 3 : removeMessage
var listSize;
var pageNo;
var blockSize;
var menuNum;
var PageSize;
var totalLength;
var menuGb; // 0: Genre 1: Playing List

function homeInit() {
	blockSize = 6;
	totalLength = 0;
	//getCookies(); call to load list from cookie
	pageNo = 0;
	PageSize = 0;
	menuNum = 0;
	document.getElementById('scrollArea').style.visibility = "";
	//strTotalTitleList = "";
	//strTotalUrlList = "";
	listSize = AudioId.length-1;	//firstIdx = 1
	popVisibleState = 0;
	fCnt = listSize;
	//genre = "";
	initValue();

	//commented as ux change
	//musicListInit(pageNo,blockSize);

	document.getElementById('markAll').innerHTML = "Marcar Todo";
	document.getElementById('playList_markAll').innerHTML = "Marcar Todo";
	execKey('menu_01');
	execKey('menu_10');
	doHighlight('music_00');
	getUserAgent();
	setTdElementText("versionInfo", versionStr);
}

function getCookies(){
	var totalTitleStr = "";
	var totlaUrlStr = "";

	var getTitleStr = getCookie("pTitleList1");
	var getUrlStr = getCookie("pUrlList1");
	if(getTitleStr!=null && getUrlStr!=null){
		for(i=0; i<getTitleStr.split(",").length; i++){
			if(getTitleStr.split(",")[i]!=null && getTitleStr.split(",")[i] != ""){
				pTitleList1[i] = getTitleStr.split(",")[i];
				pUrlList1[i] = getUrlStr.split(",")[i];
			}
		}
	}
}

function setCookies(){
	if(getCookie("pTitleList1") != "" && getCookie("pUrlList1") != ""){
		//clear cookie_test_status cookie if it have been set
		delCookie("pTitleList1", "/");
		delCookie("pUrlList1", "/");
	}
	var today = new Date();
	var expiry = today.setTime(today.getTime() + 1000*60*60*24); //new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);

	setCookie("pTitleList1", pTitleList1, expiry);
	setCookie("pUrlList1", pUrlList1, expiry);
}

function initValue(){
	pageNo = 0;
	moveScrollByKey(0);
	playButtonDown = new Array();
}

//added as ux change
function unmarkAll(){

	blockSize = 6;
	totalLength = 0;
	pageNo = 0;
	PageSize = 0;
	menuNum = 0;
	initValue();
	musicListInit(pageNo,blockSize);

	var markAllObj = document.getElementById('markAll');
	var playListMarkAllObj = document.getElementById('playList_markAll');
	markAllObj.innerHTML = "Marcar Todo";
	playListMarkAllObj.innerHTML = "Marcar Todo";

  //Temporada V
  if(TemporadaVArray!=null && TemporadaVArray!=""){
	  for(i=0; i<TemporadaVArray.length; i++){	TemporadaVArray[i] = 0; }
  }
  //Temporada IV
  if(TemporadaIVArray!=null && TemporadaIVArray!=""){
	  for(i=0; i<TemporadaIVArray.length; i++){	TemporadaIVArray[i] = 0; }
  }
  //Temporada III
  if(TemporadaIIIArray!=null && TemporadaIIIArray!=""){
	  for(i=0; i<TemporadaIIIArray.length; i++){	TemporadaIIIArray[i] = 0; }
  }
  //Temporada II
  if(TemporadaIIArray!=null && TemporadaIIArray!=""){
	  for(i=0; i<TemporadaIIArray.length; i++){	TemporadaIIArray[i] = 0; }
  }
  //Temporada I
  if(TemporadaIArray!=null && TemporadaIArray!=""){
	  for(i=0; i<TemporadaIArray.length; i++){	TemporadaIArray[i] = 0; }
  }
  //playlist 1
  if(playListArray1!=null && playListArray1!=""){
	  for(i=0; i<playListArray1.length; i++){	playListArray1[i] = 0; }
  }
  //playlist 2
  if(playListArray2!=null && playListArray2!=""){
	  for(i=0; i<playListArray2.length; i++){	playListArray2[i] = 0; }
  }
  //playlist 3
  if(playListArray3!=null && playListArray3!=""){
	  for(i=0; i<playListArray3.length; i++){	playListArray3[i] = 0; }
  }
  //playlist 4
  if(playListArray4!=null && playListArray4!=""){
	  for(i=0; i<playListArray4.length; i++){	playListArray4[i] = 0; }
  }


}

function markAllTextChange(){

	var markAllObj = document.getElementById('markAll');
	var playListMarkAllObj = document.getElementById('playList_markAll');
	var allCheckStat = 0;
	//genre
	if(genre == "Temporada V"){
		if(TemporadaVArray!=null && TemporadaVArray!=""){
			for(i=0; i<TemporadaVArray.length; i++){
				if(TemporadaVArray[i] == 1){
					allCheckStat++;
				}
			}
		}
		if(allCheckStat == TemporadaVArray.length && TemporadaVArray.length!=0){
			markAllObj.innerHTML = "UnMarcar Todo";
		} else{
			markAllObj.innerHTML = "Marcar Todo";
		}
	} else if(genre == "Temporada IV"){
		if(TemporadaIVArray!=null && TemporadaIVArray!=""){
			for(i=0; i<TemporadaIVArray.length; i++){
				if(TemporadaIVArray[i] == 1){
					allCheckStat++;
				}
			}
		}
		if(allCheckStat == TemporadaIVArray.length && TemporadaIVArray.length!=0){
			markAllObj.innerHTML = "UnMarcar Todo";
		} else{
			markAllObj.innerHTML = "Marcar Todo";
		}

	} else if(genre == "Temporada III"){
		if(TemporadaIIIArray!=null && TemporadaIIIArray!=""){
			for(i=0; i<TemporadaIIIArray.length; i++){
				if(TemporadaIIIArray[i] == 1){
					allCheckStat++;
				}
			}
		}
		if(allCheckStat == TemporadaIIIArray.length && TemporadaIIIArray.length!=0){
			markAllObj.innerHTML = "UnMarcar Todo";
		} else{
			markAllObj.innerHTML = "Marcar Todo";
		}

	} else if(genre == "Temporada II"){
		if(TemporadaIIArray!=null && TemporadaIIArray!=""){
			for(i=0; i<TemporadaIIArray.length; i++){
				if(TemporadaIIArray[i] == 1){
					allCheckStat++;
				}
			}
		}
		if(allCheckStat == TemporadaIIArray.length && TemporadaIIArray.length!=0){
			markAllObj.innerHTML = "UnMarcar Todo";
		} else{
			markAllObj.innerHTML = "Marcar Todo";
		}

	} else if(genre == "Temporada I"){
		if(TemporadaIArray!=null && TemporadaIArray!=""){
			for(i=0; i<TemporadaIArray.length; i++){
				if(TemporadaIArray[i] == 1){
					allCheckStat++;
				}
			}
			if(allCheckStat == TemporadaIArray.length && TemporadaIArray.length!=0){
				markAllObj.innerHTML = "UnMarcar Todo";
			} else{
				markAllObj.innerHTML = "Marcar Todo";
			}
		}
	}
	//Lista de reproducción
	if(selectPlayListKeyId == "menu_21"){
		if(playListArray1!=null && playListArray1!=""){
			for(i=0; i<playListArray1.length; i++){
				if(playListArray1[i] == 1){
					allCheckStat++;
				}
			}
			if(allCheckStat == playListArray1.length && playListArray1.length!=0){
				playListMarkAllObj.innerHTML = "UnMarcar Todo";
			} else{
				playListMarkAllObj.innerHTML = "Marcar Todo";
			}
		}
	} else if(selectPlayListKeyId == "menu_22"){
		if(playListArray2!=null && playListArray2!=""){
			for(i=0; i<playListArray2.length; i++){
				if(playListArray2[i] == 1){
					allCheckStat++;
				}
			}
			if(allCheckStat == playListArray2.length && playListArray2.length!=0){
				playListMarkAllObj.innerHTML = "UnMarcar Todo";
			} else{
				playListMarkAllObj.innerHTML = "Marcar Todo";
			}
		}
	} else if(selectPlayListKeyId == "menu_23"){
		if(playListArray3!=null && playListArray3!=""){
			for(i=0; i<playListArray3.length; i++){
				if(playListArray3[i] == 1){
					allCheckStat++;
				}
			}
			if(allCheckStat == playListArray3.length && playListArray3.length!=0){
				playListMarkAllObj.innerHTML = "UnMarcar Todo";
			} else{
				playListMarkAllObj.innerHTML = "Marcar Todo";
			}
		}
	} else if(selectPlayListKeyId == "menu_24"){
		if(playListArray4!=null && playListArray4!=""){
			for(i=0; i<playListArray4.length; i++){
				if(playListArray4[i] == 1){
					allCheckStat++;
				}
			}
			if(allCheckStat == playListArray4.length && playListArray4.length!=0){
				playListMarkAllObj.innerHTML = "UnMarcar Todo";
			} else{
				playListMarkAllObj.innerHTML = "Marcar Todo";
			}
		}
	}

}

var listLength = 0;
function pageCntInit(pageNo,param){
	var totalPageCnt = 0;
	var innerStr = "";
	var PageSize = 0;
	if(selectPlayListKeyId == "menu_20") {
		listLength = 0;
	}
	else if(selectPlayListKeyId == "menu_21"){
		listLength = pTitleList1.length;
	} else if(selectPlayListKeyId == "menu_22"){
		listLength = pTitleList2.length;
	} else if(selectPlayListKeyId == "menu_23"){
		listLength = pTitleList3.length;
	} else if(selectPlayListKeyId == "menu_24"){
		listLength = pTitleList4.length;
	}
	//pageSize
	if(listLength / blockSize == 0){
		PageSize = 0;
	}
	else if(listLength % blockSize == 0){
		PageSize = listLength / blockSize;
		PageSize = Math.floor(PageSize);

	} else if(listLength % blockSize != 0){
		PageSize = listLength / blockSize;
		PageSize = Math.floor(PageSize+1);
	}

	if(param == 'genre'){
		totalPageCnt = Math.floor(listSize/blockSize)+1;
		//innerStr = pageNo+1+" / "+totalPageCnt + ", "+ listSize + "songs";
		innerStr = listSize + " relatos";
		document.getElementById('pageCnt').innerHTML = innerStr;
	} else if(param == 'list'){
		innerStr = pageNo+1+" / "+PageSize;
		document.getElementById('playListPageCnt').innerHTML = innerStr;
		if(PageSize == 0){
			document.getElementById('playListPageCnt').style.visibility = "hidden";
		} else{
			document.getElementById('playListPageCnt').style.visibility = "";
		}
	}
}

function keyDown(event){
  keyDownByKeyCode(event.keyCode);
}

function keyDownByKeyCode(keyCodeToProcess){

	var topIndex = currentKeyId.charAt(6);
	var nextTopIdx = Number(topIndex)+1;
	var preTopIdx = Number(topIndex)-1;
	var listTopIndex = currentKeyId.charAt(7);	//genreListIdx
	var listTopIndex1 = currentKeyId.charAt(10);	//Playing List Idx
	var listTopIndex2 = currentKeyId.charAt(12);	//play Button
	var listNextTopIdx = Number(listTopIndex)+1;
	var listPreTopIdx = Number(listTopIndex)-1;
	var listNextTopIdx1 = Number(listTopIndex1)+1;
	var listPreTopIdx1 = Number(listTopIndex1)-1;
	var listNextTopIdx2 = Number(listTopIndex2)+1;
	var listPreTopIdx2 = Number(listTopIndex2)-1;
	menuNum = currentKeyId.charAt(5);
	//var mainMenuListIdx = 3; //modified as ux change
	var mainMenuListIdx = 5; //modified as ux change
	var subMenuLastIdx = 4;
	var musicListLastIdx = 9;
	var addListPopLastIdx = 5;

	//var subKeyIdx = keyId.charAt(6);
	//switch (event.keyCode) {
	switch (keyCodeToProcess) {

		case VK_LEFT:
		{
			if(popVisibleState == 0){
				if(menuNum == 1 || menuNum == 2){
					cancelHighlight("wkk_key_focus_Sub");
					doHighlight("menu_00");
				} else if(menuNum == 0){
					if(currentKeyId == "play_"+currentKeyId.substring(5,7)) {
						cancelHighlight('wkk_key_play');
						doHighlight("music_"+currentKeyId.substring(5,7));
					}
					else{
						return;
					}
				}
				else {
					if(currentKeyId == "playList_markAll"){
						cancelHighlight("wkk_key_pFocus_markAll");
						doHighlight("menu_20");
					} else if(currentKeyId == "playList_"+currentKeyId.substring(9,11)){
						doHighlight("menu_20");
					}  else if(currentKeyId == "playButton_"+currentKeyId.substring(11,13)){
						doHighlight("playList_"+currentKeyId.substring(11,13));
						break;
					} else if(currentKeyId == "markAll"){
						cancelHighlight("wkk_key_focus_markAll");
						doHighlight("menu_10");
					} else if(currentKeyId == "addToList"){
						cancelHighlight("wkk_key_focus_addToList");
						doHighlight("markAll");
					}	else{
						doHighlight("menu_10");
					}
					//setElementVisibility("wkk_key_focus_markAll",false);
					setElementVisibility("wkk_key_pFocus_markAll",false);
					setElementVisibility("wkk_key_focus_list",false);
					setElementVisibility('wkk_key_play',false);
				}

			} else if(popVisibleState == 1){	//addList
				return;
			} else if(popVisibleState == 2){	//addListMessage
				return;
			} else if(popVisibleState == 3){	//removeMessage
				cancelHighlight("removeCancel");
				doHighlight("removebtnOk");
			}
			break;
		}
		case VK_RIGHT:
		{

			if(popVisibleState == 0){
				if(menuNum == 0){
					if(currentKeyId.substring(0,5)=="play_"){
						return;
					}
					//Top 50
					if(selectMainKeyId == "menu_00"){
						cancelHighlight("wkk_key_focus_Main");
						doHighlight("menu_20");
					}
					//Genre
					else if(selectMainKeyId == "menu_01"){
						cancelHighlight("wkk_key_focus_Main");
						doHighlight("menu_10");
					}
					//Playing List
					else if(selectMainKeyId == "menu_02") {
						cancelHighlight("wkk_key_focus_Main");
						doHighlight("menu_20");
					}
					else if(selectMainKeyId.charAt(5) == 1){
						cancelHighlight("wkk_key_focus_Main");
						doHighlight("menu_10");
					} else if(selectMainKeyId.charAt(5) == 2){
						cancelHighlight("wkk_key_focus_Main");
						doHighlight("menu_20");
					} else {
						cancelHighlight("wkk_key_focus_Main");
						if(menuGb == 0){
							doHighlight("menu_10");
						} else{
							doHighlight("menu_20");
						}
					}
				} else if(menuNum == 1){
					//Contents
					cancelHighlight("wkk_key_focus_Sub");
					doHighlight("markAll");
				} else if(menuNum == 2){
					if(document.getElementById('playList_00').style.visibility == "hidden")return;
					cancelHighlight("wkk_key_focus_Sub");
					doHighlight("playList_markAll");
				} else if(currentKeyId == "markAll"){
					doHighlight("addToList");
					//cancelHighlight("wkk_key_focus_markAll");
          //focusAddToList(true);
					//currentKeyId = "addToList";
				} else if(currentKeyId == "playList_markAll"){
				}
				//Play Button
				else if(currentKeyId == "music_"+currentKeyId.substring(6,8)){
					doHighlight("play_"+currentKeyId.substring(6,8));
				} else if(currentKeyId == "playList_"+currentKeyId.substring(9,11)){
					doHighlight("playButton_"+currentKeyId.substring(9,11));
				}
			} else if(popVisibleState == 1){	//addList
				return;
			} else if(popVisibleState == 2){	//addListMessage
				return;
			} else if(popVisibleState == 3){	//removeMessage
				cancelHighlight("removebtnOk");
				doHighlight("removeCancel");
			}
			break;
		}
		case VK_DOWN:
		{
			if(popVisibleState == 0){
				if(menuNum == 0){
					if(currentKeyId == "play_0"+topIndex){
						if(nextTopIdx>5){
							pageNo = 1;
							nextTopIdx=0;
						} else if(pageNo == 1 && nextTopIdx>0){
							if(nextTopIdx>(listSize-blockSize)-1){
								nextTopIdx = (listSize-blockSize)-1;
							}
							pageNo = 1;
						}
						else {
							pageNo = 0;
						}
						musicListInit(pageNo,blockSize);
						moveScrollByKey(nextTopIdx);
						doHighlight("play_0"+nextTopIdx);

					} else{
						if(nextTopIdx > mainMenuListIdx)nextTopIdx = mainMenuListIdx;
						doHighlight("menu_0"+nextTopIdx);
					}
				} else if(menuNum == 1){
					if(nextTopIdx> subMenuLastIdx)nextTopIdx = subMenuLastIdx;
					doHighlight("menu_1"+nextTopIdx);
				//Content
				} else if(menuNum == 2) {
					if(nextTopIdx> subMenuLastIdx)nextTopIdx = subMenuLastIdx;
					doHighlight("menu_2"+nextTopIdx);
				}	else{
					if(listNextTopIdx > musicListLastIdx){
						//
					}
					if(currentKeyId == "markAll"){
						cancelHighlight("wkk_key_focus_markAll");
						doHighlight("music_00");
					}
					//added as ux change
					else if(currentKeyId == "addToList"){
						cancelHighlight("wkk_key_focus_markAll");
						doHighlight("music_00");
					}else if(currentKeyId == "playList_markAll"){
						cancelHighlight("wkk_key_pFocus_markAll");
						doHighlight("playList_00");
					} else if(currentKeyId == "playList_0"+listTopIndex1){
						var listIdx = Number(listTopIndex1+1);
						var listLength = 0;
						var subKeyIdx = 0;
						if(selectPlayListKeyId == "menu_21"){
							listLength = pTitleList1.length;
							subKeyIdx = 1;
						} else if(selectPlayListKeyId == "menu_22"){
							listLength = pTitleList2.length;
							subKeyIdx = 2;
						} else if(selectPlayListKeyId == "menu_23"){
							listLength = pTitleList3.length;
							subKeyIdx = 3;
						} else if(selectPlayListKeyId == "menu_24"){
							listLength = pTitleList4.length;
							subKeyIdx = 4;
						}
						//pageSize
						if(listLength / blockSize == 0){
							PageSize = 0;
						}
						else if(listLength % blockSize == 0){
							PageSize = listLength / blockSize;
							PageSize = Math.floor(PageSize);

						} else if(listLength % blockSize != 0){
							PageSize = listLength / blockSize;
							PageSize = Math.floor(PageSize+1);
						}
						if(listNextTopIdx1>5){
							pageNo++;
							listNextTopIdx1=0;
							//PageSize = PageSize-1;
							if(Number(pageNo+1) > PageSize){
								listNextTopIdx1=5;
								pageNo--;
								return;
							}
						} else{
							if(Number(pageNo+1) == PageSize){
								if(listNextTopIdx1>(listLength % blockSize)-1){
									if(listLength % blockSize==0){
										//
									}else{
										listNextTopIdx1 = (listLength % blockSize)-1;
									}
								}
							}
						}
						moveScrollByKey(listNextTopIdx1);
						PlayListShow(subKeyIdx);
						doHighlight("playList_0"+listNextTopIdx1);
					} else if(currentKeyId == "playButton_0"+listTopIndex2){
						//var PageSize = 0;
						var listIdx = Number(listTopIndex2+1);
						var listLength = 0;
						var subKeyIdx = 0;
						if(selectPlayListKeyId == "menu_21"){
							listLength = pTitleList1.length;
							subKeyIdx = 1;
						} else if(selectPlayListKeyId == "menu_22"){
							listLength = pTitleList2.length;
							subKeyIdx = 2;
						} else if(selectPlayListKeyId == "menu_23"){
							listLength = pTitleList3.length;
							subKeyIdx = 3;
						} else if(selectPlayListKeyId == "menu_24"){
							listLength = pTitleList4.length;
							subKeyIdx = 4;
						}
						//pageSize
						if(listLength / blockSize == 0){
							PageSize = 0;
						}
						else if(listLength % blockSize == 0){
							PageSize = listLength / blockSize;
							PageSize = Math.floor(PageSize);

						} else if(listLength % blockSize != 0){
							PageSize = listLength / blockSize;
							PageSize = Math.floor(PageSize+1);
						}
						if(listNextTopIdx2>5){
							pageNo++;
							listNextTopIdx2=0;
							//PageSize = PageSize-1;
							if(Number(pageNo+1) > PageSize){
								listNextTopIdx2=5;
								pageNo--;
								return;
							}
						} else{
							if(Number(pageNo+1) == PageSize){
								if(listNextTopIdx2>(listLength % blockSize)-1){
									if(listLength % blockSize==0){
										//listNextTopIdx2 = 1;
									}else{
										listNextTopIdx2 = (listLength % blockSize)-1;
									}
								}
							}
						}
						moveScrollByKey(listNextTopIdx2);
						PlayListShow(subKeyIdx);
						doHighlight("playButton_0"+listNextTopIdx2);
					}	else {
						if(listNextTopIdx>5){
							pageNo = 1;
							listNextTopIdx=0;
						} else if(pageNo == 1 && listNextTopIdx>0){
							if(listNextTopIdx>(listSize-blockSize)-1){
								listNextTopIdx = (listSize-blockSize)-1;
							}
							pageNo = 1;
						}
						else {
							pageNo = 0;
						}
						musicListInit(pageNo,blockSize);
						moveScrollByKey(listNextTopIdx);
						doHighlight("music_0"+listNextTopIdx);
					}
				}
			} else if(popVisibleState == 1){	//addList
				if(listNextTopIdx>addListPopLastIdx)listNextTopIdx = 5;
				cancelHighlight("btnList"+listTopIndex);
				doHighlight("btnList"+listNextTopIdx);
			} else if(popVisibleState == 2){	//addListMessage
				return;
			} else if(popVisibleState == 3){	//removeMessage
				return;
			}
			break;
		}
		case VK_UP:
		{
			if(popVisibleState == 0){
				if(menuNum == 0){
					if(currentKeyId == "play_0"+topIndex){
						if(currentKeyId == "markAll"){return;}
						if(currentKeyId == "addToList"){return;}
						if(pageNo == 0){
							if(currentKeyId == "play_00"){
								cancelHighlight("wkk_key_focus_list");
								cancelHighlight("wkk_key_uncheck");
								doHighlight("markAll");
							} else {
								moveScrollByKey(preTopIdx);
								doHighlight("play_0"+preTopIdx);
							}
						} else if(pageNo == 1){
							if(currentKeyId == "play_00"){
								pageNo = 0;
								musicListInit(pageNo,blockSize);
								moveScrollByKey(5);
								doHighlight("play_0"+5);
							} else{
								moveScrollByKey(preTopIdx);
								doHighlight("play_0"+preTopIdx);
							}
						}
					}else{
						if(preTopIdx<0)preTopIdx = 0;
						doHighlight("menu_0"+preTopIdx);
					}

				} else if(menuNum == 1){
					if(preTopIdx<0)preTopIdx = 0;
					doHighlight("menu_1"+preTopIdx);
				} else if(menuNum == 2) {
					if(preTopIdx<0)preTopIdx = 0;
					doHighlight("menu_2"+preTopIdx);
				} else{
					if(currentKeyId == "markAll" || currentKeyId == "playList_markAll"){return;}
					//added as ux change
					if(currentKeyId == "addToList"){return;}
					if(currentKeyId == "music_00"){
						if(pageNo == 0){
							cancelHighlight("wkk_key_focus_list");
							cancelHighlight("wkk_key_uncheck");
							doHighlight("markAll");
						} else if(pageNo == 1){
							if(currentKeyId == "music_00"){
								pageNo = 0;
								musicListInit(pageNo,blockSize);
								moveScrollByKey(5);
								doHighlight("music_0"+5);
							} else{
								moveScrollByKey(listPreTopIdx);
								doHighlight("music_0"+listPreTopIdx);
							}
						}
					} else if(currentKeyId == "playList_0"+listTopIndex1){
						if(pageNo == 0){
							if(listPreTopIdx1 < 0){
								doHighlight("playList_markAll");
							} else{
								moveScrollByKey(listPreTopIdx1);
								doHighlight("playList_0"+listPreTopIdx1);
							}
						} else{

							var subKeyIdx = 0;
							if(selectPlayListKeyId == "menu_21"){
								subKeyIdx = 1;
							} else if(selectPlayListKeyId == "menu_22"){
								subKeyIdx = 2;
							} else if(selectPlayListKeyId == "menu_23"){
								subKeyIdx = 3;
							} else if(selectPlayListKeyId == "menu_24"){
								subKeyIdx = 4;
							}

							if(listPreTopIdx1 < 0){
								pageNo--;
								moveScrollByKey(5);
								PlayListShow(subKeyIdx);
								doHighlight("playList_05");
							} else{
								moveScrollByKey(listPreTopIdx1);
								PlayListShow(subKeyIdx);
								doHighlight("playList_0"+listPreTopIdx1);
							}

						}

					} else if(currentKeyId == "playButton_0"+listTopIndex2){
						if(pageNo == 0){
							if(listPreTopIdx2 < 0){
								doHighlight("playList_markAll");
							} else{
								moveScrollByKey(listPreTopIdx2);
								doHighlight("playButton_0"+listPreTopIdx2);
							}
						} else{

							var subKeyIdx = 0;
							if(selectPlayListKeyId == "menu_21"){
								subKeyIdx = 1;
							} else if(selectPlayListKeyId == "menu_22"){
								subKeyIdx = 2;
							} else if(selectPlayListKeyId == "menu_23"){
								subKeyIdx = 3;
							} else if(selectPlayListKeyId == "menu_24"){
								subKeyIdx = 4;
							}

							if(listPreTopIdx2 < 0){
								pageNo--;
								moveScrollByKey(5);
								PlayListShow(subKeyIdx);
								doHighlight("playButton_05");
							} else{
								moveScrollByKey(listPreTopIdx2);
								PlayListShow(subKeyIdx);
								doHighlight("playButton_0"+listPreTopIdx2);
							}

						}
					} else {
						moveScrollByKey(listPreTopIdx);
						doHighlight("music_0"+listPreTopIdx);
					}
				}

			} else if(popVisibleState == 1){	//addList
				if(listPreTopIdx<1)listPreTopIdx = 1;
				cancelHighlight("btnList"+listTopIndex);
				doHighlight("btnList"+listPreTopIdx);
			} else if(popVisibleState == 2){	//addListMessage
				return;
			} else if(popVisibleState == 3){	//removeMessage
				return;
			}
			break;
		}
		case VK_ENTER:
		{
			if(popVisibleState == 0){
        //added as ux change
		    if(currentKeyId=="menu_00"){
			    //do nothing
		    }else if(currentKeyId == "markAll" || currentKeyId == "playList_markAll"){
					selectAll(currentKeyId);
				} else {
					execKey(currentKeyId);
				}
			} else if(popVisibleState == 1){	//addList
				execKey(currentKeyId);
			} else if(popVisibleState == 2){	//addListMessage
				execKey(currentKeyId);
			} else if(popVisibleState == 3){	//removeMessage
				execKey(currentKeyId);
			}
			break;
		}
		case VK_PAGE_UP:
		{
			if (curLevel == level.THUMB && pageNo > 0) {
				moveThumbList('false');
			}
			break;
		}
		case VK_PAGE_DOWN:
		{
			if (curLevel == level.THUMB && (pageNo+1) < (dataCount/5)) {
				moveThumbList('true');
			}
			break;
		}
		case VK_INFO:
			window.location.reload();
			break;
		case VK_GREEN:
			if(document.getElementById('key_tv').style.display == ""){
				addList();
			} else {
				deleteList();
			}
			break;
		case VK_YELLOW:
			if(document.getElementById('key_tv').style.display == ""){ //Play All
				pAll = 1;
				audioPlay(1);
			} else {	//repeat All
				pAll = 2;
				audioPlay(1);
			}
			break;
		case VK_RED:
			location.href = '../Search/sign-in/pages/keyboard_basic.html';
			break;
		case VK_BLUE:
			//
			break;
		case VK_BACK :
			setCookies();
			window.NetCastReturn(VK_BACK);
			break;
		case VK_INFO :
			document.location.reload();
			break;
		 case VK_PLAY :
	  			if(document.getElementById('media').data == null){
	  				audioPlay(1);
	  			}else{
					executeAction('play');
				}
			break;
		case VK_PAUSE :
			executeAction('pause');
			break;
		case VK_STOP :
			executeAction('stop');
			break;
		case VK_REWIND :
			executeAction('rw');
			break;
		case VK_FAST_FWD :
			executeAction('fw');
			break;
		case VK_0 :
			document.location.reload();
			break;
	}
}

function allCancelHilight(){
	setElementVisibility("wkk_key_focus_Main", false);
	setElementVisibility("wkk_key_focus_Sub", false);
	setElementVisibility("wkk_key_focus_markAll", false);
	setElementVisibility("wkk_key_pFocus_markAll", false);
	setElementVisibility("wkk_key_focus_addToList", false);
	setElementVisibility("wkk_key_focus_list", false);
	setElementVisibility("wkk_key_uncheck", false);
	setElementVisibility("wkk_key_play", false);
	setElementVisibility("wkk_key_playNow", false);
	setElementVisibility("wkk_key_pLis", false);
	setElementVisibility("wkk_key_pLisNow", false);
	setElementVisibility("wkk_key_upArrow", false);
	setElementVisibility("wkk_key_downArrow", false);
	setElementVisibility("wkk_key_SubUpArrow", false);
	setElementVisibility("wkk_key_SubDownArrow", false);
}

/**
 * doHighlight
 */
function doHighlight(keyId) {

	allCancelHilight();
	currentKeyId = keyId;
	var menuNum = keyId.charAt(5);
	var topIndex = keyId.charAt(6);
	var playListIndex = keyId.charAt(12);
	var top;
	var e;
	var left;
	var cbObj;
	var top1;
	var left1;
	var e1;
	//mainMenu
	if(menuNum == 0){
		//if(topIndex<4){ //modified as ux change
		if(topIndex < 6){
			top = document.getElementById("menu_0"+topIndex).offsetTop+169;
		}
		left = 42;
		e = document.getElementById("wkk_key_focus_Main");
	//subMenu_Genre
	} else if(menuNum == 1){
		top = document.getElementById("menu_1"+topIndex).offsetTop+169;
		left = 315;                                                                                                           		e = document.getElementById("wkk_key_focus_Sub");
	//subMenu_PlayingList
	} else if(menuNum == 2){
		top = document.getElementById("menu_2"+topIndex).offsetTop+169;
		left = 315;
		e = document.getElementById("wkk_key_focus_Sub");
	}


	if(keyId == "markAll"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft+557;
		e = document.getElementById("wkk_key_focus_markAll");
	} else if(keyId == "playList_markAll"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft+557;
		e = document.getElementById("wkk_key_pFocus_markAll");
	} else if(keyId == "addToList"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft+557;
		e = document.getElementById("wkk_key_focus_addToList");
	}
	//music List
	else if(keyId == "music_00" || keyId == "music_01" || keyId == "music_02" ||
			keyId == "music_03" || keyId == "music_04" || keyId == "music_05" ||
			keyId == "playList_00" || keyId == "playList_01" || keyId == "playList_02" ||
			keyId == "playList_03"|| keyId == "playList_04" || keyId == "playList_05"){

		var obj = document.getElementById(keyId);
		cbObj = document.getElementById("wkk_key_uncheck");

		top = obj.offsetTop+129;
		left = obj.offsetLeft+557;

		checkBoxTop = top + 8;
		checkBoxLeft = left + 5;

		keyId = keyId+"1";
		e = document.getElementById("wkk_key_focus_list");

		cbObj.style.top = checkBoxTop + "px";
		cbObj.style.left = checkBoxLeft + "px";
		cbObj.style.visibility = "";

	} else if(keyId == "play_00" || keyId == "play_01" || keyId == "play_02" ||
			keyId == "play_03" || keyId == "play_04" || keyId == "play_05"){
		var cbObj = document.getElementById("wkk_key_uncheck");
		var obj = document.getElementById(keyId);

		cbObj.style.top = obj.offsetTop + 129 + 2 + "px";
		cbObj.style.left = obj.offsetLeft + 557 + 5 + "px";
		cbObj.style.visibility = "";

		top = obj.offsetTop+129;
		left = obj.offsetLeft+1079;

		top1 = obj.offsetTop+129-6;
		left1 = obj.offsetLeft+557;

		backLen = obj.style.background.length;
		if(backLen == 72){
			e = document.getElementById("wkk_key_playNow");
		}else{
			e = document.getElementById("wkk_key_play");
		}
		e1 = document.getElementById("wkk_key_focus_list");

	} else if(keyId == "playButton_00" || keyId == "playButton_01" || keyId == "playButton_02"||
			keyId == "playButton_03" || keyId == "playButton_04" || keyId == "playButton_05" ){
		var cbObj = document.getElementById("wkk_key_uncheck");
		var obj = document.getElementById(keyId);

		cbObj.style.top = obj.offsetTop + 129 + 2 + "px";
		cbObj.style.left = obj.offsetLeft + 557 + 5 + "px";
		cbObj.style.visibility = "";

		top = obj.offsetTop+129;
		left = obj.offsetLeft+1079;

		top1 = obj.offsetTop+129-6;
		left1 = obj.offsetLeft+557;

		backLen = obj.style.background.length;

		if(backLen == 72){
			e = document.getElementById("wkk_key_playNow");
		}else{
			e = document.getElementById("wkk_key_play");
		}

		e1 = document.getElementById("wkk_key_focus_list");
	}
	//upArrow
	else if(keyId == "upArr"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft;
		e = document.getElementById("wkk_key_upArrow");
	//downArrow
	} else if(keyId == "downArr"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft;
		e = document.getElementById("wkk_key_downArrow");
	//subUpArrow
	} else if(keyId == "subUpArr"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft;
		e = document.getElementById("wkk_key_SubUpArrow");
	//subDownArrow
	} else if(keyId == "subDownArr"){
		var obj = document.getElementById(keyId);
		top = obj.offsetTop+129;
		left = obj.offsetLeft;
		e = document.getElementById("wkk_key_SubDownArrow");
	} else if(keyId == "btnList1" || keyId == "btnList2" || keyId == "btnList3" ||
			keyId == "btnList4" || keyId == "btnList5"){
		var topIdx = keyId.charAt(7);
		var obgObj = document.getElementById('obg'+topIdx);

		obgObj.style.color = "#ffffff";

		if (topIdx == 2)
		{
			document.getElementById('obg1').style.background = "url('../image/POPUP/POPUP_BTN_LIST_NORMAL.png')";
		}

		if (topIdx == 5)
		{
			obgObj.style.background = "url('../image/POPUP/POPUP_BTN_FOCUS_1.png')";
			obgObj.style.height=62+"px";

			document.getElementById('btnCancel').style.width=362+"px";
			document.getElementById('btnCancel').style.left=4+"px";
			document.getElementById('btnCancel').style.top=380+"px";
		}
		else{
			obgObj.style.background = "url('../image/POPUP/POPUP_BTN_LIST_FOCUS.png')";
		}
	} else if(keyId == "btnOk"){
		e = null;
		var okObgObj = document.getElementById('okObg');
		var btnOkObj = document.getElementById('btnOk');

		okObgObj.style.background = "url('../image/POPUP/POPUP_BTN_FOCUS_2.png')";
		okObgObj.style.color="#ffffff";
		okObgObj.style.fontSize = 36+"px";

		btnOkObj.style.left = 147 + "px";
		btnOkObj.style.top = 169 + "px";
		btnOkObj.style.height = 65 + "px";
		btnOkObj.style.width = 195 + "px";

	} else if(keyId == "removebtnOk"){
		var rOkObgObj = document.getElementById('rOkObg');
		var removebtnOkObj = document.getElementById('removebtnOk');

		rOkObgObj.style.background = "url('../image/POPUP/POPUP_BTN_FOCUS_2.png')";
		rOkObgObj.style.color="#ffffff";
		rOkObgObj.style.fontSize = 36 + "px";

		removebtnOkObj.style.left = 49 + "px";
		removebtnOkObj.style.top = 169 + "px";
		removebtnOkObj.style.height = 65 + "px";
		removebtnOkObj.style.width = 195 + "px";

	} else if(keyId == "removeCancel"){
		var rCancelObj = document.getElementById('rCancelObg');
		var removeCancelObj = document.getElementById('removeCancel');

		rCancelObj.style.background = "url('../image/POPUP/POPUP_BTN_FOCUS_2.png')";
		rCancelObj.style.color="#ffffff";
		rCancelObj.style.fontSize = 36+"px";

		removeCancelObj.style.left = 246 + "px";
		removeCancelObj.style.top = 169 + "px";
		removeCancelObj.style.height = 65 + "px";
		removeCancelObj.style.width = 195 + "px";
	}

	if(e!=null){
		e.style.top = top + "px";
		e.style.left = left + "px";
		var val = getKeyValue(keyId);
		e.innerHTML = val+"";
		e.style.visibility = "";
	}

	if(keyId == "play_0"+topIndex){
		currentKeyId = keyId;
		keyId = "music_0"+topIndex+"1";
	} else if(keyId == "playButton_0"+playListIndex){
		currentKeyId = keyId;
		keyId = 'playList_0'+playListIndex+"1";
	}

	var val = getKeyValue(keyId);

	if(e1!=null){
		e1.style.top = top1 + "px";
		e1.style.left = left1 + "px";
		e1.innerHTML = val+"";
		e1.style.visibility = "";
	}
}

/**
 * cancelHighlight
 */
function cancelHighlight(keyId) {
	//mainMenu
	if(keyId == 'wkk_key_focus_Main'){
		setElementVisibility("wkk_key_focus_Main",false);
	}
	//subMenu
	else if(keyId == 'wkk_key_focus_Sub'){
		setElementVisibility("wkk_key_focus_Sub",false);
	}
	//markAll
	else if(keyId == 'wkk_key_focus_markAll'){
		setElementVisibility("wkk_key_focus_markAll",false);
		var html = getKeyValue(keyId);
		if(html == "" && html == null)html = "Marcar Todo";
		setInnerHtml("markAll", html);
	}
	else if(keyId == 'wkk_key_pFocus_markAll'){
		setElementVisibility("wkk_key_pFocus_markAll",false);
		var html = getKeyValue(keyId);
		if(html == "" && html == null)html = "Marcar Todo";
		setInnerHtml("playList_markAll", html);
	}
	//add to list
	else if(keyId == 'wkk_key_focus_addToList'){
		setElementVisibility("wkk_key_focus_addToList",false);
	}
	//music List
	else if(keyId == 'wkk_key_focus_list'){
		setElementVisibility("wkk_key_focus_list",false);
		setElementVisibility("wkk_key_uncheck",false);
	}
	//play
	else if(keyId == "wkk_key_pLis"){
		setElementVisibility("wkk_key_pLis",false);
	}
	//play
	else if(keyId == "wkk_key_play"){
		setElementVisibility("wkk_key_play",false);
	}
	//upArrow
	else if(keyId == "wkk_key_upArrow"){
		setElementVisibility("wkk_key_upArrow",false);
	//downArrow
	} else if(keyId == "wkk_key_downArrow"){
		setElementVisibility("wkk_key_downArrow",false);
	//subUpArrow
	} else if(keyId == "wkk_key_SubUpArrow"){
		setElementVisibility("wkk_key_SubUpArrow",false);
	//subDownArrow
	} else if(keyId == "wkk_key_SubDownArrow"){
		document.getElementById("wkk_key_SubDownArrow").style.visibility = "hidden";
	} else if(keyId == "btnList1" || keyId == "btnList2" || keyId == "btnList3" ||
			keyId == "btnList4" || keyId == "btnList5"){
		var topIdx = keyId.charAt(7);
		var obgObj = document.getElementById('obg'+topIdx);

		obgObj.style.color = "#2c2f46";

		if (topIdx == 5)
		{
			obgObj.style.background = "url('../image/POPUP/POPUP_BTN_NORMAL_1.png')";
			obgObj.style.height=54+"px";

			document.getElementById('btnCancel').style.width=355+"px";
			document.getElementById('btnCancel').style.left=7+"px";
			document.getElementById('btnCancel').style.top=384+"px";
		}
		else{
			obgObj.style.background = "url('../image/POPUP/POPUP_BTN_LIST_NORMAL.png')";
		}

	} else if(keyId == "btnOk"){
		var okObgObj = document.getElementById('okObg');
		var btnOkObj = document.getElementById('btnOk');

		okObgObj.style.background = "url('../image/POPUP/POPUP_BTN_NORMAL_2.png')";
		okObgObj.style.color="#2c2f46";
		okObgObj.style.fontSize = 30+"px";

		btnOkObj.style.left = 150 + "px";
		btnOkObj.style.top = 173 + "px";
		btnOkObj.style.height = 57 + "px";
		btnOkObj.style.width = 188 + "px";

	} else if(keyId == "removebtnOk"){

		var rOkObgObj = document.getElementById('rOkObg');
		var removebtnOkObj = document.getElementById('removebtnOk');

		rOkObgObj.style.background = "url('../image/POPUP/POPUP_BTN_NORMAL_2.png')";
		rOkObgObj.style.color="#2c2f46";
		rOkObgObj.style.fontSize = 30+"px";

		removebtnOkObj.style.left = 52 + "px";
		removebtnOkObj.style.top = 173 + "px";
		removebtnOkObj.style.height = 57 + "px";
		removebtnOkObj.style.width = 188 + "px";

	} else if(keyId == "removeCancel"){
		var rCancelObj = document.getElementById('rCancelObg');
		var removeCancelObj = document.getElementById('removeCancel');

		rCancelObj.style.background = "url('../image/POPUP/POPUP_BTN_NORMAL_2.png')";
		rCancelObj.style.color="#2c2f46";
		rCancelObj.style.fontSize = 30+"px";

		removeCancelObj.style.left = 249 + "px";
		removeCancelObj.style.top = 173 + "px";
		removeCancelObj.style.height = 57 + "px";
		removeCancelObj.style.width = 188 + "px";
	}
	keyId = null;
}

function execKey(keyId) {

	if(keyId == "wkk_key_focus_Sub"
	|| keyId == "wkk_key_focus_Main"
	|| keyId == "menu_01"
	|| keyId == "menu_02"
	|| keyId == "menu_10"
	|| keyId == "menu_11"
	|| keyId == "menu_12"
	|| keyId == "menu_13"
	|| keyId == "menu_14"){
    unmarkAll();
	}

	var param = pageNo*blockSize;
	selectMainKeyId = keyId;

	if(selectMainKeyId == "menu_10"){
		genre = "Temporada V";
	} else if(selectMainKeyId == "menu_11"){
		genre = "Temporada IV";
	} else if(selectMainKeyId == "menu_12"){
		genre = "Temporada III";
	} else if(selectMainKeyId == "menu_13"){
		genre = "Temporada II";
	} else if(selectMainKeyId == "menu_14"){
		genre = "Temporada I";
	}

	var menuNum = keyId.charAt(5);
	var subKeyIdx = keyId.charAt(6);
	//hidden Area Init
	//modified as ux change
	//document.getElementById('wkk_key_focus_Main').style.visibility = "hidden";
	//document.getElementById('wkk_key_focus_Sub').style.visibility = "hidden";
	if(keyId == "wkk_key_focus_Main" || menuNum == 0){

		if(currentKeyId=="menu_01" && selectGenreKeyId !=""){
			document.getElementById('wkk_key_pSelected_Sub').style.visibility = "hidden";
			document.getElementById('wkk_key_selected_Sub').style.visibility = "";
			musicListInit(pageNo,blockSize);
		}
		if(currentKeyId=="menu_02" && selectPlayListKeyId == ""){
			for(i=0; i<10; i++){
				document.getElementById("wkk_key_check"+i).style.visibility = "hidden";
			}
			document.getElementById('wkk_key_selected_Sub').style.visibility = "hidden";
		} else if(currentKeyId=="menu_02" && selectPlayListKeyId !=""){
			for(i=0; i<10; i++){
				document.getElementById("wkk_key_check"+i).style.visibility = "hidden";
			}
			document.getElementById('wkk_key_selected_Sub').style.visibility = "hidden";
			document.getElementById('wkk_key_pSelected_Sub').style.visibility = "";

			var val = getKeyValue('wkk_key_pSelected_Sub').substr(0,11);
			if(val == "Lista 1"){
				PlayListShow(1);
			} else if(val == "Lista 2"){
				PlayListShow(2);
			} else if(val == "Lista 3"){
				PlayListShow(3);
			} else if(val == "Lista 4"){
				PlayListShow(4);
			} else{
				PlayListShow(0);
				//doHighlight('menu_20');
			}
		}

		if(document.getElementById('wkk_key_uncheck').style.visibility == ""){
			document.getElementById('wkk_key_uncheck').style.visibility = "";
		}

	}
	else if(keyId == "wkk_key_focus_Sub" || menuNum == 1){
		for(i=0; i<blockSize; i++){
			if(genre == "Temporada V" && TemporadaVArray[i] == 1){
				document.getElementById("wkk_key_check"+i).style.visibility = "";
			} else if(genre == "Temporada IV" && TemporadaIVArray[i] == 1){
				document.getElementById("wkk_key_check"+i).style.visibility = "";
			} else if(genre == "Temporada III" && TemporadaIIIArray[i] == 1){
				document.getElementById("wkk_key_check"+i).style.visibility = "";
			} else if(genre == "Temporada II" && TemporadaIIArray[i] == 1){
				document.getElementById("wkk_key_check"+i).style.visibility = "";
			} else if(genre == "Temporada I" && TemporadaIArray[i] == 1){
				document.getElementById("wkk_key_check"+i).style.visibility = "";
			} else{
				document.getElementById("wkk_key_check"+i).style.visibility = "hidden";
			}
		}
	}
	switch(keyId) {

		case "wkk_key_focus_Main":
			execKey(currentKeyId);
			break;
		case "wkk_key_focus_Sub":
			execKey(currentKeyId);
			break;
		case "wkk_key_focus_list":
			execKey(currentKeyId);
			break;
		case "wkk_key_play":
			execKey(currentKeyId);
			break;
		case "wkk_key_pLis":
			execKey(currentKeyId);
			break;
		case "wkk_key_downArrow":
			execKey(currentKeyId);
			break;
		//Marcar Todo
		case "wkk_key_focus_markAll":
			selectAll(currentKeyId);
			break;
		case "wkk_key_pFocus_markAll":
			selectAll(currentKeyId);
			break;
		//added as ux change
		case "addToList":
		  processKeyHelp("addList");
		  break;

		///////////////// Main Menu Start //////////////
		//Top50
		case "menu_00":
		  //modified as ux change
			//if (userAgent.search("LG NetCast.TV") > -1 ) {
			//	document.getElementById('key_tv_bg').style.display = ""; //keyHelpArea
			//	document.getElementById('key_tv').style.display = ""; //keyHelpArea
			//	document.getElementById('play_key_tv_bg').style.display = "none"; //keyHelpArea
			//	document.getElementById('playingKeyHelp_tv').style.display = "none"; //keyHelpArea
			//} else if (userAgent.search("LG NetCast.Media") > -1 ){
			//	document.getElementById('key_bdp_bg').style.display = ""; //keyHelpArea
			//	document.getElementById('key_bdp').style.display = ""; //keyHelpArea
			//	document.getElementById('play_key_bdp_bg').style.display = "none"; //keyHelpArea
			//	document.getElementById('playingKeyHelp_bdp').style.display = "none"; //keyHelpArea
			//} else {
			//  // alert("other browser");
			//}
			break;
		//Genre
		case "menu_01":
			menuGb=0;
			buttonDown(subKeyIdx,keyId);
			markAllTextChange();
			document.getElementById('pScrollArea').style.visibility = "hidden";
			document.getElementById('scrollArea').style.visibility = "";

		  //modified as ux change
			//if (userAgent.search("LG NetCast.TV") > -1 ) {
			//	document.getElementById('key_tv_bg').style.display = ""; //keyHelpArea
			//	document.getElementById('key_tv').style.display = ""; //keyHelpArea
			//	document.getElementById('play_key_tv_bg').style.display = "none"; //keyHelpArea
			//	document.getElementById('playingKeyHelp_tv').style.display = "none"; //keyHelpArea\
			//} else if (userAgent.search("LG NetCast.Media") > -1 ){
			//	document.getElementById('key_bdp_bg').style.display = ""; //keyHelpArea
			//	document.getElementById('key_bdp').style.display = ""; //keyHelpArea
			//	document.getElementById('play_key_bdp_bg').style.display = "none"; //keyHelpArea
			//	document.getElementById('playingKeyHelp_bdp').style.display = "none"; //keyHelpArea
			//} else {
			//  // alert("other browser");
			//}

			break;
		//Lista de reproducción
		case "menu_02":
			menuGb=1;
			buttonDown(subKeyIdx,keyId);
			markAllTextChange();
			document.getElementById('scrollArea').style.visibility = "hidden";

			//modified as ux change
			//if (userAgent.search("LG NetCast.TV") > -1 ) {
			//	document.getElementById('key_tv_bg').style.display = "none"; //keyHelpArea
			//	document.getElementById('key_tv').style.display = "none"; //keyHelpArea
			//	document.getElementById('play_key_tv_bg').style.display = ""; //keyHelpArea
			//	document.getElementById('playingKeyHelp_tv').style.display = ""; //keyHelpArea
			//} else if (userAgent.search("LG NetCast.Media") > -1 ){
			//	document.getElementById('key_bdp_bg').style.display = "none"; //keyHelpArea
			//	document.getElementById('key_bdp').style.display = "none"; //keyHelpArea
			//	document.getElementById('play_key_bdp_bg').style.display = ""; //keyHelpArea
			//	document.getElementById('playingKeyHelp_bdp').style.display = ""; //keyHelpArea
			//} else {
			//  // alert("other browser");
			//}
			break;
		//Search
		case "menu_03":
			location.href = '../Search/pages/keyboard_basic.html';
			break;
		//added as ux change
		//sign in
		case "menu_04":
      location.href = '../Search/sign-in/pages/keyboard_basic.html';
      break;
		//x button
		case "menu_05":
	    if(window.NetCastBack){window.NetCastBack();}
		  break;

		///////////////// Main Menu End //////////////
		//mainUpArrow
		case "upArr":
			//
			break;
		//mainDownArro
		case "downArr":
			//
			break;

		///////////////// Sub Menu(Genre) Start //////////////
		//Pop
		case "menu_10":
			buttonDown(subKeyIdx,keyId);
			initValue();
			markAllTextChange();
			selectGenreKeyId = keyId;
			break;
		//Rock
		case "menu_11":
			buttonDown(subKeyIdx,keyId);
			initValue();
			markAllTextChange();
			selectGenreKeyId = keyId;

			break;
		//Dance
		case "menu_12":
			buttonDown(subKeyIdx,keyId);
			initValue();
			markAllTextChange();
			selectGenreKeyId = keyId;
			break;
		//Jazz
		case "menu_13":
			buttonDown(subKeyIdx,keyId);
			initValue();
			markAllTextChange();
			selectGenreKeyId = keyId;
			break;
		//Classic
		case "menu_14":
			buttonDown(subKeyIdx,keyId);
			initValue();
			markAllTextChange();
			selectGenreKeyId = keyId;
			break;
		///////////////// Sub Menu(Genre) End //////////////

		///////////////// Sub Menu(Playing List) Start //////////////
		//Now Playing List
		case "menu_20":
			buttonDown(subKeyIdx,keyId);
			PlayListShow(subKeyIdx);
			break;
		//Lista de reproducción1
		case "menu_21":
			buttonDown(subKeyIdx,keyId);
			initValue();
			PlayListShow(subKeyIdx);
			break;
		//Lista de reproducción2
		case "menu_22":
			buttonDown(subKeyIdx,keyId);
			initValue();
			PlayListShow(subKeyIdx);
			break;
		//Lista de reproducción3
		case "menu_23":
			buttonDown(subKeyIdx,keyId);
			initValue();
			PlayListShow(subKeyIdx);
			break;
		//Lista de reproducción4
		case "menu_24":
			buttonDown(subKeyIdx,keyId);
			initValue();
			PlayListShow(subKeyIdx);
			break;

		///////////////// Sub Menu(Playing List) End //////////////

		/////////////////// Music List Start //////////////////
		//Genre
		case "music_00":
			buttonDown(subKeyIdx,keyId);
			break;
		case "music_01":
			buttonDown(subKeyIdx,keyId);
			break;
		case "music_02":
			buttonDown(subKeyIdx,keyId);
			break;
		case "music_03":
			buttonDown(subKeyIdx,keyId);
			break;
		case "music_04":
			buttonDown(subKeyIdx,keyId);
			break;
		case "music_05":
			buttonDown(subKeyIdx,keyId);
			break;
		case "playList_00":
			buttonDown(subKeyIdx,keyId);
			break;
		case "playList_01":
			buttonDown(subKeyIdx,keyId);
			break;
		case "playList_02":
			buttonDown(subKeyIdx,keyId);
			break;
		case "playList_03":
			buttonDown(subKeyIdx,keyId);
			break;
		case "playList_04":
			buttonDown(subKeyIdx,keyId);
			break;
		case "playList_05":
			buttonDown(subKeyIdx,keyId);
			break;
		/////////////////// Music List End //////////////////

		/////////////////// List Add Popup Start ///////////////////
		//List1
		case "btnList1":
			checkedAddList(keyId);
			break;
		//List2
		case "btnList2":
			checkedAddList(keyId);
			break;
		//List3
		case "btnList3":
			checkedAddList(keyId);
			break;
		//List4
		case "btnList4":
			checkedAddList(keyId);
			break;
		//Cancel
		case "btnList5":
			popVisibleState = 0;
			document.getElementById('allBlock').style.visibility = "hidden";
			document.getElementById('AddListPopup').style.visibility = "hidden";
			doHighlight('menu_01');
			pList1 = null;pList2 = null;pList3 = null;pList4 = null;	//ArrayList Init
			break;
		/////////////////// List Add Popup End ///////////////////

		/////////////////// List Add Message Popup Start ///////////////////
		//addList Ok
		case "btnOk":
			popVisibleState = 0;
			document.getElementById('allBlock').style.visibility = "hidden";
			document.getElementById('AddListPopup').style.visibility = "hidden";
			document.getElementById('MsgPopup2').style.visibility = "hidden";
			execKey('menu_01');
			execKey(selectGenreKeyId);
			doHighlight(selectGenreKeyId);
			break;
		/////////////////// List Add Message Popup End ///////////////////

		/////////////////// List remove Message Popup Start ///////////////////
		case "removebtnOk":
			popVisibleState = 0;
			document.getElementById('allBlock').style.visibility = "hidden";
			document.getElementById('MsgPopup').style.visibility = "hidden";
			execKey('menu_02');
			doHighlight('menu_02');
			removeList();
			break;
		case "removeCancel":
			popVisibleState = 0;
			document.getElementById('allBlock').style.visibility = "hidden";
			document.getElementById('allBlock').style.visibility = "hidden";
			document.getElementById('MsgPopup').style.visibility = "hidden";
			execKey('menu_02');
			doHighlight('menu_02');
			break;
		/////////////////// List remove Message Popup End ///////////////////

		/////////////////// Audio Play Start ///////////////////
		//genre
		case "play_00":
			audioPlay(Number(param+1));	//Number(param+1)
			break;
		case "play_01":
			audioPlay(Number(param+2));
			break;
		case "play_02":
			audioPlay(Number(param+3));
			break;
		case "play_03":
			audioPlay(Number(param+4));
			break;
		case "play_04":
			audioPlay(Number(param+5));
			break;
		case "play_05":
			audioPlay(Number(param+6));
			break;
		//Playing List
		case "playButton_00":
			audioPlay(Number(param+1));
			break;
		case "playButton_01":
			audioPlay(Number(param+2));
			break;
		case "playButton_02":
			audioPlay(Number(param+3));
			break;
		case "playButton_03":
			audioPlay(Number(param+4));
			break;
		case "playButton_04":
			audioPlay(Number(param+5));
			break;
		case "playButton_05":
			audioPlay(Number(param+6));
			break;

		/////////////////// Audio Play End ///////////////////
		default :
			break;
	}
}

function checkedAddList(keyId){
	var pCnt = 0;
	var rCnt = 0;
	var dCnt = 0;
	var jCnt = 0;
	var cCnt = 0;
	var listType = "";
	var addList = "";
	var strTitle1="";
	var strUrl1="";
	var strTitle2="";
	var strUrl2="";
	var strTitle3="";
	var strUrl3="";
	var strTitle4="";
	var strUrl4="";
	var size = 0;

	//totalList Init
	strTotalTitleList = "";
	strTotalUrlList = "";
	for(i=0; i<pArray.length; i++){
		if(pArray[i]!=null && pArray[i]!="" && TemporadaVArray[i]!=0){
			pCnt++;
			strTotalTitleList += ptArray[i]+"-";
			strTotalUrlList += pArray[i]+"-";
		}
	}
	for(i=0; i<rArray.length; i++){
		if(rArray[i]!=null && rArray[i]!="" && TemporadaIVArray[i]!=0){
			rCnt++;
			strTotalTitleList += rtArray[i]+"-";
			strTotalUrlList += rArray[i]+"-";
		}
	}
	for(i=0; i<dArray.length; i++){
		if(dArray[i]!=null && dArray[i]!="" && TemporadaIIIArray[i]!=0){
			dCnt++;
			strTotalTitleList += dtArray[i]+"-";
			strTotalUrlList += dArray[i]+"-";
		}
	}
	for(i=0; i<jArray.length; i++){
		if(jArray[i]!=null && jArray[i]!="" && TemporadaIIArray[i]!=0){
			jCnt++;
			strTotalTitleList += jtArray[i]+"-";
			strTotalUrlList += jArray[i]+"-";
		}
	}
	for(i=0; i<cArray.length; i++){
		if(cArray[i]!=null && cArray[i]!="" && TemporadaIArray[i]!=0){
			cCnt++;
			strTotalTitleList += ctArray[i]+"-";
			strTotalUrlList += cArray[i]+"-";
		}
	}
	totalLength = pCnt+rCnt+dCnt+jCnt+cCnt;		//selected Music List Size
	if(totalLength==0)return;
	if(keyId == "btnList1"){
		size = pTitleList1.length;
		for(i=0; i<strTotalTitleList.split("-").length-1; i++){
			if(strTotalTitleList.split("-")[i]!="" && strTotalTitleList.split("-")!=null){
				strTitle1 += strTotalTitleList.split("-")[i]+"-";
				strUrl1 += strTotalUrlList.split("-")[i]+"-";
			}
		}
		for(i=0; i<strTitle1.split("-").length-1; i++){
			if(pTitleList1[i]!=null && pTitleList1[i]!=""){
				pTitleList1[Number(i+size)] = strTitle1.split("-")[i];
				pUrlList1[Number(i+size)] = strUrl1.split("-")[i];
			} else{
				pTitleList1[i] = strTitle1.split("-")[i];
				pUrlList1[i] = strUrl1.split("-")[i];
			}
		}
		listType = "Lista de reproducción1";
		//addList = pTitleList1[0]+" etc "+(totalLength-1);
		addList = totalLength+" relatos";
	} else if(keyId == "btnList2"){
		size = pTitleList2.length;
		for(i=0; i<strTotalTitleList.split("-").length-1; i++){
			if(strTotalTitleList.split("-")[i]!="" && strTotalTitleList.split("-")!=null){
				strTitle2 += strTotalTitleList.split("-")[i]+"-";
				strUrl2 += strTotalUrlList.split("-")[i]+"-";
			}
		}
		for(i=0; i<strTitle2.split("-").length-1; i++){
			if(pTitleList2[i]!=null && pTitleList2[i]!=""){
				pTitleList2[Number(i+size)] = strTitle2.split("-")[i];
				pUrlList2[Number(i+size)] = strUrl2.split("-")[i];
			} else{
				pTitleList2[i] = strTitle2.split("-")[i];
				pUrlList2[i] = strUrl2.split("-")[i];
			}
		}
		listType = "Lista de reproducción2";
		//addList = pTitleList2[0]+" etc "+(totalLength-1);
		addList = totalLength+" items";
	} else if(keyId == "btnList3"){
		size = pTitleList3.length;
		for(i=0; i<strTotalTitleList.split("-").length-1; i++){
			if(strTotalTitleList.split("-")[i]!="" && strTotalTitleList.split("-")!=null){
				strTitle3 += strTotalTitleList.split("-")[i]+"-";
				strUrl3 += strTotalUrlList.split("-")[i]+"-";
			}
		}
		for(i=0; i<strTitle3.split("-").length-1; i++){
			if(pTitleList3[i]!=null && pTitleList3[i]!=""){
				pTitleList3[Number(i+size)] = strTitle3.split("-")[i];
				pUrlList3[Number(i+size)] = strUrl3.split("-")[i];
			} else{
				pTitleList3[i] = strTitle3.split("-")[i];
				pUrlList3[i] = strUrl3.split("-")[i];
			}
		}
		listType = "Lista de reproducción3";
		//addList = pTitleList3[0]+" etc "+(totalLength-1);
		addList = totalLength+" items";
	} else if(keyId == "btnList4"){
		size = pTitleList4.length;
		for(i=0; i<strTotalTitleList.split("-").length-1; i++){
			if(strTotalTitleList.split("-")[i]!="" && strTotalTitleList.split("-")!=null){
				strTitle4 += strTotalTitleList.split("-")[i]+"-";
				strUrl4 += strTotalUrlList.split("-")[i]+"-";
			}
		}
		for(i=0; i<strTitle4.split("-").length-1; i++){
			if(pTitleList4[i]!=null && pTitleList4[i]!=""){
				pTitleList4[Number(i+size)] = strTitle4.split("-")[i];
				pUrlList4[Number(i+size)] = strUrl4.split("-")[i];
			} else{
				pTitleList4[i] = strTitle4.split("-")[i];
				pUrlList4[i] = strUrl4.split("-")[i];
			}
		}
		listType = "Lista de reproducción4";
		//addList = pTitleList4[0]+" etc "+(totalLength-1);
		addList = totalLength+" items";
	}
	document.getElementById('AddListPopup').style.visibility = "hidden";
	document.getElementById('popTitle3').innerHTML = addList;
	document.getElementById('popTitle4').innerHTML = "han sido añadidas a "+listType;
	document.getElementById('MsgPopup2').style.visibility = "";
	popVisibleState = 2;
	doHighlight('btnOk');
}

function buttonDown(subKeyIdx,keyId){
	//document.getElementById('markAll').innerHTML = "Marcar Todo";
	var menuNum = keyId.charAt(5);
	var topIndex = keyId.charAt(6);
	var listIndex = keyId.charAt(7);
	var playListIndex = keyId.charAt(10);
	var top;
	var left;
	var e;
	//js Dynamic Create
	var div = document.getElementById("musiTypeDiv");
	var _script = document.createElement('script');
	_script.type = 'text/javascript';
	//content_Genre
	if(menuNum == 1){
		if(keyId == "menu_10"){
			_script.src = '../js/sampledata_temporada_v.js';
		} else if(keyId == "menu_11"){
			_script.src = '../js/sampledata_temporada_iv.js';
		} else if(keyId == "menu_12"){
			_script.src = '../js/sampledata_temporada_iii.js';
		} else if(keyId == "menu_13"){
			_script.src = '../js/sampledata_temporada_ii.js';
		} else if(keyId == "menu_14"){
			_script.src = '../js/sampledata_temporada_i.js';
		} else{
			_script.src = '../js/sampledata_temporada_v.js';
		}
		div.removeChild(div.children(0));
		div.appendChild(_script);
		//Firefox, Chrome
		_script.onload = function () {
			musicListInit(pageNo,blockSize);
	    }
	}
	//content_Playing List

	else if(menuNum == 2){
		//now Playing List
		if(keyId == "menu_20"){
			selectPlayListKeyId = keyId;
			musicListInit(pageNo,blockSize);
		}
		//Lista de reproducción
		else if(keyId == "menu_21" || keyId == "menu_22" ||
				keyId == "menu_23" || keyId == "menu_24"){
			selectPlayListKeyId = keyId;
		}
		else{
			musicListInit(pageNo,blockSize);
		}
	}

	//mainMenu
	if(menuNum == 0){
		top = document.getElementById("menu_0"+topIndex).offsetTop+129 + 40;
		left = 42;
		e = document.getElementById("wkk_key_selected_Main");

		for(i=0; i<4; i++){
			document.getElementById("subDiv"+i).style.visibility = "hidden";
		}
		document.getElementById("subDiv"+subKeyIdx).style.visibility = "";
	//subMenu_Genre
	} else if(menuNum == 1){
		top = document.getElementById("menu_1"+topIndex).offsetTop+129 + 40;
		left = 315;
		e = document.getElementById("wkk_key_selected_Sub");
	//subMenu_Playing List
	} else if(menuNum == 2){
		top = document.getElementById("menu_2"+topIndex).offsetTop+129 +40;
		left = 315;
		e = document.getElementById("wkk_key_pSelected_Sub");
	}
	//Content Music List
	else{
		//cbChecked
		var cnt = 0;
		var cbCheckObj;
		var firstPage;

		var page1ListIdx;
		var page2ListIdx;

		if(pageNo == 0){
			firstPage = 0;
		} else if(pageNo == 1){
			firstPage = pageNo*blockSize;
		}
		//Genre
		if(keyId == "music_0"+listIndex){

			if(pageNo == 0){
				page1ListIdx = Number(pageNo*firstPage+Number(listIndex));
				cbCheckObj = document.getElementById("wkk_key_check"+page1ListIdx);
			} else if(pageNo == 1){
				page2ListIdx = Number(pageNo*firstPage+Number(listIndex));
				cbCheckObj = document.getElementById("wkk_key_check"+page2ListIdx);
			}
			cbCheckObj.style.top = checkBoxTop +"px";
			cbCheckObj.style.left = checkBoxLeft + "px";

			if(pageNo == 0){
				if(genre == "Temporada V"){
					if(TemporadaVArray[page1ListIdx] == 1){
						TemporadaVArray[page1ListIdx] = 0;
					} else{
						TemporadaVArray[page1ListIdx] = 1;
					}
				} else if(genre == "Temporada IV"){
					if(TemporadaIVArray[page1ListIdx] == 1){
						TemporadaIVArray[page1ListIdx] = 0;
					} else{
						TemporadaIVArray[page1ListIdx] = 1;
					}
				} else if(genre == "Temporada III"){
					if(TemporadaIIIArray[page1ListIdx] == 1){
						TemporadaIIIArray[page1ListIdx] = 0;
					} else{
						TemporadaIIIArray[page1ListIdx] = 1;
					}
				} else if(genre == "Temporada II"){
					if(TemporadaIIArray[page1ListIdx] == 1){
						TemporadaIIArray[page1ListIdx] = 0;
					} else{
						TemporadaIIArray[page1ListIdx] = 1;
					}
				} else if(genre == "Temporada I"){
					if(TemporadaIArray[page1ListIdx] == 1){
						TemporadaIArray[page1ListIdx] = 0;
					} else{
						TemporadaIArray[page1ListIdx] = 1;
					}
				}
			} else{
				if(genre == "Temporada V"){
					if(TemporadaVArray[page2ListIdx] == 1){
						TemporadaVArray[page2ListIdx] = 0;
					} else{
						TemporadaVArray[page2ListIdx] = 1;
					}
				} else if(genre == "Temporada IV"){
					if(TemporadaIVArray[page2ListIdx] == 1){
						TemporadaIVArray[page2ListIdx] = 0;
					} else{
						TemporadaIVArray[page2ListIdx] = 1;
					}
				} else if(genre == "Temporada III"){
					if(TemporadaIIIArray[page2ListIdx] == 1){
						TemporadaIIIArray[page2ListIdx] = 0;
					} else{
						TemporadaIIIArray[page2ListIdx] = 1;
					}
				} else if(genre == "Temporada II"){
					if(TemporadaIIArray[page2ListIdx] == 1){
						TemporadaIIArray[page2ListIdx] = 0;
					} else{
						TemporadaIIArray[page2ListIdx] = 1;
					}
				} else if(genre == "Temporada I"){
					if(TemporadaIArray[page2ListIdx] == 1){
						TemporadaIArray[page2ListIdx] = 0;
					} else{
						TemporadaIArray[page2ListIdx] = 1;
					}
				}
			}

			if(genre == "Temporada V"){
				if(pageNo == 0){
					if(TemporadaVArray[page1ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					pArray[page1ListIdx] = AudioUrl[page1ListIdx+1];
					ptArray[page1ListIdx] = AudioTitle[page1ListIdx+1];
				} else if(pageNo == 1){
					if(TemporadaVArray[page2ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					pArray[page2ListIdx] = AudioUrl[page2ListIdx+1];
					ptArray[page2ListIdx] = AudioTitle[page2ListIdx+1];
				}
			} else if(genre == "Temporada IV"){
				if(pageNo == 0){
					if(TemporadaIVArray[page1ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					rArray[page1ListIdx] = AudioUrl[page1ListIdx+1];
					rtArray[page1ListIdx] = AudioTitle[page1ListIdx+1];
				} else if(pageNo == 1){
					if(TemporadaIVArray[page2ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					rArray[page2ListIdx] = AudioUrl[page2ListIdx+1];
					rtArray[page2ListIdx] = AudioTitle[page2ListIdx+1];
				}
			} else if(genre == "Temporada III"){
				if(pageNo == 0){
					if(TemporadaIIIArray[page1ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					dArray[page1ListIdx] = AudioUrl[page1ListIdx+1];
					dtArray[page1ListIdx] = AudioTitle[page1ListIdx+1];
				} else if(pageNo == 1){
					if(TemporadaIIIArray[page2ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					dArray[page2ListIdx] = AudioUrl[page2ListIdx+1];
					dtArray[page2ListIdx] = AudioTitle[page2ListIdx+1];
				}
			} else if(genre == "Temporada II"){
				if(pageNo == 0){
					if(TemporadaIIArray[page1ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					jArray[page1ListIdx] = AudioUrl[page1ListIdx+1];
					jtArray[page1ListIdx] = AudioTitle[page1ListIdx+1];
				} else if(pageNo == 1){
					if(TemporadaIIArray[page2ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					jArray[page2ListIdx] = AudioUrl[page2ListIdx+1];
					jtArray[page2ListIdx] = AudioTitle[page2ListIdx+1];
				}
			} else if(genre == "Temporada I"){
				if(pageNo == 0){
					if(TemporadaIArray[page1ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					cArray[page1ListIdx] = AudioUrl[page1ListIdx+1];
					ctArray[page1ListIdx] = AudioTitle[page1ListIdx+1];
				} else if(pageNo == 1){
					if(TemporadaIArray[page2ListIdx] == 1){
						cbCheckObj.style.visibility = "";
					} else{
						cbCheckObj.style.visibility = "hidden";
					}
					cArray[page2ListIdx] = AudioUrl[page2ListIdx+1];
					ctArray[page2ListIdx] = AudioTitle[page2ListIdx+1];
				}
			}
		}
		//Lista de reproducción
		else if(keyId == "playList_0"+playListIndex){
			cbCheckObj = document.getElementById("wkk_key_check"+playListIndex);
			playListIndex = pageNo * blockSize + Number(playListIndex);

			if(selectPlayListKeyId == "menu_21"){
				if(playListArray1[playListIndex] == 1){
					playListArray1[playListIndex] = 0;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				} else{
					playListArray1[playListIndex] = 1;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}

			} else if(selectPlayListKeyId == "menu_22"){
				if(playListArray2[playListIndex] == 1){
					playListArray2[playListIndex] = 0;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				} else{
					playListArray2[playListIndex] = 1;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
			} else if(selectPlayListKeyId == "menu_23"){
				if(playListArray3[playListIndex] == 1){
					playListArray3[playListIndex] = 0;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				} else{
					playListArray3[playListIndex] = 1;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
			} else if(selectPlayListKeyId == "menu_24"){
				if(playListArray4[playListIndex] == 1){
					playListArray4[playListIndex] = 0;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				} else{
					playListArray4[playListIndex] = 1;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
			}

			if(selectPlayListKeyId == "menu_21"){
				if(playListArray1[playListIndex] == 1){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}

			} else if(selectPlayListKeyId == "menu_22"){
				if(playListArray2[playListIndex] == 1){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				} else{
					playListArray2[playListIndex] = 1;
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			} else if(selectPlayListKeyId == "menu_23"){
				if(playListArray3[playListIndex] == 1){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			} else if(selectPlayListKeyId == "menu_24"){
				if(playListArray4[playListIndex] == 1){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
		}
	}
	if(e!=null){

		e.style.top = top + "px";
		e.style.left = left + "px";
		var val = getKeyValue(keyId);
		e.innerHTML = val+"";
		e.style.visibility = "";
	}
}

/**
 * Music ListTitle Init
 */
function musicListInit(pageNo,blockSize){

	if(pageNo>1){
		pageNo = 0;
	}
	pageCntInit(pageNo,'genre');
	var listLine = 'line_0';
	var playButton = 'play_0';

	var listIdx;
	var checkBoxTop;
	var checkBoxLeft;
	var cbCheckObj;

	if(pageNo == 0 ){

		for(i=0; i<listSize; i++){
			document.getElementById("wkk_key_check"+i).style.visibility = "hidden";
		}
		//2page
		for(i=0; i<Number(listSize-blockSize); i++){

			listIdx = i+(pageNo*blockSize)+1;
			document.getElementById('music_0'+i).style.visibility = "hidden";
			document.getElementById(listLine+i).style.visibility = "hidden";
			document.getElementById(playButton+i).style.visibility = "hidden";
			document.getElementById('music_0'+i+'1').innerHTML = null;
		}
		//1page
		for(i=0; i<blockSize; i++){
			listIdx = i+(pageNo*blockSize)+1;
			document.getElementById('music_0'+i).style.visibility = "";
			document.getElementById(listLine+i).style.visibility = "";
			if(playButtonDown[Number(pageNo*blockSize+i+1)] == 1){
				document.getElementById(playButton+i).style.background = "url('../image/PLAYNOW_BTN_NORMAL.png')";
			} else{
				document.getElementById(playButton+i).style.background = "url('../image/PLAY_BTN_NORMAL.png')";
			}
			document.getElementById(playButton+i).style.visibility = "";
			//lert(AudioTitle[listIdx]);
			document.getElementById('music_0'+i+'1').innerHTML = AudioTitle[listIdx];



		}
		//checkBox
		for(i=0; i<blockSize; i++){
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			cbCheckObj = document.getElementById("wkk_key_check"+Number(pageNo*blockSize+i));
			//pop
			if(selectGenreKeyId == "menu_10" && TemporadaVArray[i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}

				cbCheckObj = document.getElementById("wkk_key_check"+Number(1*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//rock
			else if(selectGenreKeyId == "menu_11" && TemporadaIVArray[i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(1*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//dance
			else if(selectGenreKeyId == "menu_12" && TemporadaIIIArray[i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(1*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//jazz
			else if(selectGenreKeyId == "menu_13" && TemporadaIIArray[i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(1*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//classic
			else if(selectGenreKeyId == "menu_14" && TemporadaIArray[i] == 1){

				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(1*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
		}

	} else if(pageNo == 1){
		for(i=0; i<listSize; i++){
			document.getElementById("wkk_key_check"+i).style.visibility = "hidden";
		}
		//1page
		for(i=0; i<blockSize; i++){

			listIdx = i+(pageNo*blockSize)+1;
			document.getElementById('music_0'+i).style.visibility = "hidden";
			document.getElementById(listLine+i).style.visibility = "hidden";
			document.getElementById(playButton+i).style.visibility = "hidden";
			document.getElementById('music_0'+i+'1').innerHTML = null;
		}
		//2page
		for(i=0; i<Number(listSize-blockSize); i++){
			listIdx = i+(pageNo*blockSize)+1;
			document.getElementById('music_0'+i).style.visibility = "";
			document.getElementById(listLine+i).style.visibility = "";
			if(playButtonDown[Number(pageNo*blockSize+i+1)] == 1){
				document.getElementById(playButton+i).style.background = "url('../image/PLAYNOW_BTN_NORMAL.png')";
			} else{
				document.getElementById(playButton+i).style.background = "url('../image/PLAY_BTN_NORMAL.png')";
			}
			document.getElementById(playButton+i).style.visibility = "";
			document.getElementById('music_0'+i+'1').innerHTML = AudioTitle[listIdx];
		}

		//checkBox
		for(i=0; i<blockSize; i++){
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			cbCheckObj = document.getElementById("wkk_key_check"+Number(pageNo*blockSize+i));
			//pop
			if(selectGenreKeyId == "menu_10" && TemporadaVArray[pageNo*blockSize+i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(0*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//rock
			else if(selectGenreKeyId == "menu_11" && TemporadaIVArray[pageNo*blockSize+i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(0*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//dance
			else if(selectGenreKeyId == "menu_12" && TemporadaIIIArray[pageNo*blockSize+i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(0*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//jazz
			else if(selectGenreKeyId == "menu_13" && TemporadaIIArray[pageNo*blockSize+i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(0*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
			//classic
			else if(selectGenreKeyId == "menu_14" && TemporadaIArray[pageNo*blockSize+i] == 1){
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
				}
				cbCheckObj = document.getElementById("wkk_key_check"+Number(0*blockSize+i));
				if(cbCheckObj!=null){
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
			}
		}
	}
}

var popCnt=0;
var rockCnt=0;
var danceCnt=0;
var jazzCnt=0;
var classicCnt=0;
var PlayListCnt1 = 0;
var PlayListCnt2 = 0;
var PlayListCnt3 = 0;
var PlayListCnt4 = 0;
function selectAll(currentKeyId){
	var cbCheckObj;
	var firstPage;

	if(currentKeyId == "markAll"){

		if(genre == "Temporada V"){
			popCnt++;
		} else if(genre == "Temporada IV"){
			rockCnt++;
		} else if(genre == "Temporada III"){
			danceCnt++;
		} else if(genre == "Temporada II"){
			jazzCnt++;
		} else if(genre == "Temporada I"){
			classicCnt++;
		}

		for(i=0; i<listSize; i++){
			if(genre == "Temporada V"){
				if(popCnt%2!=0){
					TemporadaVArray[i] = 1;
					pArray[i] = AudioUrl[Number(i)+1];
					ptArray[i] = AudioTitle[Number(i)+1];
				} else{
					TemporadaVArray[i] = 0;
					pArray[i] = "";
					ptArray[i] = "";
				}
			} else if(genre == "Temporada IV"){
				if(rockCnt%2!=0){
					TemporadaIVArray[i] = 1;
					rArray[i] = AudioUrl[Number(i)+1];
					rtArray[i] = AudioTitle[Number(i)+1];
				} else{
					TemporadaIVArray[i] = 0;
					rArray[i] = "";
					rtArray[i] = "";
				}
			} else if(genre == "Temporada III"){
				if(danceCnt%2!=0){
					TemporadaIIIArray[i] = 1;
					dArray[i] = AudioUrl[Number(i)+1];
					dtArray[i] = AudioTitle[Number(i)+1];
				} else{
					TemporadaIIIArray[i] = 0;
					dArray[i] = "";
					dtArray[i] = "";
				}
			} else if(genre == "Temporada II"){
				if(jazzCnt%2!=0){
					TemporadaIIArray[i] = 1;
					jArray[i] = AudioUrl[Number(i)+1];
					jtArray[i] = AudioTitle[Number(i)+1];
				} else{
					TemporadaIIArray[i] = 0;
					jArray[i] = "";
					jtArray[i] = "";
				}
			} else if(genre == "Temporada I"){
				if(classicCnt%2!=0){
					TemporadaIArray[i] = 1;
					cArray[i] = AudioUrl[Number(i)+1];
					ctArray[i] = AudioTitle[Number(i)+1];
				} else{
					TemporadaIArray[i] = 0;
					cArray[i] = "";
					ctArray[i] = "";
				}
			}
		}

		if(listSize - blockSize*pageNo + blockSize < 6){
			blockSize = listSize - blockSize*pageNo;
		}
		for(i=0; i<blockSize; i++){
			//added as ux change
      if((pageNo * blockSize + i) >= listSize){ continue; }
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			//modified as ux change
			var curI = (pageNo * blockSize) + i;
			//cbCheckObj = document.getElementById("wkk_key_check"+i);
			cbCheckObj = document.getElementById("wkk_key_check" + curI);
			cbCheckObj.style.top = checkBoxTop + "px";
			cbCheckObj.style.left = checkBoxLeft + "px";
			if(genre == "Temporada V"){
				if(TemporadaVArray[i] == 1){
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "UnMarcar Todo";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "Marcar Todo";
				}
			} else if(genre == "Temporada IV"){
				if(TemporadaIVArray[i] == 1){
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "UnMarcar Todo";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "Marcar Todo";
				}
			} else if(genre == "Temporada III"){
				if(TemporadaIIIArray[i] == 1){
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "UnMarcar Todo";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "Marcar Todo";
				}
			} else if(genre == "Temporada II"){
				if(TemporadaIIArray[i] == 1){
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "UnMarcar Todo";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "Marcar Todo";
				}
			} else if(genre == "Temporada I"){
				if(TemporadaIArray[i] == 1){
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "UnMarcar Todo";
				} else{
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
					document.getElementById('wkk_key_focus_markAll').innerHTML = "Marcar Todo";
				}
			}
		}

	}
	//Playing List Marcar Todo
	else {
		var listMaxSize = 0;
		if(selectPlayListKeyId == "menu_21"){

			if(pTitleList1!=null){
				listMaxSize = pTitleList1.length;
			}
			PlayListCnt1++;
			if(blockSize*(pageNo+1)>listMaxSize){
				if(listMaxSize<=blockSize){
					blockSize = listMaxSize;
				} else{
					blockSize = blockSize - (blockSize*(pageNo+1) - listMaxSize);
				}
			}
			if(PlayListCnt1%2!=0){ //check
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_pFocus_markAll').innerHTML = "UnMarcar Todo";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray1[i] = 1;
				}
			} else { //uncheck
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray1[i] = 0;
				}
				document.getElementById('wkk_key_pFocus_markAll').innerHTML = "Marcar Todo";
			}
		} else if(selectPlayListKeyId == "menu_22"){
			if(pTitleList2!=null){
				listMaxSize = pTitleList2.length;
			}
			PlayListCnt2++;
			if(blockSize*(pageNo+1)>listMaxSize){
				if(listMaxSize<=blockSize){
					blockSize = listMaxSize;
				} else{
					blockSize = blockSize - (blockSize*(pageNo+1) - listMaxSize);
				}
			}
			if(PlayListCnt2%2!=0){ //check
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_pFocus_markAll').innerHTML = "UnMarcar Todo";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray2[i] = 1;
				}
			} else { //uncheck
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray2[i] = 0;
				}
				document.getElementById('wkk_key_pFocus_markAll').innerHTML = "Marcar Todo";
			}
		} else if(selectPlayListKeyId == "menu_23"){
			if(pTitleList3!=null){
				listMaxSize = pTitleList3.length;
			}
			PlayListCnt3++;
			if(blockSize*(pageNo+1)>listMaxSize){
				if(listMaxSize<=blockSize){
					blockSize = listMaxSize;
				} else{
					blockSize = blockSize - (blockSize*(pageNo+1) - listMaxSize);
				}
			}
			if(PlayListCnt3%2!=0){ //check
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_pFocus_markAll').innerHTML = "UnMarcar Todo";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray3[i] = 1;
				}
			} else { //uncheck
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray3[i] = 0;
				}
				document.getElementById('wkk_key_pFocus_markAll').innerHTML = "Marcar Todo";
			}
		} else if(selectPlayListKeyId == "menu_24"){
			if(pTitleList4!=null){
				listMaxSize = pTitleList4.length;
			}
			PlayListCnt4++;
			if(blockSize*(pageNo+1)>listMaxSize){
				if(listMaxSize<=blockSize){
					blockSize = listMaxSize;
				} else{
					blockSize = blockSize - (blockSize*(pageNo+1) - listMaxSize);
				}
			}
			if(PlayListCnt4%2!=0){ //check
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "";
					document.getElementById('wkk_key_pFocus_markAll').innerHTML = "UnMarcar Todo";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray4[i] = 1;
				}
			} else { //uncheck
				for(i=0; i<blockSize; i++){
					//checkBoxTop = 214+(i*50);
					checkBoxTop = 214 + 35 + (i*50); //changed as ux change
					checkBoxLeft = 562;
					cbCheckObj = document.getElementById("wkk_key_check"+i);
					cbCheckObj.style.top = checkBoxTop + "px";
					cbCheckObj.style.left = checkBoxLeft + "px";
					cbCheckObj.style.visibility = "hidden";
				}
				for(i=0; i<listMaxSize; i++){
					playListArray4[i] = 0;
				}
				document.getElementById('wkk_key_pFocus_markAll').innerHTML = "Marcar Todo";
			}
		}
	}
}

function setInputFocus(currentKeyId) {
	var textItem = document.getElementById(currentKeyId);
	textItem.focus();
	try{
		textItem.blur();
		textItem.focus();
	}catch(e){
		alert("error: " + e);
	}
}

function addList(){
	if(!isThereCheckedList()){
		alert("Select songs to add");
		return;
	}
	popVisibleState = 1;
	document.getElementById('allBlock').style.visibility = "";
	document.getElementById('AddListPopup').style.visibility = "";
	cancelHighlight('btnList2');
	cancelHighlight('btnList3');
	cancelHighlight('btnList4');
	cancelHighlight('btnList5');
	doHighlight('btnList1');
}

function isThereCheckedList(){
  //pop
  if(TemporadaVArray!=null && TemporadaVArray!=""){
	  for(i=0; i<TemporadaVArray.length; i++){	if(TemporadaVArray[i] == 1){return true;} }
  }
  //rock
  if(TemporadaIVArray!=null && TemporadaIVArray!=""){
	  for(i=0; i<TemporadaIVArray.length; i++){ if(TemporadaIVArray[i] == 1){return true;} }
  }
  //dance
  if(TemporadaIIIArray!=null && TemporadaIIIArray!=""){
	  for(i=0; i<TemporadaIIIArray.length; i++){ if(TemporadaIIIArray[i] == 1){return true;} }
  }
  //jazz
  if(TemporadaIIArray!=null && TemporadaIIArray!=""){
	  for(i=0; i<TemporadaIIArray.length; i++){ if(TemporadaIIArray[i] == 1){return true;} }
  }
  //classic
  if(TemporadaIArray!=null && TemporadaIArray!=""){
	  for(i=0; i<TemporadaIArray.length; i++){ if(TemporadaIArray[i] == 1){return true;} }
  }
  return false;
}

function deleteList(){
	var listType = "";
	popVisibleState = 3;

	if(pTitleList1!=null || pTitleList2!=null ||
			pTitleList3!=null || pTitleList4!=null){
		if(selectPlayListKeyId == "menu_21"){
			listType = "Lista de reproducción1";
		} else if(selectPlayListKeyId == "menu_22"){
			listType = "Lista de reproducción2";
		} else if(selectPlayListKeyId == "menu_23"){
			listType = "Lista de reproducción3";
		} else if(selectPlayListKeyId == "menu_24"){
			listType = "Lista de reproducción3";
		}
	} else{
		return;
	}
	document.getElementById('allBlock').style.visibility = "";
	document.getElementById('MsgPopup').style.visibility = "";
	document.getElementById('popTitle2').innerHTML
	= "Do you want to get ride of the selected song from the"+listType+"?";
	cancelHighlight("removeCancel");
	doHighlight('removebtnOk');
}

function removeList(){
	var srtPlayList = "";
	var tempStr = "";
	var subKeyIdx = selectPlayListKeyId.charAt(6);
	var cnt=0;
	if(selectPlayListKeyId == "menu_21"){
		PlayListCnt1 = 0;
		listType = "Lista de reproducción1";
		for(i=0; i<playListArray1.length; i++){
			if(playListArray1[i] == 1){	//check
				playListArray1[i] = 0;
				pTitleList1[i] = "";
			}
		}
		for(i=0; i<pTitleList1.length; i++){
			if(pTitleList1[i]!="" && pTitleList1[i]!=null){
				tempStr+=pTitleList1[i]+"-";
				cnt++;
			}
		}
		pTitleList1 = new Array();
		for(i=0; i<cnt; i++){
			pTitleList1[i] = tempStr.split('-')[i];
		}
	} else if(selectPlayListKeyId == "menu_22"){
		PlayListCnt2 = 0;
		listType = "Lista de reproducción2";
		for(i=0; i<playListArray2.length; i++){
			if(playListArray2[i] == 1){	//check
				playListArray2[i] = 0;
				pTitleList2[i] = "";
			}
		}
		for(i=0; i<pTitleList2.length; i++){
			if(pTitleList2[i]!="" && pTitleList2[i]!=null){
				tempStr+=pTitleList2[i]+"-";
				cnt++;
			}
		}
		pTitleList2 = new Array();
		for(i=0; i<cnt; i++){
			pTitleList2[i] = tempStr.split('-')[i];
		}
	} else if(selectPlayListKeyId == "menu_23"){
		PlayListCnt3 = 0;
		listType = "Lista de reproducción3";
		for(i=0; i<playListArray3.length; i++){
			if(playListArray3[i] == 1){	//check
				playListArray3[i] = 0;
				pTitleList3[i] = ""	;
			}
		}
		for(i=0; i<pTitleList3.length; i++){
			if(pTitleList3[i]!="" && pTitleList3[i]!=null){
				tempStr+=pTitleList3[i]+"-";
				cnt++;
			}
		}
		pTitleList3 = new Array();
		for(i=0; i<cnt; i++){
			pTitleList3[i] = tempStr.split('-')[i];
		}

	} else if(selectPlayListKeyId == "menu_24"){
		PlayListCnt4 = 0;
		listType = "Lista de reproducción4";
		for(i=0; i<playListArray4.length; i++){
			if(playListArray4[i] == 1){	//check
				playListArray4[i] = 0;
				pTitleList4[i] = "";
			}
		}
		for(i=0; i<pTitleList4.length; i++){
			if(pTitleList4[i]!="" && pTitleList4[i]!=null){
				tempStr+=pTitleList4[i]+"-";
				cnt++;
			}
		}
		pTitleList4 = new Array();
		for(i=0; i<cnt; i++){
			pTitleList4[i] = tempStr.split('-')[i];
		}
	}
	pageNo = 0;
	PlayListShow(subKeyIdx);
	doHighlight("playList_00");
	cancelHighlight('wkk_key_pFocus_markAll');
	setElementVisibility("wkk_key_focus_list",false);
	setElementVisibility("wkk_key_uncheck",false);
}

function PlayListShow(subKeyIdx){
	pageCntInit(pageNo,'list');
	var playListIdx = pageNo*blockSize;
	var playList = 'playList_0';
	var listLine = 'listLine_0';
	var playButton = 'playButton_0';
	for(i=0; i<blockSize; i++){
		document.getElementById("wkk_key_check"+i).style.visibility = 'hidden';
		document.getElementById(playList+i).style.visibility = 'hidden';
		document.getElementById(listLine+i).style.visibility = 'hidden';
		document.getElementById(playButton+i).style.visibility = 'hidden';
	}
	document.getElementById('pScrollArea').style.visibility = "hidden";
	//Now Playing
	if(subKeyIdx == '0'){
		document.getElementById('playList_markAll').style.visibility = "hidden";
	}

	//Lista de reproducción1
	else if(subKeyIdx == '1'){
		//checkBoxx
		for(i=0; i<blockSize; i++){
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			cbCheckObj = document.getElementById("wkk_key_check"+i);
			cbCheckObj.style.top = checkBoxTop + "px";
			cbCheckObj.style.left = checkBoxLeft + "px";
			if(playListArray1[Number(playListIdx+i)] == 1){
				cbCheckObj.style.visibility = "";
			} else{
				cbCheckObj.style.visibility = "hidden";
			}
		}
		document.getElementById('playList_markAll').style.visibility = "hidden";
		if(pTitleList1.length>6){
			document.getElementById('pScrollArea').style.visibility = "";
		} else{
			document.getElementById('pScrollArea').style.visibility = "hidden";
		}
		for(i=0; i<blockSize; i++){
			if(pTitleList1==null){
				document.getElementById('playList_markAll').style.visibility = "hidden";
			}
			if(pTitleList1[Number(playListIdx+i)]!=null && pTitleList1[Number(playListIdx+i)]!=""){
				document.getElementById('playList_markAll').style.visibility = "";
				document.getElementById(playList+i+"1").innerHTML = pTitleList1[Number(playListIdx+i)];
				document.getElementById(playList+i).style.visibility = "";
				if(playButtonDown[Number(pageNo*blockSize+i+1)] == 1){
					document.getElementById(playButton+i).style.background = "url('../image/PLAYNOW_BTN_NORMAL.png')";
				} else{
					document.getElementById(playButton+i).style.background = "url('../image/PLAY_BTN_NORMAL.png')";
				}
				document.getElementById(playButton+i).style.visibility = "";
				document.getElementById(listLine+i).style.visibility = "";
			} else if(pTitleList1[Number(playListIdx+i)]==null && pTitleList1[Number(playListIdx+i)]==""){
				document.getElementById(playList+i).style.visibility = "hidden";
				document.getElementById(playButton+i).style.visibility = "hidden";
				document.getElementById(listLine+i).style.visibility = "hidden";
			}
		}
	}
	//Lista de reproducción2
	else if(subKeyIdx == '2'){
		//checkBox
		for(i=0; i<blockSize; i++){
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			cbCheckObj = document.getElementById("wkk_key_check"+i);
			cbCheckObj.style.top = checkBoxTop + "px";
			cbCheckObj.style.left = checkBoxLeft + "px";
			if(playListArray2[Number(playListIdx+i)] == 1){
				cbCheckObj.style.visibility = "";
			} else{
				cbCheckObj.style.visibility = "hidden";
			}
		}

		if(pTitleList2.length>6){
			document.getElementById('pScrollArea').style.visibility = "";
		}
		document.getElementById('playList_markAll').style.visibility = "hidden";
		for(i=0; i<blockSize; i++){
			if(pTitleList2==null){
				document.getElementById('playList_markAll').style.visibility = "hidden";
			}
			if(pTitleList2[Number(playListIdx+i)]!=null && pTitleList2[Number(playListIdx+i)]!=""){
				document.getElementById('playList_markAll').style.visibility = "";
				document.getElementById(playList+i+"1").innerHTML = pTitleList2[Number(playListIdx+i)];
				document.getElementById(playList+i).style.visibility = "";
				if(playButtonDown[Number(pageNo*blockSize+i+1)] == 1){
					document.getElementById(playButton+i).style.background = "url('../image/PLAYNOW_BTN_NORMAL.png')";
				} else{
					document.getElementById(playButton+i).style.background = "url('../image/PLAY_BTN_NORMAL.png')";
				}
				document.getElementById(playButton+i).style.visibility = "";
				document.getElementById(listLine+i).style.visibility = "";
			} else if(pTitleList2[Number(playListIdx+i)]==null && pTitleList2[Number(playListIdx+i)]==""){
				document.getElementById(playList+i).style.visibility = "hidden";
				document.getElementById(playButton+i).style.visibility = "hidden";
				document.getElementById(listLine+i).style.visibility = "hidden";
			}
		}
	}
	//Lista de reproducción3
	else if(subKeyIdx == '3'){

		//checkBox
		for(i=0; i<blockSize; i++){
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			cbCheckObj = document.getElementById("wkk_key_check"+i);
			cbCheckObj.style.top = checkBoxTop + "px";
			cbCheckObj.style.left = checkBoxLeft + "px";
			if(playListArray3[Number(playListIdx+i)] == 1){
				cbCheckObj.style.visibility = "";
			} else{
				cbCheckObj.style.visibility = "hidden";
			}
		}

		if(pTitleList3.length>6){
			document.getElementById('pScrollArea').style.visibility = "";
		}
		document.getElementById('playList_markAll').style.visibility = "hidden";
		for(i=0; i<blockSize; i++){
			if(pTitleList3==null){
				document.getElementById('playList_markAll').style.visibility = "hidden";
			}
			if(pTitleList3[Number(playListIdx+i)]!=null && pTitleList3[Number(playListIdx+i)]!=""){
				document.getElementById('playList_markAll').style.visibility = "";
				document.getElementById(playList+i+"1").innerHTML = pTitleList3[Number(playListIdx+i)];
				document.getElementById(playList+i).style.visibility = "";
				if(playButtonDown[Number(pageNo*blockSize+i+1)] == 1){
					document.getElementById(playButton+i).style.background = "url('../image/PLAYNOW_BTN_NORMAL.png')";
				} else{
					document.getElementById(playButton+i).style.background = "url('../image/PLAY_BTN_NORMAL.png')";
				}
				document.getElementById(playButton+i).style.visibility = "";
				document.getElementById(listLine+i).style.visibility = "";
			} else if(pTitleList3[Number(playListIdx+i)]==null && pTitleList3[Number(playListIdx+i)]==""){
				document.getElementById(playList+i).style.visibility = "hidden";
				document.getElementById(playButton+i).style.visibility = "hidden";
				document.getElementById(listLine+i).style.visibility = "hidden";
			}
		}
	}
	//Lista de reproducción4
	else if(subKeyIdx == '4'){

		//checkBox
		for(i=0; i<blockSize; i++){
			//checkBoxTop = 214+(i*50);
			checkBoxTop = 214 + 35 + (i*50); //changed as ux change
			checkBoxLeft = 562;
			cbCheckObj = document.getElementById("wkk_key_check"+i);
			cbCheckObj.style.top = checkBoxTop + "px";
			cbCheckObj.style.left = checkBoxLeft + "px";
			if(playListArray4[Number(playListIdx+i)] == 1){
				cbCheckObj.style.visibility = "";
			} else{
				cbCheckObj.style.visibility = "hidden";
			}
		}

		if(pTitleList4.length>6){
			document.getElementById('pScrollArea').style.visibility = "";
		}
		document.getElementById('playList_markAll').style.visibility = "hidden";
		for(i=0; i<blockSize; i++){
			if(pTitleList4==null){
				document.getElementById('playList_markAll').style.visibility = "hidden";
			}
			if(pTitleList4[Number(playListIdx+i)]!=null && pTitleList4[Number(playListIdx+i)]!=""){
				document.getElementById('playList_markAll').style.visibility = "";
				document.getElementById(playList+i+"1").innerHTML = pTitleList4[Number(playListIdx+i)];
				document.getElementById(playList+i).style.visibility = "";
				if(playButtonDown[Number(pageNo*blockSize+i+1)] == 1){
					document.getElementById(playButton+i).style.background = "url('../image/PLAYNOW_BTN_NORMAL.png')";
				} else{
					document.getElementById(playButton+i).style.background = "url('../image/PLAY_BTN_NORMAL.png')";
				}
				document.getElementById(playButton+i).style.visibility = "";
				document.getElementById(listLine+i).style.visibility = "";
			} else if(pTitleList4[Number(playListIdx+i)]==null && pTitleList4[Number(playListIdx+i)]==""){
				document.getElementById(playList+i).style.visibility = "hidden";
				document.getElementById(playButton+i).style.visibility = "hidden";
				document.getElementById(listLine+i).style.visibility = "hidden";
			}
		}
	}
}

/**
 * scroll control
 */
function processScroll(event, action) {
	switch(action) {
		case "over" :
			setImgSrc("featuredScrollImg", "../image/PORT_SCROLL_BAR_FOCUS.png" );
			break;
		case "out" :
			setImgSrc("featuredScrollImg", "../image/PORT_SCROLL_BAR.png" );
			break;
		case "over1" :
			setImgSrc("featuredScrollImg1", "../image/PORT_SCROLL_BAR_FOCUS.png" );
			break;
		case "out1" :
			setImgSrc("featuredScrollImg1", "../image/PORT_SCROLL_BAR.png" );
			break;
		case "down" :
		case "click" :
			processScrollDown(event);
			break;
		default :
			break;
	}
}

var scrollY = 0;

function processScrollDown(event) {
	if(menuGb==0){
	  var e = document.getElementById("featuredScroll");
	}else{
	  var e = document.getElementById("featuredScroll1");
	}
	scrollY = event.clientY - e.offsetTop;
	addEvent(document, "mousemove", processScrollDrag);
	addEvent(document, "mouseup", processScrollUp);
}

function processScrollUp(event) {
	moveScrollByClick(event);
	removeEvent(document, "mousemove", processScrollDrag);
	removeEvent(document, "mouseup", processScrollUp);
}

function moveScrollByClick(event) {
  var scrollImgTop = parseInt(event.clientY) - 234;
	var tempScrollTop = 0;
	var inter = 0;
	var relIdx = 0;
	var scrollTop = 0;

	if(menuGb==0){
		inter = Math.round( 294 / (new Number(fCnt)-1));
		relIdx = Math.round( scrollImgTop/inter );
		scrollTop = inter*relIdx;
		if(scrollTop > 294){
			scrollTop = 294;
		}else if(scrollTop < 0){
			scrollTop = 0;
		}
		document.getElementById("featuredScroll").style.top = scrollTop + "px";
		if(scrollTop>150){
			pageNo = 1;
		} else{
			pageNo = 0;
		}
		musicListInit(pageNo,blockSize);
		doHighlight('music_00');
	} else {
		var lCnt = 0;
		var subKeyIdx = 0;
		if(selectPlayListKeyId == "menu_21"){
			lCnt = pTitleList1.length;
			subKeyIdx = 1;
		} else if(selectPlayListKeyId == "menu_22"){
			lCnt = pTitleList2.length;
			subKeyIdx = 2;
		} else if(selectPlayListKeyId == "menu_23"){
			lCnt = pTitleList3.length;
			subKeyIdx = 3;
		} else if(selectPlayListKeyId == "menu_24"){
			lCnt = pTitleList4.length;
			subKeyIdx = 4;
		}

		//pageSize
		if(lCnt / blockSize == 0){
			PageSize = 0;
		}
		else if(lCnt % blockSize == 0){
			PageSize = lCnt / blockSize;
			PageSize = Math.floor(PageSize);

		} else if(lCnt % blockSize != 0){
			PageSize = lCnt / blockSize;
			PageSize = Math.floor(PageSize+1);
		}

		inter = Math.round( 294 / (new Number(lCnt)-1));
		relIdx = Math.round( scrollImgTop/inter );
		scrollTop = inter*relIdx;
		if(scrollTop > 294){
			scrollTop = 294;
		}else if(scrollTop < 0){
			scrollTop = 0;
		}
		document.getElementById("featuredScroll1").style.top = scrollTop + "px";
		scrollHeight = document.getElementById('scrollBack').style.height.split("px")[0];
		pageNo = Math.floor(scrollTop / (scrollHeight / PageSize));
		PlayListShow(subKeyIdx);
		doHighlight('playList_00');
	}
}

function processScrollDrag(event) {

	//document.getElementById("test_log").innerHTML = event.clientY + " / " + event.clientX;
	if(event.clientY < 200 || event.clientY > 600 || event.clientX < 1000 || event.clientX > 1280){
	  removeEvent(document, "mousemove", processScrollDrag);
    processScrollUp();
		return;
	}
	if(menuGb==0){
  	var e = document.getElementById("featuredScroll");
  }else{
  	var e = document.getElementById("featuredScroll1");
  }

	var top = event.clientY - scrollY;

	if( top < 0 ) {
		top = 0;
	} else if( top > 294 ){
		top = 294;
	}
    e.style.top = top + "px";
}

function moveScrollByKey(idx) {
	var inter = 0;
	var scrollTop = 0;
	//genre
	if(menuGb==0){
		idx = pageNo*blockSize+idx;
		inter = Math.round( 294 / (new Number(fCnt)-1));
		scrollTop = inter*idx;
		document.getElementById("featuredScroll").style.top = scrollTop + "px";
	}
	//playList
	else {
		var lCnt = 0;
		if(selectPlayListKeyId == "menu_21"){
			lCnt = pTitleList1.length;
		} else if(selectPlayListKeyId == "menu_22"){
			lCnt = pTitleList2.length;
		} else if(selectPlayListKeyId == "menu_23"){
			lCnt = pTitleList3.length;
		} else if(selectPlayListKeyId == "menu_24"){
			lCnt = pTitleList4.length;
		}
		idx = pageNo*blockSize+idx;
		inter = Math.round( 294 / (new Number(lCnt)-1));
		scrollTop = inter*idx;
		document.getElementById("featuredScroll1").style.top = scrollTop + "px";
	}
}

function scrollByListUpDownButton(upOrDown){
	//lert("scrollByListUpDownButton\ncurrentKeyId : " + currentKeyId);
 	var curListLength = 10;
  if(menuGb == 1){curListLength = listLength;}
  if(curListLength == 0){return;}
  var keyIdPre = currentKeyId.substr(0,4);
  if((keyIdPre != "musi" && keyIdPre != "play") || currentKeyId == "playList_markAll"){
    //if list not selected, give focus
	  if(upOrDown == "UP"){
      if(menuGb == 0){
      	doHighlight('music_00');
      }else{
      	doHighlight('playList_00');
      }
	  }else if(upOrDown == "DOWN"){
	  	//if(((pageNo + 1) * blockSize) > listSize){
	  	if(((pageNo + 1) * blockSize) > curListLength){
	  	  //var idxToHL = listSize - (pageNo * blockSize) - 1;
	  	  var idxToHL = curListLength - (pageNo * blockSize) - 1;
	  	  if(idxToHL < 10){idxToHL = "0" + idxToHL;}
		    //doHighlight("music_" + idxToHL);
        if(menuGb == 0){
        	doHighlight("music_" + idxToHL);
        }else{
        	doHighlight("playList_" + idxToHL);
        }
	  	}else{
        if(menuGb == 0){
        	doHighlight('music_05');
        }else{
        	doHighlight('playList_05');
        }
	  	}
	  }
  }else if(upOrDown == "UP"){
		if(pageNo == 0 && (currentKeyId == "music_00" || currentKeyId == "play_00")){
			//do nothing
		}else if(pageNo == 0 && (currentKeyId == "playList_00" || currentKeyId == "playButton_00")){
			//do nothing
		}else{
      keyDownByKeyCode(VK_UP);
		}
	}else if(upOrDown == "DOWN"){
    keyDownByKeyCode(VK_DOWN);
	}
}

