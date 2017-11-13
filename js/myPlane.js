


//飞机对象

var myPlane = {
	
	ele:null,
	
	bulletSpeed:300,
	
	init:function(){
		
		this.ele = document.createElement("div");
		this.ele.className = "myplane";
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.left = (document.documentElement.clientWidth - this.ele.offsetWidth)/2 - gameEngine.ele.offsetLeft + "px";
		this.ele.style.top = document.documentElement.clientHeight - this.ele.offsetHeight + "px";
		return this;
		
	}, 
	move:function(){
		this.ele.onmousedown = function(e){
			e = e || event;
			var disx = e.offsetX;
			var disy = e.offsetY;
			document.onmousemove = function(e){
				e = e || event;
				var x = e.pageX - disx - gameEngine.ele.offsetLeft;
				var y = e.pageY - disy;
				if(x<0) x = 0;
				else if(x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
					x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
				}
				if(y<0) y = 0;
				else if(y>gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight + 30){
					y = gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight + 30;
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = y + "px";
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	fire:function(){
		var timer = setInterval(function(){
			var bullet = new Bullet()
			bullet.init().move()
		},this.bulletSpeed)
	},
	
	boom:function(fn){
		
		var that = this
		var imgs = ["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"];
		var i = 0;
		var dtimer = setInterval(function(){
			if(i>=4){
				clearInterval(dtimer);
				gameEngine.ele.removeChild(that.ele)
				//回调
				if(fn){
					fn()
				}
			}
			else{
				that.ele.style.background = "url("+ imgs[i++] +")"
			}
			
			
		},100)
		
		
	}
}
