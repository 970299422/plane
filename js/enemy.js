

class Enemy{
	
	//属性初始
	constructor(type){
		
		this.ele = null;
		this.speed = 1;
		this.hp = 1;
		this.imgs = [];
		this.score = 0;
		this.type = type; 
	}
	
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		gameEngine.allEnemys.push(this);
		
		switch(this.type) {
			case this.plane_type_big:
				this.ele.className = "enemy-large";
				this.speed = this.plane_speed_big;
				this.hp = this.plane_hp_big;
				this.imgs = ["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"];
				this.score = 50;
				//console.log(111)
				break;
				
			case this.plane_type_middle:
				this.ele.className = "enemy-middle";
				this.speed = this.plane_speed_middle;
				this.hp = this.plane_hp_middle;
				this.imgs = ["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"];
				this.score = 30;
				break;
				
			case this.plane_type_small:
				this.ele.className = "enemy-small";
				this.speed = this.plane_speed_small;
				this.hp = this.plane_hp_small;
				this.imgs = ["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"]
				this.score = 10;
				break;
		}
		
		this.ele.style.left =
		parseInt( Math.random() * (gameEngine.ele.offsetWidth-this.ele.offsetWidth) ) + "px";
		this.ele.style.top = - this.ele.offsetHeight + "px";
		
		
		
		return this;
	}
	
	//移动
	move(){
		
		this.timer = setInterval(()=>{
			if(this.ele.offsetTop > gameEngine.ele.offsetHeight){
				clearInterval(this.timer)
				gameEngine.ele.removeChild(this.ele);
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(this),1);
			}
			else{
				this.ele.style.top = this.ele.offsetTop + this.speed + "px";
			}
			
		},30)
	}
	
	//受伤
	hurt(){
		
		this.hp--;
		//console.log(this.hp)
		if(this.hp == 0){
			this.boom()
			gameEngine.totalScore += this.score;
			score.innerHTML = gameEngine.totalScore;
		}
	}
	
	//爆炸
	boom(){
		
		clearInterval(this.timer)
		let i = 0;
		let dtimer = setInterval(()=>{
			if(i >= this.imgs.length){
				
				clearInterval(dtimer)
				gameEngine.ele.removeChild(this.ele);
			}
			else{
				this.ele.style.background = `url(${this.imgs[i++]}) no-repeat`
			}
		},100)
	}
}




Enemy.prototype.plane_type_big = 1;
Enemy.prototype.plane_type_middle = 2;
Enemy.prototype.plane_type_small = 3;
	
Enemy.prototype.plane_speed_big = 2;
Enemy.prototype.plane_speed_middle = 4;
Enemy.prototype.plane_speed_small = 6;

Enemy.prototype.plane_hp_big = 6;
Enemy.prototype.plane_hp_middle = 3;
Enemy.prototype.plane_hp_small = 1;

