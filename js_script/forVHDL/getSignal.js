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

function getSignal(){
	var TotalLine,i,strIndex;
	var str_tmp,str;
	
//	UltraEdit.outputWindow.clear();
//	UltraEdit.outputWindow.showOutput=true;
//	UltraEdit.outputWindow.showWindow(true);
	
	UltraEdit.selectClipboard(0);
//	UltraEdit.clearClipboard(0);
	UltraEdit.clipboardContent = UltraEdit.activeDocument.selection;
	UltraEdit.open("F:\\test\\UE_TMP.vhd");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();
	
	UltraEdit.activeDocument.paste();
	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
//	UltraEdit.outputWindow.write(""+TotalLine+"");					//test
	UltraEdit.activeDocument.write("\r\n");
	for(i=1;i<=TotalLine;i++){
		UltraEdit.activeDocument.gotoLine(i,1);
		UltraEdit.activeDocument.selectLine();
		str=UltraEdit.activeDocument.selection;
		str=TrimComment(str);
		str=LeftTrimSpace(str);
//		UltraEdit.outputWindow.write("now str is"+str+"");					//test
		if(str==="")	continue;
		strIndex=str.indexOf(":");
//		UltraEdit.outputWindow.write("strIndex is"+strIndex+"");			//test
		if(strIndex===-1){
			strIndex=str.indexOf("=");
			}
		str_tmp=str.substring(0,6);
		str_tmp=str_tmp.toLowerCase();
		if(str_tmp==="signal"){
			str=str.substring(7,strIndex);
			str=RightTrimSpace(str);
			str=LeftTrimSpace(str);
			}
		else{
			str=str.substring(0,strIndex);
			str=RightTrimSpace(str);
			}
//		UltraEdit.outputWindow.write("end str is"+str+"");					//test
		UltraEdit.activeDocument.bottom();
		if(str!=="")UltraEdit.activeDocument.write(str+"\r\n");
		}
	
	UltraEdit.activeDocument.top();
	
	UltraEdit.activeDocument.gotoLineSelect(TotalLine+1,1);
	
//	UltraEdit.activeDocument.startSelect();
//	
//	for(i=0;i<TotalLine;i++)
//		UltraEdit.activeDocument.key("DOWN ARROW");
//		
//	UltraEdit.activeDocument.endSelect();
	UltraEdit.activeDocument.deleteText();
	UltraEdit.save();
	}

	getSignal();