
document.addEventListener('DOMContentLoaded', ()=>{
    updatePosts();
}) // para executar a função assim que a pagina atualizar.

function updatePosts(){
    fetch("http://localhost:3000/api/all") // usando o /api/all pra pode pegar as informações do get
    .then(res => res.json())// Aqui pegamos a informação da API, mas como array.
    .then(res => {    
    
        let postElements =""

        let posts = JSON.parse(res)// Aqui tranformamos o array em objeto, assim podendo fazer um loop. 

        posts.forEach(post => {


            let postElement = `    

            <div class="card" id=${post.id}>
                <div class ="card-header">
                    <h5 class="card-title">${post.title}</h5>
                </div>
                <div class ="card-body">
                    <h5 class="card-text">${post.description}</h5>
                </div>
                <div class="btn">
                    <button class="close" onclick = "deletePosts('${post.id}')">Excluir</button>
                
                    <button class="edit" onclick = "openModal('${post.id}')">Editar</button>
                </div>
            </div>
            `

            postElements += postElement
        }); // Conectando as informações da API com o HTML. Coloquei o objeto na variavel posts, e dps fiz o loop para fazer o card

        document.getElementById("posts").innerHTML = postElements


        if( postElements === "" ){
            document.getElementById("posts").innerHTML = `Nenhum aviso no Mural`
        }
    })

}


function newPost(){
    let title = document.getElementById("title").value
    let description = document.getElementById("desc").value

    let post = {title, description}

    const options = {
                    method: "POST",
                    headers: new Headers({"content-type": "application/json"}),
                    body: JSON.stringify(post)
                    }
    
    if(title !== '' || description !== ''){               
        fetch('http://localhost:3000/api/new', options).then(res => {

            updatePosts();
            document.getElementById("title").value=""
            document.getElementById("desc").value=""
        })
    }
}

function deletePosts(id) {

    const options = {
        method: "DELETE",
        headers: {"content-type": "application/json"}
        }
    
    fetch(`http://localHost:3000/api/delete/${id}`, options).then(res => {
        updatePosts()
    })
}


function openModal(id){
    let modalcontet = 
    `
    <div class="modal">
        <div class="content">
            <h3>Editar</h3>

            <input type="text" id="editTitle" autocomplete="off" placeholder="Editar Texto">
            <input type="text" id="editDesc" autocomplete="off" placeholder="Editar Descrição">
            <button onclick= "editPost('${id}')" > Salvar </button>         
            </div>
        </div>

    </div> 
    `
    document.querySelector(`#posts`).innerHTML += modalcontet


    const modal = document.querySelector(".modal")
    const actualStyle=modal.style.display

    if(actualStyle === "block"){
        modal.style.display="none"
    }else{
        modal.style.display="block"
    }

    
}

function closeModal(){
    const modal = document.querySelector(".modal")
    const actualStyle=modal.style.display

    if(actualStyle === "block"){
        modal.style.display="none"
    }

}


window.onclick = function(event){
    const modal = document.querySelector(".modal")
    if(event.target == modal){
        closeModal()
    }
}


function editPost(id){

    const editTitle = document.querySelector(`#editTitle`)
    const editDesc = document.querySelector(`#editDesc`)

    const options = {
        method: "PATCH",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
                title: editTitle.value ,
                description: editDesc.value
            })
    }


    if(editTitle.value !== '' || editDesc.value !== ''){
        fetch(`http://localHost:3000/api/edit/${id}`, options).then(res => {
            updatePosts()
            openModal()
        
        })
    }else{
        closeModal()
    }
}
