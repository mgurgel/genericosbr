/*

            _/    _/_/    _/_/_/_/_/                              _/
               _/    _/      _/      _/_/    _/    _/    _/_/_/  _/_/_/
          _/  _/  _/_/      _/    _/    _/  _/    _/  _/        _/    _/
         _/  _/    _/      _/    _/    _/  _/    _/  _/        _/    _/
        _/    _/_/  _/    _/      _/_/      _/_/_/    _/_/_/  _/    _/
       _/
    _/

    Created by David Kaneda <http://www.davidkaneda.com>
    Documentation and issue tracking on GitHub <http://wiki.github.com/senchalabs/jQTouch/>

    Special thanks to Jonathan Stark <http://jonathanstark.com/>
    and pinch/zoom <http://www.pinchzoom.com/>

    (c) 2010 by jQTouch project members.
    See LICENSE.txt for license.

    $Revision: 166 $
    $Date: Tue Mar 29 01:24:46 EDT 2011 $
    $LastChangedBy: jonathanstark $


*/
(function(a){a.jQTouch=function(w){var C,t=a("head"),K="",H=[],G=0,m={},j="",v="portrait",S=true,R=0,e=0,i=[],x={},k=351,M=a.jQTouch.prototype.extensions,Q=[],s="",D={addGlossToIcon:true,backSelector:".back, .cancel, .goback",cacheGetRequests:true,debug:false,fallback2dAnimation:"fade",fixedViewport:true,formSelector:"form",fullScreen:true,fullScreenClass:"fullscreen",hoverDelay:50,icon:null,iconPad:null,icon4:null,moveThreshold:10,preloadImages:false,pressDelay:1000,startupScreen:null,startupScreen4:null,startupScreenPadLandscape:null,startupScreenPadPortrait:null,statusBar:"default",submitSelector:".submit",touchSelector:"a, .touch",useAnimations:true,useFastTouch:true,animations:[{selector:".cube",name:"cubeleft",is3d:true},{selector:".cubeleft",name:"cubeleft",is3d:true},{selector:".cuberight",name:"cuberight",is3d:true},{selector:".dissolve",name:"dissolve",is3d:false},{selector:".fade",name:"fade",is3d:false},{selector:".flip",name:"flipleft",is3d:true},{selector:".flipleft",name:"flipleft",is3d:true},{selector:".flipright",name:"flipright",is3d:true},{selector:".pop",name:"pop",is3d:true},{selector:".slide",name:"slideleft",is3d:false},{selector:".slidedown",name:"slidedown",is3d:false},{selector:".slideleft",name:"slideleft",is3d:false},{selector:".slideright",name:"slideright",is3d:false},{selector:".slideup",name:"slideup",is3d:false},{selector:".swap",name:"swapleft",is3d:true},{selector:"#jqt > * > ul li a",name:"slideleft",is3d:false}]};function y(U){var T=(new Date).getTime();var V=T-R;R=T;if(m.debug){if(U){f(V+": "+U)}else{f(V+": Called "+arguments.callee.caller.name)}}}function f(T){if(window.console!==undefined){console.log(T)}}function b(T){if(typeof(T.selector)==="string"&&typeof(T.name)==="string"){Q.push(T)}}function l(U,T){y();H.unshift({page:U,animation:T,hash:"#"+U.attr("id"),id:U.attr("id")})}function o(U){y();if(!S){y("ClickHandler handler aborted because tap is not ready");U.preventDefault();return false}var T=a(U.target);if(!T.is(i.join(", "))){T=a(U.target).closest(i.join(", "))}if(T&&T.attr("href")&&!T.isExternalLink()){y("Need to prevent default click behavior");U.preventDefault()}else{y("No need to prevent default click behavior")}if(a.support.touch){y("Not converting click to a tap event because touch handler is on the job")}else{y("Converting click event to a tap event because touch handlers are not present or off");a(U.target).trigger("tap",U)}}function c(Y,V,X,U){y();if(V.length===0){a.fn.unselect();y("Target element is missing.");return false}if(V.hasClass("current")){a.fn.unselect();y("You are already on the page you are trying to navigate to.");return false}a(":focus").blur();Y.trigger("pageAnimationStart",{direction:"out"});V.trigger("pageAnimationStart",{direction:"in"});if(a.support.animationEvents&&X&&m.useAnimations){S=false;if(!a.support.transform3d&&X.is3d){X.name=m.fallback2dAnimation}var T;if(U){if(X.name.indexOf("left")>0){T=X.name.replace(/left/,"right")}else{if(X.name.indexOf("right")>0){T=X.name.replace(/right/,"left")}else{if(X.name.indexOf("up")>0){T=X.name.replace(/up/,"down")}else{if(X.name.indexOf("down")>0){T=X.name.replace(/down/,"up")}else{T=X.name}}}}}else{T=X.name}Y.bind("webkitAnimationEnd",W);Y.bind("webkitTransitionEnd",W);scrollTo(0,0);V.addClass(T+" in current");Y.addClass(T+" out")}else{V.addClass("current");W()}function W(Z){y();if(a.support.animationEvents&&X&&m.useAnimations){Y.unbind("webkitAnimationEnd",W);Y.unbind("webkitTransitionEnd",W);Y.removeClass(T+" out current");V.removeClass(T+" in")}else{Y.removeClass(T+" out current")}j=V;if(U){H.shift()}else{l(j,X)}Y.unselect();e=(new Date()).getTime();n(j.attr("id"));S=true;V.trigger("pageAnimationEnd",{direction:"in",animation:X});Y.trigger("pageAnimationEnd",{direction:"out",animation:X})}return true}function P(){y();return v}function h(){y();if(H.length<1){y("History is empty.")}if(H.length===1){y("You are on the first panel.")}var U=H[0],T=H[1];if(c(U.page,T.page,U.animation,true)){return x}else{y("Could not go back.");return false}}function L(X,Y,V){y();if(V){f("The reverse parameter of the goTo() function has been deprecated.")}var Z=H[0].page;if(typeof Y==="string"){for(var W=0,T=Q.length;W<T;W++){if(Q[W].name===Y){Y=Q[W];break}}}if(typeof(X)==="string"){var U=a(X);if(U.length<1){d(X,{animation:Y});return}else{X=U}}if(c(Z,X,Y)){return x}else{y("Could not animate pages.");return false}}function O(T){y();if(location.hash===H[0].hash){y("We are on the right panel")}else{y("We are not on the right panel");if(location.hash===H[1].hash){h()}else{y(location.hash+" !== "+H[1].hash)}}}function N(T){y();m=a.extend({},D,T);if(m.preloadImages){for(var U=m.preloadImages.length-1;U>=0;U--){(new Image()).src=m.preloadImages[U]}}var V=(m.addGlossToIcon)?"":"-precomposed";if(m.icon){s+='<link rel="apple-touch-icon'+V+'" href="'+m.icon+'" />'}if(m.iconPad){s+='<link rel="apple-touch-icon'+V+'" sizes="72x72" href="'+m.iconPad+'" />'}if(m.icon4){s+='<link rel="apple-touch-icon'+V+'" sizes="114x114" href="'+m.icon4+'" />'}if(m.startupScreen){s+='<link rel="apple-touch-startup-image" href="'+m.startupScreen+'" />'}if(m.fixedViewport){s+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"/>'}if(m.fullScreen){s+='<meta name="apple-mobile-web-app-capable" content="yes" />';if(m.statusBar){s+='<meta name="apple-mobile-web-app-status-bar-style" content="'+m.statusBar+'" />'}}if(s){t.prepend(s)}}function A(T,U){y();var V=null;a(T).each(function(X,Y){var W=a(this);if(!W.attr("id")){W.attr("id","page-"+(++G))}a("#"+W.attr("id")).remove();C.trigger("pageInserted",{page:W.appendTo(C)});if(W.hasClass("current")||!V){V=W}});if(V!==null){L(V,U);return V}else{return false}}function z(T){var U=(new Date()).getTime()-e;if(U<k){return false}}function g(){y();v=Math.abs(window.orientation)==90?"landscape":"portrait";C.removeClass("portrait landscape").addClass(v).trigger("turn",{orientation:v})}function n(T){y();T=T.replace(/^#/,""),location.hash="#"+T}function d(T,U){y();var W={data:null,method:"GET",animation:null,callback:null,$referrer:null};var V=a.extend({},W,U);if(T!="#"){a.ajax({url:T,data:V.data,type:V.method,success:function(X,Z){var Y=A(X,V.animation);if(Y){if(V.method=="GET"&&m.cacheGetRequests===true&&V.$referrer){V.$referrer.attr("href","#"+Y.attr("id"))}if(V.callback){V.callback(true)}}},error:function(X){if(V.$referrer){V.$referrer.unselect()}if(V.callback){V.callback(false)}}})}else{if(V.$referrer){V.$referrer.unselect()}}}function q(U,V){y();a(":focus").blur();U.preventDefault();var T=(typeof(U)==="string")?a(U).eq(0):(U.target?a(U.target):a(U));y(T.attr("action"));if(T.length&&T.is(m.formSelector)&&T.attr("action")){d(T.attr("action"),{data:T.serialize(),method:T.attr("method")||"POST",animation:Q[0]||null,callback:V});return false}return false}function J(V){y();var U=V.closest("form");if(U.length===0){y("No parent form found")}else{y("About to submit parent form");var T=a.Event("submit");T.preventDefault();U.trigger(T);return false}return true}function p(){y();return(typeof WebKitAnimationEvent!="undefined")}function E(){y();return(typeof WebKitCSSMatrix!="undefined")}function I(){y();if(typeof TouchEvent!="undefined"){if(window.navigator.userAgent.indexOf("Mobile")>-1){return true}else{return false}}else{return false}}function B(){y();var V,U,W,X,T;V=document.getElementsByTagName("head")[0];U=document.body;W=document.createElement("style");W.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){#jqtTestFor3dSupport{height:3px}}";X=document.createElement("div");X.id="jqtTestFor3dSupport";V.appendChild(W);U.appendChild(X);T=X.offsetHeight===3;W.parentNode.removeChild(W);X.parentNode.removeChild(X);return T}function F(Z){y();if(!S){y("Tap is not ready");return false}var V=a(Z.target);if(!V.is(i.join(", "))){var V=a(Z.target).closest(i.join(", "))}if(!V.length||!V.attr("href")){y("Could not find a link related to tapped element");return false}var Y=V.attr("target"),X=V.attr("hash"),W=null;if(V.isExternalLink()){V.unselect();return true}else{if(V.is(m.backSelector)){h(X)}else{if(V.is(m.submitSelector)){J(V)}else{if(Y==="_webapp"){window.location=V.attr("href");return false}else{if(V.attr("href")==="#"){V.unselect();return true}else{for(var U=0,T=Q.length;U<T;U++){if(V.is(Q[U].selector)){W=Q[U];break}}if(!W){f("Animation could not be found. Using slideleft.");W="slideleft"}if(X&&X!=="#"){V.addClass("active");L(a(X).data("referrer",V),W,V.hasClass("reverse"));return false}else{V.addClass("loading active");d(V.attr("href"),{animation:W,callback:function(){V.removeClass("loading");setTimeout(a.fn.unselect,250,V)},$referrer:V});return false}}}}}}}function u(ad){y();if(!S){y("TouchStart handler aborted because tap is not ready");ad.preventDefault();return false}var ah=a(ad.target);if(!ah.length){y("Could not find target of touchstart event.");return}var V=(new Date).getTime(),T=null,W=null,Z,ab,aa,Y=0,X=0,ac=0;if(event.changedTouches&&event.changedTouches.length){Z=event.changedTouches[0];ab=Z.pageX;aa=Z.pageY}ah.bind("touchmove",ae).bind("touchend",U).bind("touchcancel",af);T=setTimeout(function(){ah.makeActive()},m.hoverDelay);W=setTimeout(function(){ah.unbind("touchmove",ae).unbind("touchend",U).unbind("touchcancel",af);ah.unselect();clearTimeout(T);ah.trigger("press")},m.pressDelay);function af(ai){y();clearTimeout(T);ah.unselect();ah.unbind("touchmove",ae).unbind("touchend",U).unbind("touchcancel",af)}function U(ai){y();ah.unbind("touchend",U).unbind("touchcancel",af);clearTimeout(T);clearTimeout(W);if(Math.abs(Y)<m.moveThreshold&&Math.abs(X)<m.moveThreshold&&ac<m.pressDelay){ah.trigger("tap",ai)}else{ah.unselect()}}function ae(al){ag();var ak=Math.abs(Y);var ai=Math.abs(X);var aj;if(ak>ai&&(ak>35)&&ac<1000){if(Y<0){aj="left"}else{aj="right"}ah.unbind("touchmove",ae).unbind("touchend",U).unbind("touchcancel",af);ah.trigger("swipe",{direction:aj,deltaX:Y,deltaY:X})}ah.unselect();clearTimeout(T);if(ak>m.moveThreshold||ai>m.moveThreshold){clearTimeout(W)}}function ag(){var ai=event.changedTouches[0]||null;Y=ai.pageX-ab;X=ai.pageY-aa;ac=(new Date).getTime()-V}}function r(T){y();if(T!==undefined){if(T===true){if(I()){a.support.touch=true}else{f("This device does not support touch events")}}else{a.support.touch=false}}return a.support.touch}N(w);a(document).ready(function(){a.support.animationEvents=p();a.support.cssMatrix=E();a.support.touch=I()&&m.useFastTouch;a.support.transform3d=B();if(!a.support.touch){f("This device does not support touch interaction, or it has been deactivated by the developer. Some features might be unavailable.")}if(!a.support.transform3d){f("This device does not support 3d animation. 2d animations will be used instead.")}a.fn.isExternalLink=function(){var X=a(this);return(X.attr("target")=="_blank"||X.attr("rel")=="external"||X.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]'))};a.fn.makeActive=function(){return a(this).addClass("active")};a.fn.press=function(X){if(a.isFunction(X)){return a(this).live("press",X)}else{return a(this).trigger("press")}};a.fn.swipe=function(X){if(a.isFunction(X)){return a(this).live("swipe",X)}else{return a(this).trigger("swipe")}};a.fn.tap=function(X){if(a.isFunction(X)){return a(this).live("tap",X)}else{return a(this).trigger("tap")}};a.fn.unselect=function(X){if(X){X.removeClass("active")}else{a(".active :not(.sticky)").removeClass("active")}};for(var U=0,T=M.length;U<T;U++){var V=M[U];if(a.isFunction(V)){a.extend(x,V(x))}}if(m.cubeSelector){f("NOTE: cubeSelector has been deprecated. Please use cubeleftSelector instead.");m.cubeleftSelector=m.cubeSelector}if(m.flipSelector){f("NOTE: flipSelector has been deprecated. Please use flipleftSelector instead.");m.flipleftSelector=m.flipSelector}if(m.slideSelector){f("NOTE: slideSelector has been deprecated. Please use slideleftSelector instead.");m.slideleftSelector=m.slideSelector}for(var U=0,T=D.animations.length;U<T;U++){var W=D.animations[U];if(m[W.name+"Selector"]!==undefined){W.selector=m[W.name+"Selector"]}b(W)}i.push("input");i.push(m.touchSelector);i.push(m.backSelector);i.push(m.submitSelector);a(i.join(", ")).css("-webkit-touch-callout","none");C=a("#jqt");if(C.length===0){f('Could not find an element with the id "jqt", so the body id has been set to "jqt". If you are having any problems, wrapping your panels in a div with the id "jqt" might help.');C=a("body").attr("id","jqt")}if(a.support.transform3d){C.addClass("supports3d")}if(m.fullScreenClass&&window.navigator.standalone==true){C.addClass(m.fullScreenClass+" "+m.statusBar)}if(window.navigator.userAgent.match(/Android/ig)){C.addClass("android")}a(window).bind("hashchange",O);C.bind("touchstart",u).bind("click",o).bind("mousedown",z).bind("orientationchange",g).bind("submit",q).bind("tap",F).trigger("orientationchange");if(a("#jqt > .current").length==0){j=a("#jqt > *:first")}else{j=a("#jqt > .current:first");a("#jqt > .current").removeClass("current")}a(j).addClass("current");K=a(j).attr("id");n(K);l(j);scrollTo(0,0);a("#jqt > *").css("minHeight",window.innerHeight)});x={addAnimation:b,animations:Q,getOrientation:P,goBack:h,goTo:L,hist:H,settings:m,submitForm:q,support:a.support,useFastTouch:r};return x};a.jQTouch.prototype.extensions=[];a.jQTouch.addExtension=function(b){a.jQTouch.prototype.extensions.push(b)}})(jQuery);

// CUSTOM CODE

// CUSTOM CODE

/* CONFIGURATION */

var api_host = "http://genericos.tapush.com";

/* 
	List search adapted from
	http://www.akchauhan.com/javascript-list-search-using-jquery/
*/

function composeUsage(d, o) {
	if (d) $("#detail "+o).show().find("p").first().html(d);
}

function updateDetails(d) {
	var data, anvisa_url, anvisa_base = "http://www4.anvisa.gov.br/BularioEletronico/default.asp?";	
	if (d.m) {
		// Is medication
		data = d.m;
		anvisa_url = "txtMedicamento=";
		$("#detail .dbt").html("Medicamentos");
	} else {
		// Is substance
		data = d.s;
		anvisa_url = "txtPrincipioAtivo=";
		$("#detail .dbt").html("Substâncias");
	}

	$("#detail .dn").html(data.n);
	$("#detail .dsnc").html(data.s + (data.c ? "<br>" + data.c : ""));
	
	// Usage
	if (!jQuery.isEmptyObject(data.u)) {
		$("#detail .du").show().find("li").hide();
		composeUsage(data.u.i, ".dui");
		composeUsage(data.u.p, ".dup");
		composeUsage(data.u.f, ".duf");
		composeUsage(data.u.t, ".dut");
		composeUsage(data.u.c, ".duc");
		composeUsage(data.u.e, ".due");
		composeUsage(data.u.r, ".dur");
	} else {
		$("#detail .du").hide().find("li p").empty();
	}

	// Availability
	var a, i;
	$("#detail .dd").empty();
	if (data.a.length) {
		for (i=0;i<data.a.length;i++) {
			a = data.a[i];
			$("#detail .dd").append("<li><p><b>" + a.f + " " + a.c + "</b></p><p>" + a.l + "</p></li>");
		}
		$("#detail .da").show();
	} else {
		$("#detail .da").hide();
	}
	
	// Anvisa
	$("#anvisa .abt").html(data.n);
	$("#anvisa-frame").data("src", anvisa_base+anvisa_url+escape(data.n));
	
}

function listExists() {
	return $("#list .item-list li").length ? true : false;
}

function updateList(d) {
	var i, l, data, name, type, list = $("#list .item-list").first();
	if (d.m) {
		data = d.m;
		name = "Medicamentos";
	} else {
		data = d.s;
		name = "Substâncias";
	}
	// Return true if list already loaded
	if (listExists() && $("#list .ln").html() == name) return true;
	
	// Clear search terms
	$("#sf").val("");
	
	// Load list
	$("#list .ln").html(name);
	list.empty();
	for (i=0;i<data.length;i++) {
		l = $('<li class="arrow"><a href="/j/'+(d.m ? "m" : "s")+'/'+data[i].i+'.json" class="sticky">'+data[i].n+'</a></li>');
		if (data[i].h) l.addClass("hi");
		list.append(l);
	}
	relink(".item-list a", "#detail", updateDetails);
}

// Hijacks links from jQTouch
function relink(s, t, handler) {
    $(s).bind('tap',function(e){
    	e.preventDefault();
		$(this).addClass("active");
		$.ajax({url: api_host+$(this).attr("href"), dataType:"jsonp", success: function(data){ handler(data); jQT.goTo(t, 'slide'); }});
		return false;
	});
}

function listWillAppear() {
	$(".item-list").height('auto');
}

function listWillDisappear() {
	if ($(".item-list").height() > availableHeight) $(".item-list").height(availableHeight+50);
}

function search(so) {
	var s = $(so).val();
	var u = $(so).closest('.page').find('.item-list').first();
	if (!s) {
		u.find('li').css('display', '');
		return;
	}
	var rg = new RegExp(s,'i');
	u.find('li a').each(function(){
			if($.trim($(this).html()).search(rg) == -1) {
			$(this).parent().css('display', 'none');
		}	
		else {
			$(this).parent().css('display', '');
		}
	});
}

var availableHeight = 0;

function updateAvailableHeight() {
	availableHeight = $(window).height() - $('.toolbar').height();
}

/* Start up */

$(function(){

	// Bind orientation changes
    $('body').bind('turn', function(event, info){
		updateAvailableHeight();
		$("#anvisa-frame").height(availableHeight-10);
	});
	
	// Bind search input and clear button	
	$('#sf').bind('keyup',function(){search(this);});
	
	$('#home').bind('pageAnimationEnd', function(event, info){
    	if (info.direction == 'out') {
			$("#home ul a.active").removeClass("active");
		}
	});
	
	// Load list of meds/subs
    $('.longlist').bind('pageAnimationEnd', function(event, info){
    	if (info.direction == 'in') {
    		$("#sf").blur();

	    	// Prepare list appearance
	    	listWillAppear();
	    }
    	if (info.direction == 'out') {
			$("#list ul a.active").removeClass("active");
		}
    });

	// [search resignFirstResponder] when leaving page
    $('.longlist').bind('pageAnimationStart', function(event, info){
    	if (info.direction == 'out') {
			$("#sf").blur();

	    	// Prepare list appearance
	    	listWillDisappear();
    	}
    });
    
    // Resize Anvisa Frame
    $("#anvisa").bind('pageAnimationEnd', function(event, info){
    	if (info.direction == "in") {
			$("#detail ul a.active").removeClass("active");
			$("#anvisa-frame").attr("src",$("#anvisa-frame").data("src"));
    	}
    });

   	// Open in browser button
	$("#oib").bind('tap',function(){$(this).attr("href",$("#anvisa-frame").attr("src"))});

    // Set up link hijacker
	relink(".mainmenu a", "#list", updateList);
});


/* Initialize jQTouch */

var jQT = new $.jQTouch({
  icon: 'apple-touch-icon-57x57-precomposed.png',
  icon4: 'apple-touch-icon-114x114-precomposed.png',
  iconPad: 'apple-touch-icon-72x72-precomposed.png',
  addGlossToIcon: false,
  startupScreen: 'apple-touch-startup-image-320x460.png',
  statusBar: 'black',
  preloadImages: [
    'images/at/activeButton.png',	 	
    'images/ct/button.png',
    'images/ct/backButton.png',
    'images/ct/search.png',
    'images/ct/search@2x.png',
	'images/ct/loading.gif',
	'images/ct/loading@2x.gif',
	'images/icons/li-leaflet.png',
	'images/icons/li-leaflet@2x.png',
	'images/icons/li-anvisa.png',
	'images/icons/li-anvisa@2x.png',
	'images/tapush-logo.gif',
	'apple-touch-icon-57x57-precomposed.png'
  ],
  useFastTouch: true,
  useAnimations: false
});
