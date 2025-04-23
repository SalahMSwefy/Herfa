import Header from '../components/LandingPage/Header'
import Hero from '../components/LandingPage/Hero'
import About from '../components/LandingPage/About'
import Services from '../components/LandingPage/Services'
import SliderGallery from '../components/LandingPage/SliderGallery'
import Team from '../components/LandingPage/Team'
import Footer from '../components/LandingPage/Footer'
import { useEffect } from 'react'

function LandingPage() {
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const target = document.querySelector(this.getAttribute('href'))
                window.scrollTo({
                    top: target.offsetTop - 80 > 0 ? target.offsetTop - 80 : 0,
                    behavior: 'smooth',
                })
            })
        })
    }, [])
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Services />
            <SliderGallery />
            <Team />
            <Footer />
        </>
    )
}

export default LandingPage
