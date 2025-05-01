import { useState } from "react";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherChevronLeft, FeatherChevronRight } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import PlaceBid from "./PlaceBid";

function CurrentBiddings() {
  const bids = [
    {
      name: "Cosmic Harmony #12",
      author: "Digital Arts Lab",
      currentBid: "2.45 ETH",
      timeToClose: "15h : 32m : 17s",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
    },
    {
      name: "Abstract Fusion #23",
      author: "Art Collective",
      currentBid: "3.1 ETH",
      timeToClose: "10h : 20m : 45s",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    },
    {
      name: "Digital Dreams #08",
      author: "Meta Studio",
      currentBid: "1.87 ETH",
      timeToClose: "5h : 10m : 30s",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaceBidOpen, setIsPlaceBidOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<{
    name: string;
    author: string;
    currentBid: string;
    timeToClose: string;
    image: string;
  } | null>(null);
  const [mode, setMode] = useState<"place-bid" | "view-artwork">("place-bid");

  const handleNext = () => {
    if (currentIndex < bids.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handlePlaceBid = (bid: typeof bids[0]) => {
    setSelectedBid(bid);
    setMode("place-bid");
    setIsPlaceBidOpen(true);
  };

  const handleViewArtwork = (bid: typeof bids[0]) => {
    setSelectedBid(bid);
    setMode("view-artwork");
    setIsPlaceBidOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border px-6 py-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-3 font-heading-3">Current Biddings</span>
          <Badge>{bids.length} Active</Badge>
        </div>
        <div className="flex w-full items-center gap-4">
          {/* Left Arrow Button */}
          {currentIndex > 0 && (
            <IconButton
              variant="neutral-secondary"
              icon={<FeatherChevronLeft />}
              onClick={handlePrevious}
            />
          )}
          {/* Bid Items Slider */}
          <div className="flex grow shrink-0 basis-0 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {bids.map((bid, index) => (
                <div
                  key={index}
                  className="flex shrink-0 w-full flex-col items-start gap-4"
                >
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
                        <span className="text-heading-3 font-heading-3">
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
                          Current Bid
                        </span>
                        <span className="text-heading-2 font-heading-2">
                          {bid.currentBid}
                        </span>
                      </div>
                      <div className="flex w-full items-center gap-2">
                        <Button
                          variant="neutral-secondary"
                          onClick={() => handleViewArtwork(bid)}
                        >
                          View Artwork
                        </Button>
                        <Button onClick={() => handlePlaceBid(bid)}>
                          Place Bid
                        </Button>
                      </div>
                      <span className="text-caption-bold font-caption-bold rounded-md px-2 py-1">
                        {bid.timeToClose}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Arrow Button */}
          {currentIndex < bids.length - 1 && (
            <IconButton
              variant="neutral-secondary"
              icon={<FeatherChevronRight />}
              onClick={handleNext}
            />
          )}
        </div>
      </div>

      {/* PlaceBid Dialog */}
      {isPlaceBidOpen && selectedBid && (
        <PlaceBid
          open={isPlaceBidOpen}
          onClose={() => setIsPlaceBidOpen(false)}
          bid={selectedBid}
          mode={mode}
        />
      )}
    </>
  );
}

export default CurrentBiddings;
