var idOrgao = 1

async function obterdados() {
    const resp = await fetch(`/medidas/verificarAviso/${idOrgao}`);
    const resp_dados = await resp.json();
    console.log(resp_dados)
    setTimeout(obterdados, 10000)

    var mensagem = ""



    if (resp_dados.length > 0) {
        mensagem = `<div class='aviso' style = "position : absolute; display: flex; background-color: blue;">`

        for (var i = 0; i < resp_dados.length; i++) {

            mensagem += `
            <div>
            <h1>${resp_dados[i].nome}</h1>
            <h1>${resp_dados[i].Situacao_dado}</h1>
            <h1>${resp_dados[i].Nome_atribuido}</h1>
            <h1>${resp_dados[i].Data}
            </div>`;


        }
        mensagem += "</div>"


       
    }



}

obterdados()