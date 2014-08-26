/*
    jqueryBEM.js
    version 0.0.1
    
    Provides a simple jQuery API for interacting with BEM classes.

    Copyright 2014 Josh Bambrick
    http://joshbambrick.com/

    Github
    http://github.com/joshbambrick/jqueryBEM
    
    Licensed under the MIT license:
    http://www.opensource.org/licenses/mit-license.php

*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(this.$);
    }
}(function ($) {
    var whiteSpace = /[\s\uFEFF\xA0]+/;

    $.fn.addBEMClass = function (className) {
        var className = $.trim(className);

        if (whiteSpace.test(className)) throw 'Invalid BEM class name.';

        return this.each(function () {
            var $this = $(this), oldBEMClassName = $this.data('BEMClassName');
            
            if (oldBEMClassName && oldBEMClassName !== className) throw 'BEM class name already set to ' + oldBEMClassName + '.';
            
            if (className !== '') {
                $this
                    .data({BEMClassName: className})
                    .addClass(className);
            }
        });
    };

    $.fn.removeBEMClass = function (classToRemove) {
        var classToRemove = $.trim(classToRemove);

        if (whiteSpace.test(classToRemove)) throw 'Invalid BEM class name.';

        return this.each(function () {
            var $this = $(this), classes = $.trim($this.attr('class')).split(/\s+/), curClassIndex;
            
            if ($this.data('BEMClassName') === classToRemove) {
                for (curClassIndex = 0; curClassIndex < classes.length; curClassIndex += 1) {
                    if ((new RegExp(classToRemove + '(--.*)?')).test(classes[curClassIndex])) {
                        $this.removeClass(classes[curClassIndex]);
                    }
                }

                $this.data({BEMClassName: null});
            }
        });
    };
    
    $.fn.addBEMSuffix = function (suffix) {
        var suffices = $.trim(suffix).split(whiteSpace);

        return this.each(function () {
            var $this = $(this), BEMClassName = $this.data('BEMClassName'), curSuffixIndex;
            
            if (!BEMClassName) throw 'No BEM class name set.';
            
            for (curSuffixIndex = 0; curSuffixIndex < suffices.length; curSuffixIndex += 1) {
                if (suffices[curSuffixIndex] !== '') {
                    $this.addClass(BEMClassName + '--' + suffices[curSuffixIndex]);
                }
            }
        });
    };

    $.fn.removeBEMSuffix = function (suffix) {
        var suffices = $.trim(suffix).split(whiteSpace);

        return this.each(function () {
            var $this = $(this), BEMClassName = $this.data('BEMClassName'), curSuffixIndex;

            if (BEMClassName) {
                for (curSuffixIndex = 0; curSuffixIndex < suffices.length; curSuffixIndex += 1) {
                    if (suffices[curSuffixIndex] !== '') {
                        $this.removeClass(BEMClassName + '--' + suffices[curSuffixIndex]);
                    }
                }
            }
        });
    };

    $.fn.hasBEMSuffix = function (suffix) {
        var BEMClassName = this.data('BEMClassName');

        suffix = $.trim(suffix);

        if (whiteSpace.test(suffix)) throw 'Invalid BEM suffix provided.'

        return (!!BEMClassName && this.hasClass(BEMClassName + '--' + suffix));
    };

    $.fn.toggleBEMSuffix = function (suffix) {
        var suffices = $.trim(suffix).split(whiteSpace);

        return this.each(function () {
            var $this = $(this), curSuffixIndex, BEMClassName = $this.data('BEMClassName');

            if (BEMClassName) {
                for (curSuffixIndex = 0; curSuffixIndex < suffices.length; curSuffixIndex += 1) {
                    $this[$this.hasBEMSuffix(suffices[curSuffixIndex]) ? 'removeBEMSuffix' : 'addBEMSuffix'](suffices[curSuffixIndex]);
                }
            }
        });
    };
}));