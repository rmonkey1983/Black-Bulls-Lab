'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function saveEventAction(formData: FormData) {
  const supabaseAdmin = getSupabaseAdmin();

  const id = formData.get('id') as string;
  const location_name = formData.get('location_name') as string;
  const location_address = formData.get('location_address') as string;
  const event_date = formData.get('event_date') as string;
  const description = formData.get('description') as string;
  const slots = parseInt(formData.get('slots') as string);
  const imageUrl = formData.get('imageUrl') as string;

  const slug = location_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 5);

  const eventData: any = {
    title: location_name,
    slug: slug,
    date: event_date,
    category: 'Dinner Show',
    status: 'active',   // Added to fix NOT NULL constraint
    active: true,       // Added for compatibility
    location: location_name,
    location_name,
    location_address,
    event_date,
    description,
    image: imageUrl,
    image_url: imageUrl,
    total_slots: slots,
    available_slots: slots
  };

  let res;
  if (id) {
    res = await supabaseAdmin.from('events').update(eventData).eq('id', id);
  } else {
    res = await supabaseAdmin.from('events').insert(eventData);
  }

  if (res.error) {
    console.error("Save error:", res.error);
    throw new Error(res.error.message);
  }

  revalidatePath('/admin/events');
  revalidatePath('/events');
  revalidatePath('/calendario');
}

export async function deleteEventAction(formData: FormData) {
  const id = formData.get('id') as string;
  const supabaseAdmin = getSupabaseAdmin();
  
  const { error } = await supabaseAdmin.from('events').delete().eq('id', id);
  if (error) {
    console.error("Delete error:", error);
    throw new Error(error.message);
  }
  
  revalidatePath('/admin/events');
  revalidatePath('/events');
}
