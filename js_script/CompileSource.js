
// include subfunction.js

function CompileSource (){

	//  -------------------------------------------------------------------------------------
	//	检查文件扩展名
	//  -------------------------------------------------------------------------------------
	if (UltraEdit.activeDocument.isExt("v")||UltraEdit.activeDocument.isExt("vh")) {
		UltraEdit.runTool("verilog");
	}
	else if (UltraEdit.activeDocument.isExt("vhd")) {
		UltraEdit.runTool("vhdl");
	}
	else if (UltraEdit.activeDocument.isExt("js")) {
		UltraEdit.runTool("JS");
	}
	else if (UltraEdit.activeDocument.isExt("py")||UltraEdit.activeDocument.isExt("pyw")) {
		UltraEdit.runTool("python");
	}
	else if (UltraEdit.activeDocument.isExt("pl")) {
		UltraEdit.runTool("perl");
	}
	else if (UltraEdit.activeDocument.isExt("c")) {
		UltraEdit.runTool("gcc");
	}
	else if (UltraEdit.activeDocument.isExt("tcl")||UltraEdit.activeDocument.isExt("tk")||UltraEdit.activeDocument.isExt("do")) {
		UltraEdit.runTool("tcl");
	}
	else{
		return;
	}
}

CompileSource(1);
