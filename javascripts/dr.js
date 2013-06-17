var slides = [
    'title',
    'sub_title',
    'topic_concepts',
    'content_concepts_1',
    'content_concepts_2',
    'topic_ipm_workflow',
    'content_workflow_1',
    'content_workflow_2',
    'content_workflow_3',
    'topic_cmds',
    'content_cmds_apply_1',
    'content_cmds_apply_2',
    'content_cmds_apply_3',
    'content_cmds_undo_1',
    'content_cmds_undo_2',
    'content_cmds_refs_1',
    'content_cmds_refs_2',
    'content_cmds_branching_1',
    'content_cmds_branching_2',
    'content_cmds_branching_3',
    'content_cmds_branching_4',
    'content_cmds_branching_5',
    'content_cmds_committing_1',
    'content_cmds_committing_2',
    'content_cmds_committing_3',
    'content_cmds_committing_4',
    'content_cmds_committing_5',
    'content_cmds_committing_6',
    'content_cmds_logging',
    'topic_references',
    'content_ref_tools',
    'content_ref_tutorials',
    'content_ref_tips',
    'fin'
];

$(function() {
    var x = 0;
    for (var slideIndex = 0; slideIndex < slides.length; slideIndex++) {
        var slide = slides[slideIndex];
        $('<section/>').attr('id', slide).addClass('slide').load(
            'views/' + slide + '.html', function(response, status, xhr) {
                if($('section.slide').length == slides.length) {
                    prepareScreen();
                }            
        }).appendTo(".deck-container");
    }    	
});

var positionTypes = [
    {name: 'halign', positioning: function(obj, ref, offset) { obj.css('left', ref.left + 'px') } },
    {name: 'valign', positioning: function(obj, ref, offset) { obj.css('top', ref.top + 'px') } },
    {name: 'above',  positioning: function(obj, ref, offset) { obj.css('top', (ref.top - obj.height() - offset) + 'px') } },
    {name: 'below',  positioning: function(obj, ref, offset) { obj.css('top', (ref.bottom + offset) + 'px') } },
    {name: 'ahead',  positioning: function(obj, ref, offset) { obj.css('left', (ref.left - obj.width() - offset) + 'px') } },
    {name: 'after',  positioning: function(obj, ref, offset) { obj.css('left', (ref.right + offset) + 'px') } }
];

function prepareScreen() {
    prepareDeck();

    $(window).bind("resize", positioning);
}

function prepareDeck() {
    $.deck('.slide');    

    $('p.deck-status').on('click', function() {
        alert('a');
        if ($('.goto-form').css('display') === 'none') {
            $.deck('showGoTo');
        } else {
            $.deck('hideGoTo');
        }
    });

    //$(document).on("deck.change", positioning);
    $(document).on("deck.init", positioning);
}

function eventing() {
    //noinspection JSCheckFunctionSignatures
    $(document).on("deck.change", function(event, from, to) {
        var obj = $.deck('getSlide', to);
        if (obj.hasClass("event-show-n-hide")) {
            var ref = getRef(obj, "event-ref", findWithinSameSection);
            var refPost = decoratesWithPosition(ref);
            obj.parent().append($('div').css('position', 'absolute'));
        }
    });
}

function positioning() {
    var x = $(window).width() / 2;
    var y = $(window).height() / 2;

    $(".hcenter").each(function() {
        $(this).css('left', (x - $(this).width() / 2) + 'px');
    });

    for (var i = 0; i < positionTypes.length; i++) {
        positioningForType(positionTypes[i]);
    }
}

function positioningForType(type) {
    $('.' + type.name + '-to').each(function() {
        var obj = $(this);        
        var ref = getRef(obj, type.name + '-ref', findWithinSameSection);
        if (ref) {
            type.positioning(obj, decoratesWithPosition(ref), getOffset(obj, type));
        }
    });
}

function getOffset(obj, type) {
    var attr = type.name + '-offset';
    return obj.attr(attr) ? parseInt(obj.attr(attr)) : obj.attr('data-offset') ? parseInt(obj.attr('data-offset')) : 10;
}

function getRef(obj, attrRef, refFinder) {
    var ref;
    if (typeof refFinder === 'function') {
        ref = refFinder(obj, obj.attr(attrRef));
    } else {
        ref = obj.find(obj.attr(attrRef));
    }
    if (!ref) return false;
    return ref;
}

function findWithinSameParent(obj, refName) {
    return obj.parent().find(refName);
}

function findWithinSameSection(obj, refName) {
    return obj.closest("section").find(refName);
}

function decoratesWithPosition(ref) {
    if (!ref || !ref.position()) return ref;
    return {'left':   ref.position().left,
            'top':    ref.position().top,
            'right':  ref.position().left + ref.width(),
            'bottom': ref.position().top + ref.height(),
            'height': ref.height(),
            'width':  ref.width()};
}