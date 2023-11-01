function inicia() {
    let estrutura = ''
    fetch('http://cafepradev.com.br:21020/animals/list')
        .then(retorno => retorno.json())
        .then((lista) => {
            for (pos in lista) {
                estrutura += ` 
            <tr>
            <td>${lista[pos].id}</td>
            <td>${lista[pos].name}</td>
            <td>${lista[pos].species}</td>
            <td>${lista[pos].color}</td>
            <td>${lista[pos].size} </td>
            <td><a href="#" class = "btn btn-info editaItem" id ="${lista[pos].id}" >E</a>
            <a href="#" class = "btn btn-danger deletaItem" onclick ="return false"id="${lista[pos].id}">D</a> </td>
           </tr>
          
      `
                document.querySelector('#listagem').innerHTML = estrutura
            }
            document.querySelector('#adicionar').addEventListener('click', adicionaAnimal())

            document.querySelector('#listagem').addEventListener('click', (event) => {
                const target = event.target;


                if (target.classList.contains('deletaItem')) {
                    const id = target.getAttribute('id');
                    const idNumber = Number(id);
                    deletaAnimal(idNumber)
                }

                if (target.classList.contains('editaItem')) {
                    const id = target.getAttribute('id');
                    const idNumber = Number(id);
                    preencheFormsEdita(idNumber)

                }

            });
        });


}


function adicionaAnimal() {

    let adicionado = document.querySelector('#adicionar');
    adicionado.addEventListener('click', () => {
        preencheFormsAdd()
        let cadastrou = document.querySelector('#cadastrou')
        cadastrou.addEventListener('click', () => {
            let nome = document.querySelector('#animal').value;
            let especie = document.querySelector('#especie').value;
            let cor = document.querySelector('#cor').value;
            let tamanho = document.querySelector('#tamanho').value;
            if (nome === '') {
                alert('Preencha o campo Nome');
            } else if (especie === '') {
                alert('Preencha o campo Espécie');
            } else if (cor === '') {
                alert('Preencha o campo Cor');
            } else if (tamanho === '') {
                alert('Preencha o campo Tamanho');
            }
            else {
                fetch('http://cafepradev.com.br:21020/animals/insert', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        name: nome,
                        species: especie,
                        color: cor,
                        size: tamanho
                    })
                })
                    .then((res) => res.json())
                    mostraAviso(0)

            }

        })
        return false;
    })
}

function mostraAviso(checar){
    let aviso = document.createElement('div');
    aviso.className = 'alert alert-success';
   
    if(checar===0){
        aviso.textContent = 'Animal cadastrado com sucesso!';
        document.body.appendChild(aviso);
        setTimeout(() => {
            aviso.remove();
        }, 3000);
    }
    else{
        aviso.textContent = 'Animal atualizado com sucesso!';
        document.body.appendChild(aviso);
        setTimeout(() => {
            aviso.remove();
        }, 3000);
        
        
    }
    
 
}
function preencheFormsAdd() {
    let estrutura = `
    <div class="formCadastra mt-5 mb-4" id="formcadastro">
    <div class="mb-3">
    <label for="animal" class="form-label">Nome animal:</label>
    <input type="text" class="form-control" id="animal"  placeholder="Nome do animal?">
  </div>
  <div class="mb-3">
    <label for="animal" class="form-label">Espécie</label>
    <input type="text" class="form-control" id="especie"  placeholder ="Nome da espécie?">
  </div>
    <div class="mb-3">
        <label for="animal" class="form-label">Cor</label>
        <input type="text" class="form-control" id="cor"  placeholder ="Cor do animal?">
  </div>
    <div class="mb-5">
        <label for="animal" class="form-label">Tamanho</label>
        <input type="text" class="form-control" id="tamanho"  placeholder ="Qual seu tamanho?">
    </div>
    <button type ="submit" class="btn btn-success text-center mb-5" id="cadastrou">CADASTRAR</button>
  </div>
    `
    let tagmain = document.querySelector('main')
    tagmain.innerHTML = estrutura
}
function preencheFormsEdita(id) {
    fetch(`http://cafepradev.com.br:21020/animals/search/${id}`)
        .then((retorno) => retorno.json())
        .then((retorno) => {
            let nome = retorno.name;
            let especie = retorno.species;
            let cor = retorno.color;
            let tamanho = retorno.size;

            let estrutura = `
            <div class="formCadastra mt-5 mb-4" id="formcadastro">
            <div class="mb-3">
            <label for="animal" class="form-label">Nome animal:</label>
            <input type="text" class="form-control" id="animal" placeholder="Nome do animal?" value= "${nome}">
          </div>
          <div class="mb-3">
            <label for="animal" class="form-label">Espécie</label>
            <input type="text" class="form-control" id="especie" placeholder="Nome da espécie?" value= "${especie}"">
          </div>
            <div class="mb-3">
                <label for="animal" class="form-label">Cor</label>
                <input type="text" class="form-control" id="cor" placeholder="Cor do animal?" value= "${cor}">
          </div>
            <div class="mb-5">
                <label for="animal" class="form-label">Tamanho</label>
                <input type="text" class="form-control" id="tamanho" placeholder="Qual seu tamanho?" value= "${tamanho}">
            </div>
            <button class="btn btn-success text-center" id="atualizou">ATUALIZAR</button>
          </div>
            `
            let tagmain = document.querySelector('main')
            tagmain.innerHTML = estrutura
            document.querySelector('#atualizou').addEventListener('click', () => {
                let nome = document.querySelector('#animal').value;
                let especie = document.querySelector('#especie').value;
                let cor = document.querySelector('#cor').value;
                let tamanho = document.querySelector('#tamanho').value;

                if (nome === '') {
                    alert('Preencha o campo Nome');
                } else if (especie === '') {
                    alert('Preencha o campo Espécie');
                } else if (cor === '') {
                    alert('Preencha o campo Cor');
                } else if (tamanho === '') {
                    alert('Preencha o campo Tamanho');
                }
                else{
                    let animalAtualizado = {
                        id: id,
                        name: nome,
                        species: especie,
                        color: cor,
                        size: tamanho
                    }
                    atualizaAnimal(id, animalAtualizado)
                    mostraAviso('atualizar')
                }
                
            })

        }

        )

}
function deletaAnimal(id) {
    fetch('http://cafepradev.com.br:21020/animals/delete', {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(result => result.json())
        .then(() => {
            inicia()
        })
        .catch(error => {
            console.error(error)
        })
    return false;
}
function atualizaAnimal(id, objetoAnimal) {
    fetch('http://cafepradev.com.br:21020/animals/update', {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(objetoAnimal)
    })
        .then((response) => response.json())
}

inicia()


