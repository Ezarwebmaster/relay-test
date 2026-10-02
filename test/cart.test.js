import test from 'node:test'
import assert from 'node:assert/strict'
import { subtotal, applyDiscount, formatPrice, isValidCoupon, shipping, total } from '../src/cart.js'

test('subtotal multiplies price by quantity', () => {
  assert.equal(subtotal([{ price: 250, qty: 2 }, { price: 100, qty: 3 }]), 800)
})

test('subtotal of an empty cart is zero', () => {
  assert.equal(subtotal([]), 0)
})

test('applyDiscount takes a percentage', () => {
  assert.equal(applyDiscount(1000, 10), 900)
})

test('applyDiscount of zero percent changes nothing', () => {
  assert.equal(applyDiscount(1000, 0), 1000)
})

test('formatPrice always shows two decimals', () => {
  assert.equal(formatPrice(1250), '$12.50')
  assert.equal(formatPrice(700), '$7.00')
})

test('isValidCoupon wants four capitals and exactly two digits', () => {
  assert.equal(isValidCoupon('SAVE10'), true)
  assert.equal(isValidCoupon('SAVE100'), false)
  assert.equal(isValidCoupon('save10'), false)
})

test('shipping is free from $50', () => {
  assert.equal(shipping(5000), 0)
  assert.equal(shipping(4999), 499)
})

test('total applies the coupon, then shipping', () => {
  assert.equal(total([{ price: 3000, qty: 2 }], 'SAVE10'), 5400)
})
