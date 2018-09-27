
function writeTemplate(){
	//Get user input
	var str = 1;
	var str1 = 1;
	
	str = UltraEdit.getString("Template Name:",1);

	if(str === ""){
		UltraEdit.messageBox("No Entity Name!");
	}
	else if(str.charAt(0) === " "){
		UltraEdit.messageBox("No Entity Name!");
	}
	else{
		str1=str.substring(0,3);
		str1=str1.toLowerCase();
		UltraEdit.activeDocument.write("--------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("-- Copyright (c) VORX, Inc.  All rights reserved.\r\n");
		UltraEdit.activeDocument.write("--------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("--------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("-- Author		- XingHaitao\r\n");
		UltraEdit.activeDocument.write("-- Creat time	- ");
		UltraEdit.activeDocument.timeDate();
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("-- Module		- "+ str +"\r\n");
		UltraEdit.activeDocument.write("-- Version		- 1.0\r\n");
		UltraEdit.activeDocument.write("--------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("-- Module Description:\r\n");
		UltraEdit.activeDocument.write("-- \r\n");
		UltraEdit.activeDocument.write("--------------------------------------------------------------------------------\r\n\r\n");
		UltraEdit.activeDocument.write("LIBRARY ieee;\r\n");
		UltraEdit.activeDocument.write("USE ieee.std_logic_1164.all;\r\n");
		UltraEdit.activeDocument.write("USE ieee.std_logic_arith.all;\r\n");
		UltraEdit.activeDocument.write("USE ieee.std_logic_unsigned.ALL;\r\n");
		UltraEdit.activeDocument.write("--library UNISIM;\r\n");
		UltraEdit.activeDocument.write("--use UNISIM.Vcomponents.ALL;\r\n\r\n");
		UltraEdit.activeDocument.write("ENTITY "+ str +" IS\r\n");
		if(str1!=="tb_"){
			UltraEdit.activeDocument.write("GENERIC(\r\n\r\n");
			UltraEdit.activeDocument.write(");\r\n");
			UltraEdit.activeDocument.write("PORT(\r\n");
			UltraEdit.activeDocument.write("rst					: in	std_logic;\r\n");
			UltraEdit.activeDocument.write("clk					: in	std_logic;\r\n\r\n");
			UltraEdit.activeDocument.write(");\r\n");
		}
		UltraEdit.activeDocument.write("END "+ str +";\r\n\r\n");
		UltraEdit.activeDocument.write("ARCHITECTURE arc OF "+ str +" IS\r\n\r\n\r\n");
		UltraEdit.activeDocument.write("--ref components\r\n\r\n\r\n");
		UltraEdit.activeDocument.write("--ref signals\r\n");
		UltraEdit.activeDocument.write("BEGIN\r\n");
		UltraEdit.activeDocument.write("\r\n\r\n\r\n\r\n\r\n");
		UltraEdit.activeDocument.write("END arc;\r\n");
	}

}

writeTemplate();







