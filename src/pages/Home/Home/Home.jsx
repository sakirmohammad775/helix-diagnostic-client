
import Testimonials from "../Testimonials/Testimonials.jsx";
import Banner from "../Banner/Banner";
import CtaBanner from "../CtaBanner/CtaBanner.jsx";
import FAQ from "../FAQ/FAQ.jsx";
import HowItWorks from "../HowItWorks/HowItWorks.jsx";
import Services from "../Services/Services.jsx";
import TestSearchBar from "../TestSearchBar/TestSearchBar.jsx";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs.jsx";
import ServiceOfferings from "../ServiceOffering/ServiceOffering.jsx";
import HomeCollectionBooking from "../HomeCollectionBooking/HomeCollectionBooking.jsx";


const Home = () => {
    return (
        <>
        <Banner/>
        <CtaBanner/>
        <TestSearchBar/>
        <Services/>
        <ServiceOfferings/>
        <HomeCollectionBooking/>
        <HowItWorks/>
        <WhyChooseUs/>
        <Testimonials/>
        <FAQ/>
        </>
    );
};

export default Home;