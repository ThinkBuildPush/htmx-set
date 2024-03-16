For reliably and cleanly setting and getting of data-* attributes on an element. No camelCase to dash-case conversions necessary. All methods are static.

## Dependencies
None

## Usage

```javascript
// Uses the format for document.getElementById( 'elementId' ).dataset['camelCaseName' ];
// '#' in element id is optional
_dom.getData( '#elementId', 'attributeName' );
```

## Methods

### .getData( '#elementId', 'attributeName' )
Does what it says on the tin.

### .setData( '#elementId', 'attributeName', 'value' )
Does what it says on the tin.

## Returns
* getData() returns the data found in supplied attribute
* setData() return false if element is missing, the supplied value if correctly set.