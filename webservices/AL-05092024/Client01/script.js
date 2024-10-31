async function getALlAPI() {
    const response = await fetch(`http://localhost:45678/game/${id}`);
    const data = await response.json();

    console.log(data);
}


getALlAPI();