read_verilog  F:/kuaipan/kuaipan/FifoTeam/rtl-tools/module/006_serial_protocol/mdio/testbench/driver/mdio_master/mdio_master.v
read_xdc src/template.xdc 
synth_design -top mdio_master -part xc7a100tfgg484-2 
report_utilization -file utilization_summary.rpt 
report_timing_summary -file timing_summary.rpt 
