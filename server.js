const livros = JSON.parse(localStorage.getItem('livros')) || [];

// Função para salvar livros no LocalStorage
function salvarLivros() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Função para adicionar um livro
function adicionarLivro(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const ano = parseInt(document.getElementById('ano').value);
    const avaliacao = parseFloat(document.getElementById('avaliacao').value);

    const livro = { titulo, autor, genero, ano, avaliacao };
    livros.push(livro);
    salvarLivros();
    listarLivros();
    event.target.reset();
}

// Função para listar livros
function listarLivros() {
    const ul = document.getElementById('lista-livros');
    ul.innerHTML = '';

    livros.forEach((livro, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Título:</strong> ${livro.titulo} <br>
            <strong>Autor:</strong> ${livro.autor} <br>
            <strong>Gênero:</strong> ${livro.genero} <br>
            <strong>Ano:</strong> ${livro.ano} <br>
            <strong>Avaliação:</strong> ${livro.avaliacao} <br>
            <button onclick="avaliarLivro(${index})">Avaliar</button>
        `;
        ul.appendChild(li);
    });
}

// Função para avaliar um livro
function avaliarLivro(index) {
    const novaAvaliacao = parseFloat(prompt('Digite a nova avaliação (1 a 5):'));
    if (novaAvaliacao >= 1 && novaAvaliacao <= 5) {
        livros[index].avaliacao = novaAvaliacao;
        salvarLivros();
        listarLivros();
    } else {
        alert('Avaliação inválida!');
    }
}

// Função para buscar livros
function buscarLivros() {
    const termo = document.getElementById('buscar').value.toLowerCase();
    const resultado = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.genero.toLowerCase().includes(termo)
    );
    listarLivros(resultado);
}

// Função para classificar livros
function classificarLivros(criterio) {
    livros.sort((a, b) => {
        if (a[criterio] < b[criterio]) return -1;
        if (a[criterio] > b[criterio]) return 1;
        return 0;
    });
    salvarLivros();
    listarLivros();
}

// Event listeners
document.getElementById('form-adicionar-livro').addEventListener('submit', adicionarLivro);
document.getElementById('buscar').addEventListener('input', buscarLivros);
document.getElementById('classificar-titulo').addEventListener('click', () => classificarLivros('titulo'));
document.getElementById('classificar-autor').addEventListener('click', () => classificarLivros('autor'));
document.getElementById('classificar-avaliacao').addEventListener('click', () => classificarLivros('avaliacao'));

// Carregar livros ao iniciar
listarLivros();
