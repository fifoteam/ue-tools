#coding=utf-8
import sys
import os

##	-------------------------------------------------------------------------------------
##	输入的是文件的全部路径，比如  f:\led_ctrl\src\led_ctrl.v
##	通过 os path 函数，提取出 文件路径  纯文件名 文件扩展名
##	-------------------------------------------------------------------------------------
verilog_path_name = sys.argv[1]
(verilog_path,verilog_name) = os.path.split(verilog_path_name)
(verilog_name_only,extension) = os.path.splitext(verilog_name)

##	-------------------------------------------------------------------------------------
##	用python改写tcl
##	-------------------------------------------------------------------------------------
with open("c:\\ue\\synplify\\synthesis.tcl","w") as f:
	##	-------------------------------------------------------------------------------------
	##	将windows中的 \  替换为  linux中的/
	##	-------------------------------------------------------------------------------------
	path_list=verilog_path_name.split(os.path.sep)
	path_list="/".join(path_list)

	##	-------------------------------------------------------------------------------------
	##	写入tcl
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
##	用批处理的方式，调用synplify的命令行
##	-------------------------------------------------------------------------------------
os.system("d:\\tools\\Synopsys\\fpga_J-2015.03\\bin\\mbin\\synplify.exe -batch synthesis.tcl")

##	-------------------------------------------------------------------------------------
##	打开synplify综合之后的log日志
##	如果有报警和错误，则将日志提取出来，打印到控制台，方便跳转
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

