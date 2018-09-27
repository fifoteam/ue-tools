function writeProc(){
	var str_rst = UltraEdit.getString("Reset signal:",1);
	var str_clk = UltraEdit.getString("Clock signal:",1);
//	var str_rst = "rst";
//	var str_clk = "clk";
	if(str_rst===""&&str_clk===""){
		UltraEdit.activeDocument.write("process\r\n");
		UltraEdit.activeDocument.write("begin\r\n\r\n");
//		UltraEdit.activeDocument.write("\t\r\n");
		UltraEdit.activeDocument.write("end process;");
		}
	else if(str_rst===""){
		UltraEdit.activeDocument.write("process("+str_clk+")\r\n");
		UltraEdit.activeDocument.write("begin\r\n");
		UltraEdit.activeDocument.write("\tif(rising_edge("+str_clk+"))then\r\n");
		UltraEdit.activeDocument.write("\t\t\r\n");
		UltraEdit.activeDocument.write("\tend if;\r\n");
		UltraEdit.activeDocument.write("end process;");
		}
	else{
		UltraEdit.activeDocument.write("process("+str_rst+","+str_clk+")\r\n");
		UltraEdit.activeDocument.write("begin\r\n");
		UltraEdit.activeDocument.write("\tif("+str_rst+"='1')then\r\n");
//		UltraEdit.activeDocument.write("\t\t\t<= (others=>'0');\r\n");
		UltraEdit.activeDocument.write("\t\t\r\n");
		UltraEdit.activeDocument.write("\telsif(rising_edge("+str_clk+"))then\r\n");
		UltraEdit.activeDocument.write("\t\t\r\n");
		UltraEdit.activeDocument.write("\tend if;\r\n");
		UltraEdit.activeDocument.write("end process;");
		}
}

writeProc();
