/* VELA FASHION — main.js */
(function(){
  'use strict';

  const products = [
    {id:1,name:'Linen Slip Dress',brand:'VELA',price:28500,was:null,cat:'women',badge:'new',img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',colors:['#C9A84C','#1A1A1A','#E8E0D5'],rating:4.8,reviews:124},
    {id:2,name:'Structured Blazer',brand:'VELA',price:45000,was:65000,cat:'women',badge:'sale',img:'https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=400&q=80',colors:['#1A1A1A','#4B5563'],rating:4.9,reviews:87},
    {id:3,name:'Relaxed Cargo Trousers',brand:'VELA',price:32000,was:null,cat:'men',badge:'hot',img:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',colors:['#6B7280','#1A1A1A','#78716C'],rating:4.7,reviews:56},
    {id:4,name:'Silk Cami Set',brand:'VELA',price:38000,was:52000,cat:'women',badge:'sale',img:'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&q=80',colors:['#C9A84C','#FBE8D0'],rating:4.9,reviews:201},
    {id:5,name:'Oversized Tee',brand:'VELA',price:12500,was:null,cat:'men',badge:'new',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',colors:['#ffffff','#1A1A1A','#6B7280'],rating:4.6,reviews:312},
    {id:6,name:'Mini Leather Bag',brand:'VELA',price:55000,was:null,cat:'accessories',badge:'hot',img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',colors:['#78716C','#1A1A1A','#C9A84C'],rating:4.8,reviews:98},
    {id:7,name:'Wide-Leg Linen Pants',brand:'VELA',price:27000,was:36000,cat:'women',badge:'sale',img:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',colors:['#E8E0D5','#1A1A1A'],rating:4.7,reviews:145},
    {id:8,name:'Leather Belt',brand:'VELA',price:15000,was:null,cat:'accessories',badge:'new',img:'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80',colors:['#78716C','#1A1A1A'],rating:4.9,reviews:67},
  ];

  const trending = [
    {id:9,name:'Printed Midi Dress',brand:'VELA',price:42000,was:60000,cat:'women',badge:'sale',img:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',colors:['#C9A84C','#4B5563'],rating:5.0,reviews:43},
    {id:10,name:'Denim Jacket',brand:'VELA',price:38000,was:null,cat:'men',badge:'hot',img:'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80',colors:['#4B5563','#1A1A1A'],rating:4.8,reviews:189},
    {id:11,name:'Strappy Heeled Sandals',brand:'VELA',price:29000,was:40000,cat:'women',badge:'sale',img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',colors:['#C9A84C','#1A1A1A','#ffffff'],rating:4.7,reviews:76},
    {id:12,name:'Canvas Tote',brand:'VELA',price:18500,was:null,cat:'accessories',badge:'new',img:'https://images.unsplash.com/photo-1574512542885-01b3fa44cc7c?w=400&q=80',colors:['#E8E0D5','#1A1A1A'],rating:4.6,reviews:234},
  ];

  // CART STATE
  let cart = [];
  let cartOpen = false;

  function getTotal(){return cart.reduce((s,i)=>s+i.price*i.qty,0);}
  function formatPrice(n){return '₦'+n.toLocaleString();}

  function updateCartUI(){
    const count = cart.reduce((s,i)=>s+i.qty,0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('drawerCount').textContent = count;
    document.getElementById('cdTotal').textContent = formatPrice(getTotal());

    const items = document.getElementById('cdItems');
    if(cart.length===0){
      items.innerHTML = '<div class="cd-empty"><span>🛍️</span><p>Your bag is empty</p></div>';
    } else {
      items.innerHTML = cart.map(item=>`
        <div class="cd-item">
          <img src="${item.img}" alt="${item.name}"/>
          <div class="cd-item-info">
            <div class="cd-item-name">${item.name}</div>
            <div class="cd-item-var">Qty: ${item.qty}</div>
            <div class="cd-item-price">${formatPrice(item.price*item.qty)}</div>
            <button class="cd-item-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>`).join('');
      items.querySelectorAll('.cd-item-remove').forEach(btn=>{
        btn.addEventListener('click',()=>{
          cart=cart.filter(i=>i.id!==+btn.dataset.id);
          updateCartUI();
        });
      });
    }
  }

  function addToCart(product){
    const existing = cart.find(i=>i.id===product.id);
    if(existing){existing.qty++;}
    else{cart.push({...product,qty:1});}
    updateCartUI();
    showToast(`${product.name} added to bag ✓`);
  }

  function showToast(msg){
    const t=document.getElementById('toast');
    t.textContent=msg;t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),2800);
  }

  function toggleCart(open){
    cartOpen=open;
    document.getElementById('cartDrawer').classList.toggle('open',cartOpen);
    document.getElementById('cartOverlay').classList.toggle('open',cartOpen);
  }

  // RENDER PRODUCT CARD
  function makeCard(p){
    const disc = p.was ? Math.round((1-p.price/p.was)*100) : 0;
    const badgeClass = {new:'badge-new',sale:'badge-sale',hot:'badge-hot'}[p.badge]||'badge-new';
    const el=document.createElement('div');
    el.className='prod-card';
    el.innerHTML=`
      <div class="pc-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.badge?`<span class="pc-badge ${badgeClass}">${p.badge==='sale'?`-${disc}%`:p.badge.toUpperCase()}</span>`:''}
        <button class="pc-fav" data-id="${p.id}" title="Wishlist">♡</button>
        <div class="pc-colors">${(p.colors||[]).map(c=>`<div class="color-dot" style="background:${c}"></div>`).join('')}</div>
        <button class="pc-add" data-id="${p.id}">Add to Bag</button>
      </div>
      <div class="pc-info">
        <div class="pc-brand">${p.brand}</div>
        <div class="pc-name">${p.name}</div>
        <div class="pc-price">
          <span class="price-now">${formatPrice(p.price)}</span>
          ${p.was?`<span class="price-was">${formatPrice(p.was)}</span><span class="price-save">-${disc}%</span>`:''}
        </div>
        <div class="pc-rating"><span>★</span> ${p.rating} (${p.reviews})</div>
      </div>`;
    el.querySelector('.pc-add').addEventListener('click',e=>{e.stopPropagation();addToCart(p);});
    el.querySelector('.pc-fav').addEventListener('click',e=>{e.stopPropagation();const btn=e.currentTarget;btn.classList.toggle('liked');btn.textContent=btn.classList.contains('liked')?'♥':'♡';});
    return el;
  }

  function renderProducts(filter='all'){
    const grid=document.getElementById('productsGrid');
    grid.innerHTML='';
    const list=filter==='all'?products:products.filter(p=>p.cat===filter);
    list.forEach(p=>grid.appendChild(makeCard(p)));
  }

  function renderTrending(){
    const grid=document.getElementById('trendingGrid');
    trending.forEach(p=>grid.appendChild(makeCard(p)));
  }

  // FILTER TABS
  document.querySelectorAll('.pf').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.pf').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');renderProducts(btn.dataset.f);
    });
  });
  renderProducts();renderTrending();

  // CART EVENTS
  document.getElementById('cartBtn').addEventListener('click',()=>toggleCart(true));
  document.getElementById('cartClose').addEventListener('click',()=>toggleCart(false));
  document.getElementById('cartOverlay').addEventListener('click',()=>toggleCart(false));
  document.getElementById('checkoutBtn').addEventListener('click',()=>{
    if(cart.length===0){showToast('Your bag is empty!');return;}
    showToast('Redirecting to checkout...');
    setTimeout(()=>toggleCart(false),1500);
  });

  // TOPBAR CLOSE
  document.getElementById('tbClose').addEventListener('click',()=>{
    const tb=document.getElementById('topbar');
    tb.style.transition='height .3s,opacity .3s';tb.style.opacity='0';tb.style.height='0';tb.style.overflow='hidden';
  });

  // SEARCH
  const searchBar=document.getElementById('searchBar');
  document.getElementById('searchToggle').addEventListener('click',()=>searchBar.classList.toggle('open'));
  document.getElementById('searchClose').addEventListener('click',()=>searchBar.classList.remove('open'));

  // NAV solid on scroll handled by topbar visibility
  const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>80));

  // NEWSLETTER
  document.getElementById('nlForm').addEventListener('submit',e=>{
    e.preventDefault();const b=e.target.querySelector('button');const o=b.textContent;
    b.textContent='✓ You\'re Subscribed!';b.style.background='#16A34A';
    showToast('Welcome! Your 10% off code is VELA10 🎉');
    setTimeout(()=>{b.textContent=o;b.style.background='';e.target.reset();},3500);
  });

  // REVEAL
  const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  updateCartUI();
})();
