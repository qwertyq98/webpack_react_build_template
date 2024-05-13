export const fontFamilyClasses = [
	'open-sans',
	'ubuntu',
	'cormorant-garamond',
	'days-one',
	'merriweather',
] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

export type OptionType = {
	title: string;
	value: string;
	className: string;
	optionClassName?: string;
};

export const fontFamilyOptions: OptionType[] & {
	optionClassName?: FontFamiliesClasses;
} = [
	{ title: 'Open Sans', value: 'Open Sans', className: fontFamilyClasses[0] },
];

export const fontColors: OptionType[] = [
	{
		title: 'Черный',
		value: '#000000',
		className: 'font-black',
		optionClassName: 'option-black',
	}
];

export const backgroundColors: OptionType[] = [
	{
		title: 'Белый',
		value: '#FFFFFF',
		className: 'bg-white',
		optionClassName: 'option-white',
	}
];

export const contentWidthArr: OptionType[] = [
	{
		title: 'Широкий',
		value: '1394px',
		className: 'width-wide',
		optionClassName: 'option-wide',
	}
];

export const fontSizeOptions: OptionType[] = [
	{ title: '18px', value: '18px', className: 'font-size-18' }
];

export const defaultArticleState = {
	fontFamilyOption: fontFamilyOptions[0],
	fontColor: fontColors[0],
	backgroundColor: backgroundColors[0],
	contentWidth: contentWidthArr[0],
	fontSizeOption: fontSizeOptions[0],
};

export type ArticleStateType = typeof defaultArticleState;