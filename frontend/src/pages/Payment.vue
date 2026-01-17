<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { processPayment } from '../services/payment'

import PaymentMethod from '../components/PaymentMethod.vue'
import VoucherInput from '../components/VoucherInput.vue'

const router = useRouter()

const basePrice = 25000
const finalPrice = ref(basePrice)
const isFree = ref(false)

function onVoucherApplied(voucher) {
  if (voucher.free) {
    finalPrice.value = 0
    isFree.value = true
  } else {
    finalPrice.value = Math.max(0, basePrice - voucher.discount)
  }
}

async function pay() {
  if (finalPrice.value === 0) {
    router.push('/camera')
    return
  }

  const result = await processPayment({
    amount: finalPrice.value,
  })

  if (result.status === 'success') {
    router.push('/camera')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-96 bg-white p-6 rounded-xl shadow space-y-4">
      <h1 class="text-xl font-bold text-center">Payment</h1>

      <p class="text-center text-lg">
        Total: <b>Rp {{ finalPrice }}</b>
      </p>

      <VoucherInput @applied="onVoucherApplied" />

      <PaymentMethod @pay="pay" />

      <p v-if="isFree" class="text-green-600 text-center">
        Voucher membuat pembayaran gratis 🎉
      </p>
    </div>
  </div>
</template>
