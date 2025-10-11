export const SpinnerOne = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 min-h-[300px]">
      <div className="w-[50px] h-[50px] border-[1rem] border-[#1e3a8a] border-t-[#3b82f6] rounded-full animate-spin" />
      <p className="text-4xl text-[#1e3a8a] mt-4">{text}</p>
    </div>
  );
};
