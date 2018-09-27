
//	//检查文件扩展名是否为v
//	if (UltraEdit.activeDocument.isExt("v")){
//		UltraEdit.outputWindow.write("file ext is v");
//	}
//	else{
//		UltraEdit.outputWindow.write("file ext is not v !!!!!!");
//		return;
//	}

// include subfunction.js

function writeTemplate(){
	//Get user input
	var str = 1;
	var file_name;
	var file_beginner ;
	var file_ext;

	//	UltraEdit.outputWindow.showWindow(true);

	file_name=getFileName();

	//	UltraEdit.outputWindow.write("file_name1 is "+file_name+"");


	//  ===============================================================================================
	//	准备工作，检查文件类型，提取文件名
	//  ===============================================================================================
	//  -------------------------------------------------------------------------------------
	//	检查文件扩展名
	//  -------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isExt("v")) {
		UltraEdit.outputWindow.write("file ext is v");
		file_ext = "v";
	}
	else if (UltraEdit.activeDocument.isExt("ucf")) {
		UltraEdit.outputWindow.write("file ext is ucf");
		file_ext = "ucf";
	}
	else if (UltraEdit.activeDocument.isExt("js")) {
		UltraEdit.outputWindow.write("file ext is javascript");
		file_ext = "js";
	}
	else if (UltraEdit.activeDocument.isExt("c")) {
		UltraEdit.outputWindow.write("file ext is c");
		file_ext = "c";
	}
		else if (UltraEdit.activeDocument.isExt("cpp")) {
		UltraEdit.outputWindow.write("file ext is cpp");
		file_ext = "cpp";
	}
	else if (UltraEdit.activeDocument.isExt("")) {
		UltraEdit.outputWindow.write("file ext is empty");
		file_ext = "";
	}
	else{
		UltraEdit.outputWindow.write("file ext is not v ucf or space");
		return;
	}


	//	UltraEdit.activeDocument.ASCIIToUnicode();



	//  -------------------------------------------------------------------------------------
	//	提取文件名，如果是新建的文件，提示输入文件名
	//  -------------------------------------------------------------------------------------
	if(file_name===""){
		file_name = UltraEdit.getString("Verilog Template Name:",1);
		file_beginner = file_name.toLowerCase();
		file_beginner = file_beginner.substring(0,2);
	}else {
		file_beginner = file_name.toLowerCase();
		file_beginner = file_beginner.substring(0,2);
	}

	//  ===============================================================================================
	//	1.默认是.v文件
	//	2.ucf文件
	//  ===============================================================================================

	//  -------------------------------------------------------------------------------------
	//	.v文件的模板
	//  -------------------------------------------------------------------------------------
	if((file_ext === "v")||(file_ext === "")) {
		//  -------------------------------------------------------------------------------------
		//	1.如果文件名是空，退出
		//	2.如果文件名第一个字母是空格，退出
		//	3.其他情况下，进入程序
		//	4.如果文件名以"tb_"开头，一些语句是不一样的
		//  -------------------------------------------------------------------------------------
		if(file_name === ""){
			UltraEdit.messageBox("No Mudule Name!");
		}
		else if(file_name.charAt(0) === " "){
			UltraEdit.messageBox("No Mudule Name!");
		}

		else{
			//		UltraEdit.activeDocument.write("\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//  -- 版权所有者   : 中国大恒（集团）有限公司北京图像视觉技术分公司, 2010 -2015.\r\n");
			UltraEdit.activeDocument.write("//  -- 保密级别     ：绝密.\r\n");
			UltraEdit.activeDocument.write("//  -- 部门         : 硬件部，FPGA工作组\r\n");
			UltraEdit.activeDocument.write("//  -- 模块名       : "+ file_name +"\r\n");
			UltraEdit.activeDocument.write("//  -- 设计者       : 邢海涛\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//  -- 版本记录 :\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//  -- 作者         :| 修改日期\t\t\t\t:|  修改说明\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//  -- 邢海涛       :| ");
			UltraEdit.activeDocument.timeDate();
			UltraEdit.activeDocument.write("\t:|  初始版本\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//  -- 模块描述     : \r\n");
			UltraEdit.activeDocument.write("//              1)  : ... ...\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//              2)  : ... ...\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//              3)  : ... ...\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//`include			\""+ file_name +"_def.v\"\r\n");
			UltraEdit.activeDocument.write("//仿真单位/精度\r\n");
			UltraEdit.activeDocument.write("`timescale 1ns/1ps\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n\r\n");

			//  -------------------------------------------------------------------------------------
			//	如果是tb，则不需要输入输出端口
			//  -------------------------------------------------------------------------------------
			if(file_beginner == "tb"){

				UltraEdit.activeDocument.write("module "+ file_name +" ();\r\n\r\n");
			}else{
				UltraEdit.activeDocument.write("module "+ file_name +" # (\r\n");
				UltraEdit.activeDocument.write("	parameter	DATA_WIDTH	= 8,\r\n");
				UltraEdit.activeDocument.write("	parameter	TIME_DOMAIN	= \"ASYNC\"\r\n");
				UltraEdit.activeDocument.write(")\r\n");
				UltraEdit.activeDocument.write("(\r\n");
				UltraEdit.activeDocument.write("	input			clk		,\r\n");
				UltraEdit.activeDocument.write("	input			reset	,\r\n\r\n\r\n");
				UltraEdit.activeDocument.write(");\r\n\r\n");
			}

			UltraEdit.activeDocument.write("//	ref signals\r\n\r\n\r\n\r\n");
			UltraEdit.activeDocument.write("//	ref ARCHITECTURE\r\n\r\n\r\n\r\n\r\n\r\n");

			//  -------------------------------------------------------------------------------------
			//	如果是tb，需要写上激励信息
			//  -------------------------------------------------------------------------------------
			if(file_beginner == "tb"){
				UltraEdit.activeDocument.write("initial begin\r\n");
				UltraEdit.activeDocument.write("	 \/\/$display($time, \"Starting the Simulation...\");\r\n");
				UltraEdit.activeDocument.write("	 \/\/$monitor($time, \"count1 is %d,count2 is %b,count3 is %h\",cnt1,cnt2,cnt3);\r\n");
				UltraEdit.activeDocument.write("	 reset = 1'b1;\r\n");
				UltraEdit.activeDocument.write("	 #200\r\n");
				UltraEdit.activeDocument.write("	 reset = 1'b0;\r\n");
				UltraEdit.activeDocument.write("	 #10000\r\n");
				UltraEdit.activeDocument.write("	 $stop;\r\n\r\n");
				UltraEdit.activeDocument.write("end\r\n\r\n");
				UltraEdit.activeDocument.write("always #5 clk = ~clk;\r\n\r\n\r\n");

				UltraEdit.activeDocument.write("\r\n\r\n\r\n");
				UltraEdit.activeDocument.write("\r\n\r\n\r\n");

				UltraEdit.activeDocument.write("\/\/generate vcd file\r\n");
				UltraEdit.activeDocument.write("\/\/initial begin\r\n");
				UltraEdit.activeDocument.write("	 \/\/$dumpfile(\"test.vcd\");\r\n");
				UltraEdit.activeDocument.write("	 \/\/$dumpvars(1,top_frame_buffer_inst);\r\n");
				UltraEdit.activeDocument.write("\/\/end\r\n\r\n");


				UltraEdit.activeDocument.write("\/\/for lattice simulation\r\n");
				UltraEdit.activeDocument.write("\/\/GSR   GSR_INST (.GSR (1'b1)); \/\/< global reset sig>\r\n");
				UltraEdit.activeDocument.write("\/\/PUR   PUR_INST (.PUR (1'b1)); \/\/<powerup reset sig>\r\n\r\n\r\n\r\n");
			}

			UltraEdit.activeDocument.write("endmodule\r\n");
		}
	}

	//  -------------------------------------------------------------------------------------
	//	.ucf文件的模板
	//  -------------------------------------------------------------------------------------
	else if(file_ext === "ucf") {

		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##  -- 版权所有者   : 中国大恒（集团）有限公司北京图像视觉技术分公司, 2010 -2015.\r\n");
		UltraEdit.activeDocument.write("##  -- 保密级别     ：绝密.\r\n");
		UltraEdit.activeDocument.write("##  -- 部门         : 硬件部，FPGA工作组\r\n");
		UltraEdit.activeDocument.write("##  -- 模块名       : "+ file_name +"\r\n");
		UltraEdit.activeDocument.write("##  -- 设计者       : 邢海涛\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##  -- 版本记录 :\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##  -- 作者         :| 修改日期\t\t\t\t:|  修改说明\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##  -- 邢海涛       :| ");
		UltraEdit.activeDocument.timeDate();
		UltraEdit.activeDocument.write("\t:|  初始版本\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##  -- 模块描述     :  "+ file_name +"工程约束文件\r\n");
		UltraEdit.activeDocument.write("##              1)  : ... ...\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##              2)  : ... ...\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##              3)  : ... ...\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##	===============================================================================================\r\n");
		UltraEdit.activeDocument.write("##	ref ***pin location***\r\n");
		UltraEdit.activeDocument.write("##	===============================================================================================\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##	-- ref clk reset\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("#NET \"clk\"		LOC = \"V10\" | IOSTANDARD = \"LVCMOS33\";	#GCLK\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##	-- ref test pin\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("#NET \"led[0]\"	LOC = \"U16\" | IOSTANDARD = \"LVCMOS33\";	#LD0\r\n");
		UltraEdit.activeDocument.write("#NET \"led[1]\"	LOC = \"V16\" | IOSTANDARD = \"LVCMOS33\";	#LD1\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("##	===============================================================================================\r\n");
		UltraEdit.activeDocument.write("##	ref ***timing constraints***\r\n");
		UltraEdit.activeDocument.write("##	===============================================================================================\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##	-- ref clk constraint\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("#NET \"clk\" TNM_NET = \"TNM_clk\";\r\n");
		UltraEdit.activeDocument.write("#TIMESPEC \"TS_clk\" = PERIOD \"TNM_clk\" 40 MHz HIGH 50 %;\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##	-- ref input constraint\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("#INST	\"rgmii_rxd<?>\"		TNM = \"TNM_IN_RGMII\"; \r\n");
		UltraEdit.activeDocument.write("#INST	\"rgmii_rx_ctl\"		TNM = \"TNM_IN_RGMII\";\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("## rgmii_rxc 必须是驱动 rgmii_rxd 和 rgmii_rx_ctl 的时钟，且必须是引脚上的时钟\r\n");
		UltraEdit.activeDocument.write("## 如果驱动时钟下降沿驱动FF，则必须在bufg之后反向，否则约束无法生效\r\n");
		UltraEdit.activeDocument.write("#TIMEGRP \"TNM_IN_RGMII\" OFFSET = IN 2.0 ns VALID 4.0 ns BEFORE \"rgmii_rxc\" \"RISING\";\r\n");
		UltraEdit.activeDocument.write("#TIMEGRP \"TNM_IN_RGMII\" OFFSET = IN 2.0 ns VALID 4.0 ns BEFORE \"rgmii_rxc\" \"FALLING\";\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##	-- ref MultiPath constraint\r\n");
		UltraEdit.activeDocument.write("##	-------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("#NET \"clk_rst_top_inst/w_reset_loc_pll\"	TIG;\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("#NET \"mcb_drp_clk\" TNM_NET = \"TNM_drp\";\r\n");
		UltraEdit.activeDocument.write("#NET \"w_pix_clk\" TNM_NET = \"TNM_pix\";\r\n");
		UltraEdit.activeDocument.write("#TIMESPEC \"TS_multipath1\" = FROM \"TNM_drp\" TO \"TNM_pix\" 10 ns DATAPATHONLY;\r\n");
		UltraEdit.activeDocument.write("#TIMESPEC \"TS_multipath2\" = FROM \"TNM_pix\" TO \"TNM_drp\" 10 ns DATAPATHONLY;\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("\r\n");
	}

	//  -------------------------------------------------------------------------------------
	//	.js文件的模板
	//  -------------------------------------------------------------------------------------
	else if(file_ext === "js") {
		UltraEdit.activeDocument.write("\r\n\r\n");
		UltraEdit.activeDocument.write("\/\/ include subfunction.js");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("function "+file_name+"(){");
		UltraEdit.activeDocument.write("\r\n\r\n\r\n\r\n");
		UltraEdit.activeDocument.write("}");
		UltraEdit.activeDocument.write("\r\n\r\n");
		UltraEdit.activeDocument.write(""+file_name+"();");
		UltraEdit.activeDocument.write("\r\n");
	}

	//  -------------------------------------------------------------------------------------
	//	.c文件的模板
	//  -------------------------------------------------------------------------------------
	else if((file_ext === "c")||(file_ext === "cpp")) {
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//  -- 版权所有者   : 中国大恒（集团）有限公司北京图像视觉技术分公司, 2010 -2015.\r\n");
		UltraEdit.activeDocument.write("//  -- 保密级别     ：绝密.\r\n");
		UltraEdit.activeDocument.write("//  -- 部门         : 硬件部，FPGA工作组\r\n");
		UltraEdit.activeDocument.write("//  -- 模块名       : "+ file_name +"\r\n");
		UltraEdit.activeDocument.write("//  -- 设计者       : 邢海涛\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//  -- 版本记录 :\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//  -- 作者         :| 修改日期\t\t\t\t:|  修改说明\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//  -- 邢海涛       :| ");
		UltraEdit.activeDocument.timeDate();
		UltraEdit.activeDocument.write("\t:|  初始版本\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//  -- 模块描述     : \r\n");
		UltraEdit.activeDocument.write("//              1)  : ... ...\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//              2)  : ... ...\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//              3)  : ... ...\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("\r\n");
		UltraEdit.activeDocument.write("#include <stdio.h>\r\n");
		UltraEdit.activeDocument.write("\r\n\r\n");
		UltraEdit.activeDocument.write("int main(int argc, char *argv[]) {\r\n");
		UltraEdit.activeDocument.write("	printf(\"hello word!\\r\\n\");\r\n");
		UltraEdit.activeDocument.write("	getchar();\r\n");
		UltraEdit.activeDocument.write("	return 0;\r\n");
		UltraEdit.activeDocument.write("}\r\n");
		UltraEdit.activeDocument.write("\r\n\r\n");
	}

	//  -------------------------------------------------------------------------------------
	//	不认识的文件类型
	//  -------------------------------------------------------------------------------------
	else {
		UltraEdit.outputWindow.write("file ext is not v ucf or space or js");
	}

}

writeTemplate();

