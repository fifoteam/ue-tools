
echo off
echo %1 %2 %3
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
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::在上一级目录中查找
cd /d %1
cd ..
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::进入src目录查找
cd /d %1
cd ../src
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::进入src目录查找
cd /d %1
cd ../../src
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"


::进入testbench目录查找
cd /d %1
cd ../testbench
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::进入testbench目录查找
cd /d %1
cd ../../testbench
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"


::unisims 目录查找
D:
cd D:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\unisims\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::simprims 目录查找
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\simprims\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::XilinxCoreLib 目录查找
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\XilinxCoreLib\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::uni9000 目录查找
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\uni9000\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::unimacro 目录查找
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\unimacro\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::ISE\verilog\src 目录查找
cd D:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

rempause