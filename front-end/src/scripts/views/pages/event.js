import SatuDarahSource from '../../data/satu-darah-source';
import { createEventList } from './template/template-creator';

const Event = {
  async render() {
    return `
        <h2 class="show-event">Events</h2>
        <div id="show-event"></div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const events = await SatuDarahSource.getAllEvent();
    console.log(events);
    const eventContainer = document.getElementById('show-event');
    events.forEach((event) => {
      console.log(`test${event}`);
      eventContainer.innerHTML += createEventList(event);
    });
  },
};

export default Event;
