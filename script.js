
function mostrarInfo (json) {
    document.querySelector('.aviso').style.display = 'none'

    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.Icon}@2x.png`)

    document.querySelector('.ventoInfo').innerHTML = `${json.wind} <span>km/h</span>`

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.Angle-90}deg)`
}

function limparInfo() {
    document.querySelector('.aviso').style.display = 'none'
    document.querySelector('.resultado').style.display = 'none'
}

document.querySelector('.busca').addEventListener('submit', async (e) => { // O "async" é usado para dizer que o codigo é asincrono, podendo usar "fetch" e "post"
    e.preventDefault()

    let pegar = document.querySelector('#searchInput').value

    if(pegar !== '') {
        limparInfo()
        document.querySelector('.aviso-2').style.display = 'none'
        document.querySelector('.aviso').style.display = 'block'

        /*Forma de usar a API, coloca o pegar no lugar do nome da cidade, com o "encodeURI" para transformar os espaços em codigo*/
        /*O "units" e o "lang" são propriedades da API para mudar a unidade de medida e a linguagem. O "&" é obrigatorio para usar os comando da API*/
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(pegar)}&appid=2c8dea1c2e1c0631e24d5154682bf63e&units=metric&lang=pt_br`

        let resultado = await fetch(url) /*Fez a requisição, no caso, pediu para para esperar ate que o resultado chegasse*/
        let json = await resultado.json()/*Transformou os resultados em "resultado" em um json, e guardando na variavel "json"*/

        if(json.cod === 200){
            mostrarInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                Icon: json.weather[0].icon,
                wind: json.wind.speed,
                Angle: json.wind.deg
            })
        } else {
            limparInfo()
            document.querySelector('.aviso-2').style.display = 'block'
        }
    } else {
        limparInfo()
    }
})
