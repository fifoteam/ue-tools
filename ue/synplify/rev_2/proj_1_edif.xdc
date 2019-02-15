
# 1001 : define_clock [get_ports {clk}] -name {filter|clk} -ref_rise {0.0} -ref_fall {1.492150} -uncertainty {0.000000} -period {2.984300} -clockgroup {default_clkgroup} -rise {0.0} -fall {1.492150} 

create_clock  -name {filter|clk} [get_ports {clk}]  -period {2.984} -waveform {0.000 1.492}


# 1002 : set_clock_groups -name {Autoconstr_clkgroup_0} -derive -asynchronous -group [get_clocks {filter|clk}] 

set_clock_groups -name {Autoconstr_clkgroup_0} -asynchronous -group  [get_clocks {filter|clk}]


#Constraints which are not forward annotated in XDC and intentionally commented out (unused and unsupported constraints)

#User specified region constraints
