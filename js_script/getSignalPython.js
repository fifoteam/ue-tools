
// include subfunction.js

function getSignalPython(){
	var TotalLine,i,j,strIndex;
	var str;
	var ClipArray=new Array();
	var strCommaSplit=new Array();

	//	UltraEdit.outputWindow.clear();
	//	UltraEdit.outputWindow.showOutput=true;
	//	UltraEdit.outputWindow.showWindow(true);

	UltraEdit.selectClipboard(0);
	UltraEdit.clearClipboard(0);
	UltraEdit.clipboardContent = UltraEdit.activeDocument.selection;
	UltraEdit.runTool("get_signal");

}


getSignalPython();
