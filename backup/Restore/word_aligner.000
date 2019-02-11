//-------------------------------------------------------------------------------------------------
//  -- 版权所有者   : 中国大恒（集团）有限公司北京图像视觉技术分公司, 2010 -2015.
//  -- 保密级别     ：绝密.
//  -- 部门         : 硬件部，FPGA工作组
//  -- 模块名       : word_aligner
//  -- 设计者       : 邢海涛
//-------------------------------------------------------------------------------------------------
//
//  -- 版本记录 :
//
//  -- 作者         :| 修改日期				:|  修改说明
//-------------------------------------------------------------------------------------------------
//  -- 邢海涛       :| 2015/10/26 16:54:06	:|  初始版本
//-------------------------------------------------------------------------------------------------
//
//  -- 模块描述     :
//              1)  : ... ...
//
//              2)  : ... ...
//
//              3)  : ... ...
//
//-------------------------------------------------------------------------------------------------
//仿真单位/精度
`timescale 1ns/1ps
//-------------------------------------------------------------------------------------------------

module word_aligner # (
	parameter		ALIGN_MODE				= "MASTER"	,	//"MASTER" or "SLAVE"，master模式输出 window_num和div_cnt_lock
	parameter		SER_FIRST_BIT			= "MSB"		,	//"LSB" or "MSB" , first bit to the receiver
	parameter		DESER_WIDTH				= 5				//解串因子
	)
	(
	input									clk				,	//输入并行时钟
	input									reset			,	//并行时钟域复位信号
	input	[DESER_WIDTH-1:0]				iv_data			,	//输入并行数据
	output									o_clk_en		,	//时钟使能信号
	output									o_sync			,	//控制数据标识
	output	[2*DESER_WIDTH-1:0]				ov_data			,	//已经对齐后的数据
	input	[2:0]							iv_window_num	,	//slave模式需要用到
	input									i_div_cnt		,	//slave模式需要用到
	input									i_div_cnt_lock	,	//slave模式需要用到
	output	[2:0]							ov_window_num	,	//master模式需要输出
	output									o_div_cnt		,	//master模式需要输出
	output									o_div_cnt_lock		//master模式需要输出
	);

	//	ref signals
	//	//MSB 先输出的是高字节，然后左移，最后输出的低字节 ，先进来的同步字在高位，大端
	//		localparam	SYNC_WORD	= {{2*DESER_WIDTH{1'b1}},{4*DESER_WIDTH{1'b0}}};
	//	//LSB,	先输出低字节，然后右移，最后输出的是高字节 ，先进来的同步字在低位，小端
	//		localparam	SYNC_WORD	= {{4*DESER_WIDTH{1'b0}},{2*DESER_WIDTH{1'b1}}};

	localparam	SYNC_WORD	= (SER_FIRST_BIT == "MSB") ? {{2*DESER_WIDTH{1'b1}},{4*DESER_WIDTH{1'b0}}} : {{4*DESER_WIDTH{1'b0}},{2*DESER_WIDTH{1'b1}}};

	reg		[6*DESER_WIDTH-1:0]				din_shift		= {(3*DESER_WIDTH){2'b10}};
	wire	[6*DESER_WIDTH-1:0]				window_0		;
	wire	[6*DESER_WIDTH-1:0]				window_1		;
	wire	[6*DESER_WIDTH-1:0]				window_2		;
	wire	[6*DESER_WIDTH-1:0]				window_3		;
	wire	[6*DESER_WIDTH-1:0]				window_4		;
	wire	[6*DESER_WIDTH-1:0]				window_5		;
	reg										div_cnt			= 1'b0;
	reg										div_cnt_lock	= 1'b0;
	reg										sync_reg		= 1'b0;
	reg										sync_reg_dly0	= 1'b0;
	reg										sync_reg_dly1	= 1'b0;
	reg		[2:0]							window_num		= 3'b0;
	reg		[2*DESER_WIDTH-1:0]				word_align_reg	= {(2*DESER_WIDTH){1'b1}};

	//	ref ARCHITECTURE

	//	-------------------------------------------------------------------------------------
	//	时钟分频计数器，用于产生时钟使能信号
	//	-------------------------------------------------------------------------------------
	generate
		if(ALIGN_MODE=="MASTER") begin
			always @ (posedge clk or posedge reset) begin
				if(reset) begin
					div_cnt	<= 1'b0;
				end
				else begin
					div_cnt	<= div_cnt + 1'b1;
				end
			end
			assign	o_clk_en	= div_cnt;
			assign	o_div_cnt	= div_cnt;
		end
		else if(ALIGN_MODE=="SLAVE") begin
			always @ ( * ) begin
				div_cnt	<= i_div_cnt;
			end
			assign	o_clk_en	= 1'b0;
			assign	o_div_cnt	= 1'b0;
		end
	endgenerate

	//	-------------------------------------------------------------------------------------
	//	24bit移位寄存器
	//	--缓存2个word数据
	//	--串行数据是Msb的方式，首先进来的数据是高字节，移位寄存器要从右往左移动
	//	--最好加上复位信号，多个通道之间，在同一时刻开始移位。复位信号要是clk时钟域的同步信号
	//	--复位之后是全1
	//	-------------------------------------------------------------------------------------
	generate
		if(SER_FIRST_BIT == "MSB") begin
			always @ (posedge clk or posedge reset) begin
				if(reset) begin
					din_shift	<= {(3*DESER_WIDTH){2'b10}};
				end
				else begin
					din_shift	<= {din_shift[5*DESER_WIDTH-1:0],iv_data};
				end
			end
		end
		//	-------------------------------------------------------------------------------------
		//	24bit移位寄存器
		//	--缓存2个word数据
		//	--串行数据是LSB的方式，首先进来的数据是低字节，移位寄存器要从左往右移动
		else if(SER_FIRST_BIT == "LSB") begin
			always @ (posedge clk or posedge reset) begin
				if(reset) begin
					din_shift	<= {(3*DESER_WIDTH){2'b10}};
				end
				else begin
					din_shift	<= {iv_data,din_shift[6*DESER_WIDTH-1:DESER_WIDTH]};
				end
			end
		end
	endgenerate


	//	-------------------------------------------------------------------------------------
	//	字节边界窗口
	//	--解串模块每次输出DESER_WIDTH bit数据，因此只有DESER_WIDTH 个窗口
	//	--使能信号 高 低 期间，各有DESER_WIDTH个窗口，因此共有2*DESER_WIDTH个窗口
	//	-------------------------------------------------------------------------------------
	generate

		if(DESER_WIDTH==5) begin
			if(SER_FIRST_BIT=="MSB") begin
				assign	window_0	= {din_shift[5*DESER_WIDTH-1:0],iv_data[DESER_WIDTH-1:0]};
				assign	window_1	= {din_shift[5*DESER_WIDTH  :0],iv_data[DESER_WIDTH-1:DESER_WIDTH-4]};
				assign	window_2	= {din_shift[5*DESER_WIDTH+1:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-3]};
				assign	window_3	= {din_shift[5*DESER_WIDTH+2:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-2]};
				assign	window_4	= {din_shift[5*DESER_WIDTH+3:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-1]};
			end
			else begin
				assign	window_0	= {iv_data[DESER_WIDTH-1:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH]};
				assign	window_1	= {iv_data[DESER_WIDTH-2:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-1]};
				assign	window_2	= {iv_data[DESER_WIDTH-3:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-2]};
				assign	window_3	= {iv_data[DESER_WIDTH-4:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-3]};
				assign	window_4	= {iv_data[DESER_WIDTH-5:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-4]};
			end
		end
		else if(DESER_WIDTH==6) begin
			if(SER_FIRST_BIT=="MSB") begin
				assign	window_0	= {din_shift[5*DESER_WIDTH-1:0],iv_data[DESER_WIDTH-1:0]};
				assign	window_1	= {din_shift[5*DESER_WIDTH  :0],iv_data[DESER_WIDTH-1:DESER_WIDTH-5]};
				assign	window_2	= {din_shift[5*DESER_WIDTH+1:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-4]};
				assign	window_3	= {din_shift[5*DESER_WIDTH+2:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-3]};
				assign	window_4	= {din_shift[5*DESER_WIDTH+3:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-2]};
				assign	window_5	= {din_shift[5*DESER_WIDTH+4:0],iv_data[DESER_WIDTH-1:DESER_WIDTH-1]};
			end
			else begin
				assign	window_0	= {iv_data[DESER_WIDTH-1:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH]};
				assign	window_1	= {iv_data[DESER_WIDTH-2:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-1]};
				assign	window_2	= {iv_data[DESER_WIDTH-3:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-2]};
				assign	window_3	= {iv_data[DESER_WIDTH-4:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-3]};
				assign	window_4	= {iv_data[DESER_WIDTH-5:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-4]};
				assign	window_5	= {iv_data[DESER_WIDTH-6:0],din_shift[6*DESER_WIDTH-1:DESER_WIDTH-5]};
			end
		end
	endgenerate


	//	-------------------------------------------------------------------------------------
	//	判断同步字
	//	--只要有一个窗口与同步字一样，说明这个窗口就是最佳字边界
	//	--保存该窗口编号和当前的en状态
	//	-------------------------------------------------------------------------------------
	generate
		if(ALIGN_MODE=="MASTER") begin
			if(DESER_WIDTH==5) begin
				always @ (posedge clk or posedge reset) begin
					if(reset) begin
						window_num		<= 3'd0;
						div_cnt_lock	<= 1'b0;
					end
					else begin
						if(window_0==SYNC_WORD) begin
							window_num		<= 3'd0;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_1==SYNC_WORD) begin
							window_num		<= 3'd1;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_2==SYNC_WORD) begin
							window_num		<= 3'd2;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_3==SYNC_WORD) begin
							window_num		<= 3'd3;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_4==SYNC_WORD) begin
							window_num		<= 3'd4;
							div_cnt_lock	<= div_cnt;
						end
					end
				end
			end
			else if(DESER_WIDTH==6) begin
				always @ (posedge clk or posedge reset) begin
					if(reset) begin
						window_num		<= 3'd0;
						div_cnt_lock	<= 1'b0;
					end
					else begin
						if(window_0==SYNC_WORD) begin
							window_num		<= 3'd0;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_1==SYNC_WORD) begin
							window_num		<= 3'd1;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_2==SYNC_WORD) begin
							window_num		<= 3'd2;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_3==SYNC_WORD) begin
							window_num		<= 3'd3;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_4==SYNC_WORD) begin
							window_num		<= 3'd4;
							div_cnt_lock	<= div_cnt;
						end
						else if(window_5==SYNC_WORD) begin
							window_num		<= 3'd5;
							div_cnt_lock	<= div_cnt;
						end
					end
				end
			end
			assign	ov_window_num	= window_num;
			assign	o_div_cnt_lock	= div_cnt_lock;
		end
		else if(ALIGN_MODE=="SLAVE") begin
			always @ ( * ) begin
				window_num		<= iv_window_num;
				div_cnt_lock	<= i_div_cnt_lock;
			end
			assign	ov_window_num	= 3'b0;
			assign	o_div_cnt_lock	= 1'b0;
		end
	endgenerate

	//	-------------------------------------------------------------------------------------
	//	同步字之后是控制字
	//	--解析了同步字之后，可以顺便把控制字的位置也固定了
	//	-------------------------------------------------------------------------------------
	generate
		if(ALIGN_MODE=="MASTER") begin
			if(DESER_WIDTH==5) begin
				always @ (posedge clk) begin
					if(window_0==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_1==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_2==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_3==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_4==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(div_cnt==div_cnt_lock) begin
						sync_reg		<= 1'b0;
					end
				end
			end
			else if(DESER_WIDTH==6) begin
				always @ (posedge clk) begin
					if(window_0==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_1==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_2==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_3==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_4==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(window_5==SYNC_WORD) begin
						sync_reg		<= 1'b1;
					end
					else if(div_cnt==div_cnt_lock) begin
						sync_reg		<= 1'b0;
					end
				end
			end
		end
	endgenerate

	//	-------------------------------------------------------------------------------------
	//	延时2拍之后，控制字的位置和输出对齐
	//	-------------------------------------------------------------------------------------
	generate
		if(ALIGN_MODE=="MASTER") begin
			always @ (posedge clk) begin
				if(div_cnt==div_cnt_lock) begin
					sync_reg_dly0	<= sync_reg;
					sync_reg_dly1	<= sync_reg_dly0;
				end
			end
			assign o_sync	= sync_reg_dly1;
		end
		else if(ALIGN_MODE=="SLAVE") begin
			assign o_sync	= 1'b0;
		end
	endgenerate

	//	-------------------------------------------------------------------------------------
	//	输出数据
	//	-------------------------------------------------------------------------------------
	generate
		if(DESER_WIDTH==5) begin
			always @ (posedge clk) begin
				if(div_cnt==div_cnt_lock) begin
					case(window_num)
						0		: word_align_reg	<= window_0[4*DESER_WIDTH-1:2*DESER_WIDTH];
						1		: word_align_reg	<= window_1[4*DESER_WIDTH-1:2*DESER_WIDTH];
						2		: word_align_reg	<= window_2[4*DESER_WIDTH-1:2*DESER_WIDTH];
						3		: word_align_reg	<= window_3[4*DESER_WIDTH-1:2*DESER_WIDTH];
						4		: word_align_reg	<= window_4[4*DESER_WIDTH-1:2*DESER_WIDTH];
						default	: word_align_reg	<= window_0[4*DESER_WIDTH-1:2*DESER_WIDTH];
					endcase
				end
			end
		end
		else if(DESER_WIDTH==6) begin
			always @ (posedge clk) begin
				if(div_cnt==div_cnt_lock) begin
					case(window_num)
						0		: word_align_reg	<= window_0[4*DESER_WIDTH-1:2*DESER_WIDTH];
						1		: word_align_reg	<= window_1[4*DESER_WIDTH-1:2*DESER_WIDTH];
						2		: word_align_reg	<= window_2[4*DESER_WIDTH-1:2*DESER_WIDTH];
						3		: word_align_reg	<= window_3[4*DESER_WIDTH-1:2*DESER_WIDTH];
						4		: word_align_reg	<= window_4[4*DESER_WIDTH-1:2*DESER_WIDTH];
						5		: word_align_reg	<= window_5[4*DESER_WIDTH-1:2*DESER_WIDTH];
						default	: word_align_reg	<= window_0[4*DESER_WIDTH-1:2*DESER_WIDTH];
					endcase
				end
			end
		end
	endgenerate

	assign	ov_data	= word_align_reg;

endmodule