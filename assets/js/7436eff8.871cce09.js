"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[454],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var p=r.createContext({}),c=function(t){var e=r.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},u=function(t){var e=c(t.components);return r.createElement(p.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},s=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,i=t.originalType,p=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),s=c(n),m=a,f=s["".concat(p,".").concat(m)]||s[m]||d[m]||i;return n?r.createElement(f,o(o({ref:e},u),{},{components:n})):r.createElement(f,o({ref:e},u))}));function m(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var i=n.length,o=new Array(i);o[0]=s;var l={};for(var p in e)hasOwnProperty.call(e,p)&&(l[p]=e[p]);l.originalType=t,l.mdxType="string"==typeof t?t:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},1654:function(t,e,n){n.r(e),n.d(e,{assets:function(){return u},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return d}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1},p="Navigation",c={unversionedId:"actions/navigation",id:"actions/navigation",title:"Navigation",description:"| /                      | parameters                 | explanation                                                                                                                      |",source:"@site/docs/actions/navigation.md",sourceDirName:"actions",slug:"/actions/navigation",permalink:"/actions/navigation",editUrl:"https://github.com/Vinzent03/obsidian-advanced-uri/tree/master/docs/docs/actions/navigation.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"sidebar",previous:{title:"Actions",permalink:"/actions/"},next:{title:"Writing",permalink:"/actions/writing"}},u={},d=[],s={toc:d};function m(t){var e=t.components,n=(0,a.Z)(t,o);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"navigation"},"Navigation"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"/"),(0,i.kt)("th",{parentName:"tr",align:null},"parameters"),(0,i.kt)("th",{parentName:"tr",align:null},"explanation"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"workspace"),(0,i.kt)("td",{parentName:"tr",align:null},"workspace"),(0,i.kt)("td",{parentName:"tr",align:null},"Opens the workspace called ",(0,i.kt)("inlineCode",{parentName:"td"},"workspace"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"save current workspace"),(0,i.kt)("td",{parentName:"tr",align:null},"saveworkspace=true"),(0,i.kt)("td",{parentName:"tr",align:null},"Saves the current workspace. (Can be combined with ",(0,i.kt)("inlineCode",{parentName:"td"},"workspace")," to open a new workspace afterwards)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"file"),(0,i.kt)("td",{parentName:"tr",align:null},"<identification",">"),(0,i.kt)("td",{parentName:"tr",align:null},"Opens file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"line in file"),(0,i.kt)("td",{parentName:"tr",align:null},"<identification",">",", line"),(0,i.kt)("td",{parentName:"tr",align:null},"Opens line ",(0,i.kt)("inlineCode",{parentName:"td"},"line")," in file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"heading"),(0,i.kt)("td",{parentName:"tr",align:null},"<identification",">",", heading"),(0,i.kt)("td",{parentName:"tr",align:null},"Opens the ",(0,i.kt)("inlineCode",{parentName:"td"},"heading")," in file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"block reference"),(0,i.kt)("td",{parentName:"tr",align:null},"<identification",">",", block"),(0,i.kt)("td",{parentName:"tr",align:null},"Opens the ",(0,i.kt)("inlineCode",{parentName:"td"},"block")," in file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"settings tab"),(0,i.kt)("td",{parentName:"tr",align:null},"settingid"),(0,i.kt)("td",{parentName:"tr",align:null},"Opens a settings tab by id, all plugins are supported (e.g. ",(0,i.kt)("inlineCode",{parentName:"td"},"editor"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"community-plugins"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"plugin-browser"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"theme-browser"),"...)")))))}m.isMDXComponent=!0}}]);