
/////////////////////// v0.0.1
// module/config.js
///////////////////////

// abstracts all text.
// maybe name config.en.js

(function (exports){
	
	exports = this;
	
	var c = {};
	
	// c.global / c.state / c.constant / c.account / c.plan / c.tags ?
	
	// meta data
	c.meta = {};
	c.meta.language = "en/us";

	// page titles + header text
	c.page = {};
	
	c.page.contacts.title = "";
	c.page.contacts.header = "";
	c.page.appointments.title = "";
	c.page.appointments.header = "";

	// help text
	c.help = {};
	
	// all modal text
	c.modal = {};
	
	c.modal.importGoogleContacts = "";
	c.modal.clientLimit = "";

	// button names	
	c.button = {};
	
	c.button.submit = "";
	c.button.cancel = "";
	c.button.dismiss = "";
	
	// error text
	c.error = {};
	
	c.error.invalidEmail = "";
	c.error.invalidLogin = "";
	
	//c.Jesus = function(email) {
	}

	// expose yourself
	exports.Config = c;

})(window);



