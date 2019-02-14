//-------------------------------------------------------------------------------------------------
//  -- 版权所有者   : 中国大恒（集团）有限公司北京图像视觉技术分公司, 2010 -2015.
//  -- 保密级别     ：绝密.
//  -- 部门         : 硬件部，FPGA工作组
//  -- 模块名       : frame_info_analysis
//  -- 设计者       : 邢海涛
//-------------------------------------------------------------------------------------------------
//
//  -- 版本记录 :
//
//  -- 作者         :| 版本号	:| 修改日期				:|  修改说明
//-------------------------------------------------------------------------------------------------
//  -- 邢海涛       :| V1.0		:| 2018/8/4 11:55:28	:|  划分模块端口
//-------------------------------------------------------------------------------------------------
//
//  -- 模块描述     :
//              1)  : daheng imaging 协议规范，定义了图像信息格式、图像统计格式
//
//              2)  : 1v表示 version 1.x ，1表示大版本号，该版本号升级表示不再向下兼容，x表示小版本号，升级该版本号表示继续向下兼容
//
//              3)  : 升级该模块时应该尽量保持向下兼容。修改parameter，修改端口，视为兼容。向后添加协议，视为兼容。修改之前的协议，视为不兼容。
//
//-------------------------------------------------------------------------------------------------
//`include			"frame_info_analysis_def.v"
//仿真单位/精度
`timescale 1ns/1ps
//-------------------------------------------------------------------------------------------------
module frame_info_analysis # (
	parameter	INFO_SIZE									= 256		,	//INFO段数据量，以byte为单位
	parameter	STATIS_SIZE									= 256		,	//STATIS段数据量，以byte为单位
	parameter	SHORT_REG_WD   								= 16		,	//短寄存器位宽
	parameter	REG_WD  						 			= 32		,	//寄存器位宽
	parameter	LONG_REG_WD  						 		= 64		,	//长寄存器位宽
	parameter	GEV_DE_WD									= 2			,	//数据单元使能位宽，4byte数据使用一个使能位
	parameter	GEV_DATA_WD									= 64			//数据位宽，支持32、64、128
	)
	(
	//  -------------------------------------------------------------------------------------
	//  时钟和复位信号
	//  -------------------------------------------------------------------------------------
	input							clk									,	//工作时钟
	input							reset								,	//工作时钟域的复位信号，高有效
	//  -------------------------------------------------------------------------------------
	//  输入命令数据
	//  -------------------------------------------------------------------------------------
	input							i_info_flag							,	//clk时钟域，信息段标志，高有效
	input							i_statis_flag						,	//clk时钟域，统计段标志，高有效
	input	[GEV_DE_WD-1:0]			iv_dval								,	//clk时钟域，数据有效信号，单bit代表4byte，1-表示数据有效，0-表示数据无效
	input	[GEV_DATA_WD-1:0]		iv_cmd_data							,	//clk时钟域，命令数据，位宽可变，支持32、64、128
	//  -------------------------------------------------------------------------------------
	//	解析的打包数据
	//  -------------------------------------------------------------------------------------
	output	[LONG_REG_WD-1:0]		ov_block_id							,	//clk时钟域，block id，当前roi的帧号
	output	[LONG_REG_WD-1:0]		ov_timestamp						,	//clk时钟域，time stamp，当前roi的时间戳
	output	[REG_WD-1:0]			ov_pixel_format						,	//clk时钟域，pixel format，当前roi的像素格式
	output	[SHORT_REG_WD-1:0]		ov_offset_x							,	//clk时钟域，offset_x，当前roi的水平偏移
	output	[SHORT_REG_WD-1:0]		ov_offset_y							,	//clk时钟域，offset_y，当前roi的垂直偏移
	output	[SHORT_REG_WD-1:0]		ov_width							,	//clk时钟域，width，当前roi的宽度
	output	[SHORT_REG_WD-1:0]		ov_height							,	//clk时钟域，height，当前roi的高度
	output	[REG_WD-1:0]			ov_image_size						,	//clk时钟域，image size，当前roi图像大小，以byte为单位
	output	[REG_WD-1:0]			ov_payload_size						,	//clk时钟域，payload size，当前roi图像+chunk大小，以byte为单位
	output	[LONG_REG_WD-1:0]		ov_frame_interval					,	//clk时钟域，sensor输出的图像间隔，以ns为单位，开采之后第一帧的frame interval的数值为0
	output							o_chunk_mode_active					,	//clk时钟域，chunk开关寄存器
	output							o_chunkid_en_img					,	//clk时钟域，image开关寄存器
	output							o_chunkid_en_fid					,	//clk时钟域，frame id开关寄存器
	output							o_chunkid_en_ts						,	//clk时钟域，时间戳开关寄存器
	output							o_chunkid_en_fint					,	//clk时钟域，frame interval开关寄存器
	output	[SHORT_REG_WD-1:0]		ov_status							,	//clk时钟域，status，USB3 VISION协议专有，实际的整幅图的状态
	output	[REG_WD-1:0]			ov_expect_payload_size				,	//clk时钟域，expect payload size，期望的整幅图的图像+chunk大小
	output	[REG_WD-1:0]			ov_valid_payload_size				,	//clk时钟域，valid payload size，实际的整幅图的图像+chunk大小
	);


	//	ref paramters

	//	-------------------------------------------------------------------------------------
	//	计算出数据位宽对应的字节个数
	//	-------------------------------------------------------------------------------------
	localparam	BYTE_NUM		= GEV_DATA_WD/8;
	//	-------------------------------------------------------------------------------------
	//	计算出info_byte_cnt的位宽
	//	-------------------------------------------------------------------------------------
	localparam	INFO_BYTE_CNT_WD		= log2(INFO_SIZE+1);
	localparam	STATIS_BYTE_CNT_WD		= log2(STATIS_SIZE+1);


	//	ref functions
	//	-------------------------------------------------------------------------------------
	//	取对数，上取整
	//	log2取对数的时候，有两种情况。分别是计算计数器的位宽和计算通道偏移的bit数
	//	1.计算计数器的位宽，使用 y = log2(x+1)，当x=2^n时，y=n+1，可以表示0-2^(n+1)-1的数值
	//	2.计算通道偏移的bit数，使用 y = log2(x)，当x=2^n时，y=n，可以表示0-2^n-1的数值
	//	-------------------------------------------------------------------------------------
	function integer log2 (input integer xx);
		integer x;
		begin
			x	= xx-1 ;
			for (log2=0;x>0;log2=log2+1) begin
				x	= x >> 1;
			end
		end
	endfunction

	//	-------------------------------------------------------------------------------------
	//	max取最大值
	//	-------------------------------------------------------------------------------------
	function integer max(input integer n1, input integer n2);
		max = (n1 > n2) ? n1 : n2;
	endfunction


	//	ref signals

	reg		[LONG_REG_WD-1:0]				blockid				= 'b0;
	reg		[LONG_REG_WD-1:0]				timestamp			= 'b0;
	reg		[REG_WD-1:0]					pixel_format		= 'b0;
	reg		[SHORT_REG_WD-1:0]				width				= 'b0;
	reg		[SHORT_REG_WD-1:0]				height				= 'b0;
	reg		[SHORT_REG_WD-1:0]				offset_x			= 'b0;
	reg		[SHORT_REG_WD-1:0]				offset_y			= 'b0;
	reg		[SHORT_REG_WD-1:0]				chunk_info			= 'b0;
	reg		[REG_WD-1:0]					image_size			= 'b0;
	reg		[REG_WD-1:0]					payload_size		= 'b0;
	reg		[LONG_REG_WD-1:0]				frame_interval		= 'b0;
	reg		[SHORT_REG_WD-1:0]				status				= 'b0;
	reg		[REG_WD-1:0]					expect_payload_size	= 'b0;
	reg		[REG_WD-1:0]					valid_payload_size	= 'b0;
	reg		[INFO_BYTE_CNT_WD-1:0]			info_byte_cnt		= 'b0;
	reg		[STATIS_BYTE_CNT_WD-1:0]		statis_byte_cnt		= 'b0;
	reg		[SHORT_REG_WD-1:0]				status_info			= 'b0;
	reg		[SHORT_REG_WD-1:0]				status_statis		= 'b0;
	reg										status_info_en		= 'b0;
	reg										status_statis_en	= 'b0;

	//	ref ARCHITECTURE

	//	===============================================================================================
	//	ref 按照frame info协议解析
	//	===============================================================================================
	//	-------------------------------------------------------------------------------------
	//	ref byte cnt 以字节为单位的计数器
	//	1.当 i_info_flag 或者 i_statis_flag 为0时，计数器清零.当停流时，计数器复位
	//	2.在info段或者statis段，当数据有效时，计数器累加，累加的步长是数据宽度
	//	3.当计数器达到最大值时，停止累加
	//	-------------------------------------------------------------------------------------
	always @ (posedge clk) begin
		if(i_info_flag==1'b0) begin
			info_byte_cnt	<= 'b0;
		end
		else if(i_info_flag==1'b1 && iv_dval[0]==1'b1) begin
			if(info_byte_cnt==INFO_SIZE-BYTE_NUM) begin
				info_byte_cnt	<= info_byte_cnt;
			end
			else begin
				info_byte_cnt	<= info_byte_cnt + BYTE_NUM;
			end
		end
	end

	//	-------------------------------------------------------------------------------------
	//	ref byte cnt 以字节为单位的计数器
	//	1.当 i_info_flag 或者 i_statis_flag 为0时，计数器清零.当停流时，计数器复位
	//	2.在info段或者statis段，当数据有效时，计数器累加，累加的步长是数据宽度
	//	3.当计数器达到最大值时，停止累加
	//	-------------------------------------------------------------------------------------
	always @ (posedge clk) begin
		if(i_statis_flag==1'b0) begin
			statis_byte_cnt	<= 'b0;
		end
		else if(i_statis_flag==1'b1 && iv_dval[0]==1'b1) begin
			if(statis_byte_cnt==STATIS_SIZE-BYTE_NUM) begin
				statis_byte_cnt	<= statis_byte_cnt;
			end
			else begin
				statis_byte_cnt	<= statis_byte_cnt + BYTE_NUM;
			end
		end
	end

	//	-------------------------------------------------------------------------------------
	//	按照frame info协议解析info段信息
	//	1.只有当 i_info_flag =1，且 iv_dval[0]=1 时，才能解析数据
	//	2.status_info_en自清零，只有在解析status字段的时候才能=1，其他时候为0
	//	3.8byte解析，因此info_byte_cnt的低3bit无需判断
	//	4.停流时输出不关心，因此i_stream_enable信号没有引入到解析流程
	//	-------------------------------------------------------------------------------------
	always @ (posedge clk) begin
		if(i_info_flag==1'b1 && iv_dval[0]==1'b1) begin
			status_info_en		<= 1'b0;
			case(info_byte_cnt[INFO_BYTE_CNT_WD-1:3])
				0	: begin
					blockid			<= iv_cmd_data;
				end
				1	: begin
					timestamp		<= iv_cmd_data;
				end
				2	: begin
					pixel_format	<= iv_cmd_data[31:0];
					width			<= iv_cmd_data[47:32];
				end
				3	: begin
					height			<= iv_cmd_data[15:0];
					offset_x		<= iv_cmd_data[47:32];
				end
				4	: begin
					offset_y		<= iv_cmd_data[15:0];
					chunk_info		<= iv_cmd_data[47:32];
				end
				5	: begin
					image_size		<= iv_cmd_data[31:0];
					payload_size	<= iv_cmd_data[63:32];
				end
				6	: begin
					frame_interval	<= iv_cmd_data;
				end
				7	: begin
					status_info		<= iv_cmd_data[15:0];
					status_info_en	<= 1'b1;
				end
			endcase
		end
		else begin
			status_info_en		<= 1'b0;
		end
	end

	//	-------------------------------------------------------------------------------------
	//	按照frame info协议解析statis段信息
	//	1.只有当 i_statis_flag =1，且 iv_dval[0]=1 时，才能解析数据
	//	2.status_statis_en自清零，只有在解析status字段的时候才能=1，其他时候为0
	//	3.8byte解析，因此info_byte_cnt的低3bit无需判断
	//	-------------------------------------------------------------------------------------
	always @ (posedge clk) begin
		if(i_statis_flag==1'b1 && iv_dval[0]==1'b1) begin
			status_statis_en		<= 1'b0;
			case(statis_byte_cnt[STATIS_BYTE_CNT_WD-1:3])
				0	: begin
					expect_payload_size		<= iv_cmd_data[31:0];
					valid_payload_size		<= iv_cmd_data[63:32];
				end
				1	: begin
					status_statis			<= iv_cmd_data[15:0];
					status_statis_en		<= 1'b1;
				end
			endcase
		end
		else begin
			status_statis_en		<= 1'b0;
		end
	end

	//	-------------------------------------------------------------------------------------
	//	由于status字段在info和statis段都会出现，因此需要通过使能信号选择
	//	-------------------------------------------------------------------------------------
	always @ (posedge clk) begin
		if(status_info_en==1'b1) begin
			status	<= status_info;
		end
		else if(status_statis_en) begin
			status	<= status_statis;
		end
	end

	//	-------------------------------------------------------------------------------------
	//	ref  output
	//	-------------------------------------------------------------------------------------
	assign	ov_block_id					= blockid;
	assign	ov_timestamp				= timestamp;
	assign	ov_pixel_format				= pixel_format;
	assign	ov_offset_x					= offset_x;
	assign	ov_offset_y					= offset_y;
	assign	ov_width					= width;
	assign	ov_height					= height;
	assign	ov_image_size				= image_size;
	assign	ov_payload_size				= payload_size;
	assign	ov_frame_interval			= frame_interval;
	assign	o_chunk_mode_active			= chunk_info[0];
	assign	o_chunkid_en_img			= chunk_info[1];
	assign	o_chunkid_en_fid			= chunk_info[2];
	assign	o_chunkid_en_ts				= chunk_info[3];
	assign	o_chunkid_en_fint			= chunk_info[4];
	assign	ov_status					= status;
	assign	ov_expect_payload_size		= expect_payload_size;
	assign	ov_valid_payload_size		= valid_payload_size;


endmodule
