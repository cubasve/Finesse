import React, { createContext, Component } from "react";
import financialStatementService from "../utils/financialStatementService";

const AssetLiabilityContext = createContext();
export const AssetLiabilityConsumer = AssetLiabilityContext.Consumer;

export class AssetLiabilityProvider extends Component {
	state = {
		totalAssets: [],
		totalLiabilities: [],

		totalPaperAssets: [],
		newPaperAsset: {
			type: "Stock",
			amount: "",
			category: "Paper",
			class: "Asset",
		},
		paperAssetFormInvalid: true,

		totalRealEstate: [],
		newRealEstate: {
			type: "Residential",
			amount: "",
			category: "RealEstate",
			class: "Asset",
		},
		realEstateFormInvalid: true,

		totalBusiness: [],
		newBusiness: {
			type: "Sole proprietorship",
			amount: "",
			category: "Business",
			class: "Asset",
		},
		businessFormInvalid: true,

		totalCommodities: [],
		newCommodity: {
			type: "Metals",
			amount: "",
			category: "Commodity",
			class: "Asset",
		},
		commodityFormInvalid: true,

		totalCash: [],
		newCash: {
			type: "Chequing Account",
			amount: "",
			category: "Cash",
			class: "Asset",
		},
		cashFormInvalid: true,

		totalGoodDebt: [],
		newGoodDebt: {
			type: "Real Estate",
			amount: "",
			category: "GoodDebt",
			class: "Liability",
		},
		goodDebtFormInvalid: true,

		totalBadDebt: [],
		newBadDebt: {
			type: "Home Mortgage",
			amount: "",
			category: "BadDebt",
			class: "Liability",
		},
		badDebtFormInvalid: true,
	};

	paperAssetFormRef = React.createRef();
	realEstateFormRef = React.createRef();
	businessFormRef = React.createRef();
	commodityFormRef = React.createRef();
	cashFormRef = React.createRef();
	goodDebtFormRef = React.createRef();
	badDebtFormRef = React.createRef();

	handleFetchBalanceSheetData = async () => {
		try {
			await financialStatementService.show().then((data) => {
				this.setState({
					totalPaperAssets: data.user.userFinances.filter(
						(elem) => elem.category === "Paper"
					),
					totalRealEstate: data.user.userFinances.filter(
						(elem) => elem.category === "RealEstate"
					),
					totalBusiness: data.user.userFinances.filter(
						(elem) => elem.category === "Business"
					),
					totalCommodities: data.user.userFinances.filter(
						(elem) => elem.category === "Commodity"
					),
					totalCash: data.user.userFinances.filter(
						(elem) => elem.category === "Cash"
					),

					totalGoodDebt: data.user.userFinances.filter(
						(elem) => elem.category === "GoodDebt"
					),
					totalBadDebt: data.user.userFinances.filter(
						(elem) => elem.category === "BadDebt"
					),

					totalAssets: data.user.userFinances.filter(
						(elem) =>
							elem.category === "Paper" ||
							elem.category === "RealEstate" ||
							elem.category === "Business" ||
							elem.category === "Commodity" ||
							elem.category === "Cash"
					),
					totalLiabilities: data.user.userFinances.filter(
						(elem) =>
							elem.category === "GoodDebt" || elem.category === "BadDebt"
					),
				});
			});
		} catch (err) {
			console.error(err);
		}
	};

	//Paper Asset Methods
	handlePaperAssetSubmit = async (e) => {
		e.preventDefault();
		if (!this.paperAssetFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newPaperAsset.type,
					amount: this.state.newPaperAsset.amount,
					category: this.state.newPaperAsset.category,
				})
				.then((data) => {
					this.setState({
						totalPaperAssets: data.user.userFinances.filter(
							(elem) => elem.category === "Paper"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
						newPaperAsset: {
							type: "Stock",
							amount: "",
							category: "Paper",
						},
						paperAssetFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePaperAssetChange = (e) => {
		const newPaperAsset = {
			...this.state.newPaperAsset,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPaperAsset: newPaperAsset,
			paperAssetFormInvalid: !this.paperAssetFormRef.current.checkValidity(),
		});
	};

	handlePaperAssetDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPaperAssets: data.user.userFinances.filter(
							(elem) => elem.category === "Paper"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Real Estate Methods
	handleRealEstateSubmit = async (e) => {
		e.preventDefault();
		if (!this.realEstateFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newRealEstate.type,
					amount: this.state.newRealEstate.amount,
					category: this.state.newRealEstate.category,
				})
				.then((data) => {
					this.setState({
						totalRealEstate: data.user.userFinances.filter(
							(elem) => elem.category === "RealEstate"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
						newRealEstate: {
							type: "Residential",
							amount: "",
							category: "RealEstate",
						},
						realEstateFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleRealEstateChange = (e) => {
		const newRealEstate = {
			...this.state.newRealEstate,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newRealEstate: newRealEstate,
			realEstateFormInvalid: !this.realEstateFormRef.current.checkValidity(),
		});
	};

	handleRealEstateDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalRealEstate: data.user.userFinances.filter(
							(elem) => elem.category === "RealEstate"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Business Methods
	handleBusinessSubmit = async (e) => {
		e.preventDefault();
		if (!this.businessFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newBusiness.type,
					amount: this.state.newBusiness.amount,
					category: this.state.newBusiness.category,
				})
				.then((data) => {
					this.setState({
						totalBusiness: data.user.userFinances.filter(
							(elem) => elem.category === "Business"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
						newBusiness: {
							type: "Sole proprietorship",
							amount: "",
							category: "Business",
						},
						businessFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleBusinessChange = (e) => {
		const newBusiness = {
			...this.state.newBusiness,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newBusiness: newBusiness,
			businessFormInvalid: !this.businessFormRef.current.checkValidity(),
		});
	};

	handleBusinessDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalBusiness: data.user.userFinances.filter(
							(elem) => elem.category === "Business"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Commodity Methods
	handleCommoditySubmit = async (e) => {
		e.preventDefault();
		if (!this.commodityFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newCommodity.type,
					amount: this.state.newCommodity.amount,
					category: this.state.newCommodity.category,
				})
				.then((data) => {
					this.setState({
						totalCommodities: data.user.userFinances.filter(
							(elem) => elem.category === "Commodity"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
						newCommodity: {
							type: "Metals",
							amount: "",
							category: "Commodity",
						},
						commodityFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleCommodityChange = (e) => {
		const newCommodity = {
			...this.state.newCommodity,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newCommodity: newCommodity,
			commodityFormInvalid: !this.commodityFormRef.current.checkValidity(),
		});
	};

	handleCommodityDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalCommodities: data.user.userFinances.filter(
							(elem) => elem.category === "Commodity"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Cash Methods
	handleCashSubmit = async (e) => {
		e.preventDefault();
		if (!this.cashFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newCash.type,
					amount: this.state.newCash.amount,
					category: this.state.newCash.category,
				})
				.then((data) => {
					this.setState({
						totalCash: data.user.userFinances.filter(
							(elem) => elem.category === "Cash"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
						newCash: {
							type: "Chequing Account",
							amount: "",
							category: "Cash",
						},
						cashFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleCashChange = (e) => {
		const newCash = { ...this.state.newCash, [e.target.name]: e.target.value };
		this.setState({
			newCash: newCash,
			cashFormInvalid: !this.cashFormRef.current.checkValidity(),
		});
	};

	handleCashDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalCash: data.user.userFinances.filter(
							(elem) => elem.category === "Cash"
						),
						totalAssets: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Paper" ||
								elem.category === "RealEstate" ||
								elem.category === "Business" ||
								elem.category === "Commodity" ||
								elem.category === "Cash"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Good Debt Methods
	handleGoodDebtSubmit = async (e) => {
		e.preventDefault();
		if (!this.goodDebtFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newGoodDebt.type,
					amount: this.state.newGoodDebt.amount,
					category: this.state.newGoodDebt.category,
				})
				.then((data) => {
					this.setState({
						totalGoodDebt: data.user.userFinances.filter(
							(elem) => elem.category === "GoodDebt"
						),
						totalLiabilities: data.user.userFinances.filter(
							(elem) =>
								elem.category === "GoodDebt" || elem.category === "BadDebt"
						),
						newGoodDebt: {
							type: "Real Estate",
							amount: "",
							category: "GoodDebt",
						},
						goodDebtFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleGoodDebtChange = (e) => {
		const newGoodDebt = {
			...this.state.newGoodDebt,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newGoodDebt: newGoodDebt,
			goodDebtFormInvalid: !this.goodDebtFormRef.current.checkValidity(),
		});
	};

	handleGoodDebtDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalGoodDebt: data.user.userFinances.filter(
							(elem) => elem.category === "GoodDebt"
						),
						totalLiabilities: data.user.userFinances.filter(
							(elem) =>
								elem.category === "GoodDebt" || elem.category === "BadDebt"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Bad Debt Methods
	handleBadDebtSubmit = async (e) => {
		e.preventDefault();
		if (!this.badDebtFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newBadDebt.type,
					amount: this.state.newBadDebt.amount,
					category: this.state.newBadDebt.category,
				})
				.then((data) => {
					this.setState({
						totalBadDebt: data.user.userFinances.filter(
							(elem) => elem.category === "BadDebt"
						),
						totalLiabilities: data.user.userFinances.filter(
							(elem) =>
								elem.category === "GoodDebt" || elem.category === "BadDebt"
						),
						newBadDebt: {
							type: "Home Mortgage",
							amount: "",
							category: "BadDebt",
						},
						badDebtFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleBadDebtChange = (e) => {
		const newBadDebt = {
			...this.state.newBadDebt,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newBadDebt: newBadDebt,
			badDebtFormInvalid: !this.badDebtFormRef.current.checkValidity(),
		});
	};

	handleBadDebtDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalBadDebt: data.user.userFinances.filter(
							(elem) => elem.category === "BadDebt"
						),
						totalLiabilities: data.user.userFinances.filter(
							(elem) =>
								elem.category === "GoodDebt" || elem.category === "BadDebt"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<AssetLiabilityContext.Provider>
				{this.props.children}
			</AssetLiabilityContext.Provider>
		);
	}
}
