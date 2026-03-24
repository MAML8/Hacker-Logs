$('#create-user').on('click', ()=>{
    $.confirm({
        theme: 'supervan',
        title: 'Criar Usuário',
        content: `
            <form>
                <input name='user' type='text' placeholder='username'>
                <input name='display' type='text' placeholder='Nome/Apelido'>
                <input name='senha' type='password' placeholder='********'>
                <input name='confirma senha' type='password' placeholder='confirmar ********'>
                <input name='clearance' type='number' value=0>
            </form>
        `,
        buttons:{
            cancel:{
                text: 'Cancelar',
                action: () => {}
            },
            formSubmit:{
                text: 'Criar',
                btnClass: 'btn-green',
                action: function (){
                    const user = {
                        username: this.$content.find('input[name="user"]').val(),
                        displayname: this.$content.find('input[name="display"]').val(),
                        password: this.$content.find('input[name="senha"]').val(),
                        clearance: this.$content.find('input[name="clearance"]').val(),
                    };
                    if(user.password != this.$content.find('input[name="confirma senha"]').val()){
                        $.alert({
                            theme: 'supervan',
                            title: 'Senhas diferentes entregues'
                        });
                    } else {
                        create_user(user);
                    }
                }
            }
        }
    });
});

function create_user(user){
    loadingscreen();
    $.ajax({
        type: 'POST',
        url: './PHP/user.php',
        data: user,
        error: (_, status, msg) =>{
            errito('Erro na criação de usuário', status, msg);
            proceed_to('#loggedin');
        },
        success: () =>{
            $.alert({
                theme: 'supervan',
                title: 'Usuário criado com sucesso!'
            });
            proceed_to('#loggedin');
        }
    });
}

$('#create-study').on('click', () =>{
    $.confirm({
        theme: 'supervan',
        title: 'Criar Estudo',
        content: `
            <form>
                <input name='access' type='text' placeholder='nome de acesso'>
                <input name='display' type='text' placeholder='Nome'>
                <label for='clearance'>Clearance para acesso:</label><input name='clearance' type='number' value=0>
            </form>
        `,
        buttons:{
            cancel:{
                text: 'Cancelar',
                action: () => {}
            },
            formSubmit:{
                text: 'Criar',
                btnClass: 'btn-green',
                action: function(){
                    const study = {
                        access: this.$content.find('input[name="access"]').val(),
                        display: this.$content.find('input[name="display"]').val(),
                        clearance: this.$content.find('input[name="clearance"]').val(),
                    };
                    create_study(study);
                }
            }
        }
    });
});

function create_study(study){
    loadingscreen();
    $.ajax({
        type: 'POST',
        url: './PHP/study.php',
        data: study,
        error: (_, status, msg) =>{
            errito('Erro na criação de estudo.', status, msg);
            proceed_to('#loggedin');
        },
        success: () =>{
            $.alert({
                theme: 'supervan',
                title: 'Estudo criado com sucesso!'
            });
            proceed_to('#loggedin');
        }
    });
}