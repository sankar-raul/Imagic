const NoiseBackground = () => {
  return (
    <div
      style={{
        // background: "radial-gradient(107.48% 111.076% at 4.6875% -4.53587%, rgb(183, 240, 253) 0%, rgb(99, 183, 232) 46.3146%, rgb(26, 77, 150) 100%)",
        background:
          "radial-gradient(76.3992% 72.7848% at 54.9716% 35.443%, rgb(255, 199, 69) 0%, rgb(254, 176, 3) 28.5%, rgb(255, 146, 3) 71.0326%, rgb(255, 80, 4) 100%)",
        borderRadius: 48,
        willChange: "auto",
      }}
      className="relative flex p-4 flex-auto justify-between flex-col rounded-3xl shadow-lg md:cursor-pointer min-w-80 max-w-96 aspect-4/5 hover:z-1 group/card">
      <div
        className="absolute inset-0 bg-contain bg-top-left opacity-50"
        style={{
          backgroundImage: "url(/svg/noise.svg)",
        }}
      ></div>
    </div>
  );
};

export default NoiseBackground;
