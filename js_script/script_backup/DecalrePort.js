
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
	//	���ѡ�����ı�����ô����ѡ����ı�Ϊ�������û��ѡ���ı�����ô��ѡ�������ڵĵ��ʡ�
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
	//	�����ѡ�ַ����ǿյģ�����
	//  -------------------------------------------------------------------------------------
	if(direc === ""){
		return;
	}
	//  -------------------------------------------------------------------------------------
	//	��ѡ�ַ����ǿգ�����
	//  -------------------------------------------------------------------------------------
	else{
		//  -------------------------------------------------------------------------------------
		//	λ��Ϊ0
		//  -------------------------------------------------------------------------------------
		if(num < 0){
			//  -------------------------------------------------------------------------------------
			//	1.input ����
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
			//	2.output ����
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
			//	3.inout ����
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
			//	4. ��������
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
		//	λ�����0
		//  -------------------------------------------------------------------------------------
		else{
			//  -------------------------------------------------------------------------------------
			//	1.input ����
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
			//	2.output ����
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
			//	3.inout ����
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
			//	4. ��������
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
