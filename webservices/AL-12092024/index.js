const clientId = '3e8b67f899774cd29f35d95f0638be0d'
const clientSecret = '8d89edb77d0e4ad284bac62d43130777'

const getToken = async ()=>{
    const result = await fetch('https://accounts.spotify.com/api/token',{
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret), 
        },
        body: "grant_type=client_credentials",
    });
    const data = await result.json();
    return data.access_token;
};

const getGeneres = async (token) =>{
    const result = await fetch("https://api.spotify.com/v1/browse/categories?offset=0&limit=20&locale=pt-br", {
        method:"GET",
        headers:{
            "Authorization": "Bearer"+ token
        }
    })
}

//CHAMANDO E JA EXECUTANDO A FUNÇÃO ASYNC
(async ()=> {
    const token = await getToken();
    console.log(token);
})();
