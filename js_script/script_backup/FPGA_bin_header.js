
// include subfunction.js

function FPGA_bin_header(){

	var file_name;
	var file_path;
	var file_extend;

	UltraEdit.outputWindow.showWindow(true);

	file_name=getFileName();
	file_path=getFilePath();
	file_extend=getFileExtend();


	var file_size	= UltraEdit.activeDocument.fileSize;
	var hexsize = file_size.toString(16);
	UltraEdit.outputWindow.write("hexsize  is "+hexsize+"");

	var size_1_byte	= 0xff & file_size;
	var size_1_byte_hex	= size_1_byte.toString(16);
	UltraEdit.outputWindow.write("size_1_byte_hex  is "+size_1_byte_hex+"");

	var size_2_byte	= (0xff00 & file_size)/256;
	var size_2_byte_hex	= size_2_byte.toString(16);
	UltraEdit.outputWindow.write("size_2_byte_hex  is "+size_2_byte_hex+"");

	var size_3_byte	= (0xff0000 & file_size)/65536;
	var size_3_byte_hex	= size_3_byte.toString(16);
	UltraEdit.outputWindow.write("size_3_byte_hex  is "+size_3_byte_hex+"");

	var size_4_byte	= (0xff000000 & file_size)/16777216;
	//	var size_4_byte	= 254;
	var size_4_byte_hex	= size_4_byte.toString(16);
	UltraEdit.outputWindow.write("size_4_byte_hex  is "+size_4_byte_hex+"");

	UltraEdit.activeDocument.hexOn();
	UltraEdit.activeDocument.top();

	//	-------------------------------------------------------------------------------------
	//	文件开头，写入地址
	//	-------------------------------------------------------------------------------------
//	UltraEdit.activeDocument.write("00001000");
//	UltraEdit.activeDocument.write("00000000");

	UltraEdit.activeDocument.write("00002001");
	UltraEdit.activeDocument.write("00000000");
	
	if (size_1_byte_hex<=15) {
		UltraEdit.activeDocument.write("0");
		UltraEdit.activeDocument.write(""+size_1_byte_hex+"");
	}
	else {
		UltraEdit.activeDocument.write(""+size_1_byte_hex+"");
	}

	if (size_2_byte_hex<=15) {
		UltraEdit.activeDocument.write("0");
		UltraEdit.activeDocument.write(""+size_2_byte_hex+"");
	}
	else {
		UltraEdit.activeDocument.write(""+size_2_byte_hex+"");
	}

	if (size_3_byte_hex<=15) {
		UltraEdit.activeDocument.write("0");
		UltraEdit.activeDocument.write(""+size_3_byte_hex+"");
	}
	else {
		UltraEdit.activeDocument.write(""+size_3_byte_hex+"");
	}

	if (size_4_byte_hex<=15) {
		UltraEdit.activeDocument.write("0");
		UltraEdit.activeDocument.write(""+size_4_byte_hex+"");
	}
	else {
		UltraEdit.activeDocument.write(""+size_4_byte_hex+"");
	}

	if (file_extend!=="") {
		UltraEdit.saveAs(""+file_path+"\\"+file_name+"_pack."+file_extend+"");
	}
	else {
		UltraEdit.saveAs(""+file_path+"\\"+file_name+"_pack");
	}
	//	UltraEdit.save();


}

FPGA_bin_header();
