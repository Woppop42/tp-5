import { getRegions, getDepartementFromRegion, getCities } from "./geoApi.js";

const regionsSelect = document.getElementById("regions");
const departementsSelect = document.getElementById("departements");
const showCommunesBtn = document.getElementById("showCommunes");
const communesList = document.getElementById("communesList");


const api = "https://geo.api.gouv.fr";

regionsSelect.addEventListener("click", async () => {
  try {
    const data = await getRegions(api);
    data.forEach((region) => {
      const option = document.createElement("option");
      option.value = region.code;
      option.textContent = region.nom;
      regionsSelect.appendChild(option);
    });
    departementsSelect.disabled = false;
  } catch (err) {
    console.log(err);
  }
});

departementsSelect.addEventListener("click", async () => {
  try {
    const regionCode = regionsSelect.value;
    const data = await getDepartementFromRegion(api, regionCode);
    data.forEach((departement) => {
      const option = document.createElement("option");
      option.value = departement.code;
      option.textContent = departement.nom;
      departementsSelect.appendChild(option);
    });
    showCommunesBtn.disabled = false;
  } catch (err) {
    console.log(err);
  }
});
showCommunesBtn.addEventListener("click", async () => {
    try
    {
        const dptCode = departementsSelect.value;
        const data = await getCities(api, dptCode);
        data.sort((a, b) => b.population - a.population);
        communesList.innerHTML = "";
        data.forEach((commune) => {
          const li = document.createElement("li");
          li.textContent = `${commune.nom} (Population: ${commune.population})`;
          communesList.appendChild(li);
        });

    }
    catch(err)
    {
        console.log(err);
    }
});
