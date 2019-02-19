project -new D:/tools/Synopsys/fpga_J-2015.03/bin/mbin/proj_1.prj
add_file -verilog F:/DAHENG/hw_mars/mars_platform/TD/Development_Phase/003_develop_phase/fpga_platform/ver10/src/frame_buffer/fb_read/fb_read_init.v
set_option -part XC7A100T
set_option -grade -2
set_option -package FGG484
set_option -enable_nfilter 1
project -log_file c:/ue/synplify/rev_2/proj_1.srr
set_option -top_module fb_read_init
project -save proj_1 c:/ue/synplify/proj_1.prj 
project -run  -bg 
