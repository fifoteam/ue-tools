read_verilog  F:/DAHENG/hw_mars/mars_platform/TD/Development_Phase/003_develop_phase/fpga_platform/ver10/src/frame_buffer/fb_write/fb_write.v
read_xdc src/template.xdc 
synth_design -top fb_write -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
