
// Inicio
// // Variaveis
const botaoInicial = document.getElementById("play")
const modalInicial = document.getElementById("modal-inicio")
const main = document.getElementById("main")
const musicaJogo = document.getElementById("musica-jogo")
const semAudio = document.getElementById("audio")
const imagemVolume = document.getElementById("volume-img")
const botaoRegras = document.getElementById("regras")
const modalRegras = document.getElementById("modal-regras")

// // Funções
const iniciarJogo = () => {
    modalInicial.className = "modal-fechado"
    main.className = "main-aberto"
    game()
}

const mostraRegras = () => {
    let regrasImagem = document.getElementById("regras-img")
    if(modalRegras.className === "modal-fechado") {
        modalRegras.className = "modal-aberto"
        regrasImagem.setAttribute("src", "assets/icons/rules-closed.png")
    } else {
        modalRegras.className = "modal-fechado"
        regrasImagem.setAttribute("src", "assets/icons/rules.png")
    }
}

const semSom = () => {
    if(musicaJogo.muted === false) {
        imagemVolume.setAttribute("src", "assets/icons/volume-on.png")
        musicaJogo.muted = true;
    } else {
        imagemVolume.setAttribute("src", "assets/icons/volume-off.png")
        musicaJogo.muted = false
    }
}

// // Events
botaoInicial.addEventListener("click", iniciarJogo)

botaoRegras.addEventListener("click", mostraRegras)

semAudio.addEventListener("click", semSom)
musicaJogo.volume = 0.3;

// Jogo
// // Start & Criação do mapa
const game = () => {
    criaMapa()
    document.addEventListener("keydown", mover)
    document.removeEventListener("keypress", mover, false)
}

const criaMapa = () => {
    let tela = document.getElementById("tela")

    let contadorLinha = 0;
    let contadorColuna = 0;
    let contadorPocao = 0;
    let contadorMonstro = 0;
    let contadorGema = 0;

    map.forEach((item) => {
        let divLinha = document.createElement("div")
        divLinha.style.display = "flex"
        item.split("").map((i) => {
            let divCelula = document.createElement("div")
            divCelula.dataset.linha = contadorLinha

            if (i === " ") {
                divCelula.className = "caminho"
                divCelula.dataset.coluna = contadorColuna
            }
            else if (i === "D") {
                divCelula.className = "caminho"
                divCelula.dataset.coluna = contadorColuna

                let monstro = document.createElement("img")
                monstro.setAttribute("src", "assets/sprite/monstro-direita.gif")
                monstro.className = "monstro"
                monstro.dataset.monstro = contadorMonstro
                divCelula.appendChild(monstro)
                contadorMonstro++
            }
            else if (i === "E") {
                divCelula.className = "caminho"
                divCelula.dataset.coluna = contadorColuna

                let monstro = document.createElement("img")
                monstro.setAttribute("src", "assets/sprite/monstro-esquerda.gif")
                monstro.className = "monstro"
                monstro.dataset.monstro = contadorMonstro
                divCelula.appendChild(monstro)
                contadorMonstro++
            }
            else if (i === "P") {
                divCelula.className = "caminho"
                divCelula.dataset.coluna = contadorColuna

                let pocao = document.createElement("div")
                pocao.className = "pocao"
                pocao.dataset.pocao = contadorPocao
                divCelula.appendChild(pocao)
                contadorPocao++
            }
            else if ("123456".includes(i)) {
                divCelula.className = "caminho"
                divCelula.dataset.coluna = contadorColuna

                let gema = document.createElement("img")

                if (i === "1") { gema.setAttribute("src", "assets/sprite/gema-amarela.png") }
                else if (i === "2") { gema.setAttribute("src", "assets/sprite/gema-azul.png") }
                else if (i === "3") { gema.setAttribute("src", "assets/sprite/gema-laranja.png") }
                else if (i === "4") { gema.setAttribute("src", "assets/sprite/gema-roxa.png") }
                else if (i === "5") { gema.setAttribute("src", "assets/sprite/gema-verde.png") }
                else if (i === "6") { gema.setAttribute("src", "assets/sprite/gema-vermelha.png") }

                gema.className = "gema"
                gema.dataset.gema = contadorGema
                divCelula.appendChild(gema)
                contadorGema++
            }
            else if (i === "S") {
                divCelula.id = "inicio"
                let boneco = document.createElement("div")
                let bonecoImagem = document.createElement("img")
                bonecoImagem.setAttribute("src", "assets/sprite/sprite-all.png")
                bonecoImagem.id = "boneco-sprites"
                bonecoImagem.className = "pixelart boneco-baixo"
                boneco.appendChild(bonecoImagem)
                boneco.id = "boneco"
                divCelula.appendChild(boneco)
            }
            else if (i === "F") {
                divCelula.id = "fim"
                divCelula.className = "invalido"
            }
            else {
                divCelula.className = "parede"
            }

            contadorColuna++
            i = divCelula
            divLinha.appendChild(i)
        }).join("")
        tela.appendChild(divLinha)
        contadorLinha++
        contadorColuna = 0
    })
}







let saudeBoneco = 100;
let gemasColetadas = 0;



const mover = (event) => {
    let direcao = event.key
    let boneco = document.querySelector("#boneco")
    let bonecoImagem = document.querySelector("#boneco-sprites")

    // Mover para esquerda e para direita
    moveDireita(direcao, boneco, bonecoImagem)
    moveEsquerda(direcao, boneco, bonecoImagem)

    // Mover para cima e para baixo
    let linha = boneco.parentElement.getAttribute("data-linha")
    let coluna = boneco.parentElement.getAttribute("data-coluna")

    moveCima(direcao, boneco, bonecoImagem, linha, coluna)
    moveBaixo(direcao, boneco, bonecoImagem, linha, coluna)
}

const moveDireita = (direcao, boneco, bonecoImagem) => {
    let caminhoFrente = boneco.parentElement.nextElementSibling
    let caminhoFrenteValido = caminhoFrente.className
    let caminhoFrenteFilho = caminhoFrente.lastElementChild;

    let fimId = caminhoFrente.id
    let fim = document.querySelector("#fim")

    if ((direcao === "ArrowRight") && caminhoFrenteValido === "caminho") {
        if (caminhoFrente.lastElementChild !== null) {
            if (caminhoFrente.lastElementChild.className === "monstro") {
                matouMonstro()
                caminhoFrente.removeChild(caminhoFrente.lastElementChild)
            }
            else if (caminhoFrente.lastElementChild.className === "pocao") {
                pegouPocao()
            }
            else if (caminhoFrenteFilho.className === "gema") {
                coletaGemas();
                caminhoFrente.removeChild(caminhoFrenteFilho);
            }

        }

        bonecoImagem.className = "pixelart boneco-direita"
        caminhoFrente.appendChild(boneco)
    }
    if (direcao === "ArrowRight" && caminhoFrenteValido === "parede") {
        bonecoImagem.className = "pixelart boneco-direita"
    }
    if (direcao === "ArrowRight" && fimId === "fim") {
        if (gemasColetadas === 6) {
            bonecoImagem.className = "pixelart boneco-baixo"
            fim.appendChild(boneco)
            gameOver("Você venceu!", "vitoria")
        }
    }
}
const moveEsquerda = (direcao, boneco, bonecoImagem) => {
    let caminhoTras = boneco.parentElement.previousElementSibling;
    let caminhoTrasValido = caminhoTras.className;
    let caminhoTrasFilho = caminhoTras.lastElementChild;

    let inicioId = caminhoTras.id;
    let inicio = document.querySelector("#inicio");

    if (direcao === "ArrowLeft" && caminhoTrasValido === "caminho") {
        if (caminhoTrasFilho !== null) {
            if (caminhoTrasFilho.className === "pocao") {
                pegouPocao()
            }
            else if (caminhoTrasFilho.className === "monstro") {
                matouMonstro()
                caminhoTras.removeChild(caminhoTrasFilho)
            }
            else if (caminhoTrasFilho.className === "gema") {
                coletaGemas();
                caminhoTras.removeChild(caminhoTrasFilho);
            }
        }
        bonecoImagem.className = "pixelart boneco-esquerda"
        caminhoTras.appendChild(boneco)
    }
    if (direcao === "ArrowLeft" && caminhoTrasValido === "parede") {
        bonecoImagem.className = "pixelart boneco-esquerda"
    }
    if (direcao === "ArrowLeft" && inicioId === "inicio") {
        bonecoImagem.className = "pixelart boneco-direita"
        inicio.appendChild(boneco)

    }
}
const moveCima = (direcao, boneco, bonecoImagem, linha, coluna) => {
    let linhaCima = document.querySelectorAll(`div[data-linha='${Number(linha) - 1}']`)
    let caminhoCima = linhaCima[coluna]
    let caminhoCimaFilho = caminhoCima.lastElementChild;

    if (direcao === "ArrowUp" && caminhoCima.className === "caminho") {
        if (caminhoCimaFilho !== null) {
            if (caminhoCimaFilho.className === "pocao") {
                pegouPocao()
                caminhoCima.removeChild(caminhoCimaFilho)
            }
            else if (caminhoCimaFilho.className === "gema") {
                coletaGemas();
                caminhoCima.removeChild(caminhoCimaFilho);
            }
        }
        bonecoImagem.className = "pixelart boneco-cima"
        caminhoCima.appendChild(boneco)
    }
    if (direcao === "ArrowUp" && caminhoCima.className === "parede") {
        bonecoImagem.className = "pixelart boneco-cima"
    }
}
const moveBaixo = (direcao, boneco, bonecoImagem, linha, coluna) => {
    let linhaBaixo = document.querySelectorAll(`div[data-linha='${Number(linha) + 1}']`);
    let caminhoBaixo = linhaBaixo[coluna];
    let caminhoBaixoFilho = caminhoBaixo.lastElementChild;

    if (direcao === "ArrowDown" && caminhoBaixo.className === "caminho") {
        if (caminhoBaixoFilho !== null) {
            if (caminhoBaixoFilho.className === "pocao") {
                pegouPocao();
                caminhoBaixo.removeChild(caminhoBaixoFilho);
            }
            else if (caminhoBaixoFilho.className === "gema") {
                coletaGemas();
                caminhoBaixo.removeChild(caminhoBaixoFilho);
            }
        }
        bonecoImagem.className = "pixelart boneco-baixo"
        caminhoBaixo.appendChild(boneco)
    }
    if (direcao === "ArrowDown" && caminhoBaixo.className === "parede") {
        bonecoImagem.className = "pixelart boneco-baixo"
    }
}



const pegouPocao = () => {
    saudeBoneco += 50

    let vidaAtual = document.getElementById("vida-atual")
    let valorVida = document.getElementById("valor-vida")
    valorVida.innerText = ""
    valorVida.innerText = `${saudeBoneco}`
    vidaAtual.style.height = `${saudeBoneco}px`
}

const matouMonstro = () => {
    saudeBoneco -= 25

    let vidaAtual = document.getElementById("vida-atual")
    let valorVida = document.getElementById("valor-vida")
    valorVida.innerText = ""
    valorVida.innerText = `${saudeBoneco}`
    vidaAtual.style.height = `${saudeBoneco}px`

    if (saudeBoneco === 0) {
        gameOver('Você morreu!', "morte")
        document.removeEventListener("keydown", mover, false)
    }
}

const coletaGemas = () => {
    gemasColetadas++;

    let gemas = document.getElementById("gemas-coletadas")
    gemas.innerText = ""
    gemas.innerText = `${gemasColetadas}/6`


    let fim = document.getElementById("fim")
    if (gemasColetadas === 6) {
        fim.className = "valido"
    } else {
        fim.className = "parede"
    }
}

const gameOver = (text, condicao) => {
    let modalFim = document.getElementById("modal-fim")
    let mensagem = document.getElementById("mensagem")

    mensagem.innerText = text

    if (condicao === "morte") {
        modalFim.classList.add("modal-morte")
    }
    if (condicao === "vitoria") {
        modalFim.classList.add("modal-fim")
    }

    modalFim.classList.remove("modal-fechado")
    modalFim.classList.add("modal-aberto")

    let reiniciar = document.getElementById("reiniciar")
    reiniciar.addEventListener("click", () => {
        window.location.reload()
    })
}