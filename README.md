1.这是类似bootstrap的官方api

2.通过自定义json类型，可以动态生成导航分类,以及Api内容。

3.使用方法  

           （1）如下格式定义 data.json
               [ {"id":"s1","name":"起步","pId":0,"level":1},
            	{"id":"s2","name":"全局css样式","pId":0,"level":1},
            	{"id":"s3","name":"组件","pId":0,"level":1},
            	{"id":"s4","name":"插件","pId":0,"level":1},
            	{"id":"s5","name":"定制","pId":0,"level":1},
            	{"id":"s6","name":"网站实例","pId":0,"level":1},
            	{"id":"s1.1","name":"概览","pId":"s1","level":2},
            	{"id":"s1.2","name":"栅格布局","pId":"s1","level":2},
            	{"id":"s1.3","name":"排版","pId":"s1","level":2},
            	{"id":"s1.4","name":"代码","pId":"s1","level":2},
            	{"id":"s1.5","name":"表单","pId":"s1","level":2},
            	{"id":"s1.6","name":"表格","pId":"s1","level":2},
            	{"id":"s1.7","name":"按钮","pId":"s1","level":2},
            	{"id":"s1.8","name":"图片","pId":"s1","level":2}]
            	其中 name是 导航的或者分类的名字  pId是所属的父级id  level表示是第几级
            	
            （2）如下格式定义contentJson 
              [ {"id":1,"sectionId":"s1.1","content":[
    				  {
    				      "article":"深入了解 Bootstrap 底层结构的关键部分，包括我们让 web 开发变得更好、更快、更强壮的最佳实践。",
    				      "code":"<!DOCTYPE html>\n<html lang=\"zh-CN\">\n...\n</html>"}				
    				  ]
                 }]
                 	其中 sectionId 是上面dataJson对应的id,  content是对应的内容 article是文字  code是代码
