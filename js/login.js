window.onload = function(){
	var login_btn = document.getElementById("login_btn");
	var userID = document.getElementById("userID"); 
	var password = document.getElementById("password"); 
	var yanzhengma = document.getElementById("yanzhengma"); 
	var random = document.getElementById("random"); 
	var sp1 = document.getElementById("sp1"); 
	var sp2 = document.getElementById("sp2"); 
	var sp3 = document.getElementById("sp3"); 
	
	//生成验证码
	random.innerHTML = number() + "" + number() + "" + number() + "" + number();
	function number(){
		var num;
		num = parseInt(Math.random()*9);
		//alert(num);
		return num;
	}
	//切换验证码
	change.onclick = function(){
		random.innerHTML = number() + "" + number() + "" + number() + "" + number();
	}
	var isDrag = 0;
	login_btn.onclick = function(){
	
		if(userID.value == ""){
			sp1.innerHTML = "请输入您的登录名";
		}else{
			sp1.innerHTML = "";
			isDrag++;
		}
		
		if(password.value == ""){
			sp2.innerHTML = "请填写密码";
		}else{
			sp2.innerHTML = "";
			isDrag++;
		}
		
		if(yanzhengma.value == ""){
			sp3.innerHTML = "请填写验证码";
		}else if(yanzhengma.value != random.innerHTML){
			sp3.innerHTML = "验证码不正确";
		}else{
			sp3.innerHTML = "";
			isDrag++;
		}
		
		if(isDrag==3){
			$(function(){
				var ID = $('input[name=userID]').val();
				var password = $('input[name=password]').val();
				console.log(ID+":"+password);
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					type:"POST",
					data:{
						status:"login",
						userID:ID,
						password:password
					},
					success:function(res){
		
						switch(res){
							case "0":alert('用户名不存在');break;
							case "2":alert('用户名密码不符');break;
							default:$.cookie('name',$('#userID').val());
									console.log($.cookie('name',$('#userID').val()));
									window.location.href="index.html";break;
						}
					}
		
				})
					
				
				
			})
		//console.log(userID.value+":"+password.value);
		}
	
	}
	
	
}
