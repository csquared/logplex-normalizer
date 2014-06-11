# Logplex Normalizer

You may have read the docs on Heroku Logplex drains, but they're
a lie. When you create a logplex drain it posts erlang-formatted
strings to your app. This means there's a header of metadata, a dash,
and then your logline.

This package provides a Transform stream that turns the metadata
into logfmt-style data. If your logline is in logfmt format you
can parse one uniform string of data instead of having to split
the string every time.
