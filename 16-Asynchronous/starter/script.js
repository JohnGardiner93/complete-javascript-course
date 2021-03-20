'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener(`load`, function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed()} People</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
`;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData(`USA`);
// getCountryData(`portugal`);
// getCountryData(`germany`);
// getCountryData(`lithuania`);

////////////////////////////////////////////
// Welcome to Callback Hell
*/

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed()} People</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
      </article>
  `;

  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  //   countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  //   AJAX call country 1
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener(`load`, function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighobor country (2)
    const [neighbor] = data.borders;

    if (!neighbor) return;

    //   AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(`GET`, `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener(`load`, function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, `neighbour`);
    });
  });
};

// getCountryAndNeighbor(`USA`);
// getCountryAndNeighbor(`portugal`);

// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 second passed`);
//     setTimeout(() => {
//       console.log(`3 second passed`);
//     }, 1000);
//   }, 1000);
// }, 1000);

////////////////////////////////////////////
// Promises and the Fetch API
/*
const request = new XMLHttpRequest();
request.open(`GET`, `https://restcountries.eu/rest/v2/name/${country}`);
request.send();
*/

// const request = fetch(`https://restcountries.eu/rest/v2/name/USA`);
// console.log(request);

////////////////////////////////////////////
// Consuming Promises, Chaining Promises

// --- Verbose version
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Non-Refactored Version
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //   const neighbor = data[0].borders[0];
//       const neighbor = `kjasnd`;

//       if (!neighbor) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, `neighbour`))
//     .catch(err => {
//       renderError(`Something went wrong 💀 ${err.message}. Try again!`);
//       console.error(`${err} 👻`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener(`click`, function () {
//   getCountryData(`USA`);
// });

// getCountryData(`dsdsdsdsdsdsd`);

// Refactored Version
const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg}(${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country not found (${response.status})`
  )
    .then(data => {
      renderCountry(data[0]);
      //   const neighbor = data[0].borders[0];
      const neighbor = `kjasnd`;

      if (!neighbor) return;

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        `Country not found ${response.status}`
      );
    })
    .then(data => renderCountry(data, `neighbour`))
    .catch(err => {
      renderError(`Something went wrong 💀 ${err.message}. Try again!`);
      console.error(`${err} 👻`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener(`click`, function () {
  getCountryData(`USA`);
});
