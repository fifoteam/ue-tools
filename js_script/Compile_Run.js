
// include subfunction.js


function compile_Run(){

	var file_ext = "";
	var file_name = 0 ;

	//	UltraEdit.outputWindow.showWindow(true);

	//  -------------------------------------------------------------------------------------
	//	����ļ���չ��
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
	//	��ȡ�ļ���
	//  -------------------------------------------------------------------------------------
	file_name=getFileName();

	//  -------------------------------------------------------------------------------------
	//	���롢���� C ����
	//  -------------------------------------------------------------------------------------
	if ((file_ext=="c") || (file_ext=="cpp")) {
		//����Դ�ļ�
		if (file_ext=="c") {
			UltraEdit.runTool("gcc");
		}
		else if (file_ext=="cpp") {
			UltraEdit.runTool("g++");
		}

		//	//�ȴ�Դ�ļ�������
		//	cnWait(1);

		//��makefile
		UltraEdit.open("c:\\ue\\gcc_work\\Makefile.win");

		//��дmakefile
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


		//�ر�makefile
		UltraEdit.closeFile("c:\\ue\\gcc_work\\Makefile.win",1);

		//����exe�ļ�
		if (file_ext=="c") {
			UltraEdit.runTool("make_exe");
		}
		else if (file_ext=="cpp") {
			UltraEdit.runTool("make++_exe");
		}

		//	//�ȴ�����exe�ļ�
		//	cnWait(1);

		//��exe�ļ�
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
