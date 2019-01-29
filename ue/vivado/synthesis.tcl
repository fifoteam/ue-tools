#Assemble the Design Source files
read_verilog      F:/DAHENG/hw_mars/mars_platform/TD/Development_Phase/003_develop_phase/fpga_platform/ver10/src/gige_vision/gvsp_tx/packet_image.v
#read_vhdl [glob ../src/*.vhd]
#read_edif ../netlist/black_blox.edf
read_xdc src/template.xdc



#Run Synthesis and Implementation
synth_design -top packet_image -part xc7a100tfgg484-2


#Generate Reports
report_utilization -file utilization_summary.rpt
report_timing_summary -file timing_summary.rpt