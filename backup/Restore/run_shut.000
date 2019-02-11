
@ echo off
::关机流程


echo "daily plan"
call f:\kuaipan\kuaipan\FifoTeam\bat-tools\daily_plan\xht_plan_sum.bat

echo "task_kill"
call f:\kuaipan\kuaipan\FifoTeam\bat-tools\boot\task_kill.bat

echo "zme"
call f:\kuaipan\kuaipan\FifoTeam\bat-tools\boot\back_up_zme.bat

echo "fifoteam"
call f:\kuaipan\kuaipan\FifoTeam\bat-tools\boot\back_up_fifoteam.bat

rem echo "nutstore"
rem @ start	"" "D:\Program Files\Nutstore\Nutstore.exe"

echo "weiyunsync"
@ start	"" "D:\Program Files (x86)\Tencent\WeiyunSync\WeiyunSync\Bin\weiyunsync.exe"

rem 延时5分钟关机，用于同步数据
shutdown -s -t 300

::pause

