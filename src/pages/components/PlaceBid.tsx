"use client";

import React from "react";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { TextField } from "@/ui/components/TextField";
import { FeatherDollarSign } from "@subframe/core";
import { Alert } from "@/ui/components/Alert";
import { Button } from "@/ui/components/Button";

interface PlaceBidProps {
  open: boolean;
  onClose: () => void;
  bid: {
    name: string;
    author: string;
    currentBid: string;
    timeToClose: string;
    image: string;
    description?: string; // Add description for artwork details
  } | null;
  mode: "place-bid" | "view-artwork"; // Add mode prop
}

function PlaceBid({ open, onClose, bid, mode }: PlaceBidProps) {
  if (!bid) return null; // Ensure bid details are available

  return (
    <DialogLayout open={open} onOpenChange={onClose} className="z-50">
      <div className="flex h-full w-full flex-col items-start gap-8 bg-default-background px-8 py-8">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-2 font-heading-2 text-default-font">
            {mode === "place-bid" ? "Place Bid" : "View Artwork"} {/* Dynamic title */}
          </span>
          <IconButton icon={<FeatherX />} onClick={onClose} />
        </div>
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full items-start gap-6">
            <div className="flex items-start relative">
              <img
                className="h-48 w-48 flex-none rounded-md object-cover"
                src={bid.image}
                alt={bid.name}
              />
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="text-heading-3 font-heading-3 text-default-font">
                  {bid.name}
                </span>
                <div className="flex items-center gap-2">
                  <Avatar size="small" image="">
                    A
                  </Avatar>
                  <span className="text-body font-body text-subtext-color">
                    by {bid.author}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-caption font-caption text-subtext-color">
                  Current Highest Bid
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {bid.currentBid}
                </span>
              </div>
			  <span className="text-caption-bold font-caption-bold text-default-fontbg-default-background rounded-md px-2 py-1">
                {bid.timeToClose}
              </span>
            </div>
          </div>
          {mode === "place-bid" ? (
            <>
              {/* Place Bid Mode */}
              <div className="flex w-full flex-col items-start gap-4">
                <TextField
                  label="Your Bid Amount"
                  helpText={`Must be at least ${bid.currentBid} ETH`}
                  icon={<FeatherDollarSign />}
                >
                  <TextField.Input
                    placeholder="Enter amount in ETH"
                    value=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </TextField>
                <Alert
                  variant="warning"
                  title="A 2.5% service fee will be added to your bid"
                  description=""
                  actions={
                    <IconButton
                      size="medium"
                      icon={<FeatherX />}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                  }
                />
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Total with fee
                  </span>
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    2.56 ETH
                  </span>
                </div>
                <Button
                  className="h-10 w-full flex-none"
                  size="large"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Confirm Bid
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* View Artwork Mode */}
              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-body font-body text-default-font">
                  {bid.description || "No description available."}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </DialogLayout>
  );
}

export default PlaceBid;
