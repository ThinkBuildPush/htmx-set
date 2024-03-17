# _store
For managing localStorage more uniformly. All complex data types are JSON.stringify() before storage and JSON.parse() on retrieval. This is mostly a simple wrapper to localStorage to make conversion a bit easier but will grow to add more sophistciated search, storage options and retrieval.

## Dependencies
None

## Usage

```javascript
new _store({}).del( 'key' );
new _store({}).put( 'key', 'value' );
new _store({}).clear();
new _store({}).fetch( 'key' );
```

## Methods

### .del( 'key' )
`localStorage.removeItem( 'key' );`

### .put( 'key', 'value' )
`localStorage.setItem( 'key', 'value' );` All values are automatically JSON.stringify to avoid errors.

### .clear()
`localStorage.clear;`

### .fetch( 'key' )
`localStorage.getItem( 'key' );` Because something else could have updated the localStorage values in between _store uses, a try attempts to JSON.parse the value and on failure simply return the value as gotten.

