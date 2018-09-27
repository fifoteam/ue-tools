
function init_value(){
	var str = UltraEdit.getString("Single[s] or Vector[v]",1);
	if(str=="s"){
		UltraEdit.activeDocument.write("<= '0';");
	}
	else if(str=="v"){
		UltraEdit.activeDocument.write("<= (others=>'0');");
	}
}

init_value();
