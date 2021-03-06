
/////////////////////// v1.0.0
// module/route.js
///////////////////////

(function (exports){

	exports = this;

	var r = {};

	// routing
	r.go = function(page, id) {

		console.log("r.go fired ("+page+")");
		
		// trim the fat
		page = $.trim(page).replace('#','').replace(/^\/|\/$/g, '');

		// update state
		State.back = State.active;
		State.active = page;

		switch(page) {
			case 'index.html': case 'contentList':
				r.show('contentList');
				Build.contentList();
				break;
			case 'contentPage':
				r.show('contentPage');
				Build.contentPage(id);
				break;
			case 'about':
				r.show('about');
				break;
			default:
				r.show('contentList');
				Build.contentList();
				break;
		};

	};
	r.show = function(page, back) {
		console.log("r.show fired ("+page+")");

		if (back == null && page != window.location.pathname.substring(1)) {
			//history.pushState({page:page},"Pretzel.js",page);
		}

		$('#pageContainer div.active').removeClass('active');
		$('#'+page).addClass('active');
	};

	exports.onpopstate = function(event) {
		if (event.state != null) {
			r.go(event.state.page, "back");
		}
	};

	// expose yourself
	exports.Route = r;

})(window);
