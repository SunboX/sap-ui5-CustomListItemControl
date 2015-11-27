/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/BindingParser','sap/ui/base/ManagedObject','sap/ui/core/XMLTemplateProcessor','sap/ui/Device','sap/ui/model/BindingMode','sap/ui/model/CompositeBinding','sap/ui/model/Context'],function(q,B,M,X,D,a,C,b){'use strict';var u={},N="http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1",W=M.extend("sap.ui.core.util._with",{metadata:{properties:{any:"any"},aggregations:{child:{multiple:false,type:"sap.ui.core.util._with"}}}}),R=W.extend("sap.ui.core.util._repeat",{metadata:{aggregations:{list:{multiple:true,type:"n/a",_doesNotRequireFactory:true}}},updateList:function(){}});function c(w,S,i,v){function e(p){if(!v){v=w.getBinding("any");if(v instanceof C){v=v.getBindings();if(i!==undefined){v=v[i];}}}return Array.isArray(v)?v[p]:v;}function f(o){return o instanceof b?o.getPath():o.getModel().resolve(o.getPath(),o.getContext());}return{getInterface:function(p,P){var o,h,m;if(typeof p==="string"){P=p;p=undefined;}e();if(Array.isArray(v)){if(p>=0&&p<v.length){h=v[p];}else{throw new Error("Invalid index of part: "+p);}}else if(p!==undefined){throw new Error("Not the root formatter of a composite binding");}else if(P){h=v;}else{throw new Error("Missing path");}if(P){m=h.getModel();if(P.charAt(0)!=='/'){o=h instanceof b?h:m.createBindingContext(h.getPath(),h.getContext());}h=m.createBindingContext(P,o);if(!h){throw new Error("Model could not create binding context synchronously: "+m);}}return c(null,S,undefined,h);},getModel:function(p){var o=e(p);return o&&o.getModel();},getPath:function(p){var o=e(p);return o&&f(o);},getSetting:function(n){if(n==="bindingContexts"||n==="models"){throw new Error("Illegal argument: "+n);}return S[n];}};}function g(w,o,S){function p(I,i){var f=I.formatter;I.mode=a.OneTime;if(f&&f.requiresIContext===true){I.formatter=f.bind(null,c(w,S,i));}}try{p(o);if(o.parts){o.parts.forEach(p);}w.bindProperty("any",o);return w.getBinding("any")?w.getAny():u;}finally{w.unbindProperty("any",true);}}function d(e,L){return e.namespaceURI===N&&l(e)===L;}function l(n){return n.localName||n.baseName;}function r(e){var m=e.getAttribute("template:require");if(m){q.sap.require.apply(q.sap,m.split(" "));}}function s(e){var A,o=e.attributes,t="<"+e.nodeName,i,n;for(i=0,n=o.length;i<n;i+=1){A=o.item(i);t+=" "+A.name+'="'+A.value+'"';}return t+(e.childNodes.length?">":"/>");}return{process:function(o,v,S){var e=v.caller,f=q.sap.log.isLoggable(q.sap.log.Level.DEBUG),h=f,j=v.name,F={},k=0,m,p={},w=q.sap.log.isLoggable(q.sap.log.Level.WARNING);function t(i){if(f){q.sap.log.debug(A()+Array.prototype.slice.call(arguments,1).join(" "),i&&s(i),"sap.ui.core.util.XMLPreprocessor");}}function x(i){if(f){q.sap.log.debug(A()+"Finished","</"+i.nodeName+">","sap.ui.core.util.XMLPreprocessor");}}function y(i,n){i=i+s(n);q.sap.log.error(i,e,"sap.ui.core.util.XMLPreprocessor");throw new Error(e+": "+i);}function z(_){var a1=_.childNodes,b1,c1=[],i,n,d1=false;for(i=0,n=a1.length;i<n;i+=1){b1=a1.item(i);if(b1.nodeType===1){c1.push(b1);}}if(!c1.length||!d(c1[0],"then")){return null;}for(i=1,n=c1.length;i<n;i+=1){b1=c1[i];if(d1){y("Expected </"+_.prefix+":if>, but instead saw ",b1);}if(d(b1,"else")){d1=true;}else if(!d(b1,"elseif")){y("Expected <"+_.prefix+":elseif> or <"+_.prefix+":else>, but instead saw ",c1[i]);}}return c1;}function A(){return(k<10?"[ ":"[")+k+"] ";}function E(m){return m&&m.charAt(0)==="."?q.sap.getObject(m.slice(1),undefined,p):q.sap.getObject(m);}function G(i,n,_,a1,b1){var c1=B.complexParser(i,p,a1,true,true)||i;if(c1.functionsNotFound){if(a1){$(n,'Function name(s)',c1.functionsNotFound.join(", "),'not found');}return u;}if(typeof c1==="object"){c1=g(_,c1,S);if(a1&&c1===u){$(n,'Binding not ready');}}else if(b1){b1();}return c1;}function H(i,n,_){var a1,b1=j;_.$mFragmentContexts=_.$mFragmentContexts||{};if(_.$mFragmentContexts[i]){y("Cyclic reference to fragment '"+i+"' ",n);}k++;t(n,"fragmentName =",i);_.$mFragmentContexts[i]=true;j=i;a1=F[i];if(!a1){a1=X.loadTemplate(i,"fragment");F[i]=a1;}a1=n.ownerDocument.importNode(a1,true);r(a1);if(a1.namespaceURI==="sap.ui.core"&&l(a1)==="FragmentDefinition"){I(a1,_,n);}else{n.parentNode.insertBefore(a1,n);Z(a1,_);}n.parentNode.removeChild(n);j=b1;_.$mFragmentContexts[i]=false;x(n);k--;}function I(i,n,_){var a1;_=_||i;Y(i,n);while((a1=i.firstChild)){_.parentNode.insertBefore(a1,_);}}function J(i,n){var _=$.bind(null,i,'Constant test condition'),a1,b1=i.getAttribute("test"),c1;try{c1=G(b1,i,n,true,_);if(c1===u){c1=false;}}catch(ex){$(i,'Error in formatter:',ex);c1=undefined;}a1=!!c1&&c1!=="false";if(f){if(typeof c1==="string"){c1=JSON.stringify(c1);}else if(c1===undefined){c1="undefined";}else if(Array.isArray(c1)){c1="[object Array]";}t(i,"test ==",c1,"-->",a1);}return a1;}function K(i,n,_){var a1=n.value,b1;try{b1=G(a1,i,_,false);if(b1===u){t(i,'Binding not ready for attribute',n.name);}else if(b1===undefined){t(i,"Removed attribute",n.name);i.removeAttribute(n.name);}else{if(f&&b1!==n.value){t(i,n.name,"=",b1);}n.value=b1;}}catch(ex){t(i,'Error in formatter:',ex);}}function L(i,n){var m=i.getAttribute("name"),_,a1,b1=i.getAttribute("value");if(!m||m.length<=1||m.lastIndexOf(".")!==0){y("Missing proper relative name in ",i);}m=m.slice(1);_=E(b1);if(!_){y("Invalid value in ",i);}a1=p[m];p[m]=_;I(i,n);i.parentNode.removeChild(i);p[m]=a1;}function O(i,n){var m=i.getAttribute("name"),_=u,a1;try{_=G(m,i,n,true);if(_!==u&&_!==m){t(i,"name =",_);}}catch(ex){$(i,'Error in formatter:',ex);}if(_!==u&&sap.ui.core.CustomizingConfiguration){a1=sap.ui.core.CustomizingConfiguration.getViewExtension(j,_,v.componentId);if(a1&&a1.className==="sap.ui.core.Fragment"&&a1.type==="XML"){H(a1.fragmentName,i,n);return true;}}return false;}function P(i,n){var _=i.getAttribute("fragmentName"),a1;try{a1=G(_,i,n,true);}catch(ex){$(i,'Error in formatter:',ex);return;}if(a1!==u){H(a1,i,n);}}function Q(i,n){var _=z(i),a1,b1;k++;if(_){b1=i;a1=_.shift();do{if(J(b1,n)){break;}b1=a1=_.shift();}while(b1&&l(b1)==="elseif");}else if(J(i,n)){a1=i;}if(a1){I(a1,n,i);}i.parentNode.removeChild(i);x(i);k--;}function T(n,_){var a1=n.getAttribute("list")||"",b1=B.complexParser(a1,p,false,true,true),c1,d1,e1,f1,g1=n.getAttribute("var");if(g1===""){y("Missing variable name for ",n);}if(!b1){y("Missing binding for ",n);}if(b1.functionsNotFound){$(n,'Function name(s)',b1.functionsNotFound.join(", "),'not found');}f1=new R();_.setChild(f1);b1.mode=a.OneTime;f1.bindAggregation("list",b1);d1=f1.getBinding("list");f1.unbindAggregation("list",true);e1=b1.model;if(!d1){y("Missing model '"+e1+"' in ",n);}c1=d1.getContexts(b1.startIndex,b1.length);g1=g1||e1;f1.setModel(d1.getModel(),g1);k++;t(n,"Starting");c1.forEach(function(h1,i){var i1=(i===c1.length-1)?n:n.cloneNode(true);f1.setBindingContext(h1,g1);t(n,g1,"=",h1.getPath());I(i1,f1,n);});x(n);k--;n.parentNode.removeChild(n);}function U(i,n){var _,a1,b1,c1,d1=i.getAttribute("helper"),e1,f1=i.getAttribute("path"),g1,h1=i.getAttribute("var");if(h1===""){y("Missing variable name for ",i);}b1=new W();n.setChild(b1);_=B.simpleParser("{"+f1+"}");h1=h1||_.model;if(d1||h1){a1=n.getModel(_.model);if(!a1){y("Missing model '"+_.model+"' in ",i);}g1=a1.resolve(_.path,n.getBindingContext(_.model));if(!g1){y("Cannot resolve path for ",i);}if(d1){c1=E(d1);if(typeof c1!=="function"){y("Cannot resolve helper for ",i);}e1=c1(a1.createBindingContext(g1));if(e1 instanceof b){a1=e1.getModel();g1=e1.getPath();}else if(e1!==undefined){if(typeof e1!=="string"||e1===""){y("Illegal helper result '"+e1+"' in ",i);}g1=e1;}}b1.setModel(a1,h1);b1.bindObject({model:h1,path:g1});}else{b1.bindObject(f1);}k++;t(i,h1,"=",g1);if(b1.getBindingContext(h1)===n.getBindingContext(h1)){$(i,'Set unchanged path:',g1);b1=n;}I(i,b1);i.parentNode.removeChild(i);x(i);k--;}function V(n,_){var i,a1=n.attributes;for(i=a1.length-1;i>=0;i-=1){K(n,a1.item(i),_);}}function Y(_,a1){var i,b1=_.childNodes,n=b1.length,c1=new Array(n);for(i=0;i<n;i+=1){c1[i]=b1.item(i);}b1=null;for(i=0;i<n;i+=1){Z(c1[i],a1);}}function Z(n,i){if(n.nodeType!==1){return;}if(n.namespaceURI===N){switch(l(n)){case"alias":L(n,i);return;case"if":Q(n,i);return;case"repeat":T(n,i);return;case"with":U(n,i);return;default:y("Unexpected tag ",n);}}else if(n.namespaceURI==="sap.ui.core"){switch(l(n)){case"ExtensionPoint":if(O(n,i)){return;}break;case"Fragment":if(n.getAttribute("type")==="XML"){P(n,i);return;}break;}}V(n,i);Y(n,i);}function $(i){if(w){if(!h){h=true;q.sap.log.warning("Warning(s) during processing of "+e,null,"sap.ui.core.util.XMLPreprocessor");}q.sap.log.warning(A()+Array.prototype.slice.call(arguments,1).join(" "),i&&s(i),"sap.ui.core.util.XMLPreprocessor");}}S=S||{};if(f){t(undefined,"Start processing",e);if(S.bindingContexts instanceof b){t(undefined,"undefined =",S.bindingContexts);}else{for(m in S.bindingContexts){t(undefined,m,"=",S.bindingContexts[m]);}}}r(o);Z(o,new W({models:S.models,bindingContexts:S.bindingContexts}));t(undefined,"Finished processing",e);return o;}};},true);