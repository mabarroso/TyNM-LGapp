function homeInit() {
	init_tabs();
//	tabv2tabh();
	tabh2tabv();
	current_on();	
	loadJSON('http://www.terrorynadamas.org/?feed=rss2');
}

function keyDown(event){
	keyDownByKeyCode(event.keyCode);
}
		
function keyDownByKeyCode(keyCodeToProcess){
	current_off();
	switch (keyCodeToProcess) {	
		case VK_LEFT: 
			tabh_elements_previous();
			break;
		case VK_RIGHT:
			tabh_elements_next();
			break;
		case VK_DOWN: 			
			tabv_elements_next();
			preview_update();
			break;
		case VK_UP: 
			tabv_elements_previous();
			preview_update();
			break;
		case VK_ENTER: 
			action();
			break;			
		case VK_PAGE_UP: 
			break;
		case VK_PAGE_DOWN: 
			break;
		case VK_INFO:		
			window.location.reload();		
			break;
		case VK_GREEN:					
			break;
		case VK_YELLOW:
			break;
		case VK_RED:
			break;
		case VK_BLUE:
			break;
		case VK_BACK :			
			break;
		case VK_INFO :						
			break;
		 case VK_PLAY :
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
	current_on();
}

function action() {
	e = tab_element_current();
	play = e.dataset.play;
	if (null != play) {
		alert('play '+ play);
	}
	load = e.dataset.load;
	if (null != load) {
		current_off();
		list_to_load = load;
		current_list = load;
		loadJSON(sources[load]);
	}
	
}

function current_off() {
	e = tab_element_current();
	e.className = e.className.replace( /tab_on/ , 'tab_off' );
}

function current_on() {
	e = tab_element_current();
	e.className = e.className.replace( /tab_off/ , 'tab_on' );	
}

function executeAction(action, position) {
	
}