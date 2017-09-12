//外网ip
var basepath = "http://api.wanhugou.cn/";
var picUrl = "http://media.hedaoyuncang.com/";
//var baseUrl = "http://wxgongying.wanhutong.com/";
//var staticPicUrl = "http://static.wanhutong.com/gongying";
//测试
var baseUrl = "http://wxgongying.wanhutong.com/src/";
var staticPicUrl = "";
var ajax_toastMSG="网络错误，请稍后重试";
var wx_version;
//获取当前时间戳
function getTimestamp() {
	return(Date.parse(new Date()) / 1000).toString();
}
(function(w) {
	// 获取版本信息
	w.ajax_get_version = function(){
		$.ajax({
            url:basepath + "gongying/menu/version",
            dataType: 'json',
            type: 'GET',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                getVersionSuccess(data);
            },
            error: function(data) {
            	//XMLHttpRequest, textStatus, errorThrown
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//手机验证码-
	w.ajax_registSMS = function(options) {
        $.ajax({
            url:basepath + "user/front/supplier/loginSMS?mobile="+options.mobile,
            dataType: 'json',
            type: 'GET',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                registSMSsuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//用户注册-
	w.ajax_register = function(options) {
		if(options.in==0){
			var url=basepath + "shop/wht/factory/insert?name="+options.name+"&linkman="+options.linkman+"&linkTel="+options.linkTel+"&linkMobile="+options.linkMobile+"&provice="+options.provice+"&city="+options.city+"&area="+options.area+"&address="+options.address+"&proviceName="+options.proviceName+"&cityName="+options.cityName+"&areaName="+options.areaName+"&storeProvice="+options.storeProvice+"&storeCity="+options.storeCity+"&storeArea="+options.storeArea+"&storeProviceName="+options.storeProviceName+"&storeCityName="+options.storeCityName+"&storeAreaName="+options.storeAreaName+"&storeAddress="+options.storeAddress;
		}else if(options.in==1){
			var url=basepath + "shop/wht/factory/insert?name="+options.name+"&linkman="+options.linkman+"&linkTel="+options.linkTel+"&linkMobile="+options.linkMobile+"&provice="+options.provice+"&city="+options.city+"&area="+options.area+"&address="+options.address+"&proviceName="+options.proviceName+"&cityName="+options.cityName+"&areaName="+options.areaName+"&mansion="+options.mansion+"&section="+options.section+"&street="+options.street+"&no="+options.no;
		}
		$.ajax({
            url: url,
            type: 'POST',
			timeout: 3000,
			beforeSend: function(request) {
                request.setRequestHeader("key-token", options.token);
            },
			success: function(data) {
				registerSuccess(data);
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
	}
	//用户登陆-
	w.ajax_login = function(options) {
		$.ajax({
            url: basepath + "user/front/supplier/codeLogin?mobile="+options.mobile+"&smsCode="+options.smsCode,
			type: 'POST',
            data:JSON.stringify(options),
			timeout: 3000,
			success: function(data) {
				loginSuccess(data);
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
	}
	// 获取用户信息
	w.ajax_user_info = function(options) {
		$.ajax({
            url: basepath + "user/front/supplier/selectByID?id="+options.id,
			type: 'GET',
			timeout: 3000,
			beforeSend: function(request) {
                request.setRequestHeader("key-token", options.token);
            },
			success: function(data) {
				console.log(options.token)
				userInfoSuccess(data);
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
	}
	// 获取企业信息-
    w.ajax_company_info = function(options) {
        $.ajax({
            url: basepath + 'gongying/factory/query?code='+options,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                companyInfoSuccess(data);
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
    }
	//根据线路id查运单详情-
    w.ajax_way_detail = function(options) {
        $.ajax({
            url: basepath + "gongying/movewaybill/wayDetail",
            data:JSON.stringify(options),
            dataType: 'json',
            type: 'post',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                wayDetailSuccess(data);
            },
            error: function(data) {
                console.log( JSON.stringify(data));
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
    }
	//创建运单-
    w.ajax_create=function(options) {
        $.ajax({
            url: basepath + "wuliu/outer/waybill/create",
            data:JSON.stringify(options),
            dataType: 'json',
            type: 'post',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                createsuccess(data)
            },
            error: function(data) {
                console.log( JSON.stringify(data));
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
    }
	//设置支付密码-
	w.ajax_setpaypassword = function(options) {
		$.ajax({
			url:basepath + "payment/wht/purse/installPayPassword",
			dataType: 'json',
			type: 'POST',
            data:JSON.stringify(options),
			contentType: "application/json",
			timeout: 3000,
			success: function(data) {
                setPayPassWordSuccess(data);
			},
			error: function(data) {
				console.log(JSON.stringify(data))
				//异常处理；
			},
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
		});
	}
	// 用户提现-
	w.ajax_depositmoney = function(options) {
        $.ajax({
            url:basepath + "payment/accountflow/enchashment",
            dataType: 'json',
            type: 'POST',
            data:JSON.stringify(options),
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                depositmoneysuccess(data);
            },
            error: function(data) {
                console.log(data)
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });

	}
	//提现初始化-
	w.ajax_depositinfo = function(options) {
		$.ajax({
            url:basepath + "payment/accountflow/initEnchashment/"+options,
            dataType: 'json',
            type: 'GET',
            timeout: 3000,
            contentType: "application/json",
			success: function(data) {
				depositsuccess(data);
			},
			error: function(data) {
				console.log(JSON.stringify(data))
			},
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
		});
	}
	//查询用户名下银行卡-
	w.ajax_userpaycord = function(options) {
        $.ajax({
            url:basepath + "payment/bank/selectList/"+options,
            dataType: 'json',
            type: 'GET',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                userPayCordSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });

	}
	//更新选中银行卡-
	w.ajax_updatecord = function(options) {
        $.ajax({
            url:basepath + "payment/bank/updateBankCardSort/"+options.accountno+"/"+options.newbcid,
            dataType: 'json',
            type: 'GET',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                updateCordSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });

	}
	//根据卡号判定银行-
	w.ajax_referblance = function(options) {
        $.ajax({
            url:basepath + "payment/bank/selectBank/"+options,
            dataType: 'json',
            type: 'GET',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                referBlanceSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });

	}
	//新增银行卡-
	w.ajax_addcord = function(options) {
        $.ajax({
            url:basepath + "payment/bank/insert",
            dataType: 'json',
            type: 'POST',
            data:JSON.stringify(options),
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                addCordSuccess(data);
            },
            error: function(data) {
                console.log(data)
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//用户删除银行卡-
	w.ajax_deletecord = function(options) {
        $.ajax({
            url:basepath + "payment/bank/deletes",
            dataType: 'json',
            type: 'POST',
            data:JSON.stringify(options),
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                deleteSuccess(data);
            },
            error: function(data) {
                console.log(data)
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//修改支付密码-
	w.ajax_change_paypwd = function(options) {
        $.ajax({
            url:basepath + "payment/wht/purse/updatePayPassword/"+options.accountno+'/'+options.oldpaypassword+"/"+options.newpaypassword,
            dataType: 'json',
            type: 'GET',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                changePayPwdSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });

	}
	//找回支付密码的手机验证码-
	w.ajax_sendSMS = function(options) {
        $.ajax({
            url:basepath + "user/front/supplier/sendSMS?mobile="+options.mobile,
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("key-token", options.token);
            },
            type: 'POST',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                sendSMSsuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//是否实名认证
	w.ajax_isAuthentication=function(options){
		$.ajax({
            url:basepath + "user/front/supplier/isAuthentication?id="+options.id,
            dataType: 'json',
            type: 'GET',
            contentType: "application/json",
            timeout: 3000,
            beforeSend: function(request) {
                request.setRequestHeader("key-token", options.token);
            },
            success: function(data) {
                isAuthenticationSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//实名认证
	w.ajax_authentication=function(options,tokendata){
		$.ajax({ 
            url:basepath + "user/front/supplier/authentication",
            dataType: 'json',
            type: 'POST',
            data:JSON.stringify(options),
            contentType: "application/json",
            timeout: 3000,
            beforeSend: function(request) {
                request.setRequestHeader("key-token", tokendata.token);
            },
            success: function(data) {
                authenticationSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//忘记支付密码第一步-
	w.ajax_firstpassword = function(options,tokendata) {
		console.log(JSON.stringify(options))
        $.ajax({
            url: basepath + "user/front/supplier/verify",
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("key-token", tokendata.token);
            },
            type: 'POST',
            data:JSON.stringify(options),
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                firstPassWordSuccess(data);
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
	}
	//忘记支付密码第2步-
	w.ajax_secpassword = function(options,tokendata) {
        $.ajax({
            url:basepath + "user/front/supplier/payPassword?accountno="+options.walletno+'&password='+options.newpaypassword,
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("key-token", tokendata.token);
            },
            type: 'POST',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                secondPassWordSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data))
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });

	}
	//我的钱包账户查询-
	w.ajax_wallet=function(options){
        $.ajax({
			url:basepath + "payment/wht/purse/selectOne/"+options.walletno,
            dataType: 'json',
            type: 'GET',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                walletsuccess(data);
            },
            error: function(data) {
                mui.toast(data.message)
                console.log(JSON.stringify(data));
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
    //我的钱包账户查询-下面两个金额-
    w.ajax_wallet_sec=function(options){
        $.ajax({
            url:basepath + "gongying/income/selectOne?code="+options.code,
            dataType: 'json',
            type: 'GET',
            timeout: 3000,
            contentType: "application/json",
            success: function(data) {
                walletSecondSuccess(data);
            },
            error: function(data) {
                console.log(JSON.stringify(data));
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
    }
	//反馈意见-
	w.ajax_context = function(options) {
        $.ajax({
            url:basepath + "gongying/suggest/create",
            dataType: 'json',
            type: 'POST',
            data:JSON.stringify(options),
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
                contextsuccess(data);
            },
            error: function(data) {
                console.log(data)
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	//获取省份信息
	w.ajax_getprovince = function(options) {
        $.ajax({
            url:basepath + "wuliu/outer/addrs/getProvince",
            dataType: 'json',
            type: 'POST',
            contentType: "application/json",
            timeout: 3000,
            success: function(data) {
            	getProvinceSuccess(data);
            },
            error: function(data) {
                console.log(data)
                //异常处理；
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
        });
	}
	// 切换城市
	w.ajax_changeprovince=function(options,ele){
		$.ajax({
			url:basepath + "wuliu/outer/addrs/getCity?code=" + options,
			dataType: "json",
	        type: 'POST',
	        contentType: "application/json",
	        timeout: 3000,
	        success: function(data) {
	        	changeProvinceSuccess(data,ele); 
	        },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
	    });
	}
	// 切换区县
	w.ajax_changeCity=function(options,ele){
		$.ajax({
			url:basepath + "wuliu/outer/addrs/getArea?code=" + options,
			dataType: "json",
	        type: 'POST',
	        contentType: "application/json",
	        timeout: 3000,
	        success: function(data) {
	        	changeCitySuccess(data,ele); 
	        },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　mui.toast(ajax_toastMSG);
		　　　　}
		　　}
	    });
	}
	
})(window);

//页面传参 取值
function getvalue(name) {
	var str = window.location.search; //location.search是从当前URL的?号开始的字符串
	if(str.indexOf(name) != -1) {
		var pos_start = str.indexOf(name) + name.length + 1;
		var pos_end = str.indexOf("&", pos_start);
		if(pos_end == -1) {
			return str.substring(pos_start);
		} else if(pos_end > 0) {
			return str.substring(pos_start, pos_end);
		} else {
			return "";
		}
	}
}
// 获取版本信息
ajax_get_version();
function getVersionSuccess(data){
	wx_version=data;
	var oldVersion=localStorage.getItem("oldVersion");
	var localurl = window.location.href;
	if(oldVersion){
		if(oldVersion!=wx_version){
			mui.toast("版本有更新,请重新登录");
			localStorage.clear();
			localStorage.setItem("oldVersion",data);
			if(localurl.indexOf("?v=")>=0){
	        	var versionReg=/\?v=\d+/;
	        	localurl=localurl.replace(versionReg,"");
	        }
	        window.location.href=baseUrl+"mine/login.html?returnurl="+localurl+"&v="+wx_version;
		}
	}else{
		mui.toast("版本有更新,请重新登录");
		localStorage.setItem("oldVersion",data);
		if(localurl.indexOf("?v=")>=0){
        	var versionReg=/\?v=\d+/;
        	localurl=localurl.replace(versionReg,"");
        }
        window.location.href=baseUrl+"mine/login.html?returnurl="+localurl+"&v="+wx_version;
	}
}
