!function(){if(!/anti_ie_do_not_remind=1/.test(document.cookie)){var e,i,t,a=['<div class="anti-ie-mask">','<div class="anti-ie-dialog" id="anti-ie-dialog">','<div class="anti-ie-text">','<h1 class="anti-ie-title">您正在使用低版本的IE浏览器！</h1>','<p class="anti-ie-para">',"这可能会带来非常严重的安全隐患，并且不利于我们为您提供良好的用户体验。","</p>",'<p class="anti-ie-para">',"使用IE6/7浏览本网站可能会遭遇文字错位，布局混乱，功能失灵等意外情况。","</p>",'<p class="anti-ie-para">',"为了您的良好浏览体验，请安装以下浏览器：","</p>",'<div class="anti-ie-para">','<a class="anti-ie-browser-link" href="http://www.google.cn/chrome" target="_blank" hidefocus>','<i class="anti-ie-browser-icon anti-ie-browser-icon-chrome"></i>',"Chrome浏览器","</a>",'<a class="anti-ie-browser-link" href="http://www.firefox.com.cn/" target="_blank" hidefocus>','<i class="anti-ie-browser-icon anti-ie-browser-icon-firefox"></i>',"Firefox浏览器","</a>",'<a class="anti-ie-browser-link" href="http://www.opera.com/zh-cn" target="_blank" hidefocus>','<i class="anti-ie-browser-icon anti-ie-browser-icon-opera"></i>',"Opera浏览器","</a>",'<a class="anti-ie-browser-link" href="http://windows.microsoft.com/ie" target="_blank" hidefocus>','<i class="anti-ie-browser-icon anti-ie-browser-icon-ie"></i>',"升级IE到最新版本","</a>","</div>",'<p class="anti-ie-para">',"如果您正在使用",'<a href="http://ie.sogou.com/"   target="_blank">搜狗浏览器</a>，','<a href="http://browser.qq.com/" target="_blank">QQ浏览器</a>，','<a href="http://www.liebao.cn/"  target="_blank">猎豹浏览器</a>，','<a href="http://chrome.360.cn/"  target="_blank">360极速浏览器</a>',"等国产浏览器，您也可尝试将其切换到高速/极速模式。","</p>","</div>",'<div class="anti-ie-btn-ctnr">','<input type="checkbox" id="anti-ie-remind"><label for="anti-ie-remind">30天内不再提醒我</label>&nbsp;&nbsp;','<a class="anti-ie-btn anti-ie-btn-cancel" id="anti-ie-keep-ie" href="javascript:void(0);">继续用低版本IE浏览（不推荐）</a>&nbsp;&nbsp;','<a class="anti-ie-btn" id="anti-ie-try-new" href="http://www.google.cn/chrome" target="_blank">下载Chrome试试</a>',"</div>","</div>","</div>"].join(""),n=document.createElement("link"),o=window.anti_ie_config||{},r="",s={cssPath:"./",imgPath:"./images/",html:a};for(e in o)void 0!==o[e]&&(s[e]=o[e]);for(i=0;i<document.scripts.length;i++)if(t=document.scripts[i].src.match(/(.*)anti-ie\.js/)){r=t[1];break}s.cssPath=r+s.cssPath,s.imgPath=r+s.imgPath,n.attachEvent("onload",function(){var e,i,t,a,n,o,r=document.createElement("div");for(r.innerHTML=s.html,document.body.appendChild(r),e=document.getElementById("anti-ie-dialog"),e.style.top=(document.documentElement.clientHeight-e.clientHeight)/2,i=e.getElementsByTagName("i"),n=0;n<i.length;n++)(o=i[n].className.match(/anti-ie-browser-icon-(\w+)/))&&(i[n].style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+s.imgPath+o[1]+'.png")');t=document.getElementById("anti-ie-remind"),a=document.getElementById("anti-ie-keep-ie"),a.attachEvent("onclick",function(){var e=!!t.getAttribute("checked");if(e){var i=new Date;i.setDate(i.getDate()+30),document.cookie="anti_ie_do_not_remind=1;expires="+i.toGMTString()}r.style.display="none"}),document.cookie="anti_ie_do_not_remind=1"}),n.setAttribute("rel","stylesheet"),n.setAttribute("type","text/css"),n.setAttribute("href",s.cssPath+"anti-ie.css"),document.body.appendChild(n)}}();