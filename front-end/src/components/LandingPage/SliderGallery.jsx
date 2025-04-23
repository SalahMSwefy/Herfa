import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
    {
        url: '/categories/1.jpg',
        title: 'Mechanical',
    },
    {
        url: '/categories/2.jpg',
        title: 'Electrical',
    },
    {
        url: '/categories/3.jpg',
        title: 'Carpentry',
    },
    {
        url: '/categories/4.jpg',
        title: 'Painting',
    },
    {
        url: '/categories/5.jpg',
        title: 'Plumber',
    },
    {
        url: '/categories/6.jpg',
        title: 'Construction Worker',
    },
]
// [Mechanical, Electrical, Carpentry, Painting, Plumber, Worker]

const SliderGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Navigate to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1,
        )
    }

    // Navigate to the next slide
    const nextSlide = () => {
        setCurrentIndex((nextIndex) =>
            nextIndex === images.length - 1 ? 0 : nextIndex + 1,
        )
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex) =>
                currentIndex === images.length - 1 ? 0 : currentIndex + 1,
            )
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div
            className="relative mx-auto my-10 hidden w-4/5 max-w-[1000px] overflow-hidden md:block lg:my-20"
            id="categories"
        >
            <h2 className="mb-8 bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-center font-brand text-3xl uppercase tracking-wide text-main-500 md:text-5xl lg:mb-16">
                Categories
            </h2>
            <Slider images={images} currentIndex={currentIndex} />
            <div className="absolute top-1/2 flex w-full items-center justify-between px-4">
                <ChevronLeft
                    onClick={prevSlide}
                    size={40}
                    className="rounded-full bg-main-500/30 p-2 text-white hover:bg-main-500"
                />
                <ChevronRight
                    onClick={nextSlide}
                    size={40}
                    className="rounded-full bg-main-500/30 p-2 text-white hover:bg-main-500"
                />
            </div>
            <Dots
                images={images}
                currentIndex={currentIndex}
                goToSlide={goToSlide}
            />
        </div>
    )
}

export default SliderGallery

function Slider({ images, currentIndex }) {
    return (
        <div className="flex transition-transform">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute min-w-full opacity-0 transition-opacity duration-1000 ${
                        index === currentIndex ? 'relative opacity-100' : ''
                    }`}
                >
                    <img
                        src={image.url}
                        alt={`Slide ${index + 1}`}
                        className="w-full"
                    />
                    <div className="absolute -bottom-2 flex w-full flex-col items-center justify-center bg-gradient-to-br from-main-600 to-main-500 py-4 text-white">
                        <h4 className="text-xl font-normal text-white/50">
                            Skill
                        </h4>
                        <h3 className="text-2xl font-medium tracking-wide">
                            {image.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

function Dots({ images, currentIndex, goToSlide }) {
    return (
        <div className="mt-8 flex justify-center gap-2">
            {images.map((_, index) => (
                <button
                    key={index}
                    className={`h-3 w-3 rounded-full hover:bg-main-500 ${
                        index === currentIndex
                            ? 'bg-main-600'
                            : 'bg-main-500/50'
                    }`}
                    onClick={() => goToSlide(index)}
                />
            ))}
        </div>
    )
}
