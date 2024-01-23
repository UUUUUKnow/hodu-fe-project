const imageList = document.querySelector(".s_contents_image_infi");
let pageToFetch = 1;
let loadingImages = false; // 이미지 로딩 중인지 여부를 나타내는 상태

const fetchImages = async (pageNum) => {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' + pageNum + '&limit=6');
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();
        console.log(datas);

        makeImageList(datas);

    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    } finally {
        loadingImages = false; // 이미지 로딩 완료 후 loading 상태 변경
    }
};

const makeImageList = (datas) => {
    datas.forEach((item) => {
        imageList.innerHTML += "<li class='li_infi'><img src=" + item.download_url + " alt='li_infinity_imgs'></li>"; // 가져온 이미지 데이터 동적 추가
    });
};

const infinityScroll = () => {
    const cardWrap = document.querySelector('.s_contents_catimgbox');
    const scrollTop = cardWrap.scrollTop; // 현재 스크롤 위치를 scrollTop에 저장
    const scrollHeight = cardWrap.scrollHeight; // 스크롤 가능한 전체 높이를 scrollHeight에 저장
    const clientHeight = cardWrap.clientHeight; // 현재 화면에 보이는 영역의 높이를 clientHeight에 저장

    console.log('scroll!'); // 스크롤 이벤트 발생 시 콘솔에 scroll! 출력
    if (scrollTop + clientHeight + 10 >= scrollHeight && !loadingImages) { //
        loadingImages = true; // 이미지 로딩 중일 때는 중복 로딩 방지
        fetchImages(pageToFetch++);
    }
};

const throttling = (callback, delay) => {
    let timer = null;

    return () => {
        if (timer === null) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay);
        }
    };
};

const LoadButton = document.querySelector(".s_contents_showmore_btn");
const CancelButton = document.querySelector(".s_contents_cancle_btn");

const ButtonContainer = document.querySelector(".s_contents_btn_wrap");
const ImgLayout = document.querySelector(".s_contents_catimgbox_infi");
const CardWrap = document.querySelector(".s_contents_catimgbox");
const TextLayout = document.querySelector(".s_contents_showmore_txt");

LoadButton.addEventListener('click', () => {
    ImgLayout.style.display = 'block';
    CardWrap.style.overflowY = "auto";
    CardWrap.style.overflowX = "hidden";
    LoadButton.style.display = "none";
    CancelButton.style.display = "block";
    TextLayout.style.display = "none";

    CardWrap.addEventListener('scroll', throttling(infinityScroll, 1000));
    pageToFetch = 2;
});

CancelButton.addEventListener('click', () => {
    ImgLayout.style.display = 'none';
    CardWrap.style.overflow = "";
    LoadButton.style.display = "block";
    CancelButton.style.display = "none";
    TextLayout.style.display = "block";

    CardWrap.removeEventListener('scroll', throttling(infinityScroll, 1000));

    pageToFetch = 1;
    imageList.innerHTML = "";
});

// 최초 한 번 이미지 로딩
fetchImages(1);