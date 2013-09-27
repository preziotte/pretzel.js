/////////////////////// v1.0.0
// module/controller.js
///////////////////////


var exports = this;  // use global context rather than window object

(function (){

	var c = {};

	// set-up
	c.init = function() {

		console.log("c.init fired");

		// global variables
		var g = {
			API_URL : "http://myapidomain.com/api/",
			platform: "WebApp",
			clientVersion : "0.1",
			debugMode: 	(window.location.href.indexOf('?debug') != -1) ? true: false,
			sessionid : Helper.uniqueid(),
			userid : null,
			pendingAPI : 0
		};

		// state
		var s = {
			active : null,		// string of visible page
			back : null			// the last visible page
		};
		
		// expose yourself
		exports.Global = g;
		exports.State = s;

		c.bind();
		Route.go(window.location.pathname);

	};
	c.bind = function() {

		console.log("c.bind fired");

		var click = (Helper.isMobile()) ? 'click' : 'touchstart';

		$('#greetings').on(click, c.navGo);
		$('#headerRight, #headerLeft').on(click, c.headerGo);
		$('#referralCode').on(click, c.referralCode);

		$('#contactList').on(click, 'li.link', c.cList);
		$('#contactGo').on(click, c.cGo);
		$('#deleteCGo').on(click, c.cGoDeleteRly);
	};

	// eventListener callbacks
	c.cList = function() {
		var $this = $(this);
		$this.addClass('active');

		if (State.pendingAppt) {
			State.pendingAppt.contacts.push($this.attr('data-id'));
			Helper.prettyLog(State.pendingAppt);
		}

		if (State.pendingAppt && State.pendingApptEdit)
			Route.go('appointmentsEdit', $this.attr('data-transition'), State.pendingApptEdit);
		else if (State.pendingAppt && !State.pendingApptEdit)
			Route.go('appointmentsAdd', $this.attr('data-transition'));
		else
			Route.go('contactsEdit', $this.attr('data-transition'), $this.attr('data-id'));

	};
	c.cGo = function() {
	
		var $form = $('#addContactForm');
		var errorFlag = true;
		var editFlag = ($(this).text() == 'Add') ? false : true;

		$form.find('input').each(function(){
			if ($(this).val() != '') errorFlag = false;
		});

		if (errorFlag) {
			Helper.alert("To add a contact, fill in some of the information above.", "Error", "Dismiss");
			return false;
		}
		
		// build contact object
		var c = {
			"user" : 				Global.userid,
			"firstName": 			$form.find('input[name=first]').val(),
			"lastName": 			$form.find('input[name=last]').val(),
			"phone": 				Helper.stripAlphaChars($form.find('input[name=phone]').val()),
			"email": 				$form.find('input[name=email]').val(),
			"modified": 			Helper.nowStamp()
		};
		
		if (!editFlag) {
			c.id = Helper.uid();
			var w = "Added.";
			
			// 	check client limit
			var pass = Model.clientLimitCheck();
			if (!pass) {
				ga_storage._trackEvent('Client Limit Reached');
				Helper.alert("You've reached your client limit, please upgrade your account.", "Upgrade", ['View Plans','Go Back'], Controller._upgrade);
				return false;
			}
		}
		else {
			c.id = $(this).attr('data-id');
			var w = "Edited.";
		}

		console.log(c);

		var saved = Model.set('c',c);

		saved.then(function(data) {
			console.log('cGo:then');
			//Helper.prettyLog(data);

			if (data.error) {
				Helper.alert(data.error, "Error", "Dismiss");
			}
			else {
				Helper.alert("Contact "+ w, "Success", "Dismiss", Controller._dismiss);
			}

		});
	};
	c.cGoDeleteRly = function() {
		Helper.alert("", "Delete Contact?", ['Yes','No'], c.cGoDelete);
	};
	c.cGoDelete = function(i) {
		
		if (i != 1) { return; }
		console.log('cGoDelete fired');

		var $this = $('#deleteCGo');

		var cMap = Model.contactMap();
		if (cMap[$this.attr('data-id')] && cMap[$this.attr('data-id')].length > 0) {
			Helper.alert("Sorry, you cannot delete a contact that has an appointment.", "Error", "Dismiss");
			return false;
		}

		var saved = Model.set('c',$this.attr('data-id'));

		saved.then(function(data) {

			if (data.error) {
				Helper.alert(data.error, "Error", "Dismiss");
			}
			else {
				Helper.alert("Contact Deleted", "Success", "Dismiss", Controller._dismiss);
			}

		});

	};
	c.contactToAppt = function() {
		var $this = $(this);
		$this.addClass('active');

		if ($this.attr('id') == 'bookApptContact') {
			State.pendingAppt = { contacts: [$this.attr('data-id')] };
			Route.go('appointmentsAdd', $this.attr('data-transition'));
		}
		else
			Route.go('appointmentsEdit', $this.attr('data-transition'), $this.attr('data-id'));
	};
	
	// expose yourself
	exports.Controller = c;

})();



