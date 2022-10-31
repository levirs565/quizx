import { renderMathInElement } from "mathlive";
import "mathlive/dist/mathlive-fonts.css";

class MathInlineElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  private render() {
    this.innerHTML = `\\(${this.getAttribute("src")}\\)`;
    renderMathInElement(this);
  }
  attributeChangedCallback(name: string) {
    if (name == "src") this.render();
  }
  static get observedAttributes() {
    return ["src"];
  }
}

class MathBlockElement extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.render();
  }
  private render() {
    this.innerHTML = `\\[${this.getAttribute("src")}\\]`;
    renderMathInElement(this);
  }
  attributeChangedCallback(name: string) {
    if (name == "src") this.render();
  }
  static get observedAttributes() {
    return ["src"];
  }
}

customElements.define("math-inline", MathInlineElement);
customElements.define("math-block", MathBlockElement);
