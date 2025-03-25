

const SummeryCard = ({title, value, icon}: {title: string, value: string, icon: any}) => {
  return (
    <div className="bg-white hover:bg-[#F5F5F5]/50 transition-all duration-300 flex border-[var(--borderGray)]  border justify-between items-center p-5 rounded-lg">
      <div>
        <p className="text-[14px] text-[var(--primary)] font-normal">{title}</p>
        <p className="text-[20px] text-[var(--primary)] font-semibold">{value}</p>
      </div>
      <div className="border-[var(--borderGray)]/40  border p-2 rounded-full">{icon}</div>
    </div>
  );
};

export default SummeryCard;
