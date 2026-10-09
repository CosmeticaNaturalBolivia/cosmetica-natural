'use strict';
const products={oil10:{name:'Aceite ASUA 10 ml',price:40},oil30:{name:'Aceite ASUA 30 ml con gotero',price:100},soap:{name:'Jabón ASUA 53 g',price:35}};
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
 document.querySelector('#order-note').textContent='Entrega únicamente en la estación 6 de Marzo de la Línea Morada.';
 const lines=['Hola, Cosmética Natural Bolivia. Quisiera consultar disponibilidad y realizar este pedido:',...entries.map(([id,q])=>'- '+q+' × '+products[id].name+(products[id].price===null?' (precio a consultar)':' — Bs '+products[id].price*q)), 'Subtotal de productos con precio: Bs '+subtotal+'.','Por favor, confírmenme disponibilidad, total y horario de entrega en la estación 6 de Marzo de la Línea Morada del Teleférico.'];
 document.querySelector('#checkout').href='https://wa.me/59157059530?text='+encodeURIComponent(count?lines.join('\n'):'Hola, quisiera información sobre los productos ASUA y la entrega en la estación 6 de Marzo de la Línea Morada del Teleférico.');
 document.querySelector('#checkout').firstChild.textContent=count?'Enviar pedido por WhatsApp ':'Consultar por WhatsApp ';
}
 document.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.id;cart[id]=Math.min(99,(cart[id]||0)+1);render();const notice=document.querySelector('#notice');notice.textContent=products[id].name+' agregado a tu pedido';notice.classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.classList.remove('show'),2500);}));
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});document.querySelectorAll('[data-category]').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter);}));
render();


document.querySelectorAll('.product-tabs').forEach(list=>{
 const tabs=[...list.querySelectorAll('[role="tab"]')];
 const activate=tab=>{tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});};
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();activate(tabs[next]);tabs[next].focus();});});
});
