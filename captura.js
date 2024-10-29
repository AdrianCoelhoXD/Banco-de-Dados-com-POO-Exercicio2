const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'http://localhost:8000/hoteis.html'; // URL do arquivo HTML local

axios.get(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const dados = []; // Declare a variável 'dados' dentro da função

    // Seletores correspondendo ao HTML fictício
    $('.hotel-info').each((i, elem) => {
        const nome = $(elem).find('h1').text(); // Captura o nome do hotel
        const preco = $(elem).find('p.preco').text(); // Captura o preço do hotel
        dados.push({ nome, preco });
    });

    console.log(dados); // Verifique os dados capturados

    const csv = dados.map(dado => `${dado.nome},${dado.preco}`).join('\n');
    fs.writeFileSync('dados_hoteis.csv', csv);
    console.log('Dados salvos em dados_hoteis.csv');
}).catch(error => {
    console.error('Erro ao capturar os dados:', error);
});
