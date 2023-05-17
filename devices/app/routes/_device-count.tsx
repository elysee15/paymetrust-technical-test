import Squares from "./_squares";

const DeviceCount = ({ count }: { count: number }) => {
  return (
    <div className="text-center">
      <h1 className="text-6xl text-white mb-1">{count}</h1>
      <p className="text-white font-semibold leading-tight uppercase text-center max-w-[10ch]">
        {count > 0 ? "Devices" : "Device"} online
      </p>
      <Squares count={count} />
    </div>
  );
};

export default DeviceCount;
