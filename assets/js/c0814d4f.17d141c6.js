"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[125],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=p(r),m=a,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return r?n.createElement(f,c(c({ref:t},s),{},{components:r})):n.createElement(f,c({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,c=new Array(i);c[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var p=2;p<i;p++)c[p]=r[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6511:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return u}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),c=["components"],o={sidebar_position:4},l="Search and Replace",p={unversionedId:"actions/search_replace",id:"actions/search_replace",title:"Search and Replace",description:"| /      | parameters                              | explanation                                                                  |",source:"@site/docs/actions/search_replace.md",sourceDirName:"actions",slug:"/actions/search_replace",permalink:"/actions/search_replace",editUrl:"https://github.com/Vinzent03/obsidian-advanced-uri/tree/master/docs/docs/actions/search_replace.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"sidebar",previous:{title:"Commands",permalink:"/actions/commands"},next:{title:"Others",permalink:"/actions/others"}},s={},u=[],d={toc:u};function m(e){var t=e.components,r=(0,a.Z)(e,c);return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"search-and-replace"},"Search and Replace"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"/"),(0,i.kt)("th",{parentName:"tr",align:null},"parameters"),(0,i.kt)("th",{parentName:"tr",align:null},"explanation"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Normal"),(0,i.kt)("td",{parentName:"tr",align:null},"search, replace"),(0,i.kt)("td",{parentName:"tr",align:null},"Replaces every occurrence of ",(0,i.kt)("inlineCode",{parentName:"td"},"search")," with ",(0,i.kt)("inlineCode",{parentName:"td"},"replace")," in the current file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Normal"),(0,i.kt)("td",{parentName:"tr",align:null},"search, replace, <identification",">"),(0,i.kt)("td",{parentName:"tr",align:null},"Replaces every occurrence of ",(0,i.kt)("inlineCode",{parentName:"td"},"search")," with ",(0,i.kt)("inlineCode",{parentName:"td"},"replace")," in file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"RegEx"),(0,i.kt)("td",{parentName:"tr",align:null},"searchregex, replace"),(0,i.kt)("td",{parentName:"tr",align:null},"Uses ",(0,i.kt)("inlineCode",{parentName:"td"},"searchregex")," to replace every match with ",(0,i.kt)("inlineCode",{parentName:"td"},"replace")," in the current file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"RegEx"),(0,i.kt)("td",{parentName:"tr",align:null},"searchregex, replace, <identification",">"),(0,i.kt)("td",{parentName:"tr",align:null},"Uses ",(0,i.kt)("inlineCode",{parentName:"td"},"searchregex")," to replace every match with ",(0,i.kt)("inlineCode",{parentName:"td"},"replace")," in file")))))}m.isMDXComponent=!0}}]);