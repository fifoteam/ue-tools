
# 1001 : define_clock [get_ports {clk}] -name {frame_info_analysis|clk} -ref_rise {0.0} -ref_fall {1.043000} -uncertainty {0.000000} -period {2.086000} -clockgroup {default_clkgroup} -rise {0.0} -fall {1.043000} 

create_clock  -name {frame_info_analysis|clk} [get_ports {clk}]  -period {2.086} -waveform {0.000 1.043}


# 1002 : set_clock_groups -name {Autoconstr_clkgroup_0} -derive -asynchronous -group [get_clocks {frame_info_analysis|clk}] 

set_clock_groups -name {Autoconstr_clkgroup_0} -asynchronous -group  [get_clocks {frame_info_analysis|clk}]


#Constraints which are not forward annotated in XDC and intentionally commented out (unused and unsupported constraints)

#User specified region constraints
