const showModal = (message) => {
  const successModal = document.getElementById('successModal');
  successModal.style.display = 'block';

  const messageContainer = document.getElementById('message');
  messageContainer.innerText = message;

  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
  });
};

export default showModal;
