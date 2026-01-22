import { supabase } from './supabase'

export async function uploadBlob(blob, fileName, folder = 'photos') {
  const { data, error } = await supabase.storage
    .from(folder)
    .upload(fileName, blob, { upsert: true })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  const { publicUrl } = supabase.storage
    .from(folder)
    .getPublicUrl(data.path)

  return publicUrl
}

export async function uploadFilteredPhotos(filteredPhotosArray, submissionId) {
  const urls = []

  for (let i = 0; i < filteredPhotosArray.length; i++) {
    const blob = filteredPhotosArray[i] // sudah Blob
    const fileName = `${submissionId}_filtered_${i}.png`
    const url = await uploadBlob(blob, fileName)
    if (url) urls.push(url)
  }

  return urls
}
