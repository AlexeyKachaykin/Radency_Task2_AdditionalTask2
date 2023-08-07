import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Note } from '../../types/Note';
import { archiveNote, unarchiveNote, deleteNote } from '../../store/noteSlice';
import Modal from '../Modal/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArchive, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import Table from '../Table/Table'; // Import the generic Table component

interface NoteTableProps {
    handleEditNoteId: (id: number) => void;
}

const NoteTable: React.FC<NoteTableProps> = ({ handleEditNoteId }) => {
    const notes: Note[] = useSelector((state: RootState) => state.notes.notes);
    const dispatch = useDispatch();

    const handleArchiveNote = (id: number) => {
        dispatch(archiveNote(id));
    };

    const handleUnarchiveNote = (id: number) => {
        dispatch(unarchiveNote(id));
    };

    const handleDeleteNote = (id: number) => {
        dispatch(deleteNote(id));
    };

    const nonArchivedNotes = notes.filter((note) => !note.archived);
    const archivedNotes = notes.filter((note) => note.archived);

    const tableColumns = ['Name', 'Created', 'Category', 'Content', 'Dates', 'Actions'];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUnarchiveInModal = (id: number) => {
        handleUnarchiveNote(id);
    };

    return (
        <div className="w-full max-w-700 mx-auto p-10 border rounded-md">
            <Table
                data={nonArchivedNotes.map((note) => ({
                    Name: note.name,
                    Created: note.created,
                    Category: note.category,
                    Content: note.content,
                    Dates: getDatesFromContent(note.content).join(', '),
                    Actions: (
                        <div className="flex items-center justify-center  gap-2 ">
                            <button  onClick={() => handleEditNoteId(note.id)}>
                                <FontAwesomeIcon icon={faEdit}  />
                            </button>    
                            <button onClick={() => handleArchiveNote(note.id)}>
                                <FontAwesomeIcon icon={faArchive} />
                            </button>
                           
                            <button onClick={() => handleDeleteNote(note.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ),
                }))}
                columns={tableColumns}
            />

            <button
                className="bg-gray-500 text-white py-2 px-4 rounded archived-btn  m-5    "
                onClick={() => setIsModalOpen(true)}
            >
                Show Archived Notes
            </button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div className="w-full max-w-700 mx-auto p-16 rounded-md">
                        <h2>Archived Notes</h2>
                        <Table
                            data={archivedNotes.map((note) => ({
                                Name: note.name,
                                Created: note.created,
                                Category: note.category,
                                Content: note.content,
                                Dates: getDatesFromContent(note.content).join(', '),
                                Actions: (
                                    <div >
                                        <button onClick={() => handleUnarchiveInModal(note.id)}>
                                            <FontAwesomeIcon icon={faUndo} />
                                        </button>
                                    </div>
                                ),
                            }))}
                            columns={tableColumns}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

function getDatesFromContent(content: string): string[] {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    return content.match(dateRegex) || [];
}

export default NoteTable;
