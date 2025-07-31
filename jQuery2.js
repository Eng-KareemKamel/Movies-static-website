$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true
});

$(document).ready(function () {
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const movies = data.results;

            if (!movies || movies.length === 0) {
                $('#movie-grid').html(`<p>No movies found.</p>`);
                return;
            }

            for (let i = 0; i < 20; i++) {
                const movie = movies[i];
                $('.movie-grid').append(`
                    <div class="col-md-3 mb-4 movie-card">
                    <div class="card h-100">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${movie.title}</h5>
                    <p class="card-text">${movie.overview.substring(0, 100)}...</p>
                </div>
            </div>
          </div>
        `);
            }
        },
        error: function (xhr, status, error) {
            $('.movie-grid').html(`<p class="text-danger">Failed to load data!</p>`);
            console.error('Error:', error);
        }
    });
});

$(document).ready(function () {
    $('#search-input').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();

        $('.movie-card').each(function () {
            var title = $(this).find('.card-title').text().toLowerCase();

            if (title.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});



let mybutton = document.getElementById("myBtn");
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}