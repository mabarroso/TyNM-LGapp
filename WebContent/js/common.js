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
