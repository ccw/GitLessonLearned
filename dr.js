$(function() {
		$.deck('.slide');

        positioning();

        $(window).bind("resize", positioning);
	});

    function positioning() {
        var x = $(window).width() / 2;
        var y = $(window).height() / 2;

        $(".hcenter").each(function() {
            $(this).css('left', (x - $(this).width() / 2) + 'px');
        });
        $(".below-to").each(function() {
            var ref = $(this).attr("below-ref");
            if (ref) {
                var refObj = $(this).parent().find(ref);
                $(this).css('top', (refObj.position().top + refObj.height() + 10) + 'px');
            }
        });
        $(".ahead-to").each(function() {
            var ref = $(this).attr("ahead-ref");
            if (ref) {
                var refObj = $(this).parent().find(ref);
                $(this).css('left', (refObj.position().left - $(this).width() - 10) + 'px');
            }
        });
        $(".after-to").each(function() {
            var ref = $(this).attr("after-ref");
            if (ref) {
                var refObj = $(this).parent().find(ref);
                $(this).css('left', (refObj.position().left + refObj.width() + 10) + 'px');
            }
        });

//        var cvsPos = toPosition($('div.cvs').css('position', 'absolute').css('left', (x - 250) + 'px'));
//        var teamPos = toPosition($('div.team').css('position', 'absolute').css('left', (x + 120) + 'px'));
//        var gitIPMPos = toPosition($('div.git-ipm').css('position', 'absolute').css('left', (x + 70) + 'px').css("top", (cvsPos.bottom - 50) + "px"));
//        var gitIPMDevPos = toPosition($('div.git-ipm-branch-dev').css('position', 'absolute').css('left', teamPos.left + 'px').css("top", (gitIPMPos.bottom + 10) + "px"));
//        var gitIPMRTsaiPos = toPosition($('div.git-ipm-branch-rtsai').css('position', 'absolute').css('left', teamPos.left + 'px').css("top", (gitIPMDevPos.bottom + 25) + "px"));
//
//        $('div.team-speech').css('position', 'absolute').css('left', (teamPos.left + 100) + 'px').css("top", (teamPos.top + 25) + "px");
//        $('div.clone-arrow-container').css('position', 'absolute').css('top', (cvsPos.bottom - 20) + 'px').css("marginLeft", "-30px");
//        $('div.git-ipm-branch-kchen').css('position', 'absolute').css('left', (gitIPMRTsaiPos.left - 90) + 'px').css("top", (gitIPMDevPos.bottom + 25) + "px");
//        $('div.git-ipm-branch-shhuang').css('position', 'absolute').css('left', (gitIPMRTsaiPos.left + 20) + 'px').css("top", (gitIPMDevPos.bottom + 25) + "px");
    }

    function toPosition(obj) {
        return {'left': obj.position().left,
                'top': obj.position().top,
                'right': obj.position().left + obj.width(),
                'bottom': obj.position().top + obj.height(),
                'height': obj.height(),
                'width': obj.width()};
    }