//-------------------------------------------------------------------------------------------------
//  -- ��Ȩ������   : �й���㣨���ţ����޹�˾����ͼ���Ӿ������ֹ�˾, 2010 -2015.
//  -- ���ܼ���     ������.
//  -- ����         : Ӳ������FPGA������
//  -- ģ����       : frame_info_analysis
//  -- �����       : �Ϻ���
//-------------------------------------------------------------------------------------------------
//
//  -- �汾��¼ :
//
//  -- ����         :| �汾��	:| �޸�����				:|  �޸�˵��
//-------------------------------------------------------------------------------------------------
//  -- �Ϻ���       :| V1.0		:| 2018/8/4 11:55:28	:|  ����ģ��˿�
//-------------------------------------------------------------------------------------------------
//
//  -- ģ������     :
//              1)  : daheng imaging Э��淶��������ͼ����Ϣ��ʽ��ͼ��ͳ�Ƹ�ʽ
//
//              2)  : 1v��ʾ version 1.x ��1��ʾ��汾�ţ��ð汾��������ʾ�������¼��ݣ�x��ʾС�汾�ţ������ð汾�ű�ʾ�������¼���
//
//              3)  : ������ģ��ʱӦ�þ����������¼��ݡ��޸�parameter���޸Ķ˿ڣ���Ϊ���ݡ�������Э�飬��Ϊ���ݡ��޸�֮ǰ��Э�飬��Ϊ�����ݡ�
//
//-------------------------------------------------------------------------------------------------
//`include			"frame_info_analysis_def.v"
//���浥λ/����
`timescale 1ns/1ps
//-------------------------------------------------------------------------------------------------
module frame_info_analysis # (
	parameter	INFO_SIZE									= 256		,	//INFO������������byteΪ��λ
	parameter	STATIS_SIZE									= 256		,	//STATIS������������byteΪ��λ
	parameter	SHORT_REG_WD   								= 16		,	//�̼Ĵ���λ��
	parameter	REG_WD  						 			= 32		,	//�Ĵ���λ��
	parameter	LONG_REG_WD  						 		= 64		,	//���Ĵ���λ��
	parameter	GEV_DE_WD									= 2			,	//���ݵ�Ԫʹ��λ��4byte����ʹ��һ��ʹ��λ
	parameter	GEV_DATA_WD									= 64			//����λ��֧��32��64��128
	)
	(
	//  -------------------------------------------------------------------------------------
	//  ʱ�Ӻ͸�λ�ź�
	//  -------------------------------------------------------------------------------------
	input							clk									,	//����ʱ��
	input							reset								,	//����ʱ����ĸ�λ�źţ�����Ч
	//  -------------------------------------------------------------------------------------
	//  ������������
	//  -------------------------------------------------------------------------------------
	input							i_info_flag							,	//clkʱ������Ϣ�α�־������Ч
	input							i_statis_flag						,	//clkʱ����ͳ�ƶα�־������Ч
	input	[GEV_DE_WD-1:0]			iv_dval								,	//clkʱ����������Ч�źţ���bit����4byte��1-��ʾ������Ч��0-��ʾ������Ч
	input	[GEV_DATA_WD-1:0]		iv_cmd_data							,	//clkʱ�����������ݣ�λ��ɱ䣬֧��32��64��128
	//  -------------------------------------------------------------------------------------
	//	�����Ĵ������
	//  -------------------------------------------------------------------------------------
	output	[LONG_REG_WD-1:0]		ov_block_id							,	//clkʱ����block id����ǰroi��֡��
	output	[LONG_REG_WD-1:0]		ov_timestamp						,	//clkʱ����time stamp����ǰroi��ʱ���
	output	[REG_WD-1:0]			ov_pixel_format						,	//clkʱ����pixel format����ǰroi�����ظ�ʽ
	output	[SHORT_REG_WD-1:0]		ov_offset_x							,	//clkʱ����offset_x����ǰroi��ˮƽƫ��
	output	[SHORT_REG_WD-1:0]		ov_offset_y							,	//clkʱ����offset_y����ǰroi�Ĵ�ֱƫ��
	output	[SHORT_REG_WD-1:0]		ov_width							,	//clkʱ����width����ǰroi�Ŀ��
	output	[SHORT_REG_WD-1:0]		ov_height							,	//clkʱ����height����ǰroi�ĸ߶�
	output	[REG_WD-1:0]			ov_image_size						,	//clkʱ����image size����ǰroiͼ���С����byteΪ��λ
	output	[REG_WD-1:0]			ov_payload_size						,	//clkʱ����payload size����ǰroiͼ��+chunk��С����byteΪ��λ
	output	[LONG_REG_WD-1:0]		ov_frame_interval					,	//clkʱ����sensor�����ͼ��������nsΪ��λ������֮���һ֡��frame interval����ֵΪ0
	output							o_chunk_mode_active					,	//clkʱ����chunk���ؼĴ���
	output							o_chunkid_en_img					,	//clkʱ����image���ؼĴ���
	output							o_chunkid_en_fid					,	//clkʱ����frame id���ؼĴ���
	output							o_chunkid_en_ts						,	//clkʱ����ʱ������ؼĴ���
	output							o_chunkid_en_fint					,	//clkʱ����frame interval���ؼĴ���
	output	[SHORT_REG_WD-1:0]		ov_status							,	//clkʱ����status��USB3 VISIONЭ��ר�У�ʵ�ʵ�����ͼ��״̬
	output	[REG_WD-1:0]			ov_expect_payload_size				,	//clkʱ����expect payload size������������ͼ��ͼ��+chunk��С
	output	[REG_WD-1:0]			ov_valid_payload_size				,	//clkʱ����valid payload size��ʵ�ʵ�����ͼ��ͼ��+chunk��С
	);


	//	ref paramters

	//	-------------------------------------------------------------------------------------
	//	���������λ���Ӧ���ֽڸ���
	//	-------------------------------------------------------------------------------------
	localparam	BYTE_NUM		= GEV_DATA_WD/8;
	//	-------------------------------------------------------------------------------------
	//	�����info_byte_cnt��λ��
	//	-------------------------------------------------------------------------------------
	localparam	INFO_BYTE_CNT_WD		= log2(INFO_SIZE+1);
	localparam	STATIS_BYTE_CNT_WD		= log2(STATIS_SIZE+1);


	//	ref functions
	//	-------------------------------------------------------------------------------------
	//	ȡ��������ȡ��
	//	log2ȡ������ʱ��������������ֱ��Ǽ����������λ��ͼ���ͨ��ƫ�Ƶ�bit��
	//	1.�����������λ��ʹ�� y = log2(x+1)����x=2^nʱ��y=n+1�����Ա�ʾ0-2^(n+1)-1����ֵ
	//	2.����ͨ��ƫ�Ƶ�bit����ʹ�� y = log2(x)����x=2^nʱ��y=n�����Ա�ʾ0-2^n-1����ֵ
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
	//	maxȡ���ֵ
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
	//	ref ����frame infoЭ�����
	//	===============================================================================================
	//	-------------------------------------------------------------------------------------
	//	ref byte cnt ���ֽ�Ϊ��λ�ļ�����
	//	1.�� i_info_flag ���� i_statis_flag Ϊ0ʱ������������.��ͣ��ʱ����������λ
	//	2.��info�λ���statis�Σ���������Чʱ���������ۼӣ��ۼӵĲ��������ݿ��
	//	3.���������ﵽ���ֵʱ��ֹͣ�ۼ�
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
	//	ref byte cnt ���ֽ�Ϊ��λ�ļ�����
	//	1.�� i_info_flag ���� i_statis_flag Ϊ0ʱ������������.��ͣ��ʱ����������λ
	//	2.��info�λ���statis�Σ���������Чʱ���������ۼӣ��ۼӵĲ��������ݿ��
	//	3.���������ﵽ���ֵʱ��ֹͣ�ۼ�
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
	//	����frame infoЭ�����info����Ϣ
	//	1.ֻ�е� i_info_flag =1���� iv_dval[0]=1 ʱ�����ܽ�������
	//	2.status_info_en�����㣬ֻ���ڽ���status�ֶε�ʱ�����=1������ʱ��Ϊ0
	//	3.8byte���������info_byte_cnt�ĵ�3bit�����ж�
	//	4.ͣ��ʱ��������ģ����i_stream_enable�ź�û�����뵽��������
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
	//	����frame infoЭ�����statis����Ϣ
	//	1.ֻ�е� i_statis_flag =1���� iv_dval[0]=1 ʱ�����ܽ�������
	//	2.status_statis_en�����㣬ֻ���ڽ���status�ֶε�ʱ�����=1������ʱ��Ϊ0
	//	3.8byte���������info_byte_cnt�ĵ�3bit�����ж�
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
	//	����status�ֶ���info��statis�ζ�����֣������Ҫͨ��ʹ���ź�ѡ��
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
