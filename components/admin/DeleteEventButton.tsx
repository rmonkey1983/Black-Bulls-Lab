"use client";

import { Trash2 } from "lucide-react";

interface DeleteEventButtonProps {
    eventId: string;
    deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteEventButton({ eventId, deleteAction }: DeleteEventButtonProps) {
    const handleAction = async (formData: FormData) => {
        if (confirm('Sicuro di voler eliminare questa data?')) {
            await deleteAction(formData);
        }
    };

    return (
        <form action={handleAction} className="inline">
            <input type="hidden" name="id" value={eventId} />
            <button 
                type="submit" 
                className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer p-1"
                title="Elimina"
            >
                <Trash2 size={16} />
            </button>
        </form>
    );
}
