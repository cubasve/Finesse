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
        {/* <BsInfoCircleFill /> */}
        <Button variant="success" size="sm">&#8505;</Button>
        {/* //<button>&#8505;</button> */}
    </OverlayTrigger>
)

export default function Assets(props) {
    return (
        <div className="border">
            <span className="title">
                <span>ASSETS <AssetPopover /></span>
                <span className="right">$</span>

            </span>
            <Cash
                totalCash={props.totalCash}
                newCash={props.newCash}
                handleCashSubmit={props.handleCashSubmit}
                handleCashChange={props.handleCashChange}
                handleCashDelete={props.handleCashDelete}
                cashFormInvalid={props.cashFormInvalid}
                cashFormRef={props.cashFormRef}
            />
            <PaperAssets
                totalPaperAssets={props.totalPaperAssets}
                newPaperAsset={props.newPaperAsset}
                handlePaperAssetSubmit={props.handlePaperAssetSubmit}
                handlePaperAssetChange={props.handlePaperAssetChange}
                handlePaperAssetDelete={props.handlePaperAssetDelete}
                paperAssetFormInvalid={props.paperAssetFormInvalid}
                paperAssetFormRef={props.paperAssetFormRef}
            />
            <RealEstate
                totalRealEstate={props.totalRealEstate}
                newRealEstate={props.newRealEstate}
                handleRealEstateSubmit={props.handleRealEstateSubmit}
                handleRealEstateChange={props.handleRealEstateChange}
                handleRealEstateDelete={props.handleRealEstateDelete}
                realEstateFormInvalid={props.realEstateFormInvalid}
                realEstateFormRef={props.realEstateFormRef}
            />
            <Business
                totalBusiness={props.totalBusiness}
                newBusiness={props.newBusiness}
                handleBusinessSubmit={props.handleBusinessSubmit}
                handleBusinessChange={props.handleBusinessChange}
                handleBusinessDelete={props.handleBusinessDelete}
                businessFormInvalid={props.businessFormInvalid}
                businessFormRef={props.businessFormRef}
            />
            <Commodities
                totalCommodities={props.totalCommodities}
                newCommodity={props.newCommodity}
                handleCommoditySubmit={props.handleCommoditySubmit}
                handleCommodityChange={props.handleCommodityChange}
                handleCommodityDelete={props.handleCommodityDelete}
                commodityFormInvalid={props.commodityFormInvalid}
                commodityFormRef={props.commodityFormRef}
            />
        </div>
    )
}