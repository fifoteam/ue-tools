
// include subfunction.js

function cloc(DEBUG){
	var diff=0;
	var file1=0;
	var file2=0;

	if (DEBUG) {
		UltraEdit.outputWindow.clear();
		UltraEdit.outputWindow.showOutput=true;
		UltraEdit.outputWindow.showWindow(true);
	}

	diff = UltraEdit.getString("Diff Two file or folder ?:[y]or[Y] equals True.[n]or[N] equals False",1);
	if (diff=="n" || diff=="N") {
		diff=0;
	}
	else if (diff=="y" || diff=="Y") {
		diff=1;
	}
	else {
		return;
	}

	if (diff===0) {
		file1 = UltraEdit.getString("Specify file or folder",1);
	}
	else {
		file1 = UltraEdit.getString("Specify first file or folder",1);
		file2 = UltraEdit.getString("Specify Second file or folder",1);
	}

	UltraEdit.open("c:\\ue\\cloc_cmd.bat");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	if (diff===0) {
		UltraEdit.activeDocument.write("cloc -force-lang=Verilog-SystemVerilog --ignore-whitespace --windows "+file1);
	}
	else {
		UltraEdit.activeDocument.write("cloc -force-lang=Verilog-SystemVerilog --ignore-whitespace --windows --diff-alignment=c:\\ue\\cloc_res.txt --diff "+file1+" "+file2+"\r\n");
//		UltraEdit.activeDocument.write("uedit32 c:\\ue\\cloc_res.txt");
	}

	UltraEdit.closeFile("c:\\ue\\cloc_cmd.bat",1);
	UltraEdit.runTool("cloc_cmd_bat");

	return;
}


cloc(0);
