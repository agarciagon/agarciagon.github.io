const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');

if (menuToggle && siteNavigation) {
  const setMenuOpen = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    siteNavigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  siteNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (menuToggle.getAttribute('aria-expanded') === 'true' && !menuToggle.contains(event.target) && !siteNavigation.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  const desktopBreakpoint = window.matchMedia('(min-width: 901px)');
  const closeOnDesktop = (event) => {
    if (event.matches) setMenuOpen(false);
  };

  if (desktopBreakpoint.addEventListener) {
    desktopBreakpoint.addEventListener('change', closeOnDesktop);
  } else {
    desktopBreakpoint.addListener(closeOnDesktop);
  }
}
