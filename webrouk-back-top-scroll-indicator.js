const webroukBackTopScrollIndicatorTemplate = document.createElement("template");
webroukBackTopScrollIndicatorTemplate.innerHTML = `
  <style>
    :host,
    :host * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    :host {
      --primary-color-fb: 218, 95%, 54%;
      --diameter-size-fb: 46px;
    
      position: fixed;
      z-index: 1990;
      bottom: 25px;
      height: var(--diameter-size, var(--diameter-size-fb));
      width: var(--diameter-size, var(--diameter-size-fb));
      -webkit-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    :host-context([dir="ltr"]) {
      right: 25px;
    }
    :host-context([dir="rtl"]) {
      left: 25px;
    }
    :host(:not(:host(.show))) {
      visibility: hidden;
      opacity: 0;
      -webkit-transform: translateY(10px);
      -ms-transform: translateY(10px);
      transform: translateY(10px);
    }
    .back-top-btn {
      display: block;
      height: 100%;
      width: 100%;
      background-color: transparent;
      padding: 0;
      border: 0;
      outline: 0;
      border-radius: 50%;
      cursor: pointer;
      -webkit-box-shadow: 0 0 0 2px hsla(var(--primary-color), 25%) inset;
      box-shadow: 0 0 0 2px hsla(var(--primary-color), 25%) inset;
    }
    .back-top-btn svg path {
      fill: none;
      stroke: hsl(var(--primary-color, hsl(var(--primary-color-fb))));
      stroke-width: 5;
    }
    .back-top-btn::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      height: 40%;
      width: 25%;
      background-color: hsl(var(--primary-color, hsl(var(--primary-color-fb))));
      -webkit-clip-path: polygon(0 30%, 50% 0, 100% 30%, 94% 39%, 58% 17%, 58% 100%, 42% 100%, 42% 17%, 6% 39%);
      clip-path: polygon(0 30%, 50% 0, 100% 30%, 94% 39%, 58% 17%, 58% 100%, 42% 100%, 42% 17%, 6% 39%);
    }  
  </style>

  <button part="button" class="back-top-btn">
    <svg part="svg" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path part="path" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </button>
`;

class WebroukBackTopScrollIndicator extends HTMLElement {

  _BTSI_btn;
  _BTSI_progressPath;
  _BTSI_progressPathLength;
  _BTSI_showAt;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(webroukBackTopScrollIndicatorTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._initBackTopScrollIndicator();
    this._BTSI_btn.addEventListener("click", this._onClickingBackTop.bind(this));
    document.addEventListener("scroll", this._onScrollingDocument.bind(this));
  }

  disconnectedCallback() {
    this._BTSI_btn.removeEventListener("click", this._onClickingBackTop);
    document.removeEventListener("scroll", this._onScrollingDocument);
  }

  // initialize back top scroll indicator
  _initBackTopScrollIndicator() {
    this._BTSI_showAt   = this.getAttribute("show-at") || 50;
    this._BTSI_btn = this.shadowRoot.querySelector(".back-top-btn");
    this._BTSI_progressPath = this._BTSI_btn.querySelector("path");
    this._BTSI_progressPathLength = this._BTSI_progressPath.getTotalLength();

    this._BTSI_progressPath.style.strokeDasharray = `${this._BTSI_progressPathLength} ${this._BTSI_progressPathLength}`;
    this._BTSI_progressPath.style.strokeDashoffset = this._BTSI_progressPathLength;

    // actions on scrolling
    this._onScrollingDocument();
  }

  // actions on scrolling
  _onScrollingDocument() {
    const scrollPosition = window.scrollY;
    const pageHeight = document.body.clientHeight - window.innerHeight;
    const scrollProgress = this._BTSI_progressPathLength - (scrollPosition * this._BTSI_progressPathLength) / pageHeight;

    (scrollPosition >= this._BTSI_showAt) ? this.classList.add("show") : this.classList.remove("show");

    this._BTSI_progressPath.style.strokeDashoffset = scrollProgress;
  }

  // actions on clicking back to top button
  _onClickingBackTop() {
    window.scroll({ top: 0, behavior: "smooth" });
  }
}

window.customElements.define("webrouk-back-top-scroll-indicator", WebroukBackTopScrollIndicator);
