const DISHES = [
    {
        id: 1,
        images: [
            'img/1_0.png',
            'img/1_1.png',
            'img/1_2.png',
            'img/1_3.png',
            'img/1_4.png',
            'img/1_5.png',
            'img/1_6.png',
            'img/1_7.png',
            'img/1_8.png',
            'img/1_9.png',
            'img/1_10.png',
            'img/1_11.png',
            'img/1_12.png',
            'img/1_13.png',
            'img/1_14.png',
            'img/1_15.png',
            'img/1_16.png',
            'img/1_17.png',
            'img/1_18.png'
        ]
    },
    {
        id: 2,
        images: [
            'img/2_0.png',
            'img/2_1.png',
            'img/2_2.png',
            'img/2_3.png',
            'img/2_4.png',
            'img/2_5.png',
            'img/2_6.png',
            'img/2_7.png',
            'img/2_8.png',
            'img/2_9.png',
            'img/2_10.png',
            'img/2_11.png',
            'img/2_12.png',
            'img/2_13.png',
            'img/2_14.png',
            'img/2_15.png',
            'img/2_16.png',
            'img/2_17.png'
        ]
    }
];
const FORWARD = 0;
const BACKWARD = 1;
let app = {
    mouseXPosition: null,
    container: document.querySelector("body"),
    dishId: 1,
    dishes: DISHES,
    curMiniImgIndex: 0,
    direction: FORWARD,
    setDishId(dishId) {
        let newDish = this.dishes.find(dish => dish.id === dishId);
        if (newDish) {
            this.dishId = dishId;
            this.renderAnimatedImage(newDish.images[0]);
            this.renderNotSelectedDishes();
        }
    },
    //функция рендерит большую картинку
    renderImage(imageUrl) {
        let bigImg = document.getElementById('dishImg');
        bigImg.setAttribute('src', imageUrl);
    },
    renderMiniImg(imageUrl) {
        let miniImg = document.getElementById('dishImg');
        miniImg.setAttribute('src', imageUrl);
    },
    //функция рендерит анимацию большой картинки с задержкой и удаляет атрибут hide и show
    renderAnimatedImage(imageUrl) {
        let bigImg = document.getElementById('dishImg');
        bigImg.classList.add('hide')
        setTimeout(() => {
            bigImg.classList.remove('hide')
            bigImg.setAttribute('src', imageUrl);
            setTimeout(() => {
                bigImg.classList.remove('show')
            }, 500)
            bigImg.classList.add('show');
        },500)

    },
    handleMouseMove(e) {
        let selectedDish = this.dishes.find(dish => {
            return dish.id === app.dishId;
        });
        const imagesCount = selectedDish.images.length;
        let screenPartWidth = window.innerWidth / imagesCount;
        this.mouseXPosition = e.pageX;
        let currentPart = parseInt(this.mouseXPosition / screenPartWidth);
        this.renderImage(selectedDish.images[currentPart]);
    },
    init() {
        this.setDishId(this.dishId);
        this.renderNotSelectedDishes()
        this.container.addEventListener("mousemove", (e) => {
            app.handleMouseMove(e);
        });
        // this.renderAnimetedMiniDishes()
        setInterval(() => {
            if (this.direction === FORWARD) {
                if (this.curMiniImgIndex < this.dishes[1].images.length) {
                    document.getElementById('blockImgMini').setAttribute('src', this.dishes[1].images[this.curMiniImgIndex])
                    this.curMiniImgIndex++
                } else {
                    this.curMiniImgIndex--;
                    this.direction = BACKWARD
                }
            } else if (this.direction === BACKWARD) {
                if (this.curMiniImgIndex >= 0) {
                    document.getElementById('blockImgMini').setAttribute('src', this.dishes[1].images[this.curMiniImgIndex])
                    this.curMiniImgIndex--
                } else {
                    this.curMiniImgIndex++;
                    this.direction = FORWARD
                }
            }
        }, 70)

    },
    renderNotSelectedDishes() {
        document.getElementById('blockImgMini').innerHTML = '';
        let notSelectedDishes = this.dishes.filter(dish => dish.id !== this.dishId);
        // console.log(notSelectedDishes)
        notSelectedDishes.forEach(dish => {
            let miniImg = document.createElement('img');
            miniImg.setAttribute('src', dish.images[0]);
            miniImg.classList.add('selectDishImg');
            miniImg.setAttribute('data-id', dish.id)
            miniImg.addEventListener('click', e => {
                app.setDishId(parseInt(e.target.getAttribute('data-id')))
            });
            document.getElementById('blockImgMini').append(miniImg)
        })
    },
    // renderAnimetedMiniDishes() {
    //     let notSelectedDishes = this.dishes.filter(dish => dish.id !== this.dishId);
    //     notSelectedDishes.forEach(dish => {
    //
    //         for(let i = 0; i < dish.images.length; i++){
    //             setTimeout(function(){
    //                 document.getElementById('test').innerHTML = '';
    //                 let miniImg = document.createElement('img');
    //                 miniImg.setAttribute('src', dish.images[i]);
    //                 miniImg.classList.add('Images');
    //                 miniImg.setAttribute('data-id', dish.id)
    //                 document.getElementById('test').append(miniImg)
    //             },i * 100)
    //         }
    //     })
    // }

};

app.init();
