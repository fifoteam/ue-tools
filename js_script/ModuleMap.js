
// include subfunction.js

//找module name
function search_module(DEBUG,endLine,keyword){
	var	f_str;
	var f_array=new Array();
	var i;
	var f_line=0;

	for(f_line;f_line<endLine;){
		UltraEdit.activeDocument.findReplace.find(keyword);
		if (UltraEdit.activeDocument.isFound()) {
			f_line = UltraEdit.activeDocument.currentLineNum;
			//			UltraEdit.outputWindow.write("search mudule line "+f_line+"");
		}
		else{
			if (DEBUG==1)	UltraEdit.outputWindow.write("No found module word");
			return;
		}
		f_str=StringCopy(f_line);
		f_str=TrimComment(f_str);
		f_str=LeftTrimSpace(f_str);
		f_str=f_str.replace(/\t/g," ");
		f_array=f_str.split(" ");
		f_array[0]=f_array[0].toLowerCase();
		if(f_array[0]==keyword){
			//			//++test
			//			for(i=0;i<ClipArray.length;i++){
			//				UltraEdit.outputWindow.write("word "+i+" is "+ClipArray[i]+"\r\n");
			//			}
			//			//--test
			for(i=1;i<f_array.length;i++){
				if(f_array[i]==="")	continue;
				f_str=f_array[i];
				break;
			}
			if(f_str.indexOf("\r\n")!=-1)	f_str=f_str.substring(0,f_str.indexOf("\r\n"));	//去除行尾回车符
			if(f_str.indexOf("\n")!=-1)	f_str=f_str.substring(0,f_str.indexOf("\n"));	//去除行尾回车符
			if(f_str.indexOf("(")!=-1)	f_str=f_str.substring(0,f_str.indexOf("("));	//去除行尾分隔符
			entityName=f_str;
			entityStartNum=f_line;
			if (DEBUG==1)	UltraEdit.outputWindow.write("entityStartNum is "+entityStartNum+"");
			if (DEBUG==1)	UltraEdit.outputWindow.write("module name is "+entityName+"");
			break;
		}
	}
}//function search_module

var entityName="";
var entityStartNum,entityEndNum;

function ModuleMap(DEBUG) {
	//Get user input
	var TotalLine = 1;
	var CurrentLine;
	//	var GenStartNum;
	//	var GenEndNum=0;
	var str;
	var str_tmp;

	var ClipArray=new Array();
	var StrArray=new Array();
	var i=0,j=0,m=0,k=0;

	var strIndex;
	var strCommaSplit=new Array();
	var genSignalName=new Array();
	var genSignalNum=new Array();
	var signalName=new Array();
	//	var signalInitValue=new Array();
	var signalType=new Array();
	//	var signalNameTrimed=new Array();
	var signalDirec=new Array();
	var signalDimenHigh=new Array();
	var signalDimenLow=new Array();
	var port_declare=0;
	var paraFind = 0;
	var paraStartNum = 0;
	var paraEndNum = 0;
	var paraName = new Array();
	var paraValue = new Array();

	UltraEdit.outputWindow.showWindow(true);

	//检查文件扩展名是否为v
	if (UltraEdit.activeDocument.isExt("v")){
		UltraEdit.outputWindow.write("file ext is v");
	}
	else{
		UltraEdit.outputWindow.write("file ext is not v !!!!!!");
		return;
	}

	UltraEdit.activeDocument.findReplace.matchCase=false;
	UltraEdit.activeDocument.findReplace.matchWord=true;
	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;

	//	-------------------------------------------------------------------------------------
	//	ref search module name
	//	-------------------------------------------------------------------------------------
	//寻找module所在的位置
	UltraEdit.activeDocument.top();
	search_module(DEBUG,TotalLine,"module");

	//	-------------------------------------------------------------------------------------
	//	ref search parameter define
	//	-------------------------------------------------------------------------------------
	//找第一个"("，端口声明开始的一行
	for(CurrentLine=entityStartNum;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=TrimComment(str);
		if(str.indexOf("(")!=-1){
			paraStartNum = CurrentLine;
			break;
		}
		if(CurrentLine==TotalLine){
			UltraEdit.outputWindow.write("No ( Keyword!");
			return;
		}

	}


	//在entitystart 与 第一个 ( 之间是否有 #
	for(CurrentLine=entityStartNum;CurrentLine<=paraStartNum;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=TrimComment(str);
		if(str.indexOf("#")!=-1){
			paraFind = 1;
			UltraEdit.outputWindow.write("Have Parameter");
			break;
		}
		if(CurrentLine==paraStartNum){
			entityStartNum = paraStartNum;
			UltraEdit.outputWindow.write("No Parameter");
		}
	}

	//	-------------------------------------------------------------------------------------
	//	ref 确定 entity 的头和尾
	//	-------------------------------------------------------------------------------------
	if(paraFind === 0){	//不存在parameter的宏定义
		//找entityEndNum
		for(CurrentLine=entityStartNum;CurrentLine<=TotalLine;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(str.indexOf(")")!=-1){
				entityEndNum = CurrentLine;
				break;
			}
			if(CurrentLine==TotalLine){
				UltraEdit.outputWindow.write("No ) Keyword!");
				return;
			}

		}
	}
	else{			//存在parameter的宏定义
		//找paraEndNum
		for(CurrentLine=paraStartNum;CurrentLine<=TotalLine;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(str.indexOf(")")!=-1){
				paraEndNum = CurrentLine;
				break;
			}
			if(CurrentLine==TotalLine){
				UltraEdit.outputWindow.write("No ) Keyword!");
				return;
			}
		}

		//找entityStartNum
		for(CurrentLine=paraEndNum;CurrentLine<=TotalLine;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(CurrentLine == paraStartNum){		//para 开始和结束在同一行
				str = str.substring(str.indexOf(")"+1,str.length));
			}
			if(str.indexOf("(")!=-1){
				entityStartNum = CurrentLine;
				break;
			}
			if(CurrentLine==TotalLine){
				UltraEdit.outputWindow.write("No ( Keyword!");
				return;
			}
		}

		//找entityEndNum
		for(CurrentLine=entityStartNum;CurrentLine<=TotalLine;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(CurrentLine == paraStartNum){		//para 开始和结束在同一行,entity 开始和结束也在这一行
				str = str.substring(str.indexOf(")"+1,str.length));
			}
			if(str.indexOf(")")!=-1){
				entityEndNum = CurrentLine;
				break;
			}
			if(CurrentLine==TotalLine){
				UltraEdit.outputWindow.write("No ) Keyword!");
				return;
			}
		}
	}

	//	//+test+
	//	UltraEdit.outputWindow.write("paraFind is "+paraFind+"");
	//	if(paraFind == 1){
	//		UltraEdit.outputWindow.write("paraStartNum is "+paraStartNum+"");
	//		UltraEdit.outputWindow.write("paraEndNum is "+paraEndNum+"");
	//		UltraEdit.outputWindow.write("entityStartNum is "+entityStartNum+"");
	//		UltraEdit.outputWindow.write("entityEndNum is "+entityEndNum+"");
	//	}else{
	//		UltraEdit.outputWindow.write("paraStartNum is "+paraStartNum+"");
	//		UltraEdit.outputWindow.write("paraEndNum is "+paraEndNum+"");
	//		UltraEdit.outputWindow.write("entityStartNum is "+entityStartNum+"");
	//		UltraEdit.outputWindow.write("entityEndNum is "+entityEndNum+"");
	//	}
	//	//-test-

	//	-------------------------------------------------------------------------------------
	//	ref 处理parameter信息
	//	-------------------------------------------------------------------------------------
	j=0;
	if(paraFind == 1){
		for(CurrentLine=paraStartNum;CurrentLine<=paraEndNum;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			str=LeftTrimSpace(str);

			if(str.indexOf("\r\n")!=-1)	str=str.substring(0,str.indexOf("\r\n"));	//去除行尾回车符
			if(str.indexOf("\n")!=-1)	str=str.substring(0,str.indexOf("\n"));	//去除行尾回车符
			if(str.indexOf("(")!=-1)	str=str.substring(str.indexOf("(")+1,str.length);
			if(str.indexOf(")")!=-1)	str=str.substring(0,str.indexOf(")"));
			if(str===""){
				//				UltraEdit.outputWindow.write("str do not have signal info +processing parameter+");
				continue;
			}

			//			UltraEdit.outputWindow.write("split para string.now the line is "+CurrentLine+"");
			strCommaSplit=str.split(",");
			for(i=0;i<strCommaSplit.length;i++){//在同一行中可能存在多个信号的声明，用逗号区分
				str=strCommaSplit[i];
				str=LeftTrimSpace(str);
				str=str.replace(/\t/g," ");
				ClipArray=str.split(" ");
				//				//+test+
				//				for(m=0;m<ClipArray.length;m++){
				//					UltraEdit.outputWindow.write("ClipArray["+m+"] is "+ClipArray[m]+"");
				//				}
				//				//+test+
				if(ClipArray[0].toLowerCase() == "parameter"){	//说明行头的第一个字符是 parameter
					ClipArray[1] = str;				//ClipArray[1] 暂时存储str
					str = str.substring(str.indexOf(" "),str.length);	//从行头的第一个空格开始截位
					if(str.indexOf("=") != -1)	str = str.substring(0,str.indexOf("="));	//去掉行尾的 =
					str=LeftTrimSpace(str);
					str=RightTrimSpace(str);
					paraName[j] = str;

					str	= ClipArray[1];				//从ClipArray[1]中恢复str
					if(str.indexOf("=") != -1){	//parameter 的声明中包含 =
						str=str.substring(str.indexOf("=")+1,str.length);
						str=LeftTrimSpace(str);
						str=RightTrimSpace(str);
						paraValue[j] = str;
					}else{	//parameter 的声明中不包含 =
						paraValue[j] = 0;
					}
					j++;
				}
			}
		}
	}

	//+test+
	if(paraFind == 1 && DEBUG==1){
		for(i=0;i<paraName.length;i++){
			UltraEdit.outputWindow.write("paraName"+i+" is "+paraName[i]+"");
			UltraEdit.outputWindow.write("paraValue"+i+" is "+paraValue[i]+"");
		}
	}
	//-test-

	//	-------------------------------------------------------------------------------------
	//	ref 处理 port 信息
	//	-------------------------------------------------------------------------------------
	j=0;
	for(CurrentLine=entityStartNum;CurrentLine<=entityEndNum;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=TrimComment(str);
		str=LeftTrimSpace(str);
		if (DEBUG==1)	UltraEdit.outputWindow.write("CurrentLine is "+CurrentLine+"");

		if(str.indexOf("\r\n")!=-1){
			//			UltraEdit.outputWindow.write("str have enter");
			str=str.substring(0,str.indexOf("\r\n"));	//去除行尾回车符
		}
		if(str.indexOf("\n")!=-1){
			//			UltraEdit.outputWindow.write("str have enter");
			str=str.substring(0,str.indexOf("\n"));	//去除行尾回车符
		}
		if(str.indexOf("(")!=-1){
			//			UltraEdit.outputWindow.write("str have (");
			str=str.substring(str.indexOf("(")+1,str.length);
		}
		if(str.indexOf(")")!=-1){
			//			UltraEdit.outputWindow.write("str have )");
			str=str.substring(0,str.indexOf(")"));
		}
		if(str.indexOf("=")!=-1){
			//			UltraEdit.outputWindow.write("str have )");
			str=str.substring(0,str.indexOf("="));
		}

		if(str===""){
			if (DEBUG==1)	UltraEdit.outputWindow.write("str do not have signal info");
			continue;
		}

		strCommaSplit=str.split(",");
		for(i=0;i<strCommaSplit.length;i++){//在同一行中可能存在多个信号的声明，用逗号区分
			str=strCommaSplit[i];
			//				UltraEdit.outputWindow.write("after comma split str"+i+" is "+str+"");
			signalDirec[j]="na";	//没有定义方向
			signalType[j]="s";		//默认的信号是single bit
			//				UltraEdit.outputWindow.write("port_declare is "+port_declare+"");

			//只在declare=0的时候判断是否处于module name的这一行
			if(port_declare===0){	//declare=0，说明刚开始搜索。=2说明已经搜索到信号名，但是没有在module中指明方向。=1说明在module中指明了方向。
				str_tmp=RightTrimSpace(str);
				str_tmp=LeftTrimSpace(str_tmp);
				str_tmp=str_tmp.replace(/\t/g," ");
				ClipArray=str_tmp.split(" ");
				if(ClipArray[0].toLowerCase()=="module"){		//module name 的这一行,不搜索这一行
					continue;
				}
			}

			if(port_declare==2){			//port_declare=2 说明在端口中没有指明port的方向
				str=RightTrimSpace(str);
				str=LeftTrimSpace(str);
				str=str.replace(/\t/g," ");
				ClipArray=str.split(" ");
				if(ClipArray[0]!==""){
					signalName[j]=ClipArray[0];
					j++;
				}
			}else{
				str=LeftTrimSpace(str);
				str=str.replace(/\t/g," ");
				ClipArray=str.split(" ");

				if(ClipArray[0].toLowerCase() == "input"){
					port_declare=1;
					str=str.substring(5,str.length);
					signalDirec[j]=ClipArray[0];
				}else if(ClipArray[0].toLowerCase() == "output"){
					port_declare=1;
					str=str.substring(6,str.length);
					signalDirec[j]=ClipArray[0];
				}else if(ClipArray[0].toLowerCase() == "inout"){
					port_declare=1;
					str=str.substring(5,str.length);
					signalDirec[j]=ClipArray[0];
				}else{
					if(port_declare==1){
						signalDirec[j]=signalDirec[j-1];
					}
				}

				str=LeftTrimSpace(str);
				str=str.replace(/\t/g," ");
				ClipArray=str.split(" ");

				if(ClipArray[0].toLowerCase() == "wire"){
					str=str.substring(4,str.length);
				}else if(ClipArray[0].toLowerCase() == "reg"){
					str=str.substring(3,str.length);
				}

				//提取vector信息
				if(str.indexOf("]") != -1){
					signalType[j] = "v";
					str_tmp = str.substring(str.indexOf("[")+1,str.indexOf("]"));
					StrArray = str_tmp.split(":");
					StrArray[0] = LeftTrimSpace(StrArray[0]);
					StrArray[1] = LeftTrimSpace(StrArray[1]);
					StrArray[0] = RightTrimSpace(StrArray[0]);
					StrArray[1] = RightTrimSpace(StrArray[1]);
					if(StrArray[0] > StrArray[1]){
						signalDimenHigh[j] = StrArray[0];
						signalDimenLow[j] = StrArray[1];
					}else{
						signalDimenHigh[j] = StrArray[1];
						signalDimenLow[j] = StrArray[0];
					}
					str = str.substring(str.indexOf("]")+1,str.length);
				}
				//提取信号名
				str = LeftTrimSpace(str);
				str = RightTrimSpace(str);
				if(str !== ""){
					signalName[j]=str;
					if(port_declare==1){	//在port中已经有了方向的声明
						port_declare=1;
					}else{	//在port中没有方向声明，但是找到了信号名
						port_declare=2;
					}
					j++;
				}
			}
		}
	}

	if (DEBUG==1) {
		UltraEdit.outputWindow.write("TotalLine is "+TotalLine+"");
		UltraEdit.outputWindow.write("entityEndNum is "+entityEndNum+"");
		//++test
		for(i=0;i<signalName.length;i++){
			UltraEdit.outputWindow.write("signalName "+i+" is "+signalName[i]+"");
		}
		//--test
	}
	//	-------------------------------------------------------------------------------------
	//	ref 如果在port中没有声明 inout 信息，则继续向下寻找
	//	-------------------------------------------------------------------------------------
	if(port_declare == 2){
		if (DEBUG==1)	UltraEdit.outputWindow.write("go into port declare = 2");
		for(j=0;j<signalName.length;j++){			//找每一个signal的声明
			UltraEdit.activeDocument.findReplace.matchCase=false;
			UltraEdit.activeDocument.findReplace.matchWord=false;
			if (DEBUG==1)	UltraEdit.outputWindow.write("signal be serached "+j+" "+signalName[j]+"");
			UltraEdit.activeDocument.gotoLine(entityEndNum+1,1);
			UltraEdit.activeDocument.findReplace.find(""+signalName[j]+"");
			if (UltraEdit.activeDocument.isFound()) {
				if (DEBUG==1)	UltraEdit.outputWindow.write("have find signal");
				CurrentLine = UltraEdit.activeDocument.currentLineNum;
				if (DEBUG==1)	UltraEdit.outputWindow.write("first.line num is "+CurrentLine+"");
				for(;CurrentLine<entityEndNum+1;){
					UltraEdit.activeDocument.findReplace.searchDown();
					CurrentLine = UltraEdit.activeDocument.currentLineNum;
					if (DEBUG==1)	UltraEdit.outputWindow.write("search signal declare.line num is "+CurrentLine+"");
				}
			}
			else{
				if (DEBUG==1)	UltraEdit.outputWindow.write("do not find key word "+signalName[j]+"");
				return;
			}

			//在每一行中找signal的声明
			for(CurrentLine;CurrentLine<TotalLine;CurrentLine++){
				str=StringCopy(CurrentLine);
				if (DEBUG==1)	UltraEdit.outputWindow.write("current line num is "+UltraEdit.activeDocument.currentLineNum+"");
				if(str.indexOf("\r\n")!=-1){
					//UltraEdit.outputWindow.write("after trim rn.str is "+str+"");
					str=str.substring(0,str.indexOf("\r\n"));
				}
				if(str.indexOf("\n")!=-1){
					//UltraEdit.outputWindow.write("after trim n.str is "+str+"");
					str=str.substring(0,str.indexOf("\n"));
				}
				str=TrimComment(str);
				str=LeftTrimSpace(str);
				if(str!==""){			//非空的字符串
					strCommaSplit=str.split(",");
					for(m=0;m<strCommaSplit.length;m++){//在同一行中可能存在多个信号的声明，用逗号区分
						str=strCommaSplit[m];
						if(str.indexOf(";")!=-1)	str=str.substring(0,str.indexOf(";"));

						str=str.replace(/\t/g," ");
						ClipArray=str.split(" ");
						strIndex=0;				//先假设在这一行中没有signal的信号名
						for(i=0;i<ClipArray.length;i++){
							if (DEBUG==1)	UltraEdit.outputWindow.write("ClipArray "+i+" is "+ClipArray[i]+"");
							if(ClipArray[i]==signalName[j]){	//在这一行中有signal的信号名
								strIndex=1;
							}
						}
						if (DEBUG==1)	UltraEdit.outputWindow.write("strIndex is "+strIndex+"");
						//在这一行中有signal的信号名,在这一行寻找signal的其他属性
						if(strIndex==1){
							signalDirec[j]="na";	//没有定义方向
							signalType[j]="s";		//默认的信号是single bit

							if(m===0){	//在本行中定义了方向和纬度
								signalDirec[j]=ClipArray[0];
								//提取vector信息
								if(str.indexOf("]")!=-1){
									signalType[j]="v";
									str_tmp=str.substring(str.indexOf("[")+1,str.indexOf("]"));
									StrArray=str_tmp.split(":");
									StrArray[0]=LeftTrimSpace(StrArray[0]);
									StrArray[1]=LeftTrimSpace(StrArray[1]);
									StrArray[0]=RightTrimSpace(StrArray[0]);
									StrArray[1]=RightTrimSpace(StrArray[1]);
									if(StrArray[0]>StrArray[1]){
										signalDimenHigh[j]=StrArray[0];
										signalDimenLow[j]=StrArray[1];
									}else{
										signalDimenHigh[j]=StrArray[1];
										signalDimenLow[j]=StrArray[0];
									}
									str=str.substring(str.indexOf("]")+1,str.length);
								}
							}else{	//没有在本行中定义方向和纬度
								signalDirec[j]=signalDirec[j-1];
								signalType[j]=signalType[j-1];
								signalDimenHigh[j]=signalDimenHigh[j-1];
								signalDimenLow[j]=signalDimenLow[j-1];
							}
							if (DEBUG==1)	UltraEdit.outputWindow.write("signal "+j+" have been found");
							break;//该信号已经找完，可以寻找下一个信号
						}
					}
				}//if(str!=="")

				//如果在这一行中找到了信号的声明，那么就要退出循环
				if(strIndex == 1){
					break;
				}

			}//for(i=0;i<TotalLine-entityEndNum-1;i++){
		}//for(j=0;j<signalName.length;j++)
	}//if(port_declare==2)

	if (DEBUG==1) {
		for(i=0;i<signalName.length;i++){
			UltraEdit.outputWindow.write("signalName "+i+" is "+signalName[i]+"");
			UltraEdit.outputWindow.write("signalDirec "+i+" is "+signalDirec[i]+"");
			UltraEdit.outputWindow.write("signalType "+i+" is "+signalType[i]+"");
		}
	}

	//  ===============================================================================================
	//	ref 字符串扩展到一样的宽度
	//  ===============================================================================================
	//  -------------------------------------------------------------------------------------
	//	-- ref 统计param sig 中最长的一个字符串
	//  -------------------------------------------------------------------------------------
	var	sig_max_length = 0;
	var	sig_max_tab = 0;
	for (i = 0; i < paraName.length; i++) {
		if (sig_max_length < paraName[i].length) {
			sig_max_length	= paraName[i].length;
		}
	}
	for (i = 0; i < signalName.length; i++) {
		if (sig_max_length < signalName[i].length) {
			sig_max_length	= signalName[i].length;
		}
	}

	if (DEBUG==1) {
		UltraEdit.outputWindow.write("sig_max_length is "+sig_max_length+"");
	}

	//  -------------------------------------------------------------------------------------
	//	-- ref 如果最大长度不是0，进行下一步操作
	//  -------------------------------------------------------------------------------------
	var	sig_tab_num=0;
	if (sig_max_length!==0) {
		sig_max_tab	= parseInt(sig_max_length/4,10)+1;
		if (DEBUG==1) UltraEdit.outputWindow.write("sig_max_tab is "+sig_max_tab+"");
		for (i = 0; i < paraName.length; i++) {
			//  -------------------------------------------------------------------------------------
			//	计算出需要补全的tab个数，由于信号名字前面有 . (，因此计算长度的时候要+1
			//  -------------------------------------------------------------------------------------
			sig_tab_num	= sig_max_tab-parseInt((paraName[i].length+1)/4,10);

			if (DEBUG==1) UltraEdit.outputWindow.write("sig_tab_num is "+sig_tab_num+"");
			for (j = 0; j < sig_tab_num; j++) {
				paraName[i]	= paraName[i] + "\t";
			}
		}

		for (i = 0; i < signalName.length; i++) {
			//  -------------------------------------------------------------------------------------
			//	计算出需要补全的tab个数，由于信号名字前面有 . (，因此计算长度的时候要+1
			//  -------------------------------------------------------------------------------------
			sig_tab_num	= sig_max_tab-parseInt((signalName[i].length+1)/4,10);
			if (DEBUG==1) UltraEdit.outputWindow.write("sig_tab_num is "+sig_tab_num+"");
			for (j = 0; j < sig_tab_num; j++) {
				signalName[i]	= signalName[i] + "\t";
			}
		}
		if (DEBUG==1) {
			UltraEdit.outputWindow.write("after signal length supply");
			for(i=0;i<signalName.length;i++){
				UltraEdit.outputWindow.write("signalName "+i+" is "+signalName[i]+"");
			}
		}

	}

	//	-------------------------------------------------------------------------------------
	//	ref write file
	//	-------------------------------------------------------------------------------------
	//打开临时文件
	UltraEdit.open("c:\\ue\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	//	-------------------------------------------------------------------------------------
	//	--ref verilog module map
	//	-------------------------------------------------------------------------------------
	if(paraFind == 1){
		//包含parameter的map
		UltraEdit.activeDocument.write(""+entityName+" # (\r\n");
		for(i=0;i<paraName.length-1;i++){
			//			UltraEdit.activeDocument.write("."+paraName[i]+"	("+paraValue[i]+"	),\r\n");
			UltraEdit.activeDocument.write("."+paraName[i]+"	("+paraName[i]+"	),\r\n");
		}
		//		UltraEdit.activeDocument.write("."+paraName[i]+"	("+paraValue[i]+"	)\r\n");
		UltraEdit.activeDocument.write("."+paraName[i]+"	("+paraName[i]+"	)\r\n");

		UltraEdit.activeDocument.write(")\r\n");
		//		UltraEdit.activeDocument.write("inst_"+entityName+" (\r\n");
		UltraEdit.activeDocument.write(""+entityName+"_inst (\r\n");
		for(i=0;i<signalName.length-1;i++){
			UltraEdit.activeDocument.write("."+signalName[i]+"\t("+signalName[i]+"	),\r\n");
		}
		UltraEdit.activeDocument.write("."+signalName[i]+"\t("+signalName[i]+"	)\r\n");
		UltraEdit.activeDocument.write(");\r\n\r\n");
	}else{
		//没有parameter的map
		//		UltraEdit.activeDocument.write(""+entityName+" inst_"+entityName+" (\r\n");
		UltraEdit.activeDocument.write(""+entityName+" "+entityName+"_inst (\r\n");

		for(i=0;i<signalName.length-1;i++){
			UltraEdit.activeDocument.write("."+signalName[i]+"\t("+signalName[i]+"	),\r\n");
		}
		UltraEdit.activeDocument.write("."+signalName[i]+"\t("+signalName[i]+"	)\r\n");
		UltraEdit.activeDocument.write(");\r\n\r\n");
	}

	//写parameter
	if(paraFind == 1){
		for(i=0;i<paraName.length;i++){
			//			UltraEdit.activeDocument.write("."+paraName[i]+"	("+paraValue[i]+"	),\r\n");
			UltraEdit.activeDocument.write("parameter	"+paraName[i]+"	= "+paraName[i]+"	;\r\n");
		}
		UltraEdit.activeDocument.write("\r\n\r\n\r\n");
	}

	if(paraFind == 1){
		for(i=0;i<paraName.length;i++){
			UltraEdit.activeDocument.write("parameter	"+paraName[i]+"	= "+paraValue[i]+"	;\r\n");
		}
		UltraEdit.activeDocument.write("\r\n\r\n\r\n");
	}

	//写signal
	for(i=0;i<signalName.length;i++){
		if(signalType[i]=="s"){
			str="";
			str_tmp="1";
		}
		else{
			str="["+signalDimenHigh[i]+":"+signalDimenLow[i]+"]\t";
			str_tmp=parseFloat(signalDimenHigh[i])-parseFloat(signalDimenLow[i])+1;
		}
		if(signalDirec[i]=="output" || signalDirec[i]=="inout"){
			UltraEdit.activeDocument.write("wire\t"+str+""+signalName[i]+"	;\r\n");
		}
		else{
			if (isNaN(str_tmp)) {
				UltraEdit.activeDocument.write("reg\t\t"+str+""+signalName[i]+"	= 'b0	;\r\n");
			}
			else {
				UltraEdit.activeDocument.write("reg\t\t"+str+""+signalName[i]+"	= "+str_tmp+"'b0	;\r\n");
			}
		}
	}

	//写signal
	UltraEdit.activeDocument.write("\r\n\r\n\r\n");
	for(i=0;i<signalName.length;i++){
		if(signalType[i]=="s"){
			str="";
		}
		else{
			str="["+signalDimenHigh[i]+":"+signalDimenLow[i]+"]\t";
		}

		UltraEdit.activeDocument.write("wire\t"+str+""+signalName[i]+"	;\r\n");
	}



	//	-------------------------------------------------------------------------------------
	//	--ref vhdl module map
	//	-------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("\r\n\r\n\r\n");
	//component
	UltraEdit.activeDocument.write("component "+entityName+"\r\n");
	if(paraFind == 1){
		UltraEdit.activeDocument.write("	generic (\r\n");
		for(i=0;i<paraName.length-1;i++){
			UltraEdit.activeDocument.write("	"+paraName[i]+" : integer := "+paraValue[i]+";\r\n");
		}
		UltraEdit.activeDocument.write("	"+paraName[i]+" : integer := "+paraValue[i]+"\r\n");
		UltraEdit.activeDocument.write("	);\r\n");
	}

	UltraEdit.activeDocument.write("	port (\r\n");
	for(i=0;i<signalName.length-1;i++){
		if(signalType[i]=="s"){
			str="std_logic";
			strIndex="";
		}else{
			str="std_logic_vector";
			strIndex="("+signalDimenHigh[i]+" downto "+signalDimenLow[i]+")";
		}
		if(signalDirec[i].toLowerCase()=="input"){
			signalDirec[i]="in";
		}else if(signalDirec[i].toLowerCase()=="output"){
			signalDirec[i]="out";
		}
		UltraEdit.activeDocument.write("	"+signalName[i]+"\t: "+signalDirec[i]+"\t"+str+""+strIndex+";\r\n");
	}

	if(signalType[i]=="s"){
		str="std_logic";
		strIndex="";
	}
	else{
		str="std_logic_vector";
		strIndex="("+signalDimenHigh[i]+" downto "+signalDimenLow[i]+")";
	}
	if(signalDirec[i].toLowerCase()=="input"){
		signalDirec[i]="in";
	}else if(signalDirec[i].toLowerCase()=="output"){
		signalDirec[i]="out";
	}
	UltraEdit.activeDocument.write("	"+signalName[i]+"\t: "+signalDirec[i]+"\t"+str+""+strIndex+"\r\n");
	UltraEdit.activeDocument.write("	);\r\n");
	UltraEdit.activeDocument.write("end component;\r\n\r\n");

	//map
	UltraEdit.activeDocument.write("inst_"+entityName+" : "+entityName+"\r\n");
	if(paraFind == 1){
		UltraEdit.activeDocument.write("generic map (\r\n");
		for(i=0;i<paraName.length-1;i++){
			UltraEdit.activeDocument.write(""+paraName[i]+"	=> "+paraValue[i]+",\r\n");
		}
		UltraEdit.activeDocument.write(""+paraName[i]+"	=> "+paraValue[i]+"\r\n");
		UltraEdit.activeDocument.write(")\r\n");
	}


	UltraEdit.activeDocument.write("port map (\r\n");
	for(i=0;i<signalName.length-1;i++){
		UltraEdit.activeDocument.write(""+signalName[i]+"\t=> "+signalName[i]+",\r\n");
	}
	UltraEdit.activeDocument.write(""+signalName[i]+"\t=> "+signalName[i]+"\r\n");
	UltraEdit.activeDocument.write(");\r\n\r\n");

	//singal
	for(i=0;i<signalName.length;i++){
		if(signalType[i]=="s"){
			str="std_logic";
			strIndex="";
			currentLine=":= '0'";
		}
		else{
			str="std_logic_vector";
			strIndex="("+signalDimenHigh[i]+" downto "+signalDimenLow[i]+")";
			currentLine=":= (others => '0')";
		}
		UltraEdit.activeDocument.write("signal "+signalName[i]+"\t: "+str+""+strIndex+" "+currentLine+";\r\n");
	}//for(i=0;i<signalName.length;i++)

	UltraEdit.activeDocument.bottom();
	UltraEdit.save();

	//	-------------------------------------------------------------------------------------
	//	ref 程序结束，返回顶部
	//	-------------------------------------------------------------------------------------
	UltraEdit.activeDocument.top();

}//ModuleMap

ModuleMap(0);
