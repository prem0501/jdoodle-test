import { ToWords } from 'to-words';
import metaData from '~/assets/json/metaData.json';
import jsonLd from '~/assets/json/jsonLd.json';
import { format } from 'date-fns';

function makeBase64(src: string): Promise<string> {
	return new Promise((resolve) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		const base64Img = new Image();
		base64Img.src = src;
		base64Img.onload = () => {
			context?.drawImage(base64Img, 100, 100);
			const jpegUrl = canvas.toDataURL('image/jpeg');
			resolve(jpegUrl);
		};
	});
}
export function imageToData(src: string): Promise<string> {
	return makeBase64(src);
}
export const keyIndicatorTitles: { [key: string]: string } = {
	period: 'PERIOD',
	faceValueShare: 'FACE VALUE/SHARE',
	bookValueShare: 'BOOK VALUE/SHARE',
	priceEarning: 'PRICE TO EARNING (PE)',
	priceSales: 'PRICE/SALES',
	priceBook: 'PRICE/BOOK',
	oustShare: 'OUTSTANDING SHARES (Rs.Million)',
	marketCap: 'MARKET CAP (Rs.Million)',
	debtEq: 'DEBT/EQUITY',
	dividShare: 'DIVIDEND/SHARE',
	dividPerc: 'DIVIDEND % (ON CMP)',
	returnAsset: 'RETURN ON TOTAL ASSETS',
	returnEq: 'RETURN ON EQUITY',
	rowc: 'ROWC',
};

export const keyIndicatorBlurbs: { [key: string]: string } = {
	faceValueShare: `The face value of a share of stock is the value per share as stated in the issuing company's charter. This is the minimum value that each shareholder is expected to pay per share of stock in order to fund the business.`,
	bookValueShare: `Book value per share (BVPS) takes the ratio of a firm's common equity divided by its number of shares outstanding. Book value of equity per share effectively indicates a firm's net asset value (total assets - total liabilities) on a per-share basis.`,
	priceEarning: `What is PE Ratio? Price to Earnings Ratio or Price to Earnings Multiple is the ratio of share price of a stock to its earnings per share (EPS). PE ratio is one of the most popular valuation metric of stocks. It provides indication whether a stock at its current market price is expensive or cheap.`,
	priceSales: `The price-to-sales (P/S) ratio is a valuation ratio that compares a company’s stock price to its revenues. It is an indicator of the value that financial markets have placed on each Ruppes of a company’s sales or revenues.`,
	priceBook: `Many investors use the price-to-book ratio (P/B ratio) to compare a firm's market capitalization to its book value and locate undervalued companies. This ratio is calculated by dividing the company's current stock price per share by its book value per share (BVPS).`,
	oustShare: `The term outstanding shares refers to a company's stock currently held by all its shareholders.`,
	debtEq: `Debt-to-equity (D/E) ratio compares a company's total liabilities with its shareholder equity and can be used to assess the extent of its reliance on debt. D/E ratios vary by industry and are best used to compare direct competitors or to measure change in the company's reliance on debt over time.`,
	dividShare: `A dividend is the distribution of corporate earnings to eligible shareholders.`,
	dividPerc: `A dividend is the distribution of corporate earnings to eligible shareholders. Dividend payments and amounts are determined by a company's board of directors. The dividend yield is the dividend per share, and expressed as a percentage of a company's share price.`,
	returnAsset: `The return on total assets ratio is obtained by dividing a company's earnings after tax by its total assets. This profitability indicator helps you determine how your company generates its earnings`,
	returnEq: `Return on equity (ROE) is the measure of a company's net income divided by its shareholders' equity. ROE is a gauge of a corporation's profitability and how efficiently it generates those profits.`,
	rowc: `ROWC (Return On Working Capital) is a non-GAAP financial metric that compares operating earnings for a measurement period to the related amount of working capital. This is defined as follows: ROWC: ROWC = EBIT / Working Capital.`,
};
export const profitLossTitles: { [key: string]: string } = {
	period: 'PERIOD',
	revenue: 'REVENUE',
	expense: 'EXPENSE',
	ebdita: 'EBDITA',
	otherCost: 'OTHER COST',
	pbt: 'PBT',
	taxExpense: 'TAX EXPENSE',
	pat: 'PAT',
	otherIncExpense: 'OTHER INCOME/EXP.',
	incomeNet: 'INCOME (NET OF TAXES)',
	outstandingShare: 'OUTSTANDING SHARE',
	epsPerShare: 'EPS ( RS/SHARE)',
};

export const profitLossBlurbs: { [key: string]: string } = {
	pbt: `Profit before tax is a measure that looks at a company's profits before the company has to pay corporate income tax.`,
	pat: `Profit after tax is a measure that looks at a company's profits after all taxes.`,
	epsPerShare: `Earnings per share (EPS) is calculated as a company's profit divided by the outstanding shares of its common stock. The resulting number serves as an indicator of a company's profitability.`,
};
export const balancesheetTitles: { [key: string]: string } = {
	period: 'PERIOD',
	cashEqlt: 'CASH EQUIVALENT',
	nonCurrentAsset: 'NON CURRENT ASSET',
	currentAsset: 'CURRENT ASSET',
	totalAsset: 'TOTAL ASSET',
	eqShareCap: 'EQUITY SHARE CAPITAL',
	reserves: 'RESERVES',
	totalEq: 'TOTAL EQUITY',
	nonCurrentLiability: 'NON CURRENT LIABILITY',
	currentLiability: 'CURRENT LIABILITY',
	totalLiability: 'TOTAL LIABILITIES',
	totalEqLiability: 'TOTAL EQUITY & LIABILITY',
};
export const cashflowsumTitles: { [key: string]: string } = {
	period: 'PERIOD',
	operatingAct: 'OPERATING ACTIVITY',
	investingAct: 'INVESTING ACTIVITY',
	financialAct: 'FINANCING ACTIVITY',
	netCashFlow: 'NET CASH FLOW',
};
export const addressTitles: { [key: string]: string } = {
	company: 'Company',
	phone: 'PHONE',
	email: 'EMAIL',
	street1: 'STREET1',
	street2: 'STREET2',
	zip: 'ZIP',
	addressType: 'ADDRESS TYPE',
	City: 'CITY',
	State: 'STATE',
	Country: 'COUNTRY',
	User: 'USER',
};
export const UserTitles: { [key: string]: string } = {
	firstname: 'FIRST NAME',
	lastname: 'LAST NAME',
	displayName: 'DISPLAY NAME',
	email: 'EMAIL',
	emailVerified: 'EMAIL VERIFY',
	phoneVerified: 'PHONE VERIFY',
	phoneOTP: 'PHONE OTP',
	emailOTP: 'EMAIL OTP',
	image: 'IMAGE',
	phone: 'PHONE',
	aadhar: 'AADHAR',
	pan: 'PAN',
	demat: 'DEMAT',
	aadharImg: 'AADHAR IMG',
	panImg: 'PAN IMG',
	dematImg: 'DEMAT PMG',
	deactivated: 'DEACTIVATED',
	lastlogin: 'LAST LOGIN',
	Gender: 'GENDER',
	Role: 'ROLE',
	InvestorType: 'INVESTOR TYPE',
};

export const annualreportTitles: { [key: string]: string } = {
	period: 'PERIOD',
	annual: 'ANNUAL',
	q1: 'QUARTER 1',
	q2: 'QUARTER 2',
	q3: 'QUARTER 3',
	q4: 'QUARTER 4',
};
export const companyfinanceTitles: { [key: string]: string } = {
	period: 'PERIOD',
	revenue: 'REVENUE',
	ebidata: 'EBIDATA',
	eps: 'EPS',
};
export const pressTitles: { [key: string]: string } = {
	thumb: 'THUMB',
	title: 'TITLE',
	link: 'LINK',
	excerpt: 'Excerpt',
	keywords: 'Keywords(Comma separated)',
	metaTitle: 'Meta Title',
	metaDescription: 'Meta Description',
};
export const blogTitles: { [key: string]: string } = {
	thumb: 'THUMB',
	title: 'TITLE',
	link: 'LINK',
};
export const seofaqTitles: { [key: string]: string } = {
	sortOrder: 'SORT ORDER',
	question: 'QUESTION',
	answer: 'ANSWER',
};
export const seopagesTitles: { [key: string]: string } = {
	title: 'TITLE',
	content: 'CONTENT',
	metaTitle: 'METATITLE',
	metaDescription: 'META DESCRIPTION',
};

export const ManagementTitles: { [key: string]: string } = {
	sortOrder: 'SORT ORDER',
	name: 'NAME',
	designation: 'DESIGNATION',
};
export const ShareholderTitles: { [key: string]: string } = {
	name: 'NAME',
	percent: 'PERCENT%',
};
export const CategoryTitles: { [key: string]: string } = {
	name: 'NAME',
};
export const DepositTitles: { [key: string]: string } = {
	name: 'NAME',
};
export const DhrpsTitles: { [key: string]: string } = {
	name: 'NAME',
};
export const IndustryTitles: { [key: string]: string } = {
	name: 'NAME',
};
export const PerformanceTitles: { [key: string]: string } = {
	name: 'NAME',
};
export const SectorTitles: { [key: string]: string } = {
	name: 'NAME',
};
export const GenderTitles: { [key: string]: string } = {
	gender: 'GENDER',
};

export const ReviewsTitles: { [key: string]: string } = {
	title: 'Title',
	content: 'Content',
	status: 'Status',
};

export const RoleTitles: { [key: string]: string } = {
	role: 'ROLE',
};
export const PriceTrendsTitles: { [key: string]: string } = {
	label: 'Label',
	period: 'Period',
	price: 'Price',
};
export const FinancialsTitles: { [key: string]: string } = {
	revenue: 'REVENUE',
	period: 'PERIOD',
	ebidata: 'EBIDATA',
	eps: 'EPS',
};

export function currency(amt: number) {
	const formatter = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
	});
	return formatter.format(amt);
}
export function formatDate(dateStr?: string, type: string = 'dd/MM/yyyy') {
	try {
		const d = new Date(dateStr || '');
		return format(d, type);
	} catch (e) {
		return dateStr;
	}
}
export function onImgError(event: Event) {
	(event.target as HTMLImageElement).src = '/imgs/placeholder.webp';
}
export function seoData() {
	return {
		...metaData,
		script: [
			{
				type: 'application/ld+json',
				innerHTML: jsonLd,
			},
		],
	};
}

export function getLabel(val: number) {
	if (val >= 4) {
		return 'Excellent';
	} else if (val >= 3) {
		return 'Very good';
	} else if (val >= 2) {
		return 'Average';
	} else if (val >= 1) {
		return 'Poor';
	} else {
		return 'Terrible';
	}
}
const a = [
	'',
	'one ',
	'two ',
	'three ',
	'four ',
	'five ',
	'six ',
	'seven ',
	'eight ',
	'nine ',
	'ten ',
	'eleven ',
	'twelve ',
	'thirteen ',
	'fourteen ',
	'fifteen ',
	'sixteen ',
	'seventeen ',
	'eighteen ',
	'nineteen ',
];
const b = [
	'',
	'',
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety',
];

export function inWords(num: number) {
	const toWords = new ToWords({
		localeCode: 'en-IN',
		converterOptions: {
			currency: true,
			ignoreDecimal: false,
			ignoreZeroCurrency: false,
			doNotAddOnly: false,
			currencyOptions: {
				// can be used to override defaults for the selected locale
				name: 'Rupee',
				plural: 'Rupees',
				symbol: '₹',
				fractionalUnit: {
					name: 'Paisa',
					plural: 'Paise',
					symbol: '',
				},
			},
		},
	});
	return toWords.convert(num);
}
