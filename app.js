const server = "http://localhost:3000";
const acceuilP = document.querySelector("#acceuil");
const helloP = document.querySelector("#hello");

async function getServerResponse(element, property, url) {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  element.innerHTML = jsonResponse[property];
}

getServerResponse(acceuilP, "message", server).catch((err) =>
  console.log("Erreur de recuperation des données depuis /")
);
getServerResponse(helloP, "message", server + "/hello").catch((err) =>
  console.log("Erreur de recuperation des données depuis /hello")
);
