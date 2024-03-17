# _toggle
Simple toggle management using htmx attributes. This library is pre-alpha and should not be used as is.

## Dependencies
* [_dom](dom.md) - for getting toggle attributes

## Usage

```javascript
new _toggle({ elem: '#elementId' }).toggle( '#elementId' );
```

## Methods

### .autotoggle()
Searches the DOM for all `.autotoggle` elements and sets the toggle state using `.setToggle()`;

### .setToggle()
Queries `data-state` and either calls `.switchOn()` or `.switchOff()`

### .toggle()
Synonym for `.switch()`

### .switch()
Queries `data-state` to get current state and then calls the opposite method for setting.

### .switchOn()
Updates `data-state` to 1 and sets the appropriate CSS class based on `data-toggle-on-class` of the element

### .switchOff()
Updates `data-state` to 0 and sets the appropriate CSS class based on `data-toggle-off-class` of the element

### .toggleAllOn( 'selector' ) .toggleAllOff( 'selector' )
Using the selector, each element's `data-state` is updated appropriately and then `.setToggle()` is called on the element for processing the on and off classes.