
// include subfunction.js

function line_end_add(){
	var TotalLine,i,j,strIndex;
	var str;
	var ClipArray=new Array();
	var strCommaSplit=new Array();

	add_str = UltraEdit.getString("Please input line end str:",1);

	//	UltraEdit.outputWindow.clear();
	//	UltraEdit.outputWindow.showOutput=true;
	//	UltraEdit.outputWindow.showWindow(true);

	UltraEdit.selectClipboard(0);
	UltraEdit.clearClipboard(0);
	UltraEdit.clipboardContent = UltraEdit.activeDocument.selection;
	UltraEdit.open("F:\\test\\UE_TMP.v");
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

		if(str.indexOf("\r\n")!=-1)	str=str.substring(0,str.indexOf("\r\n"));	//去除行尾分隔符
		str=str+add_str;

		//在TMP文件底部写上提取出来的信号
		UltraEdit.activeDocument.bottom();
		if(str!=="")UltraEdit.activeDocument.write(str+"\r\n");
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

line_end_add();
