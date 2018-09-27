
// include subfunction.js

function cvs_replace(DEBUG){

	var file_name;
	var file_name_zip;
	var file_path;
	var file_path_zip;
	var file_extend;
	var file_full_path;
	var found	= false;
	var file_size_zip;
	var hexsize_zip;
	var str;




	if(DEBUG==1) UltraEdit.outputWindow.showWindow(true);

	file_name=getFileName();
	file_path=getFilePath();
	file_extend=getFileExtend();
	file_full_path	= UltraEdit.activeDocument.path;

	if (file_path.match(/\\$/) === null) file_path += "\\";
	if(DEBUG==1) UltraEdit.outputWindow.write("file_path  is "+file_path+"");
	if(DEBUG==1) UltraEdit.outputWindow.write("file_full_path  is "+file_full_path+"");

	//  -------------------------------------------------------------------------------------
	//	在同级目录下面查找 .zip文件
	//  -------------------------------------------------------------------------------------
	UltraEdit.ueReOn();
	UltraEdit.frInFiles.searchSubs=true;
	UltraEdit.frInFiles.unicodeSearch=false;
	UltraEdit.frInFiles.useOutputWindow=false;
	UltraEdit.frInFiles.openMatchingFiles=false;
	UltraEdit.frInFiles.filesToSearch=0;
	UltraEdit.frInFiles.matchCase=false;
	UltraEdit.frInFiles.matchWord=false;
	UltraEdit.frInFiles.regExp=false;
	UltraEdit.frInFiles.searchInFilesTypes="*.zip";

	UltraEdit.frInFiles.directoryStart=file_path;
	UltraEdit.frInFiles.find("");
	UltraEdit.activeDocument.bottom();
	if (UltraEdit.activeDocument.currentLineNum > 2) {
		file_path_zip	= StringCopy(1);
		file_path_zip	= TrimEOL(file_path_zip);
		UltraEdit.closeFile("** 查找结果 ** ",0);
		UltraEdit.open(file_path_zip);
		found	= true;
	}
	else {
		UltraEdit.closeFile("** 查找结果 ** ",0);
	}

	if(DEBUG==1) UltraEdit.outputWindow.write("found  is "+found+"");

	//  -------------------------------------------------------------------------------------
	//	打开zip文件，获得文件名和大小
	//  -------------------------------------------------------------------------------------
	file_size_zip	= UltraEdit.activeDocument.fileSize;
	hexsize_zip 	= file_size_zip.toString(16);
	file_name_zip	=getFileName();
	file_name_zip	+=".zip"
	if(DEBUG==1) UltraEdit.outputWindow.write("hexsize_zip  is "+hexsize_zip+"");
	if(DEBUG==1) UltraEdit.outputWindow.write("file_path_zip  is "+file_path_zip+"");
	if(DEBUG==1) UltraEdit.outputWindow.write("file_name_zip  is "+file_name_zip+"");

	UltraEdit.closeFile(file_path_zip,2);

	//  -------------------------------------------------------------------------------------
	//	返回csv文件，定位到 line214，获得214行的内容
	//  -------------------------------------------------------------------------------------
	UltraEdit.open(file_full_path);
	str=StringCopy(214);
	if(DEBUG==1) UltraEdit.outputWindow.write("str  is "+str+"");


	//  -------------------------------------------------------------------------------------
	//	将214行的内容拆分开，首先以 "," 为分界符
	//  -------------------------------------------------------------------------------------
	var first_array		= new Array();
	var second_array	= new Array();
	var	first_str_new;
	var	second_str_new;

	first_array=str.split(",");
	if(DEBUG==1) {
		for (var i = 0; i < first_array.length; i++) {
			UltraEdit.outputWindow.write("first_array "+i+"  is "+first_array[i]+"");
		}
	}

	//  -------------------------------------------------------------------------------------
	//	将 first array [2] 再差分，以 ";" 为分界符
	//  -------------------------------------------------------------------------------------
	second_array=first_array[2].split(";");
	if(DEBUG==1) {
		for (var i = 0; i < second_array.length; i++) {
			UltraEdit.outputWindow.write("second_array "+i+"  is "+second_array[i]+"");
		}
	}

	//  -------------------------------------------------------------------------------------
	//	将 second array 重新赋值组合
	//  -------------------------------------------------------------------------------------
	second_array[0]="local:"+file_name_zip;
	second_array[2]=hexsize_zip;
	second_str_new	= second_array.join(";");
	if(DEBUG==1) UltraEdit.outputWindow.write("second_str_new  is "+second_str_new+"");

	//  -------------------------------------------------------------------------------------
	//	将 first array 重新赋值组合
	//  -------------------------------------------------------------------------------------
	first_array[2]	= second_str_new;
	first_str_new	= first_array.join(",");
	//	first_str_new	+= "\r\n";
	if(DEBUG==1) UltraEdit.outputWindow.write("first_str_new  is "+first_str_new+"");

	//  -------------------------------------------------------------------------------------
	//	用新的字符串替换之前的字符串
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write(""+first_str_new+"");

	//  -------------------------------------------------------------------------------------
	//	保存
	//  -------------------------------------------------------------------------------------
	UltraEdit.save();


}

cvs_replace(0);
