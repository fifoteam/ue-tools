project -new D:/tools/Synopsys/fpga_J-2015.03/bin/mbin/proj_1.prj
project -save proj_1 F:/test/proj_1.prj
add_file -verilog ./frame_info_analysis.v
set_option -grade -2
set_option -package FGG484
set_option -enable_nfilter 1
set_option -top_module frame_info_analysis
project -save F:/test/proj_1.prj
project -run  -bg