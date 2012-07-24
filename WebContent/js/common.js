var list = new Array();
var list_to_load = 0;
var cmn_last_tab = 'h';
// data-orderh elements
var cmn_tabh_elements = new Array(); 
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
	
	cmn_tabh_elements.sort(tabh_elements_sortfunction);
	cmn_tabv_elements.sort(tabv_elements_sortfunction);

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
  	headID.appendChild(newScript);
r = document.getElementById('r');
r.innerHTML = r.innerHTML + 'loading<BR>';
}

function processJSON(feed){
r = document.getElementById('r');
  list[list_to_load] = new Array(); 
  for(i=0; i<feed.value.items.length; i++) {
	  list[list_to_load][i] = new Array();
	  list[list_to_load][i].title = feed.value.items[i].title;
	  list[list_to_load][i].description = feed.value.items[i].description + "<br/>";
	  //list[list_to_load][i].media = feed.value.items[i].enclosure.url + "<br/>";	  
	  //list[list_to_load][i].date  = feed.value.items[i]["y:published"].day + "/" + 
	  //							    feed.value.items[i]["y:published"].month + "/" +
	  //							    feed.value.items[i]["y:published"].year;
	  if ("content:encoded" in feed.value.items[i]) {
		  list[list_to_load][i].image = feed.value.items[i]["content:encoded"].replace( /^(.*?)"([^"]+.jpg)"(.*?)$/ , '$2.jpg' );
		  if (list[list_to_load][i].image == feed.value.items[i]["content:encoded"]) {
			  list[list_to_load][i].image = false;
		  }
	  } else {
		  list[list_to_load][i].image = false;
	  }
	  	  
	  r.innerHTML = r.innerHTML + "---<br/>";
	  
  }
  hideBusysign();
}
