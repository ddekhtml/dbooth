export function processPayment({ amount }) {
  return new Promise((resolve) => {
    console.log('PROCESS PAYMENT:', amount)

    setTimeout(() => {
      resolve({
        status: 'success',
        paid: true,
      })
    }, 1500)
  })
}
