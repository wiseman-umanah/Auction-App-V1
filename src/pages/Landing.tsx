"use client";

import React from "react";
import { FeatherWallet } from "@subframe/core";
import { FeatherShield } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";

function Landing() {
  return (
    <div className="flex w-full flex-col items-start">
		<div className="flex min-h-[576px] w-full flex-col items-center justify-center gap-12 overflow-hidden px-4 py-32 relative">
			<div className="flex flex-col items-center justify-center gap-8 z-10">
				<div className="flex w-full max-w-[768px] flex-col items-center gap-4">
					<span className="w-full text-heading-1 font-heading-1 text-white text-center">
					Unlock the Power of Digital Art Ownership
					</span>
					<span className="w-full text-body-bold font-body-bold text-neutral-400 text-center">
					Discover, collect, and trade unique NFTs that tell your digital
					story
					</span>
				</div>
			</div>
			<img
			className="w-full grow shrink-0 basis-0 object-cover absolute inset-0"
			src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
			/>
			<div className="flex w-full grow shrink-0 basis-0 flex-col items-start bg-[#00000066] absolute inset-0" />
		</div>
		<div className="flex w-full max-w-[1280px] flex-col items-center justify-center gap-16 px-4 py-24 mx-auto">
			<div className="flex w-full flex-wrap items-center justify-center gap-16">
			<div className="flex min-w-[320px] max-w-[384px] grow shrink-0 basis-0 flex-col items-center gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md">
				<FeatherWallet className="font-['Inter'] text-[32px] font-[600] leading-[32px] text-default-font" />
				<div className="flex flex-col items-center gap-2">
				<span className="text-heading-2 font-heading-2 text-default-font text-center">
					Web3 Enabled
				</span>
				<span className="text-body font-body text-subtext-color text-center">
					Connect your crypto wallet to start trading
				</span>
				</div>
			</div>
			<div className="flex min-w-[320px] max-w-[384px] grow shrink-0 basis-0 flex-col items-center gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md">
				<FeatherShield className="font-['Inter'] text-[32px] font-[600] leading-[32px] text-default-font" />
				<div className="flex flex-col items-center gap-2">
				<span className="text-heading-2 font-heading-2 text-default-font text-center">
					Secure Trading
				</span>
				<span className="text-body font-body text-subtext-color text-center">
					Trade with confidence on the blockchain
				</span>
				</div>
			</div>
			<div className="flex min-w-[320px] max-w-[384px] grow shrink-0 basis-0 flex-col items-center gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md">
				<FeatherUsers className="font-['Inter'] text-[32px] font-[600] leading-[32px] text-default-font" />
				<div className="flex flex-col items-center gap-2">
				<span className="text-heading-2 font-heading-2 text-default-font text-center">
					Active Community
				</span>
				<span className="text-body font-body text-subtext-color text-center">
					Join thousands of NFT collectors
				</span>
				</div>
			</div>
			</div>
			<div className="flex w-full flex-col items-center gap-12">
			<span className="text-heading-1 font-heading-1 text-default-font">
				Featured Collections
			</span>
			<div className="w-full items-start gap-8 grid grid-cols-4">
				<div className="flex flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border bg-default-background">
				<div className="flex w-full items-start">
					<img
					className="h-64 flex-none rounded-t-lg object-cover w-full"
					src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
					/>
				</div>
				<div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
					<div className="flex w-full flex-col items-start gap-1">
					<span className="text-heading-3 font-heading-3 text-default-font">
						Cosmic Harmony #12
					</span>
					<div className="flex items-center gap-2">
						<Avatar size="small" image="">
						A
						</Avatar>
						<span className="text-body font-body text-subtext-color">
						by Digital Arts Lab
						</span>
					</div>
					</div>
					<div className="flex w-full items-start gap-4">
					<div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
						<span className="text-caption font-caption text-subtext-color">
						Bidding Ends
						</span>
						<span className="text-body-bold font-body-bold text-default-font">
						12h 34m 56s
						</span>
					</div>
					<div className="flex flex-col items-start gap-1">
						<span className="text-caption font-caption text-subtext-color">
						Current Bid
						</span>
						<span className="text-body-bold font-body-bold text-default-font">
						0.75 ETH
						</span>
					</div>
					</div>
				</div>
				</div>
			</div>
			</div>
		</div>
		<div className="flex w-full flex-col items-center justify-center gap-12 bg-neutral-900 px-4 py-24">
			<div className="flex w-full max-w-[768px] flex-col items-center justify-center gap-4">
			<span className="w-full font-['Inter'] text-[48px] font-[700] leading-[48px] text-white text-center -tracking-[0.035em]">
				Ready to Start Trading?
			</span>
			<span className="w-full whitespace-pre-wrap font-['Inter'] text-[24px] font-[500] leading-[32px] text-neutral-500 text-center -tracking-[0.025em]">
				{"Connect your wallet to access exclusive NFT auctions"}
			</span>
			</div>
			<Button
			variant="neutral-secondary"
			size="large"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
			>
			Connect Wallet
			</Button>
		</div>
    </div>
  );
}

export default Landing;
