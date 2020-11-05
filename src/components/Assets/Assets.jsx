import React from 'react';
import PaperAssets from '../PaperAssets/PaperAssets';
import RealEstate from '../RealEstate/RealEstate';
import Business from '../Business/Business';
import Commodities from '../Commodities/Commodities'
import Cash from '../Cash/Cash';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Asset</Popover.Title>
        <Popover.Content>Something that puts money in your pocket</Popover.Content>

    </Popover>
);

const AssetPopover = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
)

export default function Assets({ totalAssets, totalCash, newCash, handleCashSubmit, handleCashChange, handleCashDelete, cashFormInvalid, cashFormRef, totalPaperAssets, newPaperAsset, handlePaperAssetSubmit, handlePaperAssetChange, handlePaperAssetDelete, paperAssetFormInvalid, paperAssetFormRef, totalRealEstate, newRealEstate, handleRealEstateSubmit, handleRealEstateChange, handleRealEstateDelete, realEstateFormInvalid, realEstateFormRef, totalBusiness, newBusiness, handleBusinessSubmit, handleBusinessChange, handleBusinessDelete, businessFormInvalid, businessFormRef, totalCommodities, newCommodity, handleCommoditySubmit, handleCommodityChange, handleCommodityDelete, commodityFormInvalid, commodityFormRef }) {

    return (
        <div className="border">
            <span className="title">
                <span>ASSETS <AssetPopover /></span>
                <span className="right">${totalAssets.map(elem => elem.amount).reduce((acc, num) => acc + num, 0)}</span>
            </span>
            <Cash
                totalCash={totalCash}
                newCash={newCash}
                handleCashSubmit={handleCashSubmit}
                handleCashChange={handleCashChange}
                handleCashDelete={handleCashDelete}
                cashFormInvalid={cashFormInvalid}
                cashFormRef={cashFormRef}
                totalAssets={totalAssets}
            />
            <PaperAssets
                totalPaperAssets={totalPaperAssets}
                newPaperAsset={newPaperAsset}
                handlePaperAssetSubmit={handlePaperAssetSubmit}
                handlePaperAssetChange={handlePaperAssetChange}
                handlePaperAssetDelete={handlePaperAssetDelete}
                paperAssetFormInvalid={paperAssetFormInvalid}
                paperAssetFormRef={paperAssetFormRef}
                totalAssets={totalAssets}
            />
            <RealEstate
                totalRealEstate={totalRealEstate}
                newRealEstate={newRealEstate}
                handleRealEstateSubmit={handleRealEstateSubmit}
                handleRealEstateChange={handleRealEstateChange}
                handleRealEstateDelete={handleRealEstateDelete}
                realEstateFormInvalid={realEstateFormInvalid}
                realEstateFormRef={realEstateFormRef}
                totalAssets={totalAssets}
            />
            <Business
                totalBusiness={totalBusiness}
                newBusiness={newBusiness}
                handleBusinessSubmit={handleBusinessSubmit}
                handleBusinessChange={handleBusinessChange}
                handleBusinessDelete={handleBusinessDelete}
                businessFormInvalid={businessFormInvalid}
                businessFormRef={businessFormRef}
                totalAssets={totalAssets}
            />
            <Commodities
                totalCommodities={totalCommodities}
                newCommodity={newCommodity}
                handleCommoditySubmit={handleCommoditySubmit}
                handleCommodityChange={handleCommodityChange}
                handleCommodityDelete={handleCommodityDelete}
                commodityFormInvalid={commodityFormInvalid}
                commodityFormRef={commodityFormRef}
                totalAssets={totalAssets}
            />
        </div>
    )
}