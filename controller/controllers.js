/**
 * Created by Administrator on 2017/6/19.
 */
angular.module('controller',['ngSanitize','mgcrea.ngStrap','gridster'])
    .controller('controllers',function($scope,CommonDataService,$popover){
        //data-mcs- data-mcs-axis="x"
        var timer=new Date().getTime();
        var ul_li = $(".form_title_ul li");
        $(".form_title_ul li").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
        $scope.showPop = function(){
            $(".form_fix_bg").show();
            $(".form_pop").animate({right:"0px"});
        };
        $scope.hidePop = function(){
            $(".form_pop").animate({right:"-500px"});
            $(".form_fix_bg").hide();
        };
        $scope.showRight = function(){
            $(".form_content_r_content_p").show();
            $(".form_content_r_content_c").hide();
        };


       CommonDataService.getData('json/test.json?'+timer).then(function(data){
          $scope.xrow=data.data.rows;
          $scope.paixu=data.data.paixu;
          $scope.widthes=650+'px';
          $scope.topes=53+'px';
          $scope.otherread=true;
          $scope.isInEdit=true;

           //添加列
           $scope.form_editRow=function(a,inx,c){
               //console.log(inx);
               //从inx 0开始 A:65
               if(a<0&&$scope.paixu.length>3){
                   for(var i=$scope.standardItems.length-1;i>=0;i--){
                       if($scope.standardItems[i].col<=inx && inx < $scope.standardItems[i].col+$scope.standardItems[i].sizeX){
                           $scope.standardItems.splice(i,1);
                       }
                   }
                   $scope.paixu.splice(inx,c);
                   for(var i=0;i<$scope.xrow.length;i++){
                       ($scope.xrow)[i].cols.splice(inx,c);
                       if($scope.standardItems[i].col>inx){
                           $scope.standardItems[i].col--;
                       }

                   }
                   $scope.widthes=parseInt($scope.widthes)-201+'px';
                   $('#mCSB_1_container').css('width',$scope.widthes);
                   $('.form_table_in').mCustomScrollbar("scrollTo","right");
                   $scope.gridsterConfiguration.columns=$scope.paixu.length;
               }
               else if(a>0&&$scope.paixu.length<8) {
                   if(c<1){
                       for(var i=0;i<$scope.standardItems.length;i++){
                           $scope.standardItems[i].col+=1;
                       }
                   }
                   $scope.paixu.splice(inx+c,0,'clo-add');
                   for(var i=0;i<$scope.xrow.length;i++){
                       ($scope.xrow)[i].cols = new Array($scope.paixu.length);
                   }
                   $scope.widthes=parseInt($scope.widthes)+201+'px';
                   $('#mCSB_1_container').css('width',$scope.widthes);
                   $('.form_table_in').mCustomScrollbar("scrollTo","right");
                   $scope.gridsterConfiguration.columns=$scope.paixu.length;
               }
               else {
                   return;
               }
           };
           //向上或者下添加行数
           $scope.form_editColumn=function(a,inx,c){
               //console.log(inx);
               //inx 从0开始 0，1，2 ，3，4...
               if(a<0){
                   for(var i=$scope.standardItems.length-1;i>=0;i--){
                       //console.log($scope.standardItems[i].row,inx);
                       if($scope.standardItems[i].row<=inx && inx < $scope.standardItems[i].row+$scope.standardItems[i].sizeY){
                           $scope.standardItems.splice(i,1);
                       }
                   }
                   $scope.xrow.splice(inx,c);
                   for(var i=0;i<=$scope.standardItems.length-1;i++){
                       if($scope.standardItems[i].row>inx){
                           $scope.standardItems[i].row--;
                       }
                   }
               }else {
                   //console.log(inx);
                   if(c<1){
                       for(var j=0;j<$scope.standardItems.length;j++){
                           $scope.standardItems[j].row+=1;
                       }
                   }
                   var rowadd=new Array($scope.paixu.length);
                   $scope.xrow.splice(inx+c+1,0,{"cols":rowadd});

               }
           };
           //表单框点击函数
           $scope.moveIn=function(a,b){
               $scope.dataMata=a;
               $scope.indexPo=b;
               $scope.titlesdata= a.type_text;
               //$scope.$watch(dataMata,function(oldd,newd){
               //   console.log(newd);
               //});
               for(var i=0;i<$scope.standardItems.length;i++){
                  if(i!=b){
                      $scope.standardItems[i].isActive=false;
                  }else {
                      $scope.standardItems[b].isActive=true;
                  }
               }
           };
           //复制节点
           $scope.copyNode=function(e){
               //var objs= {};
               //for(var key in e) {
               //    eval("objs." + key + "=e." + key);
               //}
               objs=Object.create(e);
               objs.$$hashKey = null;
               objs.col = null;
               objs.row = null;
               objs.setItems=[{value:'选项1'}];
               objs.selectedstate='';
               $scope.appendEle(objs);
               //$scope.standardItems.push(objs);

           };
           //$scope.deleteNode=function(){
           //    console.log(456)
           //};
           $scope.deleteIcon=function(b){
              $scope.standardItems.splice(b,1);
              $scope.dataMata='';
           };
           $scope.newRowNum={rows: 0};
           $scope.appendEle=function(e){

               //var objs= {};
               //for(var key in e) {
               //    eval("objs." + key + "=e." + key);
               //}
               objs=Object.create(e);
               objs.setItems=[{value:'选项1'}];
               objs.selectedstate='';
               //var arraytemp=[];
             if($scope.standardItems.length<=0){
                 $scope.standardItems.push(objs);
                 //arraytemp.push(objs.row+objs.sizeY);
             }else {
                 //objs.row=Math.max.apply(null,arraytemp);
                 //objs.col=0;
                 $scope.standardItems.push(objs);
                 //arraytemp.push(objs.row+objs.sizeY);
             }
                setTimeout(function (){
                    $("li[name='standardItems']").last().click();
                    var expandRows = $scope.newRowNum.rows-$scope.xrow.length;
                    var rowadd=new Array($scope.paixu.length);
                    var inx=($scope.xrow.length-1)+expandRows;
                    for(var i=0;i<expandRows;i++){
                        $scope.xrow.splice(inx,0,{"cols":rowadd});
                    }
                },100);


           };
           $scope.elementstag=[
               {   title:'文本输入框',
                   icon:'icon-dingdan',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'textarea',
                   typeclass:'type-textarea',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'文本输入框',
                   required:false,
                   Dplaceh:'',
                   isLabelPortrait:"true"
               },
               {   title:'日期',
                   icon:'icon-rili',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'date',
                   typeclass:'type-date',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'日期',
                   required:false,
                   tempdateValue:'',
                   isLabelPortrait:"true"
               },
               {   title:'时间',
                   icon:'icon-iconfonttime',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'time',
                   typeclass:'type-time',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'时间',
                   required:false,
                   temptimeValue:'',
                   isLabelPortrait:"true"

               },
               {   title:'日期时间',
                   icon:'icon-riqishijian',
                   minSizeX: 2, minSizeY: 1,
                   row:null, col:null,
                   type:'datetime',
                   typeclass:'type-datetime',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'日期时间',
                   required:false,
                   tempValue:'201',
                   temptimeValue:'',
                   tempdateValue:'',
                   isLabelPortrait:"true"
               },
               {   title:'人员选择',
                   icon:'icon-renyuan',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'contactSelect',
                   typeclass:'type-contactSelect',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'人员选择',
                   required:false,
                   tempValue:'201',
                   isLabelPortrait:"true"

               },
               {   title:'数字',
                   icon:'icon-shuzi',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'number',
                   typeclass:'type-number',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'数字',
                   required:false,
                   tempValue:'201',
                   units:'',
                   Dplaceh:'',
                   isLabelPortrait:"true"
               },
               {   title:'大写金额',
                   icon:'icon-renminbi',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'amount',
                   typeclass:'type-amount',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   itemvalue:'',
                   type_placeholder:'大写金额',
                   required:false,
                   Dplaceh:'',
                   isLabelPortrait:"true"
               },
               {   title:'单选框',
                   icon:'icon-danxuan',
                   sizeX: 1, minSizeY: 1,
                   row:null, col:null,
                   type:'radio',
                   typeclass:'type-radio',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'单选框',
                   required:false,
                   itemlayout:'0',
                   isLabelPortrait:"true",
                   items:[{value:'选项1'}]
                   //isitemPortrait:'true'

               },
               {   title:'复选框',
                   icon:'icon-fuxuan',
                   sizeX: 1, minSizeY: 1,
                   row: null, col: null,
                   type:'checkbox',
                   typeclass:'type-checkbox',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'复选框',
                   required:true,
                   itemlayout:'0',
                   isLabelPortrait:"true",
                   items:[{value:'选项1'}],
                   isitemPortrait:'true'
               },
               {   title:'下拉框',
                   icon:'icon-xiala',
                   sizeX: 1, sizeY: 1,
                   row: null, col: null,
                   type:'select',
                   typeclass:'type-select',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'下拉框',
                   required:true,
                   isLabelPortrait:"true",
                   items:[
                       {"value":"选项1"}
                   ]

               },
               {
                   title:'网址',
                   icon:'icon-diqiu-copy',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'url',
                   typeclass:'type-url',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'网址',
                   required:false,
                   isLabelPortrait:"true",
                   Dplaceh:''
               },
               {
                   title:'附件',
                   icon:'icon-attachment',
                   minSizeY:1,minSizeX:2,
                   row:null, col:null,
                   type:'attachment',
                   typeclass:'type-attachment',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   required:true,
                   type_placeholder:'附件'
               },
               {
                   title:'图片',
                   icon:'icon-tupian',
                   minSizeY:1,minSizeX:2,
                   row:null, col:null,
                   type:'img',
                   typeclass:'type-img',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   required:true,
                   type_placeholder:'图片'
               },
               {
                   title:'部门选择',
                   icon:'icon-48copy9',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'departmentSelect',
                   typeclass:'type-departmentSelect',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'部门选择',
                   required:false,
                   tempValue:'201',
                   isLabelPortrait:"true"
               },
               {
                   title:'只读文本',
                   icon:'icon-yan',
                   minSizeY:1,minSizeX:2,
                   row:null, col:null,
                   type:'textView',
                   typeclass:'type-textView',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'只读文本',
                   required:false,
                   tempValue:''
               },
               {
                   title:'人员部门',
                   icon:'icon-renyuanbm',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'org',
                   typeclass:'type-org',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'人员部门',
                   required:false,
                   tempValue:'201',
                   isLabelPortrait:"true"

               },
               {
                   title:'时长',
                   icon:'icon-jishiqi',
                   //sizeX:3, sizeY: 3,
                   minSizeY:3,minSizeX:3,
                   row:null, col:null,
                   type:'period',
                   typeclass:'type-period',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'时长',
                   required:true,
                   accuracy:'day',
                   starttime:new Date(),
                   endtime:null,
                   starttimes:'开始时间',
                   endtimes:'结束时间',
                   timeDifference:0
               },
               {
                   title:'公式',
                   icon:'icon-kmd',
                   sizeX: 1, sizeY: 1,
                   row:null, col:null,
                   type:'expression',
                   typeclass:'type-expression',
                   isActive:false,
                   readonly:false,
                   type_text:'',
                   type_placeholder:'公式',
                   required:true,
                   danwei:'',
                   tempValue:'201',
                   expression:'',
                   isLabelPortrait:"true"
               }
           ];

           $scope.data={
                   approvalType:'reimburse'
           };
           $scope.gridsterConfiguration = {
               isMobile: false,
               columns:$scope.paixu.length,
               defaultSizeX: 1,
               defaultSizeY: 1,
               resizable: {
                   enabled: true
               },
               draggable: {
                   enabled: true,
                   handle: '.my-class'
               },
               margins: [1,3]
           };
           $scope.departMent ={
               states:["电商部","财务部","人事部","外贸部","内贸部","技术部"]
           };
           $scope.personName={
               states:["王鹏翔","李邓珂","于高峰","田丰","季忠宇","洪浩远"]
           };
           $scope.personDepart={
               states:["电商王鹏翔","电商李邓珂","电商于高峰","电商田丰","电商季忠宇","电商洪浩远"]
           };
           $scope.click=function(e){
               $(e.target).toggleClass('checked');
           };
           $scope.standardItems = [];
           $scope.isLoading=false;
           $scope.$watch('standardItems.length',function(newVale,oldValue,scope){
               console.log($scope.isInEdit);
               if(newVale!=oldValue){
                   $scope.isInEdit=true;
                   console.log($scope.isInEdit);
               }
           })

       });
    })
    .directive('myDirective',function(){
        return {
            restrict : "AE",
            scope:{
                clickdata:'=',
                titledata:'=',
                typedata:'=',
                newrownum:'=',
                xrow:'=',
                paixu:'='
            },
            //compile和link一起，link不执行
            link:function(scope,element,attrs){
               scope.setclick=function(e){
                   $(e.target).toggleClass('checked');
                   if($(e.target).hasClass("checked")){
                      scope.clickdata.required=true
                   }else {
                       scope.clickdata.required=false
                   }
               };
                scope.addItem=function(a){
                    //console.log(scope.clickdata);
                    var inxs=(scope.xrow.length-1);
                    var rowadd=new Array(scope.paixu.length);
                    scope.clickdata.setItems.splice(a+1,0,{value:'选项',label:'选项'});
                    var heights=$('#element-'+scope.clickdata.row+'-'+scope.clickdata.col).height();

                    if(scope.clickdata.minSizeY*50<heights+20){
                        scope.clickdata.minSizeY++;
                    }
                    if(scope.newrownum.rows>=inxs-1){
                        scope.xrow.splice(1,0,{"cols":rowadd});
                    }
                    //console.log(scope.xrow.length);
                   //scope.$apply();
                };
                scope.arrayForceUpdate=function(a){
                    if(a.value==""){
                        a.value='选项'
                    }
                };
                scope.deleteItem=function(a){
                    var heights=$('#element-'+scope.clickdata.row+'-'+scope.clickdata.col).height();
                    if(scope.clickdata.minSizeY*50>heights+20){
                        scope.clickdata.minSizeY--;
                    }
                    scope.clickdata.setItems.splice(a,1);
                };
                scope.itemsChange=function(){
                    //scope.clickdata.itemlayout 值：1 和 0
                    //if(scope.clickdata.itemlayout==0){
                    //    console.log(heights+'======'+'0');
                    //}else {
                    //    console.log(heights+'======'+'1');
                    //
                    //}
                    setTimeout(function(){
                        var heights=$('#element-'+scope.clickdata.row+'-'+scope.clickdata.col).height();
                        var expand=heights-50*scope.clickdata.minSizeY;
                        scope.clickdata.minSizeY=scope.clickdata.minSizeY+Math.ceil(expand/50);
                        scope.$apply();
                    },50);


                    //console.log(heights);
                    //console.log(scope.clickdata.itemlayout);
                }
            },
            templateUrl:'template/form.Directive.html'
        }
    })
    .directive('myDirectivelist',function(){
        return{
            restrict:'AE',
            //require:'^myDirective',
            scope:true,
            link:function(scope,element,attrs){
                //console.log(scope);
            },
            templateUrl:'template/form.ListDirective.html'
        }
    })
    .controller('modalctrl',function($scope){
            //console.log(123);
        $scope.otherread=false;
        $scope.sercoundItems=$scope.standardItems;
        $scope.gridsterOpts = {
            isMobile: false,
            columns:$scope.paixu.length,
            defaultSizeX: 1,
            defaultSizeY: 1,
            resizable: {
                enabled: false
            },
            draggable: {
                enabled: false,
                handle: '.my-class'
            },
            margin: [0,0]
        };

        //$scope.sercoundItems = [
        //    { sizeX: 2, sizeY: 1, row: 0, col: 0 },
        //    { sizeX: 2, sizeY: 2, row: 0, col: 2 }
        //];
        //    setTimeout(function(){
        //
        //    },1000);

    });

