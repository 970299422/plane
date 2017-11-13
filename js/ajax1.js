
function createXHR(){
	if(window.XMLHttpRequest){
		return new XMLHttpRequest;
	}
	else{
		return new ActiveXObject("Microsoft.XMLHTTP")
	}
}

/*
ajax({
	type: "get",
	url: "http://60.205.181.47/myPHPCode2/checkname.php",
	data: {regname:"zhangsan", pwd:"123456"},
	async: true,
	success: function(data){
		console.log(data);
	},
	fail: function(data){
		console.log("请求失败！");
	}
});
*/

function ajax(obj){
	
	//默认值
	obj.type = obj.type || "get"; //默认get
	obj.async = obj.async==undefined ? true : obj.async; //默认true
	
	//1， 创建xhr对象
	var xhr = createXHR()
	
	//open
	var paramstr = getParamStr(obj.data)
	
	if(obj.type.toLowerCase() == "get"){
		obj.url += paramstr.length>0 ? ("?"+paramstr) : "";
	}
	
	xhr.open(obj.type,obj.url,obj.async)
	
	//send
	if(obj.type.toLowerCase() == "get"){
		xhr.send(null)
	}
	else if(obj.type.toLowerCase() == "post"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(paramstr)
	}
	
	//4, 接收数据
	if(obj.async){
		xhr.onreadystatechange = function(){
			if(xhr.readyState ==4){
				callback()
			}
		}
	}
	else{
		callback()
	}
	
	function callback(){
		
		if(xhr.status == 200){
			//请求成功
			if(obj.success){
				obj.success(xhr.responseText)
			}
		}
		else{
			//请求失败
			if(obj.fail){
				obj.fail(xhr.status)
			}
		}
	}
	
}


//获取参数字符串
// {regname:"zhangsan", pwd:"123456"} -> regname=zhangsan&pwd=123456
function getParamStr(obj){
	var arr = []
	for(var key in obj){
		var str = key + "=" + obj[key] //regname=zhangsan
		arr.push(str)
	}
	return arr.join('&')
}
