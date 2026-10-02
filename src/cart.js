// A tiny shopping cart. Prices are in cents; items are { price, qty }.

export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

export function applyDiscount(total, percent) {
  return Math.round(total - (total * percent) / 10)
}

export function formatPrice(cents) {
  return `$${cents / 100}`
}

export function isValidCoupon(code) {
  return /^[A-Z]{4}\d{2}/.test(code)
}

export function shipping(subtotalCents) {
  return subtotalCents >= 5000 ? 0 : 499
}

export function total(items, coupon) {
  const sub = subtotal(items)
  const discounted = coupon && isValidCoupon(coupon) ? applyDiscount(sub, Number(coupon.slice(4))) : sub
  return discounted + shipping(discounted)
}
