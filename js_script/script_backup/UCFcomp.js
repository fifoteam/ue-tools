
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
	//	���µ�ucf�а�������������λ�ö���¼����
	//  ===============================================================================================
	//ÿһ��������
	i=0;
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=RightTrimSpace(str);
		//  -------------------------------------------------------------------------------------
		//	����β��#netname��Ϊ�ؼ���
		//  -------------------------------------------------------------------------------------
		if(str.indexOf(";	#")!=-1){
			NewNetName[i]	= str.substring(str.indexOf(";	#")+1,str.length);
			NewNetLoc[i]		= str.substring(str.indexOf("=")+1,str.length);

			//�����õ������ַ���
			NewNetName[i]=LeftTrimSpace(NewNetName[i]);
			if(NewNetName[i].indexOf("\r\n")!=-1)	NewNetName[i]=NewNetName[i].substring(0,NewNetName[i].indexOf("\r\n"));	//ȥ����β�س���
			if(NewNetName[i].indexOf("\n")!=-1)	NewNetName[i]=NewNetName[i].substring(0,NewNetName[i].indexOf("\n"));		//ȥ����β�س���

			//��Ϊloc������ܻ���������������������drive�ȣ���Ҫ�������attributeȫ��ȥ��
			NewNetLoc[i]=LeftTrimSpace(NewNetLoc[i]);
			if(NewNetLoc[i].indexOf(" ")!=-1)	NewNetLoc[i]=NewNetLoc[i].substring(0,NewNetLoc[i].indexOf(" "));		//ȥ��loc��Ŀո��
			if(NewNetLoc[i].indexOf("	")!=-1)	NewNetLoc[i]=NewNetLoc[i].substring(0,NewNetLoc[i].indexOf("	"));	//ȥ��loc����Ʊ�λ
			if(NewNetLoc[i].indexOf(";")!=-1)	NewNetLoc[i]=NewNetLoc[i].substring(0,NewNetLoc[i].indexOf(";"));		//ȥ��loc��ķֺ�

			i++;
		}
	}

	//  ===============================================================================================
	//	�򿪹��̵�UCF�ļ����Ƚ�������������λ��
	//  ===============================================================================================
	filePath = UltraEdit.clipboardContent;
	UltraEdit.open(""+filePath+"");

	UltraEdit.activeDocument.bottom();
	TotalLine = UltraEdit.activeDocument.currentLineNum;
	UltraEdit.activeDocument.top();
	old_file_name = UltraEdit.activeDocument.path;

	//  ===============================================================================================
	//	���ϵ�ucf�а�������������λ�ö���¼����
	//  ===============================================================================================
	//ÿһ��������
	i=0;
	for(CurrentLine=0;CurrentLine<=TotalLine;CurrentLine++){
		str=StringCopy(CurrentLine);
		str=RightTrimSpace(str);
		//  -------------------------------------------------------------------------------------
		//	����β��#netname��Ϊ�ؼ���
		//  -------------------------------------------------------------------------------------
		if(str.indexOf(";	#")!=-1){
			OldNetName[i]	= str.substring(str.indexOf(";	#")+1,str.length);
			OldNetLoc[i]	= str.substring(str.indexOf("=")+1,str.length);

			//�����õ������ַ���
			OldNetName[i]=LeftTrimSpace(OldNetName[i]);
			if(OldNetName[i].indexOf("\r\n")!=-1)	OldNetName[i]=OldNetName[i].substring(0,OldNetName[i].indexOf("\r\n"));	//ȥ����β�س���
			if(OldNetName[i].indexOf("\n")!=-1)	OldNetName[i]=OldNetName[i].substring(0,OldNetName[i].indexOf("\n"));		//ȥ����β�س���

			//��Ϊloc������ܻ���������������������drive�ȣ���Ҫ�������attributeȫ��ȥ��
			OldNetLoc[i]=LeftTrimSpace(OldNetLoc[i]);
			if(OldNetLoc[i].indexOf(" ")!=-1)	OldNetLoc[i]=OldNetLoc[i].substring(0,OldNetLoc[i].indexOf(" "));		//ȥ��loc��Ŀո��
			if(OldNetLoc[i].indexOf("	")!=-1)	OldNetLoc[i]=OldNetLoc[i].substring(0,OldNetLoc[i].indexOf("	"));	//ȥ��loc����Ʊ�λ
			if(OldNetLoc[i].indexOf(";")!=-1)	OldNetLoc[i]=OldNetLoc[i].substring(0,OldNetLoc[i].indexOf(";"));		//ȥ��loc��ķֺ�

			i++;
		}
	}

	//  ===============================================================================================
	//	ɾ��net name���ظ����ź���
	//  ===============================================================================================
	//ɾ����ͬ������������Ϊ��ͬ��������һ�㶼�ǵ�Դ�͵�
	//������������б���ɾ������Щ�ź�
	//	NewNetName=SameNetDel(NewNetName);
	//	OldNetName=SameNetDel(OldNetName);

	//ɾ����ͬ�����������������������
	j=0;
	for (i=0;i<NewNetName.length;) {

		//��־λ��λ
		net_name_same=0;
		//  -------------------------------------------------------------------------------------
		//	ÿ�����������δ�������һ����������ʼ�ң�ֱ�����һ��������
		//	����ҵ�����ͬ������������־λ��λ��ɾ��ƥ�����������������ɾ�������������
		//	�������������ͬ��j++
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
		//	����ҵ�����ͬ������������ôҪ�ѱ��������������������ɾ����
		//	���û���ҵ���ͬ������������Ҫ����һ���������ˣ����i++
		//  -------------------------------------------------------------------------------------
		if (net_name_same==1) {
			NewNetName.splice(i,1);
			NewNetLoc.splice(i,1);
		}
		else {
			i++;
		}
	}

	//ɾ����ͬ�����������������������
	j=0;
	for (i=0;i<OldNetName.length;) {

		//��־λ��λ
		net_name_same=0;
		//  -------------------------------------------------------------------------------------
		//	ÿ�����������δ�������һ����������ʼ�ң�ֱ�����һ��������
		//	����ҵ�����ͬ������������־λ��λ��ɾ��ƥ�����������������ɾ�������������
		//	�������������ͬ��j++
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
		//	����ҵ�����ͬ������������ôҪ�ѱ��������������������ɾ����
		//	���û���ҵ���ͬ������������Ҫ����һ���������ˣ����i++
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
	//	�Ƚ������ļ��е��ź������г� REMOVE ADD CHANGE ��������
	//  ===============================================================================================
	//  -------------------------------------------------------------------------------------
	//	REMOVE ���old ucf�е�netû�г�����new ucf�У�˵����ɾ�����ź�
	//  -------------------------------------------------------------------------------------
	remove_net_cnt=0;
	//old ucf�е�ÿ��net��Ҫ����һ��
	for (i=0;i<OldNetName.length; i++) {
		//��־λ�ȸ�λ
		net_name_same=0;
		//��new ucf��������ң�����ҵ��ˣ�����ѭ������־λ��λ
		for (j=0;j<NewNetName.length;j++) {
			if (OldNetName[i]==NewNetName[j]) {
				net_name_same=1;
				break;
			}
		}
		//���û���ҵ���ͬ���źţ�������++����¼�������±ꡣ
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
	//	�Ա��¾�����ucf�ļ����ҳ������ӵ�net�͸Ķ���net
	//  -------------------------------------------------------------------------------------
	add_net_cnt=0;
	change_net_cnt=0;
	//new ucf�е�ÿ��net��Ҫ����һ��
	for (i=0;i<NewNetName.length; i++) {
		//��־λ�ȸ�λ
		net_name_same=0;
		//��old ucf��������ң�����ҵ��ˣ�����ѭ������־λ��λ
		for (j=0;j<OldNetName.length;j++) {
			//�ҵ��ź�����ͬ��λ�ã��������λ�ò�һ������¼����
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
		//���û���ҵ���ͬ���źţ�������++
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
	//	�� ��ʱ�����ȽϽ��д���ļ�
	//  ===============================================================================================
	UltraEdit.open("F:\\test\\UE_TMP.v");
	UltraEdit.activeDocument.selectAll();
	UltraEdit.activeDocument.deleteText();

	//  -------------------------------------------------------------------------------------
	//	дSOURCE��Ϣ
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("UCF compare result\r\n");
	UltraEdit.activeDocument.write("*SOURCE*\r\n");
	UltraEdit.activeDocument.write("new ucf file is "+new_file_name+"\r\n");
	UltraEdit.activeDocument.write("old ucf file is "+old_file_name+"\r\n\r\n");

	//  -------------------------------------------------------------------------------------
	//	дREMOVE��Ϣ
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*REMOVE*\r\n");
	UltraEdit.activeDocument.write("There are "+remove_net_cnt+" net removed.\r\n");
	UltraEdit.activeDocument.write("[Net Name]		[Net Loc]\r\n");
	for (i=0;i<remove_net_cnt;i++) {
		UltraEdit.activeDocument.write(""+OldNetName[RemoveNetOldIndex[i]]+"	:	"+OldNetLoc[RemoveNetOldIndex[i]]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");

	//  -------------------------------------------------------------------------------------
	//	дADD��Ϣ
	//  -------------------------------------------------------------------------------------
	UltraEdit.activeDocument.write("*ADD*\r\n");
	UltraEdit.activeDocument.write("There are "+add_net_cnt+" net added.\r\n");
	UltraEdit.activeDocument.write("[Net Name]		[Net Loc]\r\n");
	for (i=0;i<add_net_cnt;i++) {
		UltraEdit.activeDocument.write(""+NewNetName[AddNetNewIndex[i]]+"	:	"+NewNetLoc[AddNetNewIndex[i]]+"\r\n");
	}
	UltraEdit.activeDocument.write("\r\n");

	//  -------------------------------------------------------------------------------------
	//	дCHANGE��Ϣ
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
