const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}年${month}月${day}日${hours}:${minutes}`;
};

const buildHTML = (date, content) => {
  const html = `
  <div class="post">
    <div class="post-date">
      投稿日時：${date}
    </div>
    <div class="post-content">
      ${content}
    </div>
  </div>`;
  return html;
};

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
    .then(response => {
      if (!response.ok) {
        alert(`Error ${response.status}: ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.querySelector('.posts-container');
      const formattedDate = formatDate(data.created_at);
      const html = buildHTML(formattedDate, data.content);
      postsContainer.insertAdjacentHTML('afterend', html);
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('AJAX request failed: ' + error);
    });

  });
};

window.addEventListener('load', post);