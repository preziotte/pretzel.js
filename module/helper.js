/////////////////////// v1.0.0
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
	h.syncCheck = function(force) {

		console.log("h.syncCheck fired");

		// rotates syncing img until no ajax requests are pending

		$("#sync").fadeIn('fast');

		var refreshIntervalId = setInterval(function(){
			if (Global.pendingAPI <= 0 && $.active <= 0) {
				$("#sync").fadeOut('fast');
				clearInterval(refreshIntervalId);
			}
		},500);

	};

	JSON.tryParse = function(string) {
		// wrapper for JSON.parse that wont throw an error if it fails!
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



