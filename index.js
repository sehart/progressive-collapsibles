+(function(global) {
  'use strict';

  var extend = require('xtend');

  // Helpers
  var globalCounter = 0,

      isExpanded = function isExpanded(el) {
        return el.getAttribute('aria-expanded');
      },

      collapseToggle = function collapseToggle(el, panel) {
        var state = isExpanded(el) === 'true' ? false : true;
        // var $panel = $( '#' + $el.attr('aria-controls') );
        el.setAttribute('aria-expanded', state);
        panel.setAttribute('aria-hidden', !state);
      };

  // Collapsible creation
  var collapsible = function collapsible(el, options) {

    var settings = extend({
          idRoot : 'collapsible',
          initialShow : false,
          buttonElement : 'button',
          buttonClass : 'toggle',
          panelId : '',
          panelClass : 'collapsible',
          createButton : true,
          beforeToggle: function() {},
          afterToggle: function() {},
          preventDefault: true
        }, options),

        panel = (settings.panelId !== '') ? document.getElementById( settings.panelId ) : el.nextElementSibling,
        id = settings.panelId || settings.idRoot + '-' + globalCounter,
        button,

        isEnabled = false,

        // Private
        handleToggle = function handleToggle(e) {
          if (settings.preventDefault) {
            e.preventDefault();
          }

          settings['beforeToggle'].call(button, e, panel);

          collapseToggle( button, panel );

          settings['afterToggle'].call(button, e, panel);
        },

        // Public
        destroy = function destroy() {

          panel.removeAttribute('aria-hidden');
          panel.classList.remove(settings.panelClass);

          if (settings.createButton) {
            el.innerHTML = button.innerHTML;
          } else {
            button.removeAttribute('aria-expanded');
            button.removeAttribute('aria-controls');
            button.removeEventListener('click', handleToggle);
          };

          isEnabled = false;
          
        },

        // Public
        getState = function getState() {
          return isEnabled;
        },

        // Public
        setup = function setup() {

          // Prevent duplicating nastiness
          if (!getState()) {

            panel.setAttribute('id', id);
            panel.setAttribute('aria-hidden', !settings.initialShow);
            panel.classList.add(settings.panelClass);

            if (settings.createButton) {
              button = document.createElement( settings.buttonElement );
              
              el.appendChild(button);

              // Move through each child node of the element, and add to button till we get to the button
              while (el.firstChild !== button) {
                button.appendChild(el.firstChild);
              }

              button = el.querySelector('button');

            } else {
              button = el;
            }  

            button.classList.add( settings.buttonClass );
            button.setAttribute('aria-expanded', settings.initialShow);
            button.setAttribute('aria-controls', id);

            button.addEventListener('click', handleToggle);

            isEnabled = true;

          }
                
        };

    // If we have a valid element, then get to work
    if (el) {

      // Initial Setup
      setup();

      globalCounter += 1;

      return {
        setup: setup,
        destroy: destroy,
        getState: getState
      };

    } else {

      return 'Unable to find element.'

    };
   
  };

  global.collapsible = collapsible;
  if (typeof module !== 'undefined' && module.exports) module.exports = collapsible;

})(this);