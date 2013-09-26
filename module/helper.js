
/////////////////////// v2.0.0
// module/helper.js
///////////////////////

(function (exports){

	exports = this;

	var h = {};

	h.isEmail = function(email) {
		// returns true if string is an email address
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	};
	h.isMobile = function() {
		// returns true if user agent is a mobile device
		return (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent);
	};
	h.uniqueid = function(lowercase) {
		// quick unique id generator
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		if (lowercase) possible = possible.substring(26,62);
		for ( var i=0; i < 7; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	};
	h.syncCheck = function(force) {

		console.log("h.syncCheck fired");
		// rotates syncing img until no ajax requests are pending

		if (!Global.userid && !force) return false;

		if (Global.isIOS) {
			if ($('.spinner').length <= 0)
				$("#toggle-left").after("<img class='spinner' src='img/sync.png' style='position: relative; left: -2px; top: -12px;' />");
	
			if ($('.spinner').length <= 0)
				$("#headerLeft").after("<img class='spinner' src='img/sync.png' />");

			var refreshIntervalId = setInterval(function(){
				if (Global.pendingAPI <= 0 && $.active <= 0) {
					$(".spinner").remove();
					clearInterval(refreshIntervalId);
				}
			},500);
		}
		else {
			$("#imgsync").fadeIn('fast');

			function closeEditorWarning(){
			    return "Appointment Keeper is still in the middle of syncing the changes you've made.  If you leave now, you will lose any unsaved changes.";
			}
			
			window.onbeforeunload = closeEditorWarning;
			
			var refreshIntervalId = setInterval(function(){
				if (Global.pendingAPI <= 0 && $.active <= 0) {
					$("#imgsync").fadeOut('fast');
					window.onbeforeunload = null;
					clearInterval(refreshIntervalId);
				}
			},500);
		}
	};
	h.shakeShake = function(elem) {
		// 
		var l = 15;  
		for( var i = 0; i < 4; i++ )
			$(elem).animate( { 'margin-left': "+=" + ( l = -l ) + 'px' }, 80);
	};

	h.getCookie = function(c_name) {
		//console.log("h.getCookie fired");
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name) {
		    return unescape(y);
		  }
		}
	};
	h.setCookie = function(c_name,value,exdays) {
		//console.log("h.setCookie fired");
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	};

	h.prettyLog = function(data) {
		console.log("h.prettyLog fired");
		return false;
		
		var x = data || localStorage.account;
		if (typeof x == 'object') x = JSON.stringify(x);
		if (typeof data == "undefined") return;
		if (typeof data == "string") {
			console.log(data);
			return;
		}
		console.log('\n'+JSON.stringify(JSON.parse(x),null, 4));

	};

	h._throttle = function(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		options || (options = {});
		var later = function() {
		  previous = options.leading === false ? 0 : new Date;
		  timeout = null;
		  result = func.apply(context, args);
		};
		return function() {
		  var now = new Date;
		  if (!previous && options.leading === false) previous = now;
		  var remaining = wait - (now - previous);
		  context = this;
		  args = arguments;
		  if (remaining <= 0) {
		    clearTimeout(timeout);
		    timeout = null;
		    previous = now;
		    result = func.apply(context, args);
		  } else if (!timeout && options.trailing !== false) {
		    timeout = setTimeout(later, remaining);
		  }
		  return result;
		};
	};

	JSON.tryParse = function(string) {
		// wrapper for JSON.parse that wont throw an error
		try { return JSON.parse(string); }
		catch(err) { return string; }
	};
	jQuery.fn.redraw = function() {
		// re-draw a given element.  easy fix for certain rendering bugs
		// $('#elem').redraw();
		return this.hide(0, function(){$(this).show()});  
	};

	// expose yourself
	exports.Helper = h;

})(window);



