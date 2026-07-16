(() => {
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-toggle');
  const menuLabel = menu?.querySelector('.sr-only');
  const navLinks = [...document.querySelectorAll('.site-nav a')];

  const setMenuState = (open) => {
    if (!nav || !menu) return;
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    if (menuLabel) menuLabel.textContent = open ? '关闭导航' : '打开导航';
  };

  menu?.addEventListener('click', () => {
    setMenuState(menu.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('.project-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const detail = document.getElementById(button.getAttribute('aria-controls'));
      if (!detail) return;
      const open = button.getAttribute('aria-expanded') === 'true';
      const projectName = button.closest('.project-item')?.querySelector('h3')?.textContent.trim() || '项目';
      button.setAttribute('aria-expanded', String(!open));
      button.querySelector('.sr-only').textContent = `${open ? '展开' : '收起'}${projectName}详情`;
      detail.hidden = open;
    });
  });
})();
