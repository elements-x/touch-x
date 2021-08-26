import{addCss,removeCss}from"elements-x";const css="\n  x-sortable { user-select: none; position: relative;}\n  x-sortable > *, x-sortable li { cursor: grab; position: relative; }\n  x-sortable.x-active .x-target:after { \n    content: ''; height: 2px; display: block; background: #AAA; \n    position: absolute; inset: auto 0 -4px 0;\n  }\n  x-sortable .x-cloned { position: absolute; pointer-events: none; display: none; }\n";export class XSortable extends HTMLElement{constructor(...e){const t=super(...e);return this._touchSwipeListener=this.touchSwipeListener.bind(this),t}connectedCallback(){addCss(this,css),new TouchX(this),document.body.addEventListener("x-swipe",this._touchSwipeListener)}disconnectedCallback(){removeCss(this),document.body.removeEventListener("x-swipe",this._touchSwipeListener)}touchSwipeListener(e){const{type:t,x2:s,y2:o,touchStaEl:i}=e.detail;if("start"===t)i.style.opacity=.5,this.classList.add("x-active"),this.clonedEl=i.cloneNode(i,!0),this.clonedEl.classList.add("x-cloned"),this.clonedEl.style.width=`${i.offsetWidth}px`,this.appendChild(this.clonedEl);else if("move"===t)this.querySelector(".x-target")?.classList.remove("x-target"),this.target=document.elementFromPoint(s,o),this.target?.classList.add("x-target"),this._setClonedElPos(s,o);else if("end"===t){if(this.target&&this.contains(this.target))try{this.target.insertAdjacentElement("afterend",i)}catch(e){}i.style.opacity=null,this.classList.remove("x-active"),this.clonedEl.remove()}else"cancel"===t&&(i.style.opacity=null,this.classList.remove("x-active"),this.clonedEl.remove())}_setClonedElPos(e,t){this.clonedEl.style.top=`${t-this.offsetTop+window.scrollY}px`,this.clonedEl.style.left=e-this.offsetLeft+"px",this.clonedEl.style.display="block"}}customElements.get("x-sortable")||customElements.define("x-sortable",XSortable);