export const scrollToSection = (id) => {
  const cleanId = id.replace('#', '');
  const element = document.getElementById(cleanId);
  if (element) {
    if (window.__lenis) {
      window.__lenis.scrollTo(element, { offset: -70 });
    } else {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 70,
        behavior: 'smooth'
      });
    }
    // Update hash without jumping
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${cleanId}`);
    }
  }
};
