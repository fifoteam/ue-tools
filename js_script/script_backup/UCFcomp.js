
// include subfunction.js

function UCFcomp(){

	var TotalLine = 1;
	var CurrentLine = 0;
	var str;
	var i = 0;
	var j = 0;
	var k = 0;
	var new_file_name;
	var old_file_name;
	var NewNetName = new Array();
	var NewNetLoc = new Array();
	var OldNetName = new Array();
	var OldNetLoc = new Array();
	var RemoveNetOldIndex = new Array();
	var ChangeNetNewIndex = new Array();
	var ChangeNetOldIndex = new Array();
	var AddNetNewIndex = new Array();
	var add_net_cnt=0;
	var change_net_cnt=0;
	var remove_net_cnt=0;
	var net_name_same=0;
	var	filePath;


	UltraEdit.outputWindow.showWindow(true);
	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
	UltraEdit.activeDocument.top();
	new_file_name = UltraEdit.activeDocument.path;

	//  ===============================================================================================
	//	从新的ucf中把引脚名和引脚位置都记录下来
	//  ===============================================================================================
	//每一行依次找
	i=0;
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=RightTrimSpace(str);
		//  -------------------------------------------------------------------------------------
		//	将行尾的#netname作为关键字
		//  -------------------------------------------------------------------------------------
		if(str.indexOf(";	#")!=-1){
			NewNetName[i]	= str.substring(str.indexOf(";	#")+1,str.length);
			NewNetLoc[i]		= str.substring(str.indexOf("=")+1,str.length);

			//处理获得的两个字符串
			NewNetName[i]=LeftTrimSpace(NewNetName[i]);
			if(NewNetName[i].indexOf("\r\n")!=-1)	NewNetName[i]=NewNetName[i].substring(0,NewNetName[i].indexOf("\r\n"));	//去除行尾回车符
			if(NewNetName[i].indexOf("\n")!=-1)	NewNetName[i]=NewNetName[i].substring(0,NewNetName[i].indexOf("\n"));		//去除行尾回车符

			//因为loc后面可能还会有其他的描述，比如drive等，需要将后面的attribute全部去掉
			NewNetLoc[i]=LeftTrimSpace(NewNetLoc[i]);
			if(NewNetLoc[i].indexOf(" ")!=-1)	NewNetLoc[i]=NewNetLoc[i].substring(0,NewNetLoc[i].indexOf(" "));		//去除loc后的空格符
			if(NewNetLoc[i].indexOf("	")!=-1)	NewNetLoc[i]=NewNetLoc[i].substring(0,NewNetLoc[i].indexOf("	"));	//去除loc后的制表位
			if(NewNetLoc[i].indexOf(";")!=-1)	NewNetLoc[i]=NewNetLoc[i].substring(0,NewNetLoc[i].indexOf(";"));		//去除loc后的分号

			i++;
		}
	}

	//  ===============================================================================================
	//	打开工程的UCF文件，比较引脚名和引脚位置
	//  ===============================================================================================
	filePath = UltraEdit.clipboardContent;
	UltraEdit.open(""+filePath+"");

	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
	UltraEdit.activeDocument.top();
	old_file_name = UltraEdit.activeDocument.path;

	//  ===============================================================================================
	//	从老的ucf中把引脚名和引脚位置都记录下来
	//  ===============================================================================================
	//每一行依次找
	i=0;
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=RightTrimSpace(str);
		//  -------------------------------------------------------------------------------------
		//	将行尾的#netname作为关键字
		//  -------------------------------------------------------------------------------------
		if(str.indexOf(";	#")!=-1){
			OldNetName[i]	= str.substring(str.indexOf(";	#")+1,str.length);
			OldNetLoc[i]	= str.substring(str.indexOf("=")+1,str.length);

			//处理获得的两个字符串
			OldNetName[i]=LeftTrimSpace(OldNetName[i]);
			if(OldNetName[i].indexOf("\r\n")!=-1)	OldNetName[i]=OldNetName[i].substring(0,OldNetName[i].indexOf("\r\n"));	//去除行尾回车符
			if(OldNetName[i].indexOf("\n")!=-1)	OldNetName[i]=OldNetName[i].substring(0,OldNetName[i].indexOf("\n"));		//去除行尾回车符

			//因为loc后面可能还会有其他的描述，比如drive等，需要将后面的attribute全部去掉
			OldNetLoc[i]=LeftTrimSpace(OldNetLoc[i]);
			if(OldNetLoc[i].indexOf(" ")!=-1)	OldNetLoc[i]=OldNetLoc[i].substring(0,OldNetLoc[i].indexOf(" "));		//去除loc后的空格符
			if(OldNetLoc[i].indexOf("	")!=-1)	OldNetLoc[i]=OldNetLoc[i].substring(0,OldNetLoc[i].indexOf("	"));	//去除loc后的制表位
			if(OldNetLoc[i].indexOf(";")!=-1)	OldNetLoc[i]=OldNetLoc[i].substring(0,OldNetLoc[i].indexOf(";"));		//去除loc后的分号

			i++;
		}
	}

	//  ===============================================================================================
	//	删除net name中重复的信号名
	//  ===============================================================================================
	//删掉相同的网络名，因为相同的网络名一般都是电源和地
	//会在输出窗口中报告删掉了哪些信号
	//	NewNetName=SameNetDel(NewNetName);
	//	OldNetName=SameNetDel(OldNetName);

	//删掉相同的网络名，传入参数是数组
	j=0;
	for (i=0;i<NewNetName.length;) {

		//标志位复位
		net_name_same=0;
		//  -------------------------------------------------------------------------------------
		//	每个网络名依次从它的下一个网络名开始找，直到最后一个网络名
		//	如果找到了相同的网络名，标志位置位，删除匹配的网络名，但不能删除本身的网络名
		//	如果网络名不相同，j++
		//  -------------------------------------------------------------------------------------
		for (j=i+1;j<NewNetName.length;) {
			if (NewNetName[i] == NewNetName[j]) {
				net_name_same=1;
				NewNetName.splice(j,1);
				NewNetLoc.splice(j,1);
			}
			else {
				j++;
			}
		}
		//  -------------------------------------------------------------------------------------
		//	如果找到了相同的网络名，那么要把本身的网络名从数组里面删掉。
		//	如果没有找到相同的网络名，就要找下一个网络名了，因此i++
		//  -------------------------------------------------------------------------------------
		if (net_name_same==1) {
			NewNetName.splice(i,1);
			NewNetLoc.splice(i,1);
		}
		else {
			i++;
		}
	}

	//删掉相同的网络名，传入参数是数组
	j=0;
	for (i=0;i<OldNetName.length;) {

		//标志位复位
		net_name_same=0;
		//  -------------------------------------------------------------------------------------
		//	每个网络名依次从它的下一个网络名开始找，直到最后一个网络名
		//	如果找到了相同的网络名，标志位置位，删除匹配的网络名，但不能删除本身的网络名
		//	如果网络名不相同，j++
		//  -------------------------------------------------------------------------------------
		for (j=i+1;j<OldNetName.length;) {
			if (OldNetName[i] == OldNetName[j]) {
				net_name_same=1;
				OldNetName.splice(j,1);
				OldNetLoc.splice(j,1);
			}
			else {
				j++;
			}
		}
		//  -------------------------------------------------------------------------------------
		//	如果找到了相同的网络名，那么要把本身的网络名从数组里面删掉。
		//	如果没有找到相同的网络名，就要找下一个网络名了，因此i++
		//  -------------------------------------------------------------------------------------
		if (net_name_same==1) {
			OldNetName.splice(i,1);
			OldNetLoc.splice(i,1);
		}
		else {
			i++;
		}
	}

//	for (i=0;i<NewNetName.length;i++) {
//		UltraEdit.outputWindow.write("NewNetName is "+NewNetName[i]+"");
//		UltraEdit.outputWindow.write("NewNetLoc is "+NewNetLoc[i]+"");
//	}
//	for (i=0;i<OldNetName.length;i++) {
//		UltraEdit.outputWindow.write("OldNetName is "+OldNetName[i]+"");
//		UltraEdit.outputWindow.write("OldNetLoc is "+OldNetLoc[i]+"");
//	}
	


	//  ===============================================================================================
	//	比较两个文件中的信号名，列出 REMOVE ADD CHANGE 三种类型
	//  ===============================================================================================
	//  -------------------------------------------------------------------------------------
	//	REMOVE 如果old ucf中的net没有出现在new ucf中，说明是删除的信号
	//  -------------------------------------------------------------------------------------
	remove_net_cnt=0;
	//old ucf中的每个net都要查找一遍
	for (i=0;i<OldNetName.length; i++) {
		//标志位先复位
		net_name_same=0;
		//在new ucf中逐个查找，如果找到了，跳出循环，标志位置位
		for (j=0;j<NewNetName.length;j++) {
			if (OldNetName[i]==NewNetName[j]) {
				net_name_same=1;
				break;
			}
		}
		//如果没有找到相同的信号，计数器++。记录下数组下标。
		if (net_name_same===0) {
			RemoveNetOldIndex[remove_net_cnt]=i;
			remove_net_cnt++;
		}
	}

//	for (i=0;i<remove_net_cnt;i++) {
//		UltraEdit.outputWindow.write("RemoveNetOldIndex is "+RemoveNetOldIndex[i]+"");
//	}

	//  -------------------------------------------------------------------------------------
	//	ADD CHANGE
	//	对比新旧两个ucf文件，找出新增加的net和改动的net
	//  -------------------------------------------------------------------------------------
	add_net_cnt=0;
	change_net_cnt=0;
	//new ucf中的每个net都要查找一遍
	for (i=0;i<NewNetName.length; i++) {
		//标志位先复位
		net_name_same=0;
		//在old ucf中逐个查找，如果找到了，跳出循环，标志位置位
		for (j=0;j<OldNetName.length;j++) {
			//找到信号名相同的位置，如果引脚位置不一样，记录下来
			if (NewNetName[i]==OldNetName[j]) {
				net_name_same=1;
				if (NewNetLoc[i]!=OldNetLoc[j]) {
					ChangeNetNewIndex[change_net_cnt]=i;
					ChangeNetOldIndex[change_net_cnt]=j;
					change_net_cnt++;
				}
				break;
			}
		}
		//如果没有找到相同的信号，计数器++
		if (net_name_same===0) {
			AddNetNewIndex[add_net_cnt]=i;
			add_net_cnt++;
		}
	}
//	for (i=0;i<change_net_cnt;i++) {
//		UltraEdit.outputWindow.write("ChangeNetNewIndex is "+ChangeNetNewIndex[i]+"");
//	}
//	for (i=0;i<add_net_cnt;i++) {
//		UltraEdit.outputWindow.write("AddNetNewIndex is "+AddNetNewIndex[i]+"");
//	}

	//  ===============================================================================================
	//	打开 临时，将比较结果写入文件
	//  ===============================================================================================
	UltraEdit.open("F:\\test\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	//  -------------------------------------------------------------------------------------
	//	写SOURCE信息
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("UCF compare result\r\n");
	UltraEdit.activeDocument.write("*SOURCE*\r\n");
	UltraEdit.activeDocument.write("new ucf file is "+new_file_name+"\r\n");
	UltraEdit.activeDocument.write("old ucf file is "+old_file_name+"\r\n\r\n");

	//  -------------------------------------------------------------------------------------
	//	写REMOVE信息
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*REMOVE*\r\n");
	UltraEdit.activeDocument.write("There are "+remove_net_cnt+" net removed.\r\n");
	UltraEdit.activeDocument.write("[Net Name]		[Net Loc]\r\n");
	for (i=0;i<remove_net_cnt;i++) {
		UltraEdit.activeDocument.write(""+OldNetName[RemoveNetOldIndex[i]]+"	:	"+OldNetLoc[RemoveNetOldIndex[i]]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");

	//  -------------------------------------------------------------------------------------
	//	写ADD信息
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*ADD*\r\n");
	UltraEdit.activeDocument.write("There are "+add_net_cnt+" net added.\r\n");
	UltraEdit.activeDocument.write("[Net Name]		[Net Loc]\r\n");
	for (i=0;i<add_net_cnt;i++) {
		UltraEdit.activeDocument.write(""+NewNetName[AddNetNewIndex[i]]+"	:	"+NewNetLoc[AddNetNewIndex[i]]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");

	//  -------------------------------------------------------------------------------------
	//	写CHANGE信息
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*CHANGE*\r\n");
	UltraEdit.activeDocument.write("There are "+change_net_cnt+" net changed.\r\n");
	UltraEdit.activeDocument.write("[Net Name]		[New Loc]		[Old Loc]\r\n");
	for (i=0;i<change_net_cnt;i++) {
		UltraEdit.activeDocument.write(""+NewNetName[ChangeNetNewIndex[i]]+"\t\t:\t"+NewNetLoc[ChangeNetNewIndex[i]]+"\t\t\t:\t"+OldNetLoc[ChangeNetOldIndex[i]]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");


	UltraEdit.activeDocument.top();
	UltraEdit.save();


}

UCFcomp();
