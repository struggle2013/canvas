
//设置工具按钮的标签
	var tool_Brush = document.getElementById('Brush');
	var tool_Eraser = document.getElementById('Eraser');
	var tool_Magnifier = document.getElementById('Magnifier');
	var tool_Straw = document.getElementById('Straw');
	var tool_text = document.getElementById('text');
	var tool_Paint = document.getElementById('Paint');
	var tool_arc = document.getElementById('arc');
	var tool_poly = document.getElementById('poly');
	var tool_rect = document.getElementById('rect');
	var tool_arcfill = document.getElementById('arcfill');
	var tool_rectfill = document.getElementById('rectfill');
	var tool_line = document.getElementById('line');
//把12个工具和形状放到数组中
	var acctions=[tool_Brush,tool_Eraser,tool_Magnifier,tool_Straw,tool_text,tool_Paint
		,tool_arc,tool_poly,tool_rect,tool_arcfill,tool_rectfill,tool_line];
//获取线宽的按钮
	var width_1=document.getElementById('lineWidth_1');
	var width_3=document.getElementById('lineWidth_3');
	var width_5=document.getElementById('lineWidth_5');
	var width_8=document.getElementById('lineWidth_8');
	var widths=[width_1,width_3,width_5,width_8];
//获取颜色
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');
	var yellow = document.getElementById('yellow');
	var white = document.getElementById('white');
	var black = document.getElementById('black');
	var pink = document.getElementById('pink');
	var purple = document.getElementById('purple');
	var cyan = document.getElementById('cyan');
	var orange = document.getElementById('orange');
	var colors=[red,green,blue,yellow,white,black,pink,purple,cyan,orange];
	//获取画板
	var canvas=document.getElementById('canvas');
	var cxt = canvas.getContext('2d');
//设置初始值
	drawBrush(0);
	setLineWidth(0)
	setColor(red,0);
	function setStatus(arry,num,type){
		for(var i=0; i<arry.length;i++){
			if (i==num) {
				if (type==1) {
					arry[i].style.background="yellow";
				}else{
					arry[i].style.border="1px solid #fff";
				}
			}else{
				if (type==1) {
					arry[i].style.background="#ccc";
				}else{
					arry[i].style.border="1px solid #000";
				}
			}

		}
	}
	//保存图片
	function save(){
		var ImgData = canvas.toDataURL();//获取图片的dataURL
		var b64 = ImgData.substring(22);//得到图片内容
		var data= document.getElementById('data');//将form表单中的隐藏表单 赋值(值就是我们获取的b64)
		data.value=b64;
		var myForm=document.getElementById('myForm');
		myForm.submit();//提交到后台
	}
	//清除发布
	function clearImg(){
		cxt.clearRect(0,0,880,390);
	}
	//画铅笔
	function drawBrush(num){
		setStatus(acctions,num,1);
		var flag=0;//设置标志位，检测鼠标是否被按下
		canvas.onmousedown =function(evt){
			evt=window.event||evt;
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			flag=1;			
		}
		canvas.onmousemove = function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			if (flag) {
				cxt.lineTo(endX,endY);
				cxt.stroke();
			}
			
		}
		canvas.onmouseup = function(){
			flag=0;
		}
		canvas.onmouseout = function(){
			flag=0;
		}
	}
	//橡皮擦工具
	function drawEraser(num){
		setStatus(acctions,num,1);
		var flag=0;//设置标志位，检测鼠标是否被按下
		canvas.onmousedown =function(evt){
			evt=window.event||evt;
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			cxt.clearRect(startX-cxt.lineWidth,startY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
			flag=1;			
		}
		canvas.onmousemove = function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			if (flag) {
				cxt.clearRect(endX-cxt.lineWidth,endY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
			}
			
		}
		canvas.onmouseup = function(){
			flag=0;
		}
		canvas.onmouseout = function(){
			flag=0;
		}
	}
	function drawMagnifier(num){
		setStatus(acctions,num,1);
		var scale=window.prompt('请输入放大倍数（只能是整数）','');
		if (scale!=null) {
			var scaleX=880*scale/100;
		var scaleY=390*scale/100;
		canvas.style.width=parseInt(scaleX)+'px';
		canvas.style.height=parseInt(scaleY)+'px';
		}
		

	}
	function drawStraw(num){
		setStatus(acctions,num,1);
		canvas.onmousedown=function(evt){
			evt=window.event||evt;//消除IE和w3c浏览器的差别，
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			//获取该矩形框的像素，[红，绿，蓝，透明色，红，绿，蓝，透明色]
			var ImageData = cxt.getImageData(startX,startY,1,1);
			var color = 'rgb('+ImageData.data[0]+','+ImageData.data[1]+','+ImageData.data[2]+')';
			cxt.strokeStyle=color;
			cxt.fillStyle=color;
			drawBrush(0);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	function drawText(num){
		setStatus(acctions,num,1);
		canvas.onmousedown=function(evt){
			var text=window.prompt('请输入文字','');
			if (text!=null) {
				var startX=evt.pageX-this.offsetLeft;
				var startY=evt.pageY-this.offsetTop;
				
				cxt.fillText(text,startX,startY);
			}
		}
		cxt.onmouseup=null;
		cxt.onmousemove=null;
		cxt.onmouseout=null;
		

	}
	//油漆桶工具
	function drawPaint(num){
		setStatus(acctions,num,1);
		canvas.onmousedown=function(){
			cxt.fillRect(0,0,880,390);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}

	//画圆工具
	function drawArc(num){
		setStatus(acctions,num,1);
		var startY=0;
		var startX=0;
		canvas.onmousedown=function(evt){
			evt=window.event||evt;
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;

		}
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var tempA=endX-startX;
			var tempB=endY-startY;
			var X=(endX+startX)/2;
			var Y=(endY+startY)/2;

			var radius=Math.sqrt(tempA*tempA+tempB*tempB)/2;
			cxt.beginPath();
			cxt.arc(X,Y,radius,0,360,false);
			cxt.closePath();
			cxt.stroke();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	//画等边3角行
	function drawPoly(num){
		setStatus(acctions,num,1);
		canvas.onmouseout=null;
		canvas.onmousemove=null;
		var startY=0;
		var startX=0;
		canvas.onmousedown=function(evt){
			evt=window.event||evt;
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;

		}
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;

			var tempA=endX-startX;
			var tempB=endY-startY;
			var tempC=Math.sqrt(tempB*tempB+tempA*tempA);

			cxt.beginPath();
			cxt.moveTo(endX,endY);
			cxt.lineTo(2*startX-endX,endY);
			cxt.lineTo(startX,startY-tempC);

			cxt.closePath();
			cxt.stroke();
		}
	}
	function drawRect(num){
		setStatus(acctions,num,1);
		var startY=0;
		var startX=0;
		canvas.onmousedown=function(evt){
			evt=window.event||evt;
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;

		}
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var tempA=endX-startX;//矩形的长
			var tempB=endY-startY;//矩形的宽

			var X=(endX+startX)/2;
			var Y=(endY+startY)/2;

			var radius=Math.sqrt(tempA*tempA+tempB*tempB)/2;
			cxt.beginPath();
			cxt.rect(startX,startY,tempA,tempB);
			cxt.closePath();
			cxt.stroke();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawArcfill(num){
		setStatus(acctions,num,1);
		var startY=0;
		var startX=0;
		canvas.onmousedown=function(evt){
			evt=window.event||evt;
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;

		}
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var tempA=endX-startX;
			var tempB=endY-startY;
			var X=(endX+startX)/2;
			var Y=(endY+startY)/2;

			var radius=Math.sqrt(tempA*tempA+tempB*tempB)/2;
			cxt.beginPath();
			cxt.arc(X,Y,radius,0,360,false);
			cxt.closePath();
			cxt.fill();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawRectfill(num){
		setStatus(acctions,num,1);
		var startY=0;
		var startX=0;
		canvas.onmousedown=function(evt){
			evt=window.event||evt;
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;

		}
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var tempA=endX-startX;//矩形的长
			var tempB=endY-startY;//矩形的宽

			var X=(endX+startX)/2;
			var Y=(endY+startY)/2;

			var radius=Math.sqrt(tempA*tempA+tempB*tempB)/2;
			cxt.beginPath();
			cxt.rect(startX,startY,tempA,tempB);
			cxt.closePath();
			cxt.fill();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	//画线工具
	function drawLine(num){
		setStatus(acctions,num,1);
		var startY=0;
		var startX=0;
		canvas.onmousedown=function(evt){
			evt=window.event||evt;
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;

		}
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
		
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			cxt.lineTo(endX,endY);
			cxt.closePath();
			cxt.stroke();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}

	function setLineWidth(num){
		setStatus(widths,num,1);
		switch(num){
			case 0:cxt.lineWidth=1;
				break;
			case 1:cxt.lineWidth=3;
				break;
			case 2: cxt.lineWidth=5;
				break;
			case 3: cxt.lineWidth=8;
				break;
			default: cxt.lineWidth=1;
		}
	}
	function setColor(obj,num){
		setStatus(colors,num,0);
		cxt.strokeStyle=obj.id;
		cxt.fillStyle=obj.id;

	}
	
	