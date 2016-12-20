# Progressive Collapsibles

Vanilla JS Collapsibles, based on [@heydonworks](https://twitter.com/heydonworks) progressive collapsibles:

http://heydonworks.com/practical_aria_examples/#progressive-collapsibles

Tested in IE11 and modern versions of Chrome, Firefox, Safari, Mobile Safari and Android

## Basic Usage
In your HTML, the content you wish to hide should immediately follow the element that will be used as the toggle. The elements themselves shouldn't matter, just be sure it is semantically correct and follows your document flow. The actual toggle button will be created with Javascript.

*Note: If your HTML structure needs to be different, you can define your own collapsible panel with the 'panelId' parameter.* 

    <style>
	    [aria-hidden=true] { display:none; }
    </style>
    
    <h2 id="toggleHeading">Collapsible Section</h2>
    <ul>
	    <li>List Item</li>
	    <li>List Item</li>
	    <li>List Item</li>
    </ul>

    <script src='progressive-collapsibles.min.js'></script>
    <script>
	    var el = document.getElementById('toggleHeading');
	    collapsible(el)
    </script>

HTML after the script runs:

    <h2 id="toggleHeading">
	    <button class="toggle" aria-expanded="false" aria-controls="collapsible-0">Collapsible Section</button>
	</h2>
    <ul id="collapsible-0" aria-hidden="true">
	    <li>List Item</li>
	    <li>List Item</li>
	    <li>List Item</li>
    </ul>
    

## Configuration Options
Defaults shown:

    var opts ={
	    idRoot : 'collapsible', // id used to build the collapsible panel ids
	    initialShow : false, // set to 'true' to show content initially
	    buttonElement : 'button', // Change the html element used for the toggle
	    buttonClass : 'toggle', // Class added to button element
	    panelId : '', // Used when your content does not follow your toggle heading
	    panelClass : 'collapsible', // Class added to the collapsible content element
	    createButton : true, // Set to false if you want the element itself to be the toggle (for example, if you are starting with a button)
	    beforeToggle: function() {}, // Callback before our hide/show toggle
	    afterToggle: function() {}, // Callback after our hide/show toggle
	    preventDefault: true // Set to false if you need default behavior
    }

## Public Methods

### destroy()
Gracefully disable an existing collapsible.

### getState()
Returns true if collapsible is active and functioning, false if it's been disabled using destroy().

### setup()
Used to reinitialize the collapsible after destroy().