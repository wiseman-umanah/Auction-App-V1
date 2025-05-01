"use client";

import React from "react";
import * as SubframeUtils from "../utils";
import { SidebarCollapsible } from "../components/SidebarCollapsible";
import { FeatherHome } from "@subframe/core";
import { FeatherShoppingBag } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { Avatar } from "../components/Avatar";
import * as SubframeCore from "@subframe/core";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Face from "../../assets/face.jpg";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  const location = useLocation();

  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-start",
        className
      )}
      style={{ height: "calc(100vh - 60px)" }} // Adjust height to account for the header
      ref={ref as any}
      {...otherProps}
    >
      <SidebarCollapsible
        header={
          <img
            className="h-6 flex-none object-cover"
            src={Logo}
            alt="Logo"
          />
        }
        footer={
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <div className="flex grow shrink-0 basis-0 items-center gap-4">
                <div className="flex grow shrink-0 basis-0 items-start gap-4">
                  <Avatar image={Face} />
                </div>
              </div>
            </SubframeCore.DropdownMenu.Trigger>
          </SubframeCore.DropdownMenu.Root>
        }
      >
        {/* Navigation Items */}
        <Link to="/" className="w-full">
          <SidebarCollapsible.NavItem
            icon={<FeatherHome />}
            selected={location.pathname === "/"}
          >
            Home
          </SidebarCollapsible.NavItem>
        </Link>
        <Link to="/collections" className="w-full">
          <SidebarCollapsible.NavItem
            icon={<FeatherShoppingBag />}
            selected={location.pathname === "/collections"}
          >
            Collections
          </SidebarCollapsible.NavItem>
        </Link>
        <Link to="/create-auction" className="w-full">
          <SidebarCollapsible.NavItem
            icon={<FeatherPlus />}
            selected={location.pathname === "/create-auction"}
          >
            Create Auction
          </SidebarCollapsible.NavItem>
        </Link>
      </SidebarCollapsible>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
