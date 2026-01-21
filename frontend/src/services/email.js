import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  console.warn('EmailJS ENV belum lengkap')
}

export function sendPhotoboothEmail({
  userName,
  userEmail,
  photoUrl
}) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      user_name: userName,
      user_email: userEmail,
      photo_url: photoUrl
    },
    PUBLIC_KEY
  )
}
