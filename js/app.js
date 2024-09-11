let amigos = [];

function adicionar() {
    // Recuperando os elementos HTML para o nome do amigo e para a lista de amigos incluídos
    let nomeAmigo = document.getElementById('nome-amigo');
    // Condição para verificar se o nome do amigo foi digitado
    if(nomeAmigo.value == ''){
        alert('Informe o nome do amigo!');
        return;
    }

    // Condição para verificar se o nome do amigo já foi adicionado
    if(amigos.includes(nomeAmigo.value.toUpperCase())) {
        alert('Nome já adicionado!');
        return;
    }

    let listaAmigos = document.getElementById('lista-amigos');

    // O array amigos recebe o nome do amigo que foi adicionado
    amigos.push(nomeAmigo.value.toUpperCase());

    // Se a lista estiver vazia, adicionar na lista de amigos o nome do amigo
    if(listaAmigos.textContent == '') {
        listaAmigos.textContent = nomeAmigo.value;
    } 
    // Se a lista não estiver vazia, adicionar o nome do amigo anterior + vírgula + o nome do outro amigo
    else {
        listaAmigos.textContent = listaAmigos.textContent + ', ' + nomeAmigo.value;
    }

    // Após adicionar o nome do amigo na lista de amigos incluídos, o input do nome do amigo deve ficar vazio
    nomeAmigo.value = '';

    // Invocando as funções para atualizar a lista de amigos e o sorteio
    atualizarLista();
    atualizarSorteio();
}

function sortear() {
    // Condição para o usuário adicionar 4 ou mais nomes para efetuar o sorteio
    if(amigos.length < 4){
        alert('Adicione 4 ou mais amigos para sortear!');
        return;
    }
    // Invocando a função para embaralhar os amigos incluídos
    embaralharArray(amigos);
    // Armazenando o elemento HTML da lista de sorteio
    let listaSorteio = document.getElementById('lista-sorteio');

    // Loop para percorrer todo o array amigos e adicionar dentro do elemento HTML da lista de sorteio utilizando o innerHTML, concatenando e utilizando a tag '<br>' para quebrar a linha
    for(let i = 0; i < amigos.length; i++) {
        // Condição para o primeiro elemento do array também ser sorteado
        if(i == amigos.length - 1) {
            listaSorteio.innerHTML = listaSorteio.innerHTML + amigos[i] + ' --> ' + amigos[0] + '<br/>';
        } else {
            listaSorteio.innerHTML = listaSorteio.innerHTML + amigos[i] + ' --> ' + amigos[i + 1] + '<br/>';
        }
    }
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

// Função para embaraalhar a lista de amigos incluídos
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição
    }
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    // Redefine o conteúdo do sorteio para uma string vazia
    sorteio.innerHTML = '';
}

function atualizarLista() {
    // Armazena o elemento HTML da lista de amigos excluídos
    let lista = document.getElementById('lista-amigos');
    // Essa linha redefine o conteúdo da lista para uma string vazia, limpando qualquer conteúdo anterior que esteja no elemento. Isso garante que a lista seja recriada do zero toda vez que a função for chamada, evitando duplicações.
    lista.innerHTML = '';

    // Laço para percorrer o array de amigos e transformar cada elemento em um parágrafo
    for(let i = 0; i < amigos.length; i++){
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];
        
        // Cria um evento de clique que invoca a função de excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });
        
        // Adiciona o parágrafo em que o loop está [i] como último filho da lista
        lista.appendChild(paragrafo);
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}
