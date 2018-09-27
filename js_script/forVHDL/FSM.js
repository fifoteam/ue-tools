

function writeFSM(){
	cs = UltraEdit.getString("Current State",1);
	ns = UltraEdit.getString("Next State",1);
	
	UltraEdit.activeDocument.write("type state_type is(S_IDLE,S_ST1,S_ST2,S_ST3);\r\n");
	UltraEdit.activeDocument.write("signal "+cs+","+ns+" : state_type := S_IDLE;\r\n\r\n");
	UltraEdit.activeDocument.write("--ref FSM\r\n");
	UltraEdit.activeDocument.write("--Current State ("+cs+")\r\n");
	UltraEdit.activeDocument.write("process(clk,rst)\r\n");
	UltraEdit.activeDocument.write("begin\r\n");
	UltraEdit.activeDocument.write("if(rst='1')then\r\n");
	UltraEdit.activeDocument.write("\t"+cs+"\t<= S_IDLE;\r\n");
	UltraEdit.activeDocument.write("elsif(rising_edge(clk))then\r\n");
	UltraEdit.activeDocument.write("\t"+cs+"\t<= "+ns+";\r\n");
	UltraEdit.activeDocument.write("end if;\r\n");
	UltraEdit.activeDocument.write("end process;\r\n");
	UltraEdit.activeDocument.write("--Next state ("+ns+")\r\n");
	UltraEdit.activeDocument.write("process("+cs+")\r\n");
	UltraEdit.activeDocument.write("begin\r\n");
	UltraEdit.activeDocument.write("\tcase("+cs+")is\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_IDLE =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_ST1 =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_ST2 =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_ST3 =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen others =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t"+ns+"\t<= S_IDLE;\r\n");
	UltraEdit.activeDocument.write("\tend case;\r\n");
	UltraEdit.activeDocument.write("end process;\r\n");
	UltraEdit.activeDocument.write("--Output logic (OL)\r\n");
	UltraEdit.activeDocument.write("process(clk,rst)\r\n");
	UltraEdit.activeDocument.write("begin\r\n");
	UltraEdit.activeDocument.write("if(rst='1')then\r\n\r\n");
	UltraEdit.activeDocument.write("elsif(rising_edge(clk))then\r\n");
	UltraEdit.activeDocument.write("\tcase("+cs+")is\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_IDLE =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_ST1 =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_ST2 =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\t\twhen S_ST3 =>\r\n");
	UltraEdit.activeDocument.write("\t\t\t\r\n");
	UltraEdit.activeDocument.write("\tend case;\r\n");
	UltraEdit.activeDocument.write("end if;\r\n");
	UltraEdit.activeDocument.write("end process;\r\n");
	
	
	
	}
	
	writeFSM();
