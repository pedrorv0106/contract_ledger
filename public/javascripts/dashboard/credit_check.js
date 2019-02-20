function slider(scoreVal) {
    var red = "#ff6261";
    var orange = "#ff893c";
    var yellow = "#ffd127";
    var blue = "#0294fa";
    var green = "#3eda91";

    var arc = 180;
    var arcWidth = 200;
    var arcCenter = 250;
    var strokeWidth = 12;
    var circleRadius = 12;
    var min = 0;
    var max = 850;
    var range = max - min;
    var span1 = 250;
    var span2 = 420;
    var span3 = 490;
    var span4 = 600;
    var score = scoreVal;
    var scoreColor;
    var margin = 3;
    var scoreText = "";
    var container = document.getElementById('slider_content').offsetWidth;
    var height = container * 0.52;
    var svg = document.getElementById('semi_circle');
    var status_text = document.getElementById('status');
    var score_text = document.getElementById('score');
    status_text.style.fontSize = container * 0.2;
    score_text.style.fontSize = container * 0.05;
    arcWidth = container * 0.9 / 2;
    arcCenter = container / 2;
    svg.setAttribute('width', container);
    svg.setAttribute('height', height);

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x, y, radius, startAngle, endAngle) {

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    function moveCircle(x, y, radius, endAngle, color) {
        var start = polarToCartesian(x, y, radius, endAngle);

        if (endAngle >= 0 || endAngle <= 180) {
            circle.setAttribute("cx", start.x);
            circle.setAttribute("cy", start.y);
            circle.setAttribute("r", circleRadius);
            circle.setAttribute("stroke", color);
            circle.setAttribute("stroke-width", strokeWidth);

            textScore.innerHTML = scoreText;
            textStatus.innerHTML = scoreVal;
        } else {
            circle.style.display = "none";
        }

    }

    if (score < span1) {
        scoreColor = red;
        scoreText = "Low";
    } else if (score >= span1 && score < span2) {
        scoreColor = orange;
        scoreText = "Bad";
    } else if (score >= span2 && score < span3) {
        scoreColor = yellow;
        scoreText = "Average";
    } else if (score >= span3 && score < span4) {
        scoreColor = blue;
        scoreText = "Good";
    } else if (score >= span4 && score <= max) {
        scoreColor = green;
        scoreText = "High";
    }


    function filterRange(r) {

        r = r - min;
        r = Math.round(r / range * 180);
        return r;

    }

    function alterArc(arc, color, start, end) {

        arc.setAttribute("d", describeArc(arcCenter, height, arcWidth, start, end));
        arc.setAttribute("stroke", color);
        arc.setAttribute("stroke-width", strokeWidth);

    }

    span1 = filterRange(span1);
    span2 = filterRange(span2);
    span3 = filterRange(span3);
    span4 = filterRange(span4);
    max = filterRange(max);
    score = filterRange(score);

    range1S = margin;
    range1E = span1 - margin;
    range2S = span1 + margin;
    range2E = span2 - margin;
    range3S = span2 + margin;
    range3E = span3 - margin;
    range4S = span3 + margin;
    range4E = span4 - margin;
    range5S = span4 + margin;
    range5E = max - margin;

    // var arc0 = document.getElementById("arc0");
    var arc1 = document.getElementById("arc1");
    var arc2 = document.getElementById("arc2");
    var arc3 = document.getElementById("arc3");
    var arc4 = document.getElementById("arc4");
    var arc5 = document.getElementById("arc5");
    var circle = document.getElementById("circle");
    var textScore = document.getElementById("score");
    var textStatus = document.getElementById("status");
    moveCircle(arcCenter, height, arcWidth, score, scoreColor);

    // alterArc(arc0, "black", 0, 180)
    alterArc(arc1, red, range1S, range1E);
    alterArc(arc2, orange, range2S, range2E);
    alterArc(arc3, yellow, range3S, range3E);
    alterArc(arc4, blue, range4S, range4E);
    alterArc(arc5, green, range5S, range5E)

};

$(document).ready(function () {

    var val = 375;

    slider(val);

    document.getElementById("number").addEventListener('change', function () {
        var val = document.getElementById("number").value;
        slider(val);
    });

});


window.addEventListener('resize', function(event){
    var val = 375;
    slider(val);
});