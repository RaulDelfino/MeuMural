module.exports = {
    posts : [

    ],

    getAll(){
        return this.posts;
    },

    newPost(title, description){
        // Empurrando novo post no array. com o Push({chaves do objeto})
        this.posts.push({id:gerarId(),title,description})
    },
    deletePost(id){
        // feito para deletar da api, usando o 
        this.posts = this.posts.filter(post => post.id !== id)

    },
    editPost(id, newtitle, newdescription){

        const post = this.posts.findIndex(post => post.id === id)

        if(post !== -1){
            this.posts[post].title  =  newtitle
            this.posts[post].description = newdescription
            return true
        }
        return false


    }

    
    
}


function gerarId(){
    return Math.random().toString(36).substring(2,9);
}