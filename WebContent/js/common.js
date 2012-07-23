var tab_elements = new Array();
var tab_elements_n = 0;
var tab_element_current = 0;

var r;

function init_tabs() {
	r = document.getElementById('r');
	
	var elements = document.getElementsByTagName('*');
	n = elements.length;
	j=0;
	for(i = 0; i < n; i++) {
		order = 1 * elements[i].dataset.order;
		if (order>0) {
			tab_elements[j] = elements[i];
			j++;
			r.innerHTML = r.innerHTML + order + "<br>";
		}
		
    }
	tab_elements_n = tab_elements.length;
	r.innerHTML = r.innerHTML + "---" + "<br>";	
	r.innerHTML = r.innerHTML + tab_elements_n + "<br>";
	
	tab_elements.sort(tab_elements_sortfunction);
	r.innerHTML = r.innerHTML + "---" + "<br>";
	for(i = 0; i < tab_elements_n; i++) {
		r.innerHTML = r.innerHTML + "index " + i + " ";		
        r.innerHTML = r.innerHTML + tab_elements[i].dataset.order+"<br>";
    }	
	
	r.innerHTML = r.innerHTML + "end" + "<br>";
	tab_elements_first();
}

function tab_elements_sortfunction(a, b){
	order_a = 1 * a.dataset.order;
	order_b = 1 * b.dataset.order;
	return (order_a - order_b)
}

function tab_elements_next() {
	if (tab_element_current < tab_elements_n-1) tab_element_current++;
}

function tab_elements_previous() {
	if (tab_element_current > 0) tab_element_current--;
}

function tab_elements_first() {
	tab_element_current = 0;	
}

function tab_elements_last() {
	tab_element_current = tab_elements_n-1;
}
