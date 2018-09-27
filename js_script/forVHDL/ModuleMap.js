

//ȥ����ո��tab
function LeftTrimSpace(str){
	var i=0;
	for(i=0;i<str.length;i++){
		if((str.charAt(i)!=" ")&&(str.charAt(i)!="\t"))	break;
	}
	str=str.substring(i,str.length);
	return str;
}
//ȥ���ҿո��tab
function RightTrimSpace(str){
	var i=0;
	for(i=str.length-1;i>=0;i--){
		if((str.charAt(i)!=" ")&&(str.charAt(i)!="\t"))	break;
	}
	str=str.substring(0,i+1);
	return str;
}
//ȥ��ע��
function TrimComment(str){
	var i=0;
	i=str.indexOf("--");
	if(i!=-1)	str=str.substring(0,i);

	return str;
}
//copy�ַ���
function StringCopy(LineNum){
	var str;

	UltraEdit.activeDocument.gotoLine(LineNum,1);
	UltraEdit.activeDocument.selectLine();
	str = UltraEdit.activeDocument.selection;
	return str;
}

//��module name
function search_module(keyword){
	var f_str;
	var f_array=new Array();
	var i;
	var f_line=0;

	for(;;){
		UltraEdit.activeDocument.findReplace.find(keyword);
		if (UltraEdit.activeDocument.isFound()) {
			f_line = UltraEdit.activeDocument.currentLineNum;
			//			UltraEdit.outputWindow.write("f_line is "+f_line+"");
		}
		else{
			UltraEdit.outputWindow.write("No found module word");
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
			if(f_str.indexOf("(")!=-1)	f_str=f_str.substring(0,f_str.indexOf("("));	//ȥ����β�ָ���
			entityName=f_str;
			entityStartNum=f_line;
			UltraEdit.outputWindow.write("entityStartNum is "+entityStartNum+"");
			UltraEdit.outputWindow.write("module name is "+entityName+"");
			break;
		}
	}

}//function search_module

var entityName="";
var entityStartNum,entityEndNum;

function ModuleMap()
{
	//Get user input
	var TotalLine = 1;
	var CurrentLine;
	var GenStartNum;
	var GenEndNum=0;
	var str;
	var ClipArray=new Array();
	var i=0,j=0;
	var strIndex;
	var genSignalName=new Array();
	var genSignalValue=new Array();
	var genSignalType=new Array();
	var signalName=new Array();
	var signalType=new Array();
	var signalNameTrimed=new Array();
	var signalDimenHigh=new Array();
	var signalDimenLow=new Array();
	var signalDimenOrder=new Array();
	var signalDirec=new Array();
	var signalIsVector=new Array();
	var genericFind;

	UltraEdit.activeDocument.top();
	UltraEdit.outputWindow.showWindow(true);

	//����ļ���չ���Ƿ�Ϊvhd
	if (UltraEdit.activeDocument.isExt("vhd")){
		UltraEdit.outputWindow.write("file ext is vhd");
	}
	else{
		UltraEdit.outputWindow.write("file ext is not vhd !!!!!!");
		return;
	}

	UltraEdit.activeDocument.findReplace.matchCase=false;
	UltraEdit.activeDocument.findReplace.matchWord=true;

	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
	UltraEdit.activeDocument.top();

	search_module("entity");


	//�ҵ�һ��end
	UltraEdit.activeDocument.findReplace.find("end");
	if (UltraEdit.activeDocument.isNotFound()) {
		UltraEdit.outputWindow.write("No End Keyword!");
		return;
	}

	//	UltraEdit.activeDocument.gotoLine(entityStartNum,1);
	for(CurrentLine=entityStartNum;CurrentLine<TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		//		str=TrimComment(str);
		str=LeftTrimSpace(str);
		if(str.substring(0,3).toLowerCase()=="end"){
			entityEndNum=CurrentLine;
			break;
		}
	}

	//			//++test
	//			UltraEdit.outputWindow.write("entityName is "+entityName+"");
	//			UltraEdit.outputWindow.write("entityStartNum is "+entityStartNum+"");
	//			UltraEdit.outputWindow.write("entityEndNum is "+entityEndNum+"");
	//			//--test

	//��generic
	GenStartNum=entityStartNum;
	UltraEdit.activeDocument.gotoLine(entityStartNum,1);
	genericFind=0;
	for(;;){
		UltraEdit.activeDocument.findReplace.find("generic");
		if (UltraEdit.activeDocument.isFound()) {
			CurrentLine = UltraEdit.activeDocument.currentLineNum;
			if(CurrentLine>=entityEndNum){
				UltraEdit.outputWindow.write("No generic");
				break;
			}
		}
		else{
			UltraEdit.outputWindow.write("No generic");
			break;
		}
		str=StringCopy(CurrentLine);
		str=LeftTrimSpace(str);
		if(str.substring(0,7).toLowerCase()=="generic"){
			genericFind=1;
			GenStartNum=CurrentLine;
			break;
		}
	}

	//		//test++
	//		UltraEdit.outputWindow.write("genericFind is "+genericFind+"");
	//		UltraEdit.outputWindow.write("GenStartNum is "+GenStartNum+"");
	//		UltraEdit.outputWindow.write("GenEndNum is "+GenEndNum+"");
	//		//test--

	//��generic�Ľ�����
	GenEndNum=0;
	if(genericFind==1){
		UltraEdit.activeDocument.gotoLine(GenStartNum,1);
		for(CurrentLine=GenStartNum;CurrentLine<entityEndNum-1;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			str=LeftTrimSpace(str);
			str=RightTrimSpace(str);
			str=str.replace(/\t/g," ");
			//++test
			UltraEdit.outputWindow.write("generic Str is "+str+"");
			//--test
			ClipArray=str.split(" ");
			for(i=0;i<ClipArray.length;i++){
				ClipArray[i]=ClipArray[i].toLowerCase();
				//++test
				UltraEdit.outputWindow.write("generic Clip["+i+"] is "+ClipArray[i]+"");
				//--test
				if(ClipArray[i].substring(0,4)=="port"){
					GenEndNum=CurrentLine-1;
					UltraEdit.outputWindow.write("generic Clip break");
					break;
				}
			}
			if(GenEndNum!==0){
				break;
			}
		}
	}
	else{
		GenEndNum=entityStartNum;
	}


	if(CurrentLine==entityEndNum-1)
	{
		UltraEdit.outputWindow.write("No end keyword matches to generic!");
		return;
	}

	//	//++test
	//	UltraEdit.outputWindow.write("genericFind is "+genericFind+"");
	//	UltraEdit.outputWindow.write("GenStartNum is "+GenStartNum+"");
	//	UltraEdit.outputWindow.write("GenEndNum is "+GenEndNum+"");
	//	//--test

	//��generic�е���Ϣ
	j=0;
	if(genericFind==1){
		for(CurrentLine=GenStartNum;CurrentLine<=GenEndNum;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(str.indexOf(":")==-1) continue;					//�Ƿ����":",˵����signal��Ϣ
			//����":"˵����signal��Ϣ
			ClipArray=str.split(":");				//�� : ��generic�����ֿ� ����� 3 ���� ���� 2����
			str=ClipArray[0];							//��һ������signalName
			if(str.indexOf("(")!=-1){							//�Ƿ����"("
				str=str.substring(str.indexOf("(")+1,str.length);
			}
			str=RightTrimSpace(str);
			str=LeftTrimSpace(str);
			genSignalName[j]=str;

			str=ClipArray[1];							//��һ������signalType
			//������һ���ź�û��value��Ϣ�����Һͽ�����)��һ�У���Ҫȥ��������
			if(str.indexOf("(")!=-1){				//����(���ţ���ô����λ��Ӧ����)���Ŵ�
				str=str.substring(0,str.indexOf(")")+1);
				genSignalType[j]=str;
			}
			else{											//value�в�����(���ţ��ж��Ƿ���)����
				if(str.indexOf(")")!=-1){			//����)���ţ�˵��)���ž��ǽ�����
					str=str.substring(0,str.indexOf(")"));
					str=RightTrimSpace(str);
					str=LeftTrimSpace(str);
					genSignalType[j]=str;
				}
				else{										//������)���ţ������Ƿ��лس���
					if(str.indexOf("\r\n")!=-1){
						str=str.substring(0,str.indexOf("\r\n"));	//ȥ�����һ��signal�Ļس���
					}
					str=RightTrimSpace(str);
					str=LeftTrimSpace(str);
					genSignalType[j]=str;
				}
			}

			if(ClipArray.length==3){
				str=ClipArray[2];
				str=str.substring(str.indexOf("=")+1,str.length);	//ȥ����ʼ��=
				if(str.indexOf(";")!=-1){									//ȥ����β�Ľ�����
					str=str.substring(0,str.indexOf(";"));
				}
				//���generic�Ľ�����)�����һ���ź���һ�У���Ҫȥ��������
				if(str.indexOf("(")!=-1){									//���value����(),��ôvalue�ڵ�һ��)������
					str=str.substring(0,str.indexOf(")")+1);
					str=RightTrimSpace(str);
					str=LeftTrimSpace(str);
					genSignalValue[j]=str;
				}
				else{																//���value��û��(),��ôҪ�����β�Ƿ���)
					if(str.indexOf(")")!=-1){
						str=str.substring(0,str.indexOf(")"));
						str=RightTrimSpace(str);
						str=LeftTrimSpace(str);
						genSignalValue[j]=str;
					}
					else{
						if(str.indexOf("\r\n")!=-1){
							str=str.substring(0,str.indexOf("\r\n"));	//������)���ţ������Ƿ��лس���
						}
						str=RightTrimSpace(str);
						str=LeftTrimSpace(str);
						genSignalValue[j]=str;
					}
				}
			}
			else{
				genSignalValue[j]="null";
			}
			//ȥ����β�ֺź�����
			j++;
		}
	}

	//	//++test
	//	for(i=0;i<genSignalType.length;i++){
	//		UltraEdit.outputWindow.write("genSignalName "+i+" is "+genSignalName[i]+"");
	//		UltraEdit.outputWindow.write("genSignalType "+i+" is "+genSignalType[i]+"");
	//		UltraEdit.outputWindow.write("genSignalValue "+i+" is "+genSignalValue[i]+"");
	//	}
	//	//--test

	//����signal
	j=0;
	for(CurrentLine=GenEndNum+1;CurrentLine<entityEndNum;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=TrimComment(str);
		if(str.indexOf(":")!=-1){
			str=LeftTrimSpace(str);
			strIndex=str.indexOf(":");
			signalName[j]=str.substring(0,strIndex);
			//		signalNameTrimed[j]=RightTrimSpace(signalName[j]);
			signalType[j]=str.substring(strIndex+1,str.length);
			if(signalType[j].indexOf(":")!=-1){			//signalType�л�����:���ţ�˵���ڶ˿������ϸ����˳�ʼ�����
				signalType[j]=signalType[j].substring(0,signalType[j].indexOf(":"));
			}
			signalType[j]=RightTrimSpace(signalType[j]);

			//�����һ��signal��port��ͬһ�У���ô��Ҫȥ��port
			strIndex=signalName[j].indexOf("(");
			signalName[j]=signalName[j].substring(strIndex+1,str.length);
			signalName[j]=LeftTrimSpace(signalName[j]);
			signalNameTrimed[j]=RightTrimSpace(signalName[j]);

			//		UltraEdit.outputWindow.write("process signal str"+j+" is "+str+"");
			//		UltraEdit.outputWindow.write("process signal signalName"+j+" is "+signalName[j]+"");
			//		UltraEdit.outputWindow.write("process signal signalType"+j+" is "+signalType[j]+"");

			signalType[j]=signalType[j].toLowerCase();
			strIndex=signalType[j].indexOf("inout");
			if(strIndex===-1){							//������inout
				strIndex=signalType[j].indexOf("in");
				if(strIndex===-1){						//������out
					signalDirec[j]="out";
					strIndex=signalType[j].indexOf("out");	//�Ǳض�����inout
					signalType[j]=signalType[j].substring(strIndex+3,str.length);
				}
				else{
					signalDirec[j]="in";
					signalType[j]=signalType[j].substring(strIndex+2,str.length);
				}
			}
			else{
				signalDirec[j]="inout";
				signalType[j]=signalType[j].substring(strIndex+5,str.length);
			}

			signalType[j]=LeftTrimSpace(signalType[j]);
			str=signalType[j];
			if(str.indexOf("(")!=-1){
				signalIsVector[j]="v";
				str=str.substring(str.indexOf("(")+1,str.indexOf(")"));
				if(str.indexOf("downto")!=-1){
					ClipArray=str.split("downto");
					signalDimenHigh[j]=ClipArray[0];
					signalDimenLow[j]=ClipArray[1];
					signalDimenOrder[j]="downto";
				}
				else{
					ClipArray=str.split("to");
					signalDimenHigh[j]=ClipArray[1];
					signalDimenLow[j]=ClipArray[0];
					signalDimenOrder[j]="to";
				}//if(str.indexOf("downto")!=-1)


				strIndex=signalType[j].indexOf(")");
				signalType[j]=signalType[j].substring(0,strIndex+1);
				signalType[j]=RightTrimSpace(signalType[j]);

			}//if(str.indexOf("(")!=-1)
			else{
				signalIsVector[j]="s";

				strIndex=str.indexOf(")");
				if(strIndex!=-1){
					signalType[j]=str.substring(0,strIndex);
					signalType[j]=RightTrimSpace(signalType[j]);
				}
				else{
					if(signalType[j].indexOf(";")!=-1)	signalType[j]=signalType[j].substring(0,signalType[j].indexOf(";"));//ȥ����β�ķֺ�
					if(signalType[j].indexOf("\r\n")!=-1)	signalType[j]=signalType[j].substring(0,signalType[j].indexOf("\r\n"));//ȥ����β�Ļس�
				}

			}
			j++;
		}
	}



	//	//++test
	//	for(i=0;i<signalType.length;i++){
	//		UltraEdit.outputWindow.write("signalName "+i+" is "+signalName[i]+"");
	//		UltraEdit.outputWindow.write("signalType "+i+" is "+signalType[i]+"");
	//		UltraEdit.outputWindow.write("signalDirec "+i+" is "+signalDirec[i]+"");
	//		UltraEdit.outputWindow.write("signalNameTrimed "+i+" is "+signalNameTrimed[i]+"");
	//		UltraEdit.outputWindow.write("signalIsVector "+i+" is "+signalIsVector[i]+"");
	//		UltraEdit.outputWindow.write("signalDimenHigh "+i+" is "+signalDimenHigh[i]+"");
	//		UltraEdit.outputWindow.write("signalDimenLow "+i+" is "+signalDimenLow[i]+"");
	//		UltraEdit.outputWindow.write("signalDimenOrder "+i+" is "+signalDimenOrder[i]+"");
	//	}
	//	//--test

	//����ʱ�ļ�
	UltraEdit.open("F:\\test\\UE_TMP.vhd");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();
	//VHDL map
	//COMPONENT
	//component generic
	UltraEdit.activeDocument.write("component "+entityName+"\r\n");
	if(genericFind==1){
		UltraEdit.activeDocument.write("	generic(\r\n");
		//test++
		//UltraEdit.outputWindow.write("genSignalName.length is "+genSignalName.length+"");
		//test--
		for(i=0;i<genSignalName.length-1;i++){
			if(genSignalValue[i]!="null"){
				UltraEdit.activeDocument.write("	"+genSignalName[i]+" : "+genSignalType[i]+" := "+genSignalValue[i]+";\r\n");
			}
			else{
				UltraEdit.activeDocument.write("	"+genSignalName[i]+" : "+genSignalType[i]+";\r\n");
			}

		}//for(i=0;i<genSignalName.length;i++)
		if(genSignalValue[i]!="null"){
			UltraEdit.activeDocument.write("	"+genSignalName[i]+" : "+genSignalType[i]+" := "+genSignalValue[i]+"\r\n");
		}
		else{
			UltraEdit.activeDocument.write("	"+genSignalName[i]+" : "+genSignalType[i]+"\r\n");
		}
		UltraEdit.activeDocument.write("	);\r\n");
	}//if(genericFind==1)
	//component port
	UltraEdit.activeDocument.write("	port(\r\n");
	for(i=0;i<signalName.length-1;i++){
		UltraEdit.activeDocument.write("	"+signalName[i]+": "+signalDirec[i]+"\t"+signalType[i]+";\r\n");
	}
	UltraEdit.activeDocument.write("	"+signalName[i]+": "+signalDirec[i]+"\t"+signalType[i]+"\r\n");
	UltraEdit.activeDocument.write("	);\r\n");
	UltraEdit.activeDocument.write("end component;\r\n\r\n");

	//дMAP
	UltraEdit.activeDocument.write("inst_"+entityName+" : "+entityName+"\r\n");
	//generic map
	if(genericFind==1){
		UltraEdit.activeDocument.write("generic map(\r\n");
		for(i=0;i<genSignalName.length-1;i++){
			UltraEdit.activeDocument.write(""+genSignalName[i]+"\t=> "+genSignalValue[i]+",\r\n");
		}
		UltraEdit.activeDocument.write(""+genSignalName[i]+"\t=> "+genSignalValue[i]+"\r\n");
		UltraEdit.activeDocument.write(")\r\n");
	}
	//port map
	UltraEdit.activeDocument.write("port map(\r\n");
	for(i=0;i<signalName.length-1;i++){
		UltraEdit.activeDocument.write(""+signalName[i]+"=> "+signalNameTrimed[i]+",\r\n");
	}
	UltraEdit.activeDocument.write(""+signalName[i]+"=> "+signalNameTrimed[i]+"\r\n");
	UltraEdit.activeDocument.write(");\r\n\r\n");

	//дsignal
	for(i=0;i<signalName.length;i++){
		if(signalIsVector[i]=="v")	str=" := (others=>'0');";
		else str=" := '0';";
			UltraEdit.activeDocument.write("signal "+signalName[i]+": "+signalType[i]+""+str+"\r\n");
		}

		//Verilog MAP
		//дMAPͷ û��generic
		if(genericFind===0){
			UltraEdit.activeDocument.write("\r\n\r\n");
			UltraEdit.activeDocument.write(""+entityName+" inst_"+entityName+"(\r\n");
		}

		//дMAPͷ ��generic
		else{
			UltraEdit.activeDocument.write("\r\n\r\n");
			UltraEdit.activeDocument.write(""+entityName+" #\r\n");
			UltraEdit.activeDocument.write("(\r\n");
			for(i=0;i<genSignalName.length-1;i++){
				UltraEdit.activeDocument.write("."+genSignalName[i]+"("+genSignalValue[i]+"),\r\n");
			}
			UltraEdit.activeDocument.write("."+genSignalName[i]+"("+genSignalValue[i]+")\r\n");
			UltraEdit.activeDocument.write(")\r\n");
			UltraEdit.activeDocument.write("inst_"+entityName+"\r\n");
			UltraEdit.activeDocument.write("(\r\n");
		}

		//дMAP�е�ӳ����Ϣ
		for(i=0;i<signalName.length-1;i++){
			UltraEdit.activeDocument.write("."+signalName[i]+"("+signalNameTrimed[i]+"),\r\n");
		}
		UltraEdit.activeDocument.write("."+signalName[i]+"("+signalNameTrimed[i]+")\r\n");
		UltraEdit.activeDocument.write(");\r\n\r\n");

		//дsignal
		for(i=0;i<signalName.length;i++){
			//�ж��Ƿ���vector
			if(signalIsVector[i]=="s"){
				str="";
				strIndex="1";
			}
			else{
				if(signalDimenOrder[i]=="downto")	str=" ["+signalDimenHigh[i]+":"+signalDimenLow[i]+"]";
				else	str=" ["+signalDimenLow[i]+":"+signalDimenHigh[i]+"]";
					strIndex=parseFloat(signalDimenHigh[i])+1;
				}
				//�����˿ڵ������������
				if((signalDirec[i]=="in") || (signalDirec[i]=="inout")){
					signalType[i]="reg";
				}
				else{
					signalType[i]="wire";
				}
				UltraEdit.activeDocument.write(""+signalType[i]+""+str+" "+signalName[i]+"\t= "+strIndex+"'b0;\r\n");
			}

			UltraEdit.activeDocument.selectAll();
			UltraEdit.activeDocument.copy();
			UltraEdit.activeDocument.bottom();
			UltraEdit.save();
			UltraEdit.selectClipboard(0);
		}

		ModuleMap();
