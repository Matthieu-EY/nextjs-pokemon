'use client';

import Link from 'next/link';
import { Modal } from '../Modal';
import { useState } from 'react';

export function TeamModal() {
  const [teamName, setTeamName] = useState('');

  const addTeam = () => {
    // TODO: implement this

    
  };

  return (
    <Modal>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">Add a team</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-lg text-gray-500">Team name</p>
          <input
            type="text"
            defaultValue={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border-gray-400 text-black px-2 border rounded-md"
          />
        </div>
        <div className="flex justify-center gap-x-8 mt-4">
          <button
            onClick={addTeam}
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Save
          </button>
          {/* Navigates back to the previous URL - closing the modal */}
          <Link
            href="/teams"
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </Link>
        </div>
      </div>
    </Modal>
  );
}
