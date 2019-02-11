import sys
import os


verilog_path_name = sys.argv[1]
(verilog_path,verilog_name) = os.path.split(verilog_path_name)
(verilog_name_only,extension) = os.path.splitext(verilog_name)
with open("c:\\ue\\vivado\\synthesis.tcl","w") as f:
	path_list=verilog_path_name.split(os.path.sep)
	path_list="/".join(path_list)
	f.write("read_verilog  "+path_list+"\r\n")
	f.write("read_xdc src/template.xdc \r\n")
	f.write("synth_design -top "+verilog_name_only+" -part xc7a100tfgg484-2 \r\n")
	f.write("report_utilization -file utilization_summary.rpt \r\n")
	f.write("report_timing_summary -file timing_summary.rpt \r\n")
os.system("c:\\ue\\vivado\\synthesis.bat ")

os.system("uedit32.exe c:\\ue\\vivado\\timing_summary.rpt ")
os.system("uedit32.exe c:\\ue\\vivado\\utilization_summary.rpt ")


