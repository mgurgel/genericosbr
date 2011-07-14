
// CUSTOM CODE

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
		$.ajax({url: $(this).attr("href"), success: function(data){ handler(data); jQT.goTo(t, 'slide'); }});
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
