
//	//����ļ���չ���Ƿ�Ϊv
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
	//	׼������������ļ����ͣ���ȡ�ļ���
	//  ===============================================================================================
	//  -------------------------------------------------------------------------------------
	//	����ļ���չ��
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
	//	��ȡ�ļ�����������½����ļ�����ʾ�����ļ���
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
	//	1.Ĭ����.v�ļ�
	//	2.ucf�ļ�
	//  ===============================================================================================

	//  -------------------------------------------------------------------------------------
	//	.v�ļ���ģ��
	//  -------------------------------------------------------------------------------------
	if((file_ext === "v")||(file_ext === "")) {
		//  -------------------------------------------------------------------------------------
		//	1.����ļ����ǿգ��˳�
		//	2.����ļ�����һ����ĸ�ǿո��˳�
		//	3.��������£��������
		//	4.����ļ�����"tb_"��ͷ��һЩ����ǲ�һ����
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
			UltraEdit.activeDocument.write("//  -- ��Ȩ������   : �й���㣨���ţ����޹�˾����ͼ���Ӿ������ֹ�˾, 2010 -2015.\r\n");
			UltraEdit.activeDocument.write("//  -- ���ܼ���     ������.\r\n");
			UltraEdit.activeDocument.write("//  -- ����         : Ӳ������FPGA������\r\n");
			UltraEdit.activeDocument.write("//  -- ģ����       : "+ file_name +"\r\n");
			UltraEdit.activeDocument.write("//  -- �����       : �Ϻ���\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//  -- �汾��¼ :\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//  -- ����         :| �޸�����\t\t\t\t:|  �޸�˵��\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//  -- �Ϻ���       :| ");
			UltraEdit.activeDocument.timeDate();
			UltraEdit.activeDocument.write("\t:|  ��ʼ�汾\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//  -- ģ������     : \r\n");
			UltraEdit.activeDocument.write("//              1)  : ... ...\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//              2)  : ... ...\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//              3)  : ... ...\r\n");
			UltraEdit.activeDocument.write("//\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
			UltraEdit.activeDocument.write("//`include			\""+ file_name +"_def.v\"\r\n");
			UltraEdit.activeDocument.write("//���浥λ/����\r\n");
			UltraEdit.activeDocument.write("`timescale 1ns/1ps\r\n");
			UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n\r\n");

			//  -------------------------------------------------------------------------------------
			//	�����tb������Ҫ��������˿�
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
			//	�����tb����Ҫд�ϼ�����Ϣ
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
	//	.ucf�ļ���ģ��
	//  -------------------------------------------------------------------------------------
	else if(file_ext === "ucf") {

		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##  -- ��Ȩ������   : �й���㣨���ţ����޹�˾����ͼ���Ӿ������ֹ�˾, 2010 -2015.\r\n");
		UltraEdit.activeDocument.write("##  -- ���ܼ���     ������.\r\n");
		UltraEdit.activeDocument.write("##  -- ����         : Ӳ������FPGA������\r\n");
		UltraEdit.activeDocument.write("##  -- ģ����       : "+ file_name +"\r\n");
		UltraEdit.activeDocument.write("##  -- �����       : �Ϻ���\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##  -- �汾��¼ :\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##  -- ����         :| �޸�����\t\t\t\t:|  �޸�˵��\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##  -- �Ϻ���       :| ");
		UltraEdit.activeDocument.timeDate();
		UltraEdit.activeDocument.write("\t:|  ��ʼ�汾\r\n");
		UltraEdit.activeDocument.write("##-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("##\r\n");
		UltraEdit.activeDocument.write("##  -- ģ������     :  "+ file_name +"����Լ���ļ�\r\n");
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
		UltraEdit.activeDocument.write("## rgmii_rxc ���������� rgmii_rxd �� rgmii_rx_ctl ��ʱ�ӣ��ұ����������ϵ�ʱ��\r\n");
		UltraEdit.activeDocument.write("## �������ʱ���½�������FF���������bufg֮���򣬷���Լ���޷���Ч\r\n");
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
	//	.js�ļ���ģ��
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
	//	.c�ļ���ģ��
	//  -------------------------------------------------------------------------------------
	else if((file_ext === "c")||(file_ext === "cpp")) {
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//  -- ��Ȩ������   : �й���㣨���ţ����޹�˾����ͼ���Ӿ������ֹ�˾, 2010 -2015.\r\n");
		UltraEdit.activeDocument.write("//  -- ���ܼ���     ������.\r\n");
		UltraEdit.activeDocument.write("//  -- ����         : Ӳ������FPGA������\r\n");
		UltraEdit.activeDocument.write("//  -- ģ����       : "+ file_name +"\r\n");
		UltraEdit.activeDocument.write("//  -- �����       : �Ϻ���\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//  -- �汾��¼ :\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//  -- ����         :| �޸�����\t\t\t\t:|  �޸�˵��\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//  -- �Ϻ���       :| ");
		UltraEdit.activeDocument.timeDate();
		UltraEdit.activeDocument.write("\t:|  ��ʼ�汾\r\n");
		UltraEdit.activeDocument.write("//-------------------------------------------------------------------------------------------------\r\n");
		UltraEdit.activeDocument.write("//\r\n");
		UltraEdit.activeDocument.write("//  -- ģ������     : \r\n");
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
	//	����ʶ���ļ�����
	//  -------------------------------------------------------------------------------------
	else {
		UltraEdit.outputWindow.write("file ext is not v ucf or space or js");
	}

}

writeTemplate();

