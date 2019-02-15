#coding=utf-8
import sys
import os

##	-------------------------------------------------------------------------------------
##	��������ļ���ȫ��·��������  f:\led_ctrl\src\led_ctrl.v
##	ͨ�� os path ��������ȡ�� �ļ�·��  ���ļ��� �ļ���չ��
##	-------------------------------------------------------------------------------------
verilog_path_name = sys.argv[1]
(verilog_path,verilog_name) = os.path.split(verilog_path_name)
(verilog_name_only,extension) = os.path.splitext(verilog_name)

##	-------------------------------------------------------------------------------------
##	��python��дtcl
##	-------------------------------------------------------------------------------------
with open("c:\\ue\\synplify\\synthesis.tcl","w") as f:
	##	-------------------------------------------------------------------------------------
	##	��windows�е� \  �滻Ϊ  linux�е�/
	##	-------------------------------------------------------------------------------------
	path_list=verilog_path_name.split(os.path.sep)
	path_list="/".join(path_list)

	##	-------------------------------------------------------------------------------------
	##	д��tcl
	##	-------------------------------------------------------------------------------------
	f.write("project -new D:/tools/Synopsys/fpga_J-2015.03/bin/mbin/proj_1.prj\r\n")
	f.write("project -save proj_1 c:/ue/synplify/proj_1.prj \r\n")
	f.write("add_file -verilog "+path_list+"\r\n")
	f.write("set_option -grade -2\r\n")
	f.write("set_option -package FGG484\r\n")
	f.write("set_option -enable_nfilter 1\r\n")
	f.write("set_option -top_module "+verilog_name_only+"\r\n")
	f.write("project -save proj_1 c:/ue/synplify/proj_1.prj \r\n")
	f.write("project -run  -bg \r\n")

##	-------------------------------------------------------------------------------------
##	��������ķ�ʽ������synplify��������
##	-------------------------------------------------------------------------------------
os.system("d:\\tools\\Synopsys\\fpga_J-2015.03\\bin\\mbin\\synplify.exe -batch synthesis.tcl")

##	-------------------------------------------------------------------------------------
##	��synplify�ۺ�֮���log��־
##	����б����ʹ�������־��ȡ��������ӡ������̨��������ת
##	-------------------------------------------------------------------------------------
src_path="c:\\ue\\synplify\\rev_2\\proj_1.srr"
if(os.path.isfile(src_path)==True):
	infile	= open(src_path,"r")
	file_content 		= infile.readlines();
	for i in range(0,len(file_content)):
		if (file_content[i][0:3]=="@W:" or file_content[i][0:3]=="@E:"):
			print(""+file_content[i]+"",end='');
	os.system("uedit32.exe c:\\ue\\synplify\\rev_2\\proj_1.srr")
	infile.close();

