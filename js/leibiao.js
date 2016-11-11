window.onload = function(){
	sc_car();
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
	//侧边菜单点击现出现入
	$(function(){
		
		$('.nav2:has(ul)').click(function(event){
			//console.log($(this))
            $(this).children('ul').toggle(500);					//点击处ul显示
            $(this).siblings().children('ul').hide(500);		//其他ul均隐藏
            $(this).children('i').toggleClass('exp');			//点击处一级菜单右侧的“+”变“-”
            $(this).siblings().children('i').removeClass('exp');      //其他一级菜单右侧的“-”变“+”
		})
	})
//动态加载商品列表
$(function(){
	function getMsg(num){
            $.ajax({
                url:'test.json',
                type:'GET',
                dataType:'json',
                success:function(data){
                    //1.计算分页数量
                    var showNum=num;
                    var dataL=data.length;
                    var pageNum=Math.ceil(dataL/showNum);
                    $('.sp_pagenum').pagination(pageNum,{
                        num_edge_entries: 1, //边缘页数
                        num_display_entries: 4, //主体页数
                        items_per_page: 1, //每页显示1项
                        prev_text: "上一页",
                        next_text: "下一页",
                        callback:function(index){
                            var html = '';

                            //console.log(showNum*index+'~'+parseInt(showNum*index)+parseInt(showNum))
                            for(var i = showNum*index; i < showNum*index+showNum;i++){
                                //console.log(i)
                                if(i<dataL){
                                    html += '<li><a href="javascript:;" id="'+data[i].id+'"><img src="'+data[i].img+'" /></a><div class="flag-state" style="height: 32px"></div><div class="sp_name"><a href="javascript:;">'+data[i].text1+'</a></div><div class="sp_price"><span class="price">￥<span style="font-size: 24px;">'+data[i].price+'</span>.00</span><input type="button" value="加入购物车" class="btn" id="'+data[i].id+'"/></div></li>'    
                                }
                            }
                            
                            $('.splist').html(html);
                            tiao();     //此处回调跳转函数
                            shake();
                        }
                    })
                    
                }
            })
        }
	getMsg(20); 			//每页显示个数为20件商品
})
	
	
	
} //window
//回顶小部件消失的显出
window.onscroll = function(){
	var xdmenu = document.getElementById("xdmenu");
	var back = document.getElementById("back");
	//console.log(document.documentElement.scrollTop);
	//console.log(document.body.scrollTop);
	if((document.documentElement.scrollTop >= 20) || (document.body.scrollTop >= 20)){		//滚条超过20显出
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
//点击相应物品，调用cookie记录该商品在json中的id
function tiao(){
	$(function(){
		//console.log(1);
		$('.splist li').children('a').click(function(){
			//console.log(1);
			$.cookie('buyId',this.id);
     		window.location.href = 'detail.html'       //跳转至详情页
		})
	})
	
}
function shake(){
	$(function(){
		$('.splist li').find('img').mousemove(function(){
			//alert(1);
			$(this).addClass('animated shake');
		})
		$('.splist li').find('img').mouseout(function(){
			//alert(1);
			$(this).removeClass('animated shake');
		})
	})
}
//购物车
//$(function(){
//	//页面刷新时获取购物车数量;
//	sc_car()
//
//	$('.splist').on('click','.btn',function(){
//		//alert(this.id);
//		//购物车数量增加;
//		var id = this.id;
//		var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
//		var same = false;//判断时候已经追加
//		//是否是第一次添加
//		if(first){
//			//第一次添加,建立json结构。
//			$.cookie('goods','[{id:'+id+',num:1}]');
//			$.cookie('first','false');
//		}else{
//			var str = $.cookie('goods');
//			var arr = eval(str);
//			//遍历所有对象。如果id相同，让该商品数量递增 ;
//			for(var attr in arr){
//				if(arr[attr].id == id){		
//					arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
//					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
//					$.cookie('goods',cookieStr);
//					same = true;
//				}
//			}
//			//如果id不同，重新建立商品对象;
//				
//			if(!same){
//				var obj  = {id:id,num:1};
//				arr.push(obj);
//				var cookieStr = JSON.stringify(arr);
//				$.cookie('goods',cookieStr);
//			}
//		}
//		sc_car();
//	})
//})
$(function(){
	$('.splist').on('click','.btn',function(){
		var id = this.id;
		var goods = localStorage.getItem("goods");
		var first = goods==null?true:false;//判断是否有cookie进行添加
		var same = false;
		//是否是第一次添加
		if(first){
			//第一次添加,建立json结构。
			localStorage.setItem('goods','[{id:'+id+',num:1}]');
			first = false;
		}else{
			var str = localStorage.getItem("goods");
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){		
					arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					localStorage.setItem('goods',cookieStr);
					same = true;
				}
			}
			//如果id不同，重新建立商品对象;
				
			if(!same){
				var obj  = {id:id,num:1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				localStorage.setItem('goods',cookieStr);
			}
		}
	sc_car();
	})
})
	
//	购物车
//	function sc_car(){
//		var sc_str = $.cookie('goods');
//		if(sc_str){//如果购物车cookie不为空。
//			var sc_obj = eval(sc_str);
//			var sc_num = 0 ; 
//			for(var i in sc_obj){
//				sc_num = Number(sc_obj[i].num) + sc_num;
//			}
//			$('#shopcarnum').html(sc_num);
//			$('.strongnum').html(sc_num);
//		}
//	}
//	购物车
	function sc_car(){
		var sc_str = localStorage.getItem('goods');
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
