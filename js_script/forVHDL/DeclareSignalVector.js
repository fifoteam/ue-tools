
//UltraEdit.outputWindow.showWindow(true);
str = UltraEdit.activeDocument.selection;
//str = UltraEdit.activeDocument.selectWord;
//UltraEdit.outputWindow.write("the str is "+str+"");
num = UltraEdit.getValue("DataWidth",1);
num = num / 10;
num = num - 1;
UltraEdit.activeDocument.write("signal "+str+"\t: std_logic_vector("+num+" downto 0) := (others => '0');");

