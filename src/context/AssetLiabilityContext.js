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
		updatedPaperAsset: {},
		paperAssetFormInvalid: true,

		totalRealEstate: [],
		newRealEstate: {
			type: "Residential",
			amount: "",
			category: "RealEstate",
			class: "Asset",
		},
		updatedRealEstate: {},
		realEstateFormInvalid: true,

		totalBusiness: [],
		newBusiness: {
			type: "Sole proprietorship",
			amount: "",
			category: "Business",
			class: "Asset",
		},
		updatedBusiness: {},
		businessFormInvalid: true,

		totalCommodities: [],
		newCommodity: {
			type: "Metals",
			amount: "",
			category: "Commodity",
			class: "Asset",
		},
		updatedCommodity: {},
		commodityFormInvalid: true,

		totalCash: [],
		newCash: {
			type: "Chequing Account",
			amount: "",
			category: "Cash",
			class: "Asset",
		},
		updatedCash: {},
		cashFormInvalid: true,

		totalGoodDebt: [],
		newGoodDebt: {
			type: "Real Estate",
			amount: "",
			category: "GoodDebt",
			class: "Liability",
		},
		updatedGoodDebt: {},
		goodDebtFormInvalid: true,

		totalBadDebt: [],
		newBadDebt: {
			type: "Home Mortgage",
			amount: "",
			category: "BadDebt",
			class: "Liability",
		},
		updatedBadDebt: {},
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

	handleGetCurrentCash = (id) => {
		const currentCash = this.state.totalCash.find(({ _id }) => _id === id);
		this.setState({ updatedCash: currentCash });
	};

	handleGetCurrentPaperAsset = (id) => {
		const currentPaperAsset = this.state.totalPaperAssets.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedPaperAsset: currentPaperAsset });
	};

	handleGetCurrentRealEstate = (id) => {
		const currentRealEstate = this.state.totalRealEstate.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedRealEstate: currentRealEstate });
	};

	handleGetCurrentBusiness = (id) => {
		const currentBusiness = this.state.totalBusiness.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedBusiness: currentBusiness });
	};

	handleGetCurrentCommodity = (id) => {
		const currentCommodity = this.state.totalCommodities.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedCommodity: currentCommodity });
	};

	handleGetCurrentGoodDebt = (id) => {
		const currentGoodDebt = this.state.totalGoodDebt.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedGoodDebt: currentGoodDebt });
	};

	handleGetCurrentBadDebt = (id) => {
		const currentBadDebt = this.state.totalBadDebt.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedBadDebt: currentBadDebt });
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

	handlePaperAssetUpdateChange = (e) => {
		const updatedPaperAsset = {
			...this.state.updatedPaperAsset,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedPaperAsset: updatedPaperAsset,
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

	handlePaperAssetUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedPaperAsset.type,
					amount: this.state.updatedPaperAsset.amount,
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
						updatedPaperAsset: {},
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

	handleRealEstateUpdateChange = (e) => {
		const updatedRealEstate = {
			...this.state.updatedRealEstate,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedRealEstate: updatedRealEstate,
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

	handleRealEstateUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedRealEstate.type,
					amount: this.state.updatedRealEstate.amount,
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
						updatedRealEstate: {},
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

	handleBusinessUpdateChange = (e) => {
		const updatedBusiness = {
			...this.state.updatedBusiness,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedBusiness: updatedBusiness,
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

	handleBusinessUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedBusiness.type,
					amount: this.state.updatedBusiness.amount,
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
						updatedBusiness: {},
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

	handleCommodityUpdateChange = (e) => {
		const updatedCommodity = {
			...this.state.updatedCommodity,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedCommodity: updatedCommodity,
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

	handleCommodityUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedCommodity.type,
					amount: this.state.updatedCommodity.amount,
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
						updatedCommodity: {},
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

	handleCashUpdateChange = (e) => {
		const updatedCash = {
			...this.state.updatedCash,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedCash: updatedCash,
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

	handleCashUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedCash.type,
					amount: this.state.updatedCash.amount,
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
						updatedCash: {},
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

	handleGoodDebtUpdateChange = (e) => {
		const updatedGoodDebt = {
			...this.state.updatedGoodDebt,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedGoodDebt: updatedGoodDebt,
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

	handleGoodDebtUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedGoodDebt.type,
					amount: this.state.updatedGoodDebt.amount,
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
						updatedGoodDebt: {},
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

	handleBadDebtUpdateChange = (e) => {
		const updatedBadDebt = {
			...this.state.updatedBadDebt,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedBadDebt: updatedBadDebt,
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

	handleBadDebtUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedBadDebt.type,
					amount: this.state.updatedBadDebt.amount,
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
						updatedBadDebt: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const {
			totalAssets,
			totalLiabilities,

			totalPaperAssets,
			newPaperAsset,
			updatedPaperAsset,
			paperAssetFormInvalid,

			totalRealEstate,
			newRealEstate,
			updatedRealEstate,
			realEstateFormInvalid,

			totalBusiness,
			newBusiness,
			updatedBusiness,
			businessFormInvalid,

			totalCommodities,
			newCommodity,
			updatedCommodity,
			commodityFormInvalid,

			totalCash,
			newCash,
			updatedCash,
			cashFormInvalid,

			totalGoodDebt,
			newGoodDebt,
			updatedGoodDebt,
			goodDebtFormInvalid,

			totalBadDebt,
			newBadDebt,
			updatedBadDebt,
			badDebtFormInvalid,
		} = this.state;

		const {
			handleFetchBalanceSheetData,

			handlePaperAssetSubmit,
			handlePaperAssetChange,
			handlePaperAssetDelete,
			handleGetCurrentPaperAsset,
			handlePaperAssetUpdateChange,
			handlePaperAssetUpdateSubmit,
			paperAssetFormRef,

			handleRealEstateSubmit,
			handleRealEstateChange,
			handleRealEstateDelete,
			handleGetCurrentRealEstate,
			handleRealEstateUpdateChange,
			handleRealEstateUpdateSubmit,
			realEstateFormRef,

			handleBusinessSubmit,
			handleBusinessChange,
			handleBusinessDelete,
			handleGetCurrentBusiness,
			handleBusinessUpdateChange,
			handleBusinessUpdateSubmit,
			businessFormRef,

			handleCommoditySubmit,
			handleCommodityChange,
			handleCommodityDelete,
			handleGetCurrentCommodity,
			handleCommodityUpdateChange,
			handleCommodityUpdateSubmit,
			commodityFormRef,

			handleCashSubmit,
			handleCashChange,
			handleCashDelete,
			handleGetCurrentCash,
			handleCashUpdateChange,
			handleCashUpdateSubmit,
			cashFormRef,

			handleGoodDebtSubmit,
			handleGoodDebtChange,
			handleGoodDebtDelete,
			handleGetCurrentGoodDebt,
			handleGoodDebtUpdateChange,
			handleGoodDebtUpdateSubmit,
			goodDebtFormRef,

			handleBadDebtSubmit,
			handleBadDebtChange,
			handleBadDebtDelete,
			handleGetCurrentBadDebt,
			handleBadDebtUpdateChange,
			handleBadDebtUpdateSubmit,
			badDebtFormRef,
		} = this;

		// const values = {

		// }

		return (
			<AssetLiabilityContext.Provider
				value={{
					totalAssets,
					totalLiabilities,

					totalPaperAssets,
					newPaperAsset,
					updatedPaperAsset,
					paperAssetFormInvalid,

					totalRealEstate,
					newRealEstate,
					updatedRealEstate,
					realEstateFormInvalid,

					totalBusiness,
					newBusiness,
					updatedBusiness,
					businessFormInvalid,

					totalCommodities,
					newCommodity,
					updatedCommodity,
					commodityFormInvalid,

					totalCash,
					newCash,
					updatedCash,
					cashFormInvalid,

					totalGoodDebt,
					newGoodDebt,
					updatedGoodDebt,
					goodDebtFormInvalid,

					totalBadDebt,
					newBadDebt,
					updatedBadDebt,
					badDebtFormInvalid,
					handleFetchBalanceSheetData,

					handlePaperAssetSubmit,
					handlePaperAssetChange,
					handlePaperAssetDelete,
					handleGetCurrentPaperAsset,
					handlePaperAssetUpdateChange,
					handlePaperAssetUpdateSubmit,
					paperAssetFormRef,

					handleRealEstateSubmit,
					handleRealEstateChange,
					handleRealEstateDelete,
					handleGetCurrentRealEstate,
					handleRealEstateUpdateChange,
					handleRealEstateUpdateSubmit,
					realEstateFormRef,

					handleBusinessSubmit,
					handleBusinessChange,
					handleBusinessDelete,
					handleGetCurrentBusiness,
					handleBusinessUpdateChange,
					handleBusinessUpdateSubmit,
					businessFormRef,

					handleCommoditySubmit,
					handleCommodityChange,
					handleCommodityDelete,
					handleGetCurrentCommodity,
					handleCommodityUpdateChange,
					handleCommodityUpdateSubmit,
					commodityFormRef,

					handleCashSubmit,
					handleCashChange,
					handleCashDelete,
					handleGetCurrentCash,
					handleCashUpdateChange,
					handleCashUpdateSubmit,
					cashFormRef,

					handleGoodDebtSubmit,
					handleGoodDebtChange,
					handleGoodDebtDelete,
					handleGetCurrentGoodDebt,
					handleGoodDebtUpdateChange,
					handleGoodDebtUpdateSubmit,
					goodDebtFormRef,

					handleBadDebtSubmit,
					handleBadDebtChange,
					handleBadDebtDelete,
					handleGetCurrentBadDebt,
					handleBadDebtUpdateChange,
					handleBadDebtUpdateSubmit,
					badDebtFormRef,
				}}
			>
				{this.props.children}
			</AssetLiabilityContext.Provider>
		);
	}
}
export default AssetLiabilityContext;
