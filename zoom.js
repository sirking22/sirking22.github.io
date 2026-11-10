(function(){
  var imgs=document.querySelectorAll('.v3 figure img');
  if(!imgs.length) return;
  var d=document.createElement('dialog'); d.className='zoom';
  var big=document.createElement('img'); big.alt=''; d.appendChild(big);
  document.body.appendChild(d);
  imgs.forEach(function(i){ i.addEventListener('click',function(){ big.src=i.currentSrc||i.src; big.alt=i.alt; d.showModal(); }); });
  d.addEventListener('click',function(){ d.close(); });
})();
