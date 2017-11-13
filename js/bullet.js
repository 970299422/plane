

class Bullet{
	
	//属性
	constructor(){
		this.ele = document.createElement("div");
	}
	
	init(){
		this.ele.className = "bullet";
		gameEngine.ele.appendChild(this.ele);
		gameEngine.allBullets.push(this);
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px"
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		
		return this; //为了连续调用
	}
	
	//运动 
	move(){
		
		this.timer = setInterval(()=>{
			if(this.ele.offsetTop < -18){
				
				clearInterval(this.timer);
				gameEngine.ele.removeChild(this.ele);
				gameEngine.allBullets.splice(gameEngine.allBullets.indexOf(this),1);
				//console.log(gameEngine.allBullets)
			}
			else{
				this.ele.style.top = this.ele.offsetTop - 10 +"px"
			}
			
		},30)
	}

	//爆炸
	boom(){
		
		clearInterval(this.timer)
		
		this.ele.className = "bullet-die";
		
		//动画
		const dieImgs = ["images/die1.png", "images/die2.png"];
		
		let i = 0;
		let dtimer = setInterval(()=>{
			if(i>=1){
				clearInterval(dtimer)
				gameEngine.ele.removeChild(this.ele);
			}
			else{
				this.ele.style.background = `url(${dieImgs[++i]}) no-repeat`
			}
		},100)
		
	}
}
