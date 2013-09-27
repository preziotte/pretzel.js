
/////////////////////// v2.0.0
// module/build.js
///////////////////////

(function (exports){

	exports = this;

	var b = {};

	// each non-static page gets its own method
	b.contentList = function() {
		console.log("b.contentList fired");

		var listObj = Model.get('content');

	 	// custom compare function for sorting objs
		function compare(a,b) {
		  if (a.date < b.date)
		     return -1;
		  if (a.date > b.date)
		    return 1;
		  return 0;
		}
		
		listObj.sort(compare);

		if (contactsList.length < 1) {
			return false;
		}
		else {
			 // reset list
		}

		var listHTML = "";
		for (var i = 0; i < listObj.length; i++) {
			listHTML += b._list(listObj[i]);
		}

		$("#content").append(cHTML);
		
		
		var listjs = new List('content', {valueNames: [ 'first', 'last', 'apptc' ]});

		listjs.on('updated', function() {
			if (listjs.searched && listjs.visibleItems.length == 0) {
			}
			else {
			}
		});

	};
	b.contentPage = function(id) {
		var obj = Model.get('content', id);
	
	}

	// helper methods
	b._entry = function(obj) {

		var id = obj['id'] || null;
		var fF = $.trim(obj['firstName']) || ' ';
		var fL = $.trim(obj['lastName']) || ' ';
		var fE = $.trim(obj['email']) || ' ';
		var fP = Helper.formatPhone($.trim(obj['phone'])) || ' ';

		// build <li> html
		var HTML = "<li data-go='' data-id='"+id+"' class='listEntry>"+
					"<a>"+
						"<strong class='name'><span class='first'>"+fF+"</span> <span class='last'>"+fL+"</span></strong>"+
						"<span class='chevron'></span>"+
						"<br />"+
						"<span class='details phone'>"+fP+"</span>"+
						"<span class='details email' style='margin-left: 10px;'>"+fE+"</span>"+
					"</a>"+
				"</li>";

		return HTML;
	};

	// expose yourself
	exports.Build = b;

})(window);
