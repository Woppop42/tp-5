export function getRegions(api)
{
    return fetch(`${api}/regions`)
    .then(response => response.json())
    .catch(err => console.log(err))
    

}
export function getDepartementFromRegion(api, regionCode)
{
    return fetch(`${api}/regions/${regionCode}/departements`)
    .then(response => response.json())
    .catch(err => console.log(err));
}
export function getCities(api, dptCode)
{
    return fetch(`${api}/departements/${dptCode}/communes`)
    .then(response => response.json())
    .catch(err => console.log(err));
}
export default getRegions;    