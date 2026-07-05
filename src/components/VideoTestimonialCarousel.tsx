'use client';

import { useState, useRef, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  videoUrl: string;
  thumbnail: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ania',
    title: 'Fashion Director',
    company: 'Jammi',
    videoUrl: '/assets/client-testimonial-1.mp4',
    thumbnail: '/assets/logo-jammi.png'
  },
  {
    id: '2',
    name: 'Katty',
    title: 'CEO',
    company: 'SmartStart',
    videoUrl: '/assets/client-testimonial.mp4',
    thumbnail: '/assets/logo-smartstart.png'
  },
  {
    id: '3',
    name: 'Oakley',
    title: 'Operations Director',
    company: 'VS Hospitals',
    videoUrl: '/assets/client-testimonial.mp4',
    thumbnail: '/assets/logo-vs-hospitals.png'
  },
  {
    id: '4',
    name: 'Lauren',
    title: 'Marketing Head',
    company: 'Panasuna',
    videoUrl: '/assets/client-testimonial-1.mp4',
    thumbnail: '/assets/logo-panasuna.png'
  }
];

export default function VideoTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);

  // Auto-scroll right to left
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showModal) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [showModal]);

  const handleVideoClick = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (showModal && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [showModal]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className="testimonial-carousel-section">
      <div className="container">
        <div className="section-header">
          <h2>Over 1000+ people trust us</h2>
          <p>See what our clients say about transforming their business with AI automation</p>
        </div>

        <div className="carousel-container">
          <button
            className="carousel-btn prev"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m15 6-6 6 6 6"/>
            </svg>
          </button>

          <div className="carousel-track">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className={`testimonial-card ${testimonial.position === 0 ? 'active' : ''}`}
                style={{
                  transform: `translateX(${testimonial.position * 110}%) scale(${testimonial.position === 0 ? 1 : 0.85})`,
                  opacity: Math.abs(testimonial.position) <= 1 ? 1 : 0.5,
                  zIndex: 10 - Math.abs(testimonial.position)
                }}
                onClick={() => handleVideoClick((currentIndex + testimonial.position + testimonials.length) % testimonials.length)}
              >
                <div className="video-preview">
                  <video
                    poster={testimonial.thumbnail}
                    preload="metadata"
                    playsInline
                  >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                  </video>
                  <div className="play-overlay">
                    <div className="play-button">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="testimonial-info">
                    <h3>{testimonial.name}</h3>
                    <p className="title">{testimonial.title}</p>
                    <p className="company">{testimonial.company}</p>
                  </div>
                </div>
                <div className="brand-logo">
                  <span className="brand-name">{testimonial.company}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-btn next"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m9 6 6 6-6 6"/>
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal for fullscreen video */}
      {showModal && (
        <div className="video-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} aria-label="Close video">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              className="modal-video"
            >
              <source src={testimonials[currentIndex].videoUrl} type="video/mp4" />
            </video>
            <div className="modal-info">
              <h3>{testimonials[currentIndex].name}</h3>
              <p>{testimonials[currentIndex].title} at {testimonials[currentIndex].company}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .testimonial-carousel-section {
          padding: 80px 0;
          background: linear-gradient(180deg, #f8fafb 0%, #ffffff 100%);
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0B0D10;
          margin-bottom: 16px;
        }

        .section-header p {
          font-size: 1.125rem;
          color: #6B7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .carousel-container {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          position: relative;
          width: 600px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-card {
          position: absolute;
          width: 600px;
          height: 400px;
          background: #1a1a1a;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .testimonial-card.active {
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        }

        .video-preview {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .video-preview video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover .play-overlay {
          background: rgba(0, 0, 0, 0.5);
        }

        .play-button {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover .play-button {
          transform: scale(1.1);
          background: #C8EF4A;
        }

        .play-button svg {
          width: 32px;
          height: 32px;
          margin-left: 4px;
        }

        .testimonial-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          color: white;
        }

        .testimonial-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .testimonial-info .title {
          font-size: 1rem;
          opacity: 0.9;
          margin-bottom: 2px;
        }

        .testimonial-info .company {
          font-size: 0.875rem;
          opacity: 0.7;
        }

        .brand-logo {
          position: absolute;
          top: 20px;
          left: 20px;
          background: white;
          padding: 8px 16px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .brand-name {
          font-weight: 700;
          font-size: 0.875rem;
          color: #0B0D10;
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          z-index: 20;
        }

        .carousel-btn:hover {
          background: #C8EF4A;
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-btn.prev {
          left: 20px;
        }

        .carousel-btn.next {
          right: 20px;
        }

        .carousel-btn svg {
          width: 24px;
          height: 24px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #D1D5DB;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #C8EF4A;
          transform: scale(1.2);
        }

        .dot:hover {
          background: #9CA3AF;
        }

        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .close-btn {
          position: absolute;
          top: -50px;
          right: 0;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          transform: scale(1.1);
          color: #C8EF4A;
        }

        .close-btn svg {
          width: 32px;
          height: 32px;
        }

        .modal-video {
          max-width: 90vw;
          max-height: 80vh;
          border-radius: 12px;
        }

        .modal-info {
          text-align: center;
          color: white;
          margin-top: 20px;
        }

        .modal-info h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .modal-info p {
          font-size: 1rem;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .carousel-track {
            width: 90vw;
            height: 300px;
          }

          .testimonial-card {
            width: 90vw;
            height: 300px;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
          }

          .play-button {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
}
