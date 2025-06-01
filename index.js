 const photos = [
      { image: 'asset/1.jpg', message: 'Happy Birthday sayang! 💖' },
      { image: 'asset/2.jpg', message: 'Semoga harimu indah terus~ ☀️' },
      { image: 'asset/3.jpg', message: 'Love you always 😘' },
    ];

    let current = 0;

    function showSecondPage() {
    const first = document.getElementById('firstPage');
    const second = document.getElementById('secondPage');

    first.classList.add('hidden');
    setTimeout(() => {
        first.style.display = 'none';
        second.style.display = 'flex';
        second.classList.remove('hidden');
        updateSlide();
        startHeartFall();
    }, 500); // waktu harus sama dengan CSS transition
    }


    function updateSlide() {
    const photoFrame = document.getElementById('photo');
    const message = document.getElementById('message');
    photoFrame.innerHTML = `<img src="${photos[current].image}" alt="photo" style="width:100%; height:100%; object-fit: cover; border-radius: 4px;" />`;
    message.innerText = photos[current].message;
    }


    function nextSlide() {
      current = (current + 1) % photos.length;
      updateSlide();
    }

    function prevSlide() {
      current = (current - 1 + photos.length) % photos.length;
      updateSlide();
    }

    function startHeartFall() {
      setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-fall';
        heart.innerText = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (3 + Math.random() * 4) + 's';

        document.getElementById('secondPage').appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 5000);
      }, 300);
    }