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

function errito(title, status, msg){
    $.alert({
        title: title + ' ' + status,
        theme: 'supervan',
        content: msg
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
        error: (_, status, msg) =>{
            errito('Erro no login', status, msg);
            proceed_to('#login');
        },
        success: (obj) =>{
            set_user(obj);
            proceed_to('#loggedin');
            set_retorno('#login');
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
        error: (_, status, msg) =>{
            errito('Erro no acesso ao Estudo', status, msg);
            proceed_to('#loggedin');
        },
        success: load_study
    });
}
function log(log){
    log.texto = log.texto.replaceAll("\n", LINE_BREAK);
    $retorno = $(`<div class='hacker-console'>
        <h2>${log.display} - ${log.hora}</h2>
        <p>${log.texto}</p>
    </div>`);
    if(log.texto==''){
        $retorno.childreen().last().remove();
    }
    return $retorno;
}
function load_study(logs){
    study = logs;
    logs = logs.logs;
    texto = '';
    $('#study').html(`<h1>Estudo: ${study.display}</h1>`);
    for(let i = 0; i < logs.length; i++){
        $('#study').append(log(logs[i]));
    }
    $last = log({
        display: user.display,
        hora: Date.now.toString(),
        texto: ""
    });
    $last.addClass("editable");
    $last.append("<textarea id='sent-log'> </textarea><br><button type='button' id='send-log'>Enviar</button>");
    $('#study').append($last);
    $last.find('button').on('click', send_log);
    
    proceed_to('#study');
    set_retorno('#loggedin');
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
        error: (_, status, msg) =>{
            errito('Erro no envio do log', status, msg);
            proceed_to('#study');
        },
        success: () =>{
            proceed_to('#study');
        }
    });
}

$('#return-button').on('click', ()=>{
    const $this = $(this);

    loadingscreen();
    proceed_to(retorno);
});
$('#login-button').on('click', login);
$('#study-button').on('click', () => {access_study($('#study-input').val());});