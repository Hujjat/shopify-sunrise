export default () => ({
    skip: 1,
    slider: null,
    active: 1,
    total: null,
    interval: 3000,
    autoplay: false,
    direction: 'right',
    init() {

        this.$nextTick(() => {
            this.total = this.$refs.slider.children.length;
        });

        if(this.autoplay) {
            this.play();
        }
    },
    next() {
        this.to((current, offset) => current + (offset * this.skip))
    },
    prev() {
        this.to((current, offset) => current - (offset * this.skip))
    },
    
    to(strategy) {
        let slider = this.$refs.slider
        let current = slider.scrollLeft
        let offset = slider.firstElementChild.getBoundingClientRect().width

        slider.scrollTo({ left: strategy(current, offset), behavior: 'smooth' })
    },
    play() {
        let counter = this.active;
        // run every this.interval milliseconds
        let interval = setInterval(() => {
            // check if direction is right and click next
            if(this.direction === 'right') {
                this.next();
                counter++;
            }
            // check if direction is left and click prev
            if(this.direction === 'left') {
                this.prev();
                counter--;
            }
            // check if counter is equal to total and change direction to left
            if(counter == this.total) {
                this.direction = 'left';
            }
            // check if counter is equal to 1 and change direction to right
            if (counter == this.active) {
                this.direction = 'right';
            }

        }, this.interval);

    },
    focusableWhenVisible: {
        'x-intersect:enter'() {
            this.$el.removeAttribute('tabindex')
        },
        'x-intersect:leave'() {
            this.$el.setAttribute('tabindex', '-1')
        },
    }
})