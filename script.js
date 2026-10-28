document.addEventListener('DOMContentLoaded', function() {

    // --- Welcome gate ---
    const loveGate = document.getElementById('love-gate');
    const loveYouButton = document.getElementById('love-you-button');
    const hateYouButton = document.getElementById('hate-you-button');
    const loveGateMessage = document.getElementById('love-gate-message');
    const loveGateCard = document.querySelector('.love-gate-card');
    const kissGate = document.getElementById('kiss-gate');
    const kissButton = document.getElementById('kiss-button');
    const kissMaybeButton = document.getElementById('kiss-maybe-button');
    const kissGateMessage = document.getElementById('kiss-gate-message');

    if (loveGate && loveGateCard) {
        loveGate.addEventListener('pointermove', (event) => {
            if (event.pointerType === 'touch') return;

            const tiltX = ((event.clientY / window.innerHeight) - 0.5) * -8;
            const tiltY = ((event.clientX / window.innerWidth) - 0.5) * 8;
            loveGateCard.style.setProperty('--gate-tilt-x', `${tiltX}deg`);
            loveGateCard.style.setProperty('--gate-tilt-y', `${tiltY}deg`);
        });

        loveGate.addEventListener('pointerleave', () => {
            loveGateCard.style.setProperty('--gate-tilt-x', '0deg');
            loveGateCard.style.setProperty('--gate-tilt-y', '0deg');
        });
    }

    if (loveGate && loveYouButton && hateYouButton && loveGateMessage) {
        loveYouButton.addEventListener('click', () => {
            createFlowerBurst();
            loveGate.classList.add('is-hidden');
            if (kissGate) kissGate.classList.remove('is-hidden');
            startMusic();
        });

        const moveHateButton = (cursorX, cursorY) => {
            const edgePadding = 24;
            const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            hateYouButton.style.position = 'fixed';
            hateYouButton.style.right = 'auto';
            hateYouButton.style.bottom = 'auto';
            hateYouButton.style.boxSizing = 'border-box';
            hateYouButton.style.maxWidth = `${Math.max(0, viewportWidth - edgePadding * 2)}px`;

            const buttonWidth = hateYouButton.offsetWidth;
            const buttonHeight = hateYouButton.offsetHeight;
            const maxLeft = Math.max(edgePadding, viewportWidth - buttonWidth - edgePadding);
            const maxTop = Math.max(edgePadding, viewportHeight - buttonHeight - edgePadding);
            let randomLeft = edgePadding;
            let randomTop = edgePadding;

            for (let attempt = 0; attempt < 20; attempt++) {
                randomLeft = edgePadding + Math.random() * Math.max(0, maxLeft - edgePadding);
                randomTop = edgePadding + Math.random() * Math.max(0, maxTop - edgePadding);
                const newCenterX = randomLeft + buttonWidth / 2;
                const newCenterY = randomTop + buttonHeight / 2;
                const isAwayFromCursor = cursorX === undefined ||
                    Math.hypot(newCenterX - cursorX, newCenterY - cursorY) > 180;

                if (isAwayFromCursor) break;
            }

            hateYouButton.style.left = `${Math.max(edgePadding, Math.min(Math.round(randomLeft), maxLeft))}px`;
            hateYouButton.style.top = `${Math.max(edgePadding, Math.min(Math.round(randomTop), maxTop))}px`;
            hateYouButton.style.zIndex = '120';
            hateYouButton.style.transform = 'none';

            const renderedBounds = hateYouButton.getBoundingClientRect();
            const correctedLeft = Math.max(edgePadding, Math.min(
                parseFloat(hateYouButton.style.left) + (edgePadding - renderedBounds.left),
                viewportWidth - renderedBounds.width - edgePadding
            ));
            const correctedTop = Math.max(edgePadding, Math.min(
                parseFloat(hateYouButton.style.top) + (edgePadding - renderedBounds.top),
                viewportHeight - renderedBounds.height - edgePadding
            ));
            hateYouButton.style.left = `${Math.round(correctedLeft)}px`;
            hateYouButton.style.top = `${Math.round(correctedTop)}px`;
        };

        let lastEscapeTime = 0;
        document.addEventListener('mousemove', (event) => {
            if (loveGate.classList.contains('is-hidden') || Date.now() - lastEscapeTime < 250) return;

            const buttonBounds = hateYouButton.getBoundingClientRect();
            const buttonCenterX = buttonBounds.left + buttonBounds.width / 2;
            const buttonCenterY = buttonBounds.top + buttonBounds.height / 2;
            const cursorDistance = Math.hypot(event.clientX - buttonCenterX, event.clientY - buttonCenterY);
            const escapeDistance = 180;

            if (cursorDistance < escapeDistance) {
                lastEscapeTime = Date.now();
                moveHateButton(event.clientX, event.clientY);
            }
        });

        hateYouButton.addEventListener('click', () => {
            loveGateMessage.textContent = 'That button is not available today. Try Love You Too!';
            hateYouButton.textContent = 'Still Hate You';
        });
    }

    if (kissGate && kissButton && kissMaybeButton && kissGateMessage) {
        const moveDobbeyButton = (cursorX, cursorY) => {
            const edgePadding = 24;
            const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            kissMaybeButton.style.position = 'fixed';
            kissMaybeButton.style.right = 'auto';
            kissMaybeButton.style.bottom = 'auto';
            kissMaybeButton.style.boxSizing = 'border-box';
            kissMaybeButton.style.maxWidth = `${Math.max(0, viewportWidth - edgePadding * 2)}px`;

            const buttonWidth = kissMaybeButton.offsetWidth;
            const buttonHeight = kissMaybeButton.offsetHeight;
            const maxLeft = Math.max(edgePadding, viewportWidth - buttonWidth - edgePadding);
            const maxTop = Math.max(edgePadding, viewportHeight - buttonHeight - edgePadding);
            let randomLeft = edgePadding;
            let randomTop = edgePadding;

            for (let attempt = 0; attempt < 20; attempt++) {
                randomLeft = edgePadding + Math.random() * Math.max(0, maxLeft - edgePadding);
                randomTop = edgePadding + Math.random() * Math.max(0, maxTop - edgePadding);
                const newCenterX = randomLeft + buttonWidth / 2;
                const newCenterY = randomTop + buttonHeight / 2;

                if (!cursorX || Math.hypot(newCenterX - cursorX, newCenterY - cursorY) > 180) break;
            }

            kissMaybeButton.style.left = `${Math.max(edgePadding, Math.min(Math.round(randomLeft), maxLeft))}px`;
            kissMaybeButton.style.top = `${Math.max(edgePadding, Math.min(Math.round(randomTop), maxTop))}px`;
            kissMaybeButton.style.zIndex = '120';
            kissMaybeButton.style.transform = 'none';

            const renderedBounds = kissMaybeButton.getBoundingClientRect();
            const correctedLeft = Math.max(edgePadding, Math.min(
                parseFloat(kissMaybeButton.style.left) + (edgePadding - renderedBounds.left),
                viewportWidth - renderedBounds.width - edgePadding
            ));
            const correctedTop = Math.max(edgePadding, Math.min(
                parseFloat(kissMaybeButton.style.top) + (edgePadding - renderedBounds.top),
                viewportHeight - renderedBounds.height - edgePadding
            ));
            kissMaybeButton.style.left = `${Math.round(correctedLeft)}px`;
            kissMaybeButton.style.top = `${Math.round(correctedTop)}px`;
        };

        let lastDobbeyEscapeTime = 0;
        document.addEventListener('mousemove', (event) => {
            if (kissGate.classList.contains('is-hidden') || Date.now() - lastDobbeyEscapeTime < 250) return;

            const buttonBounds = kissMaybeButton.getBoundingClientRect();
            const buttonCenterX = buttonBounds.left + buttonBounds.width / 2;
            const buttonCenterY = buttonBounds.top + buttonBounds.height / 2;
            const cursorDistance = Math.hypot(event.clientX - buttonCenterX, event.clientY - buttonCenterY);

            if (cursorDistance < 180) {
                lastDobbeyEscapeTime = Date.now();
                moveDobbeyButton(event.clientX, event.clientY);
            }
        });

        kissButton.addEventListener('click', () => {
            createFlowerBurst();
            kissGate.classList.add('is-hidden');
            document.body.classList.remove('gate-active');
        });

        kissMaybeButton.addEventListener('click', () => {
            kissGateMessage.textContent = 'Hmm ante yes ani artham cheskunna... Dobbey press cheyyi!';
            kissMaybeButton.textContent = 'Okay Hmm';
        });
    }

    // --- Birthday Countdown ---
    const birthdayDate = new Date('2026-10-29T00:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const remaining = birthdayDate.getTime() - Date.now();

        if (remaining <= 0) {
            countdownElement.textContent = 'Happy Birthday!';
            return;
        }

        const totalSeconds = Math.floor(remaining / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m <br> ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Birthday Melody ---
    const musicToggle = document.getElementById('music-toggle');
    const musicToggleLabel = document.getElementById('music-toggle-label');
    const siteMusic = document.getElementById('site-music');
    let audioContext;
    let melodyTimeout;
    let melodyPlaying = false;

    const melody = [
        [261.63, 0.25],
        [261.63, 0.25],
        [293.66, 0.5],
        [261.63, 0.5],
        [349.23, 0.5],
        [329.63, 1],
        [261.63, 0.25],
        [261.63, 0.25],
        [293.66, 0.5],
        [261.63, 0.5],
        [392.00, 0.5],
        [349.23, 1]
    ];

    function playMelody() {
        if (!melodyPlaying) return;
        const noteDuration = melody[0][1];
        const [frequency, duration] = melody.shift();
        melody.push([frequency, duration]);
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration - 0.03);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
        melodyTimeout = setTimeout(playMelody, noteDuration * 1000);
    }

    function startMusic() {
        if (!siteMusic) return;

        siteMusic.play().catch(() => {
            musicToggleLabel.textContent = 'Play music';
        });
        melodyPlaying = true;
        musicToggleLabel.textContent = 'Pause music';
        musicToggle.setAttribute('aria-pressed', 'true');
        musicToggle.setAttribute('aria-label', 'Pause birthday music');
        playMelody();
    }

    if (musicToggle && musicToggleLabel) {
        musicToggle.addEventListener('click', () => {
            if (melodyPlaying) {
                melodyPlaying = false;
                if (siteMusic) siteMusic.pause();
                musicToggleLabel.textContent = 'Play music';
                musicToggle.setAttribute('aria-pressed', 'false');
                musicToggle.setAttribute('aria-label', 'Play birthday music');
                return;
            }

            startMusic();
        });
    }

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Initialize LightGallery ---
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        download: false
    });

    // --- Snow burst on photo click ---
    function createSnowBurst(event) {
        const burstCount = 18;

        for (let index = 0; index < burstCount; index++) {
            const snowflake = document.createElement('span');
            const angle = (Math.PI * 2 * index) / burstCount;
            const distance = 35 + Math.random() * 70;
            snowflake.className = 'snowflake-burst';
            snowflake.style.left = `${event.clientX}px`;
            snowflake.style.top = `${event.clientY}px`;
            snowflake.style.setProperty('--snow-x', `${Math.cos(angle) * distance}px`);
            snowflake.style.setProperty('--snow-y', `${Math.sin(angle) * distance}px`);
            document.body.appendChild(snowflake);
            snowflake.addEventListener('animationend', () => snowflake.remove(), { once: true });
        }
    }

    function createFlowerBurst() {
        const flowerColors = ['#ff6f91', '#ff9f1c', '#ffd166', '#72ddf7', '#c77dff', '#80ed99'];

        for (let index = 0; index < 36; index++) {
            const flower = document.createElement('span');
            flower.className = 'flower-burst';
            flower.textContent = '✿';
            flower.style.left = `${Math.random() * 100}vw`;
            flower.style.top = `${-10 - Math.random() * 30}vh`;
            flower.style.setProperty('--flower-color', flowerColors[index % flowerColors.length]);
            flower.style.setProperty('--flower-size', `${1 + Math.random() * 1.2}rem`);
            flower.style.setProperty('--flower-drift', `${(Math.random() - 0.5) * 30}vw`);
            flower.style.setProperty('--flower-rotation', `${360 + Math.random() * 720}deg`);
            flower.style.animationDelay = `${Math.random() * 450}ms`;
            document.body.appendChild(flower);
            flower.addEventListener('animationend', () => flower.remove(), { once: true });
        }
    }

    document.querySelectorAll('#lightgallery a, .hall-of-fame-card').forEach((photo) => {
        photo.addEventListener('click', createSnowBurst);
    });

    // --- Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap);

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // --- Video Uploader ---
    const videoUploadInput = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoUploadLabel = document.getElementById('video-upload-label');

    if (videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });

        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }


    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let petals = [];
        let canvasWidth = 0;
        let canvasHeight = 0;
        let frameId = 0;
        let lastFrameTime = 0;
        const frameInterval = 1000 / 30;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resizeCanvas() {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = Math.round(canvasWidth * pixelRatio);
            canvas.height = Math.round(canvasHeight * pixelRatio);
            canvas.style.width = `${canvasWidth}px`;
            canvas.style.height = `${canvasHeight}px`;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            createPetals();
            if (reducedMotion) drawPetals();
        }

        function Petal() {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight * 2 - canvasHeight;
            this.w = 16 + Math.random() * 12;
            this.h = 13 + Math.random() * 9;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 0.8 + Math.random() * 1.2;
            this.ySpeed = 0.6 + Math.random() * 0.8;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvasHeight || this.x > canvasWidth) {
                this.x = -this.w;
                this.y = Math.random() * canvasHeight * 2 - canvasHeight;
                this.xSpeed = 0.8 + Math.random() * 1.2;
                this.ySpeed = 0.6 + Math.random() * 0.8;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            const isSmallScreen = window.innerWidth < 768;
            const petalCount = isSmallScreen
                ? Math.min(14, Math.max(8, Math.round(canvasWidth / 30)))
                : Math.min(28, Math.max(16, Math.round(canvasWidth / 48)));
            for (let i = 0; i < petalCount; i++) {
                petals.push(new Petal());
            }
        }

        function drawPetals() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            petals.forEach(petal => {
                petal.update();
            });
        }

        function animate(timestamp) {
            frameId = 0;
            if (document.hidden || document.body.classList.contains('gate-active')) return;
            if (timestamp - lastFrameTime < frameInterval) {
                frameId = requestAnimationFrame(animate);
                return;
            }

            lastFrameTime = timestamp;
            drawPetals();
            if (!reducedMotion) frameId = requestAnimationFrame(animate);
        }

        function syncAnimation() {
            if (document.hidden || document.body.classList.contains('gate-active') || reducedMotion) {
                if (frameId) cancelAnimationFrame(frameId);
                frameId = 0;
                return;
            }

            lastFrameTime = 0;
            if (!frameId) frameId = requestAnimationFrame(animate);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        document.addEventListener('visibilitychange', syncAnimation);
        new MutationObserver(syncAnimation).observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        syncAnimation();
    }
});