import '../assets/styles/styles_videos.css'
import { useEffect } from 'react';

function Videos (){

   useEffect(() => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const video = card.querySelector('video');
      const img = card.querySelector('img');

      card.addEventListener('mouseenter', () =>{
        img.style.opacity = 0;
        video.style.opacity = 1;
        video.play();
      })

      card.addEventListener('mouseleave', () =>{
        video.pause();
        video.currentTime = 0;
        video.style.opacity = 0;
        img.style.opacity = 1;
      })
      
 let isPlaying = false;

    card.addEventListener('touchstart', () => {
      if (!isPlaying) {
        img.style.opacity = 0;
        video.style.opacity = 1;
        video.currentTime = 0;
        video.play();
        isPlaying = true;
      } else {
        video.pause();
        video.currentTime = 0;
        video.style.opacity = 0;
        img.style.opacity = 1;
        isPlaying = false;
      }
    });
      
    });
  }, []);
  return(
    <>
     <section className="section-videos">
          <article className="card">
            <div className="card-img-box">
              <img src="/img/cdisfruta_03.jpg" alt="imagen1" />
              <video src="/videos/CDISFRUTA1.mp4" loop></video>
            </div>
            <div className="card-text-box">
              <h3>CARTA 1</h3>
            </div>
          </article>
          <article className="card">
            <div className="card-img-box">
              <img src="/img/cdisfruta_01.jpg" alt="imagen1" />
              <video src="/videos/CDISFRUTA2.mp4" loop></video>
            </div>
            <div className="card-text-box">
              <h3>CARTA 1</h3>
            </div>
          </article>
          <article className="card">
            <div className="card-img-box">
              <img src="/img/cdisfruta_02.jpg" alt="imagen1" />
              <video src="/videos/CDISFRUTA3.mp4" loop></video>
            </div>
            <div className="card-text-box">
              <h3>CARTA 1</h3>
            </div>
          </article>
        </section>
    </>
  )
}

export default Videos;