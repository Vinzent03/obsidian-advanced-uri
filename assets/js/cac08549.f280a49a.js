"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[206],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),m=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=m(e.components);return i.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},s=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=m(n),d=a,f=s["".concat(p,".").concat(d)]||s[d]||u[d]||r;return n?i.createElement(f,l(l({ref:t},c),{},{components:n})):i.createElement(f,l({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=s;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var m=2;m<r;m++)l[m]=n[m];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}s.displayName="MDXCreateElement"},6017:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return o},metadata:function(){return m},toc:function(){return u}});var i=n(7462),a=n(3366),r=(n(7294),n(3905)),l=["components"],o={sidebar_position:3},p="File identifiers",m={unversionedId:"concepts/file_identifiers",id:"concepts/file_identifiers",title:"File identifiers",description:"There are multiple ways to identify a file:",source:"@site/docs/concepts/file_identifiers.md",sourceDirName:"concepts",slug:"/concepts/file_identifiers",permalink:"/concepts/file_identifiers",editUrl:"https://github.com/Vinzent03/obsidian-advanced-uri/tree/master/docs/docs/concepts/file_identifiers.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"sidebar",previous:{title:"Encoding",permalink:"/concepts/encoding"},next:{title:"View mode",permalink:"/concepts/view_mode"}},c={},u=[{value:"File path",id:"file-path",level:2},{value:"File name",id:"file-name",level:2},{value:"Daily note",id:"daily-note",level:2},{value:"Key in frontmatter",id:"key-in-frontmatter",level:2}],s={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,l);return(0,r.kt)("wrapper",(0,i.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"file-identifiers"},"File identifiers"),(0,r.kt)("p",null,"There are multiple ways to identify a file:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#file-path"},"File path")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#file-name"},"File name")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#daily-note"},"Daily note")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#key-in-frontmatter"},"Key in frontmatter"))),(0,r.kt)("h2",{id:"file-path"},"File path"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Key: ",(0,r.kt)("inlineCode",{parentName:"li"},"filepath")),(0,r.kt)("li",{parentName:"ul"},"Value: Relative path to the vault"),(0,r.kt)("li",{parentName:"ul"},"Example: ",(0,r.kt)("inlineCode",{parentName:"li"},"hobbies/soccer.md")," / ",(0,r.kt)("inlineCode",{parentName:"li"},"hobbies/soccer")),(0,r.kt)("li",{parentName:"ul"},"Note: You can omit the file extension ",(0,r.kt)("inlineCode",{parentName:"li"},".md"),".")),(0,r.kt)("h2",{id:"file-name"},"File name"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Key: ",(0,r.kt)("inlineCode",{parentName:"li"},"filename")),(0,r.kt)("li",{parentName:"ul"},"Value: Only the name of the file without the actual path"),(0,r.kt)("li",{parentName:"ul"},"Example: ",(0,r.kt)("inlineCode",{parentName:"li"},"soccer")," / ",(0,r.kt)("inlineCode",{parentName:"li"},"soccer.md")),(0,r.kt)("li",{parentName:"ul"},"Note: You can omit the file extension ",(0,r.kt)("inlineCode",{parentName:"li"},".md"),". It prefers just the file name, like when linking via ",(0,r.kt)("inlineCode",{parentName:"li"},"[[fileName]]"),", causing aliases to be supported.")),(0,r.kt)("h2",{id:"daily-note"},"Daily note"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Key: ",(0,r.kt)("inlineCode",{parentName:"li"},"daily")),(0,r.kt)("li",{parentName:"ul"},"Value: ",(0,r.kt)("inlineCode",{parentName:"li"},"true")),(0,r.kt)("li",{parentName:"ul"},"Example: ",(0,r.kt)("inlineCode",{parentName:"li"},"daily=true")),(0,r.kt)("li",{parentName:"ul"},"Note: To use the current daily note simply set the key to ",(0,r.kt)("inlineCode",{parentName:"li"},"true"),". If it doesn't exist already, it will be created. ")),(0,r.kt)("h2",{id:"key-in-frontmatter"},"Key in frontmatter"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Key: ",(0,r.kt)("inlineCode",{parentName:"li"},"uid")),(0,r.kt)("li",{parentName:"ul"},"Example: ",(0,r.kt)("inlineCode",{parentName:"li"},"uid=d43f7a17-058c-4aea-b8dc-515ea646825a")),(0,r.kt)("li",{parentName:"ul"},"Use case: Some users prefer to navigate to specific notes per UUID instead of the file path to be able to rename these files, but to keep the link still working."),(0,r.kt)("li",{parentName:"ul"},"Note: By enabling that option in the setting, every generated command with the ",(0,r.kt)("inlineCode",{parentName:"li"},"filepath")," parameter is replaced with the ",(0,r.kt)("inlineCode",{parentName:"li"},"uid")," parameter. The uid is either read from the frontmatter or generated and then written to the frontmatter. ")),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Navigation is always supported and doesn't need the setting to be enabled."))))}d.isMDXComponent=!0}}]);