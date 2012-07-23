var cmn_tab_elements = new Array();
var cmn_tab_elements_n = 0;
var cmn_tab_element_current = 0;

var r;

function init_tabs() {
	r = document.getElementById('r');
	
	var elements = document.getElementsByTagName('*');
	n = elements.length;
	j=0;
	for(i = 0; i < n; i++) {
		order = 1 * elements[i].dataset.order;
		if (order>0) {
			cmn_tab_elements[j] = elements[i];
			j++;
			r.innerHTML = r.innerHTML + order + "<br>";
		}
		
    }
	cmn_tab_elements_n = cmn_tab_elements.length;
	r.innerHTML = r.innerHTML + "---" + "<br>";	
	r.innerHTML = r.innerHTML + cmn_tab_elements_n + "<br>";
	
	cmn_tab_elements.sort(tab_elements_sortfunction);
	r.innerHTML = r.innerHTML + "---" + "<br>";
	for(i = 0; i < cmn_tab_elements_n; i++) {
		r.innerHTML = r.innerHTML + "index " + i + " ";		
        r.innerHTML = r.innerHTML + cmn_tab_elements[i].dataset.order+"<br>";
    }	
	
	r.innerHTML = r.innerHTML + "end" + "<br>";
	tab_elements_first();
}

function tab_element_current() {
	return cmn_tab_elements[cmn_tab_element_current];
}

function tab_elements_sortfunction(a, b){
	order_a = 1 * a.dataset.order;
	order_b = 1 * b.dataset.order;
	return (order_a - order_b)
}

function tab_elements_next() {
	if (cmn_tab_element_current < cmn_tab_elements_n-1) cmn_tab_element_current++;
}

function tab_elements_previous() {
	if (cmn_tab_element_current > 0) cmn_tab_element_current--;
}

function tab_elements_first() {
	cmn_tab_element_current = 0;	
}

function tab_elements_last() {
	cmn_tab_element_current = cmn_tab_elements_n-1;
}
