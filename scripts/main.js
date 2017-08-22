$(document).ready(function() {
    $("[data-fancybox]").fancybox({
        animationEffect: 'zoom',
        animationDuration: 366,
    });
    $(".masters .items").owlCarousel({

        items: 3,
        nav: false,

        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            768: {
                items: 2,
                nav: true,
            },
            769: {
                items: 3,
                nav: false,
            }


        }
    });
    $('.special .list .item .name').matchHeight();


    $('a.to_modal').click(function() {
        var formname = $(this).attr("data-form");
        $('#zakaz .title span').text(formname);
        $('#zakaz #usl').val(formname);
    });

    $('a.top_usl_to_modal').click(function() {
        var formname = $(this).attr("data-form");
        $('#top_usl .title span').text(formname);
        $('#top_usl #usl2').val(formname);
    });

    $('.masters .items .item').click(function() {
        var formname = $(this).attr("data-form");
        console.log(formname);
        $('#consult .title span').text(formname);
        $('#consult #usl3').val(formname);
    });


    function placeholder_text() {
        if ($(window).width() <= '700') {
            $('input[type=text].name').each(function() {
                $(this).attr("placeholder", "Ваше имя");
            });
            $('input[type=text].tel').each(function() {
                $(this).attr("placeholder", "Ваш телефон");
            });
        } else {
            $('input[type=text].name').each(function() {
                $(this).attr("placeholder", "Введите Ваше имя");
            });
            $('input[type=text].tel').each(function() {
                $(this).attr("placeholder", "Введите Ваш телефон");
            });
        }
    }
    placeholder_text();
    $(window).resize(function() {
        placeholder_text();
    });
});









$('form').each(function() {
    // Объявляем переменные (форма и кнопка отправки)
    var form = $(this),
        btn = form.find('input[type=submit]');

    // Добавляем каждому проверяемому полю, указание что поле пустое
    form.find('input[type=text]').addClass('empty_field');
    form.find('input[type=checkbox]').parents('.rules').addClass('empty_fieldi');

    // Функция проверки полей формы
    function checkInput() {
        form.find('input[type=text]').each(function() {
            if ($(this).val() != '') {
                // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');
            } else {
                // Если поле пустое добавляем класс-указание
                $(this).addClass('empty_field');
            }
        });
		}
			
    function shake() {
				var checkbox = form.find("input:checkbox:checked");
				// console.log(checkbox.length);
				if(checkbox.length == 0){
					$(this).parents('.rules').addClass('empty_fieldi');
				}else{
					$(this).parents('.rules').removeClass('empty_fieldi');
				}
		}


    // Функция подсветки незаполненных полей
    function lightEmpty() {
        form.find('.empty_field').css({
            'border-color': '#ef6509'
        });
        // Через полсекунды удаляем подсветку
        setTimeout(function() {
            form.find('.empty_field').removeAttr('style');
				}, 1500);

				var checkbox = form.find("input:checkbox:checked");
				// console.log(checkbox.length);
				if(!checkbox.length) {form.find('.empty_fieldi').addClass('shake');}
				
        
        // Через полсекунды удаляем подсветку
        setTimeout(function() {
            form.find('.empty_fieldi').removeClass('shake');
				}, 500);
					



		}
			


			


    // Проверка в режиме реального времени
    setInterval(function() {
        // Запускаем функцию проверки полей на заполненность
				checkInput();
				shake();
        // Считаем к-во незаполненных полей
        var sizeEmpty = form.find('.empty_field').size();
        var sizeEmpty2 = form.find('.empty_field').size();
        // Вешаем условие-тригер на кнопку отправки формы
        if (sizeEmpty > 0) {
            if (btn.hasClass('disabled')) {
                return false
            } else {
                btn.addClass('disabled')
            }
        } else {
            btn.removeClass('disabled')
        }
    }, 500);

    // Событие клика по кнопке отправить
    btn.click(function() {
				event.preventDefault();

        if ($(this).hasClass('disabled')) {
            // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
						lightEmpty();

            return false
        } else {
            // Все хорошо, все заполнено, отправляем форму
            // form.submit();
						
					var form_data = form.serialize(); //собераем все данные из формы
            $.ajax({
							type: "POST", //Метод отправки
							url: "send.php", //путь до php фаила отправителя
							data: form_data,
							success: function() {
										//код в этом блоке выполняется при успешной отправке сообщения
										// alert("Ваше сообщение отпрвлено!");
										$.fancybox.open('<div class="message"><h2>Hello!</h2><p>You are awesome!</p></div>');
							}
						});
				}
    });
});