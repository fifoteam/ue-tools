
// include subfunction.js

//��module name
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
			if(f_str.indexOf("\r\n")!=-1)	f_str=f_str.substring(0,f_str.indexOf("\r\n"));	//ȥ����β�س���
			if(f_str.indexOf("\n")!=-1)	f_str=f_str.substring(0,f_str.indexOf("\n"));	//ȥ����β�س���
			if(f_str.indexOf("(")!=-1)	f_str=f_str.substring(0,f_str.indexOf("("));	//ȥ����β�ָ���
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

	//����ļ���չ���Ƿ�Ϊv
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
	//Ѱ��module���ڵ�λ��
	UltraEdit.activeDocument.top();
	search_module(DEBUG,TotalLine,"module");

	//	-------------------------------------------------------------------------------------
	//	ref search parameter define
	//	-------------------------------------------------------------------------------------
	//�ҵ�һ��"("���˿�������ʼ��һ��
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


	//��entitystart �� ��һ�� ( ֮���Ƿ��� #
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
	//	ref ȷ�� entity ��ͷ��β
	//	-------------------------------------------------------------------------------------
	if(paraFind === 0){	//������parameter�ĺ궨��
		//��entityEndNum
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
	else{			//����parameter�ĺ궨��
		//��paraEndNum
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

		//��entityStartNum
		for(CurrentLine=paraEndNum;CurrentLine<=TotalLine;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(CurrentLine == paraStartNum){		//para ��ʼ�ͽ�����ͬһ��
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

		//��entityEndNum
		for(CurrentLine=entityStartNum;CurrentLine<=TotalLine;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(CurrentLine == paraStartNum){		//para ��ʼ�ͽ�����ͬһ��,entity ��ʼ�ͽ���Ҳ����һ��
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
	//	ref ����parameter��Ϣ
	//	-------------------------------------------------------------------------------------
	j=0;
	if(paraFind == 1){
		for(CurrentLine=paraStartNum;CurrentLine<=paraEndNum;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			str=LeftTrimSpace(str);

			if(str.indexOf("\r\n")!=-1)	str=str.substring(0,str.indexOf("\r\n"));	//ȥ����β�س���
			if(str.indexOf("\n")!=-1)	str=str.substring(0,str.indexOf("\n"));	//ȥ����β�س���
			if(str.indexOf("(")!=-1)	str=str.substring(str.indexOf("(")+1,str.length);
			if(str.indexOf(")")!=-1)	str=str.substring(0,str.indexOf(")"));
			if(str===""){
				//				UltraEdit.outputWindow.write("str do not have signal info +processing parameter+");
				continue;
			}

			//			UltraEdit.outputWindow.write("split para string.now the line is "+CurrentLine+"");
			strCommaSplit=str.split(",");
			for(i=0;i<strCommaSplit.length;i++){//��ͬһ���п��ܴ��ڶ���źŵ��������ö�������
				str=strCommaSplit[i];
				str=LeftTrimSpace(str);
				str=str.replace(/\t/g," ");
				ClipArray=str.split(" ");
				//				//+test+
				//				for(m=0;m<ClipArray.length;m++){
				//					UltraEdit.outputWindow.write("ClipArray["+m+"] is "+ClipArray[m]+"");
				//				}
				//				//+test+
				if(ClipArray[0].toLowerCase() == "parameter"){	//˵����ͷ�ĵ�һ���ַ��� parameter
					ClipArray[1] = str;				//ClipArray[1] ��ʱ�洢str
					str = str.substring(str.indexOf(" "),str.length);	//����ͷ�ĵ�һ���ո�ʼ��λ
					if(str.indexOf("=") != -1)	str = str.substring(0,str.indexOf("="));	//ȥ����β�� =
					str=LeftTrimSpace(str);
					str=RightTrimSpace(str);
					paraName[j] = str;

					str	= ClipArray[1];				//��ClipArray[1]�лָ�str
					if(str.indexOf("=") != -1){	//parameter �������а��� =
						str=str.substring(str.indexOf("=")+1,str.length);
						str=LeftTrimSpace(str);
						str=RightTrimSpace(str);
						paraValue[j] = str;
					}else{	//parameter �������в����� =
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
	//	ref ���� port ��Ϣ
	//	-------------------------------------------------------------------------------------
	j=0;
	for(CurrentLine=entityStartNum;CurrentLine<=entityEndNum;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=TrimComment(str);
		str=LeftTrimSpace(str);
		if (DEBUG==1)	UltraEdit.outputWindow.write("CurrentLine is "+CurrentLine+"");

		if(str.indexOf("\r\n")!=-1){
			//			UltraEdit.outputWindow.write("str have enter");
			str=str.substring(0,str.indexOf("\r\n"));	//ȥ����β�س���
		}
		if(str.indexOf("\n")!=-1){
			//			UltraEdit.outputWindow.write("str have enter");
			str=str.substring(0,str.indexOf("\n"));	//ȥ����β�س���
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
		for(i=0;i<strCommaSplit.length;i++){//��ͬһ���п��ܴ��ڶ���źŵ��������ö�������
			str=strCommaSplit[i];
			//				UltraEdit.outputWindow.write("after comma split str"+i+" is "+str+"");
			signalDirec[j]="na";	//û�ж��巽��
			signalType[j]="s";		//Ĭ�ϵ��ź���single bit
			//				UltraEdit.outputWindow.write("port_declare is "+port_declare+"");

			//ֻ��declare=0��ʱ���ж��Ƿ���module name����һ��
			if(port_declare===0){	//declare=0��˵���տ�ʼ������=2˵���Ѿ��������ź���������û����module��ָ������=1˵����module��ָ���˷���
				str_tmp=RightTrimSpace(str);
				str_tmp=LeftTrimSpace(str_tmp);
				str_tmp=str_tmp.replace(/\t/g," ");
				ClipArray=str_tmp.split(" ");
				if(ClipArray[0].toLowerCase()=="module"){		//module name ����һ��,��������һ��
					continue;
				}
			}

			if(port_declare==2){			//port_declare=2 ˵���ڶ˿���û��ָ��port�ķ���
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

				//��ȡvector��Ϣ
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
				//��ȡ�ź���
				str = LeftTrimSpace(str);
				str = RightTrimSpace(str);
				if(str !== ""){
					signalName[j]=str;
					if(port_declare==1){	//��port���Ѿ����˷��������
						port_declare=1;
					}else{	//��port��û�з��������������ҵ����ź���
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
	//	ref �����port��û������ inout ��Ϣ�����������Ѱ��
	//	-------------------------------------------------------------------------------------
	if(port_declare == 2){
		if (DEBUG==1)	UltraEdit.outputWindow.write("go into port declare = 2");
		for(j=0;j<signalName.length;j++){			//��ÿһ��signal������
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

			//��ÿһ������signal������
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
				if(str!==""){			//�ǿյ��ַ���
					strCommaSplit=str.split(",");
					for(m=0;m<strCommaSplit.length;m++){//��ͬһ���п��ܴ��ڶ���źŵ��������ö�������
						str=strCommaSplit[m];
						if(str.indexOf(";")!=-1)	str=str.substring(0,str.indexOf(";"));

						str=str.replace(/\t/g," ");
						ClipArray=str.split(" ");
						strIndex=0;				//�ȼ�������һ����û��signal���ź���
						for(i=0;i<ClipArray.length;i++){
							if (DEBUG==1)	UltraEdit.outputWindow.write("ClipArray "+i+" is "+ClipArray[i]+"");
							if(ClipArray[i]==signalName[j]){	//����һ������signal���ź���
								strIndex=1;
							}
						}
						if (DEBUG==1)	UltraEdit.outputWindow.write("strIndex is "+strIndex+"");
						//����һ������signal���ź���,����һ��Ѱ��signal����������
						if(strIndex==1){
							signalDirec[j]="na";	//û�ж��巽��
							signalType[j]="s";		//Ĭ�ϵ��ź���single bit

							if(m===0){	//�ڱ����ж����˷����γ��
								signalDirec[j]=ClipArray[0];
								//��ȡvector��Ϣ
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
							}else{	//û���ڱ����ж��巽���γ��
								signalDirec[j]=signalDirec[j-1];
								signalType[j]=signalType[j-1];
								signalDimenHigh[j]=signalDimenHigh[j-1];
								signalDimenLow[j]=signalDimenLow[j-1];
							}
							if (DEBUG==1)	UltraEdit.outputWindow.write("signal "+j+" have been found");
							break;//���ź��Ѿ����꣬����Ѱ����һ���ź�
						}
					}
				}//if(str!=="")

				//�������һ�����ҵ����źŵ���������ô��Ҫ�˳�ѭ��
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
	//	ref �ַ�����չ��һ���Ŀ��
	//  ===============================================================================================
	//  -------------------------------------------------------------------------------------
	//	-- ref ͳ��param sig �����һ���ַ���
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
	//	-- ref �����󳤶Ȳ���0��������һ������
	//  -------------------------------------------------------------------------------------
	var	sig_tab_num=0;
	if (sig_max_length!==0) {
		sig_max_tab	= parseInt(sig_max_length/4,10)+1;
		if (DEBUG==1) UltraEdit.outputWindow.write("sig_max_tab is "+sig_max_tab+"");
		for (i = 0; i < paraName.length; i++) {
			//  -------------------------------------------------------------------------------------
			//	�������Ҫ��ȫ��tab�����������ź�����ǰ���� . (����˼��㳤�ȵ�ʱ��Ҫ+1
			//  -------------------------------------------------------------------------------------
			sig_tab_num	= sig_max_tab-parseInt((paraName[i].length+1)/4,10);

			if (DEBUG==1) UltraEdit.outputWindow.write("sig_tab_num is "+sig_tab_num+"");
			for (j = 0; j < sig_tab_num; j++) {
				paraName[i]	= paraName[i] + "\t";
			}
		}

		for (i = 0; i < signalName.length; i++) {
			//  -------------------------------------------------------------------------------------
			//	�������Ҫ��ȫ��tab�����������ź�����ǰ���� . (����˼��㳤�ȵ�ʱ��Ҫ+1
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
	//����ʱ�ļ�
	UltraEdit.open("c:\\ue\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	//	-------------------------------------------------------------------------------------
	//	--ref verilog module map
	//	-------------------------------------------------------------------------------------
	if(paraFind == 1){
		//����parameter��map
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
		//û��parameter��map
		//		UltraEdit.activeDocument.write(""+entityName+" inst_"+entityName+" (\r\n");
		UltraEdit.activeDocument.write(""+entityName+" "+entityName+"_inst (\r\n");

		for(i=0;i<signalName.length-1;i++){
			UltraEdit.activeDocument.write("."+signalName[i]+"\t("+signalName[i]+"	),\r\n");
		}
		UltraEdit.activeDocument.write("."+signalName[i]+"\t("+signalName[i]+"	)\r\n");
		UltraEdit.activeDocument.write(");\r\n\r\n");
	}

	//дparameter
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

	//дsignal
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

	//дsignal
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
	//	ref ������������ض���
	//	-------------------------------------------------------------------------------------
	UltraEdit.activeDocument.top();

}//ModuleMap

ModuleMap(0);
