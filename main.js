import { addPurchase } from "./utils";
import { useStyle } from "./src/components/styles.js";
import { removeLoader, addLoader } from "./src/components/loader";
import { createEventElement } from "./src/components/createEvents";
import { createOrderItem } from "./src/components/createOrder";



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
    <div id="content" class="hidden">
      <h1 class="text-lg mb-4 mt-8 text-center">Purchased Tickets</h1>
      <div class="purchases ml-6 mr-6"> 
        <div class="bg-white px-4 py-3 gap-x-4 flex font-bold">
          <button class="flex flex-1 text-center justify-center" id="sorting-button-1"> 
            <img width="20" height="20" src="https://img.icons8.com/windows/32/sort-alpha-up.png" alt="sort-alpha-up"/>  
            <span>Name</span>
          </button>
          <span class="flex-1">Number of tickets</span>
          <span class="flex-1">Category</span> 
          <span class="flex-1  md:flex">Dates</span> 
          <button class="flex felx -1 text-center justify-center" id="sorting-button-2">
          <span>Price</span>
          <img width="20" height="20" src="https://img.icons8.com/windows/32/sorting-arrows.png" alt="sorting-arrows"/>  
          </button>
          <span class="w-28 sm:w-8"></span>
        </div>
        <div id="purchases-content"></div>
      </div>
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
  // setupFilterEvents();
  // setupSearchEvents();
  addLoader();
  fetchTicketEvents().then((data) => {
    setTimeout(()=>{
      removeLoader();
    }, 200);
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

async function fetchOrders()
{
  try {
    const response = await fetch('https://localhost:7163/api/Order/GetAllOrders');
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
  

  
  
  async function renderOrdersPage() {
    const mainContentDiv = document.querySelector('.main-content-component');
    mainContentDiv.innerHTML = getOrdersPageTemplate();
    const purchasesDiv = document.querySelector('.purchases');
    const purchasesContent = document.getElementById('purchases-content');
    
    addLoader();
    
    const events = await fetchTicketEvents();
    if (purchasesDiv && events.length) {
      fetchOrders().then((orders) => {
        setTimeout(() => {
          removeLoader();
        }, 200);
  
        orders.forEach((order) => {
          const event = events.find((event) => event.id === order.eventId);
          const newOrder = createOrderItem(event.ticketCategories, order);
          purchasesContent.appendChild(newOrder);
        });
  
        purchasesDiv.appendChild(purchasesContent);
      });
    } else {
      removeLoader();
    }
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