
//��ȡfile name
function getFileName (DEBUG) {
	var full_path;
	var name_extend;
	var file_name;
	var pos;

	full_path = UltraEdit.activeDocument.path;

	if(full_path===""){
		//		UltraEdit.outputWindow.write("file name is null");
		file_name="";
		return file_name;
	}

	if(full_path.indexOf("\\")==-1){
		//		UltraEdit.outputWindow.write("file name is null");
		file_name="";
		return file_name;
	}

	pos = full_path.lastIndexOf("\\");
	name_extend = full_path.substring(pos+1);

	if(name_extend.lastIndexOf(".")!=-1) {
		file_name = name_extend.substring(0,name_extend.lastIndexOf("."));
	}
	else {
		file_name = name_extend;
	}

	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("file name is "+file_name+"");
	}
	return file_name;
}


//��ȡfile path
function getFilePath (DEBUG) {
	var full_path;
	var file_path;
	var pos;

	full_path = UltraEdit.activeDocument.path;

	if(full_path===""){
		file_path="";
		return file_path;
	}

	pos = full_path.lastIndexOf("\\");
	file_path = full_path.substring(0,pos);

	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("file path is "+file_path+"");
	}

	return file_path;
}

//��ȡfile extend
function getFileExtend (DEBUG) {
	var full_path;
	var name_extend;
	var file_extend;
	var pos;

	full_path = UltraEdit.activeDocument.path;

	if(full_path===""){
		file_extend="";
		return file_extend;
	}

	if(full_path.indexOf("\\")==-1){
		file_extend="";
		return file_extend;
	}

	pos = full_path.lastIndexOf("\\");
	name_extend = full_path.substring(pos+1);

	if(name_extend.lastIndexOf(".")!=-1) {
		file_extend = name_extend.substring(name_extend.lastIndexOf(".")+1);
	}
	else {
		file_extend = "";
	}

	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("file extend is "+file_extend+"");
	}
	return file_extend;
}



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
	i=str.indexOf("//");
	if(i!=-1)	str=str.substring(0,i);

	return str;
}

//ȥ��ע��
function TrimCommentSharp(str){
	var i=0;
	i=str.indexOf("#");
	if(i!=-1)	str=str.substring(0,i);

	return str;
}

//ȥ����β�س���
function TrimEOL(str){
	if(str.indexOf("\r\n")!=-1)	str=str.substring(0,str.indexOf("\r\n"));	//ȥ����β�س���
	if(str.indexOf("\n")!=-1)	str=str.substring(0,str.indexOf("\n"));		//ȥ����β�س���
	if(str.indexOf("\r")!=-1)	str=str.substring(0,str.indexOf("\r"));		//ȥ����β�س���
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

//ɾ����ǰ����
function DeltLine(LineNum){
	UltraEdit.activeDocument.gotoLine(LineNum,1);
	UltraEdit.activeDocument.deleteLine();
	return 0;
}

//ȥ���ؼ���
function TrimKeywords(str){
	var strArray=new Array();
	//	UltraEdit.outputWindow.write("str is "+str+"");
	for(;;){
		str=LeftTrimSpace(str);			//ȥ�����׵Ŀ��ַ�
		if(str.charAt(0)=="."){
			str=str.substring(1,str.length);
		}else if(str.charAt(0)=="["){
			str=str.substring(1,str.length);
		}else if(str.charAt(0)==":"){
			str=str.substring(1,str.length);
		}

		str=LeftTrimSpace(str);			//ȥ�����׵Ŀ��ַ�
		str=str.replace(/\t/g," ");		//���ַ����еĿ��ַ�ת��Ϊ�ո�
		strArray=str.split(" ");
		strArray[0]=strArray[0].toLowerCase();
		if(strArray[0]=="wire"){
			str=str.substring(4,str.length);
		}else if(strArray[0]=="reg"){
			str=str.substring(3,str.length);
		}else if(strArray[0]=="integer"){
			str=str.substring(7,str.length);
		}else if(strArray[0]=="parameter"){
			str=str.substring(9,str.length);
		}else if(strArray[0]=="input"){
			str=str.substring(5,str.length);
		}else if(strArray[0]=="output"){
			str=str.substring(6,str.length);
		}else if(strArray[0]=="inout"){
			str=str.substring(5,str.length);

		}else if(strArray[0]=="assign"){
			str=str.substring(6,str.length);
		}else if(strArray[0]=="always"){
			str=str.substring(6,str.length);
		}else if(strArray[0]=="task"){
			str=str.substring(4,str.length);
		}else if(strArray[0]=="begin"){
			str=str.substring(5,str.length);
		}else if(strArray[0]=="end"){
			str=str.substring(3,str.length);
		}else{
			str=LeftTrimSpace(str);			//ȥ�����׵Ŀ��ַ�
			break;
		}
	}

	return str;
}


//��ʱ
function cnWait (second){
	var startTime,endTimes,s;
	var d=new Date();

	startTime=d.getTime();
	while(true){
		d=new Date();
		endTime=d.getTime();
		//		s = (endTime-startTime)/1000;
		s = (endTime-startTime)/10;
		if (s >= second)
		break;
	}

}



//UCFGetNetName
//UCFGetLocValue
//NET "mcb1_dram_dq<4>" LOC = J14;
//NET	"iv_pix_data[9]"		LOC = M11	| IOSTANDARD = "LVCMOS33";	#S_DIFF_N0

function UCFGetNetName (str) {
	var NetName		= 0;
	var ClipArray	= new Array();
	var i	= 0;


	if (str.indexOf("NET")==-1) {
		NetName	= "no_define";
	}
	else {
		NetName	= str.substring(str.indexOf("NET")+3,str.length);
		NetName	= LeftTrimSpace(NetName);
		NetName	= NetName.replace(/\t/g," ");
		ClipArray	= NetName.split(" ");
		NetName	= ClipArray[0];
		NetName	= RightTrimSpace(NetName);
		if(NetName.charAt(0)=="\"")		NetName=NetName.substring(1,NetName.length);
		if(NetName.charAt(NetName.length-1)=="\"")	NetName=NetName.substring(0,NetName.length-1);
	}

	NetName	= NetName.replace(/</,"[");
	NetName	= NetName.replace(/>/,"]");
	return NetName;
}

function UCFGetLocValue (str) {
	var LocValue		= 0;
	var ClipArray	= new Array();

	if (str.indexOf("LOC")==-1) {
		LocValue	= "no_define";
	}
	else {
		LocValue	= str.substring(str.indexOf("LOC")+3,str.length);
		LocValue	= str.substring(str.indexOf("=")+1,str.length);
		LocValue	= str.substring(str.indexOf("=")+1,str.length);
		if(LocValue.indexOf(";")!=-1)	LocValue	= LocValue.substring(0,LocValue.indexOf(";"));		//ȥ��loc��ķֺ�
		if(LocValue.indexOf("|")!=-1)	LocValue	= LocValue.substring(0,LocValue.indexOf("|"));		//ȥ��loc��� |

		LocValue	= LeftTrimSpace(LocValue);
		LocValue	= LocValue.replace(/\t/g," ");
		ClipArray	= LocValue.split(" ");
		LocValue	= ClipArray[0];
		LocValue	= RightTrimSpace(LocValue);
		if(LocValue.charAt(0)=="\"")	LocValue=LocValue.substring(1,LocValue.length);
		if(LocValue.charAt(LocValue.length)=="\"")	LocValue=LocValue.substring(0,LocValue.length-1);
	}
	return LocValue;
}



//function OpenModule(DEBUG){
//
//	if (DEBUG==1) {
//		UltraEdit.outputWindow.showWindow(true);
//		UltraEdit.outputWindow.write("now in OpenModule");
//		UltraEdit.outputWindow.write("clipboardContent is "+UltraEdit.clipboardContent+"");
//	}
//
//	UltraEdit.activeDocument.selectWord();
//	UltraEdit.runTool("open_module");
//}


function OpenModule (DEBUG) {
	UltraEdit.activeDocument.selectWord();
	var	onlyname	= UltraEdit.activeDocument.selection;
	var	onlypath	= getFilePath(0);
	var	onlyext		= getFileExtend(0);
	var	name_ext	= onlyname+"."+onlyext;

	if (onlypath.match(/\\$/) === null) onlypath += "\\";
	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("now in OpenModule");
		UltraEdit.outputWindow.write("name_ext is "+name_ext+"");
		UltraEdit.outputWindow.write("onlypath is "+onlypath+"");
	}
	OpenModuleCore(0,onlypath,name_ext);
}

function OpenModuleCore(DEBUG,onlypath,name_ext){

	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("now in OpenModuleCore");
	}

	UltraEdit.ueReOn();
	UltraEdit.frInFiles.searchSubs=true;
	UltraEdit.frInFiles.unicodeSearch=false;
	UltraEdit.frInFiles.useOutputWindow=false;
	UltraEdit.frInFiles.openMatchingFiles=false;
	UltraEdit.frInFiles.filesToSearch=0;
	UltraEdit.frInFiles.matchCase=false;
	UltraEdit.frInFiles.matchWord=false;
	UltraEdit.frInFiles.regExp=false;
	UltraEdit.frInFiles.searchInFilesTypes=name_ext;

	var path_array=new Array();
	var found	= false;

	//����Ŀ¼����Ŀ¼
	path_array[0]	= onlypath;

//	//�ϼ�Ŀ¼��src��Ŀ¼
//	path_array[1]	= onlypath;
//	path_array[1]	= path_array[1].substring(0,path_array[1].lastIndexOf("\\"));
//	path_array[1]	= path_array[1].substring(0,path_array[1].lastIndexOf("\\")+1);
//	path_array[1]	= path_array[1]+"src\\";
//
//	//�ϼ�Ŀ¼��testbench��Ŀ¼
//	path_array[2]	= onlypath;
//	path_array[2]	= path_array[2].substring(0,path_array[2].lastIndexOf("\\"));
//	path_array[2]	= path_array[2].substring(0,path_array[2].lastIndexOf("\\")+1);
//	path_array[2]	= path_array[2]+"testbench\\";

	//��1��Ŀ¼
	path_array[1]	= onlypath;
	path_array[1]	= path_array[1].substring(0,path_array[1].lastIndexOf("\\"));
	path_array[1]	= path_array[1].substring(0,path_array[1].lastIndexOf("\\")+1);

	//��2��Ŀ¼
	path_array[2]	= path_array[1];
	path_array[2]	= path_array[2].substring(0,path_array[2].lastIndexOf("\\"));
	path_array[2]	= path_array[2].substring(0,path_array[2].lastIndexOf("\\")+1);

	//����Ŀ¼�������
//	path_array[3]	= "D:\\Tools\\Xilinx\\14.7\\ISE_DS\\ISE\\verilog\\src\\";
	path_array[3]	= "D:\\tools\\Xilinx\\Vivado\\2017.3\\data\\verilog\\src\\unisims\\";
	path_array[4]	= "D:\\tools\\Xilinx\\Vivado\\2017.3\\data\\verilog\\src\\xeclib\\";
	path_array[5]	= "D:\\tools\\Xilinx\\Vivado\\2017.3\\data\\verilog\\src\\unimacro\\";
	path_array[6]	= "D:\\tools\\Xilinx\\Vivado\\2017.3\\data\\verilog\\src\\retarget\\";
	path_array[7]	= "D:\\tools\\Xilinx\\Vivado\\2017.3\\data\\verilog\\src\\unifast\\";



	for (var search_num = 0; search_num < path_array.length; search_num++) {
		UltraEdit.frInFiles.directoryStart=path_array[search_num];
		UltraEdit.frInFiles.find("");
		UltraEdit.activeDocument.bottom();
		if (UltraEdit.activeDocument.currentLineNum > 2) {
			file_path	= StringCopy(1);
			file_path	= TrimEOL(file_path);
			UltraEdit.closeFile("** ���ҽ�� ** ",0);
			UltraEdit.open(file_path);
			found	= true;
			break;
		}
		else {
			UltraEdit.closeFile("** ���ҽ�� ** ",0);
		}
	}
	return	found;
}

function FindCopy ( DEBUG ) {
	var str = 0 ;

	str = UltraEdit.clipboardContent;

	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("now in FindCopy");
		UltraEdit.outputWindow.write("str is "+str+"");
	}

	UltraEdit.activeDocument.findReplace.matchWord = true;
	UltraEdit.activeDocument.top();
	UltraEdit.activeDocument.findReplace.find(""+str+"");
}