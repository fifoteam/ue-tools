
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
	//	检查文件扩展名是否为bit，如果不是bit，则退出
	//	-------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isExt("bit")){
		UltraEdit.outputWindow.write("file ext is bit");
	}
	else {
		UltraEdit.outputWindow.write("file ext is not bit !!!!!!");
		return;
	}
	//	-------------------------------------------------------------------------------------
	//	bit头信息中有关于时间的参数，时间参数中有冒号，找到冒号之后，再继续删除12个byte，就ok了
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
