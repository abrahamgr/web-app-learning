# Recomendations

- [HTML](#HTML)
- [DOM manipulation](#DOM_manipulation)

## HTML

### \<a>

#### External links

Use `target` property with `_blank` to open external link in other tab.

```html
<a
  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
  target="_blank"
  >Docs</a
>
```

#### Elements in the same page

Use `id` of headings.

```html
<a href="#title">Title</a>

<h1 id="title">This is my title</h1>
```

#### Linking to phone numbers or emails

This will open App to call or send email.
Prepend `mailto:[email]` or `tel:[phone number]`.

```html
<a heref="tel:+528110123456">call me</a>
<a heref="mailto:+528110123456">contact me</a>
```

Rendered as: [call me](tel:+528110123456) and [contact me](mailto:+528110123456).

### \<table>

For responsive designs tables are not responsive, use only when we cannot achieve designs required.

### \<form>

- Each `input` should be related to a `label` by the `id` and `for` properties respectively or wrap the `input` with the `label`, so when you click on the label the input will be focused.
- Add `button` of type `submit` to handle validations and user hit `enter` submit the form.
- Use the `required` attribute to make fields as required

```html
<label></label>
```

### \<img>

Each image should have `alt` attribute to describe the image.

## DOM manipulation

[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) manipulation is the old way to create Web Applications, right know most of the apps use Libraries or Framewokd to create rich and interactive content.

### Find elements

- [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [getElementsByName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName)
- [getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)
  [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

- [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

### Create elements

- [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

```js
const paragraph = document.createElement('p');
paragraph.innerText = 'Hi from DOM manipulation';
document.body.appendChild(paragraph);
```

You can attach events on the `onload` function

```html
<script>
  window.onload = function () {
    const paragraph = document.createElement('p');
    paragraph.innerText = 'Hi from DOM manipulation';
    document.body.appendChild(paragraph);
  };
</script>
```

### Attach events

You can attach events to any element in the DOM using [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

```js
function onButtonClick(e) {
  // used to prevent default behavior, it might be used or not
  e.preventDefault();
  console.log('button clicked!');
}

const button = document.getElementById('save');
button.addEventListener('onclick', onButtonClick);
```
