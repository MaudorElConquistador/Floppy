document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems);
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});