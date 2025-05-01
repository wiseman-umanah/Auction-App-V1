"use client";

import { useState } from "react";
import { 
	FeatherExternalLink,
	FeatherBell,
	FeatherCheck,
	FeatherClock
 } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { LinkButton } from "@/ui/components/LinkButton";
import  CurrentBiddings from "./components/CurrentBid";
import Product from "./components/Product";
import PlaceBid from "./components/PlaceBid";

function Home() {
	const [isProductPopupOpen, setIsProductPopupOpen] = useState(false); // State to manage popup visibility
	const [isPlaceBidOpen, setIsPlaceBidOpen] = useState(false); // State to manage PlaceBid visibility
	const [selectedBid, setSelectedBid] = useState<any | null>(null); // State to track the selected auction item

	const auctionItems = [
		{
			image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
			name: "Abstract Fusion #23",
			startingBid: "1.5 ETH",
			timeToClose: "15h : 32m : 17s",
			author: "Digital Arts Lab",
		},
		{
			image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca",
			name: "Digital Landscape #15",
			startingBid: "2.1 ETH",
			timeToClose: "12h : 45m : 10s",
			author: "Art Studio",
		},
	];

	const handleViewAll = () => {
		setIsProductPopupOpen(true); // Open the Product popup
	};

	const handleAuctionClick = (item: any) => {
		setSelectedBid({
			name: item.name,
			author: item.author,
			currentBid: item.startingBid,
			timeToClose: item.timeToClose,
			image: item.image,
		});
		setIsPlaceBidOpen(true); // Open the PlaceBid dialog
	};

	return (
		<div className="flex h-full w-full items-start justify-center  px-6 py-6">
			<div className="flex max-w-[1280px] grow shrink-0 basis-0 flex-col items-start gap-6">
				<div className="flex w-full items-center justify-between">
					<span className="text-heading-1 font-heading-1 ">
						Dashboard
					</span>
				</div>
				<div className="w-full flex-col items-start gap-6 grid grid-cols-2">
					<CurrentBiddings />
					<div className="flex flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border  px-6 py-6 h-full">
						<div className="flex w-full items-center justify-between">
						<span className="text-heading-3 font-heading-3 ">
							Your Bidders
						</span>
						<Badge variant="success">Live Feed</Badge>
						</div>
						<div className="flex w-full flex-col items-start gap-4">
						<div className="flex w-full items-center gap-4">
							<Avatar
							size="large"
							image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
							>
							A
							</Avatar>
							<div className="flex flex-col items-start gap-1 grow">
							<span className="text-body-bold font-body-bold ">
								Alex placed a bid
							</span>
							<span className="text-body font-body text-subtext-color">
								3.2 ETH for Crystal Wave #05
							</span>
							</div>
							<span className="text-caption font-caption text-subtext-color">
							2m ago
							</span>
						</div>
						<div className="flex w-full items-center gap-4">
							<Avatar
							size="large"
							image="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
							>
							A
							</Avatar>
							<div className="flex flex-col items-start gap-1 grow">
							<span className="text-body-bold font-body-bold ">
								Sarah placed a bid
							</span>
							<span className="text-body font-body text-subtext-color">
								2.8 ETH for Neon Nights #12
							</span>
							</div>
							<span className="text-caption font-caption text-subtext-color">
							5m ago
							</span>
						</div>
						</div>
					</div>
					<div className="flex flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border  px-6 py-6">
						<div className="flex w-full items-center justify-between">
						<span className="text-heading-3 font-heading-3 ">
							Available Auctioned Products
						</span>
						<LinkButton
							icon={<FeatherExternalLink />}
							onClick={handleViewAll}
						>
							View All
						</LinkButton>
						</div>
						<div className="w-full items-start gap-4 grid grid-cols-2">
							{auctionItems.map((item, index) => (
								<div
									key={index}
									className="flex flex-col items-start gap-2 rounded-md border border-solid border-neutral-border px-4 py-4 cursor-pointer"
									onClick={() => handleAuctionClick(item)} // Handle click to open PlaceBid
								>
									<img
										className="h-32 w-full flex-none rounded-md object-cover"
										src={item.image}
										alt={item.name}
									/>
									<span className="text-body-bold font-body-bold">
										{item.name}
									</span>
									<span className="text-body font-body text-subtext-color">
										Starting bid: {item.startingBid}
									</span>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border  px-6 py-6 h-full">
						<div className="flex w-full items-center justify-between">
						<span className="text-heading-3 font-heading-3 ">
							Notifications
						</span>
						<Badge variant="neutral">3 New</Badge>
						</div>
						<div className="flex w-full flex-col items-start gap-4">
						<div className="flex w-full items-center gap-4">
							<FeatherBell className="text-heading-2 font-heading-2" />
							<span className="text-body font-body ">
							New highest bid on Cosmic Harmony #12
							</span>
						</div>
						<div className="flex w-full items-center gap-4">
							<FeatherCheck className="text-heading-2 font-heading-2 text-success-600" />
							<span className="text-body font-body ">
							Your bid was successful on Digital Dreams #08
							</span>
						</div>
						<div className="flex w-full items-center gap-4">
							<FeatherClock className="text-heading-2 font-heading-2 text-warning-600" />
							<span className="text-body font-body ">
							Auction ending soon: Crystal Wave #05
							</span>
						</div>
						</div>
					</div>
				</div>
			</div>

			{isProductPopupOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
					onClick={() => setIsProductPopupOpen(false)} // Close the popup when clicking on the overlay
				>
					<div
					className="bg-white h-[90vh] rounded-lg shadow-lg w-[90%] max-w-[1500px]"
					onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
					>
					<Product
						onClose={() => setIsProductPopupOpen(false)} // Pass the onClose handler to the Product component
					/>
					</div>
				</div>
			)}

			{/* PlaceBid Dialog */}
			{isPlaceBidOpen && selectedBid && (
				<PlaceBid
					open={isPlaceBidOpen}
					onClose={() => setIsPlaceBidOpen(false)} // Close the dialog
					bid={selectedBid} // Pass the selected auction item
					mode="place-bid"
				/>
			)}
		</div>
	);
}

export default Home;