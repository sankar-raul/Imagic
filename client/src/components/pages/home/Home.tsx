import HeroSlider from '../../shared/heroSlider/HeroSlider';

const Home = () => {
  return (
    <>
      <section className="flex flex-col relative overflow-visible">
        <div className="-my-96 pointer-events-none bg-[linear-gradient(to_right,#00000006_2px,transparent_1px),linear-gradient(to_bottom,#00000006_2px,transparent_1px)] bg-size-[130px_130px] absolute inset-0"></div>
        <HeroSlider />
      </section>
    </>
  );
};
export default Home;
