// Récupération de l'élément section
const section = document.querySelector(".container");
const footerYear = document.querySelector(".footer__year");

// Création de la variable dataArray qui va stocker les données renvoyées par l'API
let dataArray = [];

/**
 * Déclaration de la fonction asynchrone fetchMatch qui va permettre de récupérer les données
 * Stockage des données dans la variable dataArray
 */
const fetchMatch = async () => {
  await fetch(`./fifa-world-cup.json`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      dataArray = value;
      console.log(dataArray);
      // Appel de la fonction displayMatchCalendar
      displayMatchCalendar(dataArray);
    })
    .catch(function (err) {
      // Affichage d'un message d'erreur dans la console
      console.error(err);
    });
};
// Appel de la fonction fetchMatch
fetchMatch();

// Déclaration de la fonction displayMatchCalendar ayant pour paramètre dataArray
const displayMatchCalendar = (dataArray) => {
  //  boucle for qui va itérer sur le tableau dataArray
  for (let i = 0; i < dataArray.length; i++) {
    let time = new Date(dataArray[i]["DateUtc"]);
    let localTime = time.toLocaleTimeString().replace(":00:00", ":00");
    let dayAndMonth = time.toString().split(" ");
    //console.log(dayAndMonth);
    let date = dayAndMonth[2];
    let day = dayAndMonth[0];
    let month = dayAndMonth[1];

    //  Création des différents éléments HTML dans le DOM
    section.innerHTML += `
    <article class="match">
      <div class="match__info">
          <h3 class="group">${dataArray[i]["Group"]}</h3>
          <h3>Match Number<span class="number">${dataArray[i]["MatchNumber"]}</span></h3>
          <h3>${dataArray[i]["Location"]}</h3>
      </div>
      <div class="flags">
        <div class="home__flag">
          <div class= "home__flag__description">
            <img src="${dataArray[i]["flag"][0]}" alt="${dataArray[i]["HomeTeam"]}" class="flag" />
            <h3 class="home__team">${dataArray[i]["HomeTeam"]}</h3>
          </div>
        </div>
        <span class="vs">
          VS
        </span>
        <div class="away__flag">
          <div class="away__flag__description">
            <img src="${dataArray[i]["flag"][1]}" alt="${dataArray[i]["AwayTeam"]}" class="flag" />
            <h3 class="home__team">${dataArray[i]["AwayTeam"]}</h3>
          </div>
        </div>
      </div>
      <div class="time__area">
        <div class="time">
          <h4 class="month">${month}</h4>
          <h4 class="day">${day}</h4>
          <h4 class="date">${date}</h4>
        </div>
        <h4 class="match__time">${localTime}</h4>
      </div>
    </article>
    `;
  }

  // Déclaration de la fonction handleIntersect ayant comme paramètres entries et observer
  const handleIntersect = (entries, observer) => {
    // Pour chaque entrée
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // La méthode unobserve() de l'interface IntersectionObserver indique à l'objet IntersectionObserver courant de cesser d'observer l'élément cible spécifié.
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove("show");
      }
    });
  };

  // Création de l'objet options qui va définir les options de mon intersectionObserver
  const options = {
    root: null,
    rootMargin: "0px", // marges sur les 4 côtés de la zone d'affichage
    threshold: 0.5,
  };

  // Création d'un nouvel observateur en appelant le constructeur IntersectionObserver() en précisant une fonction callback à appeler quand l'intersection franchit l'un de des paliers, handleIntersect(), et mon ensemble d'options.
  const observer = new IntersectionObserver(handleIntersect, options);

  // Récupération de tous les articles ayant la classe match
  const allMatches = document.querySelectorAll(".match");

  // // Surveiller l'évolution de la visibilité de l'intersection de plusieurs éléments par rapport au viewport en appelant observer.observe() pour chacun de ces éléments.
  allMatches.forEach((match) => observer.observe(match));
};

// Déclaration de la fonction getCurrentYear qui va permettre l'affichage de l'année courante dans le footer
const getCurrentYear = () => {
  const date = new Date();
  // console.log(date);
  const year = date.getFullYear();
  // console.log(year);
  footerYear.textContent = `${year}`;
};
// Appel de la fonction getCurrentYear()
getCurrentYear();
