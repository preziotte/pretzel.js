/////////////////////// v1.0.0
// module/model.js
///////////////////////

(function (exports){

	exports = this;

	var m = {};

	m.get = function(collection, id) {

		console.log("m.get fired");

		var deferred = $.Deferred();

		Global.pendingAPI++;
		Helper.syncCheck();

		var data = {};
		if (collection) data.collection = collection;
		if (id) data.id = id;

		var sent = $.ajax({
			url: Global.API_URL + 'sample_api_get_call',
			data: JSON.stringify(data),
			type: "POST"
		});
		
		sent.done(function(data, textStatus, jqXHR) {
			console.log('m.get:done '+data);
			Global.pendingAPI--;
			deferred.resolve(data);
		});

		sent.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('m.get:fail '+jqXHR.status);
			Global.pendingAPI--;
			deferred.resolve({ error: "Network Error", code: jqXHR.status });
		});
		
		return deferred.promise();

	};
	m.set = function(collection, data) {

		console.log("m.set fired (" + collection + ', ' + data+")");
		var deferred = $.Deferred();

	};

	m.getLocal = function(collection, id) {
		console.log("m.getLocal fired");

		var obj = JSON.tryParse(localStorage.data);

		if (collection == 'entries') {
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

	};
	m.setLocal = function(collection, data) {
		console.log("m.setLocal fired");

		var obj = JSON.tryParse(localStorage.data);

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

		localStorage.setItem('data', JSON.stringify(obj));

	};

	exports.Model = m;

})(window);
