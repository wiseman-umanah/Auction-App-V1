"use client";

import React, { useState } from "react";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX, FeatherDollarSign } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { TextField } from "@/ui/components/TextField";
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
  const [bidAmount, setBidAmount] = useState<string>(""); // State for the bid amount
  const [alertVisible, setAlertVisible] = useState<boolean>(true); // State for alert visibility
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  if (!bid) return null; // Ensure bid details are available

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setBidAmount(value); // Update bid amount state if valid
      setErrorMessage(null); // Clear error message when input is valid
    }
  };

  const handleConfirmBid = () => {
    const currentBid = parseFloat(bid.currentBid.replace(" ETH", ""));
    const enteredBid = parseFloat(bidAmount);

    if (isNaN(enteredBid) || enteredBid < currentBid) {
      setErrorMessage(`Your bid must be at least ${currentBid} ETH.`);
      return;
    }

    alert(`Bid of ${enteredBid} ETH placed successfully!`);
    setBidAmount(""); // Reset bid amount
    onClose(); // Close the dialog
  };

  const handleDismissAlert = () => {
    setAlertVisible(false); // Hide the alert
  };

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
              <span className="text-caption-bold font-caption-bold text-default-font bg-default-background rounded-md px-2 py-1">
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
                    value={bidAmount}
                    onChange={handleBidChange} // Handle input change
                  />
                </TextField>
                {errorMessage && (
                  <span className="text-body font-body text-red-500">
                    {errorMessage}
                  </span>
                )}
                {alertVisible && (
                  <Alert
                    variant="warning"
                    title="A 2.5% service fee will be added to your bid"
                    description=""
                    actions={
                      <IconButton
                        size="medium"
                        icon={<FeatherX />}
                        onClick={handleDismissAlert} // Handle alert dismissal
                      />
                    }
                  />
                )}
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Total with fee
                  </span>
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    {bidAmount
                      ? `${(parseFloat(bidAmount) * 1.025).toFixed(2)} ETH`
                      : "0.00 ETH"}
                  </span>
                </div>
                <Button
                  className="h-10 w-full flex-none"
                  size="large"
                  onClick={handleConfirmBid} // Handle bid confirmation
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
