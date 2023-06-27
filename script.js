$(document).ready(function() {
            $('#submitBtn').click(function(event) {
                event.preventDefault();
                var countryName = $('#countryName').val();

                // Fetch country details
                $.ajax({
                    url: 'https://restcountries.com/v3.1/name/' + countryName,
                    type: 'GET',
                    success: function(result) {
                        var country = result[0];
                        var currencies = Object.values(country.currencies).map(currency => currency.name);
                        var population = country.population.toLocaleString();

                        var details = '<h2>' + country.name.common + '</h2>' +
                            '<p>Official Name: ' + country.name.official + '</p>' +
                            '<p>Population: ' + population + '</p>' +
                            '<p>Capital: ' + country.capital + '</p>' +
                            '<p>Region: ' + country.region + '</p>' +
                            '<p>Subregion: ' + country.subregion + '</p>' +
                            '<p>Languages: ' + Object.values(country.languages).join(', ') + '</p>' +
                            '<p>Currencies: ' + currencies.join(', ') + '</p>';

                        // Display country details
                        $('#details').html(details);

                        // Fetch country news
                        var newsApiKey = '68bb3b0310ab4bb6a989ac83aa5d4c1a'; 
                        var newsApiUrl = 'https://newsapi.org/v2/everything?' +
                            'q=' + encodeURIComponent(country.name.common) +
                            '&apiKey=' + newsApiKey;

                        $.ajax({
                            url: newsApiUrl,
                            type: 'GET',
                            success: function(newsResult) {
                                var newsArticles = newsResult.articles;

                                var newsHtml = '<h3>Local News</h3>';
                                if (newsArticles.length > 0) {
                                    newsHtml += '<ul>';
                                    for (var i = 0; i < Math.min(newsArticles.length, 10); i++) {
                                        var article = newsArticles[i];
                                        newsHtml += '<li><a href="' + article.url + '" class="news-article">' + article.title + '</a></li>';
                                    }
                                    newsHtml += '</ul>';
                                } else {
                                    newsHtml += '<p>No news available for ' + country.name.common + '.</p>';
                                }

                                // Display country news
                                $('#news').html(newsHtml);
                            },
                            error: function() {
                                $('#news').html('<p>Failed to fetch country news.</p>');
                            }
                        });

                        // Fetch country cost of living
                        var countrySlug = countryName.toLowerCase().replace(/\s+/g, '-');
                        var imageUrl = 'https://livingcost.org/assets/photo/cost/' + countrySlug + '.jpg';

                        // Modify the 'src' attribute of the 'img' tag
                        $('#countryImage').attr('src', imageUrl);

                        // Add header for Country Cost of Living
                        $('#costHeader').text('Cost of Living');
                        },
                    error: function() {
                        $('#details').html('<p>Unable to fetch country data. Please try again.</p>');
                        $('#countryImage').html('');
                        $('#costHeader').text('');
                    }
                });
            });
        });
        