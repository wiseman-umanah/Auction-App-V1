"use client";

import React, { useState } from "react";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import { CollectionCard } from "./components/CollectionCard";
import { useNavigate } from "react-router-dom";
import { FilterChip } from "@/ui/components/FilterChip";
import { FeatherGrid } from "@subframe/core";
import { FeatherPalette } from "@subframe/core";
import { FeatherCode } from "@subframe/core";
import { FeatherCamera } from "@subframe/core";


function Collection() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedFilter, setSelectedFilter] = useState<string>("All"); // Track selected filter

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter); // Update the selected filter
  };

  const collections = [
    {
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      name: "Cosmic Harmony",
      startingPrice: "2.45 ETH",
      currentBid: "5.67 ETH",
      timeToClose: "15h: 10m: 30s",
    },
    {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      name: "Digital Dreams",
      startingPrice: "1.87 ETH",
      currentBid: "3.45 ETH",
      timeToClose: "15h: 10m: 30s",
    },
    {
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      name: "Abstract Fusion",
      startingPrice: "1.5 ETH",
      currentBid: "2.8 ETH",
      timeToClose: "15h: 10m: 30s",
    },
  ];

  // Filter collections based on the search term
  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 py-12">
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-1 font-heading-1 ">Your Collections</span>
          <div className="flex items-center gap-4">
            <TextField label="" helpText="" icon={<FeatherSearch />}>
              <TextField.Input
                placeholder="Search collections..."
                value={searchTerm} // Bind searchTerm to the input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(event.target.value) // Update searchTerm on input change
                }
              />
            </TextField>
            <Button
              icon={<FeatherPlus />}
              onClick={() => navigate("/create-auction")}
            >
              Create Collection
            </Button>
          </div>
        </div>

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

        <div className="w-full items-start gap-6 grid grid-cols-3">
          {filteredCollections.map((collection, index) => (
            <CollectionCard
              key={index}
              image={collection.image}
              name={collection.name}
              startingPrice={collection.startingPrice}
              currentBid={collection.currentBid}
              timeToClose={collection.timeToClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;