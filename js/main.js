var user = null;
var study = null;
var retorno = '';
const LINE_BREAK = "<p> </p>";

function loadingscreen(){
    $('.menu').addClass('inactive');
    $('#loading').removeClass('inactive');
    $('.nav').addClass('inactive');
    
}
function proceed_to(s){
    $('#loading').addClass('inactive');
    $(s).removeClass('inactive');
    if(s!='#login') $('.nav').removeClass('inactive');
}
function set_retorno(s){
    retorno = s;
}

function server_error(xhr, status, error) {
    // This function handles real server errors (e.g., HTTP 500 Internal Server Error)
    console.log("AJAX error: " + xhr.responseText);
    $.alert({
        title: "ERROR",
        theme: 'hacker',
        content: '<p style="color: red;">An unexpected server error occurred.</p>'
    });
}

function errito(title, msg){
    $.alert({
        title: title,
        theme: 'hacker',
        content: '<p>' + msg + '</p>'
    });
}

function login(){
    $.ajax({
        type: "POST",
        url: "./PHP/login.php",
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        dataType: 'json',
        beforeSend: loadingscreen,
        error: (_, __, ___) =>{
            server_error(_, __, ___);
            proceed_to('#login');
        },
        success: (obj) =>{
            if(obj.status == 'error'){
                errito('Falha no login', obj.msg);
                proceed_to('#login');
            } else {
                set_user(obj.msg);
                proceed_to('#loggedin');
                set_retorno('#login');
            }
        }
    });
}

function set_user(obj){
    user = obj;
    if(user.clearance >= 3){
        $('.admin').removeClass('inactive');
    } else {
        $('.admin').addClass('inactive');
    }
}

function access_study(accessname){
    $.ajax({
        type: 'GET',
        url: './PHP/study.php',
        data: {
            clearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICK: user.clearance,
            access: accessname
        },
        dataType: 'json',
        beforeSend: loadingscreen,
        error: (_, __, ___) =>{
            server_error(_, __, ___);
            proceed_to('#loggedin');
        },
        success: (obj) =>{
            if(obj.status == 'error'){
                errito('Erro no acesso ao status', obj.msg)
                proceed_to('#loggedin');
            } else {
                study = obj.msg;
                load_study(obj.msg.logs);
                proceed_to('#study');
                set_retorno('#loggedin');
            }
        }
    });
}
function log(log){
    log.texto = log.texto.replaceAll("\n", LINE_BREAK);
    let $retorno = $(`<div class='hacker-console'>
        <h2>${log.display} - ${log.hora}</h2>
        <p>${log.texto}</p>
    </div>`);
    if(log.texto==''){
        $retorno.children().last().remove();
    }
    return $retorno;
}
function load_study(logs){
    $('#study').html(`<h1>Estudo: ${study.display}</h1>`);
    for(let i = 0; i < logs.length; i++){
        $('#study').append(log(logs[i]));
    }
    $last = log({
        display: user.display,
        hora: Date.now().toString(),
        texto: ""
    });
    $last.addClass("editable");
    $last.append("<textarea id='sent-log'></textarea><br><button type='button'>Enviar</button>");
    $('#study').append($last);
    $last.find('button').on('click', send_log);
}

function send_log(){
    $.ajax({
        type: "POST",
        url: "./PHP/log.php",
        data: {
            username: user.name,
            accessname: study.access,
            text: $('#sent-log').val()
        },
        beforeSend: loadingscreen,
        error: (_, __, ___) =>{
            server_error(_, __, ___);
            proceed_to('#study');
        },
        success: (obj) =>{
            if(obj.status == 'error'){
                errito("Erro ao enviar registro", obj.msg);
                proceed_to('#study');
            } else {
                access_study(study.access);
            }
        }
    });
}

$('#return-button').on('click', ()=>{
    const $this = $(this);

    loadingscreen();
    proceed_to(retorno);
    if(retorno=='#loggedin') set_retorno('#login');
});
$('#login-button').on('click', login);
$('#study-button').on('click', () => {access_study($('#study-input').val());});