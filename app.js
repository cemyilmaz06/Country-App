const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");
const countriesDiv = document.querySelector(".countries");

// API'den veri çekmek için async bir fonksiyon tanımlıyoruz
async function fetchCountries() {
    try {
        // fetch ile API'den veri çekiyoruz
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countryData = await response.json();
      
        // Input alanına event listener ekliyoruz
        searchInput.addEventListener("input", () => {
            const input = searchInput.value.toLowerCase(); // Kullanıcının girdiği değeri alıyoruz
            searchDiv.innerHTML = ""; // Önceki sonuçları temizliyoruz

            if (input) {
                // Ülkeleri filtreliyoruz
                const filteredCountries = countryData.filter(country =>
                    country.name.common.toLowerCase().includes(input)
                );

                if (filteredCountries.length === 1) {
                    // Eğer sadece bir ülke ile eşleşiyorsa, direkt bilgileri gösteriyoruz
                    displayCountryDetails(filteredCountries[0]);
                    searchDiv.style.display = "none";
                    searchDiv.innerHTML = ""; 

                } else if (filteredCountries.length > 1) {
                    // Eğer birden fazla eşleşme varsa, ülkeleri listeliyoruz
                    searchDiv.style.display = 'block';
                    filteredCountries.forEach(country => {
                        const countryDiv = document.createElement('div');
                        countryDiv.textContent = country.name.common;
                        countryDiv.addEventListener('click', function () {
                            searchInput.value = country.name.common;
                            searchDiv.style.display = 'none';
                            searchDiv.innerHTML = ""; 
                           
                            displayCountryDetails(country);
                        });
                        searchDiv.appendChild(countryDiv);
                    });
                } else {
                    // Eşleşme yoksa listeyi gizliyoruz
                    searchDiv.style.display = 'none';
                }
            } else {
                // Input boşsa listeyi gizliyoruz
                searchDiv.style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

// Ülke bilgilerini ekrana yazdıran fonksiyon
function displayCountryDetails(country) {
    console.log(country);
    const img = country.flags.png;
    const name = country.name.common;
    const region = country.region;
    const capital = country.capital ? country.capital[0] : "No capital";
    const languages = country.languages ? Object.values(country.languages).join(', ') : "No languages";
    const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : "No currency";
    const population = country.population.toLocaleString();
    const borders = country.borders ? country.borders.join(', ') : "None";
    const maps = country.maps.googleMaps;

    countriesDiv.innerHTML = `
       <div class="card shadow-lg" style="width: 22rem">
            <img src="${img}" class="card-img-top shadow" alt="${name}" />
            <div >
              <h5 class="p-2 text-center">${name}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold">Bölge:</span>${region}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i>
                <span class="fw-bold">Başkent:</span>${capital}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i>
                <span class="fw-bold"> Dil:</span> ${languages}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i>
                <span class="fw-bold">Para birimi ve simgesi:</span>${currencies}
              </li>
              <li class="list-group-item">
              <i class="fa-solid fa-people-group"></i>
              <span class="fw-bold"> Nüfus bilgisi:</span> ${population}
            </li>
              <li class="list-group-item">
              <i class="fa-sharp fa-solid fa-road-barrier"></i>
              <span class="fw-bold">Komşular:</span>${borders} 
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Harita: </span><a href="${maps}" target='_blank'> Go to Google Maps</a> 
            </li>
            </ul>
        </div>
    `;
}

// Fonksiyonu çağırıyoruz
fetchCountries();
    






