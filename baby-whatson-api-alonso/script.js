const API_URL = 'https://c9df0f37-f69f-4b6d-8158-2958f9b5b884-00-1wdt1mzj7jyv1.worf.replit.dev/api/company';

async function fetchCompanies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

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

async function displayCompanies() {
    const container = document.getElementById('companies-container');
    container.innerHTML = '<p>Carregando dados...</p>';

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
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', displayCompanies);
});