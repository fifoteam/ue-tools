timestamp timestamp_inst (
.clk						(clk						),
.reset						(reset						),
.i_wr_en					(i_wr_en					),
.iv_addr					(iv_addr					),
.iv_wr_data					(iv_wr_data					),
.ov_latch_timestamp_cnt		(ov_latch_timestamp_cnt		)
);

reg		clk						= 1'b0	;
reg		reset						= 1'b0	;
reg		i_wr_en					= 1'b0	;
reg		[7:0]	iv_addr					= 8'b0	;
reg		[7:0]	iv_wr_data					= 8'b0	;
wire	[63:0]	ov_latch_timestamp_cnt		;



wire	clk						;
wire	reset						;
wire	i_wr_en					;
wire	[7:0]	iv_addr					;
wire	[7:0]	iv_wr_data					;
wire	[63:0]	ov_latch_timestamp_cnt		;



component timestamp
	port (
	clk						: in	std_logic;
	reset						: in	std_logic;
	i_wr_en					: in	std_logic;
	iv_addr					: in	std_logic_vector(7 downto 0);
	iv_wr_data					: in	std_logic_vector(7 downto 0);
	ov_latch_timestamp_cnt		: out	std_logic_vector(63 downto 0)
	);
end component;

inst_timestamp : timestamp
port map (
clk						=> clk					,
reset						=> reset					,
i_wr_en					=> i_wr_en				,
iv_addr					=> iv_addr				,
iv_wr_data					=> iv_wr_data				,
ov_latch_timestamp_cnt		=> ov_latch_timestamp_cnt
);

signal clk						: std_logic := '0';
signal reset						: std_logic := '0';
signal i_wr_en					: std_logic := '0';
signal iv_addr					: std_logic_vector(7 downto 0) := (others => '0');
signal iv_wr_data					: std_logic_vector(7 downto 0) := (others => '0');
signal ov_latch_timestamp_cnt		: std_logic_vector(63 downto 0) := (others => '0');
