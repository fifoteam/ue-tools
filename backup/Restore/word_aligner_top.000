//-------------------------------------------------------------------------------------------------
//  -- 版权所有者   : 中国大恒（集团）有限公司北京图像视觉技术分公司, 2010 -2015.
//  -- 保密级别     ：绝密.
//  -- 部门         : 硬件部，FPGA工作组
//  -- 模块名       : word_aligner_top
//  -- 设计者       : 邢海涛
//-------------------------------------------------------------------------------------------------
//
//  -- 版本记录 :
//
//  -- 作者         :| 修改日期				:|  修改说明
//-------------------------------------------------------------------------------------------------
//  -- 邢海涛       :| 2015/10/27 13:29:41	:|  初始版本
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

module word_aligner_top # (
	parameter		SER_FIRST_BIT			= "MSB"		,	//"LSB" or "MSB" , first bit to the receiver
	parameter		DESER_WIDTH				= 5			,	//解串因子
	parameter		CHANNEL_NUM				= 4				//通道数
	)
	(
	input										clk				,	//时钟
	input										reset			,	//复位
	input	[DESER_WIDTH*CHANNEL_NUM-1:0]		iv_data			,	//输入并行数据
	output										o_clk_en		,	//时钟使能信号
	output										o_sync			,	//控制数据标识
	output	[2*DESER_WIDTH*CHANNEL_NUM-1:0]		ov_data				//输出数据
	);

	//	ref signals
	wire	[2:0]			wv_window_num	;
	wire					w_div_cnt	;
	wire					w_div_cnt_lock	;

	//	ref ARCHITECTURE

	word_aligner # (
	.ALIGN_MODE			("MASTER"					),
	.SER_FIRST_BIT		(SER_FIRST_BIT				),
	.DESER_WIDTH		(DESER_WIDTH				)
	)
	word_aligner_master_inst (
	.clk				(clk						),
	.reset				(reset						),
	.iv_data			(iv_data[DESER_WIDTH-1:0]	),
	.o_clk_en			(o_clk_en					),
	.o_sync				(o_sync						),
	.ov_data			(ov_data[2*DESER_WIDTH-1:0]	),
	.iv_window_num		(3'b0						),
	.i_div_cnt			(1'b0						),
	.i_div_cnt_lock		(1'b0						),
	.ov_window_num		(wv_window_num				),
	.o_div_cnt			(w_div_cnt					),
	.o_div_cnt_lock		(w_div_cnt_lock				)
	);


	genvar	i;
	generate
		for(i=1;i<CHANNEL_NUM;i=i+1) begin
			word_aligner # (
			.ALIGN_MODE			("SLAVE"				),
			.SER_FIRST_BIT		(SER_FIRST_BIT			),
			.DESER_WIDTH		(DESER_WIDTH			)
			)
			word_aligner_slave_inst (
			.clk				(clk					),
			.reset				(reset					),
			.iv_data			(iv_data[(i+1)*DESER_WIDTH-1:i*DESER_WIDTH]	),
			.o_clk_en			(						),
			.o_sync				(						),
			.ov_data			(ov_data[(i+1)*(2*DESER_WIDTH)-1:i*(2*DESER_WIDTH)]	),
			.iv_window_num		(wv_window_num			),
			.i_div_cnt			(w_div_cnt				),
			.i_div_cnt_lock		(w_div_cnt_lock			),
			.ov_window_num		(						),
			.o_div_cnt			(						),
			.o_div_cnt_lock		(						)
			);
		end
	endgenerate



endmodule
