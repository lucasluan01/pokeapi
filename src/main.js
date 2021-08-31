const colors = {
	bug: '#84C400',
    dark: '#5A5366',
	dragon: '#0070CA',
	electric: '#FBD200',
	fairy: '#FB8AEC',
	fighting: '#E12C6A',
	fire: '#FF983F',
	flying: '#8AABE4',
    ghost: '#4B6AB3',
	grass: '#35C04A',
	ground: '#E97333',
    ice: '#4BD2C1',
	normal: '#929BA3',
	poison: '#B667CF',
	psychic: '#FF6676',
	rock: '#C9B787',
    steel: '#5A8EA1',
	water: '#3393DD'
};

let urlBase = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=24'
let nextURL = ''
let previousURL = ''

window.scrollTo(0, 0)

window.onload = () => {
   pokemon(urlBase);
}

const nextPage = () => {
    pokemon(nextURL)
}

const previousPage = async () => {
    pokemon(previousURL)
}

function pokemon (urlAPI) {
    let container = document.querySelector('#pokemon-container')
    let contentHTML = '';

    fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
            
        nextURL = data['next']
        previousURL = data['previous']

        for(let index in data['results']){
            let monster = data['results'][index]
            let nome = monster['name']
            let urlMonster = monster['url']
                
            fetch(urlMonster)
            .then(response => response.json())
            .then(data => {
                let nomeMonster = nome.toUpperCase()
                let id = data['id']
                let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"`
                let type = data['types'][0]['type']['name']
                        
                contentHTML += `

                <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                    <div class="card" style="background-color: ${colors[type]}75">
                        <a href="#">
                            <h6 class=>#${id}</h6>
                            <img class="card-img-top" src="${image}" alt="Card image cap">
                            <h6 class="card-title">${nomeMonster}</h6>
                        </a>
                    </div>
                </div>
                `
                container.innerHTML = contentHTML; 
            })
        }
    })
}