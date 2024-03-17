# _cal
A flexible calendar class that can create and display a full calendar. This library is touchy and needs to be shored up with better naming, recovery and logic. PRomises are not always returned when required.

## Dependencies
* [_jig](jig.md) - for using the growl template

## Usage

```javascript
new _growl({ msg: 'string', type: 'error|info|success|warning' });
// returns this.growl();
```

## Methods

### .growl()
It is not necessary to call .growl() explicitly.  The constructor returns the result of .growl(); This method keeps track of the count of growls that are already in the DOM, increments on new growl, uses [_jig](jig.md) to load `#growl_tpl` with `_opts`, set a timeout on the growl and display it.

## Returns
* none