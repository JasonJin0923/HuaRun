//调用cookie中在之前存入的id值，利用id在json中找到所对应的商品，进行动态加载
$(function(){
	var id = $.cookie('buyId');
		 $.ajax({
	        url:"test.json",
	        type:"GET",
	        success:function(res){

	        	//console.log(res[id]);
				var html = '<div class="mark_box"></div><img src="'+res[id].img+'" style="display:block"/><img src="'+res[id].img_2+'" /><img src="'+res[id].img_3+'" /><img src="'+res[id].img_4+'" /><div class="position_box"></div>'
	        	$('#img1').html(html);		//图片展示处的动态加载
	        	
				var  html = '<div id="b_box_all"><img src="'+res[id].img+'" style="display:block"/><img src="'+res[id].img_2+'" /><img src="'+res[id].img_3+'" /><img src="'+res[id].img_4+'" /></div>'
				$('#b_box').html(html);				//图片放大处的动态加载
				
				var html = '价格<span class="price">￥'+res[id].price+'</span><span class="cu">促销中</span><del class="yuan">参考价￥309</del>'
      			$('.message_price').html(html);			//商品信息处的动态加载
      			
      			var html = '<img src="'+res[id].img1+'"/><img src="'+res[id].img2+'"/><img src="'+res[id].img3+'"/><img src="'+res[id].img4+'"/>'
	        	$('#imgs').html(html);  			//小图片系列处的动态加载
	        	
	        	var html = '<a href="javescript:;" class="shopcar" id="'+res[id].id+'">加入购物车</a><a href="javescript:;" class="sc"><i></i>收藏</a>'
	        	$('.message_shopcar').html(html);	//给该页的“加入购物车”按钮添加上与该商品相同的id
	        	
	        	var html = ''+res[id].text1+''
	        	$('title').html(html);
	        }


    	})
})
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
		//二、三级菜单隐藏、显示
		$('.header_nav_title').mouseover(function(){
			//alert($);
			$('.header_nav_2').css("display","block");
		})
		$('.header_nav_title').mouseout(function(){
			//alert($);
			$('.header_nav_2').css("display","none");
		})
		$('.header_nav_2').mouseover(function(){
			//alert($);
			$('.header_nav_2').css("display","block");
		})
		
		//三级显示隐藏
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
			$('.header_nav_2').css("display","block");
		})
		$('.header_nav_3').children('li').mouseout(function(){
			$('.header_nav_2').children('li').eq($(this).index()).css("background","#fff");
			$(this).css("display","none");
			$('.header_nav_2').css("display","none");
		})
	})
	
	
	//放大镜轮播
	$(function(){
		$('#imgs').children().mouseover(function(){
			//alert(1);
			//console.log($(this))
			$(this).css('border','3px solid #e04040');
			$(this).siblings().css('border','3px solid #ededed');
			$('#img1').children('img').eq($(this).index()).css('display','block');
			$('#img1').children('img').eq($(this).index()).siblings('img').css('display','none');
			$('#b_box_all').children('img').eq($(this).index()).css('display','block');
			$('#b_box_all').children('img').eq($(this).index()).siblings('img').css('display','none');
		})
		fangda();
	})
	
	
	
	
	//数量增减
	$(function(){
		//点击“-”按钮时减1
		$('.jian').click(function(){
			if($('.num').val() == 1){			//判断当数量已经为1时，则减号失效
				$('.num').val(1);
			}else{					
				var n = $('.num').val();
				//console.log($('.num').val());
				$('.num').val(n-1);
			}	
		})
		//点击“+”按钮时加1
		$('.jia').click(function(){
			if($('.num').val() == $('.kucun').html()){				//判断当数量已经为库存量时，则加号失效
				$('.num').val($('.kucun').html());
			}else{
				var n = $('.num').val();
				//console.log($('.num').val());
				n++;
				$('.num').val(n);
			}	
		})
	})
	
	
} //window
//回顶小组件出现和消失
window.onscroll = function(){
	var xdmenu = document.getElementById("xdmenu");
	var back = document.getElementById("back");
	//console.log(document.documentElement.scrollTop);
	//console.log(document.body.scrollTop);
	if((document.documentElement.scrollTop >= 20) || (document.body.scrollTop >= 20)){
		//xdmenu.style.display = "block";
		//back.style.display = "block";
		$(function(){
			$('#back').stop().fadeIn();
		})
	}else{
		//xdmenu.style.display = "none";
		//back.style.display = "none";
		$(function(){
			$('#back').stop().fadeOut();
		})
	}
}
//放大镜
function fangda(){
		var img1 = document.getElementById("img1");
		var oMark_box = document.getElementById("img1").children[0];
		var oPosition_box = document.getElementById("img1").children[5];
		var oB_box = document.getElementById("b_box");
		var oB_box_all = document.getElementById("b_box_all");
	
		img1.onmousemove = function(event){
		//alert(1);
			event = event || window.event;
			var left,top;
			left = event.offsetX - oPosition_box.offsetWidth/2;
			top = event.offsetY - oPosition_box.offsetHeight/2;
			//边界检测
			left = left < 0 ? 0 : left;
			left = left > oMark_box.offsetWidth - oPosition_box.offsetWidth ? oMark_box.offsetWidth - oPosition_box.offsetWidth : left;
			top = top < 0 ? 0 : top;
			top = top > oMark_box.offsetHeight - oPosition_box.offsetHeight ? oMark_box.offsetHeight - oPosition_box.offsetHeight : top;
			//灰框移动
			oPosition_box.style.left = left + "px";
			oPosition_box.style.top = top + "px";
			//比例移动
			var propLeft,propTop;
			propLeft = left / (oMark_box.offsetWidth - oPosition_box.offsetWidth);
			propTop = top / (oMark_box.offsetHeight - oPosition_box.offsetHeight);
			oB_box_all.style.left = - (oB_box_all.offsetWidth - oB_box.offsetWidth) * propLeft + "px";
			oB_box_all.style.top = - (oB_box_all.offsetHeight - oB_box.offsetHeight) * propTop + "px";		
		}
		//鼠标划入出现放大镜
		oMark_box.onmouseover = function(){
			oPosition_box.style.display = "block";
			oB_box.style.display = "block";
		}
		//鼠标划出放大镜消失
		oMark_box.onmouseout = function(){
			oPosition_box.style.display = "none";
			oB_box.style.display = "none";
		}
	}
$(function(){
	//页面刷新时获取购物车数量;
	sc_car()

	$('.message_shopcar').on('click','.shopcar',function(){
		//alert(this.id);
		//购物车数量增加;
		var id = this.id;
		var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
		var same = false;//判断时候已经追加
		var num = $('.num').val();
		//是否是第一次添加
		if(first){
			//第一次添加,建立json结构。
			$.cookie('goods','[{id:'+id+',num:'+num+'}]');
			$.cookie('first','false');
		}else{
			var str = $.cookie('goods');
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){		
					arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					$.cookie('goods',cookieStr);
					same = true;
				}
			}
			//如果id不同，重新建立商品对象;
				
			if(!same){
				var obj  = {id:id,num:1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr);
			}
		}
		sc_car();
	})
})
	//购物车
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
	//商品下部分详情，点击切换
$(function(){
	$('.intro_title ul li').children().click(function(){
		$(this).addClass('changecolor');
		$(this).parent().siblings().children().removeClass('changecolor');
		var index = $(this).parent().index();
		//console.log(index);
		$('.tab_007').children().eq(index).css("display","block");
		$('.tab_007').children().eq(index).siblings().css("display","none");
		
	})
	
	
	
})
