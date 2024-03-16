A standard interface for creating fields for a form from a remote endpoint, populating a form from an object or array parameter and safely sending formData via async jQuery ajax. **Uses jQuery $.ajax() but will be converted to use _api**

## Dependencies
* [_loader](loader.md) - for hydrating selects
* [_api](api.md) - for making the remote call to get form fields for creating forms dynamically
* [momentjs](https://momentjs.com/) - for setting timestamps in value selections  **momentjs is deprecated and will be replaced with native handling**
* [_store](store.md) - for getting auth_token for ajax call. Should be updated to use _api

## Usage

```javascript
// You do not need to call .setup() because it will be done as part of the instantiation.
// Only '#formId' is strictly required
new _form({
	form_id: '#formId',
	method: 'HTTP_VERB',
	action: '/api/endpoint',
	data: new Array(),
	autoform: true|false
});
```

## Methods

### .autoform()
Searches the DOM for all `.autoload` elements, queries the `data-*` for state, remote calls a (hard-coded) endpoint to get all fields for the form and then creates new input elements for each form accordng to its type, requiredness and default value.

### .setup()
Confirms `#formId` exists in DOM, that it has a method and an action if they are not supplied in `_opts`.

### .createForm()
Not implemented

### .popForm()
Hydrates form field values or selects dropdown item based on passed data array|object.

### .validate()
Currently only validates required fields and returns true or false depending on whether values are missing.  Should return a promise with field names that are missing values.

### .send()
Validates form, creates payload using .getFormData(), sets the appropriate headers and submits the form for backend processing. Returns appropriate promises for form submission based on http_status_code.

### .getFormData()
Serializes the form into an array and then deconstructs the serialization into standard array format.

### .resetForm()
Resets form and deletes values in hidden inputs.
