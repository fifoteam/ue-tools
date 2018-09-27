

	UltraEdit.activeDocument.write("attribute BUFFER_TYPE : string;\r\n");
	UltraEdit.activeDocument.write("attribute BUFFER_TYPE of <signal_name>: signal is \"NONE\";\r\n");
	UltraEdit.activeDocument.write("\r\n");
	UltraEdit.activeDocument.write("inst_bufg : BUFG\r\n");
	UltraEdit.activeDocument.write("port map (\r\n");
	UltraEdit.activeDocument.write("	O => O,\r\n");
	UltraEdit.activeDocument.write("	I => I\r\n");
	UltraEdit.activeDocument.write(");\r\n");
	UltraEdit.activeDocument.write("\r\n");
	UltraEdit.activeDocument.write("inst_ibufg : IBUFG\r\n");
	UltraEdit.activeDocument.write("generic map (\r\n");
	UltraEdit.activeDocument.write("	IBUF_LOW_PWR => TRUE, -- Low power (TRUE) vs. performance (FALSE) setting for referenced I/O standards\r\n");
	UltraEdit.activeDocument.write("	IOSTANDARD => \"DEFAULT\")\r\n");
	UltraEdit.activeDocument.write("port map (\r\n");
	UltraEdit.activeDocument.write("	O => O, -- Clock buffer output\r\n");
	UltraEdit.activeDocument.write("	I => I  -- Clock buffer input (connect directly to top-level port)\r\n");
	UltraEdit.activeDocument.write(");\r\n");
	UltraEdit.activeDocument.write("\r\n");
	UltraEdit.activeDocument.write("inst_ibufgds : IBUFGDS\r\n");
	UltraEdit.activeDocument.write("	IBUF_LOW_PWR => TRUE, -- Low power (TRUE) vs. performance (FALSE) setting for referenced I/O standards\r\n");
	UltraEdit.activeDocument.write("	IOSTANDARD => \"DEFAULT\")\r\n");
	UltraEdit.activeDocument.write("port map (\r\n");
	UltraEdit.activeDocument.write("	O => O,  -- Clock buffer output\r\n");
	UltraEdit.activeDocument.write("	I => I,  -- Diff_p clock buffer input\r\n");
	UltraEdit.activeDocument.write("	IB => IB -- Diff_n clock buffer input\r\n");
	UltraEdit.activeDocument.write(");\r\n");
	UltraEdit.activeDocument.write("\r\n");
