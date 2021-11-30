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
			month: 11,
			year: 2021,
		},
		updatedPaperAsset: {},
		paperAssetFormInvalid: true,

		totalRealEstate: [],
		newRealEstate: {
			type: "Residential",
			amount: "",
			category: "RealEstate",
			month: 11,
			year: 2021,
		},
		updatedRealEstate: {},
		realEstateFormInvalid: true,

		totalBusiness: [],
		newBusiness: {
			type: "Sole proprietorship",
			amount: "",
			category: "Business",
			month: 11,
			year: 2021,
		},
		updatedBusiness: {},
		businessFormInvalid: true,

		totalCommodities: [],
		newCommodity: {
			type: "Metals",
			amount: "",
			category: "Commodity",
			month: 11,
			year: 2021,
		},
		updatedCommodity: {},
		commodityFormInvalid: true,

		totalCash: [],
		newCash: {
			type: "Chequing Account",
			amount: "",
			category: "Cash",
			month: 11,
			year: 2021,
		},
		updatedCash: {},
		cashFormInvalid: true,

		totalGoodDebt: [],
		newGoodDebt: {
			type: "Real Estate",
			amount: "",
			category: "GoodDebt",
			month: 11,
			year: 2021,
		},
		updatedGoodDebt: {},
		goodDebtFormInvalid: true,

		totalBadDebt: [],
		newBadDebt: {
			type: "Home Mortgage",
			amount: "",
			category: "BadDebt",
			month: 11,
			year: 2021,
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
				const { paper, realEstate, business, commodities, cash } = data.user;
				this.setState({
					totalPaperAssets: paper,
					totalRealEstate: realEstate,
					totalBusiness: business,
					totalCommodities: commodities,
					totalCash: cash,

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

	/*---------PAPER ASSET METHODS-------- */
	handlePaperAssetSubmit = async (e) => {
		e.preventDefault();
		if (!this.paperAssetFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } = this.state.newPaperAsset;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { paper } = data.user;
					this.setState({
						totalPaperAssets: paper,
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
							month: 11,
							year: 2021,
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
		const entity = this.state.totalPaperAssets.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { paper } = data.user;
					this.setState({
						totalPaperAssets: paper,
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
			const { type, amount, category } = this.state.updatedPaperAsset;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { paper } = data.user;
					this.setState({
						totalPaperAssets: paper,
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

	/*---------REAL ESTATE METHODS-------- */
	handleRealEstateSubmit = async (e) => {
		e.preventDefault();
		if (!this.realEstateFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } = this.state.newRealEstate;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { realEstate } = data.user;
					this.setState({
						totalRealEstate: realEstate,
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
							month: 11,
							year: 2021,
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
		const entity = this.state.totalRealEstate.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { realEstate } = data.user;
					this.setState({
						totalRealEstate: realEstate,
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
			const { type, amount, category } = this.state.updatedRealEstate;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { realEstate } = data.user;
					this.setState({
						totalRealEstate: realEstate,
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

	/*---------BUSINESS METHODS-------- */
	handleBusinessSubmit = async (e) => {
		e.preventDefault();
		if (!this.businessFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } = this.state.newBusiness;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { business } = data.user;
					this.setState({
						totalBusiness: business,
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
							month: 11,
							year: 2021,
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
		const entity = this.state.totalBusiness.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { business } = data.user;
					this.setState({
						totalBusiness: business,
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
			const { type, amount, category } = this.state.updatedBusiness;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { business } = data.user;
					this.setState({
						totalBusiness: business,
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

	/*---------COMMODITY METHODS-------- */
	handleCommoditySubmit = async (e) => {
		e.preventDefault();
		if (!this.commodityFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } = this.state.newCommodity;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { commodities } = data.user;
					this.setState({
						totalCommodities: commodities,
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
							month: 11,
							year: 2021,
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
		const entity = this.state.totalCommodities.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { commodities } = data.user;
					this.setState({
						totalCommodities: commodities,
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
			const { type, amount, category } = this.state.updatedCommodity;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { commodities } = data.user;
					this.setState({
						totalCommodities: commodities,
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

	/*---------CASH METHODS-------- */
	handleCashSubmit = async (e) => {
		e.preventDefault();
		if (!this.cashFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } = this.state.newCash;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { cash } = data.user;
					this.setState({
						totalCash: cash,
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
							month: 11,
							year: 2021,
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
		const entity = this.state.totalCash.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { cash } = data.user;
					this.setState({
						totalCash: cash,
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
			const { type, amount, category } = this.state.updatedCash;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { cash } = data.user;
					this.setState({
						totalCash: cash,
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

	/*---------GOOD DEBT METHODS-------- */
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

	/*---------BAD DEBT METHODS-------- */
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
