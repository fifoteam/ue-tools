
// include subfunction.js


function compile_Run(){

	var file_ext = "";
	var file_name = 0 ;

	//	UltraEdit.outputWindow.showWindow(true);

	//  -------------------------------------------------------------------------------------
	//	检查文件扩展名
	//  -------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isExt("c")) {
		file_ext = "c";
	}
	else if (UltraEdit.activeDocument.isExt("cpp")) {
		file_ext = "cpp";
	}
	else if (UltraEdit.activeDocument.isExt("py")) {
		file_ext = "py";
	}
	else if (UltraEdit.activeDocument.isExt("v")) {
		file_ext = "v";
	}
	//  -------------------------------------------------------------------------------------
	//	获取文件名
	//  -------------------------------------------------------------------------------------
	file_name=getFileName();

	//  -------------------------------------------------------------------------------------
	//	编译、运行 C 程序
	//  -------------------------------------------------------------------------------------
	if ((file_ext=="c") || (file_ext=="cpp")) {
		//编译源文件
		if (file_ext=="c") {
			UltraEdit.runTool("gcc");
		}
		else if (file_ext=="cpp") {
			UltraEdit.runTool("g++");
		}

		//	//等待源文件编译完
		//	cnWait(1);

		//打开makefile
		UltraEdit.open("c:\\ue\\gcc_work\\Makefile.win");

		//改写makefile
		DeltLine(7);
		UltraEdit.activeDocument.write("OBJ      = ../gcc_work/"+file_name+".o\r\n");
		DeltLine(8);
		UltraEdit.activeDocument.write("LINKOBJ  = ../gcc_work/"+file_name+".o\r\n");
		DeltLine(12);
		UltraEdit.activeDocument.write("BIN      = "+file_name+".exe\r\n");
		DeltLine(27);
		UltraEdit.activeDocument.write("../gcc_work/"+file_name+".o: ../gcc_work/"+file_name+"."+file_ext+"\r\n");
		DeltLine(28);
		UltraEdit.activeDocument.write("	$(CC) -c ../gcc_work/"+file_name+"."+file_ext+" -o ../gcc_work/"+file_name+".o $(CFLAGS)\r\n");


		//关闭makefile
		UltraEdit.closeFile("c:\\ue\\gcc_work\\Makefile.win",1);

		//生成exe文件
		if (file_ext=="c") {
			UltraEdit.runTool("make_exe");
		}
		else if (file_ext=="cpp") {
			UltraEdit.runTool("make++_exe");
		}

		//	//等待生成exe文件
		//	cnWait(1);

		//打开exe文件
		UltraEdit.runTool("open_exe");
		UltraEdit.outputWindow.write("open complete");
	}
	else if (file_ext=="py") {
		UltraEdit.runTool("python");
	}
	else if (file_ext=="v") {
		SynthesisVerilog();
	}
}


compile_Run();
