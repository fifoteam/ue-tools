read_verilog  f:/DAHENG/hw_mars/mars_platform/TD/Development_Phase/003_develop_phase/fpga_platform/ver10/src/gige_vision/gvsp_tx/gvsp_ctrl_core.v
read_xdc src/template.xdc 
synth_design -top gvsp_ctrl_core -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
