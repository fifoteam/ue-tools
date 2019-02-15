project -new D:/tools/Synopsys/fpga_J-2015.03/bin/mbin/proj_1.prj
project -save proj_1 c:/ue/synplify/proj_1.prj 
add_file -verilog f:/DAHENG/hw_mer/branches/u3v_temp/fpga_module/3_io_channel/common/filter/src/filter.v
set_option -grade -2
set_option -package FGG484
set_option -enable_nfilter 1
set_option -top_module filter
project -save proj_1 c:/ue/synplify/proj_1.prj 
project -run  -bg 
