# htmx-set
A small set of js htmx classes for common use cases. These came from a project that required maintaining existing functionality in a web app while adding new more performant enhancements/alternatives. There is a lot of console logging and probably even some references to missing libraries/modules. There are also some magic variables and configuration options.

## _api
A standard interface for remote api calls (or really any remote call). **Uses jQuery $.ajax() but will be converted to use native browser fetch api**

### Methods
* .poll()

## _auth
A standard interface for use within a bearer token design pattern. The password auth endpoint is hard-coded and should be changed before using.

### Methods
* .auth()
* .register()
* .logout()

## _cal
A flexible calendar class that can create and display a full calendar

### Methods
* .autocal()
* .prevMonth()
* .nextMonth()
* .prevYear()
* .nextYear()
* .init()

## _dom
For reliably and cleanly setting and getting of data-* attributes on an element. No camelCase to dash-case conversions necessary. No jQuery required.

## _file (incomplete)
The start of a standard interface to managing files for upload

### Methods
* .read()
* .formatBytes()

## _form
A standard interface for creating fields for a form from a remote endpoint, populating a form from an object or array parameter and safely sending formData via async jQuery ajax (should probably use _api)

### Methods
* .autoform()
* .setup()
* .send()
* .popForm()
* .resetForm()
* .getFormData()

## _growl
A standard interface for displaying growls/toasts. Uses bootstrap classes for msg types.

```javascript
new growl({ msg: 'string', type: 'string' }); // automatically sends this message to #growl_container
```

### Methods
* .growl() _// Not completely implemented_

## _jig
A template management class that allows for remote loading of tpl content, population of tpl content with array/object parameter with post population conformance

### Methods
* .autotpl()
* .fetchTpl() _// uses \_api_
* .popTpl()
* .postPop()

## _loader
_loader remote fetches content based on element attributes, hydrates from remote endpoint and marges values into tpl snippets for DOM injection

### Methods
* .autoload()
* .load( elementId )

## _store
For managing localStorage for uniformly.  All complex data types are JSON.stringify() before storage and JSON.parse() on retrieval

### Methods
* .put()
* .fetch()
* .del()
* .clear()

## _table
Allows sophisticated filtering, sorting and column display for any standard table or table-like structure (such as a flexbox ul). Correct sorting for numeric values.

### Methods
* .autotable()
* .initTable()
* .render()
* .openFilters() _// For column value display to hide/show rows by value_
* .filter()
* .openPrefs() _// For managing which columns to show/hide_
* .sortCol()
* .toggleHiddenCol()
* .updateHiddenColToggle()

## _toggle
Simple toggle management using htmx attributes

### Methods
* .autotoggle() _// for setting correct toggle state on initial display from attribute_
* .setToggle()
* .switch() .toggle() _// synonyms_
* .switchOff()
* .switchOn()
* .toggleAllOn()
* .toggleAllOff()
