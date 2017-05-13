/********获取属性值方法***********/
function getstyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle[attr];  //针对IE
	else	
		return getComputedStyle(obj,false)[attr];  //针对火狐和谷歌
}
/********选择CLASSNAME***********/
function getClassName(name,parent){
	oparent=parent?parent:document;
	var eles=[];
	var elements=oparent.getElementsByTagName('*');
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==name)
			eles.push(elements[i]);
	}
	return eles;
}
/******下一个节点的元素******/
function nextelement(element){
	var e=element.nextSibling;
	while(e&&e.nodeType!=1)
		e=e.nextSibling;
	return e;
}
/********跨流浪器事件处理***********/
var eventUtil={
		
		//添加事件
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}
			else if(element.attachEvent){
				element.attachEvent('on'+type,handler);
			}
			else{
					element['on'+type]=handler;	
			}
		},
		//移除事件
		removeHandler:function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}
			else if(element.attachEvent){
				element.detachEvent('on'+type,handler);
			}
			else{
					element['on'+type]=null;	
			}
		},
		//获取事件对象
		getEvent:function(event){
			return event?event:window.event;
		},
		//获取事件类型
		getType:function(event){
			return event.type;			
		},
		//获取事件来自哪个元素
		getElement:function(event){
			return event.target||event.srcElement;
		},
		//取消事件默认行为
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}
			else{
				event.returnValue=false;
			}
		},
		//阻止事件冒泡
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}
			else{
				event.cancleBubble=true;
			}
		}
}