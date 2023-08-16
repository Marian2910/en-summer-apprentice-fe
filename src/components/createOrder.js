import { useStyle } from "./styles";

export const createOrderItem = (categories, order) => {

    const purchase = document.createElement('div');
    purchase.id = order.orderId;
    purchase.classList.add();

    const purchaseTitle = createParagraph(...useStyle('purchaseTitle'));
    purchaseTitle.innerText = order.eventName;
    purchase.appendChild(purchaseTitle);

    const purchaseQuantity = createInput(...useStyle('purchaseQuantity'));
    purchaseQuantity.type = 'number';
    purchaseQuantity.min = '1';
    purchaseQuantity.value = `${order.numberOfTickets}`;
    purchaseQuantity.disabled = true;

    const purchaseQuantityWrapper = createDiv(...useStyle('purchaseQuantityWrapper'));
    purchaseQuantityWrapper.append(purchaseQuantity);
    purchase.appendChild(purchaseQuantityWrapper);
    const purchaseType = createSelect(...useStyle('purchaseType'));
    purchaseType.setAttribute('disabled', 'true');
    const categoriesOptions = categories.map(ticketCategory => `
        <option class="text-sm font-bold text-black" value="${ticketCategory.ticketCategoryID}" ${ticketCategory.description === order.ticketCategory ? 'selected' : ''}>
            ${order.ticketCategory}
        </option>`).join('\n');

    purchaseType.innerText = categoriesOptions;

    const purchaseTypeWrapper = createDiv(...useStyle('purchaseTypeWrapper'));
    purchaseTypeWrapper.append(purchaseType);
    purchase.appendChild(purchaseTypeWrapper);

    const purchaseDate = createDiv(...useStyle('purchaseDate'));
    purchaseDate.innerText = new Date(order.orderedAt).toLocaleDateString();
    purchase.appendChild(purchaseDate);

    const purchasePrice = createDiv(...useStyle('purchasePrice'));
    purchasePrice.innerText = order.totalPrice;
    purchase.appendChild(purchasePrice);


    const actions = createDiv(...useStyle('actions'));

    function createDiv(...classes) {
        const div = document.createElement('div');
        div.classList.add(...classes);
        return div;
    }

    function createParagraph(...classes) {
        const p = document.createElement('p');
        p.classList.add(...classes);
        return p;
    }

    function createInput(...classes) {
        const input = document.createElement('input');
        input.classList.add(...classes);
        return input;
    }

    function createSelect(...classes) {
        const select = document.createElement('select');
        select.classList.add(...classes);
        return select;
    }

    function createButton(classes, innerHTML, handler) {
        const button = document.createElement('button');
        button.classList.add(...classes);
        button.innerHTML = innerHTML;
        button.addEventListener('click', handler);
        return button;
    }

    function doNothing() {
        console.log("Hi bye!");
    }

    return purchase;
};
