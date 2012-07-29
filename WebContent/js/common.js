var sources = new Array(
	'http://www.terrorynadamas.org/?feed=rss2',
	'http://feeds.feedburner.com/archivoTynmTemporadaV',
	'http://feeds.feedburner.com/archivoTynmTemporadaIV',
	'http://feeds.feedburner.com/archivoTynmTemporadaIII',
	'http://feeds.feedburner.com/archivoTynmTemporadaII',
	'http://feeds.feedburner.com/archivoTynmTemporadaI'
);
var list = new Array();
var list_to_load = 0;
var current_list = 0;
var play_list = -1;
var play_song = -1;
var cmn_last_tab = 'h';
// data-orderh elements
var cmn_tabh_elements = new Array();
var cmn_tabh_elements_real_n = 0;
var cmn_tabh_elements_n = 0;
var cmn_tabh_element_current = 0;
// data-orderv elements. First must have data-orderh 
var cmn_tabv_elements = new Array();
var cmn_tabv_elements_n = 0;
var cmn_tabv_element_current = 0;

function init_tabs() {
	var elements = document.getElementsByTagName('*');
	n = elements.length;
	j=0;
	k=0;
	for(i = 0; i < n; i++) {
		orderh = 1 * elements[i].dataset.orderh;
		orderv = 1 * elements[i].dataset.orderv;
		if (orderh>0) {
			cmn_tabh_elements[j] = elements[i];
			j++;
		}
		if (orderv>0) {
			cmn_tabv_elements[k] = elements[i];
			k++;
		}
		
    }
	cmn_tabh_elements_n = cmn_tabh_elements.length;
	cmn_tabv_elements_n = cmn_tabv_elements.length;
	if (cmn_tabh_elements_real_n == 0) {
		cmn_tabh_elements_real_n = cmn_tabh_elements_n;
	}
	
	cmn_tabh_elements.sort(tabh_elements_sortfunction);
	cmn_tabv_elements.sort(tabv_elements_sortfunction);

	for(i = 0; i < cmn_tabh_elements_n; i++) {
		cmn_tabh_elements[i].setAttribute('onmouseover', 'processFocusHandle(\'h\',' + i + ');');		
	}
	
	tabv_elements_first();
	tabh_elements_first();	
}

function tab_element_current() {
	if (cmn_last_tab == 'h') {
		return cmn_tabh_elements[cmn_tabh_element_current];
	} else {
		return cmn_tabv_elements[cmn_tabv_element_current];
	}
}

function tabh2tabv() {
	if (cmn_last_tab == 'h') {
		cmn_tabv_element_current = 0;	
		cmn_last_tab = 'v';
	}	
}

function tabv2tabh() {
	if (cmn_last_tab == 'v') {
		cmn_tabh_element_current = 0;	
		cmn_last_tab = 'h';
	}		
}

function tabh_elements_sortfunction(a, b){
	order_a = 1 * a.dataset.orderh;
	order_b = 1 * b.dataset.orderh;
	return (order_a - order_b)
}

function tabh_elements_next() {
	if (cmn_tabh_element_current < cmn_tabh_elements_n-1) cmn_tabh_element_current++;
	tabv2tabh();
}

function tabh_elements_previous() {
	if (cmn_tabh_element_current > 0) cmn_tabh_element_current--;
	tabv2tabh();
}

function tabh_elements_first() {
	cmn_tabh_element_current = 0;
	tabv2tabh();
}

function tabh_elements_last() {
	cmn_tabh_element_current = cmn_tabh_elements_n-1;
	tabv2tabh();
}

function tabv_elements_sortfunction(a, b){
	order_a = 1 * a.dataset.orderv;
	order_b = 1 * b.dataset.orderv;
	return (order_a - order_b)
}

function tabv_element_current() {
	return cmn_tabv_elements[cmn_tabh_element_current];
	tabh2tabv();
}

function tabv_elements_next() {
	if (cmn_tabv_element_current < cmn_tabv_elements_n-1) cmn_tabv_element_current++;
	tabh2tabv();
}

function tabv_elements_previous() {
	if (cmn_tabv_element_current > 0) cmn_tabv_element_current--;
	tabh2tabv();
}

function tabv_elements_first() {
	cmn_tabv_element_current = 0;
	tabh2tabv();
}

function tabv_elements_last() {
	cmn_tabv_element_current = cmn_tabv_elements_n-1;
	tabh2tabv();
}


function hideBusysign() {
	document.getElementById('busy_indicator').style.display ='none';
	document.getElementById('list').style.display ='block';
}
	 
function showBusysign() {
	document.getElementById('busy_indicator').style.display ='block';
	document.getElementById('list').style.display ='none';
}
	 

function loadJSON(url) {
	showBusysign();
  	var yahooPipe = 'http://pipes.yahoo.com/pipes/9oyONQzA2xGOkM4FqGIyXQ/run?&_render=JSON&_callback=processJSON&feed=';  	
  	var headID = document.getElementsByTagName("head")[0];        
  	var newScript = document.createElement('script');
  		newScript.type = 'text/javascript';
  		newScript.src = yahooPipe+url;
newScript.src = '../js/json1.js';	  		
  	headID.appendChild(newScript);
}

function processJSON(feed){
  current_list = list_to_load; 
  list[list_to_load] = new Array(); 
  j=0;
  for(i=0; i<feed.value.items.length; i++) {
	  if ("enclosure" in feed.value.items[i]) {
		  list[list_to_load][j] = new Array();
		  list[list_to_load][j].title = feed.value.items[i].title;
		  list[list_to_load][j].description = feed.value.items[i].description;
		  list[list_to_load][j].media = feed.value.items[i].enclosure.url;	 
		  if (null != feed.value.items[i]["y:published"]) {
		  	list[list_to_load][j].date  = 	feed.value.items[i]["y:published"].day + "/" + 
		  									feed.value.items[i]["y:published"].month + "/" +
		  									feed.value.items[i]["y:published"].year;
	  	  } else {
	  		list[list_to_load][j].date  = 	'';
	  	  }
		  if ("content:encoded" in feed.value.items[i]) {
			  image = feed.value.items[i]["content:encoded"].match( /^(.*?)"([^"]+\.jpg)"(.*?)$/m );		  
			  if (null != image) {
				  list[list_to_load][j].image = image[2];
			  } else {
				  list[list_to_load][j].image = '../image/Terror_y_Nada_MAS.jpg';
			  }				  
		  } else {
			  list[list_to_load][j].image = '../image/Terror_y_Nada_MAS.jpg';;
		  }
		  j++;
	  }
  }  
  
  list_update();
  hideBusysign();
}

function processFocusHandle(order, n) {
	current_off();
	if (order == 'v') {
		tabh2tabv();
		cmn_tabv_element_current = n;
		preview_update();
	} else {
		tabv2tabh();
		cmn_tabh_element_current = n;				
	}
	current_on();
}

function list_update() {
	items = document.getElementById('items');
	items.innerHTML = '';
	for(i=0; i<list[current_list].length; i++) {
		// Use this to allow all h navigation
		//data_orderh = ' data-orderh="' + (cmn_tabh_elements_real_n + i - 1) + '" ';
		// Use this to allow partial h navigation
		if (i == 0) {
			data_orderh = ' data-orderh="' + (cmn_tabh_elements_real_n + i) + '" ';
		} else {
			data_orderh = '';
		}
		
		if ((play_list == current_list) && (play_song == i)) {
			btn = 'play_btn_on';
		} else {
			btn = 'play_btn_off';  
		}
		items.innerHTML = items.innerHTML + 
				'<li class="trackline tab_off" data-orderv="' + (i + 1) + '" ' + data_orderh + 
					'onmouseover="processFocusHandle(\'v\',' + (i) + ');" onmousedown="action();" ' +
					'data-play="' + (i) + '">' +
				'<span class="number">' + (i+1) + '</span>' + 		
				'<span class="track">' + list[current_list][i].title + '</span>' +
				'<div class="' + btn + '"></div>'+
				'</li>';			  
	}
	init_tabs();
	tabh2tabv();
	current_on();
	preview_update()
}

function preview_update() {
	i = cmn_tabv_element_current;
	if (list[current_list][i].image) {
		document.getElementById('image').innerHTML = '<img id="theimage" src="' + list[current_list][i].image + '"/>';
	} else {
		document.getElementById('image').innerHTML = '';
	}
	document.getElementById('title').innerHTML = list[current_list][i].title;
	document.getElementById('date').innerHTML = list[current_list][i].date;
	document.getElementById('text').innerHTML = list[current_list][i].description;
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

function setElementBgColor(elementId, color) {
	var e = document.getElementById(elementId);
	if(elementId != null) {
		e.style.backgroundColor = color;
	}
}

function setImgSrc(elementId, src) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.src = src;
	}
}

function setTdElementText(elementId, text) {
	var e = document.getElementById(elementId);
	if( e != null) {
		e.firstChild.nodeValue = text;
	}
}

