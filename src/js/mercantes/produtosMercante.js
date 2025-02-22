async function configurarUrl() {
    const location = window.location.hostname;
    

    switch (location) {
        case "www.buyge.com.br":
            var url = "https://129.148.45.5:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
        case "127.0.0.1":
            var url = "https://localhost:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
    }
}

function retornarUrl() {
    return sessionStorage.getItem("fetchUrl");
}

function mascaraPreco(preco) {
    var valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

function adicionarConfirmacao(conteudo, botoesMontados) {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");
    const mensagem = document.querySelector(".mensagem");

    mensagem.innerText = conteudo;

    const botoes = document.querySelector("#botoes");

    botoesMontados.forEach((botao) => {
        botoes.appendChild(botao);
    });

    fundoMensagem.className = "mostrar-popup";
}

function recarregarPagina() {
    window.location.reload();
}

function removerConfirmacao() {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");

    fundoMensagem.className = "esconder-popup";
}

function montarAlerta(conteudo) {
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "OK";
    botaoConfirmar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = conteudo;

    const botoes = [botaoConfirmar];

    adicionarConfirmacao(mensagem, botoes);
}

function montarAlertaRecarregar(conteudo) {
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "OK";
    botaoConfirmar.setAttribute("onclick", "recarregarPagina()");

    const mensagem = conteudo;

    const botoes = [botaoConfirmar];

    adicionarConfirmacao(mensagem, botoes);
}

async function carregarProdutos(idMercante) {
    const fetchUrl = retornarUrl();

    const response = await fetch(
        `${fetchUrl}/produtos/mercante/${idMercante}`,
        {
            method: "GET",
            mode: "cors",
        }
    );

    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function carregarImagems() {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/produtos/produto-imagem`, {
        method: "GET",
        mode: "cors",
    });

    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function carregarCategorias() {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
    });

    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function carregarMercante(idMercante) {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/mercante/${idMercante}`, {
        method: "GET",
        mode: "cors",
    });

    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function carregarFavoritos(idCliente, token) {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/favoritos/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function adicionarFavorito(idCliente, idProduto, token) {
    const fetchUrl = retornarUrl();

    const response = await fetch(
        `${fetchUrl}/favorito/adicionar/${idCliente}/${idProduto}`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );
    const status = response.status;

    switch (status) {
        case 201:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function apagarFavorito(idCliente, idProduto, token) {
    const fetchUrl = retornarUrl();

    const response = await fetch(
        `${fetchUrl}/favorito/remover/${idCliente}/${idProduto}`,
        {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    const status = response.status;

    switch (status) {
        case 200:
            var resposta = {
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                status: status,
            };

            return resposta;
    }
}

async function favoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await adicionarFavorito(idCliente, idProduto, token);

        if (resposta.status == 201) {
            montarAlertaRecarregar("Produto adiciona aos favoritos!");
        }
    }
}

async function desfavoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await apagarFavorito(idCliente, idProduto, token);

        if (resposta.status == 200) {
            montarAlertaRecarregar("Produto removido dos favoritos!");
        }
    }
}

function exibirProduto(idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
}

async function montarCartoes(idMercante) {
    const produtos = await carregarProdutos(idMercante);
    const produtoImagens = await carregarImagems();
    const categorias = await carregarCategorias();

    const mercantes = await carregarMercante(idMercante);
    const mercante = mercantes.dados;

    const container = document.querySelector(".container");

    const titulo = document.createElement("h1");
    titulo.classList.add("titulo");
    titulo.innerText = mercante.nmLoja;

    container.appendChild(titulo);

    const containerProdutos = document.createElement("div");
    containerProdutos.classList.add("produtos");

    var favoritos = [];

    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await carregarFavoritos(idCliente, token);

        if (resposta.status !== 200) {
            console.log(
                "Ocorreu um erro na coleta de produtos. STATUS: " +
                    resposta.status
            );
        }

        favoritos = resposta.dados;
    }

    produtos.dados.forEach((produto) => {
        if (produto.idDisponibilidade == 1) {
            const cartao = document.createElement("div");
            cartao.classList.add("cartao");

            const imagemFavorito = document.createElement("div");
            imagemFavorito.classList.add("imagem-favorito");
            const imagem = document.createElement("img");
            imagem.classList.add("imagem");
            imagem.setAttribute(
                "onclick",
                `exibirProduto(${produto.cdProduto})`
            );

            produtoImagens.dados.forEach((produtoImagem) => {
                if (
                    produtoImagem.fkCdProduto === produto.cdProduto &&
                    produtoImagem.idPrincipal === 1
                ) {
                    imagem.src = produtoImagem.imgProdutoLink;
                }
            });

            if (imagem.src == "") {
                imagem.src = "/src/icons/image-preto.svg";
            }

            const iconeFavorito = document.createElement("img");
            iconeFavorito.classList.add("favorito");

            if (favoritos.length > 0) {
                favoritos.forEach((favorito) => {
                    if (favorito.fkCdProduto == produto.cdProduto) {
                        iconeFavorito.src = "/src/icons/heart2-cheio.png";

                        iconeFavorito.setAttribute(
                            "onclick",
                            `desfavoritar(${produto.cdProduto})`
                        );
                    }
                });
            }

            if (iconeFavorito.src == "") {
                iconeFavorito.src = "/src/icons/heart2.png";

                iconeFavorito.setAttribute(
                    "onclick",
                    `favoritar(${produto.cdProduto})`
                );
            }

            imagemFavorito.appendChild(imagem);
            imagemFavorito.appendChild(iconeFavorito);

            const informacoes = document.createElement("div");
            informacoes.classList.add("informacoes");

            const tituloCategoriaAvaliacao = document.createElement("div");
            tituloCategoriaAvaliacao.classList.add(
                "titulo-categoria-avaliacao"
            );

            const categoriaAvaliacao = document.createElement("div");
            categoriaAvaliacao.classList.add("categoria-avaliacao");

            const categoria = document.createElement("p");

            categorias.dados.forEach((item) => {
                if (item.cdCategoria === produto.fkCdCategoria) {
                    categoria.innerText = item.nmCategoria;
                }
            });

            const avaliacao = document.createElement("div");
            avaliacao.classList.add("avaliacao");
            const iconeAvaliacao = document.createElement("img");
            iconeAvaliacao.src = "/src/icons/star-amarela.svg";
            const notaAvaliacao = document.createElement("p");
            notaAvaliacao.innerText = "4.5";

            avaliacao.appendChild(iconeAvaliacao);
            avaliacao.appendChild(notaAvaliacao);

            categoriaAvaliacao.appendChild(categoria);
            categoriaAvaliacao.appendChild(avaliacao);

            const tituloProduto = document.createElement("p");
            tituloProduto.classList.add("titulo-produto");
            tituloProduto.innerText = produto.nmProduto;

            tituloCategoriaAvaliacao.appendChild(categoriaAvaliacao);
            tituloCategoriaAvaliacao.appendChild(tituloProduto);

            const precoParcelaBotao = document.createElement("div");
            precoParcelaBotao.classList.add("preco-parcela-botao");

            const precoParcela = document.createElement("div");
            precoParcela.classList.add("preco-parcela");
            const preco = document.createElement("p");
            preco.classList.add("preco");
            preco.innerText = mascaraPreco(produto.vlProduto);

            precoParcela.appendChild(preco);

            const botao = document.createElement("button");
            botao.classList.add("comprar");
            botao.setAttribute(
                "onclick",
                `exibirProduto(${produto.cdProduto})`
            );
            botao.innerText = "VISUALIZAR";

            precoParcelaBotao.appendChild(precoParcela);
            precoParcelaBotao.appendChild(botao);

            informacoes.appendChild(tituloCategoriaAvaliacao);
            informacoes.appendChild(precoParcelaBotao);

            cartao.appendChild(imagemFavorito);
            cartao.appendChild(informacoes);

            containerProdutos.append(cartao);
            container.append(containerProdutos);
        }
    });
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    await configurarUrl();

    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    montarCartoes(idMercante);
});
