Pretzel.js
==========

A hollow, transparent shell of a Javascript application.  A non-framework.  Barely anything.


A litle context.
-------------
Full-blown Javascript applications are now super popular.  And there are many hyper-oppinionated people on the correct way to build one.  There are also an absurd number of tools to make this possible.  In my experience, a lot of these frameworks require an intense investment of time to wrap your head around.  And most people simply don't need 90% of what they have to offer.  Especially when you're just starting out.  I read about Backbone.  I looked into Ember and Angular.  I just couldn't really get on board.  They felt so verbose.  So I just did it my own way.

Pretzel.js tries to get rid of that overhead without adding any of its own. Its *aware* of what MVC is, but it didn't pay attention very well.  It just wants to add a little structure and coherance to your life.  Prevent your app from getting too messy once its more than a few hundred lines.  It's a place to start.

How to use it.
-------------
Well there's an index page, and that's the only html file you'll likely need.  Each page should have its own div with a corresponding id, like so.  

It kicks everything off by firing Controller.init() when the document is ready to do so.

Then there are four Javascript files in the /module folder.  This is what will be fleshed out as you write your app.
+ **Helper.js** -- Put helper functions here.  Maybe you need a simple function to generate an ID number, or a format a phone number, or display a timestamp to human eyes.  Stuff like that.
+ **Model.js** -- This is where data will be retrieved.  Depending on your app, there's a few different ways to approach this.  But they are basically all boiled down to .get() and .set() methods.  
+ **Build.js** -- Each page that must be rendered dynamically 
+ **Controller.js** -- This file sets global variables and initializes the app.  Maybe that means instantiating some jQuery plugins, but it mostly consists of binding all the verbs that your buttons will be performing.

Dependancies
-------------
Just jQuery really, and it would be very trivial to remove that.  I'm using a few basic operations like .addClass and .on.  It should be very easy to swap in something more lightweight like Zepto or just code them natively in Javascript if you needed to.

I pre-loaded jQuery, Underscore, XDate and List.js into the repo because I think they're all pretty rad.  I think nearly any JS Webapp could make use of them. 
