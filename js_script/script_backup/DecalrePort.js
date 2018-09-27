
// include subfunction.js

function declarePort(){
	var str=0;
	var num=0;
	var	direc=0;
	var i=0;
	var strCommaSplit=new Array;

	//	UltraEdit.outputWindow.showWindow(true);
	//	UltraEdit.outputWindow.write("str is "+str+"");

	direc = UltraEdit.getString("Port Direction",1);
	num = UltraEdit.getValue("DataWidth",1);
	num = num / 10;
	num = num - 1;

	//  -------------------------------------------------------------------------------------
	//	如果选择了文本，那么就以选择的文本为对象。如果没有选择文本，那么就选择光标所在的单词。
	//  -------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isSel()){
		str = UltraEdit.activeDocument.selection;
	} else {
		UltraEdit.activeDocument.selectWord();
		str = UltraEdit.activeDocument.selection;
	}







//	if(direc === ""){
//		return;
//	}else if(direc == "i"){
//		direc="input";
//	}else if(direc == "o"){
//		direc="output";
//	}else if(direc == "io"){
//		direc="inout";
//	}else{
//		direc="input";
//	}
//
//	if(num < 0){
//		strCommaSplit = str.split("\r\n");
//		for(i=0;i<strCommaSplit.length-1;i++){
//			UltraEdit.activeDocument.write(""+direc+"\t"+strCommaSplit[i]+",\r\n");
//		}
//		UltraEdit.activeDocument.write(""+direc+"\t"+strCommaSplit[i]+",");
//	}
//	else{
//		strCommaSplit = str.split("\r\n");
//		for(i=0;i<strCommaSplit.length-1;i++){
//			UltraEdit.activeDocument.write(""+direc+"\t["+num+":0]\t"+strCommaSplit[i]+",\r\n");
//		}
//		UltraEdit.activeDocument.write(""+direc+"\t["+num+":0]\t"+strCommaSplit[i]+",");
//	}

	//  -------------------------------------------------------------------------------------
	//	如果所选字符串是空的，返回
	//  -------------------------------------------------------------------------------------
	if(direc === ""){
		return;
	}
	//  -------------------------------------------------------------------------------------
	//	所选字符串非空，处理
	//  -------------------------------------------------------------------------------------
	else{
		//  -------------------------------------------------------------------------------------
		//	位宽为0
		//  -------------------------------------------------------------------------------------
		if(num < 0){
			//  -------------------------------------------------------------------------------------
			//	1.input 类型
			//  -------------------------------------------------------------------------------------
			if((direc.toLowerCase()=="input")||(direc.toLowerCase()=="i")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("input\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("input\t\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	2.output 类型
			//  -------------------------------------------------------------------------------------
			else if((direc.toLowerCase()=="output")||(direc.toLowerCase()=="o")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("output\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("output\t\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	3.inout 类型
			//  -------------------------------------------------------------------------------------
			else if((direc.toLowerCase()=="inout")||(direc.toLowerCase()=="io")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("inout\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("inout\t\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	4. 其他类型
			//  -------------------------------------------------------------------------------------
			else{
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write(""+direc+"\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write(""+direc+"\t\t\t\t"+strCommaSplit[i]+"	,");
			}
		}

		//  -------------------------------------------------------------------------------------
		//	位宽大于0
		//  -------------------------------------------------------------------------------------
		else{
			//  -------------------------------------------------------------------------------------
			//	1.input 类型
			//  -------------------------------------------------------------------------------------
			if((direc.toLowerCase()=="input")||(direc.toLowerCase()=="i")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("input\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("input\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	2.output 类型
			//  -------------------------------------------------------------------------------------
			else if((direc.toLowerCase()=="output")||(direc.toLowerCase()=="o")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("output\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("output\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	3.inout 类型
			//  -------------------------------------------------------------------------------------
			else if((direc.toLowerCase()=="inout")||(direc.toLowerCase()=="io")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("inout\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("inout\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	4. 其他类型
			//  -------------------------------------------------------------------------------------
			else{
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write(""+direc+"\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write(""+direc+"\t\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	,");
			}
		}
	}

}

declarePort();
