document.addEventListener('DOMContentLoaded', function () {
    const eventGrid = document.querySelector('.event-grid');
    const bookingsList = document.querySelector('.bookings-list');
    const currentDate = new Date();

    
    fetch('data.json')
    .then(response => response.json())
    .then(events => {
        let i = 0;
        while (i < events.length) {
            const event = events[i];
            const eventDate = new Date(event.date);
            if (eventDate < currentDate) {
                i++;
                continue; 
            }

            const eventElement = createEventElement(event);
            eventGrid.appendChild(eventElement);

            const bookButton = eventElement.querySelector('.book-ticket');
            const ticketCountInput = eventElement.querySelector('.ticket-count');
            const ticketPrice = event.price;
            const totalPriceElement = eventElement.querySelector('.total-price');

            ticketCountInput.addEventListener('input', function () {
                const ticketCount = parseInt(ticketCountInput.value) || 1;
                totalPriceElement.innerText = `Загальна вартість: ${ticketCount * ticketPrice} грн`;
            });

            // Бронювання квитка
            bookButton.addEventListener('click', function () {
                const ticketCount = parseInt(ticketCountInput.value);
                const totalPrice = ticketCount * ticketPrice;

                const bookingEntry = createBookingEntry(event, ticketCount, totalPrice);
                bookingsList.appendChild(bookingEntry);

                bookButton.innerText = 'Заброньовано';
                bookButton.classList.add('booked');
                bookButton.disabled = true;
            });
            
            i++;
        }
    })
    .catch(error => console.error('Помилка завантаження подій:', error));
});

function createEventElement(event) {
    const eventDate = new Date(event.date);

    const eventElement = document.createElement('article');
    eventElement.classList.add('event');
    eventElement.dataset.date = event.date;
    eventElement.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h2>${event.title}</h2>
        <p>Дата: ${new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long' }).format(eventDate)}</p>
        <p>Місце: ${event.location}</p>
        <p>Ціна: <span class="ticket-price">${event.price}</span> грн</p>
        <label>Кількість квитків:</label>
        <input type="number" class="ticket-count" value="1" min="1">
        <p class="total-price">Загальна вартість: ${event.price} грн</p>
        <button class="book-ticket">Забронювати квиток</button>
    `;

    return eventElement;
}

function createBookingEntry(event, ticketCount, totalPrice) {
    const eventDate = new Date(event.date);

    const bookingEntry = document.createElement('article');
    bookingEntry.classList.add('event', 'booked-event');
    bookingEntry.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h2>${event.title}</h2>
        <p>Дата: ${new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long' }).format(eventDate)}</p>
        <p>Місце: ${event.location}</p>
        <p>Кількість квитків: ${ticketCount}</p>
        <p>Загальна вартість: ${totalPrice} грн</p>
    `;

    return bookingEntry;
} 
