// Random background-image
var images = [
    '01.jpg'
];
$('div.content').css({'background-image': 'url(static/img/background/' + images[Math.floor(Math.random() * images.length)] + ')' });