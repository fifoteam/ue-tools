
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
	//	��ȡpin.txt�в�ͬ��pin������λ�ã�Ĭ���ǵ�һ���������� �ڶ������µ�����λ�ã��������Ǿɵ�����λ��
	//  ===============================================================================================
	find_keyword=0;
	//  -------------------------------------------------------------------------------------
	//	��CHANGE�ؼ���
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
	//	���û���ҵ�CHARGE�ؼ��֣��˳�
	//  -------------------------------------------------------------------------------------
	if(find_keyword===0){
		UltraEdit.outputWindow.write("Not Find CHANGE key word");
		return;
	}

	//  -------------------------------------------------------------------------------------
	//	��ȡ�ı���������������λ��
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

			//ȥ��NetLocOld��β���Ļس���
			if(NetLocOld[i].indexOf("\r\n")!=-1)	NetLocOld[i]=NetLocOld[i].substring(0,NetLocOld[i].indexOf("\r\n"));	//ȥ����β�س���
			if(NetLocOld[i].indexOf("\n")!=-1)	NetLocOld[i]=NetLocOld[i].substring(0,NetLocOld[i].indexOf("\n"));		//ȥ����β�س���
			if(NetLocOld[i].indexOf(";")!=-1)	NetLocOld[i]=NetLocOld[i].substring(0,NetLocOld[i].indexOf("\n"));		//ȥ����β�س���
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
	//	�򿪹��̵�UCF�ļ����Ƚ�������������λ��
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
	//	���Դ�ļ��е�����������Ŀ���ļ�����һ����
	//  -------------------------------------------------------------------------------------
	for(i=0;i<NetName.length;i++){
		UltraEdit.activeDocument.top();
		UltraEdit.activeDocument.findReplace.find(""+NetName[i]+"");
		//  -------------------------------------------------------------------------------------
		//	����ucf�У�����netname
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
	//	�� ��ʱ�����ȽϽ��д���ļ�
	//  ===============================================================================================
	UltraEdit.open("F:\\test\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	//  -------------------------------------------------------------------------------------
	//	дSOURCE��Ϣ
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("UCF correct result\r\n");
	UltraEdit.activeDocument.write("*SOURCE*\r\n");
	UltraEdit.activeDocument.write("pin compare result file file is "+pin_compare_result_file+"\r\n");
	UltraEdit.activeDocument.write("prj ucf file is "+ucf_in_prj+"\r\n\r\n");


	//  -------------------------------------------------------------------------------------
	//	дNOT FOUND
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*NOT FOUND*\r\n");
	UltraEdit.activeDocument.write("There are "+not_find_cnt+" net not found.\r\n");
	for (i=0;i<not_find_cnt;i++) {
			UltraEdit.activeDocument.write(""+NotFindName[i]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");
	//  -------------------------------------------------------------------------------------
	//	дSAME
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*SAME*\r\n");
	UltraEdit.activeDocument.write("There are "+not_correct_cnt+" net not corrected.\r\n");
	for (i=0;i<not_correct_cnt;i++) {
			UltraEdit.activeDocument.write(""+NotCorrectName[i]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");
	//  -------------------------------------------------------------------------------------
	//	дCORRECT
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
