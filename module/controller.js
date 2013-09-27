/////////////////////// v1.0.0
// module/controller.js
///////////////////////


var exports = this;  // use global context rather than window object

(function (){

	var c = {};

	// set-up
	c.init = function() {

		console.log("c.init fired");

		// your global variables
		var g = {
			API_URL : "http://myapidomain.com/api/",
			platform: "WebApp",
			clientVersion : "0.1",
			debugMode: 	(window.location.href.indexOf('?debug') != -1) ? true : false,
			sessionid : Helper.uniqueid(),
			userid : null,
			pendingAPI : 0
		};
		exports.Global = g;

		// save state
		var s = {
			active : null,		// the name of the visible page
			back : null			// the last page the user was on
		};
		exports.State = s;

		// bind all eventlisteners
		c.bind();

		// begin populate sample data
		var sampleEntry1 = {
			'id' : 0,
			'date' : "Recently",
			'author' : "Mr. Bubbles",
			'title' : "McSweeney's 90's cliche viral swag, slow-carb you probably haven't heard of them.",
			'body' : "Helvetica sartorial cornhole, seitan Banksy pop-up Tonx 3 wolf moon Williamsburg mlkshk flexitarian occupy meh PBR. Chillwave yr kale chips twee sustainable bitters. Thundercats photo booth hashtag cliche, banjo skateboard vegan readymade squid 8-bit chillwave hella cray Marfa. Pug bicycle rights drinking vinegar quinoa cred. Dreamcatcher literally ugh tousled. Beard vinyl VHS, Carles church-key authentic ennui jean shorts pug Godard raw denim McSweeney's tattooed brunch readymade. Selfies banh mi cardigan, Echo Park fap butcher before they sold out."
		};
	
		var sampleEntry2 = {
			'id' : 1,
			'date' : "Also Recently",
			'author' : "Mrs. Bubbles",
			'title' : "Tonx vinyl art party, bitters PBR gastropub salvia Thundercats.",
			'body' : "Cardigan cred fap, Williamsburg sustainable 3 wolf moon church-key keffiyeh messenger bag four loko try-hard Neutra narwhal polaroid. Slow-carb church-key iPhone gluten-free next level, VHS pug Brooklyn selvage fashion axe. Locavore kitsch forage mlkshk, polaroid DIY Brooklyn sriracha four loko roof party messenger bag letterpress lomo. Flexitarian mixtape asymmetrical, Austin banh mi jean shorts readymade bitters photo booth swag seitan. Disrupt sustainable readymade, retro Neutra post-ironic quinoa flannel Bushwick chillwave fap. Salvia Portland farm-to-table actually deep v. Fashion axe artisan DIY single-origin coffee."
		};
		
		Model.setLocal('entries', sampleEntry1);
		Model.setLocal('entries', sampleEntry2);
		// end populate sample data

		// render and display page
		Route.go(window.location.pathname);

	};
	c.bind = function() {
		console.log("c.bind fired");

		var click = (Helper.isMobile()) ? 'touchstart' : 'click';

		$('#contentList').on(click, 'a', c.entryGo);
		$('#aboutBtn').on(click, c.btnGo);
		$('#entryBtn').on(click, c.btnGo);
	};

	// eventlistener callbacks
	c.btnGo = function() {
		console.log('c.btnGo fired');
		Route.go($(this).attr('data-go'));
	};
	c.entryGo = function() {
		console.log('c.entryGo fired');
		Route.go($(this).attr('data-go'),$(this).attr('data-id'));
	};
	
	exports.Controller = c;

})();



