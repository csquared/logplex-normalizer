# Logplex Normalizer

You may have read the docs on Heroku Logplex drains, but they're
a lie. When you create a logplex drain it posts erlang-formatted
strings to your app. This means there's a header of metadata, a dash,
and then your logline.

This package provides a Transform stream that turns the metadata
into logfmt-style data. If your logline is in logfmt format you
can parse one uniform string of data instead of having to split
the string every time.

## example

Heroku posts:

     256 <158>1 2014-06-11T03:48:40.705145+00:00 host heroku router - at=info method=PUT

You get:

    timestamp=2014-06-11T03:48:40.705145+00:00 host=heroku source=router at=info method=PUT

## usage

```javascript
var normalizer = require('logplex-normalizer');
```

### Single Line

```javascript
var line     = '256 <158>1 2014-06-11T03:48:40.705145+00:00 host heroku router - at=info method=PUT';
var normalized = normalizer.transform(line);
```

### Streaming

```javascript
req.pipe(normalizer.stream()).pipe(process.stdout);
```
