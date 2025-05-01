"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Create from "./pages/Create";
import Landing from "./pages/Landing";
import { Tooltip } from "@/ui/components/Tooltip";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherMoon, FeatherWallet } from "@subframe/core";
import { useState } from "react";
import Web3 from "web3";


declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

function AuctionHubApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false); // Track animation state

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  async function connect() {
    if (walletAddress) {
      // Trigger fade-out before disconnecting
      setIsFading(true);
      setTimeout(() => {
        setWalletAddress(null);
        console.log("Wallet disconnected");
        setIsFading(false);
      }, 300); // Match the transition duration
    } else if (window.ethereum) {
      try {
        // Request wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);

        // Get the connected wallet address
        const accounts = await window.web3.eth.getAccounts();
        const newWalletAddress = accounts[0];

        // Trigger fade-out before connecting
        setIsFading(true);
        setTimeout(() => {
          setWalletAddress(newWalletAddress);
          console.log(`Wallet connected: ${newWalletAddress}`);
          setIsFading(false);
        }, 300); // Match the transition duration
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log("No wallet detected");
    }
  }

  // CSS styles for fade animation
  const fadeStyles = {
    transition: "opacity 300ms ease-in-out",
    opacity: isFading ? 0 : 1,
  };

  return (
    <Router>
      {/* Animated Container */}
      <div style={{ position: "relative", minHeight: "100vh" }}>
		<div className="flex w-full items-center justify-end border-b-2 border-solid border-neutral-border">
			<div className="flex items-center gap-2 m-3">
			<SubframeCore.Tooltip.Provider>
				<SubframeCore.Tooltip.Root>
				<SubframeCore.Tooltip.Trigger asChild={true}>
					<Button
					variant="neutral-secondary"
					icon={<FeatherMoon />}
					onClick={toggleDarkMode}
					/>
				</SubframeCore.Tooltip.Trigger>
				<SubframeCore.Tooltip.Portal>
					<SubframeCore.Tooltip.Content
					side="bottom"
					align="center"
					sideOffset={4}
					asChild={true}
					>
					<Tooltip>Toggle Dark Mode</Tooltip>
					</SubframeCore.Tooltip.Content>
				</SubframeCore.Tooltip.Portal>
				</SubframeCore.Tooltip.Root>
			</SubframeCore.Tooltip.Provider>
			<Button
				icon={<FeatherWallet />}
				onClick={connect}
			>
				{walletAddress
				? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
				: "Connect Wallet"}
			</Button>
			</div>
		</div>
        {walletAddress ? (
          <div style={fadeStyles}>
            <DefaultPageLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collection />} />
                <Route path="/create-auction" element={<Create />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </DefaultPageLayout>
          </div>
        ) : (
          <div style={fadeStyles}>
            <Routes>
              <Route
                path="*"
                element={
                  <Landing />
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default AuctionHubApp;
