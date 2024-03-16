A standard interface for remote api calls (or really any remote call). **Uses jQuery $.ajax() but will be converted to use native browser fetch api**

## Dependencies
* [_store](store.md) - for retrieving auth_token in localStorage
* [jQuery](https://api.jquery.com/jQuery.ajax/) - for performaing remote call; will be deprecated for native browser [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Usage

```javascript
new _api({
        url: '/api/endpoint/or/url',
        method: 'POST|HTTP_VERB',
        data: new Array(),
        force_fetch: true|false
    })
    .poll()
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

// Pagination Example
let data = [];
let poller = new _api({ url: '/paginated/endpoint/next-page' })
    .poll()
    .then(
        ( returned_data )=>
        {
            data.push( returned_data );
        }
    )
    .catch(
        ( _returned_data ) =>
        {
            // Do nothing or
            return false;
        }
    );

let get_data = 1;
while( get_data )
{
    poller.poll()
    .then(
        ( returned_data )=>
        {
            data.push( returned_data );
        }
    )
    .catch(
        ( _returned_data ) =>
        {
            get_data = 0;
        }
    );
}

return data;
```

## Methods

### .poll()
Polling means the class will repeat the remote call with supplied values. Each call to this method will attempt to call the supplied url and parse the response. This can be helpful for things like pagination (see above) or long polling.

If !`auth_token`, the poll will still execute, just without an `auth_token` header.  This is to allow `_api` to be used for content fetching for unauthenticated users/contexts.

If the poll is 200, it checks for a new auth_token (in case the action logs the user in) and uses [_store](store.md) to put auth_token in localStorage

## Returns
* Resolved promise with complete returned data or complete xhr
* Rejected promise with suitable message