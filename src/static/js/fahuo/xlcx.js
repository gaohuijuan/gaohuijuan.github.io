mui.init({
     swipe: false
});
 // 控制滚动条，如果删除就不能滑动了
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
$(function() {
	var wx_version=localStorage.getItem("oldVersion");
	var user = JSON.parse(localStorage.getItem("user"));
/*	if(user) {
		if(user.code) {*/
			// 获取省份信息
			var offset = 0;
			//开始搜索
			$("#adsserch").on('tap', function() {
				var p = $("#province option:checked").val();
				var receiverareaid = $("#area option:checked").val();
				var receivercityid = $("#city option:checked").val();
				console.log(receiverareaid);
				console.log(receivercityid);
				if(1) {
					function ajax(parms) {
						var a = [],
							result = [];
						var option;
						option = {
							"areaid": receiverareaid,
							"cityid": receivercityid,
							"pageSize": 10,
							"offset": offset
						};
						$.ajax({
							url: "https://api.github.com/_private/browser/stats",
							dataType: 'json',
							type: 'POST',
							timeout: 3000,
							success: function(data) {
								data={"status":1,"errorCode":null,"message":null,"data":{"total":3,"list":[{"total":0,"list":[],"pageSize":10,"offset":null,"pagerSize":0,"pagerUrl":null,"id":null,"recordsTotal":0,"recordsFiltered":0,"draw":0,"condition":null,"startDate":null,"endDate":null,"wayid":21,"wayname":"BJ001","provinceid":null,"provincename":"北京市","cityid":null,"cityname":"市辖区","areaid":null,"areaname":"东城区","streetid":null,"streetname":"景山街道办事处","address":"撒打","contactname":null,"contacttel":null,"frequency":"每天","begintime":"9点30分","endtime":"次日14点12","istransfer":"1","providerid":null,"providername":"wht物流商","transfername":" 测","price":50.00,"discount":1.00,"extrachargerule":"\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t10KG以上  每超1kg加收10元\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t","careful":"\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t1. 注意事项  2.注意事项\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t","times":null,"createuser":null,"createtime":null,"updateuser":null,"updatetime":null,"status":null,"inputtransfername":null,"type":null,"addressdetail":"北京市 市辖区 东城区 景山街道办事处 撒打"},{"total":0,"list":[],"pageSize":10,"offset":null,"pagerSize":0,"pagerUrl":null,"id":null,"recordsTotal":0,"recordsFiltered":0,"draw":0,"condition":null,"startDate":null,"endDate":null,"wayid":3,"wayname":"BJ010","provinceid":null,"provincename":"北京市","cityid":null,"cityname":"市辖区","areaid":null,"areaname":"门头沟区","streetid":null,"streetname":"大台街道办事处","address":"1","contactname":null,"contacttel":null,"frequency":null,"begintime":null,"endtime":null,"istransfer":null,"providerid":null,"providername":"德邦物流","transfername":null,"price":1.00,"discount":1.00,"extrachargerule":null,"careful":null,"times":null,"createuser":null,"createtime":null,"updateuser":null,"updatetime":null,"status":null,"inputtransfername":null,"type":null,"addressdetail":"北京市 市辖区 门头沟区 大台街道办事处 1"},{"total":0,"list":[],"pageSize":10,"offset":null,"pagerSize":0,"pagerUrl":null,"id":null,"recordsTotal":0,"recordsFiltered":0,"draw":0,"condition":null,"startDate":null,"endDate":null,"wayid":1,"wayname":"立达物流","provinceid":null,"provincename":"北京市","cityid":null,"cityname":"市辖区","areaid":null,"areaname":"朝阳区","streetid":null,"streetname":"永定门外街道办事处","address":"金洲大厦物流站","contactname":null,"contacttel":null,"frequency":null,"begintime":null,"endtime":null,"istransfer":null,"providerid":null,"providername":"德邦物流","transfername":null,"price":null,"discount":null,"extrachargerule":null,"careful":null,"times":null,"createuser":null,"createtime":null,"updateuser":null,"updatetime":null,"status":null,"inputtransfername":null,"type":null,"addressdetail":"北京市 市辖区 朝阳区 永定门外街道办事处 金洲大厦物流站"}],"pageSize":10,"offset":10,"pagerSize":1,"pagerUrl":null,"id":null,"recordsTotal":0,"recordsFiltered":0,"draw":0,"condition":null},"erroCode":null};
								if(data.status == 1) {
									alert("成功了")
									var province = $("#province option:checked").text();
									$("#cir").html("白沟-" + province);
									result = data.data.list;
									offset = data.data.offset;
									jroll.options.total = data.data.pagerSize;
								}
							},
							error: function(data) {
								console.log(JSON.stringify(data));
							},
				            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
						　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
						　　　　　mui.toast(ajax_toastMSG);
						　　　　}
						　　}
						});

						setTimeout(function() {
							for(var i = 0; i < result.length; i++) {
								var temp = {};
								temp['id'] = i;
								var tempArray = [];
								tempArray.push(result[i]); //0 1
								if(i + 1 < result.length) { //3 1 2
									tempArray.push(result[++i]);
								}
								temp['list'] = tempArray;
								a.push(temp);
							}
							parms.success({
								"item": a
							});
						}, 800);
					}

					var jroll = new JRoll("#wrapper", {
						scrollBarY: false
					});

					jroll.pulldown({
						refresh: function(complete) {
							offset = 0;
							jroll.options.page = 1;
							jroll.scrollTo(0, 44, 0, true); //滚回顶部
							ajax({
								success: function(data) {
									complete();
									jroll.scroller.innerHTML = ""; //清空内容
									jroll.infinite_callback(data.item);
								}
							});
						}
					});
					//无限加载
					jroll.infinite({
						getData: function(page, callback) {
							//获取数据的函数，必须传递一个数组给callback
							ajax({
								success: function(data) {
									if(data.item.length > 0) {
										callback(data.item);
									} else {
										console.log('没有数据了');
										$(".jroll-infinite-tip").html("暂无记录")
									}
								}
							});
						},
						compile: function(text) {
							return template.compile(text);
						},
						template: document.getElementById("xianLuList").innerHTML
					});
				}

			})

		/*} else {
			mui.alert('您还没有完善资料，请先完善资料', '提示', function() {
				toRegister();
			});	
		}

	} else {
		toLogin();
	}*/
});

function change(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数

}
//切换城市
function changeProvince() {
	var selectVal = $("#province").val();
	if(!selectVal) {
		return;
	}
	var _url = basepath + "wuliu/outer/addrs/getCity?code=" + selectVal;
	$("#city").empty().show().append("<option value=''>--选择城市--</option>");
	$("#area").empty().show().append("<option value=''>--选择区县--</option>");
	$.ajax({
		type: 'POST',
		url: _url,
		data: {},
		dataType: "json",
		success: function(data) {
			$.each(data.data, function(index, value) {
				$("#city").append("<option value='" + value.cityid + "'>" + value.cityname + "</option>");
			});
		}
	});
}
//切换区县
function changeCity() {
	var selectProvinceVal = $("#province").val();
	var selectCityVal = $("#city").val();
	if(!selectProvinceVal || !selectCityVal) {
		return;
	}
	var _url = basepath + "wuliu/outer/addrs/getArea?code=" + selectCityVal;
	$("#area").empty().show().append("<option value=''>--选择区县--</option>");
	$.ajax({
		type: 'POST',
		url: _url,
		data: {},
		dataType: "json",
		success: function(data) {
			$.each(data.data, function(index, value) {
				$("#area").append("<option value='" + value.areaid + "'>" + value.areaname + "</option>");
			});
		},
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
	　　　　　mui.toast(ajax_toastMSG);
	　　　　}
	　　}
	});
}