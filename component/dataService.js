(function(angular){
	var app = angular.module('dataApp',[]);
	app.factory('dataService',function(){
		return {
			getData : function(url,obj,callback){
				console.log(url);
		        //在windon全局变量中预先定义一个方法，用来给返回的字符串调用
		        var methodName = 'Jsonp_'+ Math.random().toString().substring(2);
		        window[methodName] = function(data){
		            callback && callback(data);
		            document.getElementsByTagName('body')[0].removeChild(scriptEle);
		        };

		        //把传送的参数格式化成字符串的形式
		        var param = '';
		        for(var key in obj){
		            param += key + '=' + obj[key] + '&';
		        }
		        param = param.slice(0,-1);

		        //创建script标签，实行跨域请求
		        var scriptEle = document.createElement('script');
		       
		        if(!param){
		            scriptEle.src = url + '?callback='+methodName;
		        }else{
		            scriptEle.src = url + '?' + param + '&callback='+methodName;
		        }

		        document.getElementsByTagName('body')[0].appendChild(scriptEle);
			}
		}
	});
})(angular);