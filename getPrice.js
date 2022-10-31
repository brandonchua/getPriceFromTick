const { ethers } = require('ethers')
const JSBI = require('jsbi')
const { TickMath, FullMath } = require('@uniswap/v3-sdk')
require('dotenv').config()
const INFURA_URL_MAINNET = process.env.INFURA_URL_MAINNET

const baseToken = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' //USDC
const quoteToken = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' //ETH

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_MAINNET)

async function main(
	baseToken,
	quoteToken,
	inputAmount,
	currentTick,
	baseTokenDecimals,
	quoteTokenDecimals
) {
	// code
	const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(currentTick)
	const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96)

	const baseAmount = JSBI.BigInt(inputAmount * (10**baseTokenDecimals))

	const shift = JSBI.leftShift( JSBI.BigInt(1), JSBI.BigInt(192))

	quoteAmount = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift)
	console.log(quoteAmount.toString() / (10**quoteTokenDecimals))
}

main(
	baseToken, // USDC
	quoteToken, // ETH
	1,
	202766,
	8,
	18,
)