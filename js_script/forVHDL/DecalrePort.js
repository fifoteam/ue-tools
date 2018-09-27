
var str,num;
str = UltraEdit.getString("Port Direction",1);
num = UltraEdit.getValue("DataWidth",1);
num = num / 10;
num = num - 1;

if(num < 0) UltraEdit.activeDocument.write(": "+str+"\tstd_logic;");
else UltraEdit.activeDocument.write(": "+str+"\tstd_logic_vector("+num+" downto 0);");

