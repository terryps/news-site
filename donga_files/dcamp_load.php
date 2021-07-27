
var domainString = (window.location != window.parent.location)?document.referrer.split("/")[2]:document.location.href.split("/")[2];

var refererurl_NDYx = document.referrer.split("/")[2];
var cururl_NDYx = document.location.href.split("/")[2];
var isiframe_NDYx = window.location!=window.parent.location;
var tp_NDYx = "script";
var dcamp_doc_NDYx=(isiframe_NDYx==true && refererurl_NDYx==cururl_NDYx && tp_NDYx != "script") ? parent.document || top.document : document;
var dcamp_win_NDYx=(isiframe_NDYx==true && refererurl_NDYx==cururl_NDYx) ? window.parent || window.top : window;

function addListener_NDYx(target, type, handler) {
	if (target.addEventListener) {
		target.addEventListener(type, handler, false);
	} else if (target.attachEvent) {
		target.attachEvent("on" + type, handler);
	} else {
		target["on" + type] = handler;
	}
}

function elementInViewport_NDYx(el) {
    var rect = el.getBoundingClientRect();
    if (typeof rect.width === 'undefined') {
        return true;
    }
    else {
        return (rect.top>=0 && rect.left>=0 && rect.top <= (dcamp_win_NDYx.innerHeight + 10 || dcamp_doc_NDYx.documentElement.clientHeight + 10));
    }
}

function loadAdContent_NDYx(mo, mc, tp, wi, he, ps, purl) {
    var load = false;
	var rect = new Array();
	var edata = new Array();
	var viewClientHeight = 0;
	var isdiv = false;
    var windowScroll_NDYx = function(){
        clearTimeout(reloadTimer_NDYx);

        if(!load){
			var isIE=(/(?:MSIE |Trident\/.*; rv:)(\d+)/.exec(navigator.userAgent))?Number(RegExp.$1):0;
            if(tp=='iframe') {
                if(elementInViewport_NDYx(mo)) {
					var source = mo.getAttribute('data-src');
					var temp_source = source.split('&');
					var source_result="";
					for ( var i in temp_source ) {
						source_result = source_result + ((i==0)?'':'&') + temp_source[i];
						if(i==0) source_result = source_result + '&tp=' + tp + '&ie=' + isIE;
					}
					mo.src = source_result;
					load=true;
                }
            } else if(tp=='script') {
				var c_wi = (wi.indexOf('%') != -1) ? wi : wi+'px';
				var c_he = (he.indexOf('%') != -1) ? he : he+'px';
				var height_txt = (wi.indexOf('%') == -1 && he != "") ? 'height:'+c_he+';' : '';
				if(!isdiv){
					if (typeof cont_NDYx === 'undefined' || typeof cont_num_NDYx === 'undefined') {
						//단락 및 단락번호가 없을시는 미리 div를 선언하여 스크립트 배포함
					} else {
						//단락 및 단락번호가 있을시는 검색후에 div를 생성함

						var innerTag = '<div id="dcamp_ad_461" style="display:unset;width:'+c_wi+';'+height_txt+'"></div>';
						var cnum = (cont_num_NDYx) ? cont_num_NDYx : 0;
						var media_selector = dcamp_doc_NDYx.querySelectorAll(cont_NDYx)[cnum];
						if(typeof media_selector === 'undefined') return;
						media_selector.insertAdjacentHTML('beforebegin',innerTag);
					}
					isdiv = true;
				}

				var id_selector = dcamp_doc_NDYx.getElementById("dcamp_ad_461");
				if(elementInViewport_NDYx(id_selector)) {
					var so = dcamp_doc_NDYx.createElement('script');
					so.setAttribute('src', 'https://tracker.digitalcamp.co.kr/?'+mc+'&tp=script&w='+wi+'&h='+he+'&ps='+ps +'&ie='+isIE+'&url='+purl);
                    dcamp_doc_NDYx.getElementsByTagName('head')[0].appendChild(so);
                    load=true;
                }
            }
        }
		processMessage();
    };

	var processMessage = function(){
		//스크롤시 iframe 내부에 이벤트값 보내기
		if(mo !== null && typeof mo !== 'undefined'){
			viewClientHeight = dcamp_win_NDYx.innerHeight || dcamp_doc_NDYx.documentElement.clientHeight || dcamp_doc_NDYx.body.clientHeight;
			edata.top = id_NDYx.getBoundingClientRect().top;
			edata.viewClientHeight = viewClientHeight;
			mo.contentWindow.postMessage(edata, "*");
			return true;
		}

		//같은 매체 도메인이고 iframe안에 스크립트를 감싸고 있을때
		if(mc == "NjMy"){		//국민일보 PC 동영상 관련 예외처리 2020-04-21
			var m_iframe_NDYx = dcamp_win_NDYx.document.getElementById('subIframe');
		} else {
			var m_iframe_NDYx = dcamp_win_NDYx.document.getElementById('dcamp_iframe_461');
		}
		if(m_iframe_NDYx !== null && typeof m_iframe_NDYx !== 'undefined' && isiframe_NDYx==true && refererurl_NDYx==cururl_NDYx){
			viewClientHeight = m_iframe_NDYx.innerHeight;
			if(mc == "NjMy"){
				edata.top = m_iframe_NDYx.getBoundingClientRect().top + 550;
			} else {
				edata.top = m_iframe_NDYx.getBoundingClientRect().top;
			}
			edata.viewClientHeight = dcamp_win_NDYx.innerHeight;
			m_iframe_NDYx.contentWindow.postMessage(edata, "*");
			return true;
		}
	}

    windowScroll_NDYx();
    addListener_NDYx(dcamp_win_NDYx, 'scroll', windowScroll_NDYx);
}

var id_NDYx=dcamp_doc_NDYx.getElementById("digitalcamp_NDYx");
var reloadTimer_NDYx;
loadAdContent_NDYx(id_NDYx, "NDYx", "script", "300", "250", "", "%2F%2Ftracker.adbinead.com%2Fother%2Fdonga_P_m_rmid_300x250_dp.html");