import{setHTML,addCss,removeCss}from"elements-x";import{animate}from"../animate";import css from"./x-drawer.css";export class XDrawer extends HTMLElement{constructor(...t){const s=super(...t);return this.width,this.height,this._url=location.href,this.classList.remove("x-visible"),this._docClickListener=this.docClickListener.bind(this),this._touchSwipeListener=this.touchSwipeListener.bind(this),s}connectedCallback(){null===this.getAttribute("desktop")&&(this.pos=null!==this.getAttribute("right")?"RIGHT":null!==this.getAttribute("top")?"TOP":null!==this.getAttribute("bottom")?"BOTTOM":"LEFT",this.handle=document.createElement("div"),this.handle.classList.add("x-handle"),this.appendChild(this.handle),addCss(this,css),[this.width,this.height]=[this.offsetWidth,this.offsetHeight],new TouchX(this.handle),document.body.addEventListener("x-swipe",this._touchSwipeListener),document.body.addEventListener("click",this._docClickListener),this.classList.contains("x-visible")||(this.style.transform=this._getHideTransform(0,0,1)))}disconnectedCallback(){removeCss(this),document.body.removeEventListener("x-swipe",this._touchSwipeListener),document.body.removeEventListener("click",this._docClickListener)}_getShowTransform(t,s,i){const[e,h,n]=[this.pos,this.width,this.height],o=["LEFT","RIGHT"].includes(e),a=o?t*(1-i):s*(1-i);return o?`translateX(${a}px)`:`translateY(${a}px)`}_getHideTransform(t,s,i){const[e,h,n]=[this.pos,this.width,this.height],o=["LEFT","RIGHT"].includes(e);let a="LEFT"===e?t+(h+t)*i*-1:"RIGHT"===e?t+(h+t)*i:"TOP"===e?s+(n+s)*i*-1:"BOTTOM"===e?s+(n+s)*i:"";return a="LEFT"===e?Math.max(a,-1*h):"RIGHT"===e?Math.min(a,h):"TOP"===e?Math.max(a,-1*n):"BOTTOM"===e?Math.min(a,n):void 0,o?`translateX(${a}px)`:`translateY(${a}px)`}toggle(){this.classList.contains("x-visible")?this.hide("toggle"):this.show("toggle")}docClickListener(t){this.contains(t.target)?setTimeout((t=>{this._url!==location.href&&this.hide("url-change"),this._url=location.href})):this.showHideJustDone||this.hide("document-click")}touchSwipeListener(t){const{x0:s,y0:i,x2:e,y2:h,distance0:n,touchStaEl:o,direction:a,type:r,...d}=t.detail;o===this.handle&&("move"===r?this.showPartly(this.pos,e,h):"end"===r&&(["LEFT","RIGHT"].includes(this.pos)?n>this.width/2?this.show("drag"):this.hide("drag"):n>this.height/2?this.show("drag"):this.hide("drag")))}show(t){const s=window.getComputedStyle(this),i=new WebKitCSSMatrix(s.transform),[e,h]=[i.m41,i.m42];this.classList.add("x-visible"),this.showHideJustDone=!0,setTimeout((t=>this.showHideJustDone=void 0),100),animate(this,((t,s)=>{const i=this._getShowTransform(e,h,t);this.style.transform=i}),250,animate.TIMING_FUNCTIONS.linear)}showPartly(t,s,i){const[e,h,n,o]=[this.width,this.height,window.innerWidth,window.innerHeight];this.classList.add("x-visible");const a="LEFT"===t?`translateX(${Math.min(s-e,0)}px)`:"RIGHT"===t?`translateX(${Math.max(e-(n-s),0)}px)`:"TOP"===t?`translateY(${Math.min(i-h,0)}px)`:"BOTTOM"===t?`translateY(${Math.max(h-(o-i),0)}px)`:"";this.style.transform=a}hide(t){if(!this.classList.contains("x-visible"))return;const s=window.getComputedStyle(this),i=new WebKitCSSMatrix(s.transform),[e,h]=[i.m41,i.m42];this.showHideJustDone=!0,setTimeout((t=>this.showHideJustDone=void 0),100),animate(this,((t,s)=>{const i=this._getHideTransform(e,h,t);this.style.transform=i}),250,animate.TIMING_FUNCTIONS.linear).then((t=>this.classList.remove("x-visible")))}}customElements.get("x-drawer")||customElements.define("x-drawer",XDrawer);