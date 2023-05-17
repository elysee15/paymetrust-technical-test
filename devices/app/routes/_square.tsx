export default function Square({
  position,
}: {
  position: { x: number; y: number };
}) {
  return (
    <div
      className={`w-[50px] h-[50px] bg-white absolute rounded-full shadow-sm`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
}
