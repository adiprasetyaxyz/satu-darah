/* eslint-disable no-plusplus */
import SatuDarahSource from '../../data/satu-darah-source';
import { createEventList } from './template/template-creator';

const Event = {
  async render() {
    return `
      <h2 class="show-event">Events</h2>
      <div id="show-event"></div>
      <div id="pagination-buttons">
        <button id="prev-page">Previous Page</button>
        <button id="next-page">Next Page</button>
      </div>
      <div id="page-numbers"></div>
    `;
  },

  async afterRender() {
    const events = await SatuDarahSource.getAllEvent();
    const eventContainer = document.getElementById('show-event');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumberContainer = document.getElementById('page-numbers');

    const pageSize = 4;
    let currentPage = 1;

    const displayEvents = (Events, page) => {
      eventContainer.innerHTML = '';
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const displayedEvents = Events.slice(startIndex, endIndex);

      displayedEvents.forEach((event) => {
        eventContainer.innerHTML += createEventList(event);
      });
    };

    displayEvents(events, currentPage);

    prevPageButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayEvents(events, currentPage);
      }
    });

    nextPageButton.addEventListener('click', () => {
      const maxPage = Math.ceil(events.length / pageSize);
      if (currentPage < maxPage) {
        currentPage++;
        displayEvents(events, currentPage);
      }
    });

    const displayPageNumbers = (totalPages) => {
      pageNumberContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        // eslint-disable-next-line no-loop-func
        pageButton.addEventListener('click', () => {
          currentPage = i;
          displayEvents(events, currentPage);
        });
        pageNumberContainer.appendChild(pageButton);
      }
    };

    const maxPage = Math.ceil(events.length / pageSize);
    displayPageNumbers(maxPage);
  },
};

export default Event;
