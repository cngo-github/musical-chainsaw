export default function Ping() {
  return (
    <div className="relative">
      <div className="absolute -top-1 -left-4">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-800 opacity-75" />
          <span className="relatuve inline-flex size-[11px] rounded-full bg-pink-800" />
        </span>
      </div>
    </div>
  );
}
