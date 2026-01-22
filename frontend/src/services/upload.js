import { supabase } from './supabase'

export async function insertPhotoRecord({
    id,
    created_at,
  eventId,
  eventName,
  filteredPhoto,
  finalPhoto,
  email
}) {
  const { data, error } = await supabase
    .from('photos')
    .insert([
      {
        id: id,
        created_at:created_at,
        event_id: eventId,
        event_name: eventName,
        filtered_photo: filteredPhoto,
        final_photo: finalPhoto,
      }
    ])

  if (error) {
    console.error('Insert error:', error)
    return null
  }

  console.log('Insert success:', data)
  return data
}
