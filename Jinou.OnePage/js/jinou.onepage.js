/**
 * Created by Jinou on 11/05/2017.
 * OnePage pluging v 0.1.0
 */
$(document).ready(function(){

    let sectionList = [];
    let body = $('body');
    let valueWheel = 0;
    let navH;
    let navBackgroundColor = [];
    let changeColor;
    $.fn.onepage = function(setting){
        setting = $.extend({
            sectionColor: ["#185fee", "#303030", "#185fee"], // La couleur de vos section ( laisser vide si vous n'en voulez pas
            navBackgroundColor: ["#303030", "#185fee", "#303030"], // Les couleurs que votre menu aura si l'option "changeColor" est à true
            changeColor: true, // active le changement de couleur du menu
            anchor: [], // contient les IDs et ancres necessaire au fonctionne du pluging
            navTop: true, // prend en compte la hauteur du menu ( uniquement pour les menu horizontaux fixe )
            scrollY: true // active le scroll vertical si la hauteur du contenu dépasse celle de la section
        }, setting);

        changeColor = setting.changeColor;
        navBackgroundColor = setting.navBackgroundColor;

        $('.section').each(function(index, value){
            $(this).attr('data-anchor', setting.anchor[index]);
            $(this).attr('id', setting.anchor[index]);
            $(this).css('background-color', setting.sectionColor[index]);
            sectionList.push($(this).data('anchor'));
        });

        $('.nav > ul > li > a').each(function(index, value){
            $(this).attr('data-href', setting.anchor[index]);
        });

        navH = setting.navTop ? $('.nav').height() : 0;
        $('#onePage').css('margin-top', navH)

        var bodyH = $(window).height() - navH;
        var urlVar = getCurrentSection();

        $('.section').css('height', bodyH);
        valueWheel = sectionList.indexOf(urlVar);

        enabledScroll(sectionList[valueWheel]);
    };

    $(document).on('mousewheel', function(event) {
        if(!body.hasClass('noScroll') && scrollInDiv(event)){
            body.addClass('noScroll');
            valueWheel += - event.deltaY;
            if(valueWheel > sectionList.length - 1) valueWheel = sectionList.length - 1;
            if(valueWheel < 0) valueWheel = 0;
            enabledScroll(sectionList[valueWheel]);
            document.location.href = "#"+sectionList[valueWheel];
        }
    });
    $('.nav > ul > li').delegate('a[data-href]', 'click', function(){
        urlVar = $(this).data('href');
        valueWheel = increaseWheel(urlVar);
        enabledScroll($(this).data('href'))
    });
    function getCurrentSection(){
        if(window.location.href.split('#')[1] === undefined ){
            window.location.href = "#"+sectionList[0];
        }
        return window.location.href.split('#')[1];
    }
    function enabledScroll(section){
        var anchorScroll = $('.section[data-anchor=' + section + ']');
        body.stop().animate({scrollTop:anchorScroll.offset().top - navH}, 'slow', 'swing');
        setTimeout(function(){ body.removeClass('noScroll')}, 500);
        if(changeColor) changeColorMenu();
    }
    function increaseWheel(urlVar){
        return sectionList.indexOf(urlVar);
    }
    function changeColorMenu(){
        $('.nav').css('background-color', navBackgroundColor[valueWheel]);
    }
    function scrollInDiv(event){

        var currentSection = $('.section[data-anchor='+ sectionList[valueWheel] +']');
        var contentSection = $('.section[data-anchor='+ sectionList[valueWheel] +'] > .overflow');
        var scrollValue = contentSection.height() - currentSection.height();
        var currentScroll = currentSection.scrollTop();

        if (currentSection.height() < contentSection.height()) {
            if (currentScroll == 0 && event.deltaY == 1) return true;
            else if(currentScroll >= scrollValue && event.deltaY == -1) return true;
            else return false;
        }else {
            return true;
        }
    }
});
