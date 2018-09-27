
// include subfunction.js

function CopyPasteCom(){

	var str;
	var CurrentLine = 0;
	var CurrentLine1 = 0;
	
//	UltraEdit.outputWindow.clear();
//	UltraEdit.outputWindow.showOutput=true;
//	UltraEdit.outputWindow.showWindow(true);
	
	CurrentLine = UltraEdit.activeDocument.currentLineNum;
	str=StringCopy(CurrentLine);

	UltraEdit.activeDocument.gotoLine(CurrentLine,1);
	CurrentLine1 = UltraEdit.activeDocument.currentLineNum;		//FOR TEST
	UltraEdit.activeDocument.key("HOME");
	CurrentLine1 = UltraEdit.activeDocument.currentLineNum;		//FOR TEST
	UltraEdit.activeDocument.write("//");
	CurrentLine1 = UltraEdit.activeDocument.currentLineNum;		//FOR TEST
	UltraEdit.activeDocument.gotoLine(CurrentLine+1,1);
	UltraEdit.activeDocument.write(""+ str +"");
	
//	signalType = UltraEdit.getString("0",1);
	
	}


	CopyPasteCom();
