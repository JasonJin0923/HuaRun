window.onload = function(){
	
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
		//console.log(typeof $.cookie('name'));
	
//		$.ajax({
//			type:"GET",
//			url:"test.json",
//			success:function(res){
//				console.log(res);
//			}
//		})
	})
	$('.out_num').click(function(){
		$.cookie('name',null);
		location.reload();
	})
	sc_car();
	//导航滑动变色
	$(function(){
		$('.header_nav_1').children('li').mouseover(function(){
			$(this).addClass('action');
		})
		$('.header_nav_1').children('li').mouseout(function(){
			$(this).removeClass('action');
		})
	})
	//二、三级菜单
	$(function(){
		$('.header_nav_2').children('li').mouseover(function(){
			$(this).css("background","#f3484a");
			$('.header_nav_3').children('li').eq($(this).index()).css("display","block");
		})
		$('.header_nav_2').children('li').mouseout(function(){
			$(this).css("background","#fff");
			$('.header_nav_3').children('li').eq($(this).index()).css("display","none");
		})
		$('.header_nav_3').children('li').mouseover(function(){
			$('.header_nav_2').children('li').eq($(this).index()).css("background","#f3484a");
			$(this).css("display","block");
		})
		$('.header_nav_3').children('li').mouseout(function(){
			$('.header_nav_2').children('li').eq($(this).index()).css("background","#fff");
			$(this).css("display","none");
		})
	})
	//轮播图
	$(function(){
		var timer;
		var index = 0;
		timer = setInterval(fn_timer,3000);
		var $li = $('#banner .banner_pic').children();
		var $li2 = $('.list_num').children('li');
		function fn_timer(){			
			if(index == $li.length -1){
				index = 0;
			}else{
				index++;
			}
			$li.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);			
			$li2.removeClass("exp");
			$li2.eq(index).addClass("exp");
		}
		//划入页码轮播停止
		$('.list_num').mouseover(function(){
			clearInterval(timer);
		})
		$('.list_num').mouseout(function(){
			timer = setInterval(fn_timer,3000);
		})
		//划入具体页码显示对应图片
		$('.list_num').children('li').mouseover(function(){
			clearInterval(timer);
			index = $(this).index();
			//console.log(index);
			$li.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
			$li2.removeClass("exp");
			$li2.eq(index).addClass("exp");
			timer = setInterval(fn_timer,3000);
		})
		
	})
	//抢购倒计时
	var dTimer = setInterval(function(){
		var hour = document.getElementById("hour");
		var min = document.getElementById("min");
		var sed = document.getElementById("sed");
		var d1 = new Date("2016/9/25");
		var d2 = new Date();
		d3 = d1.getTime();
		d4 = d2.getTime();
		var hour1 = Math.floor((d3 - d4) / 1000 / 3600);
		var min1 = Math.floor(((d3 - d4) / 1000 / 60) - (hour1 * 60));
		var sed1 = Math.floor(((d3 - d4) / 1000) - (hour1 * 3600) - (min1 * 60))
		hour.innerHTML = hour1;
		min.innerHTML = min1;
		sed.innerHTML = sed1;	
	},1000)
	//楼层选项卡
		$(function(){			
			$('.floor_nav').children('li:not(.liexp)').mouseover(function(){
				//console.log($(this).index());
				//console.log($('.tab_page').eq($(this).index()-1));
				$('.tab_page').css("display","none");
				$('.tab_page').eq($(this).index()-1).css("display","block");
			})
			$('.floor_nav2').children('li:not(.liexp2)').mouseover(function(){
				//console.log($(this).index());
				//console.log($('.tab_page').eq($(this).index()-1));
				$('.tab_page2').css("display","none");
				$('.tab_page2').eq($(this).index()-1).css("display","block");
			})
			$('.floor_nav3').children('li:not(.liexp3)').mouseover(function(){
				//console.log($(this).index());
				//console.log($('.tab_page').eq($(this).index()-1));
				$('.tab_page3').css("display","none");
				$('.tab_page3').eq($(this).index()-1).css("display","block");
			})
		})
//		var entry03= document.getElementsByClassName("entry03")[0];
//		entry03.onclick=function backs(){
//			 document.body.scrollTop =document.documentElement.scrollTop=0;
//		}
		$(function(){
			$('.entry03').click(function(){
				$('html,body').stop().animate({scrollTop: '0px'}, 1000)
			});
		//动态加载
			$.ajax({
			
				url:"test.json",
				type:"GET",
				success:function(res){
					//console.log(res);
					var html="";
					var html2="";
					var html3="";
					var html4="";
					var html5="";
					for(var i=0;i<8;i++){
					html += '<li><a href="javascript:;" id="'+res[i].id+'" ><img src="'+res[i].img+'"/></a><div class="img_bottom"><a href="#">'+res[i].text1+'</a><span class="sellPoint">'+res[i].text2+'</span><p class="textPrimary price">¥<strong>'+res[i].price+'</strong>.00</p></div></li>'	
						
					}
					for(var i=1;i<9;i++){
					html2 += '<li><a href="javascript:;" id="'+res[i].id+'" ><img src="'+res[i].img+'"/></a><div class="img_bottom"><a href="#">'+res[i].text1+'</a><span class="sellPoint">'+res[i].text2+'</span><p class="textPrimary price">¥<strong>'+res[i].price+'</strong>.00</p></div></li>'	
						
					}
					for(var i=2;i<10;i++){
					html3 += '<li><a href="javascript:;" id="'+res[i].id+'" ><img src="'+res[i].img+'"/></a><div class="img_bottom"><a href="#">'+res[i].text1+'</a><span class="sellPoint">'+res[i].text2+'</span><p class="textPrimary price">¥<strong>'+res[i].price+'</strong>.00</p></div></li>'	
						
					}
					for(var i=3;i<11;i++){
					html4 += '<li><a href="javascript:;" id="'+res[i].id+'" ><img src="'+res[i].img+'"/></a><div class="img_bottom"><a href="#">'+res[i].text1+'</a><span class="sellPoint">'+res[i].text2+'</span><p class="textPrimary price">¥<strong>'+res[i].price+'</strong>.00</p></div></li>'	
						
					}
					for(var i=4;i<12;i++){
					html5 += '<li><a href="javascript:;" id="'+res[i].id+'" ><img src="'+res[i].img+'"/></a><div class="img_bottom"><a href="#">'+res[i].text1+'</a><span class="sellPoint">'+res[i].text2+'</span><p class="textPrimary price">¥<strong>'+res[i].price+'</strong>.00</p></div></li>'	
						
					}
					$('.fenye').html(html);
					$('.fenye2').html(html2);
					$('.fenye3').html(html3);
					$('.fenye4').html(html4);
					$('.fenye5').html(html5);
					tiao();
				}
				
			})			
		})
		
			
		
		
}
function tiao(){
	$(function(){
		//console.log(1);
		$('.fenye li').children('a').click(function(){
			//console.log(1);
			$.cookie('buyId',this.id);
     		window.location.href = 'detail.html'
		})
	})
}
	//吸顶菜单、回顶按键	
window.onscroll = function(){
	var xdmenu = document.getElementById("xdmenu");
	var back = document.getElementById("back");
	//console.log(document.documentElement.scrollTop);
	//console.log(document.body.scrollTop);
	if((document.documentElement.scrollTop >= 730) || (document.body.scrollTop >= 730)){
		xdmenu.style.display = "block";
		//back.style.display = "block";
		$(function(){
			$('#back').stop().fadeIn(500);
		})
	}else{
		xdmenu.style.display = "none";
		//back.style.display = "none";
		$(function(){
			$('#back').stop().fadeOut(500);
		})
	}
}
//动态加载
//		$(function(){
//			$.ajax({
//				type:"GET",
//				url:"test.json",
//				success:function(res){
//					console.log(res);
//				}
//			});				
//		})
//购物车数据及时切换
function sc_car(){
		var sc_str = $.cookie('goods');
		if(sc_str){//如果购物车cookie不为空。
			var sc_obj = eval(sc_str);
			var sc_num = 0 ; 
			for(var i in sc_obj){
				sc_num = Number(sc_obj[i].num) + sc_num;
			}
			$('#shopcarnum').html(sc_num);
			$('.strongnum').html(sc_num);
		}
	}