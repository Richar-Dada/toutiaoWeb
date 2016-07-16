(function(angular){
	var app = angular.module('channel.controller',['dataApp']);
	app.controller('channelController',[
		'$scope',
		'dataService',
		'$routeParams',
		'$http',
		function($scope,dataService,$routeParams,$http){
		//var url = 'http://toutiao.com/api/article/recent/?source=2&category=news_hot&_=1468337680127';
		//拼接url
		//新的http://toutiao.com/api/article/recent/?source=2&category=__all__&as=A1B5E7C8882F107&cp=5788CF6100773E1&_=1468592391096
		var url = 'http://toutiao.com/api/article/recent/?source=2&category=';
		var channelType = $routeParams.typeChannel;
		if(channelType == 'all'){
			channelType = '__'+ channelType + '__';
		}
		var nowTime = Date.now();
		url = url + channelType + '&as=A1B5E7C8882F107&cp=5788CF6100773E1&_=' + nowTime;
		//根据路径参数，获取数据
		
		$http .jsonp(url + "&callback=JSON_CALLBACK").success(function(responseData) { 
			$scope.data = responseData.data;
			
		});

		//给滚动事件绑定事件，往以拉就加载更多数据
		var begindistance = 400;
		angular.element(document).on('scroll',function(){
			if(document.body.scrollTop > begindistance){
				var moreurl = 'http://toutiao.com/api/article/recent/?source=2&count=20&category='+channelType+'&max_behot_time='+nowTime.toString().slice(0, 10)+'&utm_source=toutiao&offset=0&as=A195F7C8873A939&cp=5787AA99B3F95E1&max_create_time='+nowTime.toString().slice(0, 10)+'&_=1468506603000';
				//http://toutiao.com/api/article/recent/?source=2&count=20&category=__all__&max_behot_time=1468508742&utm_source=toutiao&offset=0&as=A1B517B8C70AB06&cp=57873ACB00A64E1&max_create_time=1468448265&_=1468508877482
				//http://toutiao.com/api/article/recent/?source=2&count=20&category=__all__&max_behot_time=1468509359490&utm_source=toutiao&offset=0&as=A195F7C8873A939&cp=5787AA99B3F95E1&max_create_time=1468509359490&_=1468506603000&callback=angular.callbacks._7
				//http://toutiao.com/api/article/recent/?source=2&category=__all__&as=A10527F8B7FB1D1&cp=5787EBF1CD711E1&_=1468510673603
				//http://toutiao.com/api/article/recent/?source=2&count=20&category=__all__&max_behot_time=1468510815&utm_source=toutiao&offset=0&as=A155E7B8774B1FF&cp=57879B21DFFF9E1&max_create_time=1468500385&_=1468510673611
				$http .jsonp(moreurl + "&callback=JSON_CALLBACK").success(function(responseData) { 
					[].push.apply($scope.data,responseData.data);
					
					
				});
				
				begindistance+=1000;
			}
		});

		//点击删除按钮，删除文章
		$scope.hide = function(e){
			angular.element(e.target).parent().parent().parent().parent().remove();
		}
		
	}]);
})(angular);