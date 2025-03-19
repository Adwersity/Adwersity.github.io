document.addEventListener('DOMContentLoaded', function () {
    const events = document.querySelectorAll('.event');
    const bookingsList = document.querySelector('.bookings-list');
    const currentDate = new Date();

    let i = 0;
    while (i < events.length) {
        const eventDate = new Date(events[i].getAttribute('data-date'));
        if (eventDate < currentDate) {
            events[i].style.display = 'none';
        }

        const bookButton = events[i].querySelector('.book-ticket');
        const ticketCountInput = events[i].querySelector('.ticket-count');
        const ticketPriceElement = events[i].querySelector('.ticket-price');
        const ticketPrice = parseFloat(ticketPriceElement.innerText);
        const totalPriceElement = events[i].querySelector('.total-price');

        // Оновлення загальної вартості при зміні кількості квитків
        ticketCountInput.addEventListener('input', function() {
            const ticketCount = parseInt(ticketCountInput.value);
            const totalPrice = ticketCount * ticketPrice;
            totalPriceElement.innerText = `Загальна вартість: ${totalPrice} грн`;
        });

        // Подія на кнопку бронювання
        bookButton.addEventListener('click', (function(index) {
            return function() {
                if (bookButton.innerText === 'Забронювати квиток') {
                    const ticketCount = parseInt(ticketCountInput.value); 
                    const totalPrice = ticketCount * ticketPrice;

                    const clonedEvent = events[index].cloneNode(true);
                    
                    const labels = clonedEvent.querySelectorAll('p, label');
                    labels.forEach(label => {
                        if (label.innerText.includes('Кількість квитків:') && !label.innerText.includes('|')) {
                            label.remove();
                        }
                    });
                    clonedEvent.querySelector('.ticket-count')?.remove();
                    clonedEvent.querySelector('.book-ticket')?.remove();
                    clonedEvent.querySelector('.total-price')?.remove();

                    const bookingInfo = document.createElement('p');
                    bookingInfo.classList.add('booking-info');

                    bookingInfo.innerText = `Кількість квитків: ${ticketCount} | Загальна вартість: ${totalPrice} грн`;
                    clonedEvent.appendChild(bookingInfo);

                    bookingsList.appendChild(clonedEvent);
                    bookButton.innerText = 'Заброньовано';
                    bookButton.classList.add('booked');
                    bookButton.disabled = true;
                }
            };
        })(i));

        i++;
    }
});