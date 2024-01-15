"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[186],{7186:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var l=n(2357),r=n(1759),o=n(1665),s=n(5174),a=n(7827),i=n(4140),c=n(5523),u=n(2791),d=n(4164),g=n(7787),p=n(4986),m=n(4380),f=n(184);const h=[];function C(e){return'<p class="'.concat(e.paragraph,'"><br></p>')}function x(e,t){const n=e.querySelector("[data-id=".concat(t,"]"));null!=n&&n.focus()}function N(e,t){const n=t.parseEditorState(e);let l=m.V9.get(e);if(void 0===l){l=n.read((()=>(0,r.$generateHtmlFromNodes)(t,null)));const o=n.read((()=>(0,c.$getRoot)().getTextContent()));m.V9.set(e,l),m.rM.set(e,o)}return l}function b(e){const t=e.getRootElement();return null!==t?t.ownerDocument:document}function y(e){let t=e;for(;null!==t;){const e=t.getAttribute("data-id");if(null!=e)return e;t=t.parentElement}return null}function M(e){let t=e;for(;null!==t;){if("TH"===t.nodeName||"TD"===t.nodeName)return t.getBoundingClientRect().width;t=t.parentElement}return 0}function v(e,t,n,l,r,o){for(const s of t){const t=R(e,s,n);if(null!==t&&null!==l){const e=l.parseEditorState(t.json);l._headless=!0,l.setEditorState(e),l.update(o,{discrete:!0}),l._headless=!1;const a=JSON.stringify(l.getEditorState());r((e=>{const[t,l]=n.get(s);(0,c.$addUpdateTag)("history-push"),e.updateCellJSON(t,l,a)}))}}}function O(e,t,n){const l=n.get(e),r=n.get(t);if(void 0===l||void 0===r)return null;const o=Math.min(l[0],r[0]),s=Math.max(l[0],r[0]),a=Math.min(l[1],r[1]);return{endX:s,endY:Math.max(l[1],r[1]),startX:o,startY:a}}function S(e,t,n,l){const r=O(t,n,l);if(null===r)return[];const{startX:o,endY:s,endX:a,startY:i}=r,c=[];for(let u=o;u<=a;u++)for(let t=i;t<=s;t++)c.push(e[t].cells[u].id);return c}function E(e){let{cellEditor:t}=e;const{cellEditorConfig:n,cellEditorPlugins:l}=(0,u.useContext)(p.Nb);return null===l||null===n?null:(0,f.jsx)(s.LexicalNestedComposer,{initialEditor:t,initialTheme:n.theme,initialNodes:n.nodes,skipCollabChecks:!0,children:l})}function R(e,t,n){const l=n.get(t);if(void 0===l)return null;const[r,o]=l;return e[o].cells[r]}function T(e){let{cell:t,rows:n,cellCoordMap:l,menuElem:r,updateCellsByID:o,onClose:s,updateTableNode:a,setSortingOptions:i,sortingOptions:d}=e;const g=u.useRef<null|HTMLDivElement>null;(0,u.useEffect)((()=>{const e=g.current;if(null!==e){const t=r.getBoundingClientRect();e.style.top="".concat(t.y,"px"),e.style.left="".concat(t.x,"px")}}),[r]),(0,u.useEffect)((()=>{const e=e=>{const t=g.current;null===t||t.contains(e.target)||e.stopPropagation()};return window.addEventListener("click",e),()=>window.removeEventListener("click",e)}),[s]);const p=l.get(t.id);if(void 0===p)return null;const[m,h]=p;return(0,f.jsxs)("div",{className:"dropdown",ref:g,onPointerMove:e=>{e.stopPropagation()},onPointerDown:e=>{e.stopPropagation()},onPointerUp:e=>{e.stopPropagation()},onClick:e=>{e.stopPropagation()},children:[(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.updateCellType(m,h,"normal"===t.type?"header":"normal")})),s()},children:(0,f.jsx)("span",{className:"text",children:"normal"===t.type?"Make header":"Remove header"})}),(0,f.jsx)("button",{className:"item",onClick:()=>{o([t.id],(()=>{const e=(0,c.$getRoot)();e.clear(),e.append((0,c.$createParagraphNode)())})),s()},children:(0,f.jsx)("span",{className:"text",children:"Clear cell"})}),(0,f.jsx)("hr",{}),"header"===t.type&&0===h&&(0,f.jsxs)(f.Fragment,{children:[null!==d&&d.x===m&&(0,f.jsx)("button",{className:"item",onClick:()=>{i(null),s()},children:(0,f.jsx)("span",{className:"text",children:"Remove sorting"})}),(null===d||d.x!==m||"descending"===d.type)&&(0,f.jsx)("button",{className:"item",onClick:()=>{i({type:"ascending",x:m}),s()},children:(0,f.jsx)("span",{className:"text",children:"Sort ascending"})}),(null===d||d.x!==m||"ascending"===d.type)&&(0,f.jsx)("button",{className:"item",onClick:()=>{i({type:"descending",x:m}),s()},children:(0,f.jsx)("span",{className:"text",children:"Sort descending"})}),(0,f.jsx)("hr",{})]}),(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.insertRowAt(h)})),s()},children:(0,f.jsx)("span",{className:"text",children:"Insert row above"})}),(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.insertRowAt(h+1)})),s()},children:(0,f.jsx)("span",{className:"text",children:"Insert row below"})}),(0,f.jsx)("hr",{}),(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.insertColumnAt(m)})),s()},children:(0,f.jsx)("span",{className:"text",children:"Insert column left"})}),(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.insertColumnAt(m+1)})),s()},children:(0,f.jsx)("span",{className:"text",children:"Insert column right"})}),(0,f.jsx)("hr",{}),1!==n[0].cells.length&&(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.deleteColumnAt(m)})),s()},children:(0,f.jsx)("span",{className:"text",children:"Delete column"})}),1!==n.length&&(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.deleteRowAt(h)})),s()},children:(0,f.jsx)("span",{className:"text",children:"Delete row"})}),(0,f.jsx)("button",{className:"item",onClick:()=>{a((e=>{(0,c.$addUpdateTag)("history-push"),e.selectNext(),e.remove()})),s()},children:(0,f.jsx)("span",{className:"text",children:"Delete table"})})]})}function _(e){let{cell:t,cellCoordMap:n,cellEditor:l,isEditing:r,isSelected:o,isPrimarySelected:s,theme:a,updateCellsByID:i,updateTableNode:c,rows:g,setSortingOptions:p,sortingOptions:m}=e;const[h,x]=(0,u.useState)(!1),b=(0,u.useRef)(null),y="normal"!==t.type,M=t.json,v=y?"th":"td",O=t.width,S=b.current,R=n.get(t.id),_=null!==m&&void 0!==R&&R[0]===m.x&&0===R[1];return(0,u.useEffect)((()=>{!r&&s||x(!1)}),[r,s]),(0,f.jsxs)(v,{className:"".concat(a.tableCell," ").concat(y?a.tableCellHeader:""," ").concat(o?a.tableCellSelected:""),"data-id":t.id,tabIndex:-1,style:{width:null!==O?O:void 0},children:[s&&(0,f.jsx)("div",{className:"".concat(a.tableCellPrimarySelected," ").concat(r?a.tableCellEditing:"")}),s&&r?(0,f.jsx)(E,{cellEditor:l}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{dangerouslySetInnerHTML:{__html:""===M?C(a):N(M,l)}}),(0,f.jsx)("div",{className:a.tableCellResizer,"data-table-resize":"true"})]}),s&&!r&&(0,f.jsx)("div",{className:a.tableCellActionButtonContainer,ref:b,children:(0,f.jsx)("button",{className:a.tableCellActionButton,onClick:e=>{x(!h),e.stopPropagation()},children:(0,f.jsx)("i",{className:"chevron-down"})})}),h&&null!==S&&(0,d.createPortal)((0,f.jsx)(T,{cell:t,menuElem:S,updateCellsByID:i,onClose:()=>x(!1),updateTableNode:c,cellCoordMap:n,rows:g,setSortingOptions:p,sortingOptions:m}),document.body),_&&(0,f.jsx)("div",{className:a.tableCellSortedIndicator})]})}function D(e){let{nodeKey:t,rows:n,theme:s}=e;const[d,C,N]=(0,a.useLexicalNodeSelection)(t),E=(0,u.useRef)({point:0,size:0}),[T,D]=(0,u.useState)(null),w=(0,u.useRef)(null),A=(0,u.useRef)(null),j=(0,u.useRef)(null),{cellEditorConfig:$}=(0,u.useContext)(p.Nb),[I,L]=(0,u.useState)(!1),[P,k]=(0,u.useState)(!1),[K,Y]=(0,u.useState)(!1),[W]=(0,o.useLexicalComposerContext)(),U=(0,u.useRef)(!1),[B,X]=(0,u.useState)(null),z=(0,u.useRef)(null),F=(0,u.useMemo)((()=>{const e=new Map;for(let t=0;t<n.length;t++){const l=n[t].cells;for(let n=0;n<l.length;n++){const r=l[n];e.set(r.id,[n,t])}}return e}),[n]),J=(0,u.useMemo)((()=>{if(null===T)return n;const e=n.slice(1);return e.sort(((e,t)=>{const n=e.cells,l=t.cells,r=T.x,o=m.rM.get(n[r].json)||"",s=m.rM.get(l[r].json)||"";return""===o||""===s?1:"ascending"===T.type?o.localeCompare(s):s.localeCompare(o)})),e.unshift(n[0]),e}),[n,T]),[H,G]=(0,u.useState)(null),q=u.useMemo<null|c.LexicalEditor>[$],[V,Z]=(0,u.useState)([]),Q=(0,u.useMemo)((()=>new Set(V)),[V]);(0,u.useEffect)((()=>{const e=z.current;d&&document.activeElement===document.body&&null!==e&&e.focus()}),[d]);const ee=(0,u.useCallback)((e=>{W.update((()=>{const n=(0,c.$getNodeByKey)(t);(0,m.di)(n)&&e(n)}))}),[W,t]),te=(0,u.useCallback)(((e,t,n)=>{const l=J[t].cells[e].id;if(A.current=l,n){const e=S(J,H,l,F);Z(e)}else G(l),Z(h),x(z.current,l)}),[F,H,J]),ne=(0,u.useCallback)((()=>{if(null!==q&&null!==H){const e=JSON.stringify(q.getEditorState());ee((t=>{const n=F.get(H);if(void 0===n)return;(0,c.$addUpdateTag)("history-push");const[l,r]=n;t.updateCellJSON(l,r,e)}))}}),[F,q,H,ee]),le=(0,u.useCallback)((()=>{setTimeout((()=>{const e=W.getRootElement();var t;null!==e&&(e.focus({preventScroll:!0}),null===(t=window.getSelection())||void 0===t||t.removeAllRanges())}),20)}),[W]);(0,u.useEffect)((()=>{const e=z.current;if(null===e)return;const t=b(W),n=t=>{const n=y(t.target);if(null!==n&&W.isEditable()&&e.contains(t.target)){if((e=>{const t=e.clientX-l.x,n=e.clientY-l.y;return t<5||n<5})(t))return C(!0),G(null),void le();if(C(!1),1===(r=t.target).nodeType&&r.hasAttribute("data-table-resize"))return X(n),e.style.userSelect="none",void(E.current={point:t.clientX,size:M(t.target)});U.current=!0,H!==n?(I&&ne(),G(n),L(!1),A.current=n):A.current=null,Z(h)}else null===H||function(e){let t=e;for(;null!==t;){const e=t.nodeName;if("BUTTON"===e||"INPUT"===e||"TEXTAREA"===e)return!0;t=t.parentElement}return!1}(t.target)||(C(!1),U.current=!1,I&&ne(),G(null),Z(h),L(!1),A.current=null);var r},l=e.getBoundingClientRect(),r=t=>{if(null!==B){const e=j.current;if(null!==e){const{size:n,point:r}=E.current,o=n+(t.clientX-r);let s=t.clientX-l.x;s<10?s=10:s>l.width-10?s=l.width-10:o<20&&(s=r-n+20-l.x),e.style.left="".concat(s,"px")}return}if(!I){const{clientX:e,clientY:n}=t,{width:r,x:o,y:s,height:a}=l,i=e>o+.9*r&&e<o+r+40&&!U.current;k(i);const c=t.target===w.current||n>s+.85*a&&n<s+a+5&&!U.current;Y(c)}if(I||!U.current||null===H)return;const n=y(t.target);if(null!==n&&n!==A.current){0===V.length&&(e.style.userSelect="none");const t=S(J,H,n,F);1===t.length?Z(h):Z(t),A.current=n}},o=t=>{if(null!==B){const{size:e,point:n}=E.current;let l=e+(t.clientX-n);l<10&&(l=10),ee((e=>{const[t]=F.get(B);(0,c.$addUpdateTag)("history-push"),e.updateColumnWidth(t,l)})),X(null)}var n;null!==e&&V.length>1&&U.current&&(e.style.userSelect="text",null===(n=window.getSelection())||void 0===n||n.removeAllRanges());U.current=!1};return t.addEventListener("pointerdown",n),t.addEventListener("pointermove",r),t.addEventListener("pointerup",o),()=>{t.removeEventListener("pointerdown",n),t.removeEventListener("pointermove",r),t.removeEventListener("pointerup",o)}}),[q,W,I,J,ne,H,Q,V,F,B,ee,C,le]),(0,u.useEffect)((()=>{if(!I&&null!==H){const e=b(W),t=e=>{if(null!==e&&null!==q){const t=e.json,n=q.parseEditorState(t);q.setEditorState(n)}},n=e=>{const n=y(e.target);if(n===H&&W.isEditable()){const e=R(J,n,F);t(e),L(!0),Z(h)}},l=e=>{const n=e.keyCode;if(16===n||27===n||9===n||37===n||38===n||39===n||40===n||8===n||46===n||!W.isEditable())return;if(13===n&&e.preventDefault(),!I&&null!==H&&W.getEditorState().read((()=>null===(0,c.$getSelection)()))&&"true"!==e.target.contentEditable){if(function(e,t,n,l){return!t&&67===e&&(g.jB?n:l)}(n,e.shiftKey,e.metaKey,e.ctrlKey))return void W.dispatchCommand(c.COPY_COMMAND,e);if(function(e,t,n,l){return!t&&88===e&&(g.jB?n:l)}(n,e.shiftKey,e.metaKey,e.ctrlKey))return void W.dispatchCommand(c.CUT_COMMAND,e);if(function(e,t,n,l){return!t&&86===e&&(g.jB?n:l)}(n,e.shiftKey,e.metaKey,e.ctrlKey))return void W.dispatchCommand(c.PASTE_COMMAND,e)}if(e.metaKey||e.ctrlKey||e.altKey)return;const l=R(J,H,F);t(l),L(!0),Z(h)};return e.addEventListener("dblclick",n),e.addEventListener("keydown",l),()=>{e.removeEventListener("dblclick",n),e.removeEventListener("keydown",l)}}}),[q,W,I,J,H,F]);const re=(0,u.useCallback)(((e,t)=>{v(J,e,F,q,ee,t)}),[F,q,J,ee]),oe=(0,u.useCallback)((()=>null===H||I?(d&&ee((e=>{(0,c.$addUpdateTag)("history-push"),e.selectNext(),e.remove()})),!1):(re([H,...V],(()=>{const e=(0,c.$getRoot)();e.clear(),e.append((0,c.$createParagraphNode)())})),!0)),[I,d,H,V,re,ee]);if((0,u.useEffect)((()=>{const e=z.current;if(null===e)return;const n=(e,t,n,l)=>{const r=e instanceof KeyboardEvent?null:e.clipboardData;if(e.preventDefault(),null!=r)r.setData("text/html",t),r.setData("text/plain",l),r.setData("application/x-lexical-editor",n);else{const e=navigator.clipboard;if(null!=e){const n=[new ClipboardItem({"text/html":new Blob([t],{type:"text/html"})})];e.write(n)}}},o=async(e,t)=>{try{return e instanceof DataTransfer?e.getData(t):e instanceof ClipboardItem?await(await e.getType(t)).text():""}catch{return""}},s=e=>{const l=A.current;if(null!==H&&null!==q&&null!==l){const r=O(H,l,F);if(null===r)return;const o=(0,m.l1)(J,r),s=o.outerHTML,a=o.outerText,i=W.getEditorState().read((()=>(0,c.$getNodeByKey)(t).exportJSON()));i.rows=function(e,t){const{startX:n,endY:l,endX:r,startY:o}=t,s=[];for(let a=o;a<=l;a++){const t=e[a],l=(0,m.v)();for(let e=n;e<=r;e++){const n={...t.cells[e]};n.id=(0,m.xG)(),l.cells.push(n)}s.push(l)}return s}(J,r);const u={namespace:q._config.namespace,nodes:[i]},d=JSON.stringify(u);n(e,s,d,a)}},a=(e,t)=>{const r=(0,c.$getSelection)();return null!==H&&!I&&null===r&&t===W&&(0===V.length?(e=>{if(null!==H&&null!==q){const t=R(J,H,F).json,r=m.V9.get(t)||null;if(null===r)return;const o=q.parseEditorState(t),s=o.read((()=>(0,c.$getRoot)().getTextContent())),a=o.read((()=>JSON.stringify((0,l.$generateJSONFromSelectedNodes)(q,null))));n(e,r,a,s)}})(e):s(e),!0)};return(0,i.mergeRegister)(W.registerCommand(c.CLICK_COMMAND,(e=>{const t=(0,c.$getSelection)();return!!(0,c.$isNodeSelection)(t)}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.PASTE_COMMAND,((e,t)=>{const n=(0,c.$getSelection)();return null!==H&&!I&&null===n&&t===W&&((async e=>{let t=(e instanceof InputEvent?null:e.clipboardData)||null;if(null!==H&&null!==q){if(e.preventDefault(),null===t)try{t=(await navigator.clipboard.read())[0]}catch{}const n=null!==t?await o(t,"application/x-lexical-editor"):"";if(n)try{const e=JSON.parse(n);if(e.namespace===W._config.namespace&&Array.isArray(e.nodes))return void v(J,[H],F,q,ee,(()=>{const t=(0,c.$getRoot)();t.clear(),t.append((0,c.$createParagraphNode)()),t.selectEnd();const n=(0,l.$generateNodesFromSerializedNodes)(e.nodes),r=(0,c.$getSelection)();(0,c.$isRangeSelection)(r)&&(0,l.$insertGeneratedNodes)(q,n,r)}))}catch{}const s=null!==t?await o(t,"text/html"):"";if(s)try{const e=(new DOMParser).parseFromString(s,"text/html"),t=e.querySelector("table");if(null!=t){const e=(0,m.G5)(t);return void ee((t=>{const[n,l]=F.get(H);(0,c.$addUpdateTag)("history-push"),t.mergeRows(n,l,e)}))}return void v(J,[H],F,q,ee,(()=>{const t=(0,c.$getRoot)();t.clear(),t.append((0,c.$createParagraphNode)()),t.selectEnd();const n=(0,r.$generateNodesFromDOM)(W,e),o=(0,c.$getSelection)();(0,c.$isRangeSelection)(o)&&(0,l.$insertGeneratedNodes)(q,n,o)}))}catch{}const a=null!==t?await o(t,"text/plain"):"";null!=a&&v(J,[H],F,q,ee,(()=>{const e=(0,c.$getRoot)();e.clear(),e.selectEnd();const t=(0,c.$getSelection)();null!==t&&t.insertRawText(a)}))}})(e),U.current=!1,Z(h),!0)}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.COPY_COMMAND,a,c.COMMAND_PRIORITY_LOW),W.registerCommand(c.CUT_COMMAND,((e,t)=>!!a(e,t)&&(oe(),!0)),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_BACKSPACE_COMMAND,oe,c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_DELETE_COMMAND,oe,c.COMMAND_PRIORITY_LOW),W.registerCommand(c.FORMAT_TEXT_COMMAND,(e=>null!==H&&!I&&(v(J,[H,...V],F,q,ee,(()=>{(function(){const e=(0,c.$createRangeSelection)();return e.focus.set("root",(0,c.$getRoot)().getChildrenSize(),"element"),e})().formatText(e)})),!0)),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_ENTER_COMMAND,((n,l)=>{const r=(0,c.$getSelection)();if(null===H&&!I&&(0,c.$isNodeSelection)(r)&&r.has(t)&&1===r.getNodes().length&&l===W){const t=J[0].cells[0].id;return G(t),x(e,t),n.preventDefault(),n.stopPropagation(),N(),!0}return!1}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_TAB_COMMAND,(e=>{const t=(0,c.$getSelection)();if(!I&&null===t&&null!==H){const t=e.shiftKey,[n,l]=F.get(H);e.preventDefault();let r=null,o=null;if(0===n&&t?0!==l&&(o=l-1,r=J[o].cells.length-1):n!==J[l].cells.length-1||t?t?(r=n-1,o=l):(r=n+1,o=l):l!==J.length-1&&(o=l+1,r=0),null!==r&&null!==o)return te(r,o,!1),!0}return!1}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_ARROW_UP_COMMAND,((e,t)=>{const n=(0,c.$getSelection)();if(!I&&null===n){const t=e.shiftKey,n=t&&A.current||H;if(null!==n){const[e,l]=F.get(n);if(0!==l)return te(e,l-1,t),!0}}return!(!(0,c.$isRangeSelection)(n)||t!==q)&&(!(!n.isCollapsed()||null!==n.anchor.getNode().getTopLevelElementOrThrow().getPreviousSibling())&&(e.preventDefault(),!0))}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_ARROW_DOWN_COMMAND,((e,t)=>{const n=(0,c.$getSelection)();if(!I&&null===n){const t=e.shiftKey,n=t&&A.current||H;if(null!==n){const[e,l]=F.get(n);if(l!==J.length-1)return te(e,l+1,t),!0}}return!(!(0,c.$isRangeSelection)(n)||t!==q)&&(!(!n.isCollapsed()||null!==n.anchor.getNode().getTopLevelElementOrThrow().getNextSibling())&&(e.preventDefault(),!0))}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_ARROW_LEFT_COMMAND,((e,t)=>{const n=(0,c.$getSelection)();if(!I&&null===n){const t=e.shiftKey,n=t&&A.current||H;if(null!==n){const[e,l]=F.get(n);if(0!==e)return te(e-1,l,t),!0}}return!(!(0,c.$isRangeSelection)(n)||t!==q)&&(!(!n.isCollapsed()||0!==n.anchor.offset)&&(e.preventDefault(),!0))}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_ARROW_RIGHT_COMMAND,((e,t)=>{const n=(0,c.$getSelection)();if(!I&&null===n){const t=e.shiftKey,n=t&&A.current||H;if(null!==n){const[e,l]=F.get(n);if(e!==J[l].cells.length-1)return te(e+1,l,t),!0}}if(!(0,c.$isRangeSelection)(n)||t!==q)return!1;if(n.isCollapsed()){const t=n.anchor;if("text"===t.type&&t.offset===t.getNode().getTextContentSize()||"element"===t.type&&t.offset===t.getNode().getChildrenSize())return e.preventDefault(),!0}return!1}),c.COMMAND_PRIORITY_LOW),W.registerCommand(c.KEY_ESCAPE_COMMAND,((t,n)=>{const l=(0,c.$getSelection)();return I||null!==l||n!==W?!!(0,c.$isRangeSelection)(l)&&(!!I&&(ne(),L(!1),null!==H&&setTimeout((()=>{x(e,H)}),20),!0)):(C(!0),G(null),le(),!0)}),c.COMMAND_PRIORITY_LOW))}),[F,q,oe,N,W,I,te,t,H,J,ne,le,V,C,ee]),null!==q)return(0,f.jsxs)("div",{style:{position:"relative"},children:[(0,f.jsx)("table",{className:"".concat(s.table," ").concat(d?s.tableSelected:""),ref:z,tabIndex:-1,children:(0,f.jsx)("tbody",{children:J.map((e=>(0,f.jsx)("tr",{className:s.tableRow,children:e.cells.map((e=>{const{id:t}=e;return(0,f.jsx)(_,{cell:e,theme:s,isSelected:Q.has(t),isPrimarySelected:H===t,isEditing:I,sortingOptions:T,cellEditor:q,updateCellsByID:re,updateTableNode:ee,cellCoordMap:F,rows:J,setSortingOptions:D},t)}))},e.id)))})}),P&&(0,f.jsx)("button",{className:s.tableAddColumns,onClick:()=>{ee((e=>{(0,c.$addUpdateTag)("history-push"),e.addColumns(1)}))}}),K&&(0,f.jsx)("button",{className:s.tableAddRows,onClick:()=>{ee((e=>{(0,c.$addUpdateTag)("history-push"),e.addRows(1)}))},ref:w}),null!==B&&(0,f.jsx)("div",{className:s.tableResizeRuler,ref:j})]})}},6390:(e,t,n)=>{const l=n(2060);e.exports=l},2060:(e,t,n)=>{var l=n(2791);let r=[["Cat","rgb(125, 50, 0)"],["Dog","rgb(100, 0, 0)"],["Rabbit","rgb(150, 0, 0)"],["Frog","rgb(200, 0, 0)"],["Fox","rgb(200, 75, 0)"],["Hedgehog","rgb(0, 75, 0)"],["Pigeon","rgb(0, 125, 0)"],["Squirrel","rgb(75, 100, 0)"],["Bear","rgb(125, 100, 0)"],["Tiger","rgb(0, 0, 150)"],["Leopard","rgb(0, 0, 200)"],["Zebra","rgb(0, 0, 250)"],["Wolf","rgb(0, 100, 150)"],["Owl","rgb(0, 100, 100)"],["Gull","rgb(100, 0, 100)"],["Squid","rgb(150, 0, 150)"]],o=r[Math.floor(Math.random()*r.length)],s=l.createContext({clientID:0,color:o[1],isCollabActive:!1,name:o[0],yjsDocMap:new Map});t.CollaborationContext=s,t.useCollaborationContext=function(e,t){let n=l.useContext(s);return null!=e&&(n.name=e),null!=t&&(n.color=t),n}},5174:(e,t,n)=>{const l=n(8773);e.exports=l},8773:(e,t,n)=>{var l=n(6390),r=n(1665),o=n(2791);t.LexicalNestedComposer=function(e){let{initialEditor:t,children:n,initialNodes:s,initialTheme:a,skipCollabChecks:i}=e,c=o.useRef(!1),u=o.useContext(r.LexicalComposerContext);null==u&&function(e){let t=new URLSearchParams;t.append("code",e);for(let n=1;n<arguments.length;n++)t.append("v",arguments[n]);throw Error("Minified Lexical error #".concat(e,"; visit https://lexical.dev/docs/error?").concat(t," for the full message or ")+"use the non-minified dev environment for full errors and additional helpful warnings.")}(9);let[d,{getTheme:g}]=u,p=o.useMemo((()=>{var e=a||g()||void 0;const n=r.createLexicalComposerContext(u,e);if(void 0!==e&&(t._config.theme=e),t._parentEditor=d,s)for(var l of s){var o=e=null;"function"!==typeof l&&(l=(o=l).replace,e=o.with,o=o.withKlass||null);const n=t._nodes.get(l.getType());t._nodes.set(l.getType(),{exportDOM:n?n.exportDOM:void 0,klass:l,replace:e,replaceWithKlass:o,transforms:new Set})}else{l=t._nodes=new Map(d._nodes);for(const[e,n]of l)t._nodes.set(e,{exportDOM:n.exportDOM,klass:n.klass,replace:n.replace,replaceWithKlass:n.replaceWithKlass,transforms:new Set})}return t._config.namespace=d._config.namespace,t._editable=d._editable,[t,n]}),[]),{isCollabActive:m,yjsDocMap:f}=l.useCollaborationContext(),h=i||c.current||f.has(t.getKey());return o.useEffect((()=>{h&&(c.current=!0)}),[h]),o.useEffect((()=>d.registerEditableListener((e=>{t.setEditable(e)}))),[t,d]),o.createElement(r.LexicalComposerContext.Provider,{value:p},!m||h?n:null)}}}]);
//# sourceMappingURL=186.e72b5381.chunk.js.map