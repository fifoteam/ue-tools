
::echo off
::echo %1
:: 路径 文件名 扩展名
::if exist "%1.v" (
::	echo find
::	%1.v
::)
::else(
::cd /d %2
::)

::进入源文件所在目录查找
cd /d %1
::echo %cd%

::进入源文件所在目录的上两级目录
cd ../../
::echo %cd%

"d:\Tools\UltraEdit\GNU\ctags.exe" -f c:\ue\tags.lst -R %cd% --langmap=Verilog:.v --sort=no --regex-Verilog=/`define\s\+\(\w\+\)/\1/c/ --regex-Verilog=/(\w+_inst)\s/\1/i/ --regex-Verilog=/(\w+_inst[0-9]+)\s/\1/i/

::pause