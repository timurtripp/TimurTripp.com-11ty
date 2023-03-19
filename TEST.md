# Template Markdown Test File

This is intended as a quick reference and showcase. For more complete info, see [John Gruber's original spec](http://daringfireball.net/projects/markdown/) and the [Github Markdown info page](https://docs.github.com/en/get-started/writing-on-github).

##### Table of Contents  
- [Headers](#headers)  
- [Emphasis](#emphasis)  
- [Lists](#lists)  
- [Links](#links)  
- [Images](#images)  
- [Code](#code)  
- [Blockquotes](#blockquotes)  
- [Table](#table)  
- [Horizontal Rule](#horizontal-rule)  
- [Line Breaks](#line-breaks)  

## Headers

```markdown
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
```

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

## Emphasis

```markdown
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

~~Strikethrough~~ text
```

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

~~Strikethrough~~ text

## Lists

```markdown
1. First ordered list item
2. Another item
    * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
    1. Ordered sub-list
4. And another item.  
    Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1. First ordered list item
2. Another item
    * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
    1. Ordered sub-list
4. And another item.  
    Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses

## Links

There are two ways to create links.

```markdown
[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself][]

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself][]

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

## Images

```markdown
Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
```

Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

## Code

Code blocks are part of the Markdown spec, but syntax highlighting isn't. However, many renderers support syntax highlighting. [Syntax highlighting for 11ty](https://www.11ty.dev/docs/plugins/syntaxhighlight/) is provided by the [PrismJS](https://github.com/PrismJS/) plugin.

```markdown
Inline `code` has `back-ticks around` it.
```

Inline `code` has `back-ticks around` it.

Blocks of code are either fenced by lines with three back-ticks <code>```</code>, or are indented with four spaces.

`````markdown
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```
`````

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```

## Blockquotes

```markdown
> Blockquotes are neat.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 
```

> Blockquotes are neat.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

## Table

First Header | Second Header | Third Header | Fourth Header
------------ | ------------- | ------------ | -------------
Content Cell | Content Cell  | Content Cell | Content Cell
Content Cell | Content Cell  | Content Cell | Content Cell

## Horizontal Rule

```markdown
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

## Line Breaks

```markdown
With only a single newline, this line and
this line will be a *single line*.

But this one is separated by two newlines and so will be a *separate paragraph*.

This line has two spaces at the end (hard for you to see, but trust me!).  
So this is a separate line in the *same paragraph*.
```

With only a single newline, this line and
this line will be a *single line*.

But this one is separated by two newlines and so will be a *separate paragraph*.

This line has two spaces at the end (hard for you to see, but trust me!).  
So this is a separate line in the *same paragraph*.
