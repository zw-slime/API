$(function(){  
	var arrMd = []; 
	var len=0;
	var id0=0;
	
	
	var d=null;
	var c=null;
	$.getJSON('json/data.json',function(data){
		d=data;
		  /*一级菜单初始化*/
		tree(data,$("#mynav"),0) ;
		   /*点击一级菜单*/
		$("#mynav li").on("click",function(){
			var id=$(this).index("#mynav>li");
			$(this).addClass("active").siblings().removeClass("active");
			$("#sidenav").html("");
			tree(data,$("#sidenav"),"s"+(id+1)) ;
			
			
			$(".detail").html("");
			changeContent("s"+(id+1),d);
		})
		
		/*二级菜单初始化*/
		tree(data,$("#sidenav"),"s1") ;
		//$(".sub-nav>ul").height($(".sub-nav>ul").height()+180);
		/*点击二级菜单*/
		$("#mynav li:eq(0)").addClass("active");
		
		
		changeContent("s1",d);
	});
	

    
    
   
   /*随滚轮滚动的效果*/
function update(){  
	
var scrollH = $(window).scrollTop();  
for(var i = 0;i<len;i++){ 
	
var mdHeight = arrMd[i].offset().top-71;  

if(mdHeight < scrollH){
	var j = i;
	navon(j);
}  
}  
}  


//高亮导航菜单  展开导航
function navon(id){  
	$('#sidenav li').removeClass("active");
    $('#sidenav li').eq(id).addClass('active').parent().parent().addClass("active"); 
    $('#sidenav li').eq(id).find("ul").show().parent().siblings("li").find("ul").hide();
}  
   
   function changeContent(ii,d){
   			arrMd = [];
   	    $.getJSON('json/content.json',function(data){
    	c=data;
		   $.each(data,function(i,v){
		      if(v.sectionId.indexOf(ii)>-1){
		      	  if(v.sectionId.lastIndexOf(".")<3){
		      	  		var div=$('<div class="row"></div>');
		      	   			$(".detail").append(div);
		      	   			$.each(d,function(i1,v1){
		   	  					if(v1.id==v.sectionId){		   	  					   	  						   	  				
		   	  					var h2=$('<h2 class="maodian">'+v1.name+'</h2>');		   	  						   	  					   	  					   	  	       
			   	  	        	div.append(h2);	
			   	  	        	$.each(v.content,function(i2,v2){
			   	  	        		if(v2.article!="" && v2.code!=""){
			   	  	        			var p=$('<p>'+v2.article+'</p>'+'<pre><code>'+HTMLEnCode(v2.code)+'</code></pre>');
			   	  	        		}else if(v2.article!=""){
			   	  	        			var p=$('<p>'+v2.article+'</p>');
			   	  	        		}else{
			   	  	        			var p=$('<pre><code>'+HTMLEnCode(v2.code)+'</code></pre>');
			   	  	        		}		   	  	        		    		
			   	  	        		    
			   	  	        		div.append(p);
			   	  	        	})        			   	  					   	  	        		   	  	       		   	  	        
		   	  			 	}
		   	   				})
		      	  	}else{
		      	  		$.each(d,function(i1,v1){	
		   	  				if(v1.id==v.sectionId){		   	  					   	  				
		   	  					var h2=$('<h3 class="maodian">'+v1.name+'</h3>');
		   	  	        		$(".detail>div").eq(v.sectionId.split(".")[1]-1).append(h2);	
		   	  	        		$.each(v.content,function(i2,v2){
		   	  	        		if(v2.article!="" && v2.code!=""){
		   	  	        			var p=$('<p>'+v2.article+'</p>'+'<pre><code>'+HTMLEnCode(v2.code)+'</code></pre>');
		   	  	        		}else if(v2.article!=""){
		   	  	        			var p=$('<p>'+v2.article+'</p>');
		   	  	        		}else{
		   	  	        			var p=$('<pre><code>'+HTMLEnCode(v2.code)+'</code></pre>');
		   	  	        		}		   	  	        		    			    
		   	  	        		$(".detail>div").eq(v.sectionId.split(".")[1]-1).append(p);
		   	  	        	})		   	  	        			   	  					   	  	        		   	  	       		   	  	        
		   	  	 			}
		   	   			})
		      	  }	  
		      	 
		      }
		   	  		   	   
		   })
		//遍历锚点  
			var mds = $(".maodian")  
			 
			for(var i = 0, len = mds.length;i<len;i++){  
			arrMd.push($(mds[i]));  
			}
			
			//绑定滚动事件  
			$(window).on('scroll',function(){
				
				var scrollH = $(window).scrollTop(); 
				if(scrollH>=226){
						$(".sub-nav>ul").addClass("fixed");
					}else{
						$(".sub-nav>ul").removeClass("fixed");;
					}
				
				if($(window).scrollTop()+$(window).height()==$(document).height()){
		    	  	if(id0>0)
		    	  	navon(id0);
		    }else{
		    	for(var j = 0;j<len;j++){ 
						if(arrMd[j])
					        var mdHeight = arrMd[j].offset().top-91;  
	
					if(mdHeight < scrollH){
						var k = j;
						navon(k);
					}
					}
		    }
		 										
			});
	});
   }

	/*遍历json数据 data 是数据  obj是父级元素  level是在pId*/
  function tree(data,obj,level) {
  	  
  	  if(level==0){
  	  			/*第一级菜单不需要递归*/
  	  	 for(var i in data){
  	  	 	if(data[i].pId==level)
  	  	 	obj.append('<li><a href="javascript:void(0)">'+data[i].name+'</a></li>')
  	  	 }
  	  }else{
  	  	for(var j in data){
  	  		console.log(data[j].pId);
  	  	 	if(data[j].pId==level){
  	  	 		var li=$('<li><a href="javascript:void(0)" >'+data[j].name+'</a></li>');
  	  	 			obj.append(li);
  	  	 			if(data[j].level<3){
  	  	 			var _ul=$("<ul></ul>");
  	  	 			 li.append(_ul);
  	  	 			 tree(data,_ul,data[j].id) ;
  	  	 		} 	  	 			
  	  	 	}  	 	 	  	 	
  	  	 } 	  	
  	  }
  	  $('#sidenav li').on("click",function(e){
  	  	
  	  	$('#sidenav li').removeClass("active");
		    id0=$(this).index('#sidenav li');
		    navon(id0);
		    if(arrMd[id0]){
		       $("html,body").animate({scrollTop: arrMd[id0].offset().top-59}, 10); 
		    }
		   
		    
		   e.stopPropagation();
		});
  }
  
}) ; 




function HTMLEnCode(str) {
        var s = "";
        if (str.length == 0)
            return "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/    /g, "&nbsp;");
        s = s.replace(/\'/g, "'");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    }
