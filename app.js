
//主功能模块
(function(angular){
	var app = angular.module('myApp',['channel.route']);

	app.controller('myController',['$scope','$http','$timeout',function($scope,$http,$timeout){
		//主页数据渲染,主要包括24小时热闻、推荐头条号、精彩图片，热门视频
		//获取24小时热闻数据
		var hotNewsUrl = 'http://toutiao.com/api/article/real_time_news/?count=10&utm_source=toutiao&offset=0&_=1468409038923&count=10&utm_source=toutiao&offset=0';
		$http.jsonp(hotNewsUrl+'&callback=JSON_CALLBACK').success(function(responseData){
			$scope.hotNewsData = responseData.data.news;	
		});
		$scope.isZero = function(num){
			return num != 0;
		}

		//获取推荐头条号数据
		var recommendUrl = 'http://toutiao.com/recom_media/?_=' + Date.now();
		$http.jsonp(recommendUrl+'&callback=JSON_CALLBACK').success(function(responseData){
			$scope.recommendData = responseData.data;
		});


		//获取精彩图片的数据
		var photoUrl = 'http://toutiao.com/api/article/hot_gallery/?_=' + Date.now();
		$http.jsonp(photoUrl+'&callback=JSON_CALLBACK').success(function(responseData){
			$scope.photoData = responseData.data;
		});


		//获取精彩视频数据
		var hotVideoUrl = 'http://toutiao.com/api/article/hot_video/?_=' + Date.now();
		$http.jsonp(hotVideoUrl+'&callback=JSON_CALLBACK').success(function(responseData){
			$scope.hotVideoData = responseData.data;
		});

		//获取搜索热词数据
		var hotWordUrl = 'http://toutiao.com/hot_words/?_=' + Date.now();
		$http.jsonp(hotWordUrl+'&callback=JSON_CALLBACK').success(function(responseData){
			$scope.hotWordData = responseData;
		});

		//控制搜索热词的显示和隐藏
		$scope.isShow = false;
		$scope.show = function(){
			$scope.isShow = true;
		}
		$scope.hide = function(){
			$timeout(function(){
				$scope.isShow = false;
			},500);
			
		}
	}]);

	//自定义指令searchEvent,作用：点击搜索热词时跳转到搜索结果页面
	app.directive('searchEvent',[function(){
		return {
			restricrt : 'A',
			link : function(scope,element,attributes){
				element.on('click',function(){
					console.log(element.children().children().next().text());
					var keyWord = element.text();
					window.open('http://toutiao.com/search/?keyword='+keyWord);
				});
			}
		}
	}]);

	//自定义指令hotNewsEvent,作用：点击24小时热闻会跳转到对应页面
	app.directive('hotNewsEvent',[function(){
		return {
			restricrt : 'A',
			link : function(scope,element,attributes){
				element.on('click',function(e){
					console.log(element.attr('href'));
					var newsID = element.attr('href');
					e.preventDefault();
					window.open('http://toutiao.com/group/'+newsID+'/');
				});
			}
		}
	}]);

})(angular);