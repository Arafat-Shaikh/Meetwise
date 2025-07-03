const BackgroundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#302029] via-[#23170f] to-[#3b2a1b] p-8">
      <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
        <img
          src="/layout.png"
          alt="Dashboard Screenshot"
          className="w-[1000px] rounded-2xl"
        />
      </div>
    </div>
  );
};

export default BackgroundPage;
