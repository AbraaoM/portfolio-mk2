(function(){
  // Tema: segue o sistema até o visitante escolher; a escolha fica salva.
  var root=document.documentElement,tb=document.querySelector('.theme');
  if(tb)tb.addEventListener('click',function(){var n=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}});
  try{matchMedia('(prefers-color-scheme: light)').addEventListener('change',function(e){if(!localStorage.getItem('theme'))root.dataset.theme=e.matches?'light':'dark'})}catch(e){}
  // Idioma: lembra a escolha; na primeira visita à raiz, sugere EN para navegadores fora do português.
  var lang=document.documentElement.lang.indexOf('pt')===0?'pt':'en';
  var sw=document.querySelector('.lang');
  if(sw)sw.addEventListener('click',function(){try{localStorage.setItem('lang',sw.dataset.lang)}catch(e){}});
  try{
    var saved=localStorage.getItem('lang');
    var q=new URLSearchParams(location.search).get('lang');
    if(q==='pt'||q==='en'){localStorage.setItem('lang',q);saved=q}
    var want=saved||(lang==='pt'&&(navigator.language||'pt').toLowerCase().indexOf('pt')!==0?'en':lang);
    if(want!==lang&&sw){location.replace(sw.href+location.hash);return}
  }catch(e){}
  // Artigos do DEV
  var box=document.getElementById('articles-list');if(!box)return;
  function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  fetch('https://dev.to/api/articles?username=abraaom&per_page=6').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(a){
    box.innerHTML=a.slice(0,6).map(function(x){return '<a class="card article" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">'+(x.cover_image?'<img src="'+esc(x.cover_image)+'" alt="" loading="lazy">':'')+'<h3>'+esc(x.title)+'</h3><p>'+esc(x.description)+'</p></a>'}).join('')||'<p class="muted">'+esc(box.dataset.err)+'</p>';
  }).catch(function(){box.innerHTML='<p class="muted">'+esc(box.dataset.err)+'</p>'});
})();
