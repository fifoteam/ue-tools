

function count_reg(){
	str = UltraEdit.activeDocument.selection;
	UltraEdit.activeDocument.write(""+str+"\t<= "+str+" + '1';");	
}


count_reg();