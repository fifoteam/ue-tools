#Assemble the Design Source files
read_verilog      F:/linear_lut.v
#read_vhdl [glob ../src/*.vhd]
#read_edif ../netlist/black_blox.edf
read_xdc src/template.xdc



#Run Synthesis and Implementation
synth_design -top linear_lut -part xc7a100tfgg484-2


#Generate Reports
report_utilization -file utilization_summary.rpt
report_timing_summary -file timing_summary.rpt