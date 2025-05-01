import React from "react";
import { FeatherVerified } from "@subframe/core";

interface CollectionCardProps {
  image: string;
  name: string;
  startingPrice: string;
  currentBid: string;
  timeToClose: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  image,
  name,
  startingPrice,
  currentBid,
  timeToClose,
}) => {
  return (
    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border  px-6 py-6">
      <div className="flex w-full items-center gap-2">
        <img className="h-16 w-16 flex-none rounded-md object-cover" src={image} />
        <div className="flex flex-col items-start gap-1 grow">
          <div className="flex w-full items-center gap-2">
            <span className="text-heading-3 font-heading-3 ">{name}</span>
            <FeatherVerified className="text-heading-3 font-heading-3 text-brand-700" />
          </div>
          <span className="text-body font-body">{timeToClose}</span>
        </div>
      </div>
      <div className="flex w-full items-start gap-4">
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
          <span className="text-caption font-caption text-subtext-color">Starting Price</span>
          <span className="text-body-bold font-body-bold ">{startingPrice}</span>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
          <span className="text-caption font-caption text-subtext-color">Highest Bid</span>
          <span className="text-body-bold font-body-bold ">{currentBid}</span>
        </div>
      </div>
    </div>
  );
};