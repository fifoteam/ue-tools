
// include subfunction.js

function FindInside(DEBUG){

	var line_num		= 0 ;
	var CurrentLine		= 0 ;
	var str				= 0 ;
	var	module_name		= 0;
	var	col_pos			= 0;

	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
	}

	UltraEdit.activeDocument.selectWord();
	UltraEdit.clipboardContent = UltraEdit.activeDocument.selection;
	line_num = UltraEdit.activeDocument.currentLineNum;
	if (DEBUG==1)	UltraEdit.outputWindow.write("clipboardContent is "+UltraEdit.clipboardContent+"");
	if (DEBUG==1)	UltraEdit.outputWindow.write("line_num is "+line_num+"");

	//  -------------------------------------------------------------------------------------
	//	���ϲ��� module name
	//  -------------------------------------------------------------------------------------
	for (CurrentLine = line_num; CurrentLine >= 1; CurrentLine--) {
		// code to be executed
		str=StringCopy(CurrentLine);
		module_name	= str;
		if (DEBUG==1)	UltraEdit.outputWindow.write("module_name is "+module_name+"");

		//  -------------------------------------------------------------------------------------
		//	ȥ���س���ע��
		//  -------------------------------------------------------------------------------------
		if(module_name.indexOf("\r\n")!=-1){
			module_name=module_name.substring(0,module_name.indexOf("\r\n"));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim rn.module_name is "+module_name+"");
		}
		if(module_name.indexOf("\n")!=-1){
			module_name=module_name.substring(0,module_name.indexOf("\n"));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim n.module_name is "+module_name+"");
		}
		module_name=TrimComment(module_name);
		module_name=LeftTrimSpace(module_name);
		if (DEBUG==1)	UltraEdit.outputWindow.write("after trim com.module_name is "+module_name+"");
		//  -------------------------------------------------------------------------------------
		//	ȥ�� ���ź� #
		//  -------------------------------------------------------------------------------------
		if(module_name.indexOf("(")!=-1){
			module_name=module_name.substring(0,module_name.indexOf("("));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim (.module_name is "+module_name+"");
		}
		if(module_name.indexOf(")")!=-1){
			module_name=module_name.substring(0,module_name.indexOf(")"));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim ).module_name is "+module_name+"");
		}
		if(module_name.indexOf("#")!=-1){
			module_name=module_name.substring(0,module_name.indexOf("#"));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim #.module_name is "+module_name+"");
		}

		//  -------------------------------------------------------------------------------------
		//	ȥ�� ���ź� .
		//  -------------------------------------------------------------------------------------
		if(module_name.indexOf(".")!=-1){
			module_name=module_name.substring(0,module_name.indexOf("."));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim ..module_name is "+module_name+"");
		}

		//  -------------------------------------------------------------------------------------
		//	ȥ�����ߵĿ��ַ��������м�Ŀ��ַ�
		//  -------------------------------------------------------------------------------------
		module_name=RightTrimSpace(module_name);
		module_name=LeftTrimSpace(module_name);

		//  -------------------------------------------------------------------------------------
		//	ȥ�� �ַ����м�Ŀ��ַ�
		//  -------------------------------------------------------------------------------------
		if(module_name.indexOf(" ")!=-1){
			module_name=module_name.substring(0,module_name.indexOf(" "));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim mid space.module_name is "+module_name+"");
		}

		if(module_name.indexOf("\t")!=-1){
			module_name=module_name.substring(0,module_name.indexOf("\t"));
			if (DEBUG==1)	UltraEdit.outputWindow.write("after trim mid table.module_name is "+module_name+"");
		}

		//  -------------------------------------------------------------------------------------
		//	����ַ����ǿգ����������а���_inst��˵�������������֣����²���
		//	����˵��ʣ�µ����ݾ��� module����
		//  -------------------------------------------------------------------------------------
		if(module_name!==""){
			if(module_name.indexOf("_inst")!=-1){
				continue;
			}
			else {
				break;
			}
		}
	}

	//  -------------------------------------------------------------------------------------
	//	���û���ҵ� module �˳�
	//	��Ȼͣ���ڸղŵĹ��������
	//  -------------------------------------------------------------------------------------
	if (CurrentLine===0) {
		if (DEBUG==1)	UltraEdit.outputWindow.write("not find module name");
		UltraEdit.activeDocument.gotoLine(line_num,0);
		return;
	}

	//  -------------------------------------------------------------------------------------
	//	����ҵ���module��ѡ��module���֣������ڲ�
	//  -------------------------------------------------------------------------------------
	if (DEBUG==1)	UltraEdit.outputWindow.write("find module name,it is "+module_name+"");
	if (DEBUG==1)	UltraEdit.outputWindow.write("CurrentLine is "+CurrentLine+"");
	UltraEdit.activeDocument.gotoLine(CurrentLine,0);

//	//  -------------------------------------------------------------------------------------
//	//	��һ��֮���� module ���֣������Ѱ��Χ��0-99��
//	//  -------------------------------------------------------------------------------------
//	for (col_pos = 0; col_pos < 100; col_pos++) {
//		UltraEdit.activeDocument.selectWord();
//		if (UltraEdit.activeDocument.selection==module_name) {
//			if (DEBUG==1)	UltraEdit.outputWindow.write("not match selection is "+UltraEdit.activeDocument.selection+"");
//			if (DEBUG==1)	UltraEdit.outputWindow.write("find module name in line");
//			break;
//		}
//		else {
//			if (DEBUG==1)	UltraEdit.outputWindow.write("not match selection is "+UltraEdit.activeDocument.selection+"");
//			UltraEdit.activeDocument.key("RIGHT ARROW");
//		}
//	}

	//  -------------------------------------------------------------------------------------
	//	����ģ�飬��ʼ����
	//  -------------------------------------------------------------------------------------
	var	onlypath	= getFilePath(0);
	var	onlyext		= getFileExtend(0);
	var	name_ext	= module_name+"."+onlyext;

	if (onlypath.match(/\\$/) === null) onlypath += "\\";
	if (DEBUG==1) {
		UltraEdit.outputWindow.showWindow(true);
		UltraEdit.outputWindow.write("name_ext is "+name_ext+"");
		UltraEdit.outputWindow.write("onlypath is "+onlypath+"");
	}
	var found = OpenModuleCore(0,onlypath,name_ext);
	if (found==true) {
		FindCopy(0);
		return true;
	}
	else {
		return false;
	}

}

FindInside(0);
