function post (){
  const form = document.querySelector('form');
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    fetch('', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrfToken
      }
    })
    .then(response => response.json())
  });
};

window.addEventListener('load', post);