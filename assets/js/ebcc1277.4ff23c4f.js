"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[184],{5788:(e,t,n)=>{n.d(t,{Iu:()=>p,yg:()=>m});var r=n(1504);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=d(n),f=i,m=l["".concat(s,".").concat(f)]||l[f]||u[f]||a;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[l]="string"==typeof e?e:i,o[1]=c;for(var d=2;d<a;d++)o[d]=n[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9700:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var r=n(5072),i=(n(1504),n(5788));const a={},o="Actions",c={unversionedId:"actions/index",id:"actions/index",title:"Actions",description:"This documentation is no longer maintained. Pleas refer to the new documentation at https://publish.obsidian.md/advanced-uri-doc",source:"@site/docs/actions/index.md",sourceDirName:"actions",slug:"/actions/",permalink:"/obsidian-advanced-uri/actions/",draft:!1,editUrl:"https://github.com/Vinzent03/obsidian-advanced-uri/tree/master/docs/docs/actions/index.md",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Navigation Parameters",permalink:"/obsidian-advanced-uri/concepts/navigation_parameters"},next:{title:"Navigation",permalink:"/obsidian-advanced-uri/actions/navigation"}},s={},d=[],p={toc:d},l="wrapper";function u(e){let{components:t,...n}=e;return(0,i.yg)(l,(0,r.c)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"actions"},"Actions"),(0,i.yg)("admonition",{title:"Documentation discontinued",type:"warning"},(0,i.yg)("p",{parentName:"admonition"},"This documentation is no longer maintained. Pleas refer to the new documentation at ",(0,i.yg)("a",{parentName:"p",href:"https://publish.obsidian.md/advanced-uri-doc"},"https://publish.obsidian.md/advanced-uri-doc"))),(0,i.yg)("p",null,"Actions are combinations of different parameters.\nFor example if you pass a file path and content, it writes the content to the file."),(0,i.yg)("admonition",{type:"info"},(0,i.yg)("p",{parentName:"admonition"},"The ",(0,i.yg)("inlineCode",{parentName:"p"},"<identification>")," key should be replaced by your chosen identification as described in ",(0,i.yg)("a",{parentName:"p",href:"/obsidian-advanced-uri/concepts/file_identifiers"},"File Identifiers"))))}u.isMDXComponent=!0}}]);