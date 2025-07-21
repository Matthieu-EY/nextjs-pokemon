'use client';

import { Modal } from '../Modal';
import { useActionState } from 'react';

interface TeamModalProps {
  onTeamAdd: (previousState: unknown, formData: FormData) => Promise<string>
  onModalClose: () => void
}

export function TeamModal({ onTeamAdd, onModalClose }: TeamModalProps) {
  const [team, action, isPending] = useActionState(onTeamAdd, "");

  return (
    <Modal>
      <form className="text-center" action={action}>
        <h3 className="text-2xl font-bold text-gray-900">Add a team</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-lg text-gray-500">Team name</p>
          <input
            type="text"
            name='name'
            defaultValue={team}
            className="border-gray-400 text-black px-2 border rounded-md"
          />
        </div>
        <div className="flex justify-center gap-x-8 mt-4">
          <button
            type='submit'
            disabled={isPending}
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Save
          </button>
          {/* Navigates back to the previous URL - closing the modal */}
          <button
            onClick={onModalClose}
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}
