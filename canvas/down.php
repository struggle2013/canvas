<?php
	//声明文件的类型 MIME数据类型
	header('content-type:image/png');
	//文件的相关描述
	header('content-Disposition:attachment;filename="canvas.png"');
	//文件的内容
	echo base64_decode($_POST['data']);
?>