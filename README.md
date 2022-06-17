# webroukBackTopScrollIndicator

Webrouk Back Top Scroll Indicator is a lightweight native JavaScript web component for smooth back to top button with a circular progress bar which indicates the current reading progress when scrolling down/up the webpage.

- No dependencies
- Lightweight
- Hides on top
- Smooth Scroll

### Demo
---
[CodePen Example](https://codepen.io/muhammad_mabrouk/full/oNoYQdr/)

### Installation
---
Use [NPM](https://www.npmjs.com/package/webrouk-back-top-scroll-indicator/) to download and install it directly in to your project

```sh
$ npm install webrouk-back-top-scroll-indicator --save
```

or include js file manually

```html
<!-- webrouk-back-top-scroll-indicator component file -->
<script src="webrouk-back-top-scroll-indicator.js"></script>
```

### Usage
---
Using webroukBackTopScrollIndicator is simple.

```html
<webrouk-back-top-scroll-indicator
  title="Back to Top"
  show-at="50">
</webrouk-back-top-scroll-indicator>
```

### Options
| Option | Type | Description | Default |
| ----------- |    :----:   | ----------- |    :----:   |
| show-at | `string` | Show the button at y position | `50` |

### Style Customization
---
Expected CSS Variables from inside the component (optional).

```css
webrouk-back-top-scroll-indicator {
  --w-primary-color: 218, 95%, 54%; /* HSL color values without the brackets */
  --w-diameter-size: 46px;
}
```

### Styleable Component Parts
---
- button
- svg
- path

#### Example:

```css
webrouk-custom-select::part(button) { /* some styles ... */ }

webrouk-custom-select::part(svg) { /* some styles ... */ }

webrouk-custom-select::part(path) { /* some styles ... */ }
```

### License
-------
webroukBackTopScrollIndicator is licensed [MIT](https://choosealicense.com/licenses/mit/).
It can be used for free and without any attribution, in any personal or commercial project.
