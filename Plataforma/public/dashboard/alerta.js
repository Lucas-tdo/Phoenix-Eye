var idOrgao = 1
alerta.style.display=`none`

async function obterdados() {
    const resp = await fetch(`/medidas/verificarAviso/${idOrgao}`);
    const resp_dados = await resp.json();
    console.log(resp_dados)
    setTimeout(obterdados, 10000)

    var mensagem = ""

    if (resp_dados.length > 0) {
        mensagem = ``
        alerta.style.display=`block`
        for (var i = 0; i < resp_dados.length; i++) {
            mensagem += `
             <div id="${resp_dados[i].Data}">
                <div>
                    <img src="Assets/Icons/alerta.png" alt="">
                    <img src="Assets/Icons/Recusado.png" onclick="limpar_notificacao('${resp_dados[i].Data}')" id="sair" alt="">
                </div>
                <h1>${resp_dados[i].nome}</h1>
                <h1>${resp_dados[i].Situacao_dado}</h1>
                <h1>${resp_dados[i].Nome_Atribuido}</h1>
                <h1>${resp_dados[i].Data}</h1>
            </div>
            `;
        }
        alerta.innerHTML+=mensagem
       
    }
}

     function limpar_notificacao(id){
    var div = document.getElementById(`${id}`)
    div.remove()
    if(alerta.innerHTML == ``){
        alerta.style.display=`none`
    }
}

    obterdados()