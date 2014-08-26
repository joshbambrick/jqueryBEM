# jQuery BEM 0.0.1 #
jQuery BEM provides a simple API to interact with [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) classes using jQuery.

## Usage ##
There are a number of methods provided by this plugin to make it easier to interact with BEM classes.


### addBEMClass ###
Simply call this method on your jQuery object and pass a BEM class to add to the DOM elements. These classes should include the Block and Element (if present).

Only one BEM class may be applied to any given DOM element, calling this method on an element which already has a Block class attached, or passing a BEM class containing white space, will cause and error. These restrictions help enforce BEM best practices.

    // now has class 'body__finger'
    var $appendage = $('<div>').addBEMClass('body__finger');

### removeBEMClass ###
Call this method, passing the BEM class attached to the DOM element in order to remove it. It will also remove all classes that combine this with any suffix.

Calling this method with a class name which is not attached to the DOM element will not cause an error, but passing a class name containing white space will.

To remove the BEM class set above:

    // now has no class
    $appendage.removeBEMClass('body__finger');

### hasBEMClass ###
This method returns a boolean as to whether or not the first DOM element in the jQuery object has the BEM class passed.

Causes an error if the class passed contains white space.
    
    // returns false
    $appendage.hasBEMClass('toe');

### toggleBEMClass ###
Call this method, passing a BEM class (or space-separated list of BEM classes), to be toggled on the DOM elements.

Passing an class containing white space, or causing more than one BEM class to a DOM element, will cause an error to be thrown. The DOM elements and BEM classes will be processed in order.
    
    // now has class 'body__toe'
    $appendage.toggleBEMClass('toe');

### addBEMSuffix ###
Call this method, passing a BEM suffix (or space-separated list of BEM suffices), to be added to the DOM elements.

Calling this method on a where the DOM elements have not had BEM classes added via the `addBEMClass` method will cause an error.

    // now has classes 'body__toe', 'body__toe--left-foot', 'body__toe--middle'
    $appendage.addBEMSuffix('left-foot middle');

### removeBEMSuffix ###
Call this method, passing a BEM suffix (or space-separated list of BEM suffices), to be removed from the DOM elements.

    // now has classes 'body__toe', 'body__toe--middle'
    $appendage.removeBEMSuffix('middle');

### hasBEMSuffix ###
This method returns a boolean as to whether or not the first DOM element in the jQuery object has the suffix passed.

Causes an error if the suffix passed contains white space.
    
    // returns false
    $appendage.hasBEMSuffix('little');

### toggleBEMSuffix ###
Call this method, passing a BEM suffix (or space-separated list of BEM suffices), to be toggled on the DOM elements.

Passing an suffix containing white space will cause an error to be thrown.
    
    // now has classes 'body__toe', 'body__toe--little'
    $appendage.toggleBEMSuffix('little middle');