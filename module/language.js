/////////////////////// v0.0.1
// module/language.js
///////////////////////

// just an idea for another module
// abstracts all text.  would be used in Build.js
// good for localization.
// maybe name language.en.js and lazy load the appropriate one

(function (exports){
	
	exports = this;
	
	var l = {};
	
	// meta data
	l.meta = {};
	l.meta.language = "en/us";

	// page titles + header text
	l.page = {};
	
	l.page.contentList.title = "";
	l.page.contentList.header = "";
	l.page.contentPage.title = "";
	l.page.contentPage.header = "";

	// help text
	l.help = {};
	
	// all modal text
	l.modal = {};

	// button names	
	l.button = {};
	
	l.button.submit = "";
	l.button.cancel = "";
	l.button.dismiss = "";
	
	// error text
	l.error = {};
	
	l.error.invalidEmail = "";
	l.error.invalidLogin = "";
	
	}

	exports.Language = l;

})(window);



