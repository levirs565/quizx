export default {
  title: "Controls"
}

export const textInput = () => 
`
<input type="text" class="text-area">
`

export const textArea = () => 
`
<textarea class="text-area"></textarea>
`

export const radio = () =>
`
<div>
<label class="radio-button">
  <input type="radio" value="1" name="radio">
  <span></span>
</label>

<label class="radio-button">
  <input type="radio" value="2" name="radio">
  <span></span>
</label>

<label class="radio-button">
  <input type="radio" value="3" name="radio">
  <span></span>
</label>
<div>
`

export const radioText = () =>
`
<div>
<label class="radio">
  <span class="radio-button">
    <input type="radio" value="1" name="radio">
    <span></span>
  </span>
  <p class="radio-text">One</p>
</label>

<label class="radio">
  <span class="radio-button">
    <input type="radio" value="2" name="radio">
    <span></span>
  </span>
  <p class="radio-text">Two</p>
</label>

<label class="radio">
  <span class="radio-button">
    <input type="radio" value="3" name="radio">
    <span></span>
  </span>
  <p class="radio-text">Three<br>Test<br>Test</p>
</label>

<div>
`


export const radioTextArea = () =>
`
<div>
<label class="radio">
  <span class="radio-button">
    <input type="radio" value="1" name="radio">
    <span></span>
  </span>
  <textarea class="text-area">One</textarea>
</div>
<div>
`
