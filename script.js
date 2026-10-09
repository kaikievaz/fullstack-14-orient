document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const heroCard = document.querySelector('.hero-card');

  if (hero && heroCard) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
      heroCard.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    });

    hero.addEventListener('pointerleave', () => {
      heroCard.style.transform = 'translate(0, 0)';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const form = document.querySelector('.inquiry-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const destination = (formData.get('destination') || '').toString().trim();
      const timeline = (formData.get('timeline') || '').toString().trim();
      const notes = (formData.get('notes') || '').toString().trim();

      const body = [
        'Новая заявка на маршрут:',
        '',
        `Имя: ${name || 'Не указано'}`,
        `Email: ${email || 'Не указан'}`,
        `Направление: ${destination || 'Не указано'}`,
        `Срок поездки: ${timeline || 'Не указан'}`,
        '',
        'Комментарии:',
        notes || 'Не указаны'
      ].join('\n');

      const subject = encodeURIComponent('Новая заявка на маршрут');
      const mailtoLink = `mailto:hello@northarc.travel?subject=${subject}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      const button = form.querySelector('button');
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Отправка...';
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 1800);
      }
    });
  }
});
