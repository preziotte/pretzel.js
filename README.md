Pretzel.js - Tiny JS Boilderplate.


####A litle context.
Full-blown js mvc frameworks can have a pretty big learning curve.  They also add a big black box to your application, which I'm not always comfortable with.  I made this as an alternative for my own projects.  It's more of a boilderplate -- a way to make sure you cover certain bases.

####How to use it.
Well there's an index page, and that's the only html file you'll likely need.  Each page should have its own div with a corresponding id, like so.  

When the document is ready to do so, everything gets kicked off by firing Controller.init().

Then there are five Javascript files in the /module folder.  This is what will be fleshed out as you write your app.
+ **Helper.js** -- Put helper methods here.  Maybe you need a simple function to generate an ID number.  Or format a phone number.  Stuff like that.
+ **Model.js** -- This is where data will be retrieved and saved.  This should vary depending on what your app does, but it'll largely boil down to .get() and .set() methods.  
+ **Build.js** -- Each page that must be rendered dynamically has its own method here.  It grabs its data from the Model and spits out the html.
+ **Route.js** -- This has a method for showing and hiding a given page.  It also has a switch that knows to build a page's html if it needs to.
+ **Controller.js** -- This file sets global variables and initializes the app.  Maybe that means instantiating some jQuery plugins, but it mostly consists of binding all the events that your buttons will be performing.

####Adding a page to your app.
- Add a div to the html file.  It should have an id='pageName'
- Add a .pageName() method to Build.js if that page needs to be rendered dynamically.  Otherwise the static html could simply go in that div you just made.
- Add the switch case to the Route.go method.
- Add any eventlisteners to the controller.  You can now visit that page by calling Route.go('pageName');

####Dependancies
Just jQuery really, and it would be very trivial to remove that.  I'm using a few basic operations like .addClass and .on.  It should be very easy to swap in something more lightweight like Zepto or just code them natively in Javascript if you needed to.

I pre-loaded jQuery, Underscore, XDate and List.js into the repo because I think they're all pretty rad.  I think nearly any JS Webapp could make use of them. 
