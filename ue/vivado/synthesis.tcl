read_verilog  F:/DAHENG/hw_mars/trunk/fpga_prj/mars-1230-23u3x/src/io_channel/trigger_delay.v
read_xdc src/template.xdc 
synth_design -top trigger_delay -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
