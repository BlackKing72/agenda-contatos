const exibirContatos = () => {
    const tabela = document.getElementById('idTabelaContatos'); // Tabela
    const tbody = tabela.querySelector('tbody'); // Corpo da tabela

    console.log(tbody);

    tbody.innerHTML =
        `<tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Contato</th>
            <th>Editar</th>
            <th>Excluir</th>
        </tr>`;

    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    contatos.forEach((contato, index) => {
        const row = tbody.insertRow();
        row.innerHTML =
            `<tr>
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>${contato.telefone}</td>
                <td><button class="btnEditar" onclick="editarContato(${index});"><i class="fa-solid fa-pencil"></i></button></td>
                <td><button class="btnExcluir" onclick="deletarContato(${index});"><i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`;
    });
}

const adicionarContato = (event) => {
    event.preventDefault(); // Impede o comportamento do botão, enviar o formulário

    const form          = document.getElementById('idContatoForm');
    const nome          = document.getElementById('idNome').value.trim();
    const sobrenome     = document.getElementById('idSobrenome').value.trim();
    const telefone      = document.getElementById('idTelefone').value.trim();
    const tipoTelefone  = document.getElementById('idTipoTelefone').value;
    const email         = document.getElementById('idEmail').value.trim();

    let camposVazios = [];

    nome == ''          ? camposVazios.push('nome') : {};
    sobrenome == ''     ? camposVazios.push('sobrenome') : {};
    telefone == ''      ? camposVazios.push('telefone') : {};
    tipoTelefone == ''  ? camposVazios.push('tipo de telefone') : {};
    email == ''         ? camposVazios.push('email') : {};

    if (camposVazios.length > 0) {
        alert(`Preencha os campos ${camposVazios.join(', ')}`);
        return;
    }

    console.log(`Novo contato adicionado
        nome: ${nome}
        sobrenome: ${sobrenome}
        telefone: ${telefone}
        tipo de telefone: ${tipoTelefone}
        email: ${email}`);

    // Buscar os contatos que estão salvos ou criar uma nova lista vazia
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.push({
        nome: nome,
        sobrenome: sobrenome,
        telefone: telefone,
        tipoTelefone: tipoTelefone,
        email: email,
    });

    // Salvar a lista de contatos atualizados
    localStorage.setItem('contatos', JSON.stringify(contatos));

    form.reset(); // Limpa o formulário

    exibirContatos();
};

const deletarContato = (index) => {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    exibirContatos();
};

const editarContato = (index) => {

    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const contato = contatos[index];

    document.getElementById('idNome').value = contato.nome;
    document.getElementById('idSobrenome').value = contato.sobrenome;
    document.getElementById('idTelefone').value = contato.telefone;
    document.getElementById('idTipoTelefone').value = contato.tipoTelefone;
    document.getElementById('idEmail').value = contato.email;


    const atualizarContato = (event) => {
        event.preventDefault();

        contato.nome          = document.getElementById('idNome').value.trim();
        contato.sobrenome     = document.getElementById('idSobrenome').value.trim();
        contato.telefone      = document.getElementById('idTelefone').value.trim();
        contato.tipoTelefone  = document.getElementById('idTipoTelefone').value;
        contato.email         = document.getElementById('idEmail').value.trim();

        localStorage.setItem('contatos', JSON.stringify(contatos));

        exibirContatos();
        document.getElementById('idContatoForm').reset();

        document.querySelector('.btnSalvar').removeEventListener('click', atualizarContato);
        document.querySelector('.btnSalvar').addEventListener('click', adicionarContato);
    }

    document.querySelector('.btnSalvar').removeEventListener('click', adicionarContato);
    document.querySelector('.btnSalvar').addEventListener('click', atualizarContato);
}

const cancelarContato = (event) => {
    event.preventDefault(); // Impede o comportamento do botão, enviar o formulário.
    document.getElementById('idContatoForm').reset(); // Limpa o formulário
};

const buscarContatos = () => {
    const barraPesquisa = document.getElementById('idPesquisa').value.trim().toLowerCase();
    
    const tabela = document.getElementById('idTabelaContatos');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const celulas = linhas[i].getElementsByTagName('td');
        
        let busca = false;

        for (let j = 0; j < celulas.length; j++) {
            const texto = celulas[j].textContent.toLocaleLowerCase();

            if (texto.includes(barraPesquisa)) {
                busca = true;
                break;
            }
        }

        busca ? linhas[i].style.display = '' : linhas[i].style.display = 'none';
    }
}

// Inicializa a aplicação
const inicializar = () => {
    document.querySelector('.btnSalvar').addEventListener('click', adicionarContato);
    document.querySelector('.btnCancelar').addEventListener('click', cancelarContato);
    const barraPesquisa = document.getElementById('idPesquisa').addEventListener('input', buscarContatos);
    exibirContatos();
};

inicializar();

