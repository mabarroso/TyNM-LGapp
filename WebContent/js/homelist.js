function homeInit() {
	init_tabs();
}

function keyDown(event){
	keyDownByKeyCode(event.keyCode);
}
		
function keyDownByKeyCode(keyCodeToProcess){
	r = document.getElementById('r');
	tab_element_current().style.color = 'rgb(182,182,182)';
	switch (keyCodeToProcess) {	
		case VK_LEFT: 
			tab_elements_previous()
			break;
		case VK_RIGHT:
			tab_elements_next();
			break;
		case VK_DOWN: 
			break;
		case VK_UP: 
			break;
		case VK_ENTER: 
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
	tab_element_current().style.color = 'rgb(255,255,255)';
	r.innerHTML = r.innerHTML + tab_element_current().dataset.order+"<br>";
}

function executeAction(action, position) {
	
}