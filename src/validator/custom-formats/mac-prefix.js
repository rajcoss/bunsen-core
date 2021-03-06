import isMacAddress from './mac-address'
import {isMacMaskValid, macAddressBits, macMulticastMaskRegex, isMacMulticastAddress} from './utils'

/* eslint-disable complexity */
/**
 * Validate value as an MAC address prefix
 * @param {Any} value - value to validate
 * @returns {Boolean} whether or not value is valid
 */
export default function (value) {
  if (!(typeof value === 'string' || value instanceof String)) {
    return false
  }

  const [macAddress, mask] = value.split('/')

  if (!isMacAddress(macAddress)) {
    return false
  }

  if (!isMacMaskValid(mask)) {
    return false
  }

  const bits = macAddressBits(macAddress)

  if (macMulticastMaskRegex.test(mask)) {
    return isMacMulticastAddress(macAddress)
  }

  const hostBits = bits.slice(parseInt(mask, 10))

  return /^0+$/.test(hostBits)
}
/* eslint-enable complexity */
