import { useState } from 'react';
import { useLibrary } from './hooks/useLibrary';
import { useLogEntries } from './hooks/useLogEntries';
import { todayKey } from './storage';
import { TodayView } from './components/TodayView';
import { LibraryView } from './components/LibraryView';
import { HistoryView } from './components/HistoryView';
import { NavBar, type Tab } from './components/NavBar';

export default function App() {
  const [tab, setTab] = useState<Tab>('today');
  const { library, addFoodItem, updateFoodItem, deleteFoodItem } = useLibrary();
  const { entries, addEntry, deleteEntry } = useLogEntries();

  return (
    <div className="min-h-screen bg-slate-950">
      {tab === 'today' && (
        <TodayView
          library={library}
          entries={entries}
          onAddFoodItem={addFoodItem}
          onAddEntry={(entry) => addEntry({ date: todayKey(), ...entry })}
          onDeleteEntry={deleteEntry}
        />
      )}
      {tab === 'library' && (
        <LibraryView
          library={library}
          onAdd={addFoodItem}
          onUpdate={updateFoodItem}
          onDelete={deleteFoodItem}
        />
      )}
      {tab === 'history' && <HistoryView entries={entries} onDeleteEntry={deleteEntry} />}

      <NavBar active={tab} onChange={setTab} />
    </div>
  );
}
