// Profile card 3D rotation effect
const scene = document.getElementById('profileScene'), card = document.getElementById('profileCard');
if (scene && card) {
  scene.addEventListener('pointermove', e => {
    const r = scene.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateZ(0)`;
  });
  scene.addEventListener('pointerleave', () => card.style.transform = 'rotateX(0deg) rotateY(0deg)');
}

// Intersection Observer for reveal animation
const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('show');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Certificate filter functionality
const filters = document.querySelectorAll('.filter'), certs = document.querySelectorAll('.cert');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  certs.forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.cat !== f));
}));

// Modal functionality for certificate viewing
const modal = document.getElementById('modal'), modalImg = document.getElementById('modalImg'), close = () => modal.classList.remove('open');
certs.forEach(c => c.querySelector('.cert-img').addEventListener('click', () => {
  modalImg.src = c.dataset.img;
  modalImg.alt = c.querySelector('h3').textContent;
  modal.classList.add('open');
}));
document.getElementById('modalClose').onclick = close;
modal.addEventListener('click', e => {
  if (e.target === modal) close();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});

// Mobile menu toggle
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.position = 'absolute';
  links.style.top = '60px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.padding = '18px';
  links.style.flexDirection = 'column';
  links.style.background = 'rgba(7,9,18,.97)';
  links.style.border = '1px solid var(--border)';
  links.style.borderRadius = '14px';
});

// Project image carousels
document.querySelectorAll('.carousel[data-gallery]').forEach(carousel => {
  const images = carousel.dataset.gallery.split('|');
  const image = carousel.querySelector('img');
  const dots = carousel.querySelector('.gallery-dots');
  const caption = carousel.querySelector('.gallery-caption');
  let index = 0;
  images.forEach((_, i) => { const dot=document.createElement('button'); dot.className='gallery-dot'+(i===0?' active':''); dot.setAttribute('aria-label',`Show image ${i+1}`); dot.onclick=()=>show(i); dots.appendChild(dot); });
  const show = i => { index=(i+images.length)%images.length; image.style.opacity='.18'; setTimeout(()=>{image.src=images[index]; image.style.opacity='1';},120); [...dots.children].forEach((d,n)=>d.classList.toggle('active',n===index)); if(caption){caption.textContent=['Login Page','Citizen Dashboard','Schemes Navigator','Analytics Dashboard','AI Chatbot'][index]||'Project Preview';} };
  carousel.querySelector('.prev')?.addEventListener('click',e=>{e.stopPropagation();show(index-1)});
  carousel.querySelector('.next')?.addEventListener('click',e=>{e.stopPropagation();show(index+1)});
});
