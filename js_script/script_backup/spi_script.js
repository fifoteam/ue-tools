
// include subfunction.js

function spi_script(){
	for (i = 0; i < 100; i++) {
		UltraEdit.activeDocument.write("WriteOnly 0xb01000 0x1\r\n");
		UltraEdit.activeDocument.write("WriteOnly 0xb01000 0x0\r\n");
	}

}

spi_script();
