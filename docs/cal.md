# _cal
A flexible calendar class that can create and display a full calendar. This library is touchy and needs to be shored up with better naming, recovery and logic. PRomises are not always returned when required.

## Dependencies
* [momentjs](https://momentjs.com/) - for managing dates and times.  **momentjs is deprecated and will be replaced with native handling**
* [_dom](dom.md) - for `data-*`;
* [_api](api.md) - for making the remote call to get calendar events
* [_jig](jig.md) - for using templates to hydrate days

## Usage

```javascript
new _cal({ cal_id: '#calId' }).init();
```

## Methods

### .autocal()
Searches for .autocal and calls init() for each found element

### .init()
Searches for `data-cal-month` and sets all proper attributes for dates in the month such as `data-cal-day`.  Using `data-cal-tpl`, hydrates each day with the proper layout and markings. It then calls an endpoint from `data-src` for querying calendar events.

### .prevMonth() .nextMonth() .prevYear() .nextYear()
When called, does the math and re-inits the calendar with proper date links. It also calls the `data-src` for calendar events in new time window.

## Returns
* Inconsistent returns