'use strict';
const products={oil10:{name:'Aceite ASUA 10 ml',price:50},oil30:{name:'Aceite ASUA 30 ml con gotero',price:105},soap:{name:'Jabón ASUA 53 g',price:45}};
const cart={};
let noticeTimer;
function render(){
 const entries=Object.entries(cart).filter(([,q])=>q>0);
 const count=entries.reduce((n,[,q])=>n+q,0);
 const subtotal=entries.reduce((n,[id,q])=>n+(products[id].price||0)*q,0);
 document.querySelector('#cart-count').textContent=count;
 document.querySelector('#order-count').textContent=count+' '+(count===1?'producto':'productos');
 const container=document.querySelector('#cart-items');container.replaceChildren();
 if(!count){const p=document.createElement('p');p.className='empty';p.textContent='Tu próximo ritual empieza aquí. Agrega un producto de la colección.';container.append(p);}
 entries.forEach(([id,q])=>{const item=document.createElement('div');item.className='cart-item';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=products[id].name;const price=document.createElement('small');price.textContent=products[id].price===null?'Precio a consultar':'Bs '+products[id].price+' por unidad';info.append(title,price);const qty=document.createElement('div');qty.className='quantity';[-1,1].forEach((delta,i)=>{if(i){const number=document.createElement('span');number.textContent=q;qty.append(number);}const b=document.createElement('button');b.textContent=delta===1?'+':'−';b.setAttribute('aria-label',(delta===1?'Agregar una unidad de ':'Quitar una unidad de ')+products[id].name);b.addEventListener('click',()=>{cart[id]=Math.max(0,Math.min(99,q+delta));render();});qty.append(b);});item.append(info,qty);container.append(item);});
 document.querySelector('#subtotal').textContent='Bs '+subtotal;
 document.querySelector('#order-note').textContent='No incluye entrega.';
 const lines=['Hola, Cosmética Natural. Quisiera consultar disponibilidad y realizar este pedido:',...entries.map(([id,q])=>'- '+q+' × '+products[id].name+(products[id].price===null?' (precio a consultar)':' — Bs '+products[id].price*q)), 'Subtotal de productos con precio: Bs '+subtotal+'.','Por favor, confírmenme el total y el costo de entrega. Mi zona es:'];
 document.querySelector('#checkout').href='https://wa.me/59157059530?text='+encodeURIComponent(count?lines.join('\n'):'Hola, quisiera información sobre los productos ASUA y las entregas en La Paz y El Alto.');
 document.querySelector('#checkout').firstChild.textContent=count?'Enviar pedido por WhatsApp ':'Consultar por WhatsApp ';
}
 document.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.id;cart[id]=Math.min(99,(cart[id]||0)+1);render();const notice=document.querySelector('#notice');notice.textContent=products[id].name+' agregado a tu pedido';notice.classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.classList.remove('show'),2500);}));
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});document.querySelectorAll('[data-category]').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter);}));
render();

