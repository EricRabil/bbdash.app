(this["webpackJsonpbbdash.app"]=this["webpackJsonpbbdash.app"]||[]).push([[0],{44:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(26),s=n.n(a),i=n(8),l=n(0);function o(e){var t=e.to,n=e.children;return Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)("a",{href:t,className:"nav-link",children:n})})}function d(e){var t=e.to,n=e.children;return Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(i.c,{to:t,activeClassName:"active",className:"nav-link",children:n})})}function u(){return Object(l.jsx)("nav",{className:"navbar navbar-expand-lg border-bottom mb-3",children:Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsx)(i.b,{to:"/",className:"navbar-brand",children:Object(l.jsx)("span",{className:"fs-5",children:"BBDash"})}),Object(l.jsx)("div",{children:Object(l.jsx)("div",{className:"collapse navbar-collapse",children:Object(l.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:[Object(l.jsx)(d,{to:"/downloads",children:"Downloads"}),Object(l.jsx)(o,{to:"https://github.com/EricRabil/BBDash",children:"GitHub"}),Object(l.jsx)(o,{to:"https://discord.gg/mf2UrHFvRb",children:"Discord"})]})})})]})})}var j=n(13),b=n.n(j),h=n(2),m=n(24);function O(e,t){return f.apply(this,arguments)}function f(){return(f=Object(m.a)(b.a.mark((function e(t,n){var c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://jenkins.ericrabil.com/job/BBDash/job/master/api/json?pretty=true&tree=allBuilds[number,result,url,artifacts[*],timestamp]{".concat(t,",").concat(n,"}"));case 2:return c=e.sent,e.next=5,c.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=Object(c.createContext)({releases:[],total:0,loading:!0,loadMore:function(){return Promise.resolve()}});function v(e){var t=e.children,n=function(){var e=Object(c.useState)({}),t=Object(h.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(-1),s=Object(h.a)(a,2),i=s[0],l=s[1],o=Object(c.useState)(!1),d=Object(h.a)(o,2),u=d[0],j=d[1],f=Object(c.useState)(0),x=Object(h.a)(f,2),v=x[0],p=x[1],g=Object(c.useCallback)(Object(m.a)(b.a.mark((function e(){var t,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!u){e.next=2;break}return e.abrupt("return");case 2:return j(!0),t=v+100,e.next=6,O(v,t);case 6:c=e.sent,r(Object.assign({},n,c.allBuilds.reduce((function(e,t){return e[t.number]=t,e}),{}))),-1===i&&l(c.allBuilds[0].number),p(t),j(!1);case 11:case"end":return e.stop()}}),e)}))),[n,u,i,v]);Object(c.useLayoutEffect)((function(){-1===i&&g()}),[]);var N=Object(c.useMemo)((function(){var e=0;return{releasesArray:Object.values(n).sort((function(e,t){return t.number-e.number})).filter((function(t){return"SUCCESS"===t.result||(e+=1,!1)})),revisedTotal:i-e}}),[n,i]);return{releases:N.releasesArray,total:N.revisedTotal,loadMore:g,loading:u}}();return Object(l.jsx)(x.Provider,{value:n,children:t})}var p,g,N=n(9),y=n(19);function A(e){var t=e.url,n=Object(h.a)(e.artifacts,1)[0];if(n)return"".concat(t,"artifact/").concat(n.fileName)}function w(e){return e.artifacts.map((function(e){var t;return null===(t=e.fileName.split(".")[0])||void 0===t?void 0:t.split("-")[2]}))[0]||p.development}function C(e){var t=e.releases,n=e.total,r=e.loadMore,a=e.loading,s=function(e,t){var n=Object(c.useState)(1),r=Object(h.a)(n,2),a=r[0],s=r[1],i=Math.ceil(e/t),l=(a-1)*t,o=Math.min(e,l+t),d=Object(c.useCallback)((function(){return s(a+1)}),[a,s]),u=Object(c.useCallback)((function(){return s(a-1)}),[a,s]),j=Object(c.useCallback)((function(e){e>i?e=i:e<0&&(e=0),s(e)}),[i,s]);return{startIndex:l,stopIndex:o,currentPage:a,totalPages:i,nextPage:a===i?null:d,prevPage:1===a?null:u,jumpToPage:j}}(n,35),i=s.startIndex,l=s.stopIndex,o=Object(y.a)(s,["startIndex","stopIndex"]),d=Object(c.useMemo)((function(){return t.slice(i,l)}),[t,i,l]);return Object(c.useEffect)((function(){a||l>t.length&&r()}),[i,t,a]),Object(c.useMemo)((function(){return Object.assign({},o,{releases:d,startIndex:i,stopIndex:l,total:n,loading:a})}),[o,d,i,l,n,a])}!function(e){e.development="development",e.beta="beta",e.stable="stable"}(p||(p={})),(g=p||(p={})).describeBuildType=function(e){switch(e){case p.stable:return"Stable Build";case p.beta:return"Beta Build";case p.development:default:return"Development Build"}},g.classNameForBuildType=function(e){switch(e){case p.development:return"danger";case p.beta:return"warning";case p.stable:return"success"}};n(28),n(17),n(18),n(29),n(31);function B(e){var t=A(e),n=w(e),c=p.describeBuildType(n);return Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:Object(l.jsxs)("a",{href:t,children:["#",e.number]})}),Object(l.jsx)("td",{className:"text-".concat(p.classNameForBuildType(n)),children:c}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{href:t,children:Object(l.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACFwAAAhcBZS5lVgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACzSURBVCiR3ZKxCcJgFIS/98cZHMAihdEBHCIGG0vByi0UHcXONgFH0CJVSHACIeACaYJnFY0YtPe6u/t48OBMEgCjqa2BLe/aFLF2AK4VDvjUM3MdZaf+CuyNQ5vdjb6B39H7wdRWTtwsCDkBkx8Hz86rmQPlF6j0auYuO+oKREDVAVVAlB11dQBFrNTEElALkollESuF1td5ooP0GoXENk90aLw16wEwMxuG7AEuCQu1ygcKSD4mPqwUrQAAAABJRU5ErkJggg=="})})})]})}var k=n(32),T=n(30),P=n.n(T),S=Object(c.createContext)({startIndex:0,stopIndex:0,currentPage:1,totalPages:1,jumpToPage:function(){},nextPage:function(){},prevPage:function(){}});function I(e){var t=e.pageNumber,n=Object(c.useContext)(S),r=n.currentPage,a=n.jumpToPage;return Object(l.jsx)("li",{className:"page-item".concat(r===t?" active":"").concat(-1===t?" disabled":""),"attr-active":(r===t).toString(),onClick:function(){-1!==t&&a(t)},children:Object(l.jsx)("a",{href:"#",className:"page-link",children:-1===t?"...":t})})}function E(e){var t=e.direction,n=e.children;return Object(l.jsx)(S.Consumer,{children:function(e){var c=e[t];return Object(l.jsx)("li",{className:"page-item".concat(null===c?" disabled":""),onClick:function(){return null===c||void 0===c?void 0:c()},children:Object(l.jsx)("a",{href:"#",className:"page-link",children:n})})}})}function M(e,t){return Object(c.useMemo)((function(){return function(e,t){var n=t>4,c=t<e-3;return e<=7?P()(1,e+1):[1].concat(Object(k.a)(function(e,t,n){for(var c=[e],r=1;r<3;r++)c.unshift(e-r),c.push(e+r);return t&&(c[0]=-1),n&&(c[c.length-1]=-1),c}(n?c?t:e-3:4,n,c)),[e])}(e,t)}),[e,t])}function D(e){var t=e.api,n=M(t.totalPages,t.currentPage);return Object(l.jsx)(S.Provider,{value:t,children:Object(l.jsxs)("nav",{className:"d-flex flex-row",children:[Object(l.jsxs)("ul",{className:"pagination",children:[Object(l.jsx)(E,{direction:"prevPage",children:"< Prev"}),Object(l.jsx)(E,{direction:"nextPage",children:"Next >"})]}),Object(l.jsx)("ul",{className:"mx-2 pagination",children:n.map((function(e,t){return Object(l.jsx)(I,{pageNumber:e},t)}))})]})})}var F=Object(c.createContext)({currentTab:0,visibleTab:0,setCurrentTab:function(){},setVisibleTab:function(){}});function V(e){var t=e.children,n=e.initialTab,r=void 0===n?0:n,a=Object(c.useState)(r),s=Object(h.a)(a,2),i=s[0],o=s[1],d=Object(c.useState)(r),u=Object(h.a)(d,2),j=u[0],b=u[1],m=Object(c.useMemo)((function(){return{currentTab:i,setCurrentTab:o,visibleTab:j,setVisibleTab:b}}),[i,j]);return Object(l.jsx)(F.Provider,{value:m,children:t})}var H=Object(c.createContext)({anchors:[],defineAnchor:function(){}});function R(e){var t=e.children,n=Object(c.useState)([]),r=Object(h.a)(n,2),a=r[0],s=r[1],i=Object(c.useCallback)((function(e){var t=a.findIndex((function(t){return t.id===e.id}));-1===t&&(t=a.length);var n=a.slice();n[t]=e,s(n)}),[a]),o=Object(c.useMemo)((function(){return{anchors:a,defineAnchor:i}}),[a,i]);return Object(l.jsx)(H.Provider,{value:o,children:t})}function U(e){return"string"===typeof e||"number"===typeof e?e.toString():Array.isArray(e)?e.map(U).join(""):"object"===typeof e&&e?U(e.props.children):""}function L(e){var t=e.children,n=Object(c.useContext)(H).defineAnchor,r=Object(c.useMemo)((function(){var e,n;return[U(t),null===(n=t,e="string"===typeof n||"number"===typeof n||Array.isArray(n)?null:"object"===typeof n&&n?n.props:null)||void 0===e?void 0:e.id]}),[t]),a=Object(h.a)(r,2),s=a[0],i=a[1];if(!i)throw new Error("Root element must have an ID.");return Object(c.useEffect)((function(){s&&i&&n({name:s,id:i})}),[s,i]),Object(l.jsx)(l.Fragment,{children:t})}function z(e){var t=e.children;return Object(l.jsx)(l.Fragment,{children:r.a.Children.map(t,(function(e){if("object"===typeof e&&e){var t=e,n=t.type,c=t.props.id;if("string"===typeof n&&n.toLowerCase().startsWith("h")&&2===n.length&&c)return Object(l.jsx)(L,{children:e})}return e}))})}function J(e){var t=e.children,n=e.controls;return Object(l.jsx)(F.Consumer,{children:function(e){var c=e.currentTab,r=e.setCurrentTab;return Object(l.jsx)("button",{onClick:function(){return r(n)},id:"".concat(n,"-tab"),className:"nav-link".concat(c===n?" active":""),type:"button",role:"tab","aria-controls":n.toString(),"aria-selected":c===n,children:t})}})}function G(e){var t=e.children,n=e.id,r=Object(c.useContext)(F),a=r.currentTab,s=r.visibleTab,i=r.setVisibleTab,o=a===s&&a===n,d=!!o||s===n;return Object(l.jsx)("div",{className:"tab-pane fade".concat(d?" active":"").concat(o?" show":""),onTransitionEnd:function(){i(a)},id:n.toString(),role:"tabpanel","aria-labelledby":"".concat(n,"-tab"),children:t})}function K(){var e=C(Object(c.useContext)(x)),t=e.releases,n=Object(y.a)(e,["releases"]);return Object(l.jsx)("div",{className:"col-9",children:Object(l.jsxs)(V,{initialTab:"ci-downloads",children:[Object(l.jsx)("nav",{children:Object(l.jsxs)("div",{className:"nav nav-tabs mb-3",role:"tablist",children:[Object(l.jsx)(J,{controls:"ci-downloads",children:"Downloads"}),Object(l.jsx)(J,{controls:"install-instructions",children:"Install Instructions"})]})}),Object(l.jsxs)("div",{className:"tab-content",children:[Object(l.jsx)(G,{id:"ci-downloads",children:Object(l.jsxs)("div",{children:[Object(l.jsx)(D,{api:n}),Object(l.jsxs)("table",{className:"table table-hover",children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Build Number"}),Object(l.jsx)("th",{children:"Type"}),Object(l.jsx)("th",{children:"Download"})]})}),Object(l.jsx)("tbody",{children:t.map((function(e){return Object(l.jsx)(B,Object(N.a)({},e),e.number)}))})]}),Object(l.jsx)("div",{className:"container-footer",children:Object(l.jsx)(D,{api:n})})]})}),Object(l.jsx)(G,{id:"install-instructions",children:Object(l.jsx)(R,{children:Object(l.jsxs)(z,{children:[Object(l.jsx)("h3",{id:"sideload-chromium",children:"Sideloading on Chromium-based browsers"}),Object(l.jsx)("h5",{id:"sideload-chrome",children:Object(l.jsx)("a",{href:"https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest",children:"Sideload to Chrome"})}),Object(l.jsx)("h5",{id:"sideload-edge",children:Object(l.jsx)("a",{href:"https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading",children:"Sideload to Edge"})})]})})})]})]})})}var Q="https://chrome.google.com/webstore/detail/bbdash/geddgcpneoejfjekjbgpnghhmgahcpgj";function W(e){var t=e.release,n=e.type,c=p.describeBuildType(n),r=p.classNameForBuildType(n);return Object(l.jsx)("li",{className:"list-group-item",children:Object(l.jsx)("h6",{className:"m-0",children:Object(l.jsxs)("a",{className:"link-".concat(r),href:A(t),children:[c," #",t.number]})})})}function Y(){var e=function(e){return Object(c.useMemo)((function(){return Object.fromEntries(e.map((function(e){return[w(e),e]})).sort((function(e,t){var n=Object(h.a)(e,2),c=n[0],r=n[1],a=Object(h.a)(t,2),s=a[0],i=a[1];return c!==s?1:i.number-r.number})).filter((function(e,t,n){var c=Object(h.a)(e,1)[0];return n.findIndex((function(e){var t=Object(h.a)(e,1)[0];return c===t}))===t})))}),[e])}(Object(c.useContext)(x).releases);return Object(l.jsx)("div",{className:"col-3 p-0",children:Object(l.jsxs)("div",{className:"card text-white",children:[Object(l.jsx)("div",{className:"card-body",children:Object(l.jsx)("h5",{className:"card-title m-0",children:"Latest Downloads"})}),Object(l.jsxs)("ul",{className:"list-group list-group-flush",children:[Object.entries(e).map((function(e){var t=Object(h.a)(e,2),n=t[0],c=t[1];return Object(l.jsx)(W,{release:c,type:n},n)})),Object(l.jsx)("li",{className:"list-group-item",children:Object(l.jsx)("h6",{className:"m-0",children:Object(l.jsx)("a",{className:"link-secondary",href:Q,children:"Chrome Webstore"})})})]})]})})}function Z(){return Object(l.jsx)("div",{className:"row",children:Object(l.jsxs)(v,{children:[Object(l.jsx)(K,{}),Object(l.jsx)(Y,{})]})})}var X=n.p+"static/media/screenshot.88ec577b.png";function q(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"text-center",children:[Object(l.jsx)("h1",{className:"mt-4 display-5 fw-bold",children:"We are BBDash"}),Object(l.jsxs)("div",{className:"d-flex flex-column col-lg-8 mx-auto",children:[Object(l.jsx)("p",{className:"lead mb-4",children:"BBDash lays your course content out in an innovative and efficient format, that you can very finely customize to fit your needs."}),Object(l.jsx)("img",{src:X}),Object(l.jsxs)("div",{className:"d-grid gap-2 d-sm-flex justify-content-sm-center",children:[Object(l.jsx)("a",{href:Q,className:"btn btn-primary btn-lg px-4 me-sm-3",children:"Install from Chrome Webstore"}),Object(l.jsx)(i.b,{to:"/downloads",className:"btn btn-outline-secondary btn-lg px-4",children:"Install Manually"})]})]})]}),Object(l.jsx)("hr",{}),Object(l.jsx)("h3",{children:"Our Pitch"}),Object(l.jsx)("p",{children:"Keeping track of your grades, classes, assignments, and zoom links can be a hassle. Blackboard often scatters your data across many different pages, which drains precious time. We will be creating a Chrome extension that can help keep track of all your classes and assignments in a TweetDeck-style layout. It will have columns like in Tweetdeck, with each column specialized to a different section of Blackboard. There will be a column that shows all of your grades, a column that shows all of your due dates, a column that shows all of your classes for the day, and many other specialized columns. These columns can be deleted, moved around, and customized to fit each user\u2019s needs."})]})}var $=n(3);function _(){return Object(l.jsxs)("div",{className:"container py-3",children:[Object(l.jsx)(u,{}),Object(l.jsx)("div",{className:"container container-fluid",children:Object(l.jsxs)($.c,{children:[Object(l.jsx)($.a,{path:"/downloads",children:Object(l.jsx)(Z,{})}),Object(l.jsx)($.a,{children:Object(l.jsx)(q,{})})]})}),Object(l.jsx)("footer",{className:"footer mt-auto py-3",children:Object(l.jsx)("div",{className:"text-muted",children:"Copyright \xa9 2021 Eric Rabil, Matthew Blose Jacob Haupert, and Navin George."})})]})}s.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(i.a,{children:Object(l.jsx)(_,{})})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.53926200.chunk.js.map