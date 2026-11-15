(function(){
  var imgs=document.querySelectorAll('.v3 figure img');
  if(!imgs.length) return;
  var d=document.createElement('dialog'); d.className='zoom';
  var big=document.createElement('img'); big.alt=''; d.appendChild(big);
  document.body.appendChild(d);
  imgs.forEach(function(i){ i.addEventListener('click',function(){ big.src=i.currentSrc||i.src; big.alt=i.alt; d.showModal(); }); });
  d.addEventListener('click',function(){ d.close(); });
})();
/* 15.11.2026: на касании подпись кадра скрыта под значком «i»; касание значка показывает её поверх кадра на градиенте, как наведение на компьютере. */
(function(){
  if(!window.matchMedia('(hover: none)').matches) return;
  var en=(document.documentElement.lang||'').indexOf('en')===0;
  document.querySelectorAll('.v3 figure').forEach(function(f){
    var c=f.querySelector(':scope > figcaption'); if(!c) return;
    var b=document.createElement('button'); b.type='button'; b.className='cap-i'; b.textContent='i';
    b.setAttribute('aria-label',en?'Caption':'Подпись'); b.setAttribute('aria-expanded','false');
    b.addEventListener('click',function(e){ e.stopPropagation(); var o=f.classList.toggle('cap-open'); b.setAttribute('aria-expanded',o?'true':'false'); });
    f.appendChild(b);
  });
})();
