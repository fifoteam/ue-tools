

//去除左空格和tab
function LeftTrimSpace(str){
	var i=0;
	for(i=0;i<str.length;i++){
		if((str.charAt(i)!=" ")&&(str.charAt(i)!="\t"))	break;
	}
	str=str.substring(i,str.length);
	return str;
}
//去除右空格和tab
function RightTrimSpace(str){
	var i=0;
	for(i=str.length-1;i>=0;i--){
		if((str.charAt(i)!=" ")&&(str.charAt(i)!="\t"))	break;
	}
	str=str.substring(0,i+1);
	return str;
}
//去除注释
function TrimComment(str){
	var i=0;
	i=str.indexOf("--");
	if(i!=-1)	str=str.substring(0,i);

	return str;
}
//copy字符串
function StringCopy(LineNum){
	var str;

	UltraEdit.activeDocument.gotoLine(LineNum,1);
	UltraEdit.activeDocument.selectLine();
	str = UltraEdit.activeDocument.selection;
	return str;
}

//找module name
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
			if(f_str.indexOf("\r\n")!=-1)	f_str=f_str.substring(0,f_str.indexOf("\r\n"));	//去除行尾回车符
			if(f_str.indexOf("(")!=-1)	f_str=f_str.substring(0,f_str.indexOf("("));	//去除行尾分隔符
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

	//检查文件扩展名是否为vhd
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


	//找第一个end
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

	//找generic
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

	//找generic的结束符
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

	//找generic中的信息
	j=0;
	if(genericFind==1){
		for(CurrentLine=GenStartNum;CurrentLine<=GenEndNum;CurrentLine++){
			str=StringCopy(CurrentLine);
			str=TrimComment(str);
			if(str.indexOf(":")==-1) continue;					//是否存在":",说明有signal信息
			//存在":"说明有signal信息
			ClipArray=str.split(":");				//用 : 将generic的语句分开 ，最多 3 部分 最少 2部分
			str=ClipArray[0];							//第一部分是signalName
			if(str.indexOf("(")!=-1){							//是否存在"("
				str=str.substring(str.indexOf("(")+1,str.length);
			}
			str=RightTrimSpace(str);
			str=LeftTrimSpace(str);
			genSignalName[j]=str;

			str=ClipArray[1];							//第一部分是signalType
			//如果最后一个信号没有value信息，而且和结束符)在一行，需要去掉结束符
			if(str.indexOf("(")!=-1){				//存在(符号，那么结束位置应该在)符号处
				str=str.substring(0,str.indexOf(")")+1);
				genSignalType[j]=str;
			}
			else{											//value中不存在(符号，判断是否有)符号
				if(str.indexOf(")")!=-1){			//存在)符号，说明)符号就是结束符
					str=str.substring(0,str.indexOf(")"));
					str=RightTrimSpace(str);
					str=LeftTrimSpace(str);
					genSignalType[j]=str;
				}
				else{										//不存在)符号，看看是否有回车符
					if(str.indexOf("\r\n")!=-1){
						str=str.substring(0,str.indexOf("\r\n"));	//去掉最后一个signal的回车符
					}
					str=RightTrimSpace(str);
					str=LeftTrimSpace(str);
					genSignalType[j]=str;
				}
			}

			if(ClipArray.length==3){
				str=ClipArray[2];
				str=str.substring(str.indexOf("=")+1,str.length);	//去掉开始的=
				if(str.indexOf(";")!=-1){									//去掉行尾的结束符
					str=str.substring(0,str.indexOf(";"));
				}
				//如果generic的结束符)与最后一个信号在一行，需要去掉结束符
				if(str.indexOf("(")!=-1){									//如果value中有(),那么value在第一个)处结束
					str=str.substring(0,str.indexOf(")")+1);
					str=RightTrimSpace(str);
					str=LeftTrimSpace(str);
					genSignalValue[j]=str;
				}
				else{																//如果value中没有(),那么要检查行尾是否有)
					if(str.indexOf(")")!=-1){
						str=str.substring(0,str.indexOf(")"));
						str=RightTrimSpace(str);
						str=LeftTrimSpace(str);
						genSignalValue[j]=str;
					}
					else{
						if(str.indexOf("\r\n")!=-1){
							str=str.substring(0,str.indexOf("\r\n"));	//不存在)符号，看看是否有回车符
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
			//去掉行尾分号和括号
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

	//处理signal
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
			if(signalType[j].indexOf(":")!=-1){			//signalType中还存在:符号，说明在端口声明上附加了初始化语句
				signalType[j]=signalType[j].substring(0,signalType[j].indexOf(":"));
			}
			signalType[j]=RightTrimSpace(signalType[j]);

			//如果第一个signal和port在同一行，那么就要去掉port
			strIndex=signalName[j].indexOf("(");
			signalName[j]=signalName[j].substring(strIndex+1,str.length);
			signalName[j]=LeftTrimSpace(signalName[j]);
			signalNameTrimed[j]=RightTrimSpace(signalName[j]);

			//		UltraEdit.outputWindow.write("process signal str"+j+" is "+str+"");
			//		UltraEdit.outputWindow.write("process signal signalName"+j+" is "+signalName[j]+"");
			//		UltraEdit.outputWindow.write("process signal signalType"+j+" is "+signalType[j]+"");

			signalType[j]=signalType[j].toLowerCase();
			strIndex=signalType[j].indexOf("inout");
			if(strIndex===-1){							//不包含inout
				strIndex=signalType[j].indexOf("in");
				if(strIndex===-1){						//不包含out
					signalDirec[j]="out";
					strIndex=signalType[j].indexOf("out");	//那必定包含inout
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
					if(signalType[j].indexOf(";")!=-1)	signalType[j]=signalType[j].substring(0,signalType[j].indexOf(";"));//去掉行尾的分号
					if(signalType[j].indexOf("\r\n")!=-1)	signalType[j]=signalType[j].substring(0,signalType[j].indexOf("\r\n"));//去掉行尾的回车
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

	//打开临时文件
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

	//写MAP
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

	//写signal
	for(i=0;i<signalName.length;i++){
		if(signalIsVector[i]=="v")	str=" := (others=>'0');";
		else str=" := '0';";
			UltraEdit.activeDocument.write("signal "+signalName[i]+": "+signalType[i]+""+str+"\r\n");
		}

		//Verilog MAP
		//写MAP头 没有generic
		if(genericFind===0){
			UltraEdit.activeDocument.write("\r\n\r\n");
			UltraEdit.activeDocument.write(""+entityName+" inst_"+entityName+"(\r\n");
		}

		//写MAP头 有generic
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

		//写MAP中的映射信息
		for(i=0;i<signalName.length-1;i++){
			UltraEdit.activeDocument.write("."+signalName[i]+"("+signalNameTrimed[i]+"),\r\n");
		}
		UltraEdit.activeDocument.write("."+signalName[i]+"("+signalNameTrimed[i]+")\r\n");
		UltraEdit.activeDocument.write(");\r\n\r\n");

		//写signal
		for(i=0;i<signalName.length;i++){
			//判断是否是vector
			if(signalIsVector[i]=="s"){
				str="";
				strIndex="1";
			}
			else{
				if(signalDimenOrder[i]=="downto")	str=" ["+signalDimenHigh[i]+":"+signalDimenLow[i]+"]";
				else	str=" ["+signalDimenLow[i]+":"+signalDimenHigh[i]+"]";
					strIndex=parseFloat(signalDimenHigh[i])+1;
				}
				//解析端口的输入输出属性
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
