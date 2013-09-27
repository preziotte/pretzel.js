Pretzel.js
==========

A hollow, transparent shell of a Javascript application.  A non-framework.  Barely anything.


A litle context.
-------------
Full-blown Javascript applications are super popular now and there are many hyper-oppinionated people who believe they know the right way build one.  There are also an absurd number of tools to make this possible now.  I've found it overwhelming.  And paralyzing.  In my experience, these frameworks require an intense investment of time to wrap your head around.  I really dont think most people need 90% of what they have to offer.  Especially when you're just starting out.  I think it's important to have your head wrapped around your own project.  Not to feel like a cog in your own machine.  I read about Backbone.  I looked into Ember and Angular.  They all terrified me.  They felt so verbose.  I ended up making this instead.

Pretzel.js tries to get rid of the overhead of making a web app without adding any of its own.  Its *aware* of what MVC is, but it didn't pay attention very well.  It just wants to add a little structure and coherance to your life.  Prevent your app from getting too convoluted and messy when its more than a few hundred lines.  It's a place to start.

How to use it.
-------------
Well there's an index page, and that's the only html file you'll likely need.  Each page should have its own div with a corresponding id, like so.  

When the document is ready to do so, everything gets kicked off by firing Controller.init().

Then there are five Javascript files in the /module folder.  This is what will be fleshed out as you write your app.
+ **Helper.js** -- Put helper methods here.  Maybe you need a simple function to generate an ID number.  Or format a phone number.  Stuff like that.
+ **Model.js** -- This is where data will be retrieved and saved.  This should vary depending on what your app does, but it'll largely boil down to .get() and .set() methods.  
+ **Build.js** -- Each page that must be rendered dynamically has its own method here.  It grabs its data from the Model and spits out the html.
+ **Route.js** -- This has a method for showing and hiding a given page.  It also has a switch that knows to build a page's html if it needs to.
+ **Controller.js** -- This file sets global variables and initializes the app.  Maybe that means instantiating some jQuery plugins, but it mostly consists of binding all the events that your buttons will be performing.

Adding a page to your app.
-------------
- Add a div to the html file.  It should have an id='pageName'
- Add a .pageName() method to Build.js if that page needs to be rendered dynamically.  Otherwise the static html could simply go in that div you just made.
- Add the switch case to the Route.go method.
- Add any eventlisteners to the controller.  You can now visit that page by calling Route.go('pageName');

Dependancies
-------------
Just jQuery really, and it would be very trivial to remove that.  I'm using a few basic operations like .addClass and .on.  It should be very easy to swap in something more lightweight like Zepto or just code them natively in Javascript if you needed to.

I pre-loaded jQuery, Underscore, XDate and List.js into the repo because I think they're all pretty rad.  I think nearly any JS Webapp could make use of them. 
