import HeroSlider from '../../shared/heroSlider/HeroSlider';
import TrustCards from '../../shared/trustCards/TrustCards';

const Home = () => {
  return (
    <>
      <section className="flex flex-col relative overflow-visible">
        <div className="-my-96 pointer-events-none bg-[linear-gradient(to_right,#00000004_2px,transparent_1px),linear-gradient(to_bottom,#00000004_2px,transparent_1px)] bg-size-[130px_130px] absolute inset-0"></div>
        <HeroSlider />
        <TrustCards />
      </section>
    </>
  );
};
export default Home;
