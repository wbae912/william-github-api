function getGitHubRepo(username) {
  const BASE_URL = `https://api.github.com/users/${username}/repos`;
  fetch(BASE_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(data => {
    //   console.log(data);
      displayRepos(data);
    })
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayRepos(responseJson) {
  $('.search-results').empty();

  responseJson.map(repo => {
    $('.search-results').append(`
      <li class="search-result">
        <a href=${repo.html_url}>${repo.name}</a>
      </li>`);
  });
}

function handleSubmit() {
  $('.search-form').on('submit', function (event) {
    event.preventDefault();
    const username = $('#repo-search').val();
    getGitHubRepo(username);
  });
}

function main() {
  $(handleSubmit);
}

$(main);
