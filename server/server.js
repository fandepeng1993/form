/**
 * Created by Administrator on 2017/6/19.
 */
//自定义服务
angular.module('serve',[])
    .service('CommonDataService', ['$http', '$q', function ($http, $q) {
        return {
            //根据方法名和参数列表获取数据
            getData: function (url) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url:url
                }).then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }])
    .filter('UpabC', function() { //可以注入依赖
        return function(input) {
            return String.fromCharCode(input+65);
        }
    })
    .filter('isInArray',function(){
        return function (input,a){
            return a.indexOf(input)!=-1?true:false;
        }
    })
    .filter('timeDifference',function(){
        return function (input,a){
            if(a=='day'){
                return input>=0?(input/ 1000 / 60 / 60 / 24).toFixed(1):0;
            }
            else {
                return input>=0?(input/ 1000 / 60 / 60 ).toFixed(1):0;
            }

        }
    });