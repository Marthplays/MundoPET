const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        
        leitor.onload = () => {
            resolve({
                url: leitor.result,
                nome: arquivo.name
            });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo: ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

const tagsDisponiveis = [
    "Gato Persa",
    "Gato Siamês",
    "Gato Maine Coon",
    "Gato Sphynx",
    "Gato Bengal",
    "Gato Ragdoll",
    "Gato British Shorthair",
    "Gato Abyssinian",
    "Gato Birman",
    "Gato Savannah",
    "Gato Scottish Fold",
    "Gato Exotic Shorthair",
    "Gato Norwegian Forest",
    "Gato Oriental",
    "Gato Himalayan",
    "Gato Cornish Rex",
    "Gato Devon Rex",
    "Gato Turkish Angora",
    "Gato Russian Blue",
    "Gato Balinese",
  ];

async function verificarTags(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }), 1000
    });
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificarTags(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="/img/close (1).svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.")
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag.")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");


async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado!");
            } else {
                reject("Servidor falhou em públicar o projeto, tente novamente!");
            }
        })
    })
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    console.log(nomeDoProjeto);
    console.log(descricaoDoProjeto);
    console.log(tagsProjeto);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto,descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu certo!");
    } catch (error) {
        console.log("Deu errado");
        alert("Deu errado");
    };

})

const botaoDescartar = document.querySelector(".botao-descartar");
botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";
    
    listaTags.innerHTML = "";
})