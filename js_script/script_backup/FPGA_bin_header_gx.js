
// include subfunction.js

function FPGA_bin_header_gx(){

	var file_path;
	var file_extend;

	file_path=getFilePath();
	file_extend=getFileExtend();

	UltraEdit.outputWindow.showWindow(true);

	UltraEdit.activeDocument.top();
	UltraEdit.activeDocument.hexOff();

	//	-------------------------------------------------------------------------------------
	//	����ļ���չ���Ƿ�Ϊbit���������bit�����˳�
	//	-------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isExt("bit")){
		UltraEdit.outputWindow.write("file ext is bit");
	}
	else {
		UltraEdit.outputWindow.write("file ext is not bit !!!!!!");
		return;
	}
	//	-------------------------------------------------------------------------------------
	//	bitͷ��Ϣ���й���ʱ��Ĳ�����ʱ���������ð�ţ��ҵ�ð��֮���ټ���ɾ��12��byte����ok��
	//	-------------------------------------------------------------------------------------
	while (1) {
		if (UltraEdit.activeDocument.isChar(':')){
			//			UltraEdit.outputWindow.write("is :");
			break;
		}
		else {
			//			UltraEdit.outputWindow.write("is not :");
			UltraEdit.activeDocument.hexOn();
			UltraEdit.activeDocument.hexDelete(1);
			UltraEdit.activeDocument.hexOff();
		}
	}

	UltraEdit.activeDocument.hexOn();
	UltraEdit.activeDocument.hexDelete(12);
	UltraEdit.saveAs(""+file_path+"\\downuser_0x40a00000."+file_extend+"");

}

FPGA_bin_header_gx();
