import '../css/normalize.css';
import '../css/style.css';

/**
 *
 * Dependencies: None
 * JS Version: ES2015/ES6
 * JS Standard: ESlint
 *
 * Define Global Variables
 */

const DEFAULT_DEBOUNCE_TIMEOUT = 200; // ms
const menuElements = document.getElementById('navbar__list');
const pageSections = Array.from(document.querySelectorAll('section[data-nav]'));

/**
 * Call func after the timer
 *
 * @param {*} func
 * @param {Number} timeout
 * @returns
 */
const debounce = (func, timeout = DEFAULT_DEBOUNCE_TIMEOUT) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

/**
 * Generate menu item from existed section
 * then add click event to navigate section with each menu item
 *
 * @param {*} section
 * @returns the Menu item Element
 */
function createMenuItem(section) {
  const menuItem = document.createElement('li');
  menuItem.classList.add('menu__link');
  menuItem.innerText =
    section.getAttribute('data-nav') ?? `Section ${Math.random().toFixed(2)}`;
  menuItem.id = section.getAttribute('data-nav-id');

  menuItem.addEventListener('click', () => {
    document.getElementById(section.id).scrollIntoView({
      behavior: 'smooth',
    });
  });

  return menuItem;
}

// End Helper Functions
// Begin Main Functions

// Init create page menu items
pageSections.forEach((section) => {
  const menuItem = createMenuItem(section);
  menuElements.appendChild(menuItem);
});

window.addEventListener(
  'scroll',
  debounce(() => {
    // Reset all current active section/nav state
    pageSections.forEach((section) => {
      section.classList.remove('section--active');
      const navId = section.getAttribute('data-nav-id');
      document.getElementById(navId)?.classList.remove('menu-item--active');
    });

    // Find is active section then set active state
    for (let i = 0; i < pageSections.length; i++) {
      const section = pageSections[i];
      const bounds = section.getBoundingClientRect();
      if (!bounds || !window.innerHeight) {
        return;
      }
      // Ignore the 10% bottom of the window
      if (bounds.top > 0 && bounds.top < window.innerHeight * 0.9) {
        section.classList.add('section--active');
        const activeNavId = section.getAttribute('data-nav-id');
        document
          .getElementById(activeNavId)
          ?.classList.add('menu-item--active');
        break;
      }
    }
  }),
);
