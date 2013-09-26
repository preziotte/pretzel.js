
/////////////////////// v1.0.0
// module/model.js
///////////////////////

(function (exports){

	exports = this;

	var m = {};

	m.verify = function() {
		// returns accountObj on success / false if not logged in / error object on failure

		//console.log("m.verify fired");

		//localstorage support?
		if (!localStorage) return { error: "No LocalStorage Support.", code: "upgrade" };

		var obj = JSON.tryParse(localStorage.account);

		// not logged in
		if (!obj) return false;

		// accountObj version check?

		if (!obj.profile) return false;
		if (!obj.contacts) obj.contacts = [];
		if (!obj.appointments) obj.appointments = [];
		if (!obj.templates) obj.templates = [];
		
		return obj;
	};
	m.sync = function() {

		console.log("m.sync fired");

		if (!Global) {
			console.log("no global!");
			return false;
		}
		
		Helper.syncCheck();

		// w/ delta??
		var accountObj = m.get('profile');

		$.ajax({
			url: Global.API_URL + 'retrieve_account?user='+accountObj.user+'&lastModified='+accountObj.modified,
			dataType: 'jsonp',

			success: function(data){
				if (data.error) {
				}
				else {
				//console.log(data);
					m.localSet(data);
				}
			}
		});

	};

	m.get = function(collection, id) {

		//console.log("m.get fired");

		var obj = m.verify();

		if (!obj) return false;
		if (obj.error) return obj;

		if (!collection) return obj;
		
		var find = collection.charAt(0);
			
		if (find == 'c') {
			if (!id) {
				var r = obj.contacts;
				r = $.isArray(r) ? r : [r];
				return r;
			}
			
			for (var t = 0; t < obj.contacts.length; t++) {
				if (obj.contacts[t]['id'] == id) {
					return obj.contacts[t];
				}
			}
			return { error: "client not found" };
		}

		if (find == 'a') {
			// must make verbose
			if (!id) {
				var r = m._makeVerbose(obj.appointments);
				r = $.isArray(r) ? r : [r];
				return r;
			}
			
			for (var t = 0; t < obj.appointments.length; t++) {
				if (obj.appointments[t]['id'] == id) {
					return m._makeVerbose(obj.appointments[t]);
				}
			}
			return { error: "appointment not found" };
		}
		
		if (find == 't') {
			if (!id) {
				var r = obj.templates;
				r = $.isArray(r) ? r : [r];
				return r;
			}

			for (var t = 0; t < obj.templates.length; t++) {
				if (obj.templates[t]['id'] == id) {
					return obj.templates[t];
				}
			}
			return { error: "template not found" };
		}

		if (find == 'p') {
			if (!id) return obj.profile;
			
			// recursively iterate through each profile property and return value if match
			return Helper.findInObj(obj.profile, id) || { error: "profile field not found" };
		}
		
		return { error: "wrong collection specified" };
	};
	m.set = function(collection, data) {

		var deferred = $.Deferred();
		console.log("m.set fired (" + collection + ', ' + data+")");
		//Helper.prettyLog(data);


		// clientside error checking done in formGrabber
		// QUOTA_EXCEEDED_ER if we went over localstorage

		// save change to model with server, then do the same on client w/ local helpers
		// collection == a|c|p|t
			// if data == id; delete
			// if data == obj; add or edit
			// if data == array; batch
	
		if (!collection) return false;

		var call, item, batch;

		// determine api call
		var find = collection.charAt(0);
		if (find == 'c') call = "set_contact";
		if (find == 'a') call = "set_appointment";
		if (find == 't') call = "set_template";
		if (find == 'p') call = "set_profile";

		// determine if we are deleting
		if (typeof data === 'string' && find != 'p') {
			console.log("deleting");
			item = { id: data, user: Global.userid };
		}
		else {
			var d = ($.isArray(data)) ? data : [data];

			if (d.length > 1) {
				batch == true;
				item = [];
			}

			for (var i = 0; i < d.length; i++) {
				if (batch) {
					var batchCall = {};
					batchCall[call] = "item="+JSON.stringify(d[i]);
					item.push(batchCall);
				}
				else
					item = d[i];
			}
		}

		//$.when(m._ajax((batch) ? "batch_call" : call, item)).then(m.localSet(collection, data));

		var ajax = m._ajax((batch) ? "batch_call" : call, item);
		ajax.then(function(dataReturned) {
			console.log('m.set:then fired');
			
			if (!dataReturned.error) {
				var localDone = m.localSet(collection, data);
				localDone.done(function(data){
					deferred.resolve(dataReturned);
				});
				localDone.fail(function(data){
					deferred.reject();
				});
			}

		});

		return deferred.promise();

	};
	m.localSet = function(collection, data) {

		console.log("m.localSet fired (" + collection + ', ' + data+")");

		var deferred = $.Deferred();

		if (arguments.length == 0) return false;

		if (arguments.length == 1) { 													// full accountObj
			localStorage.setItem('account', JSON.stringify(collection));
			deferred.resolve();
			return deferred.promise();
		}

		Helper.prettyLog(data);

		var obj = m.verify();

		if (!obj) return false;
		if (obj.error) return obj;

		var find = collection.charAt(0);
		var deleteFlag = false;

		if (typeof data === 'string' && find != 'p') {
			data = { id: data };
			deleteFlag = true;
		}

		if (find == 'c') {
			var contacts = obj.contacts;
			var match = false;

			for (var t = 0; t < contacts.length; t++) {
				if (contacts[t]['id'] == data.id) {
					match = true;
					if (deleteFlag) contacts.splice(t,1);		// delete client
					else contacts[t] = data;					// edit client
				}
			}
			if (!match) contacts.push(data); 					// add client.
			
			obj.contacts = contacts;
			// update suggestions localstorage
			//localStorage.setItem('suggestions', JSON.stringify(suggestions2));
			//$("#cList").trigger("update_suggestion_data",JSON.stringify(suggestions2));
			
		}
		if (find == 'a') {
			var appointments = obj.appointments;
			var match = false;

			for (var t = 0; t < appointments.length; t++) {
				if (appointments[t]['id'] == data.id) {
				//	Helper.prettyLog(appointments[t]);
				//	Helper.prettyLog(data);
					match = true;
					if (deleteFlag) appointments.splice(t,1);	// delete appointment
					else appointments[t] = data;				// edit appointment
				//	Helper.prettyLog(appointments[t]);
				}
			}
			if (!match) appointments.push(data); 				// add appointment.
			

			obj.appointments = appointments;
		}
		if (find == 't') {
			var templates = obj.templates;
			var match = false;
			
			for (var t = 0; t < templates.length; t++) {
				if (templates[t]['id'] == data.id) {
					match = true;
					if (deleteFlag) templates.splice(t,1);		// delete template
					else templates[t] = data;					// edit template
				}
			}
			if (!match) templates.push(data); 					// add template.
			
			obj.templates = templates;
		}
		if (find == 'p') {
			var profile = obj.profile;
			
			//Helper.prettyLog(profile);
			//Helper.prettyLog(data);
			
			$.extend(true, profile, data);

			//Helper.prettyLog(profile);
	
			obj.profile = profile;
		}

		localStorage.setItem('account', JSON.stringify(obj));

		deferred.resolve();
		return deferred.promise();
	};
	m._ajax = function(call, data) {

		console.log("m._ajax fired (" + call + ', ' + data+")");

		var platform = JSON.stringify(Helper.buildPlatform());
		var deferred = $.Deferred();
		Global.pendingAPI++;
		Helper.syncCheck();
		
		
		if (call == "batch_call")
			var x = "&execute=parallel&calls="+JSON.stringify(data);
		else
			var x = "&item="+JSON.stringify(data);
			
		var sent = $.ajax({
			url: Global.API_URL + call,
			data: "platform="+platform+"&session="+Global.sessionid+x,
			type: "POST"
		});
		
		sent.done(function(data, textStatus, jqXHR) {
			
			Helper.prettyLog('m._ajax:done '+data);
			Global.pendingAPI--;
			
			if (data.error)
				deferred.resolve({ error: "Ajax Failed", code: 200, server: data.error });
			else
				deferred.resolve(data);
			
		});

		sent.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('m._ajax:fail '+jqXHR.status);
			Global.pendingAPI--;
			deferred.resolve({ error: "Network Error", code: jqXHR.status });
		});
		
		return deferred.promise();

	};
	m.clear = function() {
		console.log("m.clear fired");
		localStorage.removeItem("account");
	};
	
	// expose yourself
	exports.Model = m;

})(window);
