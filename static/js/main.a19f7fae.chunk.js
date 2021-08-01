(this["webpackJsonpreact-google-forms-example"]=this["webpackJsonpreact-google-forms-example"]||[]).push([[0],{171:function(e,t,r){"use strict";r.r(t);r(81);var n=r(0),a=r.n(n),i=r(73),o=r.n(i),l=r(2),u=r(3),c=r(79),s=r(74),d=r.n(s),m=r(36),p=r.n(m),f=r(18),b=r.n(f);r(75),"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function v(e,t){try{var r=e()}catch(n){return t(n)}return r&&r.then?r.then(void 0,t):r}function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var E,y,g,h,_=function(e,t,r){if(null===e)throw new Error("You need to wrap your form with a GoogleFormProvider");var n=e.getField(t);if(n.type!==r)throw new Error("Field with id "+n.id+" is not of type "+r);return n},j=["children"],x=Object(n.createContext)(null),S=function(){return Object(n.useContext)(x)},k=function(e){var t=e.children,r=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,j);return Object(n.createElement)(x.Provider,{value:r},t)},w=function(e,t){var r=S(),a=_(r,e,t),i=Object(n.useState)(!1),o=i[0],l=i[1],u=function(t){return r.register(e,O({required:a.required},t))},c=r.watch(e);Object(n.useEffect)((function(){"RADIO"===a.type?l(a.required&&c&&"__other_option__"===c):l(a.required&&c&&1===c.length&&c.includes("__other_option__"))}),[c,o]);var s=a.options.filter((function(e){return!e.custom})),d=function(t){return e+"-"+b()(t)},m={options:s.map((function(e){var t=d(e.label);return O({},e,{id:t,registerOption:function(t){return O({},u(O({},t)),{value:e.label})}})}))},p=a.options.find((function(e){return e.custom}));if(p){var f=d("__other_option__"),v=function(e){return e+"-other_option_response"}(f),E=r.formState.errors[v];m.customOption=O({},p,{id:f,registerOption:function(e){return void 0===e&&(e={}),O({},u(O({},e)),{value:"__other_option__"})},registerCustomInput:function(e){return void 0===e&&(e={}),r.register(v,O({required:o},e))},error:E})}var y=r.formState.errors[a.id];return O({},a,m,{error:y})},R=function(e){var t=e.form,r=Object(c.a)();r.getField=function(e){return function(e,t){var r=t.fieldsOrder[e];if(void 0===r)throw new Error("Field with id "+e+" wasn't found in your form");return t.fields[r]}(e,t)};return r.submitToGoogleForms=function(e){try{var r={};Object.keys(e).forEach((function(t){var n;r[(n=t,n.includes("other_option_response")?"entry."+n.replace("-__other_option__-other_option_response","")+".other_option_response":"entry."+n)]=e[t]}));var n=d.a.stringify(r,{skipNull:!0,skipEmptyString:!0}),a=v((function(){return Promise.resolve(p.a.get("https://docs.google.com/forms/d/"+t.action+"/formResponse?"+n+"&submit=Submit",{headers:{"Content-Type":"application/x-www-form-urlencoded"}})).then((function(){}))}),(function(){}));return Promise.resolve(a&&a.then?a.then((function(){})):void 0)}catch(i){return Promise.reject(i)}},r},C=function(e,t){var r=S(),n=_(r,e,t),a=r.formState.errors[n.id];return O({},n,{register:function(t){return r.register(e,O({required:n.required},t))},error:a})},I=function(e,t){var r=S(),a=Object(n.useState)(void 0),i=a[0],o=a[1],l=_(r,e,t),u=function(t,r){return e+"-"+t+"-"+b()(r)};Object(n.useEffect)((function(){var e=l.lines.reduce((function(e,t){var n=r.formState.errors[t.id];return n&&(e[t.id]=n),e}),{});Object.keys(e).length>0?o(e):o(void 0)}),[r.formState.errors]);return O({},l,{renderGrid:function(e){return l.lines.map((function(t){return e(O({},t,{renderColumns:function(e){return l.columns.map((function(n){var a=u(t.id,n.label);return e(O({},n,{registerColumn:function(e){return O({},function(e){return r.register(t.id,O({required:l.required},e))}(e),{value:n.label})},id:a}))}))}}))}))},errors:i})},q=function(e){var t=S(),r=_(t,e,"DROPDOWN"),n=t.formState.errors[r.id],a=r.options.map((function(e){var t;return O({},e,{id:(t=e.label,r.id+"-"+b()(t))})}));return O({},r,{options:a,register:function(n){return t.register(e,O({required:r.required},n))},error:n})},A=function(e){var t=S(),r=_(t,e,"LINEAR"),n=function(n){return t.register(e,O({required:r.required},n))},a=t.formState.errors[r.id],i=r.options.map((function(e){var t,a=(t=e.label,r.id+"-"+b()(t));return O({},e,{id:a,registerOption:function(t){return O({},n(t),{value:e.label})}})}));return O({},r,{options:i,error:a})},D=r(37),F=u.a.div(E||(E=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),G=u.a.div(y||(y=Object(l.a)(["\n  display: flex;\n\n  & label {\n    margin: 0 10px;\n  }\n"])));function N(e){var t=function(e){return w(e,"CHECKBOX")}(e.id),r=t.options,n=t.customOption;return a.a.createElement(F,null,r.map((function(e){return a.a.createElement(G,{key:e.id},a.a.createElement("input",Object.assign({type:"checkbox",id:e.id},e.registerOption())),a.a.createElement("label",{htmlFor:e.id},e.label))})),n&&a.a.createElement(G,null,a.a.createElement("input",Object.assign({type:"checkbox",id:n.id},n.registerOption())),a.a.createElement("label",{htmlFor:n.id},"Outra"),a.a.createElement("input",Object.assign({type:"text",placeholder:"Resposta aqui"},n.registerCustomInput()))))}var H,P,W,L,B=u.a.div(g||(g=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),K=u.a.div(h||(h=Object(l.a)(["\n  display: flex;\n\n  & label {\n    margin: 0 10px;\n  }\n"])));function T(e){var t=function(e){return w(e,"RADIO")}(e.id),r=t.options,n=t.customOption;return a.a.createElement(B,null,r.map((function(e){return a.a.createElement(K,{key:e.id},a.a.createElement("input",Object.assign({type:"radio",id:e.id},e.registerOption())),a.a.createElement("label",{htmlFor:e.id},e.label))})),n&&a.a.createElement(K,null,a.a.createElement("input",Object.assign({type:"radio",id:n.id},n.registerOption())),a.a.createElement("label",{htmlFor:n.id},"Outra"),a.a.createElement("input",Object.assign({type:"text",placeholder:"Resposta aqui"},n.registerCustomInput()))))}function X(e){var t=function(e){return C(e,"SHORT_ANSWER")}(e.id).register;return a.a.createElement("div",null,a.a.createElement("input",Object.assign({type:"text"},t())))}function J(e){var t=function(e){return C(e,"LONG_ANSWER")}(e.id).register;return a.a.createElement("div",null,a.a.createElement("textarea",Object.assign({type:"text"},t())))}var U,Y,z,M,Q=u.a.div(H||(H=Object(l.a)(["\n  display: table;\n"]))),V=u.a.header(P||(P=Object(l.a)(["\n  display: table-row;\n"]))),Z=u.a.div(W||(W=Object(l.a)(["\n  display: table-row;\n"]))),$=u.a.div(L||(L=Object(l.a)(["\n  display: table-cell;\n  padding: 5px;\n"])));function ee(e){var t=function(e){return I(e,"RADIO_GRID")}(e.id),r=t.columns,n=t.renderGrid;return a.a.createElement(Q,null,a.a.createElement(V,null,a.a.createElement($,null),r.map((function(e){return a.a.createElement($,{key:e.label},e.label)}))),n((function(e){return a.a.createElement(Z,{key:e.label},a.a.createElement($,null,e.label),e.renderColumns((function(e){return a.a.createElement($,{key:e.label},a.a.createElement("input",Object.assign({type:"radio"},e.registerColumn())))})))})))}var te,re=u.a.div(U||(U=Object(l.a)(["\n  display: table;\n"]))),ne=u.a.header(Y||(Y=Object(l.a)(["\n  display: table-row;\n"]))),ae=u.a.div(z||(z=Object(l.a)(["\n  display: table-row;\n"]))),ie=u.a.div(M||(M=Object(l.a)(["\n  display: table-cell;\n  padding: 5px;\n"])));function oe(e){var t=function(e){return I(e,"CHECKBOX_GRID")}(e.id),r=t.columns,n=t.renderGrid;return a.a.createElement(re,null,a.a.createElement(ne,null,a.a.createElement(ie,null),r.map((function(e){return a.a.createElement(ie,{key:e.label},e.label)}))),n((function(e){return a.a.createElement(ae,{key:e.label},a.a.createElement(ie,null,e.label),e.renderColumns((function(e){return a.a.createElement(ie,{key:e.label},a.a.createElement("input",Object.assign({type:"checkbox"},e.registerColumn())))})))})))}function le(e){var t=e.id,r=q(t),n=r.register,i=r.options;return a.a.createElement("div",null,a.a.createElement("select",n(),a.a.createElement("option",{value:""},"Select option"),i.map((function(e){return a.a.createElement("option",{key:e.label,value:e.label},e.label)}))))}var ue,ce,se,de=u.a.div(te||(te=Object(l.a)(["\n  display: flex;\n  align-items: center;\n\n  & * {\n    margin: 0 10px;\n  }\n"])));function me(e){var t=e.id,r=A(t),n=r.options,i=r.legend;return a.a.createElement(de,null,a.a.createElement("div",null,i.labelFirst),n.map((function(e){return a.a.createElement("input",Object.assign({key:e.id,type:"radio"},e.registerOption()))})),a.a.createElement("div",null,i.labelLast))}var pe=u.a.form(ue||(ue=Object(l.a)(["\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 50px 0;\n"]))),fe=u.a.div(ce||(ce=Object(l.a)(["\n  margin-bottom: 20px;\n"]))),be=u.a.h3(se||(se=Object(l.a)(["\n  margin-bottom: 10px;\n"]))),ve=function(){return a.a.createElement("div",null,D.fields.map((function(e){var t=e.id,r=null;switch(e.type){case"CHECKBOX":r=a.a.createElement(N,{id:t});break;case"RADIO":r=a.a.createElement(T,{id:t});break;case"SHORT_ANSWER":r=a.a.createElement(X,{id:t});break;case"LONG_ANSWER":r=a.a.createElement(J,{id:t});break;case"RADIO_GRID":r=a.a.createElement(ee,{id:t});break;case"CHECKBOX_GRID":r=a.a.createElement(oe,{id:t});break;case"DROPDOWN":r=a.a.createElement(le,{id:t});break;case"LINEAR":r=a.a.createElement(me,{id:t})}return r?a.a.createElement(fe,{key:t},a.a.createElement(be,null,e.label),r):null})))},Oe=function(){var e=R({form:D});return console.log(">>> Here are the errors!!!",e.formState.errors),a.a.createElement(k,e,a.a.createElement(pe,{onSubmit:e.handleSubmit((function(t){console.log(">>> Here is the data",t),e.submitToGoogleForms(t)}))},a.a.createElement(ve,null),a.a.createElement("button",{type:"submit"},"Submeter")))};o.a.render(a.a.createElement(Oe,null),document.getElementById("root"))},37:function(e){e.exports=JSON.parse('{"fvv":1,"pageHistory":0,"fbzx":"-3884806812117335158","action":"e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g","fields":[{"label":"Multiple choice","type":"RADIO","id":"2081366314","options":[{"label":"Op\xe7\xe3o 1","custom":false},{"label":"Op\xe7\xe3o 2","custom":false},{"label":"Op\xe7\xe3o 3","custom":false},{"label":"Op\xe7\xe3o 4","custom":false},{"label":"","custom":true}],"required":false}],"fieldsOrder":{"2081366314":0}}')},80:function(e,t,r){e.exports=r(171)},81:function(e,t,r){}},[[80,1,2]]]);
//# sourceMappingURL=main.a19f7fae.chunk.js.map