"use client";

import { useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";
import PlaceBid from "./PlaceBid";
import { FilterChip } from "@/ui/components/FilterChip";
import { FeatherGrid } from "@subframe/core";
import { FeatherPalette } from "@subframe/core";
import { FeatherCode } from "@subframe/core";
import { FeatherCamera } from "@subframe/core";

const products = Array.from({ length: 20 }, (_, index) => ({
	image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
	timeToClose: "15h : 32m : 17s",
	name: "Cosmic Harmony #12",
	author: "Digital Arts Lab",
	currentBid: "2.45 ETH",
}));

interface ProductProps {
	onClose: () => void;
}

function Product({ onClose }: ProductProps) {
  const [isPlaceBidOpen, setIsPlaceBidOpen] = useState(false); // Track if PlaceBid is open
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null); // Track selected product
  const [mode, setMode] = useState<"place-bid" | "view-artwork">("place-bid");
  const [selectedFilter, setSelectedFilter] = useState<string>("All"); // Track selected filter

  const handlePlaceBid = (product: typeof products[0]) => {
    setSelectedProduct(product); // Set the selected product
    setMode("place-bid");
    setIsPlaceBidOpen(true); // Open the PlaceBid popup
  };

  const handleViewArtwork = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setMode("view-artwork");
    setIsPlaceBidOpen(true);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter); // Update the selected filter
  };

  return (
    <div className="flex w-full flex-col items-start gap-6 px-6 py-8 max-h-[90vh] overflow-hidden">
      <div className="flex w-full items-center justify-between">
        <span className="text-heading-2 font-heading-2 text-default-font">
          Available Auction
        </span>
        <IconButton icon={<FeatherX />} onClick={onClose} />
      </div>

      {/* Filter Chips */}
      <div className="flex w-full flex-wrap items-center gap-2">
        <FilterChip
          selected={selectedFilter === "All"}
          icon={<FeatherGrid />}
          onClick={() => handleFilterChange("All")} // Update filter on click
        >
          All
        </FilterChip>
        <FilterChip
          selected={selectedFilter === "Digital Arts"}
          icon={<FeatherPalette />}
          onClick={() => handleFilterChange("Digital Arts")} // Update filter on click
        >
          Digital Arts
        </FilterChip>
        <FilterChip
          selected={selectedFilter === "Generative Art"}
          icon={<FeatherCode />}
          onClick={() => handleFilterChange("Generative Art")} // Update filter on click
        >
          Generative Art
        </FilterChip>
        <FilterChip
          selected={selectedFilter === "Photography"}
          icon={<FeatherCamera />}
          onClick={() => handleFilterChange("Photography")} // Update filter on click
        >
          Photography
        </FilterChip>
      </div>

      {/* Product List */}
      <div className="flex flex-wrap justify-start w-full gap-4 overflow-y-auto pr-2">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-grow flex-col items-start gap-4 cursor-pointer rounded-lg border border-solid border-neutral-border bg-default-background"
            onClick={() => handleViewArtwork(product)} // Handle click to view artwork
          >
            <div className="flex w-full items-start relative">
              <img
                className="h-64 flex-none rounded-t-lg object-cover w-full"
                src={product.image}
                alt={product.name}
              />
              <span className="text-caption-bold font-caption-bold text-default-font absolute bottom-2 left-2 bg-default-background rounded-md px-2 py-1">
                {product.timeToClose}
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="text-heading-3 font-heading-3 text-default-font">
                  {product.name}
                </span>
                <div className="flex items-center gap-2">
                  <Avatar size="small" image="">
                    A
                  </Avatar>
                  <span className="text-body font-body text-subtext-color">
                    by {product.author}
                  </span>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-caption font-caption text-subtext-color">
                    Starting Bid
                  </span>
                  <span className="text-body-bold font-body-bold text-default-font">
                    {product.currentBid}
                  </span>
                </div>
                <Button
                  className="h-9 w-auto flex-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaceBid(product);
                  }} // Handle click to place bid
                >
                  Place Bid
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PlaceBid Popup */}
      {isPlaceBidOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PlaceBid
            open={isPlaceBidOpen}
            onClose={() => setIsPlaceBidOpen(false)} // Close the popup
            bid={selectedProduct} // Pass the selected product details
            mode={mode} // Set mode to "place-bid"
          />
        </div>
      )}
    </div>
  );
}

export default Product;
