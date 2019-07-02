$(document).ready(function(){ 
    $(".login-form").validate({
        rules: {
            register_name: {
                required: true,
                minlength: 6,
                maxlength: 32
            },
            register_email: {
                required: true,
                email: true
            },
            register_password: {
                required: true,
                minlength: 6,
            },
            register_password_confirm: {
                equalTo: "#login_password"
            }
        },
        messages:{
            register_name:{
                required: "Это поле обязательно для заполнения",
                minlength: "Минимальное число символов - 6",
                maxlength: "Максимальное число символов - 32",
            },
            register_email:{
                required: "Это поле обязательно для заполнения",
                email: "Введите валидный email адресс",
            },
            register_password:{
                required: "Это поле обязательно для заполнения",
                minlength: "Минимальное число символов - 6",
            },
            register_password_confirm: {
                equalTo: "Пароли не совпадают"
            }
        }
    });
});