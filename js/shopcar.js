
$(function(){
	console.log(localStorage.getItem("goods"));
	//获取用户名
	$(function(){
		if($.cookie('name')){
			$('.littlenav_1').css("display","none");
			$('.littlenav_1_1').css("display","block");
			$('.user2').html($.cookie('name'));
		}else{
			$('.littlenav_1').css("display","block");
			$('.littlenav_1_1').css("display","none");
		}
	})
	change_display();
	function change_display(){
		if($.cookie('name')){//如果用户名cookie不为空。
			if(eval(localStorage.getItem("goods")).length != 0){
				$('#body_1').css("display","none");
				$('#body_2').css("display","block");
				$('#body_3').css("display","none");
				sc_msg();
			}else{
				$('#body_1').css("display","none");
				$('#body_3').css("display","block");
				$('#body_2').css("display","none");
			}
			
		}else{
			
			$('#body_1').css("display","block");
			$('#body_2').css("display","none");
			$('#body_3').css("display","none");
		}
	}
	
	
})
window.onload = function(){
	
	
$(function(){
	//设置全局变量
	var oMoney = 0;        //总金额
	var num_1 = 0;			//购物车中商品总数
	var num_2 = 0;			//选中商品数量

	
    //刷新页面获取购物车中商品总数
	shopcar_num();
	function shopcar_num(){
		num_1 = 0;
		for( var j = 0;j < $('.splist').children().length;j ++){		//遍历所有商品li累加单条商品数量
			num_1 += parseInt($('.splist').children().eq(j).children('.ld5').children('#num').val());
		}
		//console.log(num_1);
		$('.num1').html(num_1);
	}
	//选中商品数量
	function check_num(){
		num_2 = 0;
		for( var j = 0;j < $('.splist').children().length;j ++){
			if($('.splist').children().eq(j).find('i').hasClass('allcheck')){
				num_2 += parseInt($('.splist').children().eq(j).find('i').parent().parent().siblings('.ld5').children('#num').val());
				//console.log($(this));
			}
			
		}
		//console.log(num_2);
		$('.checknumber').html(num_2);
	}
	
	
	
	//单项商品数量减少
	$('.jian').click(function(){
		if($(this).parent().siblings('.ld1').find('i').hasClass('allcheck')){ //判断该商品是否被选中
			if($(this).parent().children('#num').val() == 1){  
				oMoney = oMoney;
			}else{
				oMoney -= parseInt($(this).parent().siblings('.ld4').children('span').html())
				
				console.log(oMoney);
				$('.price').html(oMoney);
				$('.price_2').html(oMoney);
			}
			
		}
		if($(this).parent().children('#num').val() == 1){   //商品数量不能小于1 
			$(this).parent().children('.num').val(1);
		}else{
			var n = $(this).parent().children('#num').val();  //商品数量每次点击减1
			//console.log($('.num').val());
			$(this).parent().children('#num').val(n-1);
		}
		var num = ($(this).parent().siblings('.ld4').children('span').html())*($(this).parent().children('#num').val());
		$(this).parent().siblings('.ld6').children('span').html(num);     //计算单条商品的价格：数量*单价
		
		num_1 = 0;
		shopcar_num();     //更改全部商品数
		check_num();
	})
	//单项商品数量增加
	$('.jia').click(function(){	
		var n = $(this).parent().children('#num').val();
		//console.log($('.num').val());
		n++;
		$(this).parent().children('#num').val(n);
		//console.log($(this));
		var num = ($(this).parent().siblings('.ld4').children('span').html())*($(this).parent().children('#num').val());
		$(this).parent().siblings('.ld6').children('span').html(num);
		if($(this).parent().siblings('.ld1').find('i').hasClass('allcheck')){
			oMoney += parseInt($(this).parent().siblings('.ld4').children('span').html())
		$('.price').html(oMoney);
		$('.price_2').html(oMoney);
		}
		num_1 = 0;
		shopcar_num();
		check_num();
	})
	//console.log($('.splist li').children('.ld6').html());
				//上部全选按钮
	$('.detail_title').find('i').click(function(){
		//console.log($(this));
		if($(this).hasClass('allcheck')){ 		//判断该按钮是否按下
			$('i').removeClass('allcheck');			//已按下清除类名，重置总金额
			oMoney = 0;
			//console.log(oMoney);
			$('.price').html(oMoney);
			$('.price_2').html(oMoney);
			
			
		}else{														//未按下计算所有商品金额
			$('i').addClass('allcheck');
			for( var j = 0;j < $('.splist').children().length;j ++){			//所有商品总价相加
				oMoney += parseInt($('.splist').children().eq(j).children('.ld6').children('span').html());
				
			}
			$('.price').html(oMoney);
			$('.price_2').html(oMoney);
		}
		check_num();
	})
			//下部全选按钮
	$('#money').find('i').click(function(){
		//console.log($(this));
		if($(this).hasClass('allcheck')){
			$('i').removeClass('allcheck');
			oMoney = 0;
			//console.log(oMoney);	
			$('.price').html(oMoney);
			$('.price_2').html(oMoney);
		}else{
			$('i').addClass('allcheck');
			for( var j = 0;j < $('.splist').children().length;j ++){
				oMoney += parseInt($('.splist').children().eq(j).children('.ld6').children('span').html());
				
			}
			//console.log($('.splist').children().length);
			//console.log(oMoney);
			$('.price').html(oMoney);
			$('.price_2').html(oMoney);
		}
		check_num();
	})
	//单条商品按钮
	$('.splist li').find('i').click(function(){
		$(this).toggleClass('allcheck');
		if($(this).hasClass('allcheck')){
			oMoney += parseInt($(this).parent().parent().siblings('.ld6').children('span').html());
			//console.log(typeof $(this).parent().parent().siblings('.ld6').children('span').html());
			//console.log(oMoney);
			$('.price').html(oMoney);
			$('.price_2').html(oMoney);
		}else{
			oMoney -= parseInt($(this).parent().parent().siblings('.ld6').children('span').html());
			console.log(oMoney);
			$('.price').html(oMoney);
			$('.price_2').html(oMoney);
		}
		allcheck_on();
		check_num();
	})
	//删除按钮
	$('.del').click(function(){
		var arr = eval(localStorage.getItem("goods"));
		var undernum = $(this).parent().parent().index();
		console.log(arr);
		arr.splice(undernum,1);
		localStorage.setItem('goods',JSON.stringify(arr));
		oMoney -= parseInt($(this).parent().siblings('.ld6').children('span').html());
		$('.price').html(oMoney);
		$('.price_2').html(oMoney);
		$(this).parent().parent().remove();
		check_num();
		shopcar_num();
		location.reload();
		
	})
	//修改商品数量
	$('.splist li').find('#num').blur(function(){
		var num_3 = ($(this).val())*($(this).parent().siblings('.ld4').children('span').html());
		$(this).parent().siblings('.ld6').children('span').html(num_3);
	})
	//所有商品均选中则全选选中
	function allcheck_on(){
		if(($('.splist').find('.allcheck').length) == ($('.splist').find('i').length)){
			$('.detail_title').find('i').addClass('allcheck');
			$('.float1').find('i').addClass('allcheck');
		}else{
			$('.detail_title').find('i').removeClass('allcheck');
			$('.float1').find('i').removeClass('allcheck');
		}
		
	}
	
})
}
function sc_msg(){
	$.ajax({
		url:'test.json',
		type:'GET',
		success:function(res){
			var sc_str = localStorage.getItem("goods");
			if(sc_str){
				var sc_obj = eval(sc_str);
				var sc_num = 0 ;
				var html = ''; 
				for(var i in sc_obj){					
					html += '<li><div class="ld1"><div style="height:98px;float: left;"><i></i></div><div class="img"><img src="'+res[sc_obj[i].id].img1+'" /></div></div><div class="ld2"><a href="javascript:;">'+res[sc_obj[i].id].text2+'</a></div><div class="ld3"></div><div class="ld4">￥<span>'+res[sc_obj[i].id].price+'</span></div><div class="ld5"><span class="jian"> - </span><input type="text" value="'+sc_obj[i].num+'" id="num" /><span class="jia"> + </span></div><div class="ld6">￥<span>'+res[sc_obj[i].id].price*sc_obj[i].num+'</span></div><div class="ld7"><span class="del">删除</span></div></li>'
				}
				$('.splist').html(html);
			}
		}
	})

}
