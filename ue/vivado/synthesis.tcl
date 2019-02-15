read_verilog  f:/DAHENG/hw_mer/branches/u3v_temp/fpga_module/3_io_channel/common/filter/src/filter.v
read_xdc src/template.xdc 
synth_design -top filter -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
