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

		$("#contentList").empty();
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
		var obj = Model.getLocal('entries', id);
		
		var HTML = b._listUnit(obj);
		$('#contentPage').html(HTML);
	
	}

	// helper methods
	b._listUnit = function(obj) {

		var HTML = "<li data-go='contentPage' data-id='"+obj.id+"' class='listEntry'>"+
						obj.title + "<br />"+
						"<strong class='name'>written by "+obj.author+" on "+obj.date+"</strong>"+
						"<br />"+ obj.body +
					"</li>";

		return HTML;
	};

	// expose yourself
	exports.Build = b;

})(window);
