
// include subfunction.js

function CommentOrder(){

	var TotalLine = 1;
	var CurrentLine = 0;
	var str;
	var str_copy;
	var i = 0;
	var NetName = new Array();
	var NetComment = new Array();
	var f_array = new Array();
	var comment="";
	var find_variable=0;
	var find_comment=0;
	var find_keyword=0;
	
	
	
	UltraEdit.outputWindow.showWindow(true);
	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
	UltraEdit.activeDocument.top();
	UltraEdit.outputWindow.write("TotalLine is "+TotalLine+"");
	
	//  ===============================================================================================
	//	���µ�ucf�а�������������λ�ö���¼����
	//	��.v�У��ӵ�һ���ҵ����һ��
	//  ===============================================================================================
	//ÿһ��������
	i=0;
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
//		UltraEdit.outputWindow.write("CurrentLine 1 is "+CurrentLine+"");
		str=StringCopy(CurrentLine);
//		UltraEdit.outputWindow.write("str 1 is "+str+"");
		str=LeftTrimSpace(str);
		str=RightTrimSpace(str);
//		UltraEdit.outputWindow.write("str 2 is "+str+"");
		str_copy=str.replace(/\t/g," ");
//		UltraEdit.outputWindow.write("str_copy is "+str_copy+"");
		f_array=str_copy.split(" ");
		f_array[0]=f_array[0].toLowerCase();
		if((f_array[0]=="parameter")||(f_array[0]=="localparam")) {
			find_variable=1;
		}
		else if((f_array[0]=="input")||(f_array[0]=="output")||(f_array[0]=="inout")) {
			find_variable=1;
		}
		else if((f_array[0]=="wire")||(f_array[0]=="reg")||(f_array[0]=="integer")) {
			find_variable=1;
		}
		else {
			find_variable=0;
		}
		
		
		
		
		//ÿһ�еĿ�ͷ�ĵ��ʷ��ϱ�����
		if(find_variable==1) {
//			UltraEdit.outputWindow.write("CurrentLine is "+CurrentLine+"");
//			UltraEdit.outputWindow.write("str_copy is "+str_copy+"");
			str=str_copy.substring(str_copy.indexOf(" "),str_copy.length);	//�ѵ�һ��������ȥ��
//			UltraEdit.outputWindow.write("after str is "+str+"");
			//�ַ���Ԥ����
			if(str.indexOf("\r\n")!=-1)	str=str.substring(0,str.indexOf("\r\n"));	//ȥ����β�س���
			if(str.indexOf("\n")!=-1)	str=str.substring(0,str.indexOf("\n"));		//ȥ����β�س���
			if(str.indexOf("\r")!=-1)	str=str.substring(0,str.indexOf("\r"));		//ȥ����β�س���
			if(str.indexOf("]")!=-1)	str=str.substring(str.indexOf("]")+1,str.length);	//ȥ��λ������
//			UltraEdit.outputWindow.write("3 str is "+str+"");
			//��ȡ netname
			if(str.indexOf("=")!=-1){
				NetName[i]=str.substring(0,str.indexOf("="));	//ȥ��=
			}
			else if(str.indexOf(",")!=-1){
				NetName[i]=str.substring(0,str.indexOf(","));	//ȥ��,
			}
			else if(str.indexOf(";")!=-1){
				NetName[i]=str.substring(0,str.indexOf(";"));	//ȥ��;
			}
			else if(str.indexOf("\/\/")!=-1){
				NetName[i]=str.substring(0,str.indexOf("\/\/"));	//ȥ��//
			}
			NetName[i]=LeftTrimSpace(NetName[i]);
			NetName[i]=RightTrimSpace(NetName[i]);

			//��ȡ netcomment
			if(str.indexOf("\/\/")!=-1) {
				find_comment=1;
			}
			else {
				find_comment=0;
			}

			if(find_comment==1) {
				NetComment[i]=str.substring(str.indexOf("\/\/"),str.length);
				NetComment[i]=RightTrimSpace(NetComment[i]);
			}
			else {
				NetComment[i]="";
			}
			
//			UltraEdit.outputWindow.write("Current NetName "+i+" is "+NetName[i]+"");
//			UltraEdit.outputWindow.write("Current NetComment "+i+" is "+NetComment[i]+"");
			i++;
		}
		
	}

	//test
	for (i=0;i<NetName.length;i++) {
		UltraEdit.outputWindow.write("NetName "+i+" is "+NetName[i]+"");
		UltraEdit.outputWindow.write("NetComment "+i+" is "+NetComment[i]+"");
	}

	//  ===============================================================================================
	//	�ӿ�ͷλ�ô������β��ң�.��Ϊ�ؼ���
	//  ===============================================================================================
	//ÿһ��������
	UltraEdit.activeDocument.top();
	i=0;
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=TrimComment(str);
		if(str.indexOf(".")!=-1) {
			find_keyword=1;
			UltraEdit.outputWindow.write("str x is "+str+"");
		}
		else {
			find_keyword=0;
		}
		
		if(find_keyword==1) {
			if(str.indexOf("\r\n")!=-1)	str=str.substring(0,str.indexOf("\r\n"));	//ȥ����β�س���
			if(str.indexOf("\n")!=-1)	str=str.substring(0,str.indexOf("\n"));		//ȥ����β�س���
			if(str.indexOf("\r")!=-1)	str=str.substring(0,str.indexOf("\r"));		//ȥ����β�س���
			str=RightTrimSpace(str);
			str_copy = str;
			
			str=str.substring(str.indexOf("(")+1,str.indexOf(")"));
			str=LeftTrimSpace(str);
			str=RightTrimSpace(str);
			UltraEdit.outputWindow.write("str 1 is "+str+"");
			for (i = 0; i < NetName.length; i++) {
				if(NetName[i]==str){
					comment=NetComment[i];
				}
			}
			str=str_copy+"\t"+comment;
			UltraEdit.outputWindow.write("str 2 is "+str+"");
			UltraEdit.activeDocument.gotoLine(CurrentLine,1);
			UltraEdit.activeDocument.deleteLine();
			UltraEdit.activeDocument.write(""+str+"\r\n");
			comment="";
		}
	}

}

CommentOrder();
