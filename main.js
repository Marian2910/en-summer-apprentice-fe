import { addPurchase } from "./utils";
import { useStyle } from "./src/components/styles.js";


function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}
function getHomePageTemplate() {
  return `
   <div id="content" >
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
      if (eventElement) {
        eventsDiv.appendChild(eventElement);

      }
    });
  }
};

  const createEvent = (eventData) => {
    if (!eventData || !eventData.eventType) {
      console.error('Invalid eventData:', eventData.eventType);
      return null;
    }

    const eventElement = createEventElement(eventData);
    return eventElement;
  };

  const createEventElement = (eventData) => {
    const ticketCategories = eventData.ticketCategories;
    const eventDiv = document.createElement('div');
    const eventWrapperClasses = useStyle('eventWrapper');
    const actionsWrapperClasses = useStyle('actionsWrapper');
    const quantityClasses = useStyle('quantity');
    const inputClasses = useStyle('input');
    const quantityActionsClasses = useStyle( 'quantityActions');
    const increaseBtnClasses = useStyle('increaseBtn');
    const decreaseBtnClasses = useStyle('decreaseBtn');
    const addToCartBtnClasses = useStyle('addToCartBtn');

    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);

const formattedStartDate = new Intl.DateTimeFormat('ro-RO', { month: 'long', day: 'numeric' }).format(startDate);
const formattedEndDate = new Intl.DateTimeFormat('ro-RO', { month: 'long', day: 'numeric' }).format(endDate);

let formattedDateRange;
if (formattedStartDate === formattedEndDate) {
  formattedDateRange = `${formattedStartDate}`;
} else {
  formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
}
const startingHour = startDate.getHours();
const formattedStartingHour = startingHour < 10 ? `0${startingHour}` : startingHour;

    
    eventDiv.classList.add(...eventWrapperClasses);

     const contentMarkup = `
     <div class="centered-container">
     <header>
       <h2 class="event-title text-2xl font-bold">${eventData.eventName}</h2>
     </header>
     <div class="image">
       <img src="./src/assets/${eventData.image}" alt="${eventData.eventName}" class="event-image rounded object-cover" width="150" height="150">
     </div>
     <div>
      <p class="description">${eventData.eventDescription}</p>
    </div>
     <div class="content">
      <p class="date-range">${formattedDateRange}, de la ${formattedStartingHour}:00</p>
    </div>
      `;
    eventDiv.innerHTML = contentMarkup;

    const actions = document.createElement('div');
    actions.classList.add(...actionsWrapperClasses);

    const categoriesOptions = ticketCategories.map(
      (ticketCategory) =>
      `<option value=${ticketCategory.ticketCategoryId}> ${ticketCategory.description} </option>`
    );

    const ticketTypeMarkup = `
  <div class="ticket-type-container">
    <h2 class="text-lg">Alege categoria:</h2>
    <select id="ticketType" name="ticketType" class="ticketType">
      ${categoriesOptions.join('\n')}
    </select>
    <br>
  </div>
`;

    actions.innerHTML = ticketTypeMarkup;

    const quantity = document.createElement('div');
    quantity.classList.add(...quantityClasses);

    const input = document.createElement('input');
    input.classList.add(...inputClasses) ;

    input.type = 'number';
    input.min = '0';
    input.value = '0';

    input.addEventListener('blur', () => {
    if (!input.value) {
      input.value = 0;
    }
});

  input.addEventListener('input', () => {
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
    });

    quantity.appendChild (input);

    const quantityActions = document.createElement ('div');
    quantityActions.classList.add(...quantityActionsClasses);

    function updateQuantity(addToCart, input) {
      const currentQuantity = parseInt(input.value);
      if (currentQuantity > 0) {
        addToCart.disabled = false;
      } else {
        addToCart.disabled = true;
      }
    }
    
    const increase = document.createElement('button');
    increase.classList.add(...increaseBtnClasses);
    increase.innerText = '+';
    increase.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
      updateQuantity(addToCart, input);
    });
    
    const decrease = document.createElement('button');
    decrease.classList.add(...decreaseBtnClasses);
    decrease.innerText = '-';
    decrease.addEventListener('click', () => {
      const currentValue = parseInt(input.value);
      if (currentValue > 0) {
        input.value = currentValue - 1;
      }
      updateQuantity(addToCart, input);
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
  const selectedTicketCategoryId = document.getElementById('ticketType').value;
  handleAddToCart(eventData.eventID, selectedTicketCategoryId, input, addToCart);

});

eventFooter.appendChild(addToCart);
eventDiv.appendChild(eventFooter) ;

return eventDiv;
  }

  const handleAddToCart = (eventID, selectedTicketCategoryId, input, addToCart) => {
    const quantity = parseInt(input.value);
    const ticketCategory = parseInt(selectedTicketCategoryId);
    const event = parseInt(eventID);
    
    if (parseInt(quantity)) {
      fetch('http://localhost:8080/orders/post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event,
          ticketCategoryId: ticketCategory,
          numberOfTickets: +quantity,
        })
      })
        .then((response) => response.json())
        .then((data) => {
          addPurchase(data);
          console.log("Done!");
          input.value = 0;
          addToCart.disabled = true;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("quantity should be an integer", error);
    }
  };


function renderOrdersPage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();
}

function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage()
  }
}

setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();
