# _jig
A template management class that allows for remote loading of tpl content, population of tpl content with array/object parameter with post population hydration

## Dependencies
* [_loader](loader.md) - for loading hypermedia in `.postPop()`
* [_form](form.md) - for setting up forms in `.postPop()`
* [_table](table.md) - for initting tables in `.postPop()`
* [_toggle](toggle.md) - for setting toggle states in `.postPop()`
* [_api](api.md) - for making the remote call to get form fields for creating forms dynamically

## Usage

```javascript
new _jig({
	ldelim: '~~',
	rdelim: '~~',
	data: new Array(),
	tpl: 'tplName',
	default: 'string'
})
.popTpl();
```

## Methods

### .autotpl()
Searches the DOM for all `.autotpl` elements, queries the `data-tpl` for the `#elementId` at either `template#elementId` or `div#elementId`, calls `.fetchTpl()` to get the template hypermedia and injects it into the #elementId container. Also calls `.postPop()` on all new injected elements for standard hydration of autoload, autotpl, autotable, autoform, and autotoggle.

### .fetchTpl()
Uses [_api](api.md) to call (hard-coded) remote endpoint for template content and returns a promise with the template hypermedia.

### .popTpl()
Merges `this.opts.tpl` with the template content from `.fetchTpl()` and `this.opts.data`. Accepts arrays two levels deep. `~~array.key.subkey~~` in a template is a valid selector. Returns interpolated template content.

### .postPop()
In `.autotpl()` after remotely fetching hypermedia, `.postPop()` is called to process any template snippets just prior to injection. The following auto* are processed in this order to ensure the fewest parses of the template. If you wanted to inject template content and delay `.postPop()` until needed, you can simply call `new jig({ tpl: 'tplName' }).fetchTpl();` and then later call `new _jig({ tpl: 'tplName', data: someArray }).postPop()` when ready.

* autoloader
* autoform
* autotable
* autotoggle