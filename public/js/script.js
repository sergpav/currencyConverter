jQuery.validator.addMethod("emailfull", function(value, element) {
    return this.optional(element) || /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(value);
}, "Введите валидный email адресс");
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
                emailfull: true
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