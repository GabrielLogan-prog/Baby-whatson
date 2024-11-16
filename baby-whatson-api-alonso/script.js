

/**
 * URL of the API.
 * OBS , SE REMOVER O REDIRECIONAMENTO PELO HEROKU O REPLIT NAO LIBERA ACESSO A API 
 * @constant
 * @type {string}
 */
const API_URL = 'https://cors-anywhere.herokuapp.com/https://c9df0f37-f69f-4b6d-8158-2958f9b5b884-00-1wdt1mzj7jyv1.worf.replit.dev/api/company';


/**
 * Fetch companies from API.
 * 
 * OBS , SE REMOVER OS HEADERS NAO FUNCIONA KKKKkkkkkkkk 
 *
 * @returns {Promise<Object[]>} - List of companies.
 *
 * @throws {Error} - If there is an error with the request.
 */
async function fetchCompanies() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'pt-PT,pt;q=0.9',
            'cache-control': 'max-age=0',
            'connection': 'keep-alive',
            'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

/**
 * Cria um elemento HTML para representar uma empresa.
 * @param {object} company Empresa a ser representada.
 * @returns {Element} O elemento HTML criado.
 */
function createCompanyElement(company) {
    const companyElement = document.createElement('div');
    companyElement.className = 'company';

    companyElement.innerHTML = `
        <h2>${company.fantasia}</h2>
        <div class="company-info"><strong>CNPJ:</strong> ${company.cnpj}</div>
        <div class="company-info"><strong>Email:</strong> ${company.email}</div>
        
        <div class="socios">
            <h3>Sócios:</h3>
            ${company.socios.map(socio => `
                <div class="socio">
                    <strong>${socio.nome}</strong> (${socio.tipo})
                </div>
            `).join('')}
        </div>
        
        <div class="contatos">
            <h3>Contatos:</h3>
            ${company.telefones.map(telefone => `
                <div class="contato">
                    <strong>${telefone.tipo}:</strong> ${telefone.numero}
                </div>
            `).join('')}
            ${company.fax.map(fax => `
                <div class="contato">
                    <strong>Fax ${fax.tipo}:</strong> ${fax.numero}
                </div>
            `).join('')}
        </div>
    `;

    return companyElement;
}

/**
 * Exibe a lista de empresas.
 * @throws {Error} Se ocorrer um erro ao carregar a lista de empresas.
 */
async function displayCompanies() {
    const container = document.getElementById('companies-container');
    container.innerHTML = '<p>Carregando dados...</p>';

    try {
        const companies = await fetchCompanies();

        if (companies.length === 0) {
            container.innerHTML = '<p>Nenhuma empresa encontrada.</p>';
            return;
        }

        container.innerHTML = '';
        companies.forEach(company => {
            const companyElement = createCompanyElement(company);
            container.appendChild(companyElement);
        });
    } catch (error) {
        container.innerHTML = `<p>Erro ao carregar dados: ${error.message}</p>`;
    }
}

/**
 * Adiciona listeners de eventos aos elementos do DOM quando o conteudo HTML for  carregado por completo.
 */
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', displayCompanies);
});
