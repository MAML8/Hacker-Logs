var user = null;
var study = null;
var texto = '';
const LINE_BREAK = "<p> </p>";

function loadingscreen(){
    $('.menu').addClass('inactive');
    $('#loading').removeClass('inactive');
    $('.nav').addClass('inactive');
}
function proceed_to(s){
    $('#loading').addClass('inactive');
    $(s).removeClass('inactive');
    if(s!='login') $('.nav').removeClass('inactive');
}
function set_retorno(s){
    $('#return-button').data('target', s);
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
        error: () =>{
            $.alert({
                theme: 'supervan',
                title: 'Erro no login',
                content: "Erro no login, certifique-se que o nome de usuário e a senha estejam corretas"
            });
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
        error: ()=>{
            $.alert({
                theme: 'supervan',
                title: 'Erro no acesso',
                content: "Erro no acesso, certifique-se que o nome de acesso está correto e você tem a clearance necessária."
            });
            proceed_to('#logged');
        },
        success: load_study
    });
}
function log(log){
    log.texto = log.texto.replaceAll("\n", LINE_BREAK);
    $retorno = $(`<div class='hacker-console'>
        <h2>${log.display} ${log.hora}</h2>
        <p>${log.texto}</p>
    </div>`);
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
        hora: Date.now,
        texto: "<strong id='cursor'>|</strong>"
    });
    $last.addClass("editable");
    $last.append("<br><button type='button' id='send-log'>Enviar</button>");
    $('#study').append($last);
    
    proceed_to('#study');
    set_retorno('#logged');
}

function editLog(e){
    let key = e.key;
    let $cursor = $('#cursor');
    switch(key){
        case "Backspace":
            if (texto.endsWith(LINE_BREAK)){
                $del = $cursor.parent();
                $del.prev().append($cursor);
                $del.remove();
            } else {
                texto = texto.substring(0, texto.length-1);
                $aux = $cursor.parent();
                $aux.html(texto);
                $aux.append($cursor);
            }
            return;
        case "Enter":
            key = LINE_BREAK;
            break;
        default:
            if(key.length > 1){
                return;
            }
    }
    texto += key;
    $cursor.before(key);
}

function send_log(){
    $.ajax({
        type: "POST",
        url: "./PHP/log.php",
        data: {
            username: user.name,
            accessname: study.access,
            text: texto
        },
        beforeSend: loadingscreen,
        error: () =>{
            $.alert({
                theme: 'supervan',
                title: 'Erro no envio do log',
                content: "Talvez o servidor esteja offline, oh no"
            });
            proceed_to('#study');
        },
        success: () =>{
            proceed_to('#study');
        }
    });
}

$('.return-button').on('click', ()=>{
    const $this = $(this);
    const target = $this.data('target');

    loadingscreen();
    proceed_to(target);
});
$('#login-button').on('click', login);
$('#study-button').on('click', () => {access_study($('#study-input').val());});
$('.editable').on('keydown', editLog);