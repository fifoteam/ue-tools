
echo off
echo %1 %2 %3
:: ·�� �ļ��� ��չ��
::if exist "%1.v" (
::	echo find
::	%1.v
::)
::else(
::cd /d %2
::)

::����Դ�ļ�����Ŀ¼����
cd /d %1
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::����һ��Ŀ¼�в���
cd /d %1
cd ..
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::����srcĿ¼����
cd /d %1
cd ../src
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::����srcĿ¼����
cd /d %1
cd ../../src
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"


::����testbenchĿ¼����
cd /d %1
cd ../testbench
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::����testbenchĿ¼����
cd /d %1
cd ../../testbench
echo %cd%
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"


::unisims Ŀ¼����
D:
cd D:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\unisims\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::simprims Ŀ¼����
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\simprims\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::XilinxCoreLib Ŀ¼����
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\XilinxCoreLib\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::uni9000 Ŀ¼����
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\uni9000\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::unimacro Ŀ¼����
cd d:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src\unimacro\
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

::ISE\verilog\src Ŀ¼����
cd D:\Tools\Xilinx\14.7\ISE_DS\ISE\verilog\src
for /f "delims=" %%i in ('dir %2%3 /b /s') do start "" "%%i"

rempause