# _auth

A standard class that adds bearer token automatically for remote authentication. It can also gather form data automatically for direct passing to authentication endpoint.

## Dependencies
* [_store](store.md) - for clearing and setting auth_token in localStorage
* [_form](form.md) - for getting formData automatically for delivery via `_api({ data: formData })`;
* [_api](api.md) - for making the remote call to the password grant endpoint

## Usage

```javascript
// if !#form_id, use login & password params
// If !login || !password, use #form_id
new _auth({ form_id: '#formId'|null, login: 'string'|null, password: 'string'|null })
	.auth() // if form_id, formData is gathered using new _form({})
	.then(
		( return ) =>
		{
			workYourFu();
		}
	)
	.catch(
		( return ) =>
		{
			alertYourPeople();
		}
	);
```

## Methods

### .auth()
Grabs formData, uses [_api](api.md) to call password auth endpoint (currently hard-coded), stores received auth_token using [_store](store.md), sets auth_token cookie to same value for backend checks

### .logout()
Uses [_store](store.md) to remove all auth_token params, remove the auth_token cookie and redirects to hard-coded url. This could be put into _opts for flexibility.

## Returns
* Resolved promise on successful authentication
* Rejected promise with status and error thrown