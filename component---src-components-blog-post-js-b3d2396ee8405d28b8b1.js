(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{139:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return s}),a.d(t,"pageQuery",function(){return c});var n=a(0),r=a.n(n),i=a(152),o=a(150);function s(e){var t=e.data.markdownRemark;return r.a.createElement(i.a,{singlePost:!0},r.a.createElement(o.a,{title:""+t.frontmatter.title,keywords:["gatsby","application","react"]}),r.a.createElement("div",{className:"blog-post-container"},r.a.createElement("div",{className:"blog-post"},r.a.createElement("span",{className:"blog-post-date"},t.fields.date),r.a.createElement("h1",null,t.frontmatter.title),r.a.createElement("div",{className:"blog-post-content",dangerouslySetInnerHTML:{__html:t.html}}))))}var c="768320269"},145:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return g}),a.d(t,"StaticQueryContext",function(){return p}),a.d(t,"StaticQuery",function(){return m});var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=a(144),c=a.n(s);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return s.withPrefix}),a.d(t,"navigate",function(){return s.navigate}),a.d(t,"push",function(){return s.push}),a.d(t,"replace",function(){return s.replace}),a.d(t,"navigateTo",function(){return s.navigateTo});var l=a(146),u=a.n(l);a.d(t,"PageRenderer",function(){return u.a});var d=a(32);a.d(t,"parsePath",function(){return d.a});var p=r.a.createContext({}),m=function(e){return r.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function g(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},146:function(e,t,a){var n;e.exports=(n=a(148))&&n.default||n},147:function(e){e.exports={data:{site:{siteMetadata:{title:"arysom webdew blog"}}}}},148:function(e,t,a){"use strict";a.r(t);a(33);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=a(52),c=a(2),l=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json))};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=l},149:function(e,t,a){},150:function(e,t,a){"use strict";var n=a(151),r=a(0),i=a.n(r),o=a(4),s=a.n(o),c=a(153),l=a.n(c),u=a(145);function d(e){var t=e.description,a=e.lang,r=e.meta,o=e.keywords,s=e.title;return i.a.createElement(u.StaticQuery,{query:p,render:function(e){var n=t||e.site.siteMetadata.description;return i.a.createElement(l.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:s},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:n}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=d;var p="1025518380"},151:function(e){e.exports={data:{site:{siteMetadata:{title:"arysom webdew blog",description:"new version of personal techie blog",author:"@arysom"}}}}},152:function(e,t,a){"use strict";var n=a(147),r=a(0),i=a.n(r),o=a(4),s=a.n(o),c=a(145),l=function(e){var t=e.siteTitle;return i.a.createElement("header",{style:{background:"black"}},i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 1.0875rem"}},i.a.createElement("h1",{style:{margin:0}},i.a.createElement(c.Link,{to:"/",style:{color:"white",textDecoration:"none"}},t))))};l.propTypes={siteTitle:s.a.string},l.defaultProps={siteTitle:""};var u=l,d=(a(149),function(e){var t=e.children,a=e.singlePost;return i.a.createElement(c.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(u,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:50}},i.a.createElement("main",null,t),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"),a&&i.a.createElement(c.Link,{style:{border:"1px solid black",padding:"5px 10px",marginLeft:25},to:"/"},"Back to index"))))},data:n})});d.propTypes={children:s.a.node.isRequired};t.a=d}}]);
//# sourceMappingURL=component---src-components-blog-post-js-b3d2396ee8405d28b8b1.js.map