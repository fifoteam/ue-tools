


// include subfunction.js


function compile_Run(){
	var CurrentLine;

	//  -------------------------------------------------------------------------------------
	//	����ļ���չ��
	//	--python ��������
	//  -------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isExt("py")) {
	}
	else {
		CurrentLine = UltraEdit.activeDocument.currentLineNum;
		UltraEdit.activeDocument.selectAll();
		UltraEdit.activeDocument.reIndentSelection();

		//UltraEdit.activeDocument.selectAll();
		//UltraEdit.activeDocument.reIndentSelection();

		UltraEdit.activeDocument.trimTrailingSpaces();

		//UltraEdit.save();
		UltraEdit.activeDocument.gotoLine(CurrentLine,1);

		UltraEdit.activeDocument.endSelect();
	}
}

compile_Run();

