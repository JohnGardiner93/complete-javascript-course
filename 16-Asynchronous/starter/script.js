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
  // console.log(`Rendering ${data.name}`);
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
    console.log(response);
    if (!response.ok) throw new Error(`${errorMsg}(${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country not found`
  )
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) throw new Error(`No neighbor found!`);

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        `Country not found`
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
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀

// My solution
const whereAmI = function (lat, lng) {
  // Reverse Geocoding
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then(response => {
      if (response.status === 403) throw new Error(`You're going too fast!`);
      if (!response.ok) throw new Error(`API call went poorly ${res.status}`);
      return response.json();
    })
    .then(data => {
      const country = data.country;
      const city = data.city;

      if (!data) throw new Error(`No data collected`);
      if (city === undefined || country === undefined)
        throw new Error(`Coordinates lead to unknown location`);
      console.log(`You are in ${city}, ${country}`);
      // console.log(data);
      return data.country;
    })

    // Display Countries
    .then(country =>
      // console.log(data);
      fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => {
          if (!response.ok)
            throw new Error(`Country not found: ${response.status})`);
          return response.json();
        })
        .then(data => {
          // Select the correct country
          const [correctCountry] = data.filter(cur => cur.name === country);

          renderCountry(correctCountry);
          const neighbor = correctCountry.borders[0];

          if (!neighbor) throw new Error(`No neighbor found!`);
        })

        .catch(err => {
          renderError(`Something went wrong 💀 ${err.message}. Try again!`);
          console.error(`${err} 👻`);
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        })
    );
};

// Test Data
const test1 = [52.508, 13.381];
const test2 = [19.037, 72.873];
const test3 = [-33.933, 18.474];
// const test4 = [23, 319];

// Execute
whereAmI([...test1]);
whereAmI([...test2]);
whereAmI([...test3]);
// whereAmI([...test4]);
// whereAmI([151651616516516, 9898]);

*/

/*
////////////////////////////////////////////
// The Event Loop in Practice
console.log(`Test start`);
setTimeout(() => console.log(`0 sec timer`), 0);
Promise.resolve(`Resolved Promise 1`).then(res => console.log(res));
Promise.resolve(`Resolved prmoise 2`).then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log(`Test end`);

for (let i = 0; i < 1000; i++) {
  console.log(`looping`);
}

////////////////////////////////////////////
// Building a Simple Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery draw is happening 🔮`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You WIN 🤑`);
    } else {
      reject(new Error(`You LOSE 😿`));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
*/

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

/*

// Much flatter and more readable queued asynchronous functions
wait(1)
  .then(() => {
    console.log(`1 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`4 second passed`);
  });


// Compare to this callbackhell:

// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 second passed`);
//     setTimeout(() => {
//       console.log(`3 second passed`);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve(`abc`).then(x => console.log(x));
Promise.reject(new Error(`abc`)).catch(x => console.log(x));
*/

////////////////////////////////////////////
// Promisifying the Geolocation API

// console.log(`Getting position`);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const position = getPosition().then(pos => console.log(pos));

// Promisify Coding Challenge #1
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
    })

    // Reverse Geocoding

    .then(response => {
      if (response.status === 403) throw new Error(`You're going too fast!`);
      if (!response.ok) throw new Error(`API call went poorly ${res.status}`);
      return response.json();
    })
    .then(data => {
      const country = data.country;
      const city = data.city;
      console.log(country, city);

      if (!data) throw new Error(`No data collected`);
      if (city === undefined || country === undefined)
        throw new Error(`Coordinates lead to unknown location`);
      console.log(`You are in ${city}, ${country}`);
      // console.log(data);
      return data.country;
    })

    // Display Countries
    .then(country =>
      // console.log(data);
      fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => {
          if (!response.ok)
            throw new Error(`Country not found: ${response.status})`);
          return response.json();
        })
        .then(data => {
          // Select the correct country
          const [correctCountry] = data.filter(cur => cur.name === country);

          renderCountry(correctCountry);
        })

        .catch(err => {
          renderError(`Something went wrong 💀 ${err.message}. Try again!`);
          console.error(`${err} 👻`);
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        })
    );
};

btn.addEventListener(`click`, whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// My Solution
let img;

const imagesContainer = document.querySelector(`.images`);

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement(`img`);
    imgEl.src = imgPath;
    imgEl.onerror = () => reject(new Error(`Image path not valid: ${imgPath}`));
    imgEl.onload = () => {
      imagesContainer.insertAdjacentElement(`beforeend`, imgEl);
      resolve(imgEl);
    };
  });
};

createImage(`\\img\\img-14.jpg`)
  .then(response => {
    img = response;
    return wait(2);
  })
  .then(() => {
    img.style.display = `none`;
    return createImage(`\\img\\img-2.jpg`);
  })
  .then(response => {
    img = response;
    return wait(2);
  })
  .then(() => {
    img.style.display = `none`;
  })
  .catch(err => console.error(err));

// His Solution
