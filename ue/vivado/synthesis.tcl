read_verilog  F:/DAHENG/hw_mars/mars_platform/TD/Development_Phase/003_develop_phase/fpga_platform/ver10/src/gige_vision/gvsp_tx/ip_udp_gvsp_format.v
read_xdc src/template.xdc 
synth_design -top ip_udp_gvsp_format -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
