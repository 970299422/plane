

//游戏引擎: 对象
//加载游戏
//创建我的飞机
//创建敌机
//碰撞检测
//...

var gameEngine = {
	
	ele:null,
	allBullets:[],
	allEnemys:[],
	totalScore:0,
	init:function(){
		this.ele = document.getElementById("main")
		return this;
	},
	
	//开始游戏
	start:function(){
		console.log("开始游戏")
		this.loadding(function(){
			 console.log("正式开始")
			 myPlane.init().move();
			 myPlane.fire()
			 
			 //键盘事件
			 gameEngine.keydown();
			 //创建敌机
			 gameEngine.createEnemy();
			 //碰撞检测
			 gameEngine.crash();
			 //背景移动
			 gameEngine.bgmove();
			 
		})
	},
	
	//加载页面
	loadding:function(callback){
		console.log("开始加载")
		var logo = document.createElement("div");
		logo.className = "logo";
		this.ele.appendChild(logo);
		
		var load = document.createElement("div");
		load.className = "load";
		this.ele.appendChild(load);
		
		var imgs = ["images/loading1.png","images/loading2.png","images/loading3.png"]
		var i = 0
		var timer = setInterval(function(){
			if(i>=5){
				clearInterval(timer)
				gameEngine.ele.removeChild(logo)
				gameEngine.ele.removeChild(load)
				callback()
			}
			else{
				load.style.background = "url("+imgs[(++i)%3]+")"
			}
			
		},500)
		
	},
	
	//键盘事件
	keydown:function(){
		//console.log(1)
		xs = 0;
		ys = 0;
		onkeydown = function(e){
			e = e || event;
			
			if(e.keyCode == 37){//左
				xs = -8
			}
			else if(e.keyCode == 38){//上
				ys = -8
			}
			else if(e.keyCode == 39){//右
				xs = 8
			}
			else if(e.keyCode == 40){//下
				ys = 8
			}
		}
		onkeyup = function(e){
				e = e || event
				if(e.keyCode == 37 || e.keyCode == 39){
					xs = 0;
				}
				else if(e.keyCode == 38 || e.keyCode == 40){
					ys = 0;
				}
		}
		setInterval(function(){
			//console.log(xs)
			var x = myPlane.ele.offsetLeft + xs;
			var y = myPlane.ele.offsetTop + ys;
			if (x < 0) {
				x = 0;
			}
			else if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			if(y < 0) y = 0;
				else if(y>gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight + 30){
					y = gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight + 30
			}
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = y + "px";
				
		},30)
		
	},
	
	//敌机
	
	createEnemy:function(){
		//大飞机
		setInterval(function(){
			var flag = Math.random()>0.6 ? true : false;
			if(flag){
				var enemy = new Enemy(Enemy.prototype.plane_type_big)
				enemy.init().move();
			}
			
		},5000)
		//中飞机
		setInterval(function(){
			var flag = Math.random()>0.5 ? true : false;
			if(flag){
				var enemy = new Enemy(Enemy.prototype.plane_type_middle)
				enemy.init().move();
			}
			
		},3000)
		//小飞机
		setInterval(function(){
			var flag = Math.random()>0.4 ? true : false;
			if(flag){
				var enemy = new Enemy(Enemy.prototype.plane_type_small)
				enemy.init().move();
			}
			
		},1000)
	},
	
	//碰撞检测
	crash:function(){
		
		var timer = setInterval(function(){
			
			for(var i=0; i<gameEngine.allEnemys.length; i++){
			
				for(var j=0; j<gameEngine.allBullets.length; j++){
					
					if(isCrash(gameEngine.allBullets[j].ele,gameEngine.allEnemys[i].ele)){
						//console.log("碰撞了")
						
						//子弹爆炸
						gameEngine.allBullets[j].boom()
						gameEngine.allBullets.splice(j,1)
						//敌机受伤
						gameEngine.allEnemys[i].hurt()
						
					}
					
				}
				
				if(isCrash(gameEngine.allEnemys[i].ele,myPlane.ele)){
					clearInterval(timer)
					console.log("gg")
					
					myPlane.boom(function(){
						
						var name = prompt("请输入你的大名,你当前的分数是"+gameEngine.totalScore,"");
						
						ajax({
							
							type:"post",
							url:"http://60.205.181.47/myPHPCode4/uploadScore.php",
							data:{name:name,score:gameEngine.totalScore},
							success:function(data){
								
								location.href = "rank.html"
								
							}
							
							
						})
						
					})
					break;
				}
		}
		},30)
	},
	//背景移动
	bgmove:function(){
		var y = 0
		setInterval(function(){
			y = y + 5
			gameEngine.ele.style.backgroundPositionY = y + "px"

		},30)
				
		
	}
	
}
