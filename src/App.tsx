import React, { useState } from 'react';
import NoteTable from './components/NoteTable/NoteTable';
import NoteForm from './components/NoteForm/NoteForm';
import SummaryTable from './components/SummaryTable/SummaryTable';
import Modal from './components/Modal/Modal';

const App: React.FC = () => {
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNote = () => {
    setEditNoteId(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (id: number) => {
    setEditNoteId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditNoteId(null);
  };

  return (
    <div className="text-center ">
      <NoteTable handleEditNoteId={handleEditNote} />
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded create-button "
        onClick={handleCreateNote}
      >
        Create Note
      </button>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm
            editNoteId={editNoteId}
            setEditNoteId={setEditNoteId}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      <SummaryTable />
    </div>
  );
};

export default App;
