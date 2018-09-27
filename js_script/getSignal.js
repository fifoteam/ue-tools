
// include subfunction.js

function getSignal(){
	var TotalLine,i,j,strIndex;
	var str;
	var ClipArray=new Array();
	var strCommaSplit=new Array();

	//	UltraEdit.outputWindow.clear();
	//	UltraEdit.outputWindow.showOutput=true;
	//	UltraEdit.outputWindow.showWindow(true);

	UltraEdit.selectClipboard(0);
	UltraEdit.clearClipboard(0);
	UltraEdit.clipboardContent = UltraEdit.activeDocument.selection;
	UltraEdit.open("c:\\ue\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	UltraEdit.activeDocument.paste();
	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;

	UltraEdit.activeDocument.write("\r\n");
	for(i=1;i<=TotalLine;i++){
		UltraEdit.activeDocument.gotoLine(i,1);
		UltraEdit.activeDocument.selectLine();
		str=UltraEdit.activeDocument.selection;
		str=TrimComment(str);
		if(str.indexOf("\r\n")!=-1)		str=str.substring(0,str.indexOf("\r\n"));	//ȥ����β�س���
		str=LeftTrimSpace(str);
		str=RightTrimSpace(str);
		if(str==="")	continue;	//ȥ�����س�֮������ǿ��У�˵������û������

		strCommaSplit=str.split(",");	//���ܻ��ж��л���һ��
		for (j = 0; j < strCommaSplit.length; j++) {
			str=strCommaSplit[j];
			str=TrimKeywords(str);			//ȥ�����׵Ĺؼ���
			if(str.indexOf(";")!=-1)	str=str.substring(0,str.indexOf(";"));	//ȥ����β�ָ���
			if(str.indexOf(",")!=-1)	str=str.substring(0,str.indexOf(","));	//ȥ����β�ָ���
			if(str.indexOf("(")!=-1)	str=str.substring(0,str.indexOf("("));	//ȥ��ģ��ӳ��֮�������
			if(str.indexOf("=")!=-1)	str=str.substring(0,str.indexOf("="));	//ȥ����ֵ����
			if(str.indexOf("<")!=-1)	str=str.substring(0,str.indexOf("<"));	//ȥ����ֵ����

			if(str.indexOf("]")!=-1)	str=str.substring(str.indexOf("]")+1,str.length);	//ȥ����ͷ��[]
			if(str.indexOf(":")!=-1)	str=str.substring(str.indexOf(":")+1,str.length);	//ȥ����ͷ��:

			str=LeftTrimSpace(str);
			str=RightTrimSpace(str);
			//��TMP�ļ��ײ�д����ȡ�������ź�
			UltraEdit.activeDocument.bottom();
			if(str!=="")UltraEdit.activeDocument.write(str+"\r\n");
		}


	}

	//�����������������
	UltraEdit.activeDocument.top();
	UltraEdit.activeDocument.startSelect();
	for(i=0;i<TotalLine;i++)
	UltraEdit.activeDocument.key("DOWN ARROW");
	UltraEdit.activeDocument.endSelect();
	UltraEdit.activeDocument.deleteText();
	UltraEdit.save();
}


getSignal();
