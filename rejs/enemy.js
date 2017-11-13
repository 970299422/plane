"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),Enemy=function(){function e(t){_classCallCheck(this,e),this.ele=null,this.speed=1,this.hp=1,this.imgs=[],this.score=0,this.type=t}return _createClass(e,[{key:"init",value:function(){switch(this.ele=document.createElement("div"),gameEngine.ele.appendChild(this.ele),gameEngine.allEnemys.push(this),this.type){case this.plane_type_big:this.ele.className="enemy-large",this.speed=this.plane_speed_big,this.hp=this.plane_hp_big,this.imgs=["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"],this.score=50;break;case this.plane_type_middle:this.ele.className="enemy-middle",this.speed=this.plane_speed_middle,this.hp=this.plane_hp_middle,this.imgs=["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"],this.score=30;break;case this.plane_type_small:this.ele.className="enemy-small",this.speed=this.plane_speed_small,this.hp=this.plane_hp_small,this.imgs=["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"],this.score=10}return this.ele.style.left=parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px",this.ele.style.top=-this.ele.offsetHeight+"px",this}},{key:"move",value:function(){var e=this;this.timer=setInterval(function(){e.ele.offsetTop>gameEngine.ele.offsetHeight?(clearInterval(e.timer),gameEngine.ele.removeChild(e.ele),gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(e),1)):e.ele.style.top=e.ele.offsetTop+e.speed+"px"},30)}},{key:"hurt",value:function(){this.hp--,0==this.hp&&(this.boom(),gameEngine.totalScore+=this.score,score.innerHTML=gameEngine.totalScore)}},{key:"boom",value:function(){var e=this;clearInterval(this.timer);var t=0,i=setInterval(function(){t>=e.imgs.length?(clearInterval(i),gameEngine.ele.removeChild(e.ele)):e.ele.style.background="url("+e.imgs[t++]+") no-repeat"},100)}}]),e}();Enemy.prototype.plane_type_big=1,Enemy.prototype.plane_type_middle=2,Enemy.prototype.plane_type_small=3,Enemy.prototype.plane_speed_big=2,Enemy.prototype.plane_speed_middle=4,Enemy.prototype.plane_speed_small=6,Enemy.prototype.plane_hp_big=6,Enemy.prototype.plane_hp_middle=3,Enemy.prototype.plane_hp_small=1;