

function edge_generate(){
	var str;
	var str_rise,str_fall;
	var edge;
	var clk;
	var rst;
	
	str = UltraEdit.activeDocument.selection;
	rst = UltraEdit.getString("rst name",1);
	clk = UltraEdit.getString("clk name",1);
	edge = UltraEdit.getString("Rise[r] or Fall[f]",1);
	str_d = str+"_d";
	str_rise = str+"_rise";
	str_fall = str+"_fall";
	
	if(edge=="r"){
		UltraEdit.activeDocument.write("signal "+str_d+"	: std_logic:='1';\r\n");
		UltraEdit.activeDocument.write("signal "+str_rise+"	: std_logic:='0';\r\n\r\n");
		UltraEdit.activeDocument.write("--"+str+" rising edge\r\n");
		UltraEdit.activeDocument.write("process("+rst+","+clk+")\r\n");
		UltraEdit.activeDocument.write("begin\r\n");
		UltraEdit.activeDocument.write("	if("+rst+"='1')then\r\n");
		UltraEdit.activeDocument.write("		"+str_d+"		<= '1';\r\n");
		UltraEdit.activeDocument.write("		"+str_rise+"	<= '0';\r\n");
		UltraEdit.activeDocument.write("	elsif(rising_edge("+clk+"))then\r\n");
		UltraEdit.activeDocument.write("		"+str_d+"	<= "+str+";\r\n");
		UltraEdit.activeDocument.write("		if("+str_d+"='0' and "+str+"='1')then\r\n");
		UltraEdit.activeDocument.write("			"+str_rise+"	<= '1';\r\n");
		UltraEdit.activeDocument.write("		else\r\n");
		UltraEdit.activeDocument.write("			"+str_rise+"	<= '0';\r\n");
		UltraEdit.activeDocument.write("		end if;\r\n");
		UltraEdit.activeDocument.write("	end if;\r\n");
		UltraEdit.activeDocument.write("end process;\r\n");
		}
	else if(edge=="f"){
		UltraEdit.activeDocument.write("signal "+str_d+"	: std_logic:='0';\r\n");
		UltraEdit.activeDocument.write("signal "+str_fall+"	: std_logic:='0';\r\n\r\n");
		UltraEdit.activeDocument.write("--"+str+" falling edge\r\n");
		UltraEdit.activeDocument.write("process("+rst+","+clk+")\r\n");
		UltraEdit.activeDocument.write("begin\r\n");
		UltraEdit.activeDocument.write("	if("+rst+"='1')then\r\n");
		UltraEdit.activeDocument.write("		"+str_d+"		<= '0';\r\n");
		UltraEdit.activeDocument.write("		"+str_fall+"	<= '0';\r\n");
		UltraEdit.activeDocument.write("	elsif(rising_edge("+clk+"))then\r\n");
		UltraEdit.activeDocument.write("		"+str_d+"	<= "+str+";\r\n");
		UltraEdit.activeDocument.write("		if("+str_d+"='1' and "+str+"='0')then\r\n");
		UltraEdit.activeDocument.write("			"+str_fall+"	<= '1';\r\n");
		UltraEdit.activeDocument.write("		else\r\n");
		UltraEdit.activeDocument.write("			"+str_fall+"	<= '0';\r\n");
		UltraEdit.activeDocument.write("		end if;\r\n");
		UltraEdit.activeDocument.write("	end if;\r\n");
		UltraEdit.activeDocument.write("end process;\r\n");
		}
	
	
	}

edge_generate();
