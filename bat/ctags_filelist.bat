
::echo off
::echo %1
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
::echo %cd%

::����Դ�ļ�����Ŀ¼��������Ŀ¼
cd ../../
::echo %cd%

"d:\Tools\UltraEdit\GNU\ctags.exe" -f c:\ue\tags.lst -R %cd% --langmap=Verilog:.v --sort=no --regex-Verilog=/`define\s\+\(\w\+\)/\1/c/ --regex-Verilog=/(\w+_inst)\s/\1/i/ --regex-Verilog=/(\w+_inst[0-9]+)\s/\1/i/

::pause