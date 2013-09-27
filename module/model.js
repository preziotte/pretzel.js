/////////////////////// v1.0.0
// module/model.js
///////////////////////

(function (exports){

	exports = this;

	var m = {};

	// get and set data via ajax
	m.get = function(collection, id) {

		console.log("m.get fired");

		Global.pendingAPI++;
		Helper.syncCheck();
		var deferred = $.Deferred();

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

		console.log("m.set fired");

		Global.pendingAPI++;
		Helper.syncCheck();
		var deferred = $.Deferred();

		var data = {};
		if (collection) data.collection = collection;
		if (id) data.data = data;

		var sent = $.ajax({
			url: Global.API_URL + 'sample_api_set_call',
			data: JSON.stringify(data),
			type: "POST"
		});
		
		sent.done(function(data, textStatus, jqXHR) {
			console.log('m.set:done '+data);
			Global.pendingAPI--;
			deferred.resolve(data);
		});

		sent.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('m.set:fail '+jqXHR.status);
			Global.pendingAPI--;
			deferred.resolve({ error: "Network Error", code: jqXHR.status });
		});
		
		return deferred.promise();
	};

	// get and set data via localstorage
	m.getLocal = function(collection, id) {
		console.log("m.getLocal fired");

		Helper.syncCheck();
		var obj = JSON.tryParse(localStorage.data);

		if (collection == 'entries') {
			if (!id) {
				var r = obj.entries;
				r = $.isArray(r) ? r : [r];
				return r;
			}

			for (var t = 0; t < obj.entries.length; t++) {
				if (obj.entries[t]['id'] == id) {
					return obj.entries[t];
				}
			}
			return { error: "entry not found" };
		}

	};
	m.setLocal = function(collection, data) {
		console.log("m.setLocal fired");

		Helper.syncCheck();
		var deferred = $.Deferred();
		var obj = (localStorage.data) ? JSON.tryParse(localStorage.data) : {};
		var deleteFlag = false;

		if (typeof data === 'string') {
			data = { id: data };
			deleteFlag = true;
		}

		if (collection == 'entries') {
			var entries = (obj.entries) ? obj.entries : [];
			var match = false;

			for (var t = 0; t < entries.length; t++) {
				if (entries[t]['id'] == data.id) {
					match = true;
					if (deleteFlag) entries.splice(t,1);		// delete entry
					else entries[t] = data;					// edit entry
				}
			}
			if (!match) entries.push(data); 					// add entry
			
			obj.entries = entries;
			
		}

		localStorage.setItem('data', JSON.stringify(obj));
		return deferred.resolve().promise();
	};

	exports.Model = m;

})(window);
