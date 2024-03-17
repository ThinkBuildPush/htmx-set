# _loader
A template management class that allows for remote loading of tpl content, population of tpl content with array/object parameter with post population hydration

## Dependencies
* [_form](form.md) - for hydrating selects
* [_table](table.md) - for hydrating selects
* [_toggle](toggle.md) - for hydrating selects
* [_api](api.md) - for making the remote call to get form fields for creating forms dynamically

## Usage

```javascript
/**
 * The populate option is where the template content will be injected when the tpl and the data are merged.
 * This allows you to reuse the same loader values for a different injection location.
 */
new _loader({
	src: '',
	tpl: 'tplName',
	populate: '#elementId',
	default_value: '-',
	load_in: '#nowhere'
})
.load( '#elementId' );
```

## Methods

### .autoload()
Searches the DOM for all `.autoload` elements and passes the elementId to `new _loader({}).load( '#elementId' )`;

### .load( '#elementId' )
Validates the following data-* attributes on the elementId (or passed in via `this.opts.data`):
* src
* tpl
* populate
* when-empty _// optional_

If the passed element id is actually a class selector, load will foreach through the elements with that class and process them individually via `.load()`.

The special class `.keep` preserves any elements when loader injects new content into a loader container.  For example, if you wanted an autoload select to always have the first option be an empty value with a label of 'Select', you could add this class to that option.
`<option value="" class="keep">Select</option>

A (hard-coded) spinner is injected into the container until the remote data is fetched.  Then the remote data is processed item by item and merged with the tpl for injection into the `this.opts.populate` parameter.

The [_jig](jig.md) `.postPop()` method is called after each injection.