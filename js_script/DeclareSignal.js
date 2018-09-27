
// include subfunction.js

function batch_declare_signal(){

	var str=0;
	var strCommaSplit=new Array;
	var signalType,signalLength,num;
	var i=0;

	signalType = UltraEdit.getString("Type:w-wire r-reg int-integer p-parameter i-input o-output io-inout",1);
	signalLength = UltraEdit.getValue("DataWidth",1);
	signalLength = signalLength / 10;
	num = signalLength - 1;

	//  -------------------------------------------------------------------------------------
	//	如果选择了文本，那么就以选择的文本为对象。如果没有选择文本，那么就选择光标所在的单词。
	//  -------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isSel()){
		str = UltraEdit.activeDocument.selection;
	} else {
		UltraEdit.activeDocument.selectWord();
		str = UltraEdit.activeDocument.selection;
	}

	//  -------------------------------------------------------------------------------------
	//	如果所选字符串是空的，返回
	//  -------------------------------------------------------------------------------------
	if(signalType === ""){
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
			//  ===============================================================================================
			//	第一大类--信号类型
			//  ===============================================================================================
			//  -------------------------------------------------------------------------------------
			//	1.wire 类型
			//  -------------------------------------------------------------------------------------
			if((signalType.toLowerCase()=="wire")||(signalType.toLowerCase()=="w")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("wire\t\t\t\t"+strCommaSplit[i]+"	;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("wire\t\t\t\t"+strCommaSplit[i]+"	;");
			}
			//  -------------------------------------------------------------------------------------
			//	2.reg 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="reg")||(signalType.toLowerCase()=="r")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("reg\t\t\t"+strCommaSplit[i]+"	= 1'b0;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("reg\t\t\t"+strCommaSplit[i]+"	= 1'b0;");
			}
			//  -------------------------------------------------------------------------------------
			//	3.integer 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="integer")||(signalType.toLowerCase()=="int")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("integer\t\t"+strCommaSplit[i]+"	= 0;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("integer\t\t"+strCommaSplit[i]+"	= 0;");
			}
			//  -------------------------------------------------------------------------------------
			//	4.parameter 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="parameter")||(signalType.toLowerCase()=="p")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("parameter\t\t"+strCommaSplit[i]+"	= 0;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("parameter\t\t"+strCommaSplit[i]+"	= 0;");
			}
			
			//  ===============================================================================================
			//	第二大类--端口类型
			//  ===============================================================================================
			//  -------------------------------------------------------------------------------------
			//	1.input 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="input")||(signalType.toLowerCase()=="i")){
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
			else if((signalType.toLowerCase()=="output")||(signalType.toLowerCase()=="o")){
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
			else if((signalType.toLowerCase()=="inout")||(signalType.toLowerCase()=="io")){
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
			
			
			//  ===============================================================================================
			//	第三大类--其他
			//  ===============================================================================================
			//  -------------------------------------------------------------------------------------
			//	其他类型
			//  -------------------------------------------------------------------------------------
			else{
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write(""+signalType+"\t\t"+strCommaSplit[i]+"	;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write(""+signalType+"\t\t"+strCommaSplit[i]+"	;");
			}

		}

		//  -------------------------------------------------------------------------------------
		//	位宽大于0
		//  -------------------------------------------------------------------------------------
		else{
			//  ===============================================================================================
			//	第一大类--信号类型
			//  ===============================================================================================
			//  -------------------------------------------------------------------------------------
			//	1.wire 类型
			//  -------------------------------------------------------------------------------------
			if((signalType.toLowerCase()=="wire")||(signalType.toLowerCase()=="w")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("wire\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("wire\t["+num+":0]\t\t\t"+strCommaSplit[i]+"	;");
			}
			//  -------------------------------------------------------------------------------------
			//	2.reg 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="reg")||(signalType.toLowerCase()=="r")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("reg\t\t["+num+":0]\t\t"+strCommaSplit[i]+"	= "+signalLength+"'b0;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("reg\t\t["+num+":0]\t\t"+strCommaSplit[i]+"	= "+signalLength+"'b0;");
			}
			//  -------------------------------------------------------------------------------------
			//	3.integer 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="integer")||(signalType.toLowerCase()=="int")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("integer\t\t"+strCommaSplit[i]+"\t\t= 0;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("integer\t\t"+strCommaSplit[i]+"\t\t= 0;");
			}
			
			//  ===============================================================================================
			//	第二大类--端口类型
			//  ===============================================================================================
			//  -------------------------------------------------------------------------------------
			//	1.input 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="input")||(signalType.toLowerCase()=="i")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("input\t["+num+":0]\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("input\t["+num+":0]\t\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	2.output 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="output")||(signalType.toLowerCase()=="o")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("output\t["+num+":0]\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("output\t["+num+":0]\t\t\t\t"+strCommaSplit[i]+"	,");
			}
			//  -------------------------------------------------------------------------------------
			//	3.inout 类型
			//  -------------------------------------------------------------------------------------
			else if((signalType.toLowerCase()=="inout")||(signalType.toLowerCase()=="io")){
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write("inout\t["+num+":0]\t\t\t\t"+strCommaSplit[i]+"	,\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write("inout\t["+num+":0]\t\t\t\t"+strCommaSplit[i]+"	,");
			}
			
			//  ===============================================================================================
			//	第三大类--其他
			//  ===============================================================================================
			//  -------------------------------------------------------------------------------------
			//	其他类型
			//  -------------------------------------------------------------------------------------
			else{
				strCommaSplit = str.split("\r\n");
				for(i=0;i<strCommaSplit.length-1;i++){
					strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
					strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
					UltraEdit.activeDocument.write(""+signalType+"\t\t["+num+":0]\t\t"+strCommaSplit[i]+"	;\r\n");
				}
				strCommaSplit[i]=LeftTrimSpace(strCommaSplit[i]);
				strCommaSplit[i]=RightTrimSpace(strCommaSplit[i]);
				UltraEdit.activeDocument.write(""+signalType+"\t\t["+num+":0]\t\t"+strCommaSplit[i]+"	;");
			}
		}
	}
	//	UltraEdit.save();
}

batch_declare_signal();

