
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
		if(str.indexOf("\r\n")!=-1)		str=str.substring(0,str.indexOf("\r\n"));	//去除行尾回车符
		str=LeftTrimSpace(str);
		str=RightTrimSpace(str);
		if(str==="")	continue;	//去除掉回车之后，如果是空行，说明该行没有内容

		strCommaSplit=str.split(",");	//可能会有多行混在一起
		for (j = 0; j < strCommaSplit.length; j++) {
			str=strCommaSplit[j];
			str=TrimKeywords(str);			//去掉行首的关键字
			if(str.indexOf(";")!=-1)	str=str.substring(0,str.indexOf(";"));	//去除行尾分隔符
			if(str.indexOf(",")!=-1)	str=str.substring(0,str.indexOf(","));	//去除行尾分隔符
			if(str.indexOf("(")!=-1)	str=str.substring(0,str.indexOf("("));	//去除模块映射之后的括号
			if(str.indexOf("=")!=-1)	str=str.substring(0,str.indexOf("="));	//去除赋值符号
			if(str.indexOf("<")!=-1)	str=str.substring(0,str.indexOf("<"));	//去除赋值符号

			if(str.indexOf("]")!=-1)	str=str.substring(str.indexOf("]")+1,str.length);	//去除行头的[]
			if(str.indexOf(":")!=-1)	str=str.substring(str.indexOf(":")+1,str.length);	//去除行头的:

			str=LeftTrimSpace(str);
			str=RightTrimSpace(str);
			//在TMP文件底部写上提取出来的信号
			UltraEdit.activeDocument.bottom();
			if(str!=="")UltraEdit.activeDocument.write(str+"\r\n");
		}


	}

	//清除拷贝过来的数据
	UltraEdit.activeDocument.top();
	UltraEdit.activeDocument.startSelect();
	for(i=0;i<TotalLine;i++)
	UltraEdit.activeDocument.key("DOWN ARROW");
	UltraEdit.activeDocument.endSelect();
	UltraEdit.activeDocument.deleteText();
	UltraEdit.save();
}


getSignal();
