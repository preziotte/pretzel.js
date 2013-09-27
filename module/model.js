
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

		var sent = $.ajax({
			url: Global.API_URL + 'sample_api_call',
			data: JSON.stringify(data),
			type: "POST"
		});
		
		sent.done(function(data, textStatus, jqXHR) {
			
			Helper.prettyLog('m._ajax:done '+data);
			Global.pendingAPI--;

			deferred.resolve(data);
			
		});

		sent.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('m._ajax:fail '+jqXHR.status);
			Global.pendingAPI--;
			deferred.resolve({ error: "Network Error", code: jqXHR.status });
		});
		
		return deferred.promise();

	};
	m.set = function(collection, data) {

		var deferred = $.Deferred();
		console.log("m.set fired (" + collection + ', ' + data+")");

	};

	m.getLocal = function(collection, id) {};
	m.setLocal = function(collection, data) {};

	exports.Model = m;

})(window);
