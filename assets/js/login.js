$(function () {
    $('#link_reg').on('click', function () {
        $('.login').hide().siblings('.reg').show();
    })
    $('#link_login').on('click', function () {
        $('.login').show().siblings('.reg').hide();
    })
    // 校验
    let form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })
    let layer = layui.layer
    // 发送ajax
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                if (res.staus !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                $('#link_login').click();
            }
        })
    })
    // 发送ajax
    $('#form_login').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.staus !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                localStorage.setItem('token2', res.token)
                location.href = '/02/index.html'
            }
        })
    })
})