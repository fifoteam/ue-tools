
str = UltraEdit.activeDocument.selection;


UltraEdit.activeDocument.write("attribute KEEP : string;\r\n");
UltraEdit.activeDocument.write("attribute KEEP of "+str+" : signal is \"true\";");
