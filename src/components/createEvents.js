import { useStyle } from "./styles.js";
import { removeLoader, addLoader } from "./loader.js";
import { addPurchase } from "../../utils.js";

  export function createEventElement(eventData) {
    const ticketCategories = eventData.ticketCategories;
    const venue = eventData.venueID;
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
        <img src="./src/assets/${eventData.image}" alt="${eventData.eventName}" class="event-image" width="200" height="200">
      </div>
      <div>
        <p class="description">${eventData.eventDescription}</p>
      </div>
      <div class="content">
        <p class="date-range">
          <img src="./src/assets/hour_icon.png" alt="Hour Icon" class="icon">
          ${formattedDateRange}, de la ${formattedStartingHour}:00
        </p>
        <p class="location">
          <img src="./src/assets/location_icon.png" alt="Location Icon" class="icon">
          ${venue.location}
        </p>
      </div>
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
    <select name="ticketType" class="ticket-type-container" id="${eventData.eventID}"> ${categoriesOptions.join('\n')} </select>
    <br>
  </div>
`;

    actions.innerHTML = ticketTypeMarkup;

    const quantity = document.createElement('div');
    quantity.classList.add(...quantityClasses);

    const input = document.createElement('input');
    input.classList.add(...inputClasses, 'custom-input', 'ticket-type-select') ;

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

const eventFooter = document.createElement ('footer');
const addToCart = document.createElement ('button') ;
addToCart.classList.add(...addToCartBtnClasses);
addToCart.innerText = "Cumpără";
addToCart.disabled = true;
addToCart.addEventListener('click', () => {
  const selectedTicketCategoryId = document.getElementById(eventData.eventID).value;
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
        addLoader();
        fetch('http://localhost:8080/orders/post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventID: +event,
          ticketCategoryId: +ticketCategory,
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
        .finally(()=>{
            removeLoader();

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("quantity should be an integer", error);
    }
};

