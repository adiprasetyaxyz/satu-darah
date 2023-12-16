import SatuDarahSource from '../data/satu-darah-source';

const getParticipants = async () => {
  const registerEvents = await SatuDarahSource.getAllRegisterEvent();
  // eslint-disable-next-line max-len
  const filteredRegisterEvents = registerEvents.data.filter((registeredEvent) => registeredEvent.eventId === event.id);
  const registeredCount = filteredRegisterEvents.length;
  const registered = document.getElementById(`registered-${event.id}`);
  registered.innerText = `: ${registeredCount}`;
  filteredRegisterEvents.forEach((userRegistered) => {
    const registeredAccountContainer = document.getElementById(`account-${event.id}`);
    registeredAccountContainer.innerHTML += `<p>${userRegistered.username}</p>`;
  });
};

export default getParticipants;
