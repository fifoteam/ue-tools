

function pin_map(){
	str = UltraEdit.activeDocument.selection;
	UltraEdit.activeDocument.write(""+str+"\t=> "+str+",");	
}


pin_map();