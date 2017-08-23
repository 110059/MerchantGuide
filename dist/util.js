var Constants = require('./config');

/*
All the global variable declared required.
*/
var romanNumerals = Constants.romanNumerals;
var isValueRegEx = Constants.isValueRegEx;
var isCreditRegEx = Constants.isCreditRegEx;
var HowMuchRegEx = Constants.HowMuchRegEx;
var HowManyRegEx = Constants.HowManyRegEx;
var isValidRomanRegEx = Constants.isValidRomanRegEx;
var romanNumeralsVal = Constants.romanNumeralsVal;


/*to store currency units in metal or scrap like gold, silver, iron etc &
their corresponding value after calculation*/
var galaxyUnits = {};

/*to store different types of currencies and their conversion rates */
var galaxyCurrency = {};

/*
 function used to convert inter-galaxy currency to numeric value
 Ex: ['glob', 'prok'] => IV => 4
 */
var ConvertCurrencyToValue = function(CurrencyArr, tstCurrency, tstUnits, tstRomanNumeralsVal) {
	var RomanString = "";
	var answer = 0;
	galaxyCurrency = tstCurrency || galaxyCurrency;
	galaxyUnits = tstUnits || galaxyUnits;
	romanNumeralsVal = tstRomanNumeralsVal || romanNumeralsVal;

	for (var ite = 0; ite < CurrencyArr.length; ite++) {
		if (galaxyCurrency[CurrencyArr[ite].toLowerCase()]) {
			RomanString += galaxyCurrency[CurrencyArr[ite].toLowerCase()];
		} else if (galaxyUnits[CurrencyArr[ite].toLowerCase()]) {
			console.log(CurrencyArr[ite] + " is not currency,it's a unit");
			return -1;
		} else {
			console.log("Unknown currency " + CurrencyArr[ite] + " queried");
			return -1;
		}
	}
	if (!isValidRomanRegEx.test(RomanString)) {
		console.log("Invalid amount " + CurrencyArr.join(" "));
		return -1;
	}
	var RomanDigits = [];
	RomanString.split("").forEach(function(e, i, arr) {
		RomanDigits.push(romanNumeralsVal[e]);
		if (romanNumeralsVal[e] < romanNumeralsVal[arr[i + 1]]) {
			RomanDigits[i] *= -1;
		}
	});
	answer = RomanDigits.reduce(function(sum, elt) {
		return sum + elt;
	});
	return answer;
}

/*
 * Public function to process inputs and to do inter-Galaxy currency
 * conversions.input is validated against regular expressions and if valid
 * respective input part is processes further.
 */
exports.MerchantGuide = function(input) {
	var RegAns = null;
	RegAns = isValueRegEx.exec(input);
	if (RegAns !== null) {
		var partials = RegAns[0].split(/\s+/);
		if (!galaxyCurrency[partials[0].toLowerCase()]) {
			var index = romanNumerals.indexOf(partials[2].toLowerCase());
			if (index > -1) {
				galaxyCurrency[partials[0].toLowerCase()] = partials[2].toLowerCase();
				romanNumerals.splice(index, 1);
			} else {
				console.log(partials[2] + " is already assigned");
			}
		} else if (galaxyCurrency[partials[0].toLowerCase()] !== romanNumeralsVal[partials[2].toLowerCase()]) {
			console.log(partials[0] + " already has a conversion unit");
		}
		return;
	}

	RegAns = isCreditRegEx.exec(input);
	if (RegAns !== null) {
		var CreditVal = parseFloat(RegAns[2]);
		var partials = RegAns[1].trim();
		if (partials === "") {

			return console.log("Please enter any currency");
		}
		partials = partials.split(/\s+/);
		var unit = partials.pop();
		if (galaxyCurrency[unit.toLowerCase()]) {
			return console.log(unit + " is currency,provide a Unit");
		}
		if (partials.length < 1) {
			return console.log("No Currency provided");
		}
		var value = ConvertCurrencyToValue(partials);
		if ((CreditVal / value) < 0.00001) {
			return console.log("Credit is too low");
		}
		if (value !== -1) {
			value = CreditVal / value;
			galaxyUnits[unit.toLowerCase()] = value;
		} else {
			return console.log("Invalid Currency");
		}
		return;
	}

	RegAns = HowMuchRegEx.exec(input);
	if (RegAns !== null) {
		var partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Please enter any currency to convert");
		}
		partials = partials.split(/\s+/);
		var value = ConvertCurrencyToValue(partials);
		if (value !== -1) {
			return console.log(partials.join(" ") + " is " + value);
		} else {
			return console.log("Invalid Currency");
		}
	}

	RegAns = HowManyRegEx.exec(input);
	if (RegAns !== null) {
		var partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Please enter any currency");
		}
		partials = partials.split(/\s+/);
		var unit = partials.pop();
		if (!galaxyUnits[unit.toLowerCase()]) {
			return console.log("No unit Provided");
		}
		if (partials.length < 1) {
			return console.log("No Currency provided");
		}
		var value = ConvertCurrencyToValue(partials);
		if (value !== -1) {
			value *= galaxyUnits[unit.toLowerCase()];
			return console.log(RegAns[1].trim() + " is " + value.toFixed(5)
					+ " Credits");
		} else {
			return console.log("Invalid Currency");
		}
	}
	return console.log("I have no idea what you are talking about");
};

exports.ConvertCurrencyToValue = ConvertCurrencyToValue;
