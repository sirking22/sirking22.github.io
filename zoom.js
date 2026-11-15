/* 15.11.2026, слово владельца: увеличенный кадр листается — свайп, стрелки, клавиши; счётчик и подпись внизу, на чёрном поле, а не поверх кадра. Листаются кадры одной главы. */
(function(){
  var imgs=[].slice.call(document.querySelectorAll('.v3 figure img'));
  if(!imgs.length) return;
  var en=(document.documentElement.lang||'').indexOf('en')===0;
  var d=document.createElement('dialog'); d.className='zoom';
  d.innerHTML='<div class="zoom-stage"><img alt=""></div>'+
    '<div class="zoom-bar"><span class="zoom-count"></span><p class="zoom-cap"></p>'+
    '<span class="zoom-nav"><button type="button" class="zoom-prev" aria-label="'+(en?'Previous':'Назад')+'">←</button>'+
    '<button type="button" class="zoom-next" aria-label="'+(en?'Next':'Дальше')+'">→</button></span>'+
    '<button type="button" class="zoom-close" aria-label="'+(en?'Close':'Закрыть')+'">×</button></div>';
  document.body.appendChild(d);
  var big=d.querySelector('img'), count=d.querySelector('.zoom-count'), cap=d.querySelector('.zoom-cap');
  var group=[], at=0;
  function pad(n){ return (n<10?'0':'')+n; }
  function show(k){
    at=(k+group.length)%group.length;
    var i=group[at]; big.src=i.currentSrc||i.src; big.alt=i.alt;
    var fc=i.closest('figure').querySelector(':scope > figcaption');
    cap.innerHTML=fc?fc.innerHTML:''; cap.hidden=!fc;
    count.textContent=pad(at+1)+' / '+pad(group.length);
    d.classList.toggle('single',group.length<2);
  }
  imgs.forEach(function(i){ i.addEventListener('click',function(){
    var box=i.closest('.v3-chapter')||document;
    group=imgs.filter(function(x){ return box.contains(x); });
    show(group.indexOf(i)); d.showModal();
  }); });
  d.querySelector('.zoom-prev').addEventListener('click',function(e){ e.stopPropagation(); show(at-1); });
  d.querySelector('.zoom-next').addEventListener('click',function(e){ e.stopPropagation(); show(at+1); });
  d.querySelector('.zoom-close').addEventListener('click',function(){ d.close(); });
  var x0=null, y0=0, swiped=false;
  d.addEventListener('touchstart',function(e){ x0=e.touches[0].clientX; y0=e.touches[0].clientY; swiped=false; },{passive:true});
  d.addEventListener('touchend',function(e){
    if(x0===null) return; var t=e.changedTouches[0], dx=t.clientX-x0, dy=t.clientY-y0; x0=null;
    if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy) && group.length>1){ swiped=true; show(at+(dx<0?1:-1)); }
  });
  d.querySelector('.zoom-stage').addEventListener('click',function(){ if(swiped){ swiped=false; return; } d.close(); });
  d.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'){ show(at+1); e.preventDefault(); }
    if(e.key==='ArrowLeft'){ show(at-1); e.preventDefault(); }
  });
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
