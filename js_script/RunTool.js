


function runTool(){
	var str = 0 ;
	var m = 0 ;
	var StrArray = new Array();

//	UltraEdit.outputWindow.clear();
//	UltraEdit.outputWindow.showOutput=true;
//	UltraEdit.outputWindow.showWindow(true);

	str = UltraEdit.getString("1 -> verilog\t"+
	"2 -> javascript\t"+
	"3 -> explorer\t"+
	"4 -> OpenModule\t"+
	"5 -> perl\t"+
	"6 -> ListDir\t"+
	"7 -> vhdl\t",1);
	
//	UltraEdit.outputWindow.write("strxx  is "+str+"");
	
	if(str === "1"){
		UltraEdit.runTool("verilog");
	}else if(str === "2"){
		UltraEdit.runTool("JS");
	}else if(str === "3"){
		UltraEdit.runTool("Explorer");
	}else if(str === "4"){
		UltraEdit.runTool("open_module");
	}else if(str === "5"){
		UltraEdit.runTool("perl");
	}else if(str === "6"){
		UltraEdit.runTool("ListDir");
	}else if(str === "7"){
		UltraEdit.runTool("vhdl");
	}
}

runTool();


