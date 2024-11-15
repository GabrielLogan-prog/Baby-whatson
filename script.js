/**
 * Array de endpoints da API de CNPJ.
 * @type {string[]}
 */
const endpoints = [
    'http://localhost:3000/0',
    'http://localhost:3000/1',
    'http://localhost:3000/2',
    'http://localhost:3000/3'
];

/**
 * Seleciona um endpoint aleatório e busca os dados do CNPJ.
 * @returns {Promise<void>}
 */
async function fetchRandomCNPJ() {
    const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    try {
        const response = await fetch(randomEndpoint);
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        document.getElementById('result').innerHTML = '<p>Erro ao buscar dados. Por favor, tente novamente.</p>';
    }
}

/**
 * Exibe os dados do CNPJ na página.
 * @param {Object} data - Dados do CNPJ retornados pela API.
 */
function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="info-block">
            <h2>Informações da Empresa</h2>
            <div class="info-item"><strong>Nome Fantasia:</strong> ${data.fantasia}</div>
            <div class="info-item"><strong>CNPJ:</strong> ${data.cnpj}</div>
            <div class="info-item"><strong>Email:</strong> ${data.email}</div>
            <div class="info-item"><strong>Razão Social:</strong> ${data.razao}</div>
        </div>

        <div class="info-block">
            <h2>Sócios</h2>
            ${data.socios.map(socio => `
                <div class="info-item">
                    <strong>Nome:</strong> ${socio.nome}<br>
                    <strong>CPF:</strong> ${socio.cpf}<br>
                    <strong>Tipo:</strong> ${socio.tipo}<br>
                    <strong>Data de Entrada:</strong> ${socio.dataEntrada}
                </div>
            `).join('')}
        </div>

        <div class="info-block">
            <h2>Contatos</h2>s
            ${data.telefones.map(telefone => `
                <div class="info-item">
                    <strong>${telefone.tipo}:</strong> ${telefone.numero}
                </div>
            `).join('')}
            ${data.fax.map(fax => `
                <div class="info-item">
                    <strong>Fax ${fax.tipo}:</strong> ${fax.numero}
                </div>
            `).join('')}
        </div>
    `;
}

// Adiciona o evento de clique ao botão quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    fetchButton.addEventListener('click', fetchRandomCNPJ);
});