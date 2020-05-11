window.onunload = function () {
  window.scrollTo(0, 0);
}

if (window.innerWidth > 1200) {
        const threshold = .6; // trigger
        const options = {
                root: null,
                rootMargin: '0px',
                threshold: threshold
        };
        const observer = new IntersectionObserver(animHandler, options);
        const targets = document.querySelectorAll(".main-container > *");
        const ar = [].slice.call(targets); 
        let animations = [];


        let count = 0;

        for (let target of ar) {
                animations[count] = new gsap.timeline({paused:true});  
                observer.observe(target);
                count++;
        }

        // timeline for each section
        animations[0]
                //  Background
                .from('.header svg #gradient', {duration: 1.5, ease:"back.out(1)", y: "-200%", delay: .25})
                // Navbar
                .from('.header__navbar', {duration: 1, ease:"back.out(1)", opacity: 0, y: "-5%", x: "-5%"}, "-=1.25")
                // Header Text Content
                .from('.header__content > div > h1', {duration: 1, ease:"back.out(1)", opacity: 0, x: "-100px"})
                .from('.header__content > div > p', {duration: 1, ease:"back.out(1)", opacity: 0, x: "100px"}, "<")
                .from('.header__content > div > div', {duration: 1, ease:"back.out(1)", opacity: 0, y: "100px"}, "<")
                // SVG Icons
                .from('.header #Layer_2 g[id^="object"]', {duration: .75, ease:"back.out(1)", transformOrigin: '50%, 50%', opacity: 0, scale: 0, stagger:{ each: 0.1, from: 'center' }}, "-=.25")
                // SVG Icons
                .to('.header #Layer_2 #wrapper', {duration: 3.5, ease:"power0", y: -20, repeat: -1, yoyo: true}, "+=.25");

        animations[1]
                .from('.featured-box--1', {duration: 1, opacity: 0});

        animations[2]
                .from('.features-1 .card-small', {duration: .5, opacity: 0, scale: .9, stagger: {each:.2, from: "start"}});

        animations[3]
                .from('.features-2 .card-large__wrapper', {duration: 1, ease:"back", opacity: 0, y: "50%", stagger: {each:.2, from: "start"}});

        animations[4]
                .from('.card-plans__wrapper:first-child', {duration: .75, ease:"power", opacity: 0, x: -200})
                .from('.card-plans__wrapper:nth-child(2)', {duration: .75, ease:"power", opacity: 0, y: -100}, "<")
                .from('.card-plans__wrapper:last-child', {duration: .75, ease:"power", opacity: 0, x: 200}, "<")

        animations[5]
                .from('.featured-box--2', {duration: 0, opacity: 1});

        animations[6]
                .from('.special-needs__box', {duration: 1, opacity: 0, ease: 'back', x: "-50%", stagger: .25});


        // observer handler
        function animHandler(targets, observer) {
                for (var entry of targets) {
                if (entry.intersectionRatio > 0) {
                let i = ar.indexOf(entry.target);
                animations[i].play();
                } else {
                return;
                }
                }
        }
}