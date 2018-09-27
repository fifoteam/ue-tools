
var CurrentLine;
CurrentLine = UltraEdit.activeDocument.currentLineNum;
UltraEdit.activeDocument.selectAll();
UltraEdit.activeDocument.reIndentSelection();
UltraEdit.save();
UltraEdit.activeDocument.gotoLine(CurrentLine,1);



