"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { FeatherImage, FeatherUpload } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { FeatherDollarSign } from "@subframe/core";

function Create() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // State for the uploaded file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State for the preview URL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for validation message

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        alert("Unsupported file type. Please upload a JPG, PNG, GIF, or SVG file.");
        return;
      }

      setUploadedFile(file);

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFields = () => {
	setUploadedFile(null);
	setPreviewUrl(null);
	setName("");
	setDescription("");
	setCategory("");
	setStartingPrice("");
	setReservePrice("");
	setDuration("");
	setErrorMessage("");
  }

  const handlePriceChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value); // Update the corresponding state
    }
  };

  const validateReservePrice = () => {
    if (parseFloat(reservePrice) <= parseFloat(startingPrice)) {
      setErrorMessage("Reserve price must be higher than the starting price.");
    } else {
      setErrorMessage(""); // Clear the error message
    }
  };

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 py-12">
      <div className="flex w-full max-w-[768px] flex-col items-start gap-8">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-2 font-heading-2">Create New Auction</span>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="neutral-secondary"
              onClick={() => {handleClearFields()}} // should clear all records 
            >
              Cancel
            </Button>
            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
              Create Auction
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start border-b border-solid border-neutral-border py-4">
              <span className="text-heading-3 font-heading-3">NFT Upload</span>
            </div>
            <div className="flex w-full items-start gap-8 py-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                <div className="flex h-80 w-full flex-none flex-col items-center justify-center gap-4 rounded-md border border-dashed border-neutral-border bg-neutral-50">
                  {previewUrl ? (
                    // Display the uploaded image preview
                    <img
                      src={previewUrl}
                      alt="Uploaded NFT"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    // Display the placeholder
                    <>
                      <FeatherImage className="text-heading-1 font-heading-1 text-neutral-400" />
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-body-bold font-body-bold text-center">
                          Upload NFT artwork
                        </span>
                        <span className="text-caption font-caption text-subtext-color text-center">
                          Supported: JPG, PNG, GIF, SVG
                        </span>
                      </div>
                    </>
                  )}
                  <Button
                    variant="brand-secondary"
                    icon={<FeatherUpload />}
                    onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input click
                  >
                    Choose File
                  </Button>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/jpeg, image/png, image/gif, image/svg+xml"
                    className="hidden" // Hide the default file input
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start border-b border-solid border-neutral-border py-4">
              <span className="text-heading-3 font-heading-3">NFT Details</span>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-4 py-4">
                <div className="flex w-full items-center gap-4">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold">
                    Name
                  </span>
                  <div className="flex grow shrink-0 basis-0 items-center gap-4">
                    <TextField
                      className="h-auto grow shrink-0 basis-0"
                      label=""
                      helpText=""
                    >
                      <TextField.Input
                        placeholder="Enter NFT name"
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setName(event.target.value);
						}}
                      />
                    </TextField>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-4 py-4">
                <div className="flex w-full items-start gap-4">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold">
                    Description
                  </span>
                  <TextArea
                    className="h-auto min-h-[96px] grow shrink-0 basis-0"
                    label=""
                    helpText=""
                  >
                    <TextArea.Input
                      placeholder="Describe your NFT"
                      value={description}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
						setDescription(event.target.value);
					  }}
                    />
                  </TextArea>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-4 py-4">
                <div className="flex w-full items-center gap-4">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold">
                    Category
                  </span>
                  <Select
                    className="h-auto grow shrink-0 basis-0"
                    label=""
                    placeholder="Select category"
                    helpText=""
                    value={category}
                    onValueChange={(value: string) => setCategory(value)}
                  >
                    <Select.Item value="digital-art">Digital Art</Select.Item>
                    <Select.Item value="generative-art">Generative Art</Select.Item>
                    <Select.Item value="photography">Photography</Select.Item>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start border-b border-solid border-neutral-border py-4">
              <span className="text-heading-3 font-heading-3">Auction Settings</span>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-4 py-4">
                <div className="flex w-full items-center gap-4">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold">
                    Starting Price
                  </span>
                  <div className="flex grow shrink-0 basis-0 items-center gap-4">
                    <TextField
                      className="h-auto grow shrink-0 basis-0"
                      label=""
                      helpText=""
                      icon={<FeatherDollarSign />}
                    >
                      <TextField.Input
                        placeholder="0.00"
                        value={startingPrice}
						onChange={(e) => handlePriceChange(e.target.value, setStartingPrice)} // Restrict input
                      />
                    </TextField>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-4 py-4">
                <div className="flex w-full items-center gap-4">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold">
                    Reserve Price
                  </span>
                  <div className="flex grow shrink-0 basis-0 items-center gap-4">
                    <TextField
                      className="h-auto grow shrink-0 basis-0"
                      label=""
                      helpText=""
                      icon={<FeatherDollarSign />}
                    >
                      <TextField.Input
                        placeholder="0.00"
                        value={reservePrice}
						onChange={(e) => handlePriceChange(e.target.value, setReservePrice)} // Restrict input
                        onBlur={validateReservePrice} // Validate on blur
                      />
                    </TextField>
                  </div>
                </div>
                {errorMessage && (
                  <span className="text-caption font-caption text-error-600">{errorMessage}</span>
                )}
              </div>
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-4 py-4">
                <div className="flex w-full items-center gap-4">
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold">
                    Duration
                  </span>
                  <Select
                    className="h-auto grow shrink-0 basis-0"
                    label=""
                    placeholder="Select duration"
                    helpText=""
                    value={duration}
                    onValueChange={(value: string) => {setDuration(value)}}
                  >
                    <Select.Item value="24h">24h</Select.Item>
                    <Select.Item value="3d">3d</Select.Item>
                    <Select.Item value="7d">7d</Select.Item>
                    <Select.Item value="14d">14d</Select.Item>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
