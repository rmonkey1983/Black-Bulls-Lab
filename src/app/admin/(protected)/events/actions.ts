'use server';

import { getStrictSupabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidatePath } from 'next/cache';

export async function saveEventAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    throw new Error(auth.error);
  }

  const supabaseAdmin = getStrictSupabaseAdmin();

  const id = formData.get('id') as string;
  const location_name = formData.get('location_name') as string;
  const location_address = formData.get('location_address') as string;
  const event_date = formData.get('event_date') as string;
  const description = formData.get('description') as string;
  const slots = parseInt(formData.get('slots') as string, 10);
  const imageUrl = formData.get('imageUrl') as string;

  const slug = location_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 5);

  const eventData: Record<string, unknown> = {
    title: location_name,
    slug: slug,
    date: event_date,
    category: 'Dinner Show',
    status: 'active',
    active: true,
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
  const auth = await requireAdmin();
  if (!auth.authorized) {
    throw new Error(auth.error);
  }

  const id = formData.get('id') as string;
  const supabaseAdmin = getStrictSupabaseAdmin();
  
  const { error } = await supabaseAdmin.from('events').delete().eq('id', id);
  if (error) {
    console.error("Delete error:", error);
    throw new Error(error.message);
  }
  
  revalidatePath('/admin/events');
  revalidatePath('/events');
}
