
window.onload=function(){

	$(".center-select-list li").hover(function(){
		$(".center-left-hidebox").removeClass("hide");
	},function(){
		$(".center-left-hidebox").addClass("hide");
	});
	$('.center-left-box3-bd span').hover(function(){
		$(this).parent().parent().parent().find('.box-code').removeClass("hide");
	},function(){
		$(this).parent().parent().parent().find('.box-code').addClass("hide");
	});
	//tab切换
	tabChange($('#changeT'),$('#changeBd'));
	//图片轮播	
	carouseLiChange($('#carousel1'),0);
	setTimeout(function(){
		carousel($('#carousel1'),5,4000);
	    taghover($('#carousel1'),5);	
	},2000);
	carouseLiChange($('#carousel2'),0);
	setTimeout(function(){
		carousel($('#carousel2'),5,4000);
		taghover($('#carousel2'),5); 
	},1000);
	setTimeout(function(){
		carousel($('#carousel3'),3,6000);
	},4000);	
	//滚动条监听
	scrolChange($('.center-float-num1'),800);
	scrolChange($('.center-float-num2'),1600);
	scrolChange($('.center-float-num3'),1930);
	scrolChange($('.center-float-num4'),2260);
	scrolChange($('.center-float-num5'),0);
	window.onscroll = function () {
		var btop=document.documentElement.scrollTop||document.body.scrollTop;
		console.log(btop);
		if(btop>480)
			$('.center-float').css('top',btop-200+"px");
		else{
			$('.center-float').css('top','280px');
		}		
	}
}
function scrolChange(obj,h){
	obj.click(function(){
		$('body,html').scrollTop(h); 
	})
}
//tab切换
function tabChange(obj1,obj2){
	var nobj=obj1.children();
	var bobj=obj2.children();
	nobj.each(function(index,ele){
		bobj.find('a:first').css('color','#F40');
		$(this).mouseover(function(){
			nobj.each(function(){
				$(this).find('a').css({
						fontWeight:'100',
						borderBottom:'none'
					});
			});
			$(this).find('a').css({
				fontWeight:'bold',
				borderBottom:'3px solid #F40'
			});
			bobj.each(function(){
				$(this).addClass("hide");
			});
			bobj.eq(index).removeClass("hide");
		});
		
	})
}
//下面滚轮
function carouseLiChange(obj,movenum,moveLength){
	obj.next().children().css("background","#aba9a9");
	obj.next().children(':eq('+movenum+')').css("background","#FF4200");
    obj.css("marginLeft",moveLength+"px");
}
//中间滚轮
function taghover(obj,num){
	var objWidth=parseInt(obj.parent().css("width"));
	obj.hover(function(){
		obj.parent().find(".center-tag").show();
		obj.parent().find(".center-tag").mouseover(function(){
			obj.parent().find(".center-tag").show();
		});
	},function(){
		obj.parent().find(".center-tag").hide();
		obj.parent().find(".center-tag").mouseout(function(){
			obj.parent().find(".center-tag").hide();
		});
	});
	obj.parent().find(".carousel-pre").click(function(){
		var val=parseInt(obj.css("marginLeft"))+objWidth;
		if(val>0)
			val=-objWidth*(num-1);
		var val1=Math.abs(val/objWidth);
		carouseLiChange(obj,val1,val);
	})
	obj.parent().find(".carousel-next").click(function(){
		var val=parseInt(obj.css("marginLeft"))-objWidth;
		if(val<-objWidth*(num-1))
			val=0;
		var val1=Math.abs(val/objWidth);
		carouseLiChange(obj,val1,val);
	})
}
//轮播封装
function carousel(obj,num,time){
	var objWidth=parseInt(obj.parent().css("width"));
	var objJS=obj.parent().find(".carousel-tag")[0];
	var ObjWidthIng=parseInt(obj.css("marginLeft"));
	clearInterval(obj.timer1);
	if(objJS){
	var tagli=objJS.getElementsByTagName("li");
	for(var i=0;i<tagli.length;i++){
		tagli[i].index=i;
		tagli[i].onclick=function(){
			var mdate=-(this.index*objWidth);
			carouseLiChange(obj,this.index,mdate);
		}
	}
	 var valswitch=ObjWidthIng/objWidth;
	 switch(valswitch){
	 case 0:
		 carouseLiChange(obj,1);
	     break;
	 case -1:
		 carouseLiChange(obj,2);
	     break;
	 case -2:
		 carouseLiChange(obj,3);
	     break;
	 case -3:
		 carouseLiChange(obj,4);
	     break;
	 case -4:
		 carouseLiChange(obj,0);
	     break;		     
	 }
	}
	 obj.timer1 = setInterval(function () {		 
		 ObjWidthIng=ObjWidthIng-10;
		obj.css("marginLeft",ObjWidthIng+"px");
		if(ObjWidthIng%objWidth==0){
			clearInterval(obj.timer1);
			 if(ObjWidthIng<=-objWidth*num){
					obj.css("marginLeft",0);
				}
			setTimeout(function(){
				carousel(obj,num,time);
			},time);
		}
	 },1);
}
