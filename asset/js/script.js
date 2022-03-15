// ============== Handle toggle sideBar=================
const sideBar = document.querySelector('.sidebar');
const sideBarBtn = document.getElementById('toggle__icon');
const sliderWraper = document.getElementById('filter-wraper');
const sectionVideo = document.querySelector('.section__video-container');
const layoutModal = document.querySelector('.modal__layout');
const sidebarModal = document.querySelector('.modal__sidebar');


sideBarBtn.addEventListener('click', () => {

    if (window.innerWidth > 1312) {
        sideBar.classList.toggle('sidebar__active');
        if (sideBar.classList.contains('sidebar__active')) {
            sliderWraper.classList.add('filter-wraper-active');
            sectionVideo.classList.add('main-follow-sidebar');
        } else {
            sliderWraper.classList.remove('filter-wraper-active');
            sectionVideo.classList.remove('main-follow-sidebar');
        }

    }
    else {
        layoutModal.style.width = '100%';
        sidebarModal.style.left = '0';
    }


})




//================ Handle taskbar ========================
const taskbarItems = document.querySelectorAll('.taskbar__item-icon');
taskbarItems.forEach(item => {
    item.addEventListener('click', () => {
        taskbarItems.forEach(item => {
            item.classList.remove('active__taskbar-icon')
            item.closest('.taskbar__item').classList.remove('active__taskbar-item');
        })
        item.classList.add('active__taskbar-icon');
        item.closest('.taskbar__item').classList.add('active__taskbar-item');
    })
})

window.addEventListener('click', (e) => {
    let targetClick = e.target;
    taskbarItems.forEach(item => {
        if (item.classList.contains('active__taskbar-icon') && targetClick != item) {
            item.closest('.taskbar__item').classList.remove('active__taskbar-item');
            item.classList.remove('active__taskbar-icon')
        }
    })
})

// ================= handle active sidebar ================
const tabs = document.querySelectorAll('.menu__item-link');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active');
    })
})

// ====================Handle Filter=====================

const filters = document.querySelectorAll('.filter-option');

filters.forEach(item => {
    item.addEventListener('click', () => {
        filters.forEach(item => {
            item.classList.remove('active-btn');
        })
        item.classList.add('active-btn');
    })
})


const sliders = document.querySelector('.filters');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const startSlider = 0;
let endSlider;
let scrollAmount;


leftBtn.style.display = "none";
rightBtn.style.display = "block";


if (window.innerWidth < 576) {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    sliders.style.overflowX = "scroll";
}

rightBtn.onclick = function () {

    if (sideBar.classList.contains('sidebar__active')) {
        endSlider = sliders.scrollWidth - sliders.clientWidth;
        scrollAmount = endSlider / 4;
        handleOpacityBtn();
        sliders.scrollLeft += scrollAmount;
    }
    else {
        endSlider = sliders.scrollWidth - sliders.clientWidth;
        scrollAmount = endSlider / 4;
        handleOpacityBtn();
        sliders.scrollLeft += scrollAmount;
    }


}

leftBtn.onclick = function () {

    if (sideBar.classList.contains('sidebar__active')) {
        endSlider = sliders.scrollWidth - sliders.clientWidth;
        scrollAmount = endSlider / 4;
        sliders.scrollLeft -= scrollAmount;
        handleOpacityBtn();

    }
    else {
        endSlider = sliders.scrollWidth - sliders.clientWidth;
        scrollAmount = endSlider / 4;
        sliders.scrollLeft -= scrollAmount;
        handleOpacityBtn();
    }

}


sliders.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    sliders.scrollLeft += evt.deltaY;
    handleOpacityBtn();
});

let isDown = false;
let startX;
let scrollLeft;

sliders.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - sliders.offsetLeft;
    scrollLeft = sliders.scrollLeft;
});

sliders.addEventListener('mouseleave', () => {
    isDown = false;
});

sliders.addEventListener('mouseup', () => {
    isDown = false;
});

sliders.addEventListener('mousemove', (e) => {
    endSlider = sliders.scrollWidth - sliders.clientWidth;
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliders.offsetLeft;
    const walk = (x - startX);
    handleOpacityBtn();
    sliders.scrollLeft = scrollLeft - walk;
});

// handle show/hiden button
const handleOpacityBtn = () => {
    if (sliders.scrollLeft > 0) {
        leftBtn.style.display = "block";
    } else {
        leftBtn.style.display = "none";
    }
    if (sliders.scrollLeft < endSlider) {
        rightBtn.style.display = "block";
    } else {
        rightBtn.style.display = "none";
    }
}


// ==============Modal=================


const toggleModal = document.querySelector('.modal__toggle-icon');


toggleModal.addEventListener('click', () => {
    layoutModal.style.width = '0';
    sidebarModal.style.left = '-240px';
})

const modalSidebarLinks = document.querySelectorAll('.modal__sidebar-link');

modalSidebarLinks.forEach(item => {
    item.addEventListener('click', () => {
        modalSidebarLinks.forEach(item => {
            item.classList.remove('active')
        })
        item.classList.add('active')
    })
})


// ===================== Video Container ===========================
const keyApi = "AIzaSyAlwUS74tqqrHGFPvx-J59v_OqbnkcgAIA";
const videos_link = "https://www.googleapis.com/youtube/v3/videos?";
const channelIcon = "https://www.googleapis.com/youtube/v3/channels?";


const videoContainer = document.querySelector('.video__container');

fetch(videos_link + new URLSearchParams({
    key: keyApi,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'VN'
}))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));

const getChannelIcon = (dataItem) => {
    fetch(channelIcon + new URLSearchParams({
        key: keyApi,
        part: "snippet",
        id: dataItem.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            dataItem.channelIconThumb = data.items[0].snippet.thumbnails.default.url;
            creatVideo(dataItem);
        })
}


const creatVideo = (data) => {
    videoContainer.innerHTML += `
        <a onclick = "location.href = 'https://www.youtube.com/watch?v=${data.id}'" class="video__link">          
            <div class="video__img" style="background-image: url(${data.snippet.thumbnails.maxres.url})"></div>
            <div class="video__content">
               
                <img src="${data.channelIconThumb}" alt="" class="video__channel-img">
                <div class="video__detail">
                    <h2 class="video__content-title">${data.snippet.title}</h2>
                    <p class="video__channel-name">${data.snippet.channelTitle}</p>
                    <div class="video__history">
                        <span class="video__views">1<span class="video__views-unit"> Tr </span>lượt xem</span>
                        <span class="video__dot"></span>
                        <span class="video__time-up">1<span class="video__time-up-unit"> ngày </span>trước</span>
                    </div>
                </div>
                <div class = "video__option">
                    <i class="uil uil-ellipsis-v"></i>
                </div>
            </div>           
        </a>
    `
}

