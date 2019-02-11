read_verilog  F:/DAHENG/hw_mer/trunk/fpga_prj/mer-630-60u3x/src/data_channel/sonyimx_if/word_aligner.v
read_xdc src/template.xdc 
synth_design -top word_aligner -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
