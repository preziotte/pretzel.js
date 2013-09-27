/////////////////////// v1.0.0
// module/build.js
///////////////////////

(function (exports){

	exports = this;

	var b = {};

	// each non-static page gets its own method
	b.contentList = function() {
		console.log("b.contentList fired");

		var listObj = Model.getLocal('entries');
		
	 	// custom compare function for sorting objs
		function compare(a,b) {
		  if (a.date < b.date)
		     return -1;
		  if (a.date > b.date)
		    return 1;
		  return 0;
		}
		
		listObj.sort(compare);

		if (listObj.length < 1) {
			return false;
		}
		else {
			 // reset list
		}

		var listHTML = "";
		for (var i = 0; i < listObj.length; i++) {
			listHTML += b._listUnit(listObj[i]);
		}

		$("#contentList").append(listHTML);
		
/*		
		var listjs = new List('content', {valueNames: [ 'first', 'last', 'apptc' ]});
		listjs.on('updated', function() {
			if (listjs.searched && listjs.visibleItems.length == 0) {
			}
			else {
			}
		});
*/
	};
	b.contentPage = function(id) {
		var obj = Model.get('content', id);
	
	}

	// helper methods
	b._listUnit = function(obj) {

		var HTML = "<li data-go='' data-id='"+obj.id+"' class='listEntry>"+
					"<a>"+
						"<strong class='name'><span class='first'>written by "+obj.author+" on "+obj.date+"</span></strong>"+
						"<span class='chevron'></span>"+
						"<br />"+ obj.title +
						"<br />"+ obj.body +
					"</a>"+
				"</li>";

		return HTML;
	};

	// expose yourself
	exports.Build = b;

})(window);
