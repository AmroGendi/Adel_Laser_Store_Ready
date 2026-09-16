let slideIndex=0,slideTimer;
function showSlide(n){const s=[...document.querySelectorAll('.slide')],d=[...document.querySelectorAll('.dot')];if(!s.length)return;slideIndex=(n+s.length)%s.length;s.forEach((x,i)=>x.classList.toggle('active',i===slideIndex));d.forEach((x,i)=>x.classList.toggle('active',i===slideIndex))}
function resetSlides(){clearInterval(slideTimer);slideTimer=setInterval(()=>showSlide(slideIndex+1),4500)}
function moveSlide(n){showSlide(slideIndex+n);resetSlides()} function goSlide(n){showSlide(n);resetSlides()}
function openCart(){document.querySelector('#cartPanel')?.classList.add('open');document.querySelector('#cartOverlay')?.classList.add('show');renderCart()}
function closeCart(){document.querySelector('#cartPanel')?.classList.remove('open');document.querySelector('#cartOverlay')?.classList.remove('show')}
function total(){return getCart().reduce((s,i)=>{const p=products.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0)},0)}
function renderCart(){const box=document.querySelector('#cartItems'),t=document.querySelector('#cartTotal');if(!box)return;const c=getCart();box.innerHTML=c.length?c.map(i=>{const p=products.find(x=>x.id===i.id);const key=i.key||String(i.id);return `<div class="cart-item"><img src="${p.image}" alt=""><div class="cart-item-info"><a href="product.html?id=${p.id}"><b>${p.name}</b></a><small>${money(p.price)}</small>${i.customText?`<small>التخصيص: ${i.customText}</small>`:''}<div class="qty"><button onclick="changeQty('${key}',-1)">−</button><b>${i.qty}</b><button onclick="changeQty('${key}',1)">+</button></div></div><button class="remove" onclick="removeProduct('${key}')">×</button></div>`}).join(''):`<div class="cart-empty">🛒<br><br>السلة فاضية حاليًا.</div>`;if(t)t.textContent=money(total())}
function changeQty(key,d){let c=getCart(),x=c.find(i=>(i.key||String(i.id))===key);if(!x)return;x.qty+=d;if(x.qty<1)c=c.filter(i=>(i.key||String(i.id))!==key);saveCart(c);renderCart()}
function removeProduct(key){saveCart(getCart().filter(i=>(i.key||String(i.id))!==key));renderCart()}
function checkoutWhatsApp(){if(!getCart().length)return;let text='مرحبًا، أريد طلب:%0A'+getCart().map(i=>{let p=products.find(x=>x.id===i.id),line=p.name+' × '+i.qty;if(i.customText)line+=' (التخصيص: '+i.customText+')';return encodeURIComponent(line)}).join('%0A')+'%0Aالإجمالي: '+encodeURIComponent(money(total()));window.open('https://wa.me/201000000000?text='+text,'_blank')}
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();document.querySelector('#cartOverlay')?.addEventListener('click',closeCart);const s=document.querySelectorAll('.slide');if(s.length){showSlide(0);resetSlides();document.querySelector('.hero-slider')?.addEventListener('mouseenter',()=>clearInterval(slideTimer));document.querySelector('.hero-slider')?.addEventListener('mouseleave',resetSlides)}})

function setupMegaMenu(){
 const nav=document.querySelector('.menu');
 if(!nav || nav.querySelector('.mega-menu')) return;
 const first=nav.querySelector('a[href*="products"]');
 if(!first)return;
 const wrap=document.createElement('div'); wrap.className='has-mega';
 first.parentNode.insertBefore(wrap,first); wrap.appendChild(first);
 first.innerHTML='المنتجات ▾';
 wrap.insertAdjacentHTML('beforeend',`<div class="mega-menu"><div class="container mega-inner">
 <div class="mega-col"><h4>مكاتب وشركات</h4><a href="products.html?category=office&sub=desk">أطقم مكتب</a><a href="products.html?category=office&sub=name">لوحات مخصصة بالاسم</a><a href="products.html?category=office&sub=organizer">منظمات مكتب</a></div>
 <div class="mega-col"><h4>هدايا</h4><a href="products.html?category=gifts">هدايا شخصية</a></div>
 <div class="mega-col"><h4>ديكور</h4><a href="products.html?category=decor&sub=wall">ديكور حوائط</a><a href="products.html?category=decor&sub=clock">ساعات حوائط</a></div>
 <div class="mega-col"><h4>علب هدايا</h4><a href="products.html?category=boxes">كل علب الهدايا</a></div>
 <div class="mega-col"><h4>استاندات عرض</h4><a href="products.html?category=stands&sub=display">استاندات عرض</a><a href="products.html?category=stands&sub=acrylic">استاندات أكريليك</a></div>
 </div></div>`);
}
document.addEventListener('DOMContentLoaded',setupMegaMenu);
