const main = document.querySelector("main");

let movies = [];

async function fetchMovie() {
    const responseFromFetch = await fetch(" https://ghibliapi.herokuapp.com/films", {
        headers: {
            Accept: 'Application/json',
        }
    });
    const data = await responseFromFetch.json();
    return data;
}

async function fetchAndGiveContentMovies() {
    movies = await fetchMovie();
    contentMovies(movies);
}

function contentMovies(myMovies) {
    const html = myMovies.sort((a, b) => b.rt_score - a.rt_score)
          .map(movie => {
            return `
            <article>
              <div class="content">
                <h3>${movie.title}</h3>
                <p class="release_date">Released in: ${movie.release_date}</p>
                <p class="rt_rate">rt_score: ${movie.rt_score}</p>
              </div>
              <p class="description">${movie.description}</p>
              <div class="content">
                <p class="director">${movie.director}</p>
                <p class="producer">${movie.producer}</p>
              </div>
            </article>
            `
        }).join('');
    main.innerHTML = html;
}

fetchAndGiveContentMovies()