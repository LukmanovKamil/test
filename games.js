// Подключение к базе данных
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.90.1/+esm';
const supabaseUrl = 'https://zfzjdjxcktzvpeekihod.supabase.co';
const supabaseKey = 'sb_publishable_03qTtgBceL4u5vS_vCE9Cw_GEBdNdy4';
const supabase = createClient(supabaseUrl, supabaseKey);
const games = window.games;


// Создание айди для всех чекбоксов
const checkBoxesId = document.querySelectorAll('.checkbox');

checkBoxesId.forEach((cb, index) => {
    cb.id = `id-${index + 1}`;
});


// Загрузка чекбоксов с базы данных
const { data } = await supabase.from(games).select('*');
const check = new Map(data.map(item => [item.id, item.checkbox]));
checkBoxesId.forEach(cb => {
    const id = Number(cb.id.split('-')[1]);
    const checked = check.get(id);
    cb.classList.toggle('checked', !!checked);
});

updatePercents();
visibility();
sto()

// Сохранение чекбокса в базу данных
async function saveData(cb) {
    const id = Number(cb.id.split('-')[1]);
    const value = cb.classList.contains('checked');

    await supabase
        .from(games)
        .upsert({ id, checkbox: value }, { onConflict: ['id'] });
}


// Подсчет процентов
function updatePercents() {

    const globalPercent = document.querySelector('.global-percent');
    if (!globalPercent) return;

    const checkboxesGlobal = document.querySelectorAll('.checkbox').length;
    const checkedGlobal = document.querySelectorAll('.checkbox.checked').length;

    globalPercent.textContent = ((checkedGlobal / checkboxesGlobal) * 100).toFixed(2) + '%';

    document.querySelectorAll('.card').forEach(card => {

        const cardPercent = card.querySelector('.card-percent');
        if (!cardPercent) return;

        const checkboxesСard = card.querySelectorAll('.checkbox').length;
        const checkedСard = card.querySelectorAll('.checkbox.checked').length;

        cardPercent.textContent = ((checkedСard / checkboxesСard) * 100).toFixed(2) + '%';
    });

    document.querySelectorAll('.block').forEach(block => {

        const blockPercent = block.querySelector('.block-percent');
        if (!blockPercent) return;

        const checkboxesBlock = block.querySelectorAll('.checkbox').length;
        const checkedBlock = block.querySelectorAll('.checkbox.checked').length;

        blockPercent.textContent = ((checkedBlock / checkboxesBlock) * 100).toFixed(2) + '%';
    });
}


// Автоскрытие блоков если чекбоксы все вкл
function visibility(checkbox = null) {

    const updateContainer = container => {
        const content = container.querySelector('.block-content, .card-content');
        if (!content) return;

        const checkboxes = container.querySelectorAll('.checkbox');
        const allChecked = [...checkboxes].every(cb => cb.classList.contains('checked'));

        if (container.classList.contains('block')) {

            if (container.querySelector('.block-header') && allChecked) {
                content.classList.add('hidden');
            } else {
                content.classList.remove('hidden');
            }
        } else {
            content.classList.toggle('hidden', allChecked);
        }
    };

    if (!checkbox) {
        document.querySelectorAll('.block, .card').forEach(updateContainer);
        return;
    }


    const block = checkbox.closest('.block');
    if (block) updateContainer(block);

    const card = checkbox.closest('.card');
    if (card) updateContainer(card);
}



// Обработчик чекбоксов
document.addEventListener('click', e => {
    const checkbox = e.target.closest('.checkbox');
    if (!checkbox) return;
    checkbox.classList.toggle('checked');

    updatePercents();
    visibility(checkbox);
    sto()
    saveData(checkbox);
});

function sto() {

    document.querySelectorAll('.block').forEach(block => {

        const blockHeader = block.querySelector('.block-header');
        if (!blockHeader) return;

        const blockTitle = block.querySelector('.block-title');
        const blockPercent = block.querySelector('.block-percent');

        const checkboxes = block.querySelectorAll('.checkbox');
        const allChecked = [...checkboxes].every(cb => cb.classList.contains('checked'));

        if (allChecked) {
            blockHeader.classList.add('sto');
            blockTitle.classList.add('sto');
            blockPercent.classList.add('sto');
        } else {
            blockHeader.classList.remove('sto');
            blockTitle.classList.remove('sto');
            blockPercent.classList.remove('sto');
        }
    });

    document.querySelectorAll('.card').forEach(card => {

        const cardkHeader = card.querySelector('.card-header');

        const cardTitle = card.querySelector('.card-title');
        const cardPercent = card.querySelector('.card-percent');

        const checkboxes = card.querySelectorAll('.checkbox');
        const allChecked = [...checkboxes].every(cb => cb.classList.contains('checked'));

        if (allChecked) {
            cardkHeader.classList.add('sto');
            cardTitle.classList.add('sto');
            cardPercent.classList.add('sto');
        } else {
            cardkHeader.classList.remove('sto');
            cardTitle.classList.remove('sto');
            cardPercent.classList.remove('sto');
        }
    });
}

// Сворачивание карточек
document.querySelectorAll('.card-header').forEach(el => {
    el.addEventListener('click', () => {
        el.nextElementSibling.classList.toggle('hidden');
    });
});

// Сворачивание блоков
document.querySelectorAll('.block-header').forEach(el => {
    el.addEventListener('click', () => {
        el.nextElementSibling.classList.toggle('hidden');
    });
});

// Переключание страниц
const buttons = document.querySelectorAll('.btn');
const contents = document.querySelectorAll('.page');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        contents.forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.page).classList.add('active');
    });
});













































// fullscreen
const fullscreen = document.querySelector('.fullscreen');
const fsWrap = fullscreen.querySelector('.fs-wrap');
const fsMap = fsWrap.querySelector('.fs-map');
const fsImg = fsMap.querySelector('.fs-img');
const fsMarker = fsMap.querySelector('.fs-marker');
const fsLineX = fsMap.querySelector('.fs-lineX');
const fsLineY = fsMap.querySelector('.fs-lineY');

const fsPopup = fullscreen.querySelector('.fs-popup');
const fsPopupimg = fullscreen.querySelector('.fs-popupimg');
const fsCheckbox = fullscreen.querySelector('.fs-checkbox');
const fsText = fullscreen.querySelector('.fs-text');
const fsCb = fullscreen.querySelector('.fs-cb');

document.querySelectorAll('.img').forEach(img => {


    

    


    img.addEventListener('click', () => {
    const checkbox = img.closest('.item').querySelector('.checkbox');
    fsPopup._checkbox = checkbox;
        fsCheckbox.classList.toggle(
            'checked',
            checkbox.classList.contains('checked')
        );
        fullscreen.style.display = 'flex'
        fsImg.src = img.dataset.popup;
        fsMap.style.cursor = "grab";

        const mX = img.getAttribute('markerX');
        const mY = img.getAttribute('markerY');
        const icon = img.dataset.icon;
        fsPopupimg.src = img.src;
        const text = img.previousElementSibling.textContent;

        fsMarker.src = icon;
        fsText.textContent = text;
        fsMarker.style.left = mX;
        fsMarker.style.bottom = mY;
        fsLineX.style.left = mX;
        fsLineY.style.bottom = mY;
        fsPopup.style.display = 'block';
    });
});

fsMarker.addEventListener('click', () => {
    if (fsPopup.style.display === 'block') {
        fsPopup.style.display = 'none';
    } else {
        fsPopup.style.display = 'block';
    }
});

fsPopupimg.addEventListener('click', () => {
    fsPopup.style.display = 'none';
});



// Клик по чекбоксу в попапе
fsCb.addEventListener('click', () => {
    const checkbox = fsPopup._checkbox;
    if (!checkbox) return;

    
    checkbox.classList.toggle('checked');

    fsCheckbox.classList.toggle(
        'checked',
        checkbox.classList.contains('checked')
    );

    fullscreen.style.display = 'none';

    updatePercents();
    visibility(checkbox);
    sto();
    saveData(checkbox);
});



fullscreen.addEventListener('click', e => {
    if (e.target === fullscreen) {
        closeFullscreen();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

function closeFullscreen() {
    fullscreen.style.display = 'none';
    resetTransform();
}



























let scale = 1;
let posX = 0;
let posY = 0;
let dragging = false;
let startX = 0;
let startY = 0;

fsMap.addEventListener('wheel', e => {
    e.preventDefault();

    const zoomSpeed = 0.3;
    const parent = fsMap.parentElement; // .fs-wrap

    // координаты мыши относительно контейнера
    const rect = parent.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const prevScale = scale;
    const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    scale = Math.min(Math.max(scale + delta, 1), 5);

    // смещаем карту так, чтобы точка под курсором оставалась на месте
    posX -= (offsetX - posX) * (scale / prevScale - 1);
    posY -= (offsetY - posY) * (scale / prevScale - 1);

    limitPosition();
    updateTransform();
});

function updateTransform() {
    fsMap.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

function limitPosition() {
    const parent = fsMap.parentElement; // .fs-wrap

    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;

    const mapWidth = fsMap.offsetWidth * scale;
    const mapHeight = fsMap.offsetHeight * scale;

    // если карта меньше контейнера — центрируем
    const minX = Math.min(parentWidth - mapWidth, 0);
    const minY = Math.min(parentHeight - mapHeight, 0);

    posX = Math.max(Math.min(posX, 0), minX);
    posY = Math.max(Math.min(posY, 0), minY);
}




fsMap.addEventListener('mousedown', e => {
    if (scale === 1) return;

    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;

    fsMap.style.cursor = "grabbing";

    e.preventDefault();
});

document.addEventListener('mousemove', e => {
    if (!dragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    limitPosition();
    updateTransform();
});

const stopDragging = () => {
    if (!dragging) return;
    dragging = false;
    fsMap.style.cursor = "grab";
};

document.addEventListener('mouseup', stopDragging);
document.addEventListener('mouseleave', stopDragging);

function resetTransform() {
    // сбрасываем все переменные
    scale = 1;
    posX = 0;
    posY = 0;
    dragging = false;
    startX = 0;
    startY = 0;

    // сброс визуальной трансформации
    fsMap.style.transform = "translate(0px, 0px) scale(1)";
}


















const map = document.querySelector('.map');

let mapscale = 1;
let mapposX = 0;
let mapposY = 0;
let mapdragging = false;
let mapstartX = 0;
let mapstartY = 0;

map.addEventListener('wheel', e => {
    e.preventDefault();

    const zoomSpeed = 0.3;
    const parent = map.parentElement;

    // координаты мыши относительно контейнера
    const rect = parent.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const prevScale = mapscale;
    const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    mapscale = Math.min(Math.max(mapscale + delta, 1), 5);

    // смещаем карту так, чтобы точка под курсором оставалась на месте
    mapposX -= (offsetX - mapposX) * (mapscale / prevScale - 1);
    mapposY -= (offsetY - mapposY) * (mapscale / prevScale - 1);

    maplimitPosition();
    mapupdateTransform();
});

function mapupdateTransform() {
    map.style.transform = `translate(${mapposX}px, ${mapposY}px) scale(${mapscale})`;
}

function maplimitPosition() {
    const parent = map.parentElement;

    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;

    const mapWidth = map.offsetWidth * mapscale;
    const mapHeight = map.offsetHeight * mapscale;

    // если карта меньше контейнера — центрируем
    const minX = Math.min(parentWidth - mapWidth, 0);
    const minY = Math.min(parentHeight - mapHeight, 0);

    mapposX = Math.max(Math.min(mapposX, 0), minX);
    mapposY = Math.max(Math.min(mapposY, 0), minY);
}




map.addEventListener('mousedown', e => {
    if (mapscale === 1) return;

    mapdragging = true;
    mapstartX = e.clientX - mapposX;
    mapstartY = e.clientY - mapposY;

    map.style.cursor = "grabbing";

    e.preventDefault();
});

document.addEventListener('mousemove', e => {
    if (!mapdragging) return;

    mapposX = e.clientX - mapstartX;
    mapposY = e.clientY - mapstartY;

    maplimitPosition();
    mapupdateTransform();
});

const mapstopDragging = () => {
    if (!mapdragging) return;
    mapdragging = false;
    map.style.cursor = "grab";
};

document.addEventListener('mouseup', mapstopDragging);
document.addEventListener('mouseleave', mapstopDragging);

function mapresetTransform() {
    // сбрасываем все переменные
    mapscale = 1;
    mapposX = 0;
    mapposY = 0;
    mapdragging = false;
    mapstartX = 0;
    mapstartY = 0;

    // сброс визуальной трансформации
    map.style.transform = "translate(0px, 0px) mapscale(1)";
}





































































const mapPopup = document.querySelector('.map-popup');
const mapPopupImg = mapPopup.querySelector('.map-popupimg');
const mapCheckbox = mapPopup.querySelector('.map-checkbox');
const mapCb = mapPopup.querySelector('.map-cb');

document.querySelectorAll('.map-item').forEach(mapItem => {
    const mapImg = mapItem.querySelector('.map-img');
    const x = mapImg.getAttribute('markerX');
    const y = mapImg.getAttribute('markerY');

    mapItem.style.left = x;
    mapItem.style.bottom = y;
});

document.querySelectorAll('.map-img').forEach(mapImg => {
    mapImg.addEventListener('click', () => {
        const checkbox = mapImg.closest('.map-item').querySelector('.checkbox');

        // Клик на тот же маркер
        if (mapPopup._checkbox === checkbox) {
            mapPopup.style.display = mapPopup.style.display === 'block' ? 'none' : 'block';
            return;
        }

        // Клик на другой маркер
        mapPopupImg.src = mapImg.dataset.popup;
        mapPopup._checkbox = checkbox;

        mapCheckbox.classList.toggle(
            'checked',
            checkbox.classList.contains('checked')
        );

        mapPopup.style.display = 'block';
    });
});

// Клик по чекбоксу в попапе
mapCb.addEventListener('click', () => {
    const checkbox = mapPopup._checkbox;
    if (!checkbox) return;

    // переключаем состояние
    checkbox.classList.toggle('checked');

    // синхронизируем попап
    mapCheckbox.classList.toggle(
        'checked',
        checkbox.classList.contains('checked')
    );

    mapPopup.style.display = 'none';
    updatePercents();
    visibility(checkbox);
    sto();
    saveData(checkbox);
});

// Клик на картинку в попапе закрывает его
mapPopupImg.addEventListener('click', () => {
    mapPopup.style.display = 'none';
});

document.addEventListener('click', (e) => {
    // Если клик **не на попапе и не на маркере**, закрываем
    if (
        !mapPopup.contains(e.target) && 
        !e.target.classList.contains('map-img')
    ) {
        mapPopup.style.display = 'none';
        mapPopup._checkbox = null;
    }
});
;

