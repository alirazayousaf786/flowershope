import Hero from "@/component/hero.jsx"
import HeroLast from "@/component/herolast.jsx"
import Product from "@/component/product.jsx"
import Bunner from "@/component/bunner.jsx"
import ImageGallery from "@/component/imagesgallery.jsx"
import Testimonial from "@/component/testimonial.jsx"
import According from "@/component/according.jsx"
import Contact from "@/component/contact.jsx"
export default function Heme(){
    return(
        <>
        <Hero />
        <HeroLast />
        <Product />
        <Bunner />
        <ImageGallery />
        <Testimonial />
        <According />
        <Contact />
        </>
    )
}