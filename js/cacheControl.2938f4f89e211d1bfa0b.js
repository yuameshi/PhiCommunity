(()=>{"use strict";window.addEventListener("DOMContentLoaded",(async()=>{const e=[],t=document.getElementById("container");document.querySelector("#delAllCache").addEventListener("click",(function(){e.forEach((e=>{e.delCache().then(e.element.remove)}))})),(await caches.keys()).forEach((async n=>{const a=await caches.open(n);(await a.keys()).forEach((function(n){const c=function(e,t){const n=document.createElement("div");n.classList.add("item"),n.setAttribute("title",t.url),n.setAttribute("data-url",t.url),n.setAttribute("data-file-name",new URL(t.url).pathname.split("/")[new URL(t.url).pathname.split("/").length-1]);const a=document.createElement("button");return a.classList.add("deleteBtn"),a.innerText="删除",a.addEventListener("click",c),container.appendChild(n),n.appendChild(a),{element:n,delCache:c};async function c(){await e.delete(t),a.removeEventListener("click",c),n.remove()}}(a,n);t.append(c.element),e.push(c)}))}))}))})();