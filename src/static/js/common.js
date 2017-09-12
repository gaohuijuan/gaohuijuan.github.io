// 动态计算rem
~function (desW) {
    var winW = document.documentElement.clientWidth;
    //if (winW > desW * 2) {
    //    var oMain = document.querySelector(".main");
    //    oMain.style.margin = "0 auto";
    //    oMain.style.width = desW * 2 + "px";
    //    return;
    //}
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(375);

//格式化字符串
String.prototype.formatDate=function(template){
    //传了按照传的来；没传，按照默认的模版来；
    template=template||'{0}年{1}月{2}日 {3}时{4}分{5}秒';
    //拿到数组；
    var ary=this.match(/\d+/g);
    template=template.replace(/{(\d)}/g,function($0,$1){
        return ary[$1]
    })
    return template;
};

function toLogin() {
	var localurl = window.location.href;
	if(localurl.indexOf("?v=") >= 0) {
		var versionReg = /\?v=\d+/;
		localurl = localurl.replace(versionReg, "");
	}
	window.location.href = baseUrl + "mine/login.html?returnurl=" + localurl + "&v=" + wx_version;
}

function toRegister() {
	var localurl = window.location.href;
	if(localurl.indexOf("?v=") >= 0) {
		var versionReg = /\?v=\d+/;
		localurl = localurl.replace(versionReg, "");
	}
	window.location.href = baseUrl + "mine/register.html?returnurl=" + localurl + "&v=" + wx_version;

}
template.helper("imgPrefix", function(a){
    return staticPicUrl
});
