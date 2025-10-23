import React from 'react';

interface TileProps {
  value: number;
}

const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    0: 'bg-[#E0DAD1]',
    2: 'bg-[#FEF9C3] text-[#141414]',
    4: 'bg-[#FEF08A] text-[#141414]',
    8: 'bg-[#FDBA74] text-[#FAFAFA]',
    16: 'bg-[#FB923C] text-[#FAFAFA]',
    32: 'bg-[#F97316] text-[#FAFAFA]',
    64: 'bg-[#FC7171] text-[#FAFAFA]',
    128: 'bg-[#F6E05E] text-[#FAFAFA]',
    256: 'bg-[#ECC94B] text-[#FAFAFA]',
    512: 'bg-[#D69E2E] text-[#FAFAFA]',
    1024: 'bg-[#B7791F] text-[#FAFAFA]',
    2048: 'bg-[#975A16] text-[#FAFAFA]',
  };
  
  return colors[value] || 'bg-gray-900 text-[#FAFAFA]';
};

export const Tile: React.FC<TileProps> = ({ value }) => {
  const colorClass = getTileColor(value);
  
  return (
    <div
      className={`
        ${colorClass}
        text-xl
        md:text-2xl
        w-[66px]
        md:w-[90px]
        aspect-square rounded-md md:p-3 p-0
        flex items-center justify-center
        font-bold transition-all duration-150
        ${value !== 0 ? 'scale-100' : 'scale-95 opacity-50'}
      `}
    >
      {value !== 0 && value}
    </div>
  );
};