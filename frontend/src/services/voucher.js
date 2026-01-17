export function validateVoucher(code) {
  const vouchers = {
    DEDEFREE: { discount: 100, free: true },
    DEDE10: { discount: 10000, free: false },
  }

  return vouchers[code] || null
}
