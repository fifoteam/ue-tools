addr_buffer_w36d512_pe64_pf506 addr_buffer_w36d512_pe64_pf506_inst (
.clk			(clk			),
.rst			(rst			),
.din			(din			),
.wr_en			(wr_en			),
.rd_en			(rd_en			),
.dout			(dout			),
.full			(full			),
.empty			(empty			),
.prog_full		(prog_full		),
.prog_empty		(prog_empty		)
);

reg		clk			= 1'b0	;
reg		rst			= 1'b0	;
reg		[35:0]	din			= 36'b0	;
reg		wr_en			= 1'b0	;
reg		rd_en			= 1'b0	;
wire	[35:0]	dout			;
wire	full			;
wire	empty			;
wire	prog_full		;
wire	prog_empty		;



wire	clk			;
wire	rst			;
wire	[35:0]	din			;
wire	wr_en			;
wire	rd_en			;
wire	[35:0]	dout			;
wire	full			;
wire	empty			;
wire	prog_full		;
wire	prog_empty		;



component addr_buffer_w36d512_pe64_pf506
	port (
	clk			: in	std_logic;
	rst			: in	std_logic;
	din			: in	std_logic_vector(35 downto 0);
	wr_en			: in	std_logic;
	rd_en			: in	std_logic;
	dout			: out	std_logic_vector(35 downto 0);
	full			: out	std_logic;
	empty			: out	std_logic;
	prog_full		: out	std_logic;
	prog_empty		: out	std_logic
	);
end component;

inst_addr_buffer_w36d512_pe64_pf506 : addr_buffer_w36d512_pe64_pf506
port map (
clk			=> clk		,
rst			=> rst		,
din			=> din		,
wr_en			=> wr_en		,
rd_en			=> rd_en		,
dout			=> dout		,
full			=> full		,
empty			=> empty		,
prog_full		=> prog_full	,
prog_empty		=> prog_empty
);

signal clk			: std_logic := '0';
signal rst			: std_logic := '0';
signal din			: std_logic_vector(35 downto 0) := (others => '0');
signal wr_en			: std_logic := '0';
signal rd_en			: std_logic := '0';
signal dout			: std_logic_vector(35 downto 0) := (others => '0');
signal full			: std_logic := '0';
signal empty			: std_logic := '0';
signal prog_full		: std_logic := '0';
signal prog_empty		: std_logic := '0';
