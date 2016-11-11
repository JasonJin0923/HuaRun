window.onload = function (){
	//获取每个input及其对应的h6标签
	var userID = document.getElementsByTagName("input")[0];
	var telnum= document.getElementsByTagName("input")[1];
	var verification = document.getElementsByTagName("input")[2];
	var verification_2 =  document.getElementsByTagName("input")[3];
	var password =  document.getElementsByTagName("input")[5];
	var password_sure =  document.getElementsByTagName("input")[6];
	var finish =  document.getElementsByTagName("input")[9];
	//console.log(finish);
	var error1 = document.getElementById("error1");
	var error2 = document.getElementById("error2");
	var error3 = document.getElementById("error3");
	var error4 = document.getElementById("error4");
	var error5 = document.getElementById("error5");
	var error6 = document.getElementById("error6");
	var error7 = document.getElementById("error7");
	
	var random = document.getElementById("random");
	var change = document.getElementById("change");
	var sure = document.getElementById("sure");
	//验证变量
	var isDrag = 0;
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
	//用户名验证
	userID.onblur = function(){
		var str = userID.value;
		if(str.length > 20 || str.length < 4){
			error1.innerHTML = "请确认您输入的用户名在4-20字符";
		}else{
			error1.innerHTML = "";
			isDrag++;
		}
	}
	//手机号码验证
	telnum.onblur = function(){
		if((telnum.value.length == 11) && (/^[1]\d{10}$/.test(telnum.value))){ 	
			error2.innerHTML = "";
			isDrag++;
		}else{
			error2.innerHTML = "请正确填写您的手机号码";
		}
	}
	//验证码验证
	verification.onblur = function(){
		var str = verification.value;
		if(str != random.innerHTML){
			error3.innerHTML = "验证码不正确";
		}else{
			error3.innerHTML = "";
			isDrag++;
		}
	}
	//密码输入验证
	password.onblur = function(){
		var str = password.value;
		if(str.length > 20 || str.length < 6){
			error5.innerHTML = "对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小";
		}else{
			error5.innerHTML = "";
			isDrag++;
		}
	}
	//密码确认验证
	password_sure.onblur = function(){
		var str = password.value;
		var str1 = password_sure.value;
		if(str != str1){
			error6.innerHTML = "对不起，请检查您的输入。密码设置支持6-20位字母、符号或数字，密码区分大小";
		}else{
			error6.innerHTML = "";
			isDrag++;
		}
	}
	//协议阅读认证
	$(function(){
		$('#sure').click(function(){
			$(this).toggleClass("sure");
			//console.log(sure.className == "sure");
			if(sure.className == "sure"){
				isDrag++;
			}
			//console.log(isDrag);
		})
	})
	
	//提交验证
	finish.onclick = function(){
		//console.log(sure.className);
		//console.log(isDrag);
		if(sure.className != "sure"){
			error7.innerHTML = "抱歉，必须同意协议才能完成注册！";
			console.log(1);
		}else if(userID.value == ""){
			error1.innerHTML = "请输入您的用户名";
			console.log(2);
		}else if(telnum.value == ""){
			error2.innerHTML = "请填写您的手机号码";
			console.log(3);
		}else if(verification.value == ""){
			error3.innerHTML = "请填写验证码";
			console.log(4);
		}else if(password.value == ""){
			error5.innerHTML = "请设置您的密码";
			console.log(5);
		}else if(password_sure.value == ""){
			error6.innerHTML = "请确认您的密码";
			console.log(6);
		}else if(isDrag == 6){
			console.log(isDrag);
			$(function(){
				var ID = $('input[name=userID]').val();
				var password = $('input[name=password]').val();
					
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					type:"POST",
					data:{
						status:"register",
						userID:ID,
						password:password
					},
					success:function(res){
						//console.log(typeof res)
						//console.log(res);
						switch(res){
							case "0":alert('重名了');break;
							case "1":alert('恭喜，注册成功了！即将跳转回首页！');
									$.cookie('name',$('.userID').val());
                					window.location.href='index.html'
										break;
							case "2":alert('去找后端大哥，和我没关系，他的电话号是');break;
			
						}
					}
				})
				
			})
			
		}
	}
	
	var xieyitext = document.getElementById("xieyitext");
	var xieyi = document.getElementById("xieyi");
	var close = document.getElementById("close");
	var xieyi_body_btn1 = document.getElementById("xieyi_body_btn1");
	xieyitext.onclick = function(){
		xieyi.style.display = "block";
	}
	close.onclick = function(){
		xieyi.style.display = "none";
	}
	xieyi_body_btn1.onclick = function(){
		xieyi.style.display = "none";
		sure.className = "sure"
	}
}



