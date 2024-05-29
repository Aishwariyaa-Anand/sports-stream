import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';
import React from 'react';

const PreferenceModal = ({ isOpen, onClose }) => {
  const { preferences, setPreferences } = useAuth();
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        const data = await response.json();
        if (data.sports && Array.isArray(data.sports)) {
          setSports(data.sports);
        } else {
          console.error('Unexpected response format for sports');
        }
      } catch (error) {
        console.error('Failed to fetch sports', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setTeams(data);
        } else {
          console.error('Unexpected response format for teams');
        }
      } catch (error) {
        console.error('Failed to fetch teams', error);
      }
    };

    const fetchPreferences = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        console.log('Fetched preferences data:', data);
        
        // Update selected sports and teams with fetched preferences
        setSelectedSports(data.preferences.sports || []);
        setSelectedTeams(data.preferences.teams || []);
      } catch (error) {
        console.error('Failed to fetch preferences', error);
      }
    };

    fetchPreferences();
    fetchSports();
    fetchTeams();
  }, []);

  useEffect(() => {
    if (preferences) {
      setSelectedSports(preferences.sports || []);
      setSelectedTeams(preferences.teams || []);
    }
  }, [preferences]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const updatedPreferences = {
        sports: selectedSports,
        teams: selectedTeams
      };

      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences: updatedPreferences }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      const data = await response.json();
      console.log(data);
      setPreferences(data.preferences);
      onClose();
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Update Preferences
                </Dialog.Title>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Sports</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {sports.length > 0 ? (
                      sports.map((sport) => (
                        <div key={sport.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSports.includes(sport.id)}
                            onChange={() => {
                              setSelectedSports((prev) =>
                                prev.includes(sport.id)
                                  ? prev.filter((id) => id !== sport.id)
                                  : [...prev, sport.id]
                              );
                            }}
                            className="form-checkbox"
                          />
                          <label className="ml-2">{sport.name}</label>
                        </div>
                      ))
                    ) : (
                      <p>No sports available</p>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Teams</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {teams.length > 0 ? (
                      teams.map((team) => (
                        <div key={team.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTeams.includes(team.id)}
                            onChange={() => {
                              setSelectedTeams((prev) =>
                                prev.includes(team.id)
                                  ? prev.filter((id) => id !== team.id)
                                  : [...prev, team.id]
                              );
                            }}
                            className="form-checkbox"
                          />
                          <label className="ml-2">{team.name}</label>
                        </div>
                      ))
                    ) : (
                      <p>No teams available</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreferenceModal;
