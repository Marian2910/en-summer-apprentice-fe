import { kebabCase, addPurchase } from "./utils";
import { useStyle } from "./src/components/styles.js";


// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}
// HTML templates
function getHomePageTemplate() {
  return `
   <div id="content" >
      <img src="./src/assets/Endava.png" alt="summer">
      <div class="events flex items-center justify-center flex-wrap">
      </div>
    </div>
  `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
    </div>
  `;
}

function setupNavigationEvents() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    });
  });
}

function setupMobileMenuEvent() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function setupPopstateEvent() {
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    renderContent(currentUrl);
  });
}

function setupInitialPage() {
  const initialUrl = window.location.pathname;
  renderContent(initialUrl);
}

function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();
  fetchTicketEvents().then((data) => {
    addEvents(data);
  });
}

async function fetchTicketEvents() {
  try {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

const addEvents = (events) => {
  const eventsDiv = document.querySelector('.events');  
  eventsDiv.innerHTML = 'No events';
  
  if (events.length) {
    eventsDiv.innerHTML = '';
    events.forEach(event => {
      const eventElement = createEvent(event);
      console.log('Fetched events:', eventElement);

      if (eventElement) {
        eventsDiv.appendChild(eventElement);

      }
    });
  }
};

  const createEvent = (eventData) => {
    if (!eventData || !eventData.eventType) {
      console.error('Invalid eventData:', eventData.eventType);
      return null; // Handle this case accordingly
    }

    const title = kebabCase(eventData.eventType);
    const eventElement = createEventElement(eventData, title);
    return eventElement;
  };

  const createEventElement = (eventData, title) => {
    const { id, description, img, name, ticketCategories } = eventData;
    const eventDiv = document.createElement('div');
    const eventWrapperClasses = useStyle('eventWrapper');
    const actionsWrapperClasses = useStyle('actionsWrapper');
    const quantityClasses = useStyle('quantity');
    const inputClasses = useStyle('input');
    const quantityActionsClasses = useStyle( 'quantityActions');
    const increaseBtnClasses = useStyle('increaseBtn');
    const decreaseBtnClasses = useStyle('decreaseBtn');
    const addToCartBtnClasses = useStyle('addToCartBtn');

    // Set up event wrapper
    eventDiv.classList.add(...eventWrapperClasses);

    // Create the event content markup
     const contentMarkup = `
      <header>
        <h2 class="event-title text-2xl font-bold">${eventData.eventName}</h2>
      </header>
      <div class="content">
      <img src="./src/assets/${eventData.image}" alt="${eventData.eventName}" class="event-image rounded object-cover" width="150" height="150">
      <p class="description text-gray-700">${eventData.eventDescription}</p>
      </div>
      `;
    eventDiv.innerHTML = contentMarkup;

    // Create ticket type selection and quantity input
    const actions = document.createElement('div');
    actions.classList.add(...actionsWrapperClasses);

    const categoriesOptions = ticketCategories.map(
      (ticketCategory) =>
      `<option value=${ticketCategory.ticketCategoryId.id}> ${ticketCategory.description} </option>`
    );

    const ticketTypeMarkup = `
    <h2 class="text-lg font-bold mb-2">Choose Ticket Type:</h2>
    <select id="ticketType" name="ticketType" class="select ${title}-ticket-type border border ...">
    ${categoriesOptions.join('\n')}
    </select>
    `;

    actions.innerHTML = ticketTypeMarkup;

    const quantity = document.createElement('div');
    quantity.classList.add(...quantityClasses);

    const input = document.createElement('input');
    input.classList.add(... inputClasses) ;

    input.type = 'number';
    input.min = '0';
    input.value = '0';

    input.addEventListener ('blur', () => {
    if (!input.value) {
    input.value = 0;
    }
});
  input.addEventListener('input', () => {
    const currentQuantity = parseInt(input.value);
    if(currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  input.addEventListener('input', () => {
    const currentQuantity = parseInt (input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
    });

    quantity.appendChild (input);

    const quantityActions = document.createElement ('div');
    quantityActions.classList.add(...quantityActionsClasses);

    const increase = document.createElement ('button');
    increase.classList.add (...increaseBtnClasses) ;

    increase.innerText = '+';
    increase.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
      const currentQuantity = parseInt(input.value) ;
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  const decrease = document.createElement('button');
  decrease.classList.add(...decreaseBtnClasses) ;
  decrease.innerText = '-';
  decrease.addEventListener('click', () => {
  const currentValue = parseInt(input.value);
  if (currentValue > 0) {
    input .value = currentValue - 1;
  }
  const currentQuantity = parseInt(input.value) ;
  if (currentQuantity > 0) {
    addToCart.disabled = false;
  } else {
    addToCart.disabled = true;
  }
});

quantityActions.appendChild(increase);
quantityActions.appendChild(decrease);

quantity.appendChild(quantityActions);
actions.appendChild(quantity);
eventDiv.appendChild(actions);

// Create the event footer with "Add To Cart" button
const eventFooter = document.createElement ('footer');
const addToCart = document.createElement ('button') ;
addToCart.classList.add(...addToCartBtnClasses);
addToCart.innerText = 'Add To Cart';
addToCart.disabled = true;
addToCart.addEventListener('click', () => {
  // handleAddToCart(title, id, input, addToCart); 
});

eventFooter.appendChild(addToCart);
eventDiv.appendChild(eventFooter) ;

return eventDiv;
  }


function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();
}

// Render content based on URL
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage()
  }
}

// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();
