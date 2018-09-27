
// include subfunction.js

function UCFcorrect(){

	var TotalLine = 1;
	var CurrentLine = 0;
	var str;
	var i = 0;
	var j = 0;
	var NetName = new Array();
	var NetLocNew = new Array();
	var NetLocOld = new Array();
	var CorrectName = new Array();
	var NotCorrectName = new Array();
	var NotFindName = new Array();
	var f_array = new Array();

	var	correct_cnt;
	var	not_correct_cnt;
	var	not_find_cnt;

	var	filePath;
	var find_keyword;
	
	var pin_compare_result_file;
	var ucf_in_prj;
	

	UltraEdit.outputWindow.showWindow(true);
	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
	UltraEdit.activeDocument.top();
	pin_compare_result_file = UltraEdit.activeDocument.path;

	//  ===============================================================================================
	//	提取pin.txt中不同的pin的引脚位置，默认是第一列是引脚名 第二列是新的引脚位置，第三列是旧的引脚位置
	//  ===============================================================================================
	find_keyword=0;
	//  -------------------------------------------------------------------------------------
	//	找CHANGE关键字
	//  -------------------------------------------------------------------------------------
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=RightTrimSpace(str);
		str=LeftTrimSpace(str);
		if(str=="*CHANGE*\r\n"){
			UltraEdit.outputWindow.write("Find CHANGE key word");
			UltraEdit.outputWindow.write("line num is "+CurrentLine+"");
			find_keyword=1;
			break;
		}
	}

	//  -------------------------------------------------------------------------------------
	//	如果没有找到CHARGE关键字，退出
	//  -------------------------------------------------------------------------------------
	if(find_keyword===0){
		UltraEdit.outputWindow.write("Not Find CHANGE key word");
		return;
	}

	//  -------------------------------------------------------------------------------------
	//	获取改变后的引脚名和引脚位置
	//  -------------------------------------------------------------------------------------
	i=0;
	for(;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=RightTrimSpace(str);
		str=LeftTrimSpace(str);
		if(str.indexOf("#")!=-1){
			str=str.replace(/\t/g," ");
			//UltraEdit.outputWindow.write("str is "+str+"");
			f_array=str.split(":");
			NetName[i]=f_array[0];
			NetLocNew[i]=f_array[1];
			NetLocOld[i]=f_array[2];

			NetName[i]=RightTrimSpace(NetName[i]);
			NetName[i]=LeftTrimSpace(NetName[i]);

			NetLocNew[i]=RightTrimSpace(NetLocNew[i]);
			NetLocNew[i]=LeftTrimSpace(NetLocNew[i]);

			//去掉NetLocOld结尾处的回车符
			if(NetLocOld[i].indexOf("\r\n")!=-1)	NetLocOld[i]=NetLocOld[i].substring(0,NetLocOld[i].indexOf("\r\n"));	//去除行尾回车符
			if(NetLocOld[i].indexOf("\n")!=-1)	NetLocOld[i]=NetLocOld[i].substring(0,NetLocOld[i].indexOf("\n"));		//去除行尾回车符
			if(NetLocOld[i].indexOf(";")!=-1)	NetLocOld[i]=NetLocOld[i].substring(0,NetLocOld[i].indexOf("\n"));		//去除行尾回车符
			NetLocOld[i]=RightTrimSpace(NetLocOld[i]);
			NetLocOld[i]=LeftTrimSpace(NetLocOld[i]);
			i++;
		}
	}

//	//+test+
//	for(i=0;i<NetName.length;i++){
//		UltraEdit.outputWindow.write("NetName"+i+" is "+NetName[i]+"");
//		UltraEdit.outputWindow.write("NetLocNew"+i+" is "+NetLocNew[i]+"");
//		UltraEdit.outputWindow.write("NetLocOld"+i+" is "+NetLocOld[i]+"");
//	}
//	//-test-

	//  ===============================================================================================
	//	打开工程的UCF文件，比较引脚名和引脚位置
	//  ===============================================================================================
	filePath = UltraEdit.clipboardContent;
	UltraEdit.open(""+filePath+"");
	ucf_in_prj = UltraEdit.activeDocument.path;
	
	UltraEdit.activeDocument.findReplace.matchCase=false;
	UltraEdit.activeDocument.findReplace.matchWord=true;
	
	correct_cnt=0;
	not_correct_cnt=0;
	not_find_cnt=0;
	//  -------------------------------------------------------------------------------------
	//	针对源文件中的引脚名，在目的文件中逐一查找
	//  -------------------------------------------------------------------------------------
	for(i=0;i<NetName.length;i++){
		UltraEdit.activeDocument.top();
		UltraEdit.activeDocument.findReplace.find(""+NetName[i]+"");
		//  -------------------------------------------------------------------------------------
		//	工程ucf中，含有netname
		//  -------------------------------------------------------------------------------------
		if (UltraEdit.activeDocument.isFound()) {
			//			UltraEdit.outputWindow.write("have found signal");
			CurrentLine = UltraEdit.activeDocument.currentLineNum;
			str=StringCopy(CurrentLine);
			if(str.indexOf(";	"+NetName[i]+"")!=-1){
				if (str.indexOf("LOC = "+NetLocOld[i]+"")!=-1) {
					UltraEdit.activeDocument.findReplace.replace("LOC = "+NetLocOld[i]+"", "LOC = "+NetLocNew[i]+"");
					CorrectName[correct_cnt]=NetName[i];
					correct_cnt++;
				}
				else {
					NotCorrectName[not_correct_cnt]=NetName[i];
					not_correct_cnt++;
				}
			}
		}
		else {
			NotFindName[not_find_cnt]=NetName[i];
			not_find_cnt++;
		}
	}

	UltraEdit.outputWindow.write("correct_cnt is "+correct_cnt+"");
	UltraEdit.outputWindow.write("not_correct_cnt is "+not_correct_cnt+"");
	UltraEdit.outputWindow.write("not_find_cnt is "+not_find_cnt+"");

//	for (i = 0; i < correct_cnt; i++) {
//		UltraEdit.outputWindow.write("CorrectName is "+CorrectName[i]+"");
//	}
//	for (i = 0; i < not_correct_cnt; i++) {
//		UltraEdit.outputWindow.write("NotCorrectName is "+NotCorrectName[i]+"");
//	}
//	for (i = 0; i < not_find_cnt; i++) {
//		UltraEdit.outputWindow.write("NotFindName is "+NotFindName[i]+"");
//	}
	//  ===============================================================================================
	//	打开 临时，将比较结果写入文件
	//  ===============================================================================================
	UltraEdit.open("F:\\test\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	//  -------------------------------------------------------------------------------------
	//	写SOURCE信息
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("UCF correct result\r\n");
	UltraEdit.activeDocument.write("*SOURCE*\r\n");
	UltraEdit.activeDocument.write("pin compare result file file is "+pin_compare_result_file+"\r\n");
	UltraEdit.activeDocument.write("prj ucf file is "+ucf_in_prj+"\r\n\r\n");


	//  -------------------------------------------------------------------------------------
	//	写NOT FOUND
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*NOT FOUND*\r\n");
	UltraEdit.activeDocument.write("There are "+not_find_cnt+" net not found.\r\n");
	for (i=0;i<not_find_cnt;i++) {
			UltraEdit.activeDocument.write(""+NotFindName[i]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");
	//  -------------------------------------------------------------------------------------
	//	写SAME
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*SAME*\r\n");
	UltraEdit.activeDocument.write("There are "+not_correct_cnt+" net not corrected.\r\n");
	for (i=0;i<not_correct_cnt;i++) {
			UltraEdit.activeDocument.write(""+NotCorrectName[i]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");
	//  -------------------------------------------------------------------------------------
	//	写CORRECT
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*CORRECT*\r\n");
	UltraEdit.activeDocument.write("There are "+correct_cnt+" net corrected.\r\n");
	for (i=0;i<correct_cnt;i++) {
			UltraEdit.activeDocument.write(""+CorrectName[i]+"\r\n");
		}
	UltraEdit.activeDocument.write("\r\n");

	UltraEdit.activeDocument.top();
	UltraEdit.save();



}

UCFcorrect();
