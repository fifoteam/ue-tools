
# 1001 : define_clock [get_ports {clk}] -name {trigger_active|clk} -ref_rise {0.0} -ref_fall {0.377700} -uncertainty {0.000000} -period {0.755400} -clockgroup {default_clkgroup} -rise {0.0} -fall {0.377700} 

create_clock  -name {trigger_active|clk} [get_ports {clk}]  -period {0.755} -waveform {0.000 0.378}


# 1002 : set_clock_groups -name {Autoconstr_clkgroup_0} -derive -asynchronous -group [get_clocks {trigger_active|clk}] 

set_clock_groups -name {Autoconstr_clkgroup_0} -asynchronous -group  [get_clocks {trigger_active|clk}]


#Constraints which are not forward annotated in XDC and intentionally commented out (unused and unsupported constraints)

#User specified region constraints
