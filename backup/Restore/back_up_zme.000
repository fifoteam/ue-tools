
echo off
::xcopy  /e  复制目录和子目录
::xcopy  /h  也复制隐藏文件和系统文件
::xcopy  /y  取消提示已确认覆盖现有文件

::rd	/S	删除目录树时不要求确认
::rd	/Q	安静模式
::RD /S /Q \?%1  删除任意文件夹

::保存 ue 配置
@ xcopy "c:\Users\xht\AppData\Roaming\IDMComp\UltraEdit\*.*" "f:\kuaipan\kuaipan\FifoTeam\ue-tools\backup" /e/h/y >nul
@ xcopy "C:\ue" "f:\kuaipan\kuaipan\FifoTeam\ue-tools\ue" /e/h/y >nul


echo "UE backup done!"

::保存 alt_r 配置
@ xcopy "D:\Tools\ALTRun V1.46\*.*" "F:\kuaipan\kuaipan\Michael\backup\alt_r" /e/h/y >nul
echo "alt_r back done!"


::保存 tc 配置
@ xcopy "d:\Tools\totalcmd\*.*" "F:\kuaipan\kuaipan\Michael\backup\totalcmd" /e/h/y >nul
echo "tc back done!"

::保存 everything 配置
::@ xcopy "C:\Users\xht\AppData\Roaming\Everything\Everything.ini" "F:\kuaipan\kuaipan\Michael\backup\everything" /e/h/y >nul
::echo "everything back done!"


::保存 modelsim 配置
@ xcopy "d:\Tools\modeltech64_10.5\modelsim.ini" "f:\kuaipan\kuaipan\FifoTeam\sim-tools\modelsim\ini" /y >nul
echo "modelsim ini back done!"

::保存 crack 文件
@ xcopy "D:\Tools\Crack" "F:\kuaipan\kuaipan\Michael\backup\Crack\" /e/h/y >nul
echo "crack back done!"

::保存 shadowsocks 文件
@ xcopy "D:\Tools\xht_tools\Shadowsocks-2.5.8" "F:\kuaipan\kuaipan\TOOLS\aws\shadowsocks" /e/h/y >nul
echo "shadowsocks back done!"

::保存 dexpot 配置
@ xcopy "D:\Tools\xht_tools\dexpot_1610_portable_r2373\profile\*.*" "F:\kuaipan\kuaipan\Michael\backup\dexpot" /e/h/y >nul


::保存 calendar 配置
@ xcopy "D:\prog_data\thunderbird_data\calendar\*.*" "F:\kuaipan\kuaipan\Michael\backup\thunderbird\calendar" /e/h/y >nul
echo "calendar back done!"

::保存 signature 配置
@ xcopy "D:\prog_data\thunderbird_data\xinght@daheng-imaging.com\signature2\*.*" "F:\kuaipan\kuaipan\Michael\backup\thunderbird\signature2" /e/h/y >nul
echo "signature back done!"






echo "crack dexpot done!"

::删除 ue 配置中的重复文件
@ cd	f:\kuaipan\kuaipan\FifoTeam\ue-tools\backup >nul
@ del *Saved*.* >nul
echo "UE Saved* del done!"

@ cd	f:\kuaipan\kuaipan\FifoTeam\ue-tools\ue >nul
@ rd work /S/Q >nul
echo "UE work del done!"

@ cd	f:\kuaipan\kuaipan\FifoTeam\ue-tools\ue\gcc_work >nul
@ del *.o >nul
@ del *.exe >nul
echo "UE gcc_work del done!"

@ cd	f:\kuaipan\kuaipan\FifoTeam\ue-tools\ue\vivado >nul
@ rd .Xil /S/Q >nul
@ del *.jou >nul
@ del *.log >nul
@ del *.rpt >nul
echo "UE work vivado del done!"

@ cd	f:\kuaipan\kuaipan\FifoTeam\ue-tools\ue\synplify >nul
@ rd rev_1 /S/Q >nul
@ rd rev_2 /S/Q >nul
@ rd rev_3 /S/Q >nul
@ rd rev_4 /S/Q >nul
@ rd rev_5 /S/Q >nul
@ rd rev_6 /S/Q >nul
@ del *.log >nul
@ del *.prj >nul
echo "UE work synplify del done!"





::配置文件上传到SVN-fifoteam
@ cd f:\kuaipan\kuaipan\FifoTeam\ue-tools >nul
git add *
git commit -a -m "AUTO SAVED BY BAT FILE"
git push -u origin master

::配置文件上传到SVN-fifoteam
@ cd f:\kuaipan\kuaipan\FifoTeam\sim-tools\modelsim >nul
git add *
git commit -a -m "AUTO SAVED BY BAT FILE"
git push -u origin master

::配置文件上传到SVN-Michael
@ cd F:\kuaipan\kuaipan\Michael\backup >nul
git add *
git commit -a -m "AUTO SAVED BY BAT FILE"
git push -u origin master


echo "git add & commit done!"
echo "please export strokeit config"

@ping 127.0.0.1 -n 2 >nul
echo "5"
@ping 127.0.0.1 -n 2 >nul
echo "4"
@ping 127.0.0.1 -n 2 >nul
echo "3"
@ping 127.0.0.1 -n 2 >nul
echo "2"
@ping 127.0.0.1 -n 2 >nul
echo "1"
@ping 127.0.0.1 -n 2 >nul
echo "0"
