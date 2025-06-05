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
        let imagem = ""
        
        for (var i = 0; i < resp_dados.length; i++) {
            if(resp_dados[i].Situacao_dado=="Alerta"){
            imagem="Assets/Icons/alerta.png"
            }
            else if(resp_dados[i].Situacao_dado=="Perigo"){
                imagem="Assets/Icons/perigo.png"
            }
            else{
                imagem="Assets/grid_img/fogo.png"
            }
            mensagem += `
             <div id="${resp_dados[i].Data}">
                <div>
                    <img src="${imagem}" alt="">
                    <img src="Assets/Icons/Recusado.png" onclick="limpar_notificacao('${resp_dados[i].Data}')" id="sair" alt="">
                </div>
                <h1>Sensor:${resp_dados[i].nome}</h1>
                <h1>Situação:${resp_dados[i].Situacao_dado}</h1>
                <h1>Área:${resp_dados[i].Nome_Atribuido}</h1>
                <h1>Horário:${resp_dados[i].Data}</h1>
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