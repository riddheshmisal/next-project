'use client'
import React, { useEffect, useState } from 'react'
import './Carousel.css'

interface CarouselProps {
  images: string[]
  fallbackImage: string
}

const Carousel: React.FC<CarouselProps> = () => {
  const images = [
    'https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/amsterdamslide__800x600.jpg',
        'https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/lands-endslide__800x600.jpg',
        'https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/trustslide-2__800x600.jpg'
  ]

  const fallbackImage =
    'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back01.jpg'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  useEffect(() => {
    console.log('🚀 ~ loadedImages:', loadedImages)
  }, [loadedImages])

  useEffect(() => {
    // Prefetch all images
    images.forEach((image) => {
      const img = new Image()
      img.src = image
      img.onload = () => {
        const splits = image.split('/')
        console.log('image loaded', splits[splits.length - 1])
        setLoadedImages((prev) => [...new Set<string>([...prev, image])])
      }
      img.onerror = () => {
        console.log('image error')
        setLoadedImages((prev) => [
          ...new Set<string>([...prev, fallbackImage]),
        ])
      }
    })
  }, [])

  const nextSlide = () => {
    console.log('🚀 ~ nextSlide ~ :', currentIndex)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedImages.length)
  }

  const prevSlide = () => {
    console.log('🚀 ~ prevSlide ~ :', currentIndex)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? loadedImages.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className='carousel'>
      <button
        className='carousel-button prev'
        onClick={prevSlide}
      >
        &#8249;
      </button>
      <div className='carousel-image-container'>
        <img
          src={loadedImages[currentIndex] || fallbackImage}
          alt={`Slide ${currentIndex}`}
          className='carousel-image'
        />
      </div>
      <button
        className='carousel-button next'
        onClick={nextSlide}
      >
        &#8250;
      </button>
    </div>
  )
}

export default Carousel

